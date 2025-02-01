import { Github } from "lucide-react"

export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 z-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gray-300 dark:bg-gray-700" style={{ left: '0.1rem', right: '0.1rem' }} />
          <div className="py-4">
            <div className="text-center flex items-center justify-center gap-3 z-10">
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
      </div>
    </div>
  )
}

