chrome.runtime.onInstalled.addListener(() => {
  // Initialize setup state
  chrome.storage.local.set({ 'claudeSetupComplete': false });
});

// Check if setup is complete
chrome.storage.local.get(['claudeSetupComplete'], (result) => {
  if (result.claudeSetupComplete) {
    console.log('Claude setup already completed');
  }
});
