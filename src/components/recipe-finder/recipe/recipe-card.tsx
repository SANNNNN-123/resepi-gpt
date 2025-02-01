import { motion } from "framer-motion"
import { Recipe } from "../types"
import { ImageOff } from "lucide-react"

interface RecipeCardProps {
  recipe: Recipe
  index: number
  onViewRecipe: (recipe: Recipe) => void
}

export function RecipeCard({ recipe, index, onViewRecipe }: RecipeCardProps) {
  return (
    <motion.div
      key={recipe.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white dark:bg-gray-700 rounded-3xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-gray-900/30 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {recipe.image_url ? (
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/default-recipe.jpg"
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-6 line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors">
          {recipe.title}
        </h3>
        <button
          className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-medium"
          onClick={() => onViewRecipe(recipe)}
        >
          View Recipe
        </button>
      </div>
    </motion.div>
  )
}