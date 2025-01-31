import { motion } from "framer-motion"
import { X } from "lucide-react"

interface RecipeDetailProps {
  recipe: {
    title: string
    ingredients: any // Nested JSON format
    instructions: any // Nested JSON format
    preparation_time: string
    cooking_time: string
    servings: string
  }
  onClose: () => void
}

export function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  // Function to decode special characters
  const decodeSpecialChars = (text: string) => {
    return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => 
      String.fromCharCode(parseInt(code, 16))
    ).replace(/Â/g, '') // Remove specific unwanted characters
  }

  // Parse JSON and decode special characters
  const ingredients = typeof recipe.ingredients === 'string' 
    ? JSON.parse(recipe.ingredients) 
    : recipe.ingredients

  const instructions = typeof recipe.instructions === 'string'
    ? JSON.parse(recipe.instructions)
    : recipe.instructions

  // Process ingredients to decode special characters
  const processedIngredients = Object.entries(ingredients).reduce<Record<string, string[]>>((acc, [category, items]) => {
    acc[decodeSpecialChars(category)] = (items as string[]).map(item => decodeSpecialChars(item))
    return acc
  }, {})

  // Process instructions to decode special characters
  const processedInstructions = Object.entries(instructions).reduce<Record<string, string[]>>((acc, [category, steps]) => {
    acc[decodeSpecialChars(category)] = (steps as string[]).map(step => decodeSpecialChars(step))
    return acc
  }, {})

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {recipe.title}
          </h1>

          {/* Recipe Info */}
          <div className="flex items-center justify-center gap-8 text-sm mb-8">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">Masa Penyediaan</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{recipe.preparation_time}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">Masa Memasak</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{recipe.cooking_time}</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <div className="relative pb-2 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Bahan-bahan</h2>
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-black dark:bg-white rounded-full" />
            </div>
            {Object.entries(processedIngredients).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                  {category}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((ingredient: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div>
            <div className="relative pb-2 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Cara Memasak</h2>
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-black dark:bg-white rounded-full" />
            </div>
            {Object.entries(processedInstructions).map(([category, steps]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                  {category}
                </h3>
                <ol className="space-y-4">
                  {steps.map((instruction: string, index: number) => (
                    <li
                      key={index}
                      className="flex gap-4 text-gray-700 dark:text-gray-300"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <p>{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 