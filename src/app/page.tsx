"use client"

import { NavBar } from "@/components/recipe-finder/nav/nav-bar"
import { Footer } from "@/components/recipe-finder/footer/footer"
import SearchInterface from "@/components/recipe-finder/search/search-interface"

export default function RecipeFinder() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 bg-gradient-to-b from-green-50 to-white">
        <SearchInterface onSearchClick={() => {}} />
      </main>
      <Footer />
    </div>
  )
}