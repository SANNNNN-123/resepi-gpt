"use client"

import { useState, useEffect } from "react"
import { Github, Menu, CircleUser, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Selected subset of images for the collage
const List1 = [
  "https://resepichenom.com/images/recipes/DSC_0216-1-2.jpg",
  "https://resepichenom.com/images/recipes/Spaghetti_Sos_Bolognese_Homemade_Web.jpg",
  "https://resepichenom.com/images/recipes/Nasi_Lemak_Bunga_Telang.jpg",
  "https://resepichenom.com/images/recipes/Nasi_Lemak_Everest-3.jpg",
  "https://resepichenom.com/images/recipes/Ayam_Masak_Merah-2.jpg",
  "https://resepichenom.com/images/recipes/Puding_Koktail.jpg",
  "https://resepichenom.com/images/recipes/Double_Chocolate_Chip_Muffin.jpg",
]

const List2 = [
  'https://resepichenom.com/images/recipes/Kek_Coklat_microwave.JPG', 
  'https://resepichenom.com/images/recipes/e029853f1fddaa16622fb7cda49997f65c0af60e.jpeg', 
  'https://resepichenom.com/images/recipes/Spaghetti_Sos_Bolognese_Homemade_Web.jpg', 
  'https://resepichenom.com/images/recipes/9499102dadf3d464ae8bff1b31a47ca924b82e74.jpeg',  
  'https://resepichenom.com/images/recipes/Siakap_Bakar_Bersambal.jpg', 
  'https://resepichenom.com/images/recipes/751fb36310ad199938d5792c38369198805ee6b6.jpeg',
  'https://resepichenom.com/images/recipes/Ayam_Rempah_Nasi_Lemak_Kukus.jpg',
]

const List3 = [
  'https://resepichenom.com/images/recipes/Mee_Bandung_IG_2.jpg', 
  'https://resepichenom.com/images/recipes/Cekodok_Pisang_Gebu_Garing_Di_Luar.jpg', 
  'https://resepichenom.com/images/recipes/Singgang_Ikan_Kembung_Web.jpg', 
  'https://resepichenom.com/images/recipes/3135f4e2e187ab92b3535504f36967b52b774387.jpeg', 
  'https://resepichenom.com/images/recipes/7e09278218f1e78e6bcc7ee3eab8f32169949ba4.jpeg', 
  'https://resepichenom.com/images/recipes/Nasi_Lemak_Bunga_Telang.jpg', 
  'https://resepichenom.com/images/recipes/Kuetiau_Ladna_Wa_Tan_Hor.jpg', 
]
const List4 = [
  'https://resepichenom.com/images/recipes/947964ac61f78c9437e13d2af9c81f182bb0dafa.jpeg', 
  'https://resepichenom.com/images/recipes/Ikan_Bakar_Air_Asam_IG.JPG', 
  'https://resepichenom.com/images/recipes/Ayam_Rempah_Nasi_Lemak_Kukus.jpg', 
  'https://resepichenom.com/images/recipes/6395a8fb1eedceb96bbf379c11c69760628d82e7.jpeg', 
  'https://resepichenom.com/images/recipes/0785eba82048d256de78dfb6f4964c79b283a8c9.jpeg', 
  'https://resepichenom.com/images/recipes/7dad70e341186e4ac2c1ede4f7e44c4dd03abdf4.jpeg',
  'https://resepichenom.com/images/recipes/Roti_Canai.jpg'
]

const List5 = [
  'https://resepichenom.com/images/recipes/Ayam_Masak_Cili_Padi.jpg', 
  'https://resepichenom.com/images/recipes/Sizzling_Yee_Mee.jpg', 
  'https://resepichenom.com/images/recipes/a73946bf71992434e52fdc18eac37ac34c5744ee.jpeg', 
  'https://resepichenom.com/images/recipes/9499102dadf3d464ae8bff1b31a47ca924b82e74.jpeg', 
  'https://resepichenom.com/images/recipes/Ayam_Rempah_Nasi_Lemak_Kukus.jpg', 
  'https://resepichenom.com/images/recipes/02a68b2fc85c1b122ef0b6a0d89216df98dcc004.jpeg'
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

    const positions = [...Array(List3.length * 2)].map(() => getRandomPosition(windowWidth, windowHeight))
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
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: "#F5E6D3",
      }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
      `}</style>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-[100] p-6">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              className="text-gray-800 hover:text-gray-900 bg-white rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <CircleUser className="mr-2 h-5 w-5" />
              Sign In
            </Button>
            <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
              Join Waitlist
            </Button>
          </div>
        </div>
      </nav>

      {/* Static Collage Layout */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          showSteps ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Top collage */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[800px] h-[400px]">
          {/* Top layered images */}
          <div className="absolute top-0 left-0 right-0 w-full h-full">
            {List4.slice(0, 6).map((src, index) => (
              <div
                key={index}
                className="absolute rounded-lg overflow-hidden"
                style={{
                  width: "250px",
                  height: "180px",
                  left: `${100 + index * 100}px`,
                  top: `${Math.abs(index - 2.5) * 30}px`, // Creates inward curve
                  transform: `rotate(${10 + index * 5}deg)`,
                  opacity: 0.4 + index * (0.1),
                  zIndex: index,
                }}
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Recipe ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Top featured image */}
          <div className="absolute bottom-0 left-[100px]">
            <div
              className="w-[250px] h-[180px] rounded-lg overflow-hidden"
              style={{
                transform: "rotate(-30deg)",
              }}
            >
              <img
                src={List4[6] || "/placeholder.svg"}
                alt="Featured Recipe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Left side collage */}
        <div className="relative w-[530px] h-[800px] rounded-lg left-[-200px] bottom-5">
          {/* Left side layered images */}
          <div className="absolute left-0 bottom-0 w-2/3 h-full">
            {List1.slice(0, 6).map((src, index) => (
              <div
                key={index}
                className="absolute rounded-lg overflow-hidden"
                style={{
                  width: "250px",
                  height: "180px",
                  left: `${index * 10}px`,
                  bottom: `${Math.abs(index + 2) * 76}px`,
                  transform: `rotate(${15 + index * 5}deg)`,
                  opacity: 0.4 + index * (0.1),
                  zIndex: index,

                  
                }}
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Recipe ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Left side featured image */}
          <div className="absolute left-[280px] bottom-32">
          <div
              className="w-[250px] h-[180px] rounded-lg overflow-hidden"
              style={{
                transform: "rotate(10deg)",
              }}
            >
              <img
                src={List1[6] || "/placeholder.svg"}
                alt="Featured Recipe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right side collage (new) */}
        <div className="relative w-[550px] h-[800px] rounded-lg right-[-300px] bottom-5">
          {/* Right side layered images */}
          <div className="absolute right-0 bottom-0 w-2/3 h-full">
            {List3.slice(0, 6).map((src, index) => (
              <div
                key={index}
                className="absolute rounded-lg overflow-hidden"
                style={{
                  width: "250px",
                  height: "180px",
                  right: `${index * 5}px`,
                  bottom: `${100 + index * 70}px`,
                  transform: `rotate(${-20 - index * 2}deg)`,
                  opacity: 0.4 + index * (0.1),
                  zIndex: index,
                }}
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Recipe ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right side featured image */}
          <div className="absolute left-0 top-[90px]">
            <div
              className="w-[250px] h-[180px] rounded-lg overflow-hidden"
              style={{
                transform: "rotate(-20deg)",
              }}
            >
              <img
                src={List3[6] || "/placeholder.svg"}
                alt="Featured Recipe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom collage */}
        <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[800px] h-[400px]">
          {/* Bottom layered images */}
          <div className="absolute bottom-0 left-0 right-0 w-full h-full">
            {List2.slice(0, 6).map((src, index) => (
              <div
                key={index}
                className="absolute rounded-lg overflow-hidden"
                style={{
                  width: "250px",
                  height: "180px",
                  left: `${100 + index * 100}px`,
                  bottom: `${Math.abs(index - 2.5) * 20}px`,
                  transform: `rotate(${10 + index * 5}deg)`,
                  opacity: 0.4 + index * (0.1),
                  zIndex: index,
                }}
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Recipe ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Bottom featured image */}
          <div className="absolute top-0 right-[-130px]">
            <div
              className="w-[250px] h-[180px] rounded-lg overflow-hidden"
              style={{
                transform: "rotate(-10deg)",
              }}
            >
              <img
                src={List2[6] || "/placeholder.svg"}
                alt="Featured Recipe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <ChefHat className="w-16 h-16 text-[#4CAF50]" />
            <h1
              className="text-[92px] leading-none tracking-tight text-[#4CAF50]"
              style={{ fontFamily: "'Alfa Slab One', cursive" }}
            >
              Recipe GPT
            </h1>
          </div>
          <p className="text-xl mb-8 text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Tak Perlu Pening Fikir Nak Masak Apa, Resepi GPT Ada Jawapannya!
          </p>
          {!showSteps && (
            <Button
              size="lg"
              onClick={() => setShowSteps(true)}
              className="rounded-full px-8 py-6 text-lg bg-[#4CAF50] hover:bg-[#45a049] text-white"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Find Recipe from Ingredients
            </Button>
          )}
        </div>
      </div>

      {/* Steps Container */}
      {showSteps && (
        <div className="fixed inset-0 z-10 bg-[#F5E6D3] overflow-y-auto">
          <div className="min-h-screen py-16 px-4 flex items-start justify-center">
            <Card className="w-full max-w-2xl space-y-6 p-4 md:p-6 shadow-xl bg-white/95 backdrop-blur my-4">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => setShowSteps(false)}
                className="mb-2 text-gray-600 hover:text-gray-900"
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

              {/* Rest of steps remain the same */}
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
                  className="w-full rounded-full text-lg font-semibold py-6 bg-[#4CAF50] hover:bg-[#45a049] text-white transition-all duration-200 shadow-lg"
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
      <footer className="fixed bottom-0 left-0 right-0 bg-[#c8e6c9]/90 backdrop-blur-sm py-4 z-20 shadow-lg border-t border-[#c8e6c9]">
        <div className="text-center flex items-center justify-center gap-3">
          <p className="text-gray-700 text-sm">
            Made by <span className="underline font-medium hover:text-gray-900 transition-colors">Zuhair Aziz</span>{" "}
            v1.01
          </p>
          <div className="h-4 w-px bg-gray-300"></div>
          <a
            href="https://github.com/SANNNNN-123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-gray-900 text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100 font-bold"
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

