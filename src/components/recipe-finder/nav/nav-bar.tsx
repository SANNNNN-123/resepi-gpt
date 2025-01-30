import { ChefHat, Home, Contrast } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-6">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3">
            <ChefHat className="h-6 w-6 mt-1" />
            <span className="text-m font-bold">Resepi GPT</span>
          </Link>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="text-gray-800 hover:text-black rounded-full p-4 hover:bg-gray-100 transition-colors"
            >
              <Home className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              className="text-gray-800 hover:text-black rounded-full p-4 hover:bg-gray-100 transition-colors"
            >
              <Contrast className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

