# YouTube Music Player (Rust Edition)

A lightweight, cross-platform desktop application for YouTube Music, built with Rust and Tauri, bundled with custom plugins, an integrated ad blocker, and a downloader.

## Features

- **Music Playback**: Stream YouTube Music with a native desktop experience.
- **Custom Plugins**: Extend functionality with plugins written in Rust.
- **Ad Blocker**: Built-in ad blocker for uninterrupted listening.
- **Downloader**: Download tracks for offline playback (use responsibly).
- **Cross-Platform**: Supports Windows, macOS, and Linux.
- **Lightweight**: Powered by Tauri for minimal resource usage.
- **Customizable UI**: Apply custom themes via CSS or Rust-based styling.

## Installation

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (stable, latest version recommended)
- [Node.js](https://nodejs.org/) (v20 or later, for Tauri frontend dependencies)
- [pnpm](https://pnpm.io/) (for managing frontend dependencies)
- A modern web browser for development

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/makalin/youtube-player.git
   cd youtube-player
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install --frozen-lockfile
   ```

3. **Build and Run**:
   ```bash
   cargo tauri dev
   ```
   This starts the development server and launches the app.

4. **Package for Distribution**:
   ```bash
   cargo tauri build
   ```
   Outputs executables in `src-tauri/target/release`.

### Alternative Installation (Binary)

- **Windows**: Use [Winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/):
  ```bash
  winget install your-username.YouTubeMusicRust
  ```
  Note: Microsoft Defender SmartScreen may flag the app as from an "unknown publisher."

- **macOS**: Use [Homebrew](https://brew.sh/):
  ```bash
  brew install --cask https://raw.githubusercontent.com/your-username/youtube-music-rust/master/youtube-music-rust.rb
  ```
  If you encounter a "damaged app" error, run:
  ```bash
  xattr -cr /Applications/YouTube\ Player.app
  ```

- **Linux**: Use [Scoop](https://scoop.sh/) (extras bucket):
  ```bash
  scoop bucket add extras
  scoop install extras/youtube-player
  ```

## Plugins

Extend the app with custom plugins. Examples include:

- **Equalizer**: Adjust audio frequencies (e.g., bass boost).
- **Precise Volume**: Fine-tune volume with mouse wheel or hotkeys.
- **SponsorBlock**: Skip non-music sections in videos.
- **Video Toggle**: Switch between video and audio-only modes.

### Creating a Plugin

1. Create a new folder in `src-tauri/plugins/your-plugin-name`.
2. Define the plugin in Rust, implementing the `Plugin` trait:

   ```rust
   use tauri::plugin::Plugin;

   pub struct MyPlugin;

   impl Plugin for MyPlugin {
       fn name(&self) -> &'static str {
           "My Plugin"
       }

       fn initialize(&self, app: &tauri::App) -> tauri::Result<()> {
           // Initialize plugin (e.g., register commands)
           Ok(())
       }
   }
   ```

3. Register the plugin in `src-tauri/src/main.rs`:

   ```rust
   fn main() {
       tauri::Builder::default()
           .plugin(MyPlugin)
           .run(tauri::generate_context!())
           .expect("Error running Tauri app");
   }
   ```

4. Add frontend logic (if needed) in `src/` using JavaScript/CSS.

## Development

To contribute or modify the app:

1. Install dependencies as above.
2. Run `cargo tauri dev` for live reloading.
3. Submit pull requests to `https://github.com/makalin/youtube-player`.

### Custom CSS

Inject custom styles by adding a `style.css` file in your plugin folder:

```css
/* style.css */
.ytmusic-nav-bar .sign-in-link {
    display: none; /* Hide Google login button */
}
```

Load it in your plugin:

```rust
use tauri::Manager;

fn inject_css(app: &tauri::App) {
    let window = app.get_window("main").unwrap();
    window.eval(&format!(
        "const style = document.createElement('style'); style.textContent = '{}'; document.head.append(style);",
        include_str!("style.css")
    )).unwrap();
}
```

## Contributing

Any help will be a great contribution! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit changes (`git commit -m "Add my feature"`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- Inspired by [th-ch/youtube-music](https://github.com/th-ch/youtube-music).
- Built with [Tauri](https://tauri.app/) and [Rust](https://www.rust-lang.org/).
- Thanks to all contributors!
