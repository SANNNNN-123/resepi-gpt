import { Github } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-green-200 backdrop-blur-sm py-4 z-20 shadow-lg border-t border-[#c8e6c9]">
      <div className="text-center flex items-center justify-center gap-3">
        <p className="text-gray-700 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Made by <span className="font-extrabold underline hover:text-gray-900 transition-colors">Zuhair Aziz</span>{" "}
          <span className="text-gray-700 text-sm">v1.5</span>
        </p>
        <div className="h-4 w-px bg-gray-300"></div>
        <a
          href="https://github.com/SANNNNN-123"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:text-gray-900 text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100 font-bold"
          aria-label="Visit GitHub Profile"
        >
          <Github className="h-5 w-5" strokeWidth={2.5} />
        </a>
      </div>
    </footer>
  )
}