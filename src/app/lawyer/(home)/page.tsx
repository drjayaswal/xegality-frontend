"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Shield,
  CheckCircle2,
  FileText,
  Calendar,
  Clock,
  Users,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { AIAssistantInterface } from "@/components/ui/ai-assistant-interface";
import { AuroraText } from "@/components/ui/aurora-text";
import SiriWave from "@/components/ui/ai";

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

interface TeamMemberProps {
  name: string;
  position: string;
  image: string;
}

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [reasonEnabled, setReasonEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [activeCommandCategory, setActiveCommandCategory] = useState<
    string | null
  >(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced wave trigger logic
  const isWaveActive = inputValue.trim() !== "" || inputFocused;

  return (
    <div className="min-h-full max-w-[90rem] mx-auto relative overflow-hidden">
      {/* Enhanced SiriWave Background - Fixed positioning for full coverage */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className={`w-full h-full flex items-center justify-center transition-all transform  duration-1000 ease-in-out scale-180 ${
            isWaveActive ? "-translate-y-55" : "-translate-y-60"
          } transform opacity-30`}
        >
          <SiriWave isWaveMode={isWaveActive} opacity={1} />
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="fixed inset-0  pointer-events-none z-1"></div>

      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <div className="mt-10">
          <div className="flex flex-col items-center text-center mb-8 md:mb-10">
            <div className="flex flex-col items-center text-center mt-10 mb-0 relative">
              {/* Floating Xegality AI Text */}
              <div className="relative z-20 flex flex-col items-center justify-center">
                <div
                  className={`transition-all duration-1000 ease-in-out transform ${
                    inputFocused || isWaveActive || inputValue != ""
                      ? "scale-110 translate-y-8 drop-shadow-2xl"
                      : "scale-100 translate-y-0 drop-shadow-lg"
                  }`}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-gray-900 mb-4 relative">
                    {/* Enhanced glow effect that responds to wave activity */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl rounded-full transform transition-all duration-1000 ${
                        isWaveActive || inputFocused || inputValue != ""
                          ? "scale-200 opacity-60"
                          : "scale-150 opacity-30"
                      }`}
                    ></div>
                    <AuroraText className="font-bold relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                      Xegality AI
                    </AuroraText>
                  </h1>
                </div>

                {/* Subtitle that fades out on focus */}
                <div
                  className={`transition-all duration-800 ease-in-out ${
                    inputFocused || isWaveActive || inputValue != ""
                      ? "opacity-0 scale-95 translate-y-4"
                      : "opacity-100 scale-100 translate-y-0"
                  }`}
                >
                  <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mt-4">
                    Your intelligent legal companion powered by AI
                  </p>
                </div>
              </div>
            </div>

            {/* Search/Input Section - Enhanced with wave interaction */}
            <div className="w-full max-w-5xl relative z-30">
              <div className="absolute inset-0 rounded-lg z-10"></div>
              <div className="relative z-20">
                {/* Enhanced input wrapper with glow effect */}
                <div
                  className={`transition-all duration-500 ${
                    isWaveActive
                      ? "drop-shadow-2xl scale-105"
                      : "drop-shadow-lg scale-100"
                  }`}
                >
                  <div>
                    <AIAssistantInterface
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      // onChange={(value: string) => setInputValue(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Services Section with wave-responsive background */}
        <section id="services" className="py-20 relative">
          <div className="relative">
            {/* Enhanced Background decorative elements that respond to wave activity */}
            <div
              className={`absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob transition-opacity duration-1000 ${
                isWaveActive ? "opacity-40" : "opacity-30"
              }`}
            ></div>
            <div
              className={`absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 transition-opacity duration-1000 ${
                isWaveActive ? "opacity-40" : "opacity-30"
              }`}
            ></div>
            <div
              className={`absolute bottom-20 left-1/3 w-88 h-88 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 transition-opacity duration-1000 ${
                isWaveActive ? "opacity-40" : "opacity-30"
              }`}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
              <SectionHeading
                subtitle="Our AI-Powered Services"
                title="Comprehensive Legal Solutions"
                description="We offer a wide range of AI-enhanced legal services tailored to meet your specific needs and challenges."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 relative z-10">
                {[
                  {
                    icon: <Shield className="h-6 w-6" />,
                    title: "Corporate Law",
                    description:
                      "Expert AI-guided guidance on business formation, governance, compliance, and corporate transactions.",
                  },
                  {
                    icon: <FileText className="h-6 w-6" />,
                    title: "Contract Review",
                    description:
                      "AI-powered analysis and drafting of contracts to protect your interests and mitigate risks.",
                  },
                  {
                    icon: <Users className="h-6 w-6" />,
                    title: "Intellectual Property",
                    description:
                      "AI-enhanced protection for your innovations, creative works, and brand identity through patents, trademarks, and copyrights.",
                  },
                  {
                    icon: <Calendar className="h-6 w-6" />,
                    title: "Litigation Support",
                    description:
                      "Strategic AI-assisted representation and advocacy in court proceedings and dispute resolution.",
                  },
                  {
                    icon: <Clock className="h-6 w-6" />,
                    title: "Regulatory Compliance",
                    description:
                      "Navigate complex regulatory frameworks with AI-powered expert guidance to ensure full compliance.",
                  },
                  {
                    icon: <MessageSquare className="h-6 w-6" />,
                    title: "Legal Consultation",
                    description:
                      "Personalized AI-enhanced legal advice and strategy sessions tailored to your specific situation.",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/60 hover:border-blue-200/60 overflow-hidden transform hover:-translate-y-2"
                  >
                    {/* Enhanced Gradient hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/60 to-purple-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Animated background pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <div className="text-white">{service.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Enhanced decorative corner accent */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-1/2 translate-y-1/2 group-hover:scale-125"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced How It Works Section */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 ">
            <SectionHeading
              subtitle="Our AI-Enhanced Process"
              title="How We Work With You"
              description="A streamlined, AI-powered approach to handling your legal matters efficiently and effectively."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <ProcessStep
                number="01"
                title="AI-Powered Consultation"
                description="We begin with an AI-enhanced analysis of your legal needs and objectives to understand your unique situation with unprecedented accuracy."
              />
              <ProcessStep
                number="02"
                title="Smart Strategy Development"
                description="Our AI algorithms create a customized legal strategy designed to achieve your specific goals with maximum efficiency."
              />
              <ProcessStep
                number="03"
                title="Intelligent Implementation"
                description="We execute the strategy with AI-assisted precision and provide continuous intelligent support throughout the entire process."
              />
            </div>
          </div>
        </section>

        {/* Rest of sections with enhanced backgrounds */}
        <section id="expertise" className="py-20 relative z-10">
          <div className="container mx-auto p-8 rounded-4xl bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border-2 bg-blue-600/20 backdrop-blur-sm border border-blue-700 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
                  Our AI Expertise
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Specialized AI knowledge across multiple legal domains
                </h2>

                <p className="text-lg text-gray-600 mb-8">
                  Our team combines decades of legal experience with
                  cutting-edge AI technology, allowing us to provide
                  comprehensive solutions to even the most complex legal
                  challenges.
                </p>

                <div className="space-y-6">
                  <ExpertiseItem
                    title="AI-Enhanced Legal Research"
                    description="Our AI systems analyze millions of cases and legal documents to provide instant, accurate insights."
                  />
                  <ExpertiseItem
                    title="Cutting-Edge Legal Tech"
                    description="We leverage the most advanced AI and machine learning technologies to deliver efficient and accurate services."
                  />
                  <ExpertiseItem
                    title="Global AI Perspective"
                    description="International AI-powered experience to handle cross-border legal matters effectively."
                  />
                </div>

                <div className="mt-10">
                  <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium inline-flex items-center px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Learn more about our AI expertise
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-64 rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=300&query=AI-powered legal professional in modern office"
                        alt="AI Legal Professional"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-40 rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=200&query=AI legal documents and modern laptop"
                        alt="AI Legal Documents"
                        width={200}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="h-40 rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=200&query=AI legal team in discussion"
                        alt="AI Legal Team"
                        width={200}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-64 rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=300&query=modern AI-powered courtroom"
                        alt="AI Courtroom"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-blue-100/60 to-indigo-100/60 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section id="testimonials" className="mt-10 py-20 relative z-10">
          <div className="container mx-auto px-4">
            <SectionHeading
              subtitle="Client Success Stories"
              title="What Our Clients Say About Xegality AI"
              description="Hear from businesses and individuals who have experienced the power of AI-enhanced legal services."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <TestimonialCard
                quote="Xegality AI provided exceptional guidance through our company's merger. Their AI-powered attention to detail and strategic approach made a complex process manageable."
                author="Sarah Johnson"
                position="CEO, TechInnovate"
                image="/placeholder.svg?height=100&width=100&query=professional woman headshot"
              />
              <TestimonialCard
                quote="The AI-enhanced expertise in intellectual property law helped us secure crucial patents for our innovations. Their proactive AI approach saved us from potential legal issues."
                author="Michael Chen"
                position="Founder, NexGen Solutions"
                image="/placeholder.svg?height=100&width=100&query=professional man headshot asian"
              />
              <TestimonialCard
                quote="I was impressed by how quickly their AI understood our unique regulatory challenges and developed a compliance strategy that worked perfectly for our business model."
                author="Rebecca Torres"
                position="COO, HealthPlus"
                image="/placeholder.svg?height=100&width=100&query=professional woman headshot latina"
              />
            </div>
          </div>
        </section>

        {/* Enhanced Team Section */}
        <section id="team" className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <SectionHeading
              subtitle="Our AI-Enhanced Team"
              title="Meet Our Legal AI Experts"
              description="A diverse team of specialized attorneys and AI experts committed to providing exceptional legal services."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <TeamMember
                name="Alexandra Wright"
                position="AI Corporate Law Specialist"
                image="/placeholder.svg?height=400&width=300&query=professional female lawyer portrait"
              />
              <TeamMember
                name="David Chen"
                position="AI Intellectual Property Expert"
                image="/placeholder.svg?height=400&width=300&query=professional male lawyer portrait asian"
              />
              <TeamMember
                name="Sophia Rodriguez"
                position="AI Litigation Specialist"
                image="/placeholder.svg?height=400&width=300&query=professional female lawyer portrait latina"
              />
              <TeamMember
                name="Marcus Johnson"
                position="AI Regulatory Compliance Expert"
                image="/placeholder.svg?height=400&width=300&query=professional male lawyer portrait african american"
              />
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="px-8 py-3 rounded-xl border-2 border-[#3b82f6] dark:border-[#60a5fa] text-[#3b82f6] dark:text-[#60a5fa] bg-transparent hover:text-white hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#6366f1] transition-all duration-200 active:scale-95 shadow-none"
              >
                View Our Team
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section
          id="contact"
          className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative z-10"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Experience AI-Powered Legal Excellence?
              </h2>
              <p className="text-lg text-blue-100 mb-10">
                Schedule a consultation with our AI-enhanced team to discuss
                your legal needs and discover how we can help you achieve your
                goals with unprecedented efficiency.
              </p>

              <Button className="w-full bg-transparent text-md text-white hover:bg-white hover:text-blue-600 font-bold py-6 rounded-xl border-2 border-white/20 shadow-lg shadow-xl transition-all duration-300">
                Schedule Your AI-Enhanced Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionHeading({ subtitle, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 px-4 py-2 text-sm font-medium text-blue-700 mb-4">
        {subtitle}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
      <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-4xl md:text-center">
      <div className="md:flex md:justify-center mb-6">
        <div className="absolute left-0 md:static flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-lg">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ExpertiseItem({ title, description }: ExpertiseItemProps) {
  return (
    <div className="flex gap-4">
      <div className="h-6 w-6 mt-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="h-4 w-4 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/60 hover:border-blue-200/60">
      <div className="flex items-center gap-1 mb-4 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 mb-6">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={author}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-gray-900">{author}</p>
          <p className="text-sm text-gray-600">{position}</p>
        </div>
      </div>
    </div>
  );
}

function TeamMember({ name, position, image }: TeamMemberProps) {
  return (
    <div className="group">
      <div className="relative h-80 rounded-2xl overflow-hidden mb-4 shadow-lg">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-gray-600">{position}</p>
    </div>
  );
}
