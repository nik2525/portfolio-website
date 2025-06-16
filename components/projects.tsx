"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { useThemeStore } from "@/lib/theme-store"
import { Button } from "@/components/ui/button"
import { ImageCarouselModal } from "./ImageCarouselModal"

export default function Projects() {
  const { theme } = useThemeStore()
  const [filter, setFilter] = useState("All")
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showCarousel, setShowCarousel] = useState(false)
  const [currentProject, setCurrentProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "Brain Test",
      description: "A web-based quiz that determines which side of your brain is more dominant.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Web App",
      gradient: "linear-gradient(135deg, #667eea, #764ba2)",
      link: "https://left-right-brain-quiz.vercel.app/"
    },
    {
      id: 2,
      title: "Brain 3D",
      description: "A 3D visualization of the human brain.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Web App",
      gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
      link: "https://colored-brain.vercel.app/"
    },
    {
      id: 3,
      title: "Starbucks Design",
      description: "A mock design for Starbucks website.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Graphics and Design",
      gradient: "linear-gradient(135deg, #4facfb, #00f2fe)",
      link: "https://www.figma.com/proto/4fRivurK73zlBxQg0UW0Jr/Starbucks?page-id=0%3A1&node-id=1-9&starting-point-node-id=1%3A9&t=BIJWuWurs1F1FflQ-1"
    },
    {
      id: 4,
      title: "Animal Bite",
      description: "A mock design for Animal Bite website.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Graphics and Design",
      gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
      link: "https://www.figma.com/proto/PEb2MK3i6fQCWykmWL251o/Lingap-Project-2.0?page-id=0%3A1&node-id=103-2&node-type=canvas&viewport=350%2C407%2C0.02&t=XVeta4uhwa6ylXY4-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=103%3A2"
    },
    {
      id: 5,
      title: "Text Blast Service Management",
      description: "A front-end development for Text Blast Service Management website of Davao City Water District (DCWD).",
      image: "/placeholder.svg?height=300&width=400",
      category: "Full Stack",
      gradient: "linear-gradient(135deg, #fa709a, #fee140)",
      link: "https://www.canva.com/design/DAGjXnptjd4/H6eqGw4MDQy20HAv0ZUqqA/view?utm_content=DAGjXnptjd4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=haede4f004c"
    },
    {
      id: 6,
      title: "Click Creativity Promotionals",
      description: "Graphic design for Click Creativity Start up Promotionals",
      image: "/placeholder.svg?height=300&width=400",
      category: "Graphics and Design",
      gradient: "linear-gradient(135deg, #a8edea, #fed6e3)",
      images: [
        "images/Start Kit.png",
        "images/Starter kit 3.png",
        "images/Start Kit 2.png"
      ]
    },
    {
      id: 7,
      title: "Locobus - Public Transport App",
      description: "Awarded 'Favorite Startup' at Techstars Davao, Locobus is an innovative public transport solution with real-time tracking and cashless payments.",
      image: "/images/Techstars.jpg",
      category: "Graphics and Design",
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
      link: "https://www.figma.com/proto/LYt8WgznEY9tAjefec8iHd/LocoBus-Final-Frames?page-id=0%3A1&node-id=47-618&starting-point-node-id=2%3A471&t=xVJVFcEGCMXSvogz-1"
    },
  ]

  const categories = ["All", "Web App", "Graphics and Design", "Full Stack"]
  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle wheel event for horizontal scrolling on desktop
  useEffect(() => {
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      if (carouselRef.current) {
        e.preventDefault()
        carouselRef.current.scrollLeft += e.deltaY
      }
    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("wheel", handleWheel)
      }
    }
  }, [isMobile])

  const scrollToProject = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const cardWidth = 320 // Card width + margin
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth

    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section id="projects" className={`py-20 ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Projects
          </h2>
          <p className={`text-lg opacity-70 max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            A showcase of my recent work and personal projects
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={
                filter === category
                  ? theme === "dark"
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                  : theme === "dark"
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Navigation Buttons for Mobile */}
          {isMobile && (
            <>
              <Button
                variant="outline"
                size="icon"
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 ${
                  theme === "dark"
                    ? "bg-black/80 border-white/20 text-white hover:bg-white/10"
                    : "bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => scrollToProject("left")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 ${
                  theme === "dark"
                    ? "bg-black/80 border-white/20 text-white hover:bg-white/10"
                    : "bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => scrollToProject("right")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          <div className="flex justify-center items-center min-h-[400px] py-6 sm:py-10">
            <div
              ref={carouselRef}
              className={`carousel flex ${isMobile ? "overflow-x-auto snap-x snap-mandatory" : "perspective-1000"} px-6 sm:px-8 ${
                isMobile ? "space-x-6" : ""
              } w-full`}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                ...(isMobile ? {} : { overflowVisible: true }),
              }}
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`card flex-none rounded-xl cursor-pointer relative snap-center ${isMobile ? "" : "hover:z-50"}`}
                  onClick={() => {
                    if (project.link) {
                      window.open(project.link, "_blank", "noopener,noreferrer");
                    } else if (project.images) {
                      setCurrentProject(project.id);
                      setShowCarousel(true);
                    }
                  }}
                  style={{
                    background: project.gradient,
                    width: isMobile ? "calc(100vw - 4rem)" : "300px",
                    height: isMobile ? "200px" : "200px",
                    marginLeft: isMobile ? (index === 0 ? "0" : "0.5rem") : index === 0 ? "0" : "-120px",
                    marginRight: isMobile ? (index === filteredProjects.length - 1 ? "0" : "0.5rem") : "0",
                    transform: isMobile ? "none" : "rotateY(-20deg)",
                    transition: "transform 0.5s ease, box-shadow 0.3s ease, z-index 0.2s ease, margin 0.2s ease",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = "rotateY(-20deg) translateY(-80px)"
                      e.currentTarget.style.zIndex = "100"
                      e.currentTarget.style.boxShadow =
                        "0 30px 60px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.25)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = "rotateY(-20deg)"
                      e.currentTarget.style.zIndex = "1"
                      e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.1)"
                    }
                  }}
                >
                  {/* Card Content */}
                  <div className="p-4 sm:p-6 h-full flex flex-col justify-between text-white">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{project.title}</h3>
                        {project.link ? (
                          <ExternalLink className="h-4 w-4" />
                        ) : project.images ? (
                          <span className="text-xs opacity-70">(View Gallery)</span>
                        ) : null}
                      </div>
                      <p className="text-xs sm:text-sm opacity-90 line-clamp-3">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {isMobile ? "Swipe to explore projects" : "Hover over the cards to explore each project"}
          </p>
        </div>
      
      {showCarousel && currentProject !== null && (
        <ImageCarouselModal
          images={projects.find(p => p.id === currentProject)?.images || []}
          onClose={() => setShowCarousel(false)}
        />
      )}
    </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Hide scrollbar */
        .carousel::-webkit-scrollbar {
          display: none;
        }

        /* Mobile specific styles */
        @media (max-width: 768px) {
          .carousel {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding: 1rem 0.5rem;
          }
          
          .card {
            scroll-snap-align: center;
            flex-shrink: 0;
            margin-right: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
