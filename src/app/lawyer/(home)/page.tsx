"use client";

import { Input } from "@/components/ui/input";
import { Calendar, ChevronRight, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Shield, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import type React from "react";
import { FileText, Sparkles } from "lucide-react";
import { AIAssistantInterface } from "@/components/ui/ai-assistant-interface";
import { AuroraText } from "@/components/ui/aurora-text";
import SiriWave from "@/components/ui/ai";

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

  return (
    <div className="min-h-screen max-w-[90rem] mx-auto">
      <main className="pt-20">
        {/* Hero Section */}
        <div className="mt-10">
          <div className="flex flex-col items-center text-center  mb-8 md:mb-10">
            <div className="flex flex-col items-center text-center mb-60">
              {/* Container with all content except logo, fade out on focus */}
              <div
                className={`absolute transition-all duration-800 ease-in-out ${inputFocused
                  ? "scale-0 opacity-0 pointer-events-none"
                  : "scale-100 opacity-100"
                  }`}
              >
                {inputFocused ? (
                  <></>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <Badge
                      variant="outline"
                      className="h-fit w-fit p-3 rounded-full text-sm bg-indigo-100 text-indigo-800 mb-4"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Revolutionizing Legal Solutions with AI
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 mb-4">
                      Your Legal Partner{" "}
                      <AuroraText className="font-bold">Xegality AI</AuroraText>
                    </h1>
                    <p className="text-gray-600 text-base text-center sm:text-lg max-w-2xl mb-8">
                      Experience seamless, accurate, and efficient legal support
                    </p>
                  </div>
                )}
              </div>

              {/* Only logo shown when input is focused */}
              <div
                className={`absolute transition-all duration-800 ease-in-out ${inputFocused
                  ? "scale-100 opacity-100"
                  : "scale-0 opacity-0 pointer-events-none"
                  }`}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 mb-4">
                  <div className="flex justify-center align-middle items-center flex-col gap-6">
                    <SiriWave isWaveMode={inputValue != ""} />
                  </div>
                </h1>
              </div>
            </div>
            {/* Search/Input Section */}
            <div className="w-full max-w-5xl relative">
              <div className="absolute inset-0 rounded-lg z-10"></div>
              <div className="relative z-20">
                <AIAssistantInterface
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Services Section */}
        <section id="services">
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <SectionHeading
              subtitle="Our Services"
              title="Comprehensive Legal Solutions"
              description="We offer a wide range of legal services tailored to meet your specific needs and challenges."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 relative z-10">
              {[
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Corporate Law",
                  description:
                    "Expert guidance on business formation, governance, compliance, and corporate transactions.",
                },
                {
                  icon: <FileText className="h-6 w-6" />,
                  title: "Contract Review",
                  description:
                    "Thorough analysis and drafting of contracts to protect your interests and mitigate risks.",
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Intellectual Property",
                  description:
                    "Protection for your innovations, creative works, and brand identity through patents, trademarks, and copyrights.",
                },
                {
                  icon: <Calendar className="h-6 w-6" />,
                  title: "Litigation Support",
                  description:
                    "Strategic representation and advocacy in court proceedings and dispute resolution.",
                },
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: "Regulatory Compliance",
                  description:
                    "Navigate complex regulatory frameworks with expert guidance to ensure full compliance.",
                },
                {
                  icon: <MessageSquare className="h-6 w-6" />,
                  title: "Legal Consultation",
                  description:
                    "Personalized legal advice and strategy sessions tailored to your specific situation.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-50 hover:border-indigo-200 overflow-hidden"
                >
                  {/* Gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="h-14 w-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors duration-300">
                      <div className="text-indigo-600">{service.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-indigo-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform translate-x-1/2 translate-y-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionHeading
              subtitle="Our Process"
              title="How We Work With You"
              description="A streamlined approach to handling your legal matters efficiently and effectively."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <ProcessStep
                number="01"
                title="Initial Consultation"
                description="We begin with a thorough discussion of your legal needs and objectives to understand your unique situation."
              />
              <ProcessStep
                number="02"
                title="Strategy Development"
                description="Our team creates a customized legal strategy designed to achieve your specific goals efficiently."
              />
              <ProcessStep
                number="03"
                title="Implementation & Support"
                description="We execute the strategy with precision and provide ongoing support throughout the entire process."
              />
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 mb-6">
                  Our Expertise
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Specialized knowledge across multiple legal domains
                </h2>

                <p className="text-lg text-gray-600 mb-8">
                  Our team brings decades of combined experience across various
                  legal specialties, allowing us to provide comprehensive
                  solutions to even the most complex legal challenges.
                </p>

                <div className="space-y-6">
                  <ExpertiseItem
                    title="Industry-Specific Knowledge"
                    description="Our attorneys specialize in technology, healthcare, finance, and more."
                  />
                  <ExpertiseItem
                    title="Cutting-Edge Legal Tech"
                    description="We leverage advanced legal technology to deliver efficient and accurate services."
                  />
                  <ExpertiseItem
                    title="Global Perspective"
                    description="International experience to handle cross-border legal matters effectively."
                  />
                </div>

                <div className="mt-10">
                  <Button className="group text-indigo-600 font-medium inline-flex items-center">
                    Learn more about our expertise
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-64 rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=300&query=professional lawyer in modern office"
                        alt="Legal Professional"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-40 rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=200&query=legal documents and modern laptop"
                        alt="Legal Documents"
                        width={200}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="h-40 rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=200&query=legal team in discussion"
                        alt="Legal Team"
                        width={200}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-64 rounded-2xl overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=300&query=modern courtroom"
                        alt="Courtroom"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="mt-10 py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionHeading
              subtitle="Client Testimonials"
              title="What Our Clients Say"
              description="Hear from businesses and individuals who have trusted us with their legal matters."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <TestimonialCard
                quote="Xegality provided exceptional guidance through our company's merger. Their attention to detail and strategic approach made a complex process manageable."
                author="Sarah Johnson"
                position="CEO, TechInnovate"
                image="/placeholder.svg?height=100&width=100&query=professional woman headshot"
              />
              <TestimonialCard
                quote="The team's expertise in intellectual property law helped us secure crucial patents for our innovations. Their proactive approach saved us from potential legal issues."
                author="Michael Chen"
                position="Founder, NexGen Solutions"
                image="/placeholder.svg?height=100&width=100&query=professional man headshot asian"
              />
              <TestimonialCard
                quote="I was impressed by how quickly they understood our unique regulatory challenges and developed a compliance strategy that worked perfectly for our business model."
                author="Rebecca Torres"
                position="COO, HealthPlus"
                image="/placeholder.svg?height=100&width=100&query=professional woman headshot latina"
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeading
              subtitle="Our Team"
              title="Meet Our Legal Experts"
              description="A diverse team of specialized attorneys committed to providing exceptional legal services."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <TeamMember
                name="Alexandra Wright"
                position="Corporate Law"
                image="/placeholder.svg?height=400&width=300&query=professional female lawyer portrait"
              />
              <TeamMember
                name="David Chen"
                position="Intellectual Property"
                image="/placeholder.svg?height=400&width=300&query=professional male lawyer portrait asian"
              />
              <TeamMember
                name="Sophia Rodriguez"
                position="Litigation"
                image="/placeholder.svg?height=400&width=300&query=professional female lawyer portrait latina"
              />
              <TeamMember
                name="Marcus Johnson"
                position="Regulatory Compliance"
                image="/placeholder.svg?height=400&width=300&query=professional male lawyer portrait african american"
              />
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" className="border-gray-300">
                View All Team Members
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-indigo-600">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started with Expert Legal Guidance?
              </h2>
              <p className="text-lg text-indigo-100 mb-10">
                Schedule a consultation with our team to discuss your legal
                needs and how we can help you achieve your goals.
              </p>

              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Service Needed
                    </label>
                    <select
                      id="service"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3"
                    >
                      <option value="">Select a service</option>
                      <option value="corporate">Corporate Law</option>
                      <option value="contracts">Contract Review</option>
                      <option value="ip">Intellectual Property</option>
                      <option value="litigation">Litigation Support</option>
                      <option value="compliance">Regulatory Compliance</option>
                      <option value="consultation">Legal Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Brief Description of Your Legal Needs
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Please provide a brief overview of your situation..."
                  ></textarea>
                </div>

                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6">
                  Schedule Your Consultation
                </Button>
              </div>
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
      <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 mb-4">
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
    <div className="relative pl-12 md:pl-0 md:text-center">
      <div className="md:flex md:justify-center mb-6">
        <div className="absolute left-0 md:static flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 font-bold">
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
      <div className="h-6 w-6 mt-0.5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="h-4 w-4 text-indigo-600" />
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
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
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
      <div className="relative h-80 rounded-xl overflow-hidden mb-4">
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

