"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/recipe-finder/nav/nav-bar"
import { Footer } from "@/components/recipe-finder/footer/footer"
import SearchInterface from "@/components/recipe-finder/search/search-interface"

export default function RecipeFinder() {
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="py-12">
          <SearchInterface onSearchClick={() => {}} />
        </div>
      </main>

      <Footer />
    </div>
  )
}