# 📸 Image Downloader Pro - Chrome Extension

A powerful Chrome extension that extracts and downloads all images from any webpage, including lazy-loaded images that are difficult to access through the developer console.

## ✨ Features

- **Smart Image Detection**: Finds all images on the page including:
  - Standard `<img>` tags
  - Background images (CSS)
  - Lazy-loaded images (data-src, data-lazy-src)
  - Images in `<picture>` and `<source>` elements
  
- **Lazy Loading Support**: Automatically scrolls through the page to trigger lazy-loaded images

- **Advanced Filtering**:
  - Filter by minimum width and height
  - Exclude tiny icons and tracking pixels
  - Smart duplicate detection

- **Batch Download**: Download multiple images at once with one click

- **Visual Preview**: See thumbnails of all detected images before downloading

- **Organized Downloads**: Images are automatically organized in folders by website and date

## 🚀 Installation

### Method 1: Load Unpacked Extension (Development)

1. **Download the Extension**
   - Download all files from this repository
   - Keep them in a folder named `image-downloader-extension`

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Go to `chrome://extensions/`
   - Or click Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked" button
   - Select the `image-downloader-extension` folder
   - The extension will now appear in your extensions list

5. **Pin the Extension** (Optional)
   - Click the puzzle piece icon in Chrome toolbar
   - Find "Image Downloader Pro"
   - Click the pin icon to keep it visible

### Method 2: Install from Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store after review.

## 📖 How to Use

1. **Navigate to Any Webpage**
   - Go to any website with images you want to download

2. **Open the Extension**
   - Click the Image Downloader Pro icon in your toolbar
   - Or use the keyboard shortcut (if set)

3. **Configure Options** (Optional)
   - ✅ Auto-scroll to load lazy images (recommended)
   - ✅ Include background images
   - Set minimum width/height to filter small images

4. **Scan the Page**
   - Click the "🔍 Scan Page" button
   - The extension will analyze the page and find all images
   - If auto-scroll is enabled, it will automatically scroll through the page

5. **Select Images**
   - Review the detected images with thumbnails
   - All images are selected by default
   - Use "Select All" or "Deselect All" buttons
   - Click individual images to toggle selection

6. **Download**
   - Click "⬇️ Download Selected" button
   - Images will be downloaded to your Downloads folder
   - They will be organized in `Downloads/image-downloader/` folder

## 🎯 Use Cases

- **Web Design**: Save images from websites for inspiration
- **Research**: Collect images for academic or professional projects
- **Archiving**: Backup images from your own websites or blogs
- **Shopping**: Download product images for comparison
- **Social Media**: Save images from galleries and portfolios

## ⚙️ Configuration Options

### Auto-scroll to Load Lazy Images
When enabled, the extension automatically scrolls through the entire page to trigger lazy-loaded images. This is especially useful for:
- Instagram-style infinite scroll feeds
- Image galleries with lazy loading
- Long-form articles with inline images

### Include Background Images
Detects and extracts images used as CSS background images, which are often missed by simple scrapers.

### Minimum Dimensions
Set minimum width and height to filter out:
- Tiny icons and favicons
- Tracking pixels
- UI elements
- Small thumbnails

Default is 100×100 pixels, which filters out most unwanted images while keeping legitimate content.

## 🔒 Privacy & Permissions

This extension requires the following permissions:

- **activeTab**: To access the current page and extract images
- **scripting**: To run content scripts that scan for images
- **downloads**: To save images to your computer

**Privacy Guarantee:**
- No data is sent to external servers
- No tracking or analytics
- All processing happens locally in your browser
- No images are stored by the extension

## 🛠️ Technical Details

### Architecture
- **Manifest V3**: Uses the latest Chrome extension manifest
- **Content Scripts**: Injected into pages to extract images
- **Service Worker**: Background script for download management

### Image Detection Methods
1. **DOM Scanning**: Finds all `<img>` elements
2. **Computed Styles**: Extracts CSS background images
3. **Source Elements**: Checks `<picture>` and `<source>` tags
4. **Attribute Checking**: Looks for data-src, data-lazy-src, currentSrc

### Lazy Loading Strategy
- Scrolls incrementally through the page
- Waits for images to load after each scroll
- Re-scans DOM after scrolling
- Scrolls back to top when complete

## 🐛 Troubleshooting

### No Images Found
- **Check page permissions**: Some sites block extensions
- **Try manual scroll**: Disable auto-scroll and manually scroll first
- **Reduce minimum dimensions**: Lower the width/height filters
- **Check for iframes**: Images in iframes might not be detected

### Images Won't Download
- **Check download permissions**: Ensure Chrome can download files
- **Check disk space**: Make sure you have enough storage
- **Try smaller batches**: Download fewer images at once
- **Check popup blocker**: Ensure downloads aren't blocked

### Extension Not Working
- **Refresh the extension**: Go to chrome://extensions/ and reload it
- **Check for updates**: Make sure Chrome is up to date
- **Review console**: Check for errors in the extension's console
- **Reinstall**: Remove and reinstall the extension

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- ✨ Core image extraction functionality
- ✨ Lazy loading support with auto-scroll
- ✨ Background image detection
- ✨ Dimension-based filtering
- ✨ Visual preview with thumbnails
- ✨ Batch download capability
- ✨ Smart duplicate detection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Development Setup
1. Clone the repository
2. Make your changes
3. Test in Chrome by loading unpacked extension
4. Submit a pull request

## ⚖️ Legal & Ethics

### Responsible Use
- Respect copyright and intellectual property rights
- Only download images you have permission to use
- Check website terms of service before mass downloading
- Don't use for commercial purposes without proper licenses

### Disclaimer
This tool is provided for legitimate use cases such as research, archiving your own content, and personal use. The developers are not responsible for misuse of this extension.

## 📄 License

MIT License - Feel free to use, modify, and distribute.

## 🙏 Acknowledgments

Built with:
- Chrome Extensions API (Manifest V3)
- Vanilla JavaScript (no dependencies!)
- Modern CSS with gradient designs

## 📧 Support

If you encounter issues or have suggestions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review Chrome's extension documentation

---

**Enjoy downloading images with Image Downloader Pro! 📸**
