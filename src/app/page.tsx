"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/recipe-finder/nav/nav-bar"
import { CircleLayout } from "@/components/recipe-finder/circle-layout/circle-layout"
import { Footer } from "@/components/recipe-finder/footer/footer"

export default function RecipeFinder() {
  const [mounted, setMounted] = useState(false)
  const [showSteps, setShowSteps] = useState(false)


  return (
    <main
      className="h-screen relative overflow-hidden"
      style={{
        backgroundColor: "#F5E6D3",
      }}
    >
      <NavBar />
      <CircleLayout onSearchClick={() => {}} />
      <Footer />
    </main>
  )
}