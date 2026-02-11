// Store found images
let foundImages = [];

// DOM elements
const scanBtn = document.getElementById('scanBtn');
const downloadBtn = document.getElementById('downloadBtn');
const selectAllBtn = document.getElementById('selectAllBtn');
const deselectAllBtn = document.getElementById('deselectAllBtn');
const statusDiv = document.getElementById('status');
const resultsDiv = document.getElementById('results');
const imageList = document.getElementById('imageList');
const imageCount = document.getElementById('imageCount');

// Progress bar elements
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

// Preset buttons
const presetAllBtn = document.getElementById('presetAll');
const presetMediumBtn = document.getElementById('presetMedium');
const presetLargeBtn = document.getElementById('presetLarge');

// Options
const scrollToLoadCheckbox = document.getElementById('scrollToLoad');
const includeBackgroundCheckbox = document.getElementById('includeBackground');
const minWidthInput = document.getElementById('minWidth');
const minHeightInput = document.getElementById('minHeight');
const downloadMethodSelect = document.getElementById('downloadMethod');

// Event listeners
scanBtn.addEventListener('click', scanForImages);
downloadBtn.addEventListener('click', downloadSelectedImages);
selectAllBtn.addEventListener('click', selectAll);
deselectAllBtn.addEventListener('click', deselectAll);

// Preset button listeners
presetAllBtn.addEventListener('click', () => setPreset(0, 0, 'presetAll'));
presetMediumBtn.addEventListener('click', () => setPreset(200, 200, 'presetMedium'));
presetLargeBtn.addEventListener('click', () => setPreset(800, 600, 'presetLarge'));

// Set preset dimensions
function setPreset(width, height, activeBtn) {
  minWidthInput.value = width;
  minHeightInput.value = height;
  
  // Update button states
  document.querySelectorAll('.btn-preset').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(activeBtn).classList.add('active');
}

// Show status message
function showStatus(message, type = 'info') {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  statusDiv.classList.remove('hidden');
}

// Hide status message
function hideStatus() {
  statusDiv.classList.add('hidden');
}

