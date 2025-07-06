document.getElementById("summarize").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKey").value.trim();
  const model = document.getElementById("model").value;
  if (!apiKey) return alert("API Key required");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "summarizePage",
      apiKey,
      model
    });
  });
});
