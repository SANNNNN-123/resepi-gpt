import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { transitionProps } from "../constants"

interface IngredientTagProps {
  ingredient: string
  isSelected: boolean
  onToggle: (ingredient: string) => void
}

export function IngredientTag({ ingredient, isSelected, onToggle }: IngredientTagProps) {
  return (
    <motion.button
      onClick={() => onToggle(ingredient)}
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
} 