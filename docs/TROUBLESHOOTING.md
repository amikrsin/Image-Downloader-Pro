# Troubleshooting Guide - Image Downloader Pro

## ❌ "No images found on this page"

This is the most common issue. Here's how to fix it:

### Problem: Dimension Filters Too High

**SOLUTION:**
1. Check your **Minimum width** and **Minimum height** settings
2. If they're set to high values (like 1000px or 2000px), most images will be filtered out
3. Use the preset buttons:
   - **All Images**: 0 × 0 (captures everything)
   - **Medium+**: 200 × 200 (excludes tiny icons)
   - **Large Only**: 800 × 600 (only large images)

**Recommended Settings:**
- For most websites: 50-100px minimum
- To include all images: Set both to 0
- To exclude icons: 100-200px minimum

### Other Possible Causes:

**1. Lazy Loading Not Triggered**
- ✅ Enable "Auto-scroll to load lazy images"
- The extension will automatically scroll through the page
- Wait for the scan to complete (may take 10-30 seconds on long pages)

**2. Images Are Behind Login/Paywall**
- The extension can only see what's visible in the DOM
- Log in to the website first, then scan

**3. Images Are in Iframes**
- Some websites load images in separate frames
- The extension can only access the main frame
- Try scanning from the iframe's direct URL

**4. Images Are Dynamically Loaded by JavaScript**
- Enable "Auto-scroll to load lazy images"
- Try manually scrolling through the page first
- Then scan again

## 🔧 Common Issues

### Extension Icon Not Visible
1. Click the puzzle piece 🧩 in Chrome toolbar
2. Find "Image Downloader Pro"
3. Click the pin 📌 icon

### Permission Denied Errors
Some websites block extensions:
- Chrome Web Store pages (chrome.google.com)
- Chrome internal pages (chrome://)
- Some banking/secure sites

### Downloads Not Starting
1. Check if Chrome is blocking downloads:
   - Click the download icon in Chrome
   - Allow downloads from this extension
2. Check your disk space
3. Try downloading smaller batches (10-20 images at a time)

### Extension Not Loading
1. Go to `chrome://extensions/`
2. Find "Image Downloader Pro"
3. Click the refresh icon 🔄
4. If that doesn't work, remove and reinstall

## 💡 Tips for Best Results

### For Websites with Lazy Loading:
1. ✅ Enable "Auto-scroll to load lazy images"
2. Wait for the scan to complete
3. You'll see the page scroll automatically

### For Image-Heavy Pages:
1. Use dimension filters to exclude small icons
2. Set minimum to 200×200 for better results
3. Disable "Include background images" if you only want content images

### For Fast Scanning:
1. ❌ Disable "Auto-scroll to load lazy images"
2. Only scans currently loaded images
3. Much faster but may miss lazy-loaded content

## 📊 Expected Behavior

### Normal Scan (No Auto-Scroll):
- ⏱️ Takes: 1-3 seconds
- 📸 Finds: Currently visible images
- ✅ Best for: Simple pages, already scrolled pages

### Scan with Auto-Scroll:
- ⏱️ Takes: 10-60 seconds depending on page length
- 📸 Finds: All images including lazy-loaded
- ✅ Best for: Image galleries, social media feeds, long articles

## 🎯 Recommended Settings by Use Case

### Social Media (Instagram, Pinterest, etc.):
```
✅ Auto-scroll to load lazy images
✅ Include background images
Minimum: 200 × 200 px
```

### Product Pages (eCommerce):
```
✅ Auto-scroll to load lazy images
❌ Include background images
Minimum: 400 × 400 px
```

### Blog Articles:
```
✅ Auto-scroll to load lazy images
❌ Include background images
Minimum: 300 × 200 px
```

### Design Inspiration (Behance, Dribbble):
```
✅ Auto-scroll to load lazy images
✅ Include background images
Minimum: 600 × 400 px
```

### Download Everything:
```
✅ Auto-scroll to load lazy images
✅ Include background images
Minimum: 0 × 0 px
```

## 🐛 Still Having Issues?

### Check the Console:
1. Right-click the extension icon
2. Select "Inspect popup"
3. Check the Console tab for errors
4. Look for red error messages

### Test on a Simple Page:
1. Go to https://unsplash.com
2. Set minimum dimensions to 0 × 0
3. Enable auto-scroll
4. Click "Scan Page"
5. You should find 50+ images

### Verify Extension Installation:
1. Go to `chrome://extensions/`
2. Find "Image Downloader Pro"
3. Ensure it's enabled (blue toggle)
4. Check that all files are present

## 📞 Need More Help?

If none of these solutions work:
1. Note the website URL you're trying to scan
2. Check your dimension settings
3. Try the "All Images" preset button
4. Verify the page actually has images (view source)

---

**Most issues are solved by adjusting the dimension filters! Try the preset buttons first! 🎯**