// Update progress bar
function updateProgress(current, total) {
  progressContainer.classList.remove('hidden');
  const percentage = (current / total) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${current} / ${total}`;
}

// Hide progress bar
function hideProgress() {
  progressContainer.classList.add('hidden');
  progressBar.style.width = '0%';
}

// Scan for images
async function scanForImages() {
  showStatus('Scanning page for images...', 'info');
  resultsDiv.classList.add('hidden');
  scanBtn.disabled = true;

  try {
    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Get options
    const options = {
      scrollToLoad: scrollToLoadCheckbox.checked,
      includeBackground: includeBackgroundCheckbox.checked,
      minWidth: parseInt(minWidthInput.value) || 0,
      minHeight: parseInt(minHeightInput.value) || 0
    };

    // Execute content script
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractImages,
      args: [options]
    });

    foundImages = results[0].result;

    if (foundImages.length === 0) {
      showStatus('No images found. Try lowering the minimum dimensions or enabling more options.', 'error');
    } else {
      showStatus(`Found ${foundImages.length} images!`, 'success');
      displayImages();
    }
  } catch (error) {
    showStatus(`Error: ${error.message}`, 'error');
    console.error(error);
  } finally {
    scanBtn.disabled = false;
  }
}

// Display found images
function displayImages() {
  imageList.innerHTML = '';
  imageCount.textContent = foundImages.length;
  resultsDiv.classList.remove('hidden');

  foundImages.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'image-item';
    item.dataset.index = index;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.dataset.index = index;

    const thumbnail = document.createElement('img');
    thumbnail.className = 'image-thumbnail';
    thumbnail.src = img.src;
    thumbnail.onerror = () => {
      thumbnail.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="%23ddd"/><text x="50%" y="50%" font-size="10" text-anchor="middle" dy=".3em" fill="%23999">No Preview</text></svg>';
    };

    const info = document.createElement('div');
    info.className = 'image-info';

    const url = document.createElement('div');
    url.className = 'image-url';
    url.textContent = img.src;
    url.title = img.src;

    const dimensions = document.createElement('div');
    dimensions.className = 'image-dimensions';
    dimensions.textContent = `${img.width} × ${img.height} px`;

    info.appendChild(url);
    info.appendChild(dimensions);

    item.appendChild(checkbox);
    item.appendChild(thumbnail);
    item.appendChild(info);

    // Toggle selection on click
    item.addEventListener('click', (e) => {
      if (e.target.type !== 'checkbox') {
        checkbox.checked = !checkbox.checked;
      }
      item.classList.toggle('selected', checkbox.checked);
      updateDownloadButton();
    });

    checkbox.addEventListener('change', () => {
      item.classList.toggle('selected', checkbox.checked);
      updateDownloadButton();
    });

    if (checkbox.checked) {
      item.classList.add('selected');
    }

    imageList.appendChild(item);
  });

  updateDownloadButton();
}

// Select all images
function selectAll() {
  const checkboxes = imageList.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = true;
    cb.closest('.image-item').classList.add('selected');
  });
  updateDownloadButton();
}

// Deselect all images
function deselectAll() {
  const checkboxes = imageList.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = false;
    cb.closest('.image-item').classList.remove('selected');
  });
  updateDownloadButton();
}

// Update download button state
function updateDownloadButton() {
  const selectedCount = imageList.querySelectorAll('input[type="checkbox"]:checked').length;
  downloadBtn.disabled = selectedCount === 0;
  downloadBtn.innerHTML = `<span class="btn-icon">⬇️</span> Download Selected (${selectedCount})`;
}

// Download selected images
async function downloadSelectedImages() {
  const downloadMethod = downloadMethodSelect.value;
  
  if (downloadMethod === 'direct') {
    return downloadDirectMethod();
  } else {
    return downloadExtensionMethod();
  }
}

// Direct download method - bypasses Chrome limits
async function downloadDirectMethod() {
  const checkboxes = imageList.querySelectorAll('input[type="checkbox"]:checked');
  const selectedIndices = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index));
  const selectedImages = selectedIndices.map(i => foundImages[i]);

  if (selectedImages.length === 0) {
    showStatus('No images selected', 'error');
    return;
  }

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const hostname = new URL(tab.url).hostname.replace(/[^a-z0-9]/gi, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);

    showStatus(`Starting direct download of ${selectedImages.length} images...`, 'info');
    
    // Inject download script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: directDownloadImages,
      args: [selectedImages, hostname, timestamp]
    });

    showStatus(
      `✅ Direct download initiated for ${selectedImages.length} images! ` +
      `Check your Downloads folder (may show save dialogs).`,
      'success'
    );
    
  } catch (error) {
    showStatus(`Error: ${error.message}`, 'error');
    console.error(error);
  }
}

// Function to inject into page for direct downloads
function directDownloadImages(images, hostname, timestamp) {
  let downloaded = 0;
  
  async function downloadImage(img, index) {
    return new Promise((resolve) => {
      try {
        // Method 1: Try fetch + blob download
        fetch(img.src)
          .then(response => response.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const filename = `${hostname}_${timestamp}_${String(index + 1).padStart(4, '0')}.jpg`;
            
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            
            setTimeout(() => {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              resolve(true);
            }, 100);
          })
          .catch(() => {
            // Method 2: Fallback to direct link
            const a = document.createElement('a');
            const filename = `${hostname}_${timestamp}_${String(index + 1).padStart(4, '0')}.jpg`;
            
            a.href = img.src;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            
            setTimeout(() => {
              document.body.removeChild(a);
              resolve(true);
            }, 100);
          });
      } catch (e) {
        console.error('Download failed:', e);
        resolve(false);
      }
    });
  }

  async function processQueue() {
    for (let i = 0; i < images.length; i++) {
      await downloadImage(images[i], i);
      downloaded++;
      
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    console.log(`Completed downloading ${downloaded} images`);
  }

  processQueue();
}

// Extension API download method - original method
async function downloadExtensionMethod() {
  const checkboxes = imageList.querySelectorAll('input[type="checkbox"]:checked');
  const selectedIndices = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index));
  const selectedImages = selectedIndices.map(i => foundImages[i]);

  if (selectedImages.length === 0) {
    showStatus('No images selected', 'error');
    return;
  }

  // Check if user has many images selected - warn them
  if (selectedImages.length > 50) {
    const proceed = confirm(
      `You're about to download ${selectedImages.length} images.\n\n` +
      `IMPORTANT:\n` +
      `1. Keep this popup window OPEN during download\n` +
      `2. Allow downloads when Chrome prompts you\n` +
      `3. This will take approximately ${Math.ceil(selectedImages.length / 10 * 2.5 / 60)} minutes\n\n` +
      `Click OK to proceed, Cancel to stop.`
    );
    
    if (!proceed) {
      return;
    }
  }

  downloadBtn.disabled = true;
  hideStatus();
  updateProgress(0, selectedImages.length);
  
  let successCount = 0;
  let failCount = 0;

  try {
    // Get current tab URL for naming
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const hostname = new URL(tab.url).hostname.replace(/[^a-z0-9]/gi, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);

    // MORE CONSERVATIVE SETTINGS for Chrome's strict limits
    const BATCH_SIZE = 5; // Reduced from 10 - more conservative
    const DELAY_BETWEEN_BATCHES = 3000; // Increased to 3 seconds
    const DELAY_BETWEEN_DOWNLOADS = 500; // Increased to 500ms - more breathing room

    // Try to ensure downloads permission
    showStatus('Preparing downloads... Please allow downloads if Chrome prompts you.', 'info');
    await new Promise(resolve => setTimeout(resolve, 1000));

    for (let batchStart = 0; batchStart < selectedImages.length; batchStart += BATCH_SIZE) {
      const batchEnd = Math.min(batchStart + BATCH_SIZE, selectedImages.length);
      const currentBatch = selectedImages.slice(batchStart, batchEnd);
      const batchNumber = Math.floor(batchStart / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(selectedImages.length / BATCH_SIZE);

      // Download current batch
      for (let i = 0; i < currentBatch.length; i++) {
        const img = currentBatch[i];
        const globalIndex = batchStart + i;
        const filename = `${hostname}_${timestamp}_${String(globalIndex + 1).padStart(4, '0')}_${getFilenameFromUrl(img.src)}`;

        try {
          // Use data URL conversion for better compatibility
          const downloadId = await chrome.downloads.download({
            url: img.src,
            filename: `image-downloader/${hostname}/${filename}`,
            saveAs: false,
            conflictAction: 'uniquify'
          });
          
          // Wait for download to start
          await waitForDownloadStart(downloadId);
          successCount++;
          
        } catch (error) {
          console.error(`Failed to download ${img.src}:`, error);
          
          // Try alternative download method
          try {
            await downloadViaFetch(img.src, `${hostname}/${filename}`);
            successCount++;
          } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            failCount++;
          }
        }

        // Update progress
        updateProgress(successCount + failCount, selectedImages.length);

        // Delay between individual downloads
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_DOWNLOADS));
      }

      // Show batch progress
      if (batchEnd < selectedImages.length) {
        showStatus(
          `Completed batch ${batchNumber}/${totalBatches}. ` +
          `Downloaded: ${successCount}, Failed: ${failCount}. ` +
          `Next batch in 3 seconds...`,
          'info'
        );
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
      }
    }

    // Hide progress and show final status
    hideProgress();
    
    if (failCount === 0) {
      showStatus(`✅ Successfully downloaded all ${successCount} images!`, 'success');
    } else {
      showStatus(`Downloaded ${successCount} images. ${failCount} failed. Check console for details.`, 'success');
    }
  } catch (error) {
    hideProgress();
    showStatus(`Error downloading images: ${error.message}`, 'error');
    console.error(error);
  } finally {
    downloadBtn.disabled = false;
    updateDownloadButton();
  }
}

