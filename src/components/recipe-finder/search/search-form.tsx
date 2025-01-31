import { useState } from "react"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { IngredientTag } from "./ingredient-tag"
import { COMMON_INGREDIENTS, PLACEHOLDERS } from "../constants"

interface SearchFormProps {
  onSearch: (ingredients: string) => Promise<void>
  isLoading: boolean
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])

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
    await onSearch(searchQuery)
  }

  return (
    <form onSubmit={handleSearch} className="relative mb-8 space-y-2">
      <div className="relative mb-4">
        <PlaceholdersAndVanishInput
          placeholders={PLACEHOLDERS}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSubmit={handleSearch}
          value={searchQuery}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:bg-gray-400 text-xl font-medium shadow-sm"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
            <span>Searching...</span>
          </div>
        ) : (
          "Find Recipe by Ingredients"
        )}
      </button>

      <div className="flex flex-wrap gap-2 mt-4">
        {COMMON_INGREDIENTS.map((ingredient) => (
          <IngredientTag
            key={ingredient}
            ingredient={ingredient}
            isSelected={selectedIngredients.includes(ingredient)}
            onToggle={handleIngredientClick}
          />
        ))}
      </div>
    </form>
  )
} 