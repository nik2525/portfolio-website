"use client"

import { useEffect, useRef } from "react"
import { useThemeStore } from "@/lib/theme-store"
import { Mail, MapPin, Linkedin } from "lucide-react"

export default function Contact() {
  const { theme } = useThemeStore()
  const leftEyeRef = useRef<HTMLDivElement | null>(null)
  const rightEyeRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Throttle function to limit the number of updates
    const throttle = (func: Function, limit: number) => {
      let inThrottle: boolean;
      return function(this: any, ...args: any[]) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const updateEyes = (e: MouseEvent) => {
      if (!leftEyeRef.current || !rightEyeRef.current) return;

      const updateEyePosition = (eyeRef: React.RefObject<HTMLDivElement | null>, eyeX: number, eyeY: number) => {
        if (!eyeRef.current) return;
        
        const eye = eyeRef.current.parentElement?.getBoundingClientRect();
        if (!eye) return;

        // Get the center of the eye
        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;
        
        // Calculate distance from cursor to eye center
        const dx = e.clientX - eyeCenterX;
        const dy = e.clientY - eyeCenterY;
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 100); // Cap the distance
        
        // Calculate the angle to the cursor
        const angle = Math.atan2(dy, dx);
        
        // Calculate maximum pupil movement (smaller of the two dimensions)
        const maxMove = Math.min(eye.width, eye.height) * 0.2; // 20% of eye size
        
        // Calculate the pupil position with easing
        const moveDistance = (distance / 100) * maxMove;
        const moveX = Math.cos(angle) * moveDistance;
        const moveY = Math.sin(angle) * moveDistance;
        
        // Apply the transformation with smooth transition
        eyeRef.current.style.transition = 'transform 0.1s ease-out';
        eyeRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      };

      // Update both eyes
      updateEyePosition(leftEyeRef, 0, 0);
      updateEyePosition(rightEyeRef, 0, 0);
    };

    // Throttled version of the update function
    const throttledUpdate = throttle(updateEyes, 16); // ~60fps

    // Add event listeners
    window.addEventListener('mousemove', throttledUpdate);
    window.addEventListener('resize', throttledUpdate);
    
    // Initial position
    throttledUpdate(new MouseEvent('mousemove', { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }));

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', throttledUpdate);
      window.removeEventListener('resize', throttledUpdate);
    };
  }, []);

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      text: "nikolubao25@gmail.com",
      href: "mailto:nikolubao25@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      text: "Davao City, Philippines",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      text: "Connect with me",
      href: "https://www.linkedin.com/in/niko-angelo-lubao-5967852a8/",
    },
  ]

  return (
    <section
      id="contact"
      className={`relative py-20 min-h-screen flex items-center ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl opacity-80">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10 border border-white/10"
                      : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start"
                  >
                    <div
                      className={`p-3 rounded-full mr-4 ${
                        theme === "dark" ? "bg-white/10" : "bg-gray-100"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="opacity-80">{item.text}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Interactive Alien */}
            <div className="relative h-96 flex items-center justify-center" ref={containerRef}>
              <div className="relative w-64 h-80">
                {/* Alien Head */}
                <div className="absolute w-64 h-64 bg-green-400 dark:bg-green-500 rounded-full flex items-center justify-center">
                  {/* Eyes Container */}
                  <div className="flex space-x-12">
                    {/* Left Eye */}
                    <div className="relative w-16 h-16 bg-white rounded-full overflow-hidden">
                      <div 
                        ref={leftEyeRef}
                        className="absolute w-6 h-6 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
                      />
                    </div>
                    
                    {/* Right Eye */}
                    <div className="relative w-16 h-16 bg-white rounded-full overflow-hidden">
                      <div 
                        ref={rightEyeRef}
                        className="absolute w-6 h-6 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
                      />
                    </div>
                  </div>
                  
                  {/* Mouth */}
                  <div className="absolute w-32 h-16 border-b-4 border-black dark:border-white rounded-b-full bottom-8" />
                  
                  {/* Antenna */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-16 bg-green-400 dark:bg-green-500 mx-auto" />
                    <div className="w-8 h-8 bg-green-400 dark:bg-green-500 rounded-full -mt-2" />
                  </div>
                </div>
                
                {/* Body */}
                <div className="absolute w-48 h-32 bg-green-400 dark:bg-green-500 rounded-b-full -bottom-8 left-1/2 transform -translate-x-1/2">
                  {/* Arms */}
                  <div className="absolute -left-12 top-8 w-12 h-8 bg-green-400 dark:bg-green-500 rounded-full transform -rotate-45" />
                  <div className="absolute -right-12 top-8 w-12 h-8 bg-green-400 dark:bg-green-500 rounded-full transform rotate-45" />
                  
                  {/* Legs */}
                  <div className="absolute -bottom-8 left-12 w-8 h-16 bg-green-400 dark:bg-green-500 rounded-b-full" />
                  <div className="absolute -bottom-8 right-12 w-8 h-16 bg-green-400 dark:bg-green-500 rounded-b-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
