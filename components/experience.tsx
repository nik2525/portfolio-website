"use client"

import { useThemeStore } from "@/lib/theme-store"
import { ScrollTimeline } from "@/components/ui/scroll-timeline"

export default function Experience() {
  const { theme } = useThemeStore()

  const experienceData = [
    {
      title: "Front End Developer",
      company: "Davao City Water District",
      period: "2025",
      description:
        "Developing web applications for Davao City Water District using React, TypeScript, and various React libraries. Maintaining excellent academic performance while working on practical projects.",
      image: "./images/dcwd.jpg",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Git"],
      sortYear: 2025
    },
    {
      title: "Winner - Favorite Startup",
      company: "Techstars Startup Weekend Davao",
      period: "2023",
      description:
        "Awarded 'Favorite Startup' and received a 10,000 PHP cash prize from WAL Software for developing 'Locobus' - an innovative public transportation solution that enhances commuter experience through real-time tracking, route optimization, and cashless payment integration. Led a cross-functional team to design and pitch a comprehensive mobility platform that addresses urban transportation challenges in Davao City.",
      image: "./images/Techstars.jpg",
      technologies: ["Startup Pitching", "Product Development", "Team Leadership", "Public Speaking"],
      sortYear: 2023
    },
    {
      title: "Computer Science Student",
      company: "University of the Immaculate Conception",
      period: "2021 - 2025",
      description:
        "Developed responsive web applications using React, JavaScript, TypeScript, and various React libraries. Gained hands-on experience in data annotation and training AI models using Python and Google Colab, following best practices for performance, scalability, and accessibility",
      image: "./images/graduatepicfinal.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Java", "Git", "Xampp", "MySQL", "Artificial Intelligence", "AI Models", "Model Training"],
      sortYear: 2025
    },
    {
      title: "Software Quality Tester",
      company: "University Projects",
      period: "2023-2024",
      description:
        "Conducted comprehensive manual testing of web applications and software systems. Created User Acceptance Test (UAT) scenarios, documented detailed test cases, and prepared bug reports to ensure functionality, usability, and adherence to quality standards.",
      image: "./images/sqa.png",
      technologies: ["Manual Testing", "Bug Tracking"],
      sortYear: 2024
    },
    {
      title: "UI/UX Designer",
      company: "University Projects",
      period: "2023",
      description:
        "Designed intuitive user interfaces for various academic and personal projects. Created wireframes, prototypes, and design systems. Conducted user research and usability testing to improve design decisions.",
      image: "./images/web-starbucks.jpg",
      technologies: ["Figma", "Adobe Photoshop", "Sketch", "Prototyping", "User Research"],
      sortYear: 2023
    },
    {
      title: "Data Entry",
      company: "National Commission of Senior Citizens",
      period: "2023",
      description:
        "Organized senior citizen data from personal interviews and physical records onto their online structured database of the National Commission for Senior Citizens. Ensured accuracy, consistency, and confidentiality while maintaining data integrity and supporting efficient retrieval for reporting and analysis.",
      image: "./images/ncsc.jpg",
      technologies: ["Data Entry", "Interview"],
      sortYear: 2023
    },
    {
      title: "Graphics Designer",
      company: "Click Creativity",
      period: "2021 - Present",
      description:
        "Designed visually engaging graphics for diverse clients and projects as part of Click Creativity, a marketing startup. Created brand-aligned logos, social media content, and marketing materials to support promotional campaigns and client branding initiatives.",
      image: "./images/click-creatives.png",
      technologies: ["Adobe Photoshop", "Illustrator", "Canva", "Branding", "Print Design"],
      sortYear: 2021
    }
  ].sort((a, b) => b.sortYear - a.sortYear)

  return (
    <section
      id="experience"
      className={`py-20 ${theme === "dark" ? "bg-black" : "bg-gradient-to-br from-gray-50 to-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Experience & Journey
          </h2>
          <p className={`text-lg opacity-70 max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            My professional journey and key experiences in technology and design
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <ScrollTimeline items={experienceData} theme={theme} />
        </div>
      </div>
    </section>
  )
}
