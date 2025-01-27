"use client"

import { useState, useEffect } from "react"
import { Github , Menu, CircleUser,ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const images = [
  "https://resepichenom.com/images/recipes/DSC_0216-1-2.jpg",
  "https://resepichenom.com/images/recipes/Spaghetti_Sos_Bolognese_Homemade_Web.jpg",
  "https://resepichenom.com/images/recipes/Nasi_Lemak_Bunga_Telang.jpg",
  "https://resepichenom.com/images/recipes/Nasi_Lemak_Everest-3.jpg",
  "https://resepichenom.com/images/recipes/4e4d34524b5f258c87091b49b8c5aed74a203f92.jpeg",
  "https://resepichenom.com/images/recipes/Ayam_Masak_Merah-2.jpg",
  "https://resepichenom.com/images/recipes/Puding_Koktail.jpg",
  "https://resepichenom.com/images/recipes/Ayam_Honey_Butter_Korea_IG.jpg",
  "https://resepichenom.com/images/recipes/731d22d3f40d13130adad26538c249ba0a07c15a.jpeg",
  "https://resepichenom.com/images/recipes/Double_Chocolate_Chip_Muffin.jpg",
  "https://resepichenom.com/images/recipes/cm5w2b1js00euk9licfz4eskq-1736834405094.jpg",
  "https://resepichenom.com/images/recipes/Char_Kuey_Teow.JPG",
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
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
      `}</style>
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
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${showSteps ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
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
        <div className="text-center z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <ChefHat className="w-16 h-16" />
            <h1 
              className="text-[92px] leading-none tracking-tight"
              style={{ fontFamily: "'Alfa Slab One', cursive" }}
            >
              Resepi GPT
            </h1>
          </div>
          <p 
            className="text-xl mb-8 text-gray-600"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Tak Perlu Pening Fikir Nak Masak Apa,
            <br />
            Resepi GPT Ada Jawapannya!
          </p>
          {!showSteps && (
            <Button
              size="lg"
              onClick={() => setShowSteps(true)}
              className="rounded-full px-8 py-6 text-lg bg-black hover:bg-gray-800"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Find Recipe from Ingredients
            </Button>
          )}
        </div>
      </div>

      {/* Steps Container */}
      {showSteps && (
        <div className="fixed inset-0 z-10 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-y-auto">
          <div className="min-h-screen py-16 px-4 flex items-start justify-center">
            <Card className="w-full max-w-2xl space-y-6 p-4 md:p-6 shadow-xl bg-white/95 backdrop-blur my-4">
              {/* Back Button */}
              <Button 
                variant="ghost" 
                onClick={() => setShowSteps(false)}
                className="mb-2 text-gray-600 hover:text-black"
              >
                ← Back
              </Button>

              {/* Step 1: Ingredients */}
              <div className="space-y-3">
                <h2 className="inline-flex items-center space-x-3 text-lg md:text-xl font-semibold">
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

              {/* Rest of steps remain the same, just adjust spacing */}
              <div className="space-y-3">
                <h2 className="inline-flex items-center space-x-3 text-lg md:text-xl font-semibold">
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

              <div className="space-y-3">
                <h2 className="inline-flex items-center space-x-3 text-lg md:text-xl font-semibold">
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
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-4 z-20 shadow-lg border-t border-gray-100">
        <div className="text-center flex items-center justify-center gap-3">
          <p className="text-gray-700 text-sm">
            Made by <span className="underline font-medium hover:text-black transition-colors">Zuhair Aziz</span> v1.01
          </p>
          <div className="h-4 w-px bg-gray-300"></div>
          <a 
            href="https://github.com/SANNNNN-123" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-black text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100 font-bold"
            aria-label="Visit GitHub Profile"
          >
            <Github className="h-5 w-5" strokeWidth={2.5} />
          </a>
        </div>
      </footer>

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

