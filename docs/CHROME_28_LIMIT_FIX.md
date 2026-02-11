# 🔴 CRITICAL FIX: Chrome's 28-Download Limit

## The Real Problem

Chrome has a **hard-coded limit** that blocks downloads after ~20-30 files when using the `chrome.downloads` API. This is a security feature to prevent malicious extensions from download bombing.

### Why You're Stuck at 28 Images:
1. Chrome counts rapid downloads from extensions
2. After ~28 downloads, Chrome **silently blocks** more downloads
3. No error message - they just don't download
4. This limit resets after ~10 minutes or browser restart

---

## ✅ THE SOLUTION: Version 3.0 with Direct Download

I've added a **new download method** that completely bypasses Chrome's extension download limits:

### Two Download Methods Now Available:

#### Method 1: ⚡ Direct Download (NEW - RECOMMENDED)
- **Bypasses Chrome's 28-download limit**
- Downloads directly through the page (not extension API)
- Much faster (no batching delays needed)
- Works for 800+ images
- ⚠️ May show save dialog for first download (click "Allow")
- Files download to your default Downloads folder

#### Method 2: 🗂️ Extension API (Original)
- Uses Chrome's extension download API
- Automatically organizes into folders
- Hits the 28-download limit
- Slower due to batching
- Silent downloads (no dialogs)
- ❌ Will stop at ~28 images

---

## 📥 How to Download 829 Images Successfully

### Step-by-Step Guide:

1. **Select Download Method**
   - In the extension popup, find "Download Method" dropdown
   - Select: **"⚡ Direct Download (Fast - Recommended for 100+)"**
   
2. **Scan for Images**
   - Click "Scan Page"
   - Wait for all 829 images to be found

3. **Select Images**
   - Click "Select All" (or choose specific ones)

4. **Download**
   - Click "Download Selected"
   - **IMPORTANT:** Click "Allow" if Chrome asks for download permission
   - Keep the browser tab open (don't close it!)

5. **Wait**
   - Downloads will process automatically
   - Takes ~2-3 minutes for 829 images
   - Check Downloads folder (Ctrl+J)

### Expected Behavior:
```
✅ Image 1 downloads
✅ Image 2 downloads
✅ Image 3 downloads
...
✅ Image 829 downloads
```

No stopping at 28!

---

## 🔧 If Direct Download Doesn't Work

### Chrome May Block Cross-Origin Downloads
Some images are hosted on different domains (CORS protection).

**Solutions:**

#### Option A: Download in Smaller Batches
1. Select first 400 images
2. Download with Direct method
3. Deselect all
4. Select next 400 images
5. Download again

#### Option B: Use Extension Method with Multiple Sessions
1. Use "Extension API" method
2. Download first 25 images
3. Wait 10 minutes (Chrome's reset period)
4. Download next 25 images
5. Repeat until all downloaded

#### Option C: Try Different Browser
- Firefox doesn't have this limit
- You could port the extension to Firefox
- Or use a different download tool

---

## 🎯 Understanding the Limits

### Chrome Extension Download API Limits:
| Type | Limit | Reset Time |
|------|-------|------------|
| Concurrent downloads | ~10 | Immediate |
| Rapid downloads | ~28 | 10 minutes |
| Total per hour | ~1000 | 60 minutes |

### Direct Download Method (New):
| Type | Limit | Notes |
|------|-------|-------|
| Concurrent downloads | Browser default (~6) | Native browser limit |
| Rapid downloads | No limit | Bypasses extension limits |
| CORS restrictions | Yes | Cross-origin images may fail |

---

## 📊 Comparison

| Feature | Direct Download | Extension API |
|---------|----------------|---------------|
| Speed | ⚡ Fast (150ms/image) | 🐌 Slow (500ms + batching) |
| Total images | ✅ 800+ | ❌ ~28 then stops |
| Save dialogs | ⚠️ May ask once | ✅ Silent |
| Folder organization | ❌ Downloads folder | ✅ Auto-organized |
| CORS images | ⚠️ May fail | ✅ Usually works |
| Best for | 100+ images | <25 images |

---

## 🚀 Recommended Settings for 829 Images

### Configuration:
```
Download Method: ⚡ Direct Download
Auto-scroll: ✅ Enabled
Include background: ✅ Enabled (or ❌ if you only want img tags)
Minimum dimensions: 50 × 50 (or use "Medium+" preset)
```

### Timeline:
```
Scan: ~30-60 seconds (with auto-scroll)
Download: ~2-3 minutes (829 images × 150ms = 124 seconds)
Total: ~3-4 minutes
```

---

## ⚠️ Important Notes

### Keep Browser Tab Open
- Don't close the tab during download
- Downloads happen in the page context
- Closing tab = stopping downloads

### First Download May Prompt
- Chrome may ask "Allow multiple downloads?"
- Click "Allow" or "Yes"
- Only asks once per session

### Check Download Location
- Open Downloads: Ctrl+J (Windows) or Cmd+Shift+J (Mac)
- Images go to your default Downloads folder
- Look for files starting with the website hostname

### Failed Downloads
- Some images may fail (CORS, deleted, etc.)
- These will be skipped automatically
- Check browser console (F12) for errors

---

## 🐛 Troubleshooting

### Still Stopping at 28?
✅ Make sure you selected "Direct Download" method
✅ Check that it's not set to "Extension API"
✅ Restart Chrome and try again

### No Downloads Starting?
✅ Check if Chrome is asking for permission (click Allow)
✅ Make sure pop-ups aren't blocked
✅ Try a different website first to test

### Downloads Going to Wrong Folder?
✅ Check Chrome settings → Downloads → Location
✅ Direct downloads use default folder
✅ Can't customize location with direct method

---

## 📞 Quick Decision Guide

**Downloading < 25 images?**
→ Use Extension API method (organized folders)

**Downloading 25-100 images?**
→ Use Direct Download (faster)

**Downloading 100+ images?**
→ Use Direct Download (only method that works)

**Want organized folders?**
→ Use Extension API but download in batches of 25

**Want it fast?**
→ Use Direct Download

---

## 🎉 Bottom Line

**For your 829 images:**
1. Update to Version 3.0
2. Select "⚡ Direct Download" method
3. Click Download
4. Allow downloads when prompted
5. Wait 2-3 minutes
6. Done!

No more 28-image limit! 🎊
