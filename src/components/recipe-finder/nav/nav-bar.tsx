import { ChefHat, Home, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export function NavBar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3">
            <ChefHat className="h-6 w-6 mt-1 dark:text-white" />
            <span className="text-m font-semibold dark:text-white">Resepi GPT</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white rounded-full p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Home className="h-6 w-6" />
            </Button>
            <Toggle
              className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted rounded-full"
              pressed={theme === "dark"}
              onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <Moon
                size={16}
                strokeWidth={2}
                className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100 dark:text-white"
                aria-hidden="true"
              />
              <Sun
                size={16}
                strokeWidth={2}
                className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
                aria-hidden="true"
              />
            </Toggle>
          </div>
        </div>
      </div>
    </nav>
  )
}