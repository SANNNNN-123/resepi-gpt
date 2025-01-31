import { motion } from "framer-motion"
import { Recipe } from "../types"
import { RecipeCard } from "./recipe-card"

interface RecipeListProps {
  recipes: Recipe[]
  onBack: () => void
  onViewRecipe: (recipe: Recipe) => void
}

export function RecipeList({ recipes, onBack, onViewRecipe }: RecipeListProps) {
  return (
    <div className="py-8">
      <button
        onClick={onBack}
        className="mb-8 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-2"
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
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            index={index}
            onViewRecipe={onViewRecipe}
          />
        ))}
      </motion.div>
    </div>
  )
}