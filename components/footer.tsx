"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { useThemeStore } from "@/lib/theme-store"

export default function Footer() {
  const { theme } = useThemeStore()

  const socialLinks = [
    { icon: Github, href: "https://github.com/nik2525", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/niko-angelo-lubao-5967852a8/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:nikoangelolubao25@gmail.com", label: "Email" },
  ]

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <footer
      className={`py-12 border-t ${
        theme === "dark" ? "bg-black border-white/10" : "bg-gradient-to-br from-gray-50 to-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center transition-transform duration-200 hover:scale-105"
              aria-label="Go to top"
            >
              <img src="/images/logoniko-removebg-preview.png" alt="NKO Logo" className="h-8 w-auto" />
            </button>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                    theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <link.icon className={`h-5 w-5 ${theme === "dark" ? "text-white" : "text-gray-900"}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`transition-all duration-200 ${
                      theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Get In Touch
            </h3>
            <div className={`space-y-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              <p>nikoangelolubao25@gmail.com</p>
              <p>Davao City, PH</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center ${
            theme === "dark" ? "border-white/10" : "border-gray-200"
          }`}
        >
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            © {new Date().getFullYear()} Niko Angelo Lubao. All rights reserved.
          </p>
          <p
            className={`text-sm flex items-center mt-4 sm:mt-0 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          >
          </p>
        </div>
      </div>
    </footer>
  )
}
