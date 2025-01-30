import { Github } from "lucide-react"

export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-20">
      <div className="h-px bg-gray-200 mx-auto" style={{ width: "calc(100% - 2rem)" }} />
      <div className="px-6 py-4">
        <div className="text-center flex items-center justify-center gap-3">
          <p className="text-gray-700 text-sm">
            Made by <span className="font-bold underline hover:text-black transition-colors">Zuhair Aziz</span>{" "}
            
          </p>
          <div className="h-4 w-px bg-gray-300"></div>
          <a
            href="https://github.com/SANNNNN-123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-black text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100"
            aria-label="Visit GitHub Profile"
          >
            <Github className="h-5 w-5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  )
}

