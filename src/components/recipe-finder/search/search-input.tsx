import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { PLACEHOLDERS } from "../constants"

interface SearchInputProps {
  searchQuery: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

export function SearchInput({ searchQuery, onChange, onSubmit, isLoading }: SearchInputProps) {
  return (
    <form onSubmit={onSubmit} className="relative mb-8 space-y-2">
      <div className="relative mb-4">
        <PlaceholdersAndVanishInput
          placeholders={PLACEHOLDERS}
          onChange={onChange}
          onSubmit={onSubmit}
          value={searchQuery}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-3xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:bg-gray-400 text-xl font-medium shadow-sm"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Mencari Resepi...</span>
          </div>
        ) : (
          "Cari Resepi Mengikut Bahan"
        )}
      </button>
    </form>
  )
}