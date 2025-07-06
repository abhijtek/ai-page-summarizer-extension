console.log("✅ content.js loaded");

async function summarizePageText(apiKey, model) {
  const visibleText = document.body.innerText.slice(0, 6000); // increase context

  const prompt = `
Summarize the core content of the following web page (ignore ads, navigation, cookie banners, and unrelated sections):

1. Provide a bold, clear title representing the main topic.
2. Then write 7–12 informative bullet points.
3. Make each bullet point concise and useful.
4. Do not include promotions or disclaimers.

Web page text:
""" 
${visibleText}
"""
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://yourdomain.com",
      "X-Title": "AI Summarizer"
    },
    body: JSON.stringify({
      model,
      messages: [{
        role: "user",
        content: prompt
      }]
    })
  });

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "⚠️ AI returned no summary.";
}

function injectSummaryIntoPage(summaryText) {
  const existing = document.getElementById("ai-summary-box");
  if (existing) existing.remove();

  // Extract title line and bullets
  const lines = summaryText.split("\n").filter(Boolean);
  const title = lines[0];
  const bullets = lines.slice(1);

  const box = document.createElement("div");
  box.id = "ai-summary-box";
  box.innerHTML = `
    <div style="
      background: #fffefa;
      padding: 18px;
      max-width: 480px;
      max-height: 75vh;
      overflow-y: auto;
      font-size: 14px;
      line-height: 1.6;
      border: 2px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 0 12px rgba(0,0,0,0.25);
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999999;
      font-family: system-ui, sans-serif;
    ">
      <div style="font-weight: bold; font-size: 16px; margin-bottom: 10px; color: #444;">
        🧠 ${title.replace(/^(\*\*|__)?(.*?)\1?$/, '$2')}
      </div>
      <ul style="padding-left: 20px; margin: 0;">
        ${bullets.map(line =>
          `<li style="margin-bottom: 6px;">${line.replace(/^[-•\d.]+\s*/, "")}</li>`
        ).join("")}
      </ul>
      <br>
      <button id="close-summary" style="
        margin-top: 12px;
        padding: 6px 10px;
        font-size: 13px;
        background: #eee;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
      ">❌ Close</button>
    </div>
  `;

  document.body.appendChild(box);
  document.getElementById("close-summary").onclick = () => box.remove();
}

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.action === "summarizePage") {
    const summary = await summarizePageText(msg.apiKey, msg.model);
    injectSummaryIntoPage(summary);
  }
});
