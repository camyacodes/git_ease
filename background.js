chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "openPanel") {
    chrome.sidePanel.open(`sidepanel.html`);
  }
});
