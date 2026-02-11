// Background service worker for the extension

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Image Downloader Pro installed');
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadImages') {
    downloadImages(request.images)
      .then(() => sendResponse({ success: true }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep message channel open for async response
  }
});

// Download multiple images
async function downloadImages(images) {
  for (const image of images) {
    try {
      await chrome.downloads.download({
        url: image.url,
        filename: image.filename
      });
    } catch (error) {
      console.error(`Failed to download ${image.url}:`, error);
    }
  }
}
