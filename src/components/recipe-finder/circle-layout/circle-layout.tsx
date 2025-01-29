// src/components/recipe-finder/circle-layout/circle-layout.tsx
import { topCluster, rightCluster, bottomCluster, leftCluster } from "../image-clusters/constants"
import SearchInterface from "@/components/recipe-finder/search/search-interface"
import "./styles.css"

interface CircleLayoutProps {
  onSearchClick: () => void
}

export const CircleLayout = ({ onSearchClick }: CircleLayoutProps) => {
  return (
    <div className="relative h-screen flex items-center justify-center transition-all duration-500 opacity-100">
      <div className="circle-container">
        <div className="circle-outline"></div>

        {/* Featured Images */}
        <div className="absolute top-[230px] left-[300px] z-10 hidden md:block">
          <div
            className="w-[200px] h-[120px] rounded-lg overflow-hidden"
            style={{
              transform: "rotate(10deg)",
            }}
          >
            <img
              src={topCluster[0] || "/placeholder.svg"}
              alt="Featured Recipe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute top-[590px] left-[210px] z-10 hidden md:block">
          <div
            className="w-[120px] h-[80px] rounded-lg overflow-hidden"
            style={{
              transform: "rotate(1deg)",
            }}
          >
            <img
              src={leftCluster[0] || "/placeholder.svg"}
              alt="Featured Recipe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute top-[320px] right-[240px] z-10 hidden md:block">
          <div
            className="w-[160px] h-[110px] rounded-lg overflow-hidden"
            style={{
              transform: "rotate(25deg)",
            }}
          >
            <img
              src={rightCluster[3] || "/placeholder.svg"}
              alt="Featured Recipe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mobile Featured Images */}
        <div className="recipe-image featured-top md:hidden">
          <div className="w-full h-full rounded-lg overflow-hidden">
            <img
              src={topCluster[0] || "/placeholder.svg"}
              alt="Featured Recipe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="recipe-image featured-left md:hidden">
          <div className="w-full h-full rounded-lg overflow-hidden">
            <img
              src={leftCluster[0] || "/placeholder.svg"}
              alt="Featured Recipe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="recipe-image featured-right md:hidden">
          <div className="w-full h-full rounded-lg overflow-hidden">
            <img
              src={rightCluster[3] || "/placeholder.svg"}
              alt="Featured Recipe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Regular cluster images - Only visible on desktop */}
        {/* Top Cluster */}
        {topCluster.map((src, index) => (
          <div
            key={`top-${index}`}
            className="recipe-image hidden md:block"
            style={{
              left: `${400 + index * 70}px`,
              top: "180px",
              transform: `rotate(${-20 + index * 16}deg)`,
              zIndex: index,
              opacity: 0.6
            }}
          >
            <img src={src || "/placeholder.svg"} alt={`Recipe ${index + 1}`} />
          </div>
        ))}

        {/* Right Cluster */}
        {rightCluster.map((src, index) => (
          <div
            key={`right-${index}`}
            className="recipe-image hidden md:block"
            style={{
              right: "70px",
              top: `${350 + index * 70}px`,
              transform: `rotate(${60 + index * 10}deg)`,
              zIndex: index,
              opacity: 0.6
            }}
          >
            <img src={src || "/placeholder.svg"} alt={`Recipe ${index + 1}`} />
          </div>
        ))}

        {/* Bottom Cluster */}
        {bottomCluster.map((src, index) => (
          <div
            key={`bottom-${index}`}
            className="recipe-image hidden md:block"
            style={{
              left: `${450 + index * 90}px`,
              bottom: "230px",
              transform: `rotate(${360 + index * -14}deg)`,
              zIndex: index,
              opacity: 0.6
            }}
          >
            <img src={src || "/placeholder.svg"} alt={`Recipe ${index + 1}`} />
          </div>
        ))}

        {/* Left Cluster */}
        {leftCluster.map((src, index) => (
          <div
            key={`left-${index}`}
            className="recipe-image hidden md:block"
            style={{
              left: "75px",
              top: `${350 + index * 70}px`,
              transform: `rotate(${300 + index * -12}deg)`,
              zIndex: index,
              opacity: 0.6
            }}
          >
            <img src={src || "/placeholder.svg"} alt={`Recipe ${index + 1}`} />
          </div>
        ))}

        {/* Inner circle with content */}
        <div className="inner-circle">
          <div className="text-center z-20 px-4 md:px-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1
                className="text-[40px] md:text-[80px] leading-none tracking-tight text-[#4CAF50]"
                style={{ fontFamily: "'Alfa Slab One', cursive" }}
              >
                Resepi GPT
              </h1>
            </div>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Tak Perlu Pening Fikir Nak Masak Apa,
              <br />
              Resepi GPT Ada Jawapannya!
            </p>
            <div className="transform scale-90 md:scale-100">
              <SearchInterface onSearchClick={onSearchClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}