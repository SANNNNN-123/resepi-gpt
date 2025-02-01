// src/components/recipe-finder/search/search-interface.tsx
import { useState } from "react"
import { motion } from "framer-motion"
import Header from "../header/header"
import { RecipeDetail } from "../recipe/recipe-detail"
import { RecipeList } from "../recipe/recipe-list"
import { IngredientTag } from "./ingredient-tag"
import { COMMON_INGREDIENTS } from "../constants"
import type { Recipe } from "../types"
import { SearchInput } from "./search-input"

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
}

const SearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) => {
      const isSelected = prev.includes(ingredient)
      const newSelected = isSelected 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]

      // Update search query based on selected ingredients
      const newQuery = newSelected.join(", ")
      setSearchQuery(newQuery)

      return newSelected
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Clear selected ingredients when manually typing
    setSelectedIngredients([])
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setHasSearched(true)

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: searchQuery }),
      })

      if (!response.ok) throw new Error("Search failed")

      const data = await response.json()
      setRecipes((data.recipes || []).slice(0, 4))
    } catch (err) {
      setError("Failed to search recipes. Please try again.")
      console.error("Search error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const resetSearch = () => {
    setRecipes([])
    setSearchQuery("")
    setSelectedIngredients([])
    setHasSearched(false)
    setError("")
  }

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-900">
      <div className="w-full max-w-[1600px] mx-auto px-6 pt-24 pb-14">
        {!recipes.length && (
          <>
            <Header />
            <div className="flex flex-col items-center mb-8">
              <div className="w-full max-w-2xl">
                <SearchInput
                  searchQuery={searchQuery}
                  onChange={handleInputChange}
                  onSubmit={handleSearch}
                  isLoading={isLoading}
                />

                <div className="text-left mb-12">
                  <h3 className="text-gray-800 dark:text-gray-300 transition-colors mb-4 font-medium">
                    Contoh bahan-bahan:
                  </h3>
                  <motion.div className="flex flex-wrap gap-3 overflow-visible" layout transition={transitionProps}>
                    {COMMON_INGREDIENTS.map((ingredient) => (
                      <IngredientTag
                        key={ingredient}
                        ingredient={ingredient}
                        isSelected={selectedIngredients.includes(ingredient)}
                        onToggle={toggleIngredient}
                      />
                    ))}
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
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-500 animate-pulse">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <div className="absolute inset-0 bg-purple-500/25 blur-sm rounded-full animate-pulse" />
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

        {recipes.length > 0 && (
          <RecipeList
            recipes={recipes}
            onBack={resetSearch}
            onViewRecipe={setSelectedRecipe}
          />
        )}

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

        {selectedRecipe && <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
      </div>
    </div>
  )
}

export default SearchInterface

