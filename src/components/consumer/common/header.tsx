"use client";

import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { CONSUMER_NAVLINKS } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, Shield, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed w-full top-0 z-50 ">
      <div className={cn(
        "w-full px-30 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-500",
        scrolled && "max-w-[80rem] mt-4 mx-auto px-10  rounded-xl"
      )}>
        <div className="flex max-w-[85rem] mx-auto  items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 animate-slide-right-md"
          >
            <div className="relative h-8 w-8">
              <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="#4F46E5"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Xegality
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2" ref={dropdownRef}>
            {CONSUMER_NAVLINKS.map((item, index) => {
              const isActive = item.href === usePathname();
              return (
                <div key={index} className="relative group">
                  <button
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.title)}
                    className={cn(
                      "text-gray-700 py-2 px-5 rounded-full font-bold dark:text-slate-700 hover:text-amber-700 dark:hover:text-amber-400 transition-all duration-300 text-sm flex items-center gap-1",
                      isActive && "bg-indigo-500/8 text-indigo-500"
                    )}
                  >
                    {item.title}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </button>

                  {item.hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-[800px] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 grid grid-cols-2 gap-8"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {item.dropdownItems?.map((section, idx) => (
                            <div key={idx} className="space-y-4">
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                                <i className={`fas fa-${section.icon} text-amber-600 dark:text-amber-400 text-xl`}></i>
                                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                  {section.title}
                                </h3>
                              </div>
                              <div className="space-y-2">
                                {section.items.map((subItem, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    href={subItem.href}
                                    className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200 group/item"
                                  >
                                    <i className={`fas fa-${subItem.icon} w-4 text-gray-400 group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400 transition-colors duration-200`}></i>
                                    <span>{subItem.title}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={"/login"}>
                <Button className="bg-gradient-to-r from-slate-700 to-amber-700 rounded-4xl">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-4 px-4">
                {CONSUMER_NAVLINKS.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                      className="w-full text-left text-gray-700 dark:text-gray-300 font-bold hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200 flex items-center justify-between"
                    >
                      {item.title}
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </button>

                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === item.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 pl-4 space-y-6"
                        >
                          {item.dropdownItems?.map((section, idx) => (
                            <div key={idx} className="space-y-3">
                              <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                                <i className={`fas fa-${section.icon} text-amber-600 dark:text-amber-400 text-lg`}></i>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {section.title}
                                </h3>
                              </div>
                              <div className="space-y-2">
                                {section.items.map((subItem, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    href={subItem.href}
                                    className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200 group/item"
                                  >
                                    <i className={`fas fa-${subItem.icon} w-4 text-gray-400 group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400 transition-colors duration-200`}></i>
                                    <span>{subItem.title}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button className="bg-gradient-to-r from-slate-700 to-amber-700">
                    Get Started
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
