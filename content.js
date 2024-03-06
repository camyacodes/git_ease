chrome.runtime.onMessage.addListener(async (message) => {
  if (message.action === "openPanel") {
    await chrome.sidePanel.open(`sidepanel.html`);
  }
});
