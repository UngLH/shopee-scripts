function performClick() {
  const button = document.querySelector("button"); // Adjust the selector as needed
  if (button) {
    button.click();
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "performClick") {
    performClick();
    sendResponse({ status: "clicked" });
  }
});
