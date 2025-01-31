"use client"

import { useState } from "react"
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
    </div>
  )
}