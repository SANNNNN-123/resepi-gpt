import { ChefHat, Home, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

interface NavBarProps {
  onHomeClick: () => void
}

export function NavBar({ onHomeClick }: NavBarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between h-14 relative">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gray-300 dark:bg-gray-700" style={{ left: '0.1rem', right: '0.1rem' }} />
          <Link href="/" className="flex items-center gap-2 z-10">
            <img src="/chef_icon.svg" alt="Chef Icon" className="h-6 w-6 dark:invert" />
            <span className="text-m font-semibold dark:text-white">Resepi GPT</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white rounded-full p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={onHomeClick}
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