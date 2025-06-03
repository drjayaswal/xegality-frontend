"use client";

import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { STUDENT_NAVLINKS } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Menu, Shield, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/20 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
          <nav className="hidden md:flex items-center space-x-2">
            {STUDENT_NAVLINKS.map(({ title, href }, index) => {
              const isActive = href === usePathname();
              return (
                <Link
                  key={index}
                  href={href}
                  className={cn(
                    "text-slate-700 py-2 px-5 font-bold rounded-full dark:text-gray-300 hover:text-emerald-600 dark:hover:text-blue-400 transition-all duration-300 text-sm relative group",
                    isActive && "bg-emerald-800 text-emerald-500"
                  )}
                >
                  {title}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={"/login"}>
                <Button className="bg-gradient-to-r from-slate-700 to-emerald-700 rounded-4xl">
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
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4">
              {STUDENT_NAVLINKS.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={`${item.href}`}
                  className="text-slate-700 font-bold dark:text-gray-300 hover:text-emerald-600 dark:hover:text-blue-400 transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.title}
                </motion.a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button className="bg-gradient-to-r from-slate-700 to-emerald-700">
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
