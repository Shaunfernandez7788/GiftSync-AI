"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"

export default function Home() {
  const [profile, setProfile] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [sort, setSort] = useState("best")

  const generate = async () => {
    setLoading(true)
    setResults([])

    let finalProfile = profile
    if (linkedinUrl) finalProfile = `LinkedIn URL: ${linkedinUrl}`

    const res = await fetch("/api/recommend", {
      method: "POST",
      body: JSON.stringify({ profile: finalProfile, currency, min, max })
    })

    const data = await res.json()
    setResults(data)
    setLoading(false)
  }

  const sortedResults = [...results].sort((a, b) => {
    if (sort === "cheap") return Number(a.price) - Number(b.price)
    if (sort === "premium") return Number(b.price) - Number(a.price)
    return b.score - a.score
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-100 px-6 py-12">

      {/* HERO */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Smart Corporate Gifting
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          AI analyzes LinkedIn profiles and finds perfect gifts instantly
        </p>

        <div className="mt-4 inline-block px-4 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
          Powered by AI ✨
        </div>
      </div>

      {/* FORM */}
      <div className="mt-10 max-w-3xl mx-auto bg-white/90 backdrop-blur border border-gray-200 p-8 rounded-2xl shadow-xl space-y-5">

        <input
          placeholder="Paste LinkedIn URL (optional)"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
        />

        <textarea
          placeholder="Or paste LinkedIn profile text..."
          className="w-full h-32 border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />

        <div className="grid grid-cols-3 gap-4">
          <select
            className="border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option>USD</option>
            <option>INR</option>
            <option>EUR</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            className="border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Price"
            className="border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>

        <button
          onClick={generate}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
        >
          <Sparkles size={16} />
          Generate Gifts
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center mt-12 text-gray-700">
          <Loader2 className="animate-spin mb-2" />
          <p>Analyzing profile...</p>
        </div>
      )}

      {/* SORT */}
      {results.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10 flex justify-end">
          <select
            className="border border-gray-300 px-3 py-2 rounded-lg text-gray-900 bg-white shadow-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="best">Best Match</option>
            <option value="cheap">Cheapest</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      )}

      {/* RESULTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-5xl mx-auto">
        {sortedResults.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            {i === 0 && (
              <span className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full">
                Best Match ⭐
              </span>
            )}

            <h3 className="text-lg font-semibold text-gray-900 mt-3">
              {item.title}
            </h3>

            <p className="text-gray-700 text-sm mt-2 leading-relaxed">
              {item.why}
            </p>

            <div className="mt-3 text-indigo-600 font-medium">
              Score: {item.score}/100
            </div>

            <div className="mt-2 font-semibold text-gray-900">
              {item.price} {currency}
            </div>

            <a
              href={item.link}
              target="_blank"
              className="inline-block mt-5 bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-black transition"
            >
              Buy Now →
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}