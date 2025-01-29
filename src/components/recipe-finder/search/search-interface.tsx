// src/components/recipe-finder/search/search-interface.tsx
import { Search } from "lucide-react"

interface SearchInterfaceProps {
  onSearchClick: () => void
}

export const SearchInterface = ({ onSearchClick }: SearchInterfaceProps) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="relative flex items-center w-[240px] md:w-[400px]">
        <div className="absolute left-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full py-2 md:py-3 px-10 rounded-full bg-white shadow-sm border border-gray-100 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-100"
          onClick={onSearchClick}
        />
      </div>
      <button 
        className="px-6 py-2 md:py-3 rounded-full bg-[#EEF6E9] text-gray-700 hover:bg-[#e5f0dd] transition-colors font-medium flex items-center justify-center gap-2 whitespace-nowrap"
        onClick={onSearchClick}
      >
        Filter
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}