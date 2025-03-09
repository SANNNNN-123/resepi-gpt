"use client"

import { useState } from "react"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { NavBar } from "@/components/recipe-finder/nav/nav-bar"
import { Footer } from "@/components/recipe-finder/footer/footer"
import SearchInterface from "@/components/recipe-finder/search/search-interface"

export default function RecipeFinder() {
  const [key, setKey] = useState(0)

  const handleReset = () => {
    setKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar onHomeClick={handleReset} />
      <main className="flex-1 bg-gradient-to-b from-green-50 to-white">
        <SearchInterface key={key} />
      </main>
      <Footer />
      <Analytics />
      
      {/* Umami Analytics */}
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="a8d44d16-6cad-4a92-b9ae-3a72a949c452"
        strategy="afterInteractive"
        defer
      />
    </div>
  )
}