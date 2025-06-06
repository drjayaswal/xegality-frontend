"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CheckCircle2,
  Scale,
  Shield,
  Briefcase,
  Award,
  Users,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import AIAssistantInterface from "@/components/ui/ai-assistant-interface";
import { AuroraText } from "@/components/ui/aurora-text";
import SiriWave from "@/components/ui/ai";
import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description: string;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

interface ExpertiseItemProps {
  title: string;
  description: string;
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  image: string;
}

export default function StudentHome() {
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const isWaveActive = inputValue.trim() !== "" || inputFocused;
  const handleLoadingChange = (loading: boolean) => {
    setIsGlobalLoading(loading);
  };
  return (
    <div className="min-h-full max-w-[90rem] mx-auto relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* SiriWave Background - Amber/Slate theme */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className={`w-full h-full flex items-center justify-center transition-all transform duration-1000 ease-in-out scale-150 sm:scale-180 ${
            isWaveActive
              ? "-translate-y-32 sm:-translate-y-36"
              : "-translate-y-44 sm:-translate-y-43"
          } transform opacity-90 ${isGlobalLoading ? "blur-md" : "blur-0"}`}
        >
          <SiriWave
            colors={[
              "#334155", // slate-700
              "#1e293b", // slate-800
              "#059669", // emerald-600
              "#047857", // emerald-700
            ]}
            isWaveMode={isWaveActive}
          />
        </div>
      </div>

      <main className="pt-10 sm:pt-20 relative z-10">
        {/* Hero Section - Lawyer Professional */}
        <div className="mt-6 sm:mt-10">
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10">
            <div
              className={`flex flex-col items-center text-center mt-6 sm:mt-10 mb-0 relative ${
                isGlobalLoading ? "blur-md opacity-50" : "blur-0 opacity-100"
              }`}
            >
              {/* Xegality AI Text - Professional Amber/Slate theme */}
              <div className="relative z-20 flex flex-col items-center justify-center">
                {/* Professional Badge - Animated */}
                <div className="mb-4 sm:mb-6 h-10 flex items-center justify-center">
                  <div
                    className={`transition-all duration-700 transform ${
                      !isWaveActive && !inputFocused
                        ? "opacity-100 scale-100 translate-y-28"
                        : "opacity-100 scale-95 translate-y-40"
                    }`}
                  >
                    <Badge className="bg-gradient-to-r from-slate-700 to-emerald-600 text-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium rounded-full shadow-lg">
                      For Legal Students
                    </Badge>
                  </div>
                </div>
                <div
                  className={`transition-all duration-1000 ease-in-out transform ${
                    inputFocused || isWaveActive || inputValue != ""
                      ? "scale-105 sm:scale-110 -translate-y-20  drop-shadow-2xl"
                      : "scale-100 -translate-y-20 drop-shadow-lg"
                  }`}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-gray-900 mb-4 relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-slate-600/20 via-slate-800/20 to-emerald-600/20 blur-2xl sm:blur-3xl rounded-full transform transition-all duration-1000 ${
                        isWaveActive || inputFocused || inputValue != ""
                          ? "scale-150 sm:scale-200 opacity-60"
                          : "scale-100 sm:scale-150 opacity-30"
                      }`}
                    ></div>
                    <AuroraText
                      colors={[
                        "#334155", // slate-700
                        "#1e293b", // slate-800
                        "#059669", // emerald-600
                        "#047857", // emerald-700
                      ]}
                      className="font-bold relative z-10 drop-shadow-sm"
                    >
                      Xegality AI
                    </AuroraText>
                  </h1>
                </div>

                <div
                  className={`transition-all duration-800 ease-in-out ${
                    inputFocused || isWaveActive || inputValue != ""
                      ? "opacity-0 scale-95 translate-y-4"
                      : "opacity-100 scale-100 translate-y-0"
                  }`}
                >
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mt-4 px-4">
                    AI-powered legal education and study assistance
                  </p>
                  <p className="text-sm sm:text-md text-emerald-600 font-medium mt-2 px-4">
                    Master concepts • Ace exams • Build legal skills
                  </p>
                </div>
              </div>
            </div>

            {/* Search/Input Section */}
            <div className="w-full max-w-5xl relative z-30 px-4">
              <div className="relative z-20">
                <div
                  className={`transition-all duration-500 ${
                    isWaveActive
                      ? "drop-shadow-2xl scale-102 sm:scale-105"
                      : "drop-shadow-lg scale-100"
                  }`}
                >
                  <AIAssistantInterface
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    onLoadingChange={handleLoadingChange}
                    placeholder="Ask about constitutional law, contracts, torts, legal writing..."
                    from="slate-800"
                    to="emerald-800"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Services Section */}
        <section
          id="services"
          className={`py-12 sm:py-16 lg:py-20 relative ${
            isGlobalLoading ? "blur-md opacity-50" : "blur-0 opacity-100"
          }`}
        >
          <div className="relative">
            {/* Background - Professional Amber/Slate theme */}
            <div
              className={`absolute top-10 sm:top-20 left-4 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-blob transition-opacity duration-1000 ${
                isWaveActive ? "opacity-40" : "opacity-30"
              }`}
            ></div>
            <div
              className={`absolute top-20 sm:top-40 right-4 sm:right-10 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-blob animation-delay-2000 transition-opacity duration-1000 ${
                isWaveActive ? "opacity-40" : "opacity-30"
              }`}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
              <SectionHeading
                subtitle="Student AI Solutions"
                title="Comprehensive Legal Study Support"
                description="Advanced AI-powered tools designed for law students to enhance learning, improve grades, and build essential legal skills."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 relative z-10">
                {[
                  {
                    icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
                    title: "Study Planning",
                    description:
                      "AI-enhanced study schedules, exam preparation, and coursework organization for academic success.",
                  },
                  {
                    icon: <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />,
                    title: "Legal Writing Assistant",
                    description:
                      "Intelligent writing support with citation help, argument structuring, and legal memo guidance.",
                  },
                  {
                    icon: <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />,
                    title: "Case Brief Generator",
                    description:
                      "Smart case analysis tools, brief templates, and legal reasoning assistance for coursework.",
                  },
                  {
                    icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
                    title: "Study Groups",
                    description:
                      "Connect with classmates, share notes, and collaborate on assignments with AI-powered matching.",
                  },
                  {
                    icon: <Scale className="h-5 w-5 sm:h-6 sm:w-6" />,
                    title: "Legal Research",
                    description:
                      "Advanced AI-powered legal research with case law analysis, statute lookup, and citation management.",
                  },
                  {
                    icon: <Award className="h-5 w-5 sm:h-6 sm:w-6" />,
                    title: "Exam Preparation",
                    description:
                      "Personalized practice tests, flashcards, and performance analytics to maximize exam scores.",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/60 hover:border-emerald-200/60 overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-gray-50/60 to-emerald-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-emerald-100/40 to-transparent rounded-full transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="relative z-10">
                      <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-700 to-emerald-600 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <div className="text-white">{service.icon}</div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-r from-slate-200/40 to-emerald-200/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-1/2 translate-y-1/2 group-hover:scale-125"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Process */}
        <section
          className={`py-12 sm:py-16 lg:py-20 relative z-10 ${
            isGlobalLoading ? "blur-md opacity-50" : "blur-0 opacity-100"
          }`}
        >
          <div className="container mx-auto px-4">
            <SectionHeading
              subtitle="Professional Implementation"
              title="How We Transform Your Practice"
              description="A systematic approach to integrating AI into your legal practice for maximum efficiency and client satisfaction."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
              <ProcessStep
                number="01"
                title="Practice Assessment"
                description="Comprehensive analysis of your current workflows, identifying optimization opportunities and AI integration points."
              />
              <ProcessStep
                number="02"
                title="Custom Implementation"
                description="Tailored AI solution deployment with seamless integration into your existing practice management systems."
              />
              <ProcessStep
                number="03"
                title="Ongoing Optimization"
                description="Continuous monitoring, training, and refinement to ensure maximum ROI and practice growth."
              />
            </div>
          </div>
        </section>

        {/* Professional Features */}
        <section
          id="features"
          className={`py-12 sm:py-16 lg:py-20 relative z-10 ${
            isGlobalLoading ? "blur-md opacity-50" : "blur-0 opacity-100"
          }`}
        >
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-4xl bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center rounded-full bg-emerald-600/20 backdrop-blur-sm border border-emerald-700 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-emerald-700 mb-4 sm:mb-6">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Professional Features
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Built specifically for legal professionals by legal experts
                </h2>

                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                  Our platform combines cutting-edge AI with deep legal
                  expertise, helping thousands of legal professionals streamline
                  their practice and deliver exceptional client service.
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <ExpertiseItem
                    title="AI-Powered Document Analysis"
                    description="Our advanced algorithms analyze legal documents in seconds, identifying key provisions and potential issues."
                  />
                  <ExpertiseItem
                    title="Intelligent Case Management"
                    description="Streamline your workflow with AI-assisted case tracking, deadline management, and task automation."
                  />
                  <ExpertiseItem
                    title="Client Communication Tools"
                    description="Enhance client satisfaction with secure messaging, automated updates, and intelligent response suggestions."
                  />
                </div>

                <div className="mt-8 sm:mt-10">
                  <Button className="group bg-gradient-to-r from-slate-700 to-emerald-600 hover:from-slate-800 hover:to-emerald-700 text-white font-medium inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base">
                    Explore Professional Features
                    <ChevronRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="h-48 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=300"
                        alt="Legal Professional"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-32 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=200"
                        alt="Legal Document Analysis"
                        width={200}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                    <div className="h-32 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=200"
                        alt="Legal Team Meeting"
                        width={200}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-48 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=300"
                        alt="Modern Law Office"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-slate-100/60 to-emerald-100/60 rounded-full blur-2xl sm:blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Testimonials */}
        <section
          id="testimonials"
          className={`mt-6 sm:mt-10 py-12 sm:py-16 lg:py-20 relative z-10 ${
            isGlobalLoading ? "blur-md opacity-50" : "blur-0 opacity-100"
          }`}
        >
          <div className="container mx-auto px-4">
            <SectionHeading
              subtitle="Professional Success Stories"
              title="What Legal Professionals Say"
              description="Hear from law firms and legal professionals who have transformed their practice with Xegality AI."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
              <TestimonialCard
                quote="Xegality AI has revolutionized our case management. We've reduced administrative time by 40% and improved client satisfaction significantly."
                author="James Morrison"
                position="Managing Partner, Morrison & Associates"
                image="/placeholder.svg?height=100&width=100"
              />
              <TestimonialCard
                quote="The AI-powered document automation has streamlined our contract review process. What used to take hours now takes minutes with better accuracy."
                author="Patricia Williams"
                position="Senior Partner, Williams Law Group"
                image="/placeholder.svg?height=100&width=100"
              />
              <TestimonialCard
                quote="Our firm's efficiency has increased dramatically. The AI insights help us make better strategic decisions and serve our clients more effectively."
                author="Robert Chen"
                position="Founding Partner, Chen Legal Solutions"
                image="/placeholder.svg?height=100&width=100"
              />
            </div>
          </div>
        </section>

        {/* Professional CTA */}
        <section
          className={`py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-slate-800 via-slate-900 to-emerald-800 relative z-10 mx-4 sm:mx-0 rounded-2xl sm:rounded-none ${
            isGlobalLoading ? "blur-md opacity-50" : "blur-0 opacity-100"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready to Transform Your Legal Practice?
              </h2>
              <p className="text-base sm:text-lg text-emerald-200 mb-8 sm:mb-10 px-4">
                Schedule a consultation with our team to discover how Xegality
                AI can enhance your practice efficiency and client service
                excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-xl transition-all duration-300 text-sm sm:text-base">
                  Schedule Demo
                </Button>
                <Button className="bg-transparent text-white hover:bg-white/10 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl border-2 border-emerald-600/40 shadow-xl transition-all duration-300 text-sm sm:text-base">
                  Request Proposal
                </Button>
              </div>

              <p className="text-emerald-200/80 text-xs sm:text-sm mt-4 sm:mt-6 px-4">
                No commitment required • Customized to your practice • Full
                support included
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionHeading({ subtitle, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl mx-auto text-center px-4">
      <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm border border-emerald-200/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 mb-3 sm:mb-4">
        {subtitle}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
        {title}
      </h2>
      <p className="text-base sm:text-lg text-gray-600">{description}</p>
    </div>
  );
}

function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="relative bg-white/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-4xl md:text-center">
      <div className="md:flex md:justify-center mb-4 sm:mb-6">
        <div className="absolute left-0 md:static flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-r from-slate-700 to-emerald-600 text-white font-bold shadow-lg text-sm sm:text-base">
          {number}
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 pl-12 md:pl-0">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 pl-12 md:pl-0">
        {description}
      </p>
    </div>
  );
}

function ExpertiseItem({ title, description }: ExpertiseItemProps) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="h-5 w-5 sm:h-6 sm:w-6 mt-0.5 rounded-full bg-gradient-to-r from-slate-700 to-emerald-600 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
      </div>
      <div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  position,
  image,
}: TestimonialCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/60 hover:border-emerald-200/60">
      <div className="flex items-center gap-1 mb-3 sm:mb-4 text-emerald-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="h-4 w-4 sm:h-5 sm:w-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        "{quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={author}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-gray-900 text-sm sm:text-base">
            {author}
          </p>
          <p className="text-xs sm:text-sm text-gray-600">{position}</p>
        </div>
      </div>
    </div>
  );
}
