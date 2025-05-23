"use client"
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
      {children}
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
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
            <span className="text-xl font-bold text-gray-900">Xegality</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink href="/book-appointment">Book an Appointment</NavLink>
            <NavLink href="/hire-attorney">Hire an Attorney</NavLink>
            <NavLink href="/legal-contracts">Legal Contracts</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden lg:flex border-2 hover:text-indigo-700 transition-all duration-100 hover:scale-102 hover:bg-transparent hover:font-bold hover:border-indigo-700"
            >
              Client Portal
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <span>Get Consultation</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={` p-5 rounded-b-3xl lg:hidden absolute top-full left-0 right-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
          } overflow-hidden`}
        >
          <nav className="flex flex-col space-y-4 px-4 py-4">
            <NavLink href="#services">Book an Appointment</NavLink>
            <NavLink href="#expertise">Hire an Attorney</NavLink>
            <NavLink href="#contact">Legal Contracts</NavLink>
            <Button
              variant="outline"
              className="border-2 text-gray-600 hover:text-indigo-700 hover:border-indigo-700"
            >
              Client Portal
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}