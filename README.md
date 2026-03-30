# 🎁 GiftSync AI

AI-powered corporate gifting platform that analyzes LinkedIn profiles and suggests personalized gift ideas instantly.

## 🚀 Features

* 🔗 Paste LinkedIn profile URL or text
* 💡 AI-generated personalized gift recommendations
* 💰 Budget filtering (min & max)
* 🌍 Currency selection (USD, INR, EUR)
* 📊 Smart ranking (Best, Cheapest, Premium)
* 🛒 Direct purchase links
* 🎨 Clean light-themed modern UI

## 🛠 Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Gemini API (Google AI)

## ⚙️ Setup

1. Clone the repo:

```bash
git clone https://github.com/Shaunfernandez7788/GiftSync-AI.git
cd GiftSync-AI
```

2. Install dependencies:

```bash
npm install
```

3. Add environment variables:
   Create `.env.local`:

```
GEMINI_API_KEY=your_api_key_here
```

4. Run the app:

```bash
npm run dev
```

Open http://localhost:3000

## 📦 API

POST `/api/recommend`

Request:

```json
{
  "profile": "LinkedIn profile text or URL",
  "currency": "USD",
  "min": "20",
  "max": "100"
}
```

## ✨ Future Improvements

* Real LinkedIn data scraping (via API)
* Better product integrations (Amazon/Flipkart)
* Gift images + previews
* User accounts & saved suggestions

## 👨‍💻 Author

Shaun Fernandez

---

⭐ If you like this project, give it a star!
