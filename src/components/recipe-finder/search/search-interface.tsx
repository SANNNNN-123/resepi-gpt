// src/components/recipe-finder/search/search-interface.tsx
import { Search } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import Header from "../header/header"

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
  "telur",
  "keju",
  "bawang",
  "lada",
  "bawang putih",
  "tomato",
  "garam",
  "pasta",
]

const SearchInterface = ({ onSearchClick }: SearchInterfaceProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

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
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-green-50 to-white">
      <div className="w-full max-w-[1600px] mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <Header />

        {/* Search Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative mb-8 space-y-2">
              {/* Search Input */}
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter ingredients separated by comma, e.g., nasi, ayam, cili"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-green-100 focus:border-green-200 focus:ring-2 focus:ring-green-100 focus:outline-none text-lg shadow-sm transition-all"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:bg-green-300 text-xl font-medium shadow-sm"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Searching...</span>
                  </div>
                ) : (
                  "Find Recipe by Ingredients"
                )}
              </button>
            </form>

            {/* Most Used Ingredients */}
            <div className="text-left mb-12">
              <h3 className="text-gray-600 mb-4 font-medium">Most used ingredients:</h3>
              <div className="flex flex-wrap gap-2">
                {COMMON_INGREDIENTS.map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => handleIngredientClick(ingredient)}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-all duration-200 text-sm font-medium"
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
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
                <span className="text-gray-600">from my wife</span>
              </div>
              <div className="relative">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 animate-pulse">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <div className="absolute inset-0 bg-red-500/25 blur-sm rounded-full animate-pulse" />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-center"
              >
                {error}
              </motion.div>
            )}
          </div>
        </div>

        {/* Recipe Cards */}
        {recipes.length > 0 && (
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
                  <h3 className="text-xl font-semibold mb-6 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {recipe.title}
                  </h3>
                  <button
                    className="w-full py-3 bg-green-100 text-green-800 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 font-medium"
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
        )}

        {/* Empty State */}
        {!isLoading && hasSearched && recipes.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-12">
            <div className="inline-block p-6 bg-gray-50 rounded-2xl">
              <p className="text-gray-600 text-lg">No recipes found. Try different ingredients!</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SearchInterface