// Wait for download to actually start
async function waitForDownloadStart(downloadId, timeout = 2000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const checkInterval = setInterval(async () => {
      try {
        const [download] = await chrome.downloads.search({ id: downloadId });
        
        if (download && (download.state === 'in_progress' || download.state === 'complete')) {
          clearInterval(checkInterval);
          resolve();
        } else if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
          resolve(); // Timeout but don't fail
        }
      } catch (e) {
        clearInterval(checkInterval);
        resolve(); // Error but don't fail
      }
    }, 100);
  });
}

// Alternative download method using fetch and blob
async function downloadViaFetch(imageUrl, filename) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const dataUrl = await blobToDataURL(blob);
    
    await chrome.downloads.download({
      url: dataUrl,
      filename: `image-downloader/${filename}`,
      saveAs: false,
      conflictAction: 'uniquify'
    });
  } catch (error) {
    throw new Error(`Fetch download failed: ${error.message}`);
  }
}

// Convert blob to data URL
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Get filename from URL
function getFilenameFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const filename = pathname.split('/').pop();
    return filename || 'image.jpg';
  } catch {
    return 'image.jpg';
  }
}

// Content script function - this runs in the page context
function extractImages(options) {
  return new Promise(async (resolve) => {
    const images = new Map(); // Use Map to avoid duplicates

    // Function to add image to collection
    function addImage(src, width, height) {
      // Filter by dimensions
      if (width < options.minWidth || height < options.minHeight) {
        return;
      }

      // Avoid data URLs and very small images
      if (src.startsWith('data:') && src.length < 100) {
        return;
      }

      // Convert relative URLs to absolute
      try {
        const absoluteUrl = new URL(src, window.location.href).href;
        
        // Store unique images
        if (!images.has(absoluteUrl)) {
          images.set(absoluteUrl, { src: absoluteUrl, width, height });
        }
      } catch (e) {
        // Invalid URL, skip
      }
    }

    // Extract images from <img> tags
    function extractImgTags() {
      const imgElements = document.querySelectorAll('img');
      imgElements.forEach(img => {
        // Try different src attributes
        const src = img.currentSrc || img.src || img.dataset.src || img.dataset.lazySrc;
        if (src) {
          addImage(src, img.naturalWidth || img.width, img.naturalHeight || img.height);
        }
      });
    }

    // Extract background images
    function extractBackgroundImages() {
      if (!options.includeBackground) return;

      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;
        
        if (bgImage && bgImage !== 'none') {
          const urlMatches = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/g);
          if (urlMatches) {
            urlMatches.forEach(match => {
              const url = match.match(/url\(['"]?([^'"]+)['"]?\)/)[1];
              if (url) {
                // Create temporary image to get dimensions
                const tempImg = new Image();
                tempImg.onload = function() {
                  addImage(url, this.width, this.height);
                };
                tempImg.src = url;
              }
            });
          }
        }
      });
    }

    // Extract from picture and source elements
    function extractPictureElements() {
      const pictures = document.querySelectorAll('picture');
      pictures.forEach(picture => {
        const sources = picture.querySelectorAll('source');
        sources.forEach(source => {
          const srcset = source.srcset;
          if (srcset) {
            const urls = srcset.split(',').map(s => s.trim().split(' ')[0]);
            urls.forEach(url => {
              const img = new Image();
              img.onload = function() {
                addImage(url, this.width, this.height);
              };
              img.src = url;
            });
          }
        });
      });
    }

    // Scroll to trigger lazy loading
    async function scrollToLoad() {
      if (!options.scrollToLoad) return;

      const scrollStep = window.innerHeight;
      const scrollDelay = 300;
      let currentScroll = 0;
      const maxScroll = document.documentElement.scrollHeight;

      while (currentScroll < maxScroll) {
        window.scrollTo(0, currentScroll);
        await new Promise(resolve => setTimeout(resolve, scrollDelay));
        currentScroll += scrollStep;
        
        // Re-extract images after each scroll
        extractImgTags();
      }

      // Scroll back to top
      window.scrollTo(0, 0);
    }

    // Execute extraction
    extractImgTags();
    extractBackgroundImages();
    extractPictureElements();

    // If scroll to load is enabled, do that and re-extract
    if (options.scrollToLoad) {
      await scrollToLoad();
      // Wait a bit for final images to load
      await new Promise(resolve => setTimeout(resolve, 500));
      extractImgTags();
      extractBackgroundImages();
      extractPictureElements();
    }

    // Convert Map to Array and resolve
    resolve(Array.from(images.values()));
  });
}
