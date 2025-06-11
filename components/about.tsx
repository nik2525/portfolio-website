"use client"

import { useEffect, useRef } from "react"
import { useThemeStore } from "@/lib/theme-store"
import { AnimatedBorder } from "@/components/ui/animated-border"
import { StarBackground } from "@/components/ui/star-background"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function About() {
  const { theme } = useThemeStore()
  const aboutRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Create a master timeline for all animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: 'top 85%',
        end: 'bottom center',
        toggleActions: 'play none reverse none',
        markers: false,
        scrub: 0.5,
        onEnterBack: () => {
          gsap.set("#about h2, #about p, #about h3, #about div, #about span, #about strong", { clearProps: 'opacity, y' });
          if (imageRef.current) {
            gsap.set(imageRef.current, { clearProps: 'opacity, x, rotateY' });
          }
        }
      }
    });

    // Animate section title
    tl.fromTo(
      "#about h2",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
      },
      "<"
    );
    
    // Animate text content with staggered animation
    if (textRef.current) {
      const textElements = textRef.current.querySelectorAll('p, h3, div, span, strong');
      textElements.forEach((el, i) => {
        tl.fromTo(
          el,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: 'power2.out' 
          },
          i * 0.05
        );
      });
    }

    // Animate image with rotation and scale
    if (imageRef.current) {
      const img = imageRef.current.querySelector('img');
      
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, rotateY: 15 },
        { 
          opacity: 1, 
          x: 0, 
          rotateY: 0, 
          duration: 1, 
          ease: 'power3.out' 
        },
        "<0.2"
      );
      
      // Add subtle hover effect
      if (img) {
        const onEnter = () => {
          gsap.to(img, { 
            scale: 1.03, 
            duration: 0.5,
            ease: 'power2.out'
          });
        };
        
        const onLeave = () => {
          gsap.to(img, { 
            scale: 1, 
            duration: 0.5,
            ease: 'power2.out'
          });
        };
        
        imageRef.current.addEventListener('mouseenter', onEnter);
        imageRef.current.addEventListener('mouseleave', onLeave);
        
        // Cleanup function
        return () => {
          if (imageRef.current) {
            imageRef.current.removeEventListener('mouseenter', onEnter);
            imageRef.current.removeEventListener('mouseleave', onLeave);
          }
        };
      }
    }

    // Cleanup function
    return () => {
      gsap.killTweensOf('*')
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      id="about"
      className={`py-20 min-h-screen flex items-center ${theme === "dark" ? "bg-black" : "bg-white"} relative overflow-hidden`}
    >
      {theme === "dark" && (
        <StarBackground
          className="opacity-30"
          starDensity={0.00015}
          allStarsTwinkle={true}
          twinkleProbability={0.8}
          minTwinkleSpeed={0.3}
          maxTwinkleSpeed={0.8}
        />
      )}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              About Me
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div
            ref={textRef}
            className={`space-y-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            <AnimatedBorder
              borderColor={theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
              className={`p-8 rounded-2xl ${theme === "dark" ? "bg-[#1A1A1A]" : "bg-gray-100"}`}
            >
              <div className={`space-y-6 ${theme === "dark" ? "text-[#E5E5E5]" : "text-gray-900"}`}>
                <p className={`text-lg sm:text-xl leading-relaxed ${theme === "dark" ? "text-[#E5E5E5]" : "text-gray-900"}`}>
                  Hi! I'm{" "}
                  <strong className={theme === "dark" ? "text-white" : "text-gray-900"}>Niko Angelo Lubao</strong>, a{" "}
                  <strong className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    Computer Science student
                  </strong>{" "}
                  at the University of the Immaculate Conception. I am a fast learner with a strong drive for efficiency
                  and accuracy, committed to completing tasks promptly and with precision. My perfectionist mindset
                  ensures attention to detail, and I prioritize meaningful work over distractions to consistently
                  deliver quality results.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-6 pt-8">
                <div className="text-center lg:text-left">
                  <div
                    className={`text-2xl sm:text-3xl font-bold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Computer Science
                  </div>
                  <div
                    className={`text-lg sm:text-xl leading-relaxed ${theme === "dark" ? "text-[#E5E5E5]" : "text-gray-700"}`}
                  >
                    University of the Immaculate Conception (2025)
                  </div>
                </div>
              </div>
            </AnimatedBorder>
          </div>

          {/* Right Content - Profile Image */}
          <div
            ref={imageRef}
            className="flex justify-center lg:justify-start lg:mt-0"
          >
            <AnimatedBorder
              borderColor={theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
              className={`p-2 rounded-2xl overflow-hidden ${theme === "dark" ? "bg-[#1A1A1A]" : "bg-gray-50"}`}
            >
              <div className="w-80 h-96 sm:w-96 sm:h-[500px] rounded-xl overflow-hidden relative">
                <img
                  src="/images/profile-main.jpg"
                  alt="Niko Angelo - Computer Science Student"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedBorder>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
