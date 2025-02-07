use utils::config::Config;
use anyhow::Error;

pub struct AppCtx {
    pub config: Config,
}

impl AppCtx {
    pub async fn new(config: Config) -> Result<Self, Error> {
        Ok(Self {
            config,
        })
    }
}