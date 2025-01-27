"use client"

import { useState, useEffect } from "react"
import { ContrastIcon, Menu, CircleUser } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const images = [
  "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=400&h=300&q=80",
  "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400&h=300&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&q=80",
  "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&h=300&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&q=80",
  "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=400&h=300&q=80",
  "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=300&q=80",
  "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&q=80",
]

function getRandomPosition(maxWidth: number, maxHeight: number) {
  return {
    x: Math.random() * maxWidth,
    y: Math.random() * maxHeight,
  }
}

export default function RecipeFinder() {
  const [mounted, setMounted] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<string | null>(null)
  const [servingSize, setServingSize] = useState<string | null>(null)
  const [imagePositions, setImagePositions] = useState<{ x: number; y: number }[]>([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    setMounted(true)
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1000
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 1000

    const positions = [...Array(images.length * 2)].map(() => getRandomPosition(windowWidth, windowHeight))
    setImagePositions(positions)

    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const ingredients = [
    "Ayam",
    "Ikan",
    "Daging",
    "Sup",
    "Kentang",
    "Salad",
    "Bawang",
    "Kubis",
    "Udang",
    "Telur",
    "Sayur",
    "Nasi",
    "Mee",
    "Tauhu",
  ]

  if (!mounted) return null

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <svg className="fixed inset-0 z-[-1]" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Menu className="h-6 w-6" />
          <div className="flex gap-4">
            <Button variant="ghost">Manifesto</Button>
            <Button variant="ghost">Careers</Button>
            <Button variant="ghost">
              <CircleUser className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            <Button>Join Waitlist</Button>
          </div>
        </div>
      </nav>

      {/* Rotating Images */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Inner Circle */}
        {images.map((src, index) => (
          <div
            key={`inner-${index}`}
            className="absolute transition-all duration-1000 ease-in-out"
            style={{
              animation: `float ${10 + Math.random() * 5}s infinite linear`,
              transform:
                isInitialLoad && imagePositions[index]
                  ? `translate(${imagePositions[index].x}px, ${imagePositions[index].y}px)`
                  : `rotate(${(360 / images.length) * index}deg) translateY(-200px)`,
            }}
          >
            <img
              src={src || "/placeholder.svg"}
              alt={`Recipe ${index + 1}`}
              className="w-32 h-24 object-cover rounded-lg shadow-lg transform -rotate-12 hover:scale-110 transition-transform"
              style={{
                animation: `counterRotate ${10 + Math.random() * 5}s infinite linear`,
              }}
            />
          </div>
        ))}

        {/* Outer Circle */}
        {images.map((src, index) => (
          <div
            key={`outer-${index}`}
            className="absolute transition-all duration-1000 ease-in-out"
            style={{
              animation: `floatReverse ${15 + Math.random() * 5}s infinite linear`,
              transform:
                isInitialLoad && imagePositions[index + images.length]
                  ? `translate(${imagePositions[index + images.length].x}px, ${imagePositions[index + images.length].y}px)`
                  : `rotate(${(360 / images.length) * index}deg) translateY(-400px)`,
            }}
          >
            <img
              src={src || "/placeholder.svg"}
              alt={`Recipe ${index + 9}`}
              className="w-32 h-24 object-cover rounded-lg shadow-lg transform rotate-12 hover:scale-110 transition-transform opacity-60"
              style={{
                animation: `counterRotateReverse ${15 + Math.random() * 5}s infinite linear`,
              }}
            />
          </div>
        ))}

        {/* Center Content */}
        <div className="text-center z-10 px-4">
          <h1 className="text-7xl font-black tracking-tight mb-4">Resepi GPT</h1>
          <p className="text-xl mb-8">
            Tak Perlu Pening Fikir Nak Masak Apa,
            <br />
            Resepi GPT Ada Jawapannya!
          </p>
          {!showSteps && (
            <Button
              size="lg"
              onClick={() => setShowSteps(true)}
              className="rounded-full px-8 py-6 text-lg bg-black hover:bg-gray-800"
            >
              Find Recipe from Ingredients
            </Button>
          )}
        </div>
      </div>

      {/* Steps Container */}
      {showSteps && (
        <div className="relative z-10 mt-[500px] transition-all duration-500 ease-in-out">
          <Card className="mx-auto max-w-2xl space-y-8 p-6 shadow-xl bg-white/95 backdrop-blur">
            {/* Step 1: Ingredients */}
            <div className="space-y-3">
              <h2 className="inline-flex items-center space-x-3 text-xl font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm text-white">
                  1
                </span>
                <span>Select Ingredients</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient) => (
                  <Button
                    key={ingredient}
                    variant={selectedIngredients.includes(ingredient) ? "default" : "outline"}
                    className={`rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedIngredients.includes(ingredient)
                        ? "bg-black text-white hover:bg-gray-800"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      setSelectedIngredients((prev) =>
                        prev.includes(ingredient) ? prev.filter((i) => i !== ingredient) : [...prev, ingredient],
                      )
                    }
                  >
                    {ingredient}
                  </Button>
                ))}
              </div>
            </div>

            {/* Step 2: Difficulty */}
            <div className="space-y-3">
              <h2 className="inline-flex items-center space-x-3 text-xl font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm text-white">
                  2
                </span>
                <span>Difficulty</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <Button
                    key={level}
                    variant={difficulty === level ? "default" : "outline"}
                    className={`rounded-full min-w-[100px] text-sm font-medium transition-all duration-200 ${
                      difficulty === level ? "bg-black text-white hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setDifficulty(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            {/* Step 3: Servings */}
            <div className="space-y-3">
              <h2 className="inline-flex items-center space-x-3 text-xl font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm text-white">
                  3
                </span>
                <span>How many people?</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Single", "Duo", "More than two"].map((size) => (
                  <Button
                    key={size}
                    variant={servingSize === size ? "default" : "outline"}
                    className={`rounded-full min-w-[100px] text-sm font-medium transition-all duration-200 ${
                      servingSize === size ? "bg-black text-white hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setServingSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Find Recipe Button */}
            <div className="pt-4">
              <Button
                className="w-full rounded-full text-lg font-semibold py-6 bg-black hover:bg-gray-800 transition-all duration-200 shadow-lg"
                size="lg"
              >
                Find Recipe
              </Button>
            </div>
          </Card>
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          from { transform: rotate(0deg) translateY(-200px); }
          to { transform: rotate(360deg) translateY(-200px); }
        }

        @keyframes floatReverse {
          from { transform: rotate(360deg) translateY(-400px); }
          to { transform: rotate(0deg) translateY(-400px); }
        }

        @keyframes counterRotate {
          from { transform: rotate(12deg); }
          to { transform: rotate(-348deg); }
        }

        @keyframes counterRotateReverse {
          from { transform: rotate(-12deg); }
          to { transform: rotate(348deg); }
        }

        main::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.4;
          z-index: -1;
          pointer-events: none;
        }
      `}</style>
    </main>
  )
}

