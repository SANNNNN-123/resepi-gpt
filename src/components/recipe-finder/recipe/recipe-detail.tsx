import { motion } from "framer-motion"
import { X } from "lucide-react"

interface RecipeDetailProps {
  recipe: {
    title: string
    ingredients: any // JSON format from database
    instructions: any // JSON format from database
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
    ).replace(/Â/g, '')
  }

  // Parse JSON if needed and handle both string and object formats
  const parseJsonSafely = (data: any) => {
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data)
        return parsed
      } catch (e) {
        console.error('Error parsing JSON:', e)
        return []
      }
    }
    return data || []
  }

  // Ensure array type for map operations
  const ensureArray = (data: any): string[] => {
    return Array.isArray(data) ? data : []
  }

  const ingredients = parseJsonSafely(recipe.ingredients)
  const instructions = parseJsonSafely(recipe.instructions)

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {decodeSpecialChars(recipe.title)}
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
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Bahan-bahan</h2>
            {Object.entries(ingredients).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                  {decodeSpecialChars(category)}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ensureArray(items).map((ingredient: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                      {decodeSpecialChars(ingredient)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Cara Memasak</h2>
            {Array.isArray(instructions) ? (
              // Handle array format
              <ol className="space-y-4">
                {instructions.map((instruction: string, index: number) => (
                  <li
                    key={index}
                    className="flex gap-4 text-gray-700 dark:text-gray-300"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <p>{decodeSpecialChars(instruction.replace(/^\d+\.\s*/, ''))}</p>
                  </li>
                ))}
              </ol>
            ) : (
              // Handle object format
              Object.entries(instructions).map(([category, steps]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                    {decodeSpecialChars(category)}
                  </h3>
                  <ol className="space-y-4">
                    {ensureArray(steps).map((instruction: string, index: number) => (
                      <li
                        key={index}
                        className="flex gap-4 text-gray-700 dark:text-gray-300"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <p>{decodeSpecialChars(instruction.replace(/^\d+\.\s*/, ''))}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 