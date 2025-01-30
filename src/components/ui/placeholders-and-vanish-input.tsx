"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

interface PlaceholdersAndVanishInputProps {
  placeholders: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  value: string
}

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  value,
}: PlaceholdersAndVanishInputProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [placeholders.length])

  if (!isClient) {
    return null
  }

  return (
    <div
      className={cn(
        "w-full relative max-w-2xl mx-auto bg-white dark:bg-gray-800 h-14 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0px_2px_3px_-1px_rgba(255,255,255,0.1)] transition duration-200",
        value && "bg-gray-50 dark:bg-gray-700",
      )}
    >
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border border-gray-300 dark:border-gray-600 bg-transparent text-black dark:text-white h-full rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent pl-12 pr-4 sm:pl-12 sm:pr-20",
          "focus:border-2 focus:border-gray-300 dark:focus:border-gray-500",
          value && "bg-gray-50 dark:bg-gray-700",
        )}
        placeholder={placeholders[currentPlaceholder]}
      />
      <canvas
        ref={canvasRef}
        width={800}
        height={40}
        className={cn("absolute inset-0 pointer-events-none opacity-0", value && "opacity-100")}
        // @ts-ignore -- Canvas context optimization
        style={{ willReadFrequently: true }}
      />
    </div>
  )
}

