import { CircleUser } from "lucide-react"
import { Button } from "@/components/ui/button"

export const NavBar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-[100] p-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="text-gray-800 hover:text-gray-900 bg-white rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <CircleUser className="mr-2 h-5 w-5" />
            Sign In
          </Button>
          <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
            Join Waitlist
          </Button>
        </div>
      </div>
    </nav>
  )
}