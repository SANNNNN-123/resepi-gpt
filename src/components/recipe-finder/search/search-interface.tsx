// src/components/recipe-finder/search/search-interface.tsx
import { Check } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../header/header"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"

interface Recipe {
  id: string
  title: string
  similarity: number
  main_ingredients: string[]
  recipe_url: string
  preparation_time: string
  cooking_time: string
  total_time: string
  servings: string
  ingredients: string[]
  instructions: string[]
  tips: string
  image_url: string
  created_at: string
}

interface SearchInterfaceProps {
  onSearchClick: () => void
}

const COMMON_INGREDIENTS = [
  "nasi",
  "ayam",
  "ikan",
  "udang",
  "daging",
  "telur",
  "keju",
  "bawang",
  "lada",
  "bawang putih",
  "tomato",
  "garam",
  "pasta",
]

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
}

const SearchInterface = ({ onSearchClick }: SearchInterfaceProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])


  const placeholders = [
    "Masukkan bahan yang ada, e.g., nasi, ayam, cili",
    "Cuba 'ikan, udang, bawang'",
    "Macam mana dengan 'daging, kentang, wortel'?",
    "Cari untuk 'telur, keju, roti'",
    "Nak Masak Sayur? Try 'bayam, kailan, terung'",
  ]

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient) ? prev.filter((i) => i !== ingredient) : [...prev, ingredient],
    )
    setSearchQuery((prevQuery) => {
      const ingredients = prevQuery
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i !== "")
      if (!ingredients.includes(ingredient)) {
        return [...ingredients, ingredient].join(", ")
      }
      return prevQuery
    })
  }

  const handleIngredientClick = (ingredient: string) => {
    setSearchQuery((prevQuery) => {
      const ingredients = prevQuery
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i !== "")
      if (!ingredients.includes(ingredient)) {
        return [...ingredients, ingredient].join(", ")
      }
      return prevQuery
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setHasSearched(true)

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: searchQuery }),
      })

      if (!response.ok) {
        throw new Error("Search failed")
      }

      const data = await response.json()
      setRecipes((data.recipes || []).slice(0, 4))
    } catch (err) {
      setError("Failed to search recipes. Please try again.")
      console.error("Search error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-900">
      <div className="w-full max-w-[1600px] mx-auto px-6 pt-24 pb-14">
        {/* Only show header and search when no results */}
        {!recipes.length && (
          <>
            <Header />

            {/* Search Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-full max-w-2xl">
                <form onSubmit={handleSearch} className="relative mb-8 space-y-2">
                  {/* Search Input with PlaceholdersAndVanishInput */}
                  <div className="relative mb-4">
                    <PlaceholdersAndVanishInput
                      placeholders={placeholders}
                      onChange={handleInputChange}
                      onSubmit={handleSearch}
                      value={searchQuery}
                    />
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-3xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:bg-gray-400 text-xl font-medium shadow-sm"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Searching...</span>
                      </div>
                    ) : (
                      "Cari Resepi Mengikut Bahan"
                    )}
                  </button>
                </form>

                {/* Most Used Ingredients */}
                <div className="text-left mb-12">
                  <h3 className="text-gray-600 dark:text-gray-300 transition-colors mb-4 font-medium">Contoh bahan-bahan:</h3>
                  <motion.div className="flex flex-wrap gap-3 overflow-visible" layout transition={transitionProps}>
                    {COMMON_INGREDIENTS.map((ingredient) => {
                      const isSelected = selectedIngredients.includes(ingredient)
                      return (
                        <motion.button
                          key={ingredient}
                          onClick={() => toggleIngredient(ingredient)}
                          layout
                          initial={false}
                          animate={{
                            backgroundColor: isSelected ? "#f3f4f6" : "#f3f4f6",
                          }}
                          whileHover={{
                            backgroundColor: isSelected ? "#e5e7eb" : "#e5e7eb",
                          }}
                          whileTap={{
                            backgroundColor: isSelected ? "#d1d5db" : "#d1d5db",
                          }}
                          transition={{
                            ...transitionProps,
                            backgroundColor: { duration: 0.1 },
                          }}
                          className={`
                            inline-flex items-center px-4 py-2 rounded-full text-base font-medium
                            whitespace-nowrap overflow-hidden
                            ${isSelected ? "text-gray-900 bg-gray-100" : "text-gray-800 bg-gray-100"}
                          `}
                        >
                          <motion.div
                            className="relative flex items-center"
                            animate={{
                              width: isSelected ? "auto" : "100%",
                              paddingRight: isSelected ? "1.5rem" : "0",
                            }}
                            transition={{
                              ease: [0.175, 0.885, 0.32, 1.275],
                              duration: 0.3,
                            }}
                          >
                            <span>{ingredient}</span>
                            <AnimatePresence>
                              {isSelected && (
                                <motion.span
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={transitionProps}
                                  className="absolute right-0"
                                >
                                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" strokeWidth={1.5} />
                                  </div>
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </motion.button>
                      )
                    })}
                  </motion.div>
                </div>

                {/* Rating Container */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="bg-black text-white font-bold text-2xl px-4 py-2 rounded-lg">5.0</div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-300 transition-colors">from my wife</span>
                  </div>
                  <div className="relative">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 animate-pulse">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <div className="absolute inset-0 bg-red-500/25 blur-sm rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Recipe Cards - Always show when there are results */}
        {recipes.length > 0 && (
          <div className="py-8">
            {/* Back Button */}
            <button
              onClick={() => {
                setRecipes([])
                setHasSearched(false)
              }}
              className="mb-8 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M19 12H5M5 12L12 19M5 12L12 5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Back to Search
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {recipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={recipe.image_url || "/placeholder.svg"}
                      alt={recipe.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/default-recipe.jpg"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-6 line-clamp-2 group-hover:text-green-600 transition-colors font-dm-sans">
                      {recipe.title}
                    </h3>
                    <button
                      className="w-full py-3 bg-green-100 text-green-800 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 font-medium font-outfit"
                      onClick={() => {
                        /* Add view recipe handler */
                      }}
                    >
                      View Recipe
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Error and Empty State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {!isLoading && hasSearched && recipes.length === 0 && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-12">
            <div className="inline-block p-6 bg-red-100 rounded-2xl">
              <p className="text-gray-600 text-lg">No recipes found. Try different ingredients!</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SearchInterface

