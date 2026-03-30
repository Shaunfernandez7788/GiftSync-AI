import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { profile, currency, min, max } = await req.json()

  const prompt = `
You are a Corporate Gift Strategist.

Generate EXACTLY 4 gift recommendations.

STRICT RULES:
- Stay STRICTLY within budget
- Prices must be realistic numbers (NO symbols)
- Add a score from 70–100
- Output ONLY JSON

Format:
[
  {
    "title": "",
    "why": "",
    "price": "",
    "score": ""
  }
]

Currency: ${currency}
Min: ${min}
Max: ${max}

Profile:
${profile}
`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.6 }
      })
    }
  )

  const data = await response.json()

  try {
    let text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "[]"

    text = text.replace(/```json|```/g, "").trim()

    const match = text.match(/\[[\s\S]*\]/)
    if (!match) throw new Error("No JSON")

    const parsed = JSON.parse(match[0])

    // ✅ STRICT BUDGET FILTER
    const filtered = parsed.filter((item: any) => {
      const price = parseInt(item.price)
      return price >= Number(min) && price <= Number(max)
    })

    const finalItems = filtered.length ? filtered : parsed

    // ✅ ADD IMAGE + LINK
    const enriched = finalItems.map((item: any) => {
      const query = encodeURIComponent(item.title)

      return {
        ...item,
        score: Number(item.score) || 85,
        link: `https://www.amazon.in/s?k=${query}`,
        image: `https://picsum.photos/seed/${query}/400/300`
      }
    })

    return NextResponse.json(enriched)

  } catch {
    return NextResponse.json([])
  }
}