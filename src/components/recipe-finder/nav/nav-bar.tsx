import { ChefHat, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export const NavBar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-[100] p-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-[#4CAF50]" />
          <span className="text-xl font-semibold">Resepi GPT</span>
        </div>
        <Button
          variant="ghost"
          className="text-gray-800 hover:text-gray-900 rounded-full p-4 hover:bg-gray-100/80 transition-colors"
        >
          <Home className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  )
}

