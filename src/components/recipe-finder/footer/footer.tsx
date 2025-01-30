import { Github } from "lucide-react"

export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 z-20">
      <div className="h-px bg-gray-200 dark:bg-gray-800 mx-auto" style={{ width: "calc(100% - 2rem)" }} />
      <div className="px-6 py-4">
        <div className="text-center flex items-center justify-center gap-3">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Made by{" "}
            <span className="font-bold underline hover:text-black dark:hover:text-white transition-colors">
              Zuhair Aziz
            </span>
          </p>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
          <a
            href="https://github.com/SANNNNN-123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Visit GitHub Profile"
          >
            <Github className="h-5 w-5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  )
}

