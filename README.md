# YouTube Music Player (Rust Edition)

A modern, feature-rich desktop application for YouTube Music, built with Rust and Tauri. Features a beautiful, responsive UI with advanced playback controls, favorites management, and extensive customization options.

## ✨ Features

### 🎵 Core Playback
- **YouTube Music Integration**: Seamless playback of YouTube Music and YouTube videos
- **Link Support**: Paste any YouTube Music, YouTube video, or playlist link
- **Embedded Player**: High-quality playback with autoplay support
- **Track Information**: Real-time title, artist, and thumbnail display

### 🎨 Modern UI & Customization
- **Beautiful Design**: Modern card-based layout with shadows and rounded corners
- **Theme Support**: Light, dark, and auto themes with smooth transitions
- **Custom Accent Colors**: Personalize the app with your favorite colors
- **Responsive Design**: Works perfectly on all screen sizes
- **Mini Player**: Compact, draggable player for multitasking

### ⭐ Favorites & History
- **Favorites Management**: Save and organize your favorite tracks
- **Play History**: Automatic tracking of recently played content
- **Quick Access**: One-click playback from favorites or history
- **Persistent Storage**: All data saved locally using localStorage

### 🎮 Advanced Controls
- **Keyboard Shortcuts**: 
  - `Space`: Play/Pause
  - `←/→`: Previous/Next
  - `M`: Mute/Unmute
  - `T`: Toggle theme
  - `F`: Add to favorites
  - `H`: Show history
  - `P`: Show playlist
  - `L`: Show favorites
- **Player Controls**: Play, pause, previous, next, mute
- **Utility Buttons**: Copy link, share, open in browser, download

### ⚙️ Settings & Configuration
- **Settings Modal**: Comprehensive configuration options
- **Default Homepage**: Set your preferred starting page
- **Utility Toggle**: Show/hide utility buttons
- **Theme Persistence**: Remembers your theme preference
- **Accent Color**: Customize the app's primary color

### 📱 Additional Features
- **Notifications**: Real-time feedback for actions
- **Download Support**: Download tracks (Rust backend integration)
- **Playlist Support**: Basic playlist navigation and queue management
- **Share Integration**: Native sharing or clipboard fallback
- **Cross-Platform**: Windows, macOS, and Linux support

## 🚀 Installation

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (stable, latest version)
- [Node.js](https://nodejs.org/) (v20 or later)
- [pnpm](https://pnpm.io/) (recommended package manager)

### Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/makalin/youtube-player.git
   cd youtube-player
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Run Development Server**:
   ```bash
   pnpm tauri dev
   ```

4. **Build for Production**:
   ```bash
   pnpm tauri build
   ```

## 🎯 Usage

### Basic Playback
1. Launch the app
2. Paste a YouTube Music or YouTube video link in the input field
3. Click the play button (▶️) or press Enter
4. Enjoy your music!

### Advanced Features
- **Favorites**: Click the star (⭐) button to save tracks
- **Mini Player**: Click the mini player button (🗕) for a compact view
- **Settings**: Click the gear (⚙️) to customize the app
- **Keyboard Shortcuts**: Use keyboard shortcuts for quick actions

### Theme Customization
1. Open Settings (⚙️)
2. Choose your preferred theme (Light/Dark/Auto)
3. Pick a custom accent color
4. Save your preferences

## 🛠️ Development

### Project Structure
```
youtube-player/
├── src/                    # Frontend (HTML/CSS/JS)
│   ├── src/
│   │   ├── index.html     # Main UI
│   │   ├── style.css      # Modern styling
│   │   └── main.js        # Interactive features
├── src-tauri/             # Rust backend
│   ├── src/
│   │   └── main.rs        # Tauri app entry
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
├── package.json           # Node.js dependencies
└── vite.config.ts         # Vite configuration
```

### Key Technologies
- **Frontend**: Plain HTML, CSS, JavaScript (no frameworks)
- **Backend**: Rust with Tauri
- **Styling**: Modern CSS with CSS variables and responsive design
- **Storage**: localStorage for favorites, history, and settings
- **APIs**: YouTube embed API, noembed.com for track info

### Adding Features
The app is designed to be easily extensible:
- Add new UI elements in `src/src/index.html`
- Style them in `src/src/style.css`
- Implement functionality in `src/src/main.js`
- Add Rust backend commands in `src-tauri/src/main.rs`

## 🎨 UI Features

### Modern Design
- Card-based layout with subtle shadows
- Smooth animations and transitions
- Responsive design for all screen sizes
- Professional color scheme with customization

### Interactive Elements
- Hover effects on all buttons
- Smooth theme transitions
- Draggable mini player
- Collapsible side panels

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast themes
- Responsive touch targets

## 🔧 Configuration

### Settings Options
- **Theme**: Light, Dark, or Auto (system preference)
- **Accent Color**: Customize the primary color
- **Default Homepage**: Set your preferred starting URL
- **Utility Buttons**: Toggle visibility of utility controls

### Keyboard Shortcuts
All shortcuts work globally (except when typing in input fields):
- `Space`: Play/Pause
- `M`: Mute/Unmute
- `T`: Toggle theme
- `F`: Add to favorites
- `H`: Show history
- `P`: Show playlist
- `L`: Show favorites
- `←/→`: Previous/Next track

## 🚀 Future Enhancements

### Planned Features
- **Real Download Support**: Full MP3 download functionality
- **Playlist Management**: Advanced playlist creation and editing
- **Audio Equalizer**: Built-in audio controls
- **Ad Blocker**: Integrated ad blocking
- **Offline Mode**: Cache tracks for offline playback
- **Sync**: Cloud sync for favorites and settings

### Plugin System
- **Custom Plugins**: Extend functionality with Rust plugins
- **Theme Plugins**: Community-created themes
- **Audio Plugins**: Advanced audio processing

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Built with [Tauri](https://tauri.app/) and [Rust](https://www.rust-lang.org/)
- Inspired by modern music player designs
- Thanks to all contributors and the open-source community!

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/makalin/youtube-player/issues)
- **Discussions**: [GitHub Discussions](https://github.com/makalin/youtube-player/discussions)
- **Documentation**: [Wiki](https://github.com/makalin/youtube-player/wiki)

---

**Made with ❤️ using Rust + Tauri**
