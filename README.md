# 🔍 AI Page Summarizer – Chrome Extension

A Chrome Extension that summarizes any web page using OpenRouter AI (Claude/GPT). It intelligently identifies headings and bullet points, then inserts a clean, readable summary **directly onto the page**.

---

## ⚡ Features

✅ Summarizes visible webpage content  
✅ Adds styled summary with **bolded headings**  
✅ Uses OpenRouter API (Claude 3 or GPT 3.5)  
✅ Lets user choose API key + model  
✅ Injects summary in a readable format  
✅ Fully local – works from Chrome extension bar  
✅ No server, no backend required

---



---

## 🚀 Installation (for reviewers/interviewers)

1. **Download the ZIP** from GitHub  
2. **Extract** the folder  
3. Open Chrome and go to `chrome://extensions`  
4. Enable **Developer Mode** (top right)  
5. Click **"Load unpacked"**  
6. Select this extracted folder

---

## 🔑 How to Use

1. Click the extension icon 🧠
2. Paste your OpenRouter API key  
   → Get one free at [https://openrouter.ai/keys](https://openrouter.ai/keys)  
3. Choose a model (e.g., Claude 3 Haiku or GPT-3.5 Turbo)  
4. Click **"Summarize"**  
5. The summary will appear in a floating window independent of page.

---

## 🧠 How It Works

- Extracts visible text (`document.body.innerText`)
- Sends to OpenRouter API with a smart prompt
- AI returns 5–10 key bullet points
- Injects it as a styled `<div>` into the page
- Bolded headings + auto formatting included

---

## 🔗 OpenRouter Supported Models

✅ `anthropic/claude-3-haiku` (default, fast + free)  
✅ `openai/gpt-3.5-turbo`  
✅ Any other model supported by OpenRouter

---

## 🛠 Developer Notes

- Chrome Manifest v3  
- Fully front-end only  
- All logic in `content.js`  
- Styling in `styles.css`

---

## 💡 Customize

Want to change how the summary looks?
Edit `content.js` → look for the `insertSummaryToPage()` function and adjust HTML/CSS styles.

---

## 📜 License

MIT – free to use and modify.

---

## ✨ Credits

Made by Abhijeet Singh Rajput  
API powered by [OpenRouter.ai](https://openrouter.ai)
