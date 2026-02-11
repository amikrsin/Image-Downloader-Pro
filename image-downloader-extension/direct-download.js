// Alternative download script - inject into page
// This bypasses Chrome's extension download limits by using native browser download

function downloadImagesDirectly(images, hostname, timestamp) {
  let downloadCount = 0;
  let currentIndex = 0;

  function downloadNext() {
    if (currentIndex >= images.length) {
      console.log(`All ${downloadCount} images downloaded!`);
      return;
    }

    const img = images[currentIndex];
    const filename = `${hostname}_${timestamp}_${String(currentIndex + 1).padStart(4, '0')}_${getFilename(img.src)}`;
    
    // Create hidden anchor element
    const a = document.createElement('a');
    a.href = img.src;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    downloadCount++;
    currentIndex++;
    
    // Report progress
    window.postMessage({
      type: 'DOWNLOAD_PROGRESS',
      current: currentIndex,
      total: images.length
    }, '*');
    
    // Continue with next download after delay
    setTimeout(downloadNext, 300); // 300ms between downloads
  }

  function getFilename(url) {
    try {
      const pathname = new URL(url).pathname;
      return pathname.split('/').pop() || 'image.jpg';
    } catch {
      return 'image.jpg';
    }
  }

  // Start downloading
  downloadNext();
}

// Execute
downloadImagesDirectly(
  window.__IMAGES_TO_DOWNLOAD__,
  window.__DOWNLOAD_HOSTNAME__,
  window.__DOWNLOAD_TIMESTAMP__
);
