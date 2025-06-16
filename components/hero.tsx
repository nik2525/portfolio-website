"use client"

import { Github, Linkedin, Mail, Download } from "lucide-react"
import { useThemeStore } from "@/lib/theme-store"
import { Button } from "@/components/ui/button"
import { FloatingDock } from "@/components/ui/floating-dock"
import { StarBackground } from "@/components/ui/star-background"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { WavyGradient } from "@/components/ui/wavy-gradient"

export default function Hero() {
  const { theme } = useThemeStore()

  const socialItems = [
    {
      title: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/nik2525",
    },
    {
      title: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/niko-angelo-lubao-5967852a8/",
    },
    {
      title: "Email",
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:nikoangelolubao25@gmail.com",
    },
  ]

  const typewriterWords = [
    {
      text: "Front End Developer",
      className: "text-xl sm:text-2xl lg:text-3xl font-light",
    },
    {
      text: "UI/UX Designer",
      className: "text-xl sm:text-2xl lg:text-3xl font-light",
    },
    {
      text: "Problem Solver",
      className: "text-xl sm:text-2xl lg:text-3xl font-light",
    },
    {
      text: "Data Entry",
      className: "text-xl sm:text-2xl lg:text-3xl font-light",
    },
    {
      text: "Graphics Designer",
      className: "text-xl sm:text-2xl lg:text-3xl font-light",
    },
    {
      text: "Software Quality Tester",
      className: "text-xl sm:text-2xl lg:text-3xl font-light",
    },

  ]

  const handleScrollToWork = () => {
    const projectsSection = document.querySelector("#projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Star Background for Dark Mode */}
      {theme === "dark" && (
        <StarBackground
          className="opacity-50"
          starDensity={0.0002}
          allStarsTwinkle={true}
          twinkleProbability={0.8}
          minTwinkleSpeed={0.3}
          maxTwinkleSpeed={0.8}
        />
      )}

      {/* Wavy Gradient for Light Mode */}
      {theme === "light" && (
        <div className="absolute inset-0 bg-white">
          <WavyGradient
            colors={["#0ea5e9", "#8b5cf6", "#ec4899"]}
            speed={0.3}
            amplitude={60}
            frequency={0.002}
            containerClassName="absolute bottom-0 left-0 w-full h-64"
          />
        </div>
      )}

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-current rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-current rounded-full opacity-15 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-1 h-1 bg-current rounded-full opacity-25 animate-pulse delay-500"></div>
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-current rounded-full opacity-20 animate-pulse delay-700"></div>

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-20">
        <div className="text-center space-y-8 lg:space-y-12">
          {/* Main Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <div className="overflow-hidden">
                <div className="animate-slide-up opacity-0 animation-delay-300">
                  <p
                    className={`text-base sm:text-lg lg:text-xl font-light ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Hello, I'm
                  </p>
                </div>
              </div>

              <div className="overflow-hidden min-h-[4rem] sm:min-h-[6rem] lg:min-h-[7rem] xl:min-h-[8rem]">
                <div className="animate-slide-up opacity-0 animation-delay-500">
                  <h1
                    className={`text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Niko Angelo
                  </h1>
                </div>
              </div>

              <div className="overflow-hidden min-h-[2.5rem] lg:min-h-[3rem] flex items-center justify-center">
                <div className="animate-slide-up opacity-0 animation-delay-700">
                  <TypewriterEffect
                    words={typewriterWords}
                    className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
                    cursorClassName="text-current"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="animate-slide-up opacity-0 animation-delay-1000 max-w-2xl mx-auto">
                <p
                  className={`text-base sm:text-lg lg:text-xl leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  I create beautiful, functional, and user-centered digital experiences that solve real-world problems
                  with clean code and innovative design.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="animate-slide-up opacity-0 animation-delay-1200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={handleScrollToWork}
                className={`group relative overflow-hidden px-8 py-3 ${
                  theme === "dark"
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                } transition-all duration-300 transform hover:scale-105 shadow-lg`}
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>

              <a 
                href="/pdf/LUBAO_PORTFOLIO.pdf" 
                download="LUBAO_PORTFOLIO.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative inline-flex items-center justify-center overflow-hidden border-2 px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg rounded-md ${
                  theme === "dark"
                    ? "border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-black"
                    : "border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="relative z-10">Download CV</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="animate-slide-up opacity-0 animation-delay-1500">
            <FloatingDock items={socialItems} className="justify-center" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2"></div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
        }

        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  )
}
