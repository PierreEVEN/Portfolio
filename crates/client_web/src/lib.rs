mod static_file_server;
pub mod app_ctx;

use std::{env, fs};
use std::process::{Stdio};
use std::sync::Arc;
use anyhow::Error;
use axum::extract::{Path, State};
use axum::response::{Html, IntoResponse};
use axum::{Router};
use axum::routing::{get};
use tokio::process::{Child, Command};
use tracing::{info};
use which::which;
use utils::config::WebClientConfig;
use crate::app_ctx::AppCtx;
use utils::server_error::ServerError;
use crate::static_file_server::StaticFileServer;

pub struct WebClient {
    _subcommand: Option<Child>,
}

impl WebClient {
    pub async fn new(config: &WebClientConfig) -> Result<Self, Error> {
        let base_directory = env::current_dir()?;
        let client = Self::try_create_client(config).await;
        env::set_current_dir(base_directory)?;
        client
    }

    async fn try_create_client(config: &WebClientConfig) -> Result<Self, Error> {
        if config.build_webpack {
            env::set_current_dir(&config.client_path)?;

            let result = which("node").or(Err(Error::msg("Failed to find node path. Please ensure nodejs is correctly installed")))?;
            let npm_cli_path = result.parent().unwrap().join("node_modules").join("npm").join("bin").join("npm-cli.js");

            if config.check_for_packages_updates {
                info!("Installing webclient dependencies...");
                let mut install_cmd = Command::new("node")
                    .arg(npm_cli_path.to_str().unwrap())
                    .arg("install")
                    .stderr(Stdio::inherit())
                    .stdout(Stdio::inherit())
                    .spawn()?;
                install_cmd.wait().await?;
                info!("Installed webclient dependencies !");
            }

            let command = if config.debug
            {
                Command::new("node")
                    .arg(npm_cli_path.to_str().unwrap())
                    .arg("run")
                    .arg("dev")
                    .stderr(Stdio::inherit())
                    .stdout(Stdio::inherit())
                    .spawn()?
            } else {
                Command::new("node")
                    .arg(npm_cli_path.to_str().unwrap())
                    .arg("run")
                    .arg("prod")
                    .stderr(Stdio::inherit())
                    .stdout(Stdio::inherit())
                    .spawn()?
            };

            Ok(Self { _subcommand: Some(command) })
        } else {
            Ok(Self { _subcommand: None })
        }
    }

    pub fn router(ctx: &Arc<AppCtx>) -> Result<Router, Error> {
        Ok(Router::new()
            .route("/", get(get_index).with_state(ctx.clone()))
            .route("/{*path}", get(get_index_path).with_state(ctx.clone()))
            .route("/favicon.ico", get(Self::get_favicon).with_state(ctx.clone()))
            .route("/robots.txt", get(Self::get_robots).with_state(ctx.clone()))
            .nest("/public/", StaticFileServer::router(ctx.config.web_client_config.client_path.join("public")))
        )
    }

    async fn get_robots(State(ctx): State<Arc<AppCtx>>) -> Result<impl IntoResponse, ServerError> {
        StaticFileServer::serve_file_from_path(ctx.config.web_client_config.client_path.join("public").join("robots.txt")).await
    }

    async fn get_favicon(State(ctx): State<Arc<AppCtx>>) -> Result<impl IntoResponse, ServerError> {
        StaticFileServer::serve_file_from_path(ctx.config.web_client_config.client_path.join("public").join("images").join("icons").join("favicon.ico")).await
    }
}

async fn get_index(State(ctx): State<Arc<AppCtx>>) -> Result<impl IntoResponse, ServerError> {

    let index_path_buf = ctx.config.web_client_config.client_path.join("public").join("index.html");
    let index_path = index_path_buf.to_str().unwrap();
    let index_data = match fs::read_to_string(index_path) {
        Ok(file) => { file }
        Err(err) => { Err(Error::msg(format!("Cannot find index file : {err} (searching in {index_path})")))? }
    };
    Ok(Html(index_data))
}

async fn get_index_path(State(ctx): State<Arc<AppCtx>>, path: Path<String>) -> Result<impl IntoResponse, ServerError> {

    let index_path_buf = ctx.config.web_client_config.client_path.join("public").join("index.html");
    let index_path = index_path_buf.to_str().unwrap();
    let index_data = match fs::read_to_string(index_path) {
        Ok(file) => { file }
        Err(err) => { Err(Error::msg(format!("Cannot find index file : {err} (searching in {index_path})")))? }
    };
    let index_data = index_data.replace(r#"data-app_config='{}'"#, format!(r##"data-app_config='{{"path":"{}"}}'"##, path.0).as_str());
    Ok(Html(index_data))
}