"use client"

import React, { useEffect, useRef, useState } from "react"
import { useThemeStore } from "@/lib/theme-store"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiMysql,
  SiGit,
  SiFigma,
  SiAdobephotoshop,
  SiCanva,
  SiXampp,
  SiOpenai,
  SiKotlin,
  SiFirebase,
  SiAndroidstudio,
  SiGrafana
} from "react-icons/si"
import { FaJava } from "react-icons/fa";
import { Monitor, Wrench } from "lucide-react"
import { StarBackground } from "@/components/ui/star-background"

type Skill = {
  name: string;
  icon?: React.ReactNode;
  description?: string;
  issuer?: string;
  date?: string;
  image?: string;
  link?: string;
};

type SkillCategory = {
  title: string;
  isCertification?: boolean;
  skills: Skill[];
};

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const { theme } = useThemeStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    // Animate section header
    gsap.fromTo(
      "#skills h2, #skills p",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Animate skill categories
    const categories = cardsRef.current.querySelectorAll('.skill-category');
    categories.forEach((category) => {
      // Animate category title
      gsap.fromTo(
        category.querySelector('h3'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: category,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Animate skill cards
      const cards = category.querySelectorAll('.skill-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: category,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Cleanup function
    return () => {
      gsap.killTweensOf('*');
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React", icon: <SiReact size={24} /> },
        { name: "TypeScript", icon: <SiTypescript size={24} /> },
        { name: "JavaScript", icon: <SiJavascript size={24} /> },
        { name: "HTML5", icon: <SiHtml5 size={24} /> },
        { name: "CSS3", icon: <SiCss3 size={24} /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss size={24} /> },
        { name: "Next.js", icon: <SiNextdotjs size={24} /> },
        { name: "Kotlin", icon: <SiKotlin size={24} /> },
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs size={24} /> },
        { name: "Python", icon: <SiPython size={24} /> },
        { name: "Java", icon: <FaJava size={24} /> },
        { name: "MySQL", icon: <SiMysql size={24} /> },
        { name: "Firebase", icon: <SiFirebase size={24} /> },
        { name: "XAMPP", icon: <SiXampp size={24} /> },
      ],
    },
    {
      title: "Tools & Design",
      skills: [
        { name: "Git", icon: <SiGit size={24} /> },
        { name: "Figma", icon: <SiFigma size={24} /> },
        { name: "Photoshop", icon: <SiAdobephotoshop size={24} /> },
        { name: "Canva", icon: <SiCanva size={24} /> },
        { name: "Android Studio", icon: <SiAndroidstudio size={24} /> },
        { name: "Grafana", icon: <SiGrafana size={24} /> },
        { name: "Computer Troubleshooting", icon: <Wrench size={24} /> },
        { name: "Vibe Coding", icon: <SiOpenai size={24} />, description: "Windsurf, Cursor, ChatGPT" },
      ],
    },
    {
      title: "Certifications",
      isCertification: true,
      skills: [
        { 
          name: "AWS Certificate", 
          issuer: "LearnKarts (Coursera)",
          date: "2025",
          image: "./images/cert/AWS-cert.png",
          link: "./pdf/AWS CERTIFICATE.pdf"
        },
        { 
          name: "English for Effective Business Speaking", 
          issuer: "The Hong Kong University of Science and Technology (Coursera)",
          date: "2025",
          image: "./images/cert/eng-cert.png",
          link: "./pdf/ENGLISH CERTIFICATE.pdf"
        },
        { 
          name: "JavaScript Certificate", 
          issuer: "Board Infinity (Coursera)",
          date: "2025",
          image: "./images/cert/JS-cert.png",
          link: "./pdf/JS CERTIFICATE.pdf"
        },
        { 
          name: "React Certificate", 
          issuer: "Board Infinity (Coursera)",
          date: "2025",
          image: "./images/cert/react-cert.png",
          link: "./pdf/REACT CERTIFICATE.pdf"
        },
        { 
          name: "Techstars Certificate", 
          issuer: "Techstars",
          date: "2025",
          image: "./images/cert/Techstars-cert.png",
          link: "./pdf/TECHSTARS CERTIFICATE.pdf"
        },
        { 
          name: "Davao City Water District Internship", 
          issuer: "Davao City Water District",
          date: "2025",
          image: "./images/cert/Water District Certificate.jpg",
          link: "./pdf/Water District Certificate.pdf"
        },

        { 
          name: "TOPCIT 9TH, 10TH & 11TH LEVEL 2 SCORER", 
          issuer: "TOPCIT",
          date: "2024",
          image: "./images/cert/TOPCIT.png",
          link: "./images/cert/TOPCIT.png"
        },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-20 min-h-screen flex items-center relative overflow-hidden ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      {theme === "dark" && (
        <StarBackground
          className="opacity-20"
          starDensity={0.00015}
          allStarsTwinkle={true}
          twinkleProbability={0.7}
          minTwinkleSpeed={0.2}
          maxTwinkleSpeed={0.7}
        />
      )}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Skills & Expertise
            </h2>
            <p className={`text-lg opacity-80 max-w-2xl mx-auto ${
              theme === "dark" ? "text-[#E5E5E5]" : "text-gray-600"
            }`}>
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div ref={cardsRef} className="space-y-12">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {category.title}
                  </h3>
                  <div className={`grid gap-4 ${
            category.isCertification 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' 
              : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
          }`}>
                    {category.isCertification ? (
              category.skills.map((cert, certIndex) => (
                <div
                  key={certIndex}
                  onClick={() => {
                    if (cert.name === "TOPCIT 9TH, 10TH & 11TH LEVEL 2 SCORER" && cert.image) {
                      setCurrentImage(cert.image);
                      setShowImageModal(true);
                    } else if (cert.link) {
                      window.open(cert.link, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="skill-card block group relative overflow-hidden rounded-lg transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                >
                  <div className={`relative h-full ${
                    theme === "dark" 
                      ? "bg-gray-900/50 border border-gray-800" 
                      : "bg-white/80 border border-gray-200"
                  } rounded-lg overflow-hidden`}>
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={cert.image} 
                        alt={cert.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="text-white">
                          <p className="text-sm font-medium">{cert.issuer}</p>
                          <p className="text-xs opacity-80">{cert.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-center">{cert.name}</h4>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className={`skill-card flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-900/50 hover:bg-gray-800/80 border border-gray-800"
                      : "bg-white/80 hover:bg-white border border-gray-200"
                  }`}
                >
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <div className="text-center">
                    <div className="font-medium">{skill.name}</div>
                    {skill.description && (
                      <div className="text-xs opacity-70 mt-1">{skill.description}</div>
                    )}
                  </div>
                </div>
              ))
            )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Image Modal */}
      {showImageModal && currentImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img 
              src={currentImage}
              alt="Certificate"
              className="w-full h-full object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
