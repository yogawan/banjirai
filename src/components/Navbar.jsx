import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Navbar = ({ href = "/", label = "Default" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const contributors = [
    { 
      label: "Yogawan Aditya Pratama", 
      path: "https://github.com/yogawan", 
      icon: "mdi:github",
      role: "Full Stack Developer"
    },
    { 
      label: "Miko Dian Rachmadany", 
      path: "https://github.com/mikodian", 
      icon: "mdi:github",
      role: "Frontend Developer"
    },
    { 
      label: "Loo Tze Lui", 
      path: "https://github.com/lootzelui", 
      icon: "mdi:github",
      role: "UI/UX Designer"
    },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/20 shadow-lg' 
          : 'bg-black/5 backdrop-blur-md border-b border-white/10'
      }`}>
        <div className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          {/* Hamburger Menu Button */}
          <button
            className="relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 group"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-blue-400 ${
                  isMenuOpen ? "rotate-45 translate-y-2 bg-blue-400" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-blue-400 ${
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-blue-400 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2 bg-blue-400" : ""
                }`}
              ></span>
            </div>
          </button>

          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Icon icon="mdi:robot" className="text-white text-xl" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg">JawirAI</h1>
              <p className="text-white/60 text-xs">v1.6.4</p>
            </div>
          </div>

          {/* Version Badge */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-white/20 text-white text-xs rounded-full backdrop-blur-sm hover:from-blue-500/30 hover:to-purple-600/30 transition-all duration-200">
              <span className="hidden sm:inline">ꦗꦮꦶꦫꦆꦌ </span>
              <span className="font-mono">v1.6.4</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Slide Menu */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-80 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-50 transform transition-all duration-500 ease-out ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        {/* Menu Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Icon icon="mdi:robot" className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">JawirAI</h2>
                <p className="text-white/60 text-sm">Intelligent Assistant</p>
              </div>
            </div>
            
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 focus:outline-none transition-colors duration-200"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <Icon icon="mdi:close" className="text-white text-xl" />
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="p-6 overflow-y-auto h-full pb-20">
          {/* Contributors Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Icon icon="mdi:account-group" className="text-blue-400 text-xl" />
              <h3 className="text-white font-semibold text-lg">Contributors</h3>
            </div>
            
            <div className="space-y-3">
              {contributors.map((contributor, index) => (
                <Link key={index} href={contributor.path} legacyBehavior>
                  <a
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 hover:transform hover:scale-[1.02]"
                    onClick={toggleMenu}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-200">
                      <Icon icon={contributor.icon} className="text-blue-400 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors duration-200">
                        {contributor.label}
                      </h4>
                      <p className="text-white/60 text-sm">{contributor.role}</p>
                    </div>
                    <Icon 
                      icon="mdi:arrow-top-right" 
                      className="text-white/40 group-hover:text-blue-400 transition-colors duration-200" 
                    />
                  </a>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Menu Items */}
          <div className="space-y-2">
            <Link href="/about" legacyBehavior>
              <a 
                className="flex items-center gap-3 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
                onClick={toggleMenu}
              >
                <Icon icon="mdi:information" className="text-lg" />
                <span>About</span>
              </a>
            </Link>
            <Link href="/documentation" legacyBehavior>
              <a 
                className="flex items-center gap-3 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
                onClick={toggleMenu}
              >
                <Icon icon="mdi:book-open" className="text-lg" />
                <span>Documentation</span>
              </a>
            </Link>
            <Link href="/settings" legacyBehavior>
              <a 
                className="flex items-center gap-3 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
                onClick={toggleMenu}
              >
                <Icon icon="mdi:cog" className="text-lg" />
                <span>Settings</span>
              </a>
            </Link>
          </div>
        </div>

        {/* Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
          <div className="text-center">
            <p className="text-white/40 text-xs">
              Made with ❤️ by JawirAI Team
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;