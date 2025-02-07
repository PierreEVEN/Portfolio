use std::{env};
use std::net::{SocketAddr};
use std::str::FromStr;
use std::sync::Arc;
use axum::{middleware, Router};
use axum::body::{Body, Bytes};
use axum::http::{Request, StatusCode};
use axum::middleware::Next;
use axum::response::{IntoResponse, Response};
use axum_server::tls_rustls::RustlsConfig;
use axum_server_dual_protocol::{tokio, ServerExt};
use tracing::{error, info, warn};
use http_body_util::BodyExt;
use client_web::app_ctx::AppCtx;
use client_web::WebClient;
use utils::config::{Config, WebClientConfig};

async fn start_web_client(config: WebClientConfig) {
    match WebClient::new(&config).await {
        Ok(_) => { info!("Successfully started web client.") }
        Err(err) => {
            error!("Failed to start web client : {err}");
        }
    };
}

#[derive(Default)]
struct Server {
    listeners: Vec<SocketAddr>,
}

impl Server {
    pub fn add_listener(&mut self, addr: SocketAddr) {
        self.listeners.push(addr);
    }

    pub async fn start(&self, config: &Config, router: Router) {
        let mut spawned_threads = vec![];

        let tls_config = if config.use_tls {
            if !config.tls_config.certificate.exists() || !config.tls_config.private_key.exists() {
                error!("Invalid tls certificate paths : cert:'{}' / key:'{}'", config.tls_config.certificate.display(), config.tls_config.private_key.display());
                return;
            }

            Some(match RustlsConfig::from_pem_file(config.tls_config.certificate.clone(), config.tls_config.private_key.clone()).await {
                Ok(config) => { config }
                Err(err) => {
                    error!("Invalid tls configuration : {err}");
                    return;
                }
            })
        } else {
            None
        };

        for addr in self.listeners.clone() {
            let router = router.clone();
            let tls_config = tls_config.clone();
            spawned_threads.push(tokio::spawn(async move {
                if let Some(tls_config) = &tls_config {
                    match axum_server_dual_protocol::bind_dual_protocol(addr, tls_config.clone())
                        .set_upgrade(true)
                        .serve(router.into_make_service())
                        .await {
                        Ok(_) => {}
                        Err(err) => {
                            error!("Cannot start secured web server : {err}");
                        }
                    };
                } else {
                    axum::serve(match tokio::net::TcpListener::bind(addr).await {
                        Ok(listener) => { listener }
                        Err(error) => {
                            error!("Cannot start unsecured web server : {error}");
                            return;
                        }
                    }, router).await.unwrap();
                }
            }))
        }

        for thread in spawned_threads {
            match thread.await {
                Ok(_) => {}
                Err(err) => { error!("Server thread ended : {err}") }
            };
        }
    }
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().init();

    // Open Config
    let config = match Config::from_file(env::current_exe().expect("Failed to find executable path").parent().unwrap().join("config.json")) {
        Ok(config) => { config }
        Err(error) => {
            error!("Failed to load config : {}", error);
            return;
        }
    };

    let ctx = Arc::new(match AppCtx::new(config.clone()).await {
        Ok(ctx) => { ctx }
        Err(error) => {
            error!("Failed to load app context : {error}");
            return;
        }
    });

    start_web_client(config.web_client_config.clone()).await;

    // Start web client

    // Instantiate router
    let router = Router::new()
        .merge(WebClient::router(&ctx).unwrap())
        .layer(middleware::from_fn(print_request_response));

    // Create http server
    let mut server = Server::default();
    for address in &config.addresses {
        match SocketAddr::from_str(address.as_str()) {
            Ok(addr) => { server.add_listener(addr); }
            Err(err) => { error!("Invalid server address '{}' : {err}", address); }
        };
    }
    server.start(&ctx.config, router).await;

    info!("Server closed !");
}

async fn print_request_response(req: Request<Body>, next: Next) -> Result<impl IntoResponse, (StatusCode, String)> {
    let path = req.uri().path().to_string();
    let mut res = next.run(req).await;
    if !res.status().is_success() {
        let (parts, body) = res.into_parts();
        let bytes = buffer_and_print("response", body).await?;
        let data_string = match String::from_utf8(bytes.as_ref().to_vec()) {
            Ok(data) => { data }
            Err(err) => {
                error!("Failed to convert body to string : {}", err);
                return Ok(Response::from_parts(parts, Body::from(bytes)));
            }
        };
        res = Response::from_parts(parts, Body::from(bytes));

        warn!("{} ({}) : {}", res.status().to_string(), path, data_string);
    }
    Ok(res)
}

async fn buffer_and_print<B>(direction: &str, body: B) -> Result<Bytes, (StatusCode, String)>
where
    B: axum::body::HttpBody<Data=Bytes>,
    B::Error: std::fmt::Display,
{
    let bytes = match body.collect().await {
        Ok(collected) => collected.to_bytes(),
        Err(err) => {
            return Err((
                StatusCode::BAD_REQUEST,
                format!("failed to read {direction} body: {err}"),
            ));
        }
    };

    if let Ok(body) = std::str::from_utf8(&bytes) {
        tracing::debug!("{direction} body = {body:?}");
    }

    Ok(bytes)
}