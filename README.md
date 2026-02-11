# 📸 Image Downloader Pro - Chrome Extension

> A powerful Chrome extension to download hundreds of images from any webpage, including lazy-loaded content. Bypasses Chrome's download limits with intelligent batch processing.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://chrome.google.com/webstore)
[![Version](https://img.shields.io/badge/version-3.0.0-green.svg)](https://github.com/yourusername/image-downloader-pro)

## 🌟 Features

- **🚀 Bypass Chrome's 28-Download Limit** - Download 800+ images without restrictions
- **⚡ Dual Download Methods** - Choose between Direct Download (fast) or Extension API (organized)
- **🔄 Smart Lazy Loading** - Automatically scrolls through pages to trigger lazy-loaded images
- **🎯 Intelligent Filtering** - Filter by dimensions, include/exclude background images
- **📊 Real-Time Progress** - Visual progress bar with live download counter
- **🎨 Preset Filters** - One-click dimension presets (All Images, Medium+, Large Only)
- **📁 Auto Organization** - Images organized by website and timestamp
- **🔍 Comprehensive Scanning** - Finds images in `<img>`, CSS backgrounds, `<picture>` elements

## 🎬 Demo

### Before & After
- **Problem**: Chrome limits downloads to ~28 images
- **Solution**: Direct Download method bypasses the limit entirely

### Screenshot
![Extension Interface](screenshots/interface.png)
*Modern, intuitive interface with preset filters and progress tracking*

## 🚀 Installation

### Option 1: Chrome Web Store (Coming Soon)
*Extension is currently under review*

### Option 2: Manual Installation (Developer Mode)

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/image-downloader-pro.git
   cd image-downloader-pro
   ```

2. **Install in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the `image-downloader-extension` folder
   - Pin the extension to your toolbar

## 📖 Usage

### Quick Start

1. **Navigate** to any webpage with images
2. **Click** the Image Downloader Pro icon
3. **Configure** your settings:
   - Choose download method (Direct for 100+ images)
   - Set dimension filters or use presets
   - Enable auto-scroll for lazy-loaded images
4. **Scan** the page
5. **Download** selected images

### Download Methods

#### ⚡ Direct Download (Recommended for 100+ images)
- Bypasses Chrome's extension download limits
- Downloads via webpage context
- Faster processing (~150ms per image)
- May show one "Allow downloads" prompt
- Perfect for bulk downloads (500-1000+ images)

#### 🗂️ Extension API
- Uses Chrome's native download API
- Auto-organizes files into folders
- Silent downloads (no prompts)
- Better for smaller batches (<25 images)
- Hits Chrome's ~28 download limit for rapid downloads

### Preset Filters

- **All Images** (0×0) - Captures every image, including icons
- **Medium+** (200×200) - Excludes small icons and UI elements
- **Large Only** (800×600) - Only large photos and graphics

## 🛠️ Technical Details

### Architecture

```
image-downloader-pro/
├── manifest.json          # Extension configuration
├── popup.html            # Main UI
├── popup.css             # Styling
├── popup.js              # Core functionality
├── background.js         # Service worker
├── direct-download.js    # Direct download implementation
└── icons/                # Extension icons
```

### Key Technologies

- **Manifest V3** - Latest Chrome extension standard
- **Content Scripts** - Injected into web pages for image extraction
- **Service Workers** - Background processing for downloads
- **Chrome APIs** - `downloads`, `scripting`, `activeTab`

### How It Works

1. **Image Extraction**
   - Scans DOM for `<img>` elements
   - Checks CSS `background-image` properties
   - Examines `<picture>` and `<source>` elements
   - Detects lazy-loaded images (data-src, data-lazy-src)

2. **Lazy Loading Handling**
   - Automatically scrolls through page
   - Waits for images to load after each scroll
   - Re-scans DOM for newly loaded content
   - Scrolls back to top when complete

3. **Download Processing**
   - **Direct Method**: Creates anchor elements in page context
   - **Extension API**: Uses `chrome.downloads` with batching
   - Implements rate limiting and retry logic
   - Tracks success/failure for each image

### Rate Limiting Strategy

```javascript
// Direct Download
DELAY_PER_IMAGE: 150ms
No batch limits - handles 1000+ images

// Extension API
BATCH_SIZE: 5 images
DELAY_BETWEEN_BATCHES: 3000ms (3 seconds)
DELAY_BETWEEN_DOWNLOADS: 500ms
```

## 📊 Performance

| Scenario | Images | Time | Method |
|----------|--------|------|--------|
| Small batch | 1-50 | 30s | Either |
| Medium batch | 50-200 | 1-2 min | Direct |
| Large batch | 200-500 | 2-4 min | Direct |
| Very large | 500-1000 | 4-8 min | Direct |
| Extreme | 1000+ | 8-15 min | Direct |

## 🔧 Troubleshooting

### No Images Found
- Lower dimension filters (try 0×0)
- Enable "Auto-scroll to load lazy images"
- Check if page requires login
- Some sites block extensions

### Downloads Stop at 28
- Switch to "Direct Download" method
- This bypasses Chrome's extension API limits

### Downloads Not Starting
- Click "Allow" when Chrome asks for permission
- Check if downloads are blocked in Chrome settings
- Verify sufficient disk space

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Roadmap

- [ ] Firefox extension support
- [ ] Image preview before download
- [ ] Custom filename templates
- [ ] Duplicate image detection
- [ ] Image format conversion
- [ ] Cloud storage integration (Google Drive, Dropbox)
- [ ] Scheduled downloads
- [ ] Download queue management

## ⚖️ Legal & Ethics

### Responsible Use
- Respect copyright and intellectual property rights
- Only download images you have permission to use
- Check website terms of service
- Don't use for commercial purposes without proper licenses

### Disclaimer
This tool is provided for legitimate use cases such as:
- Archiving your own content
- Research and academic purposes
- Personal use and backup
- Web development reference

The developers are not responsible for misuse of this extension.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Amikrsin**
- LinkedIn: [@amikrsin](https://www.linkedin.com/in/amikrsin/)
- GitHub: [@amikrsin](https://github.com/amikrsin)

## 🙏 Acknowledgments

- Built with assistance from Claude AI
- Inspired by the need to overcome Chrome's download limitations
- Thanks to the open-source community

## 📞 Support

If you find this project helpful, please:
- ⭐ Star this repository
- 🐛 Report bugs via [Issues](https://github.com/yourusername/image-downloader-pro/issues)
- 💡 Suggest features via [Discussions](https://github.com/yourusername/image-downloader-pro/discussions)
- 📢 Share with others who might need it

---

**Made with ❤️ and AI assistance | Solving real problems with smart solutions**
