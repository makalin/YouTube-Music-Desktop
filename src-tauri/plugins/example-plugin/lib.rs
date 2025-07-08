use tauri::plugin::{Plugin, Result as PluginResult};
use tauri::App;

pub struct ExamplePlugin;

impl Plugin for ExamplePlugin {
    fn name(&self) -> &'static str {
        "ExamplePlugin"
    }
    fn initialize(&self, _app: &App) -> PluginResult<()> {
        println!("ExamplePlugin initialized");
        Ok(())
    }
} 