"use client"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  ChevronRight,
  Clock,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Shield,
  MessageSquare,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tabs } from "@/components/ui/ac-tabs"
import { AdvancedSearch } from "@/components/advanced-seach"
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import type React from "react";
import {
  Search,
  Mic,
  ArrowUp,
  Plus,
  FileText,
  Code,
  BookOpen,
  PenTool,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Toggle } from "@/components/ui/toggle"

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [reasonEnabled, setReasonEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const [activeCommandCategory, setActiveCommandCategory] = useState<
    string | null
  >(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = () => {
    setShowUploadAnimation(true);

    // Simulate file upload with timeout
    setTimeout(() => {
      const newFile = `Document.pdf`;
      setUploadedFiles((prev) => [...prev, newFile]);
      setShowUploadAnimation(false);
    }, 1500);
  };


  const handleCommandSelect = (command: string) => {
    setInputValue(command);
    setActiveCommandCategory(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      console.log("Sending message:", inputValue);
      setInputValue("");
    }
  };

  const tabs = [
    {
      title: "Ask a Legal Question",
      value: "product",
      content: (
        <div className="w-full relative h-[23rem] rounded-2xl flex items-center justify-center p-8 md:p-10 text-lg md:text-2xl font-semibold text-white bg-white/60 border-[1.7px] border-indigo-600/35 shadow-lg">
          <div className="w-full border bg-white p-5 border-gray-200 rounded-xl shadow-sm mb-4">
            <AdvancedSearch />


            {/* Uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-50 py-1 px-2 rounded-md border border-gray-200"
                    >
                      <FileText className="w-3 h-3 text-blue-600" />
                      <span className="text-xs text-gray-700">{file}</span>
                      <button
                        onClick={() =>
                          setUploadedFiles((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search, Deep Research, Reason functions and actions */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Toggle className="data-[state=on]:text-indigo-400 border-[0.5px] data-[state=on]:hover:text-indigo-400 data-[state=on]:hover:bg-transparent px-5 data-[state=on]:bg-indigo-400/20 rounded-full border-transparent text-gray-500/80">
                  Deep Search
                </Toggle>
        </div>
            </div>

            <div className="px-4 py-2 border-t border-gray-100">
              <button
                onClick={handleUploadFile}
                className="flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900 transition-colors"
              >
                {showUploadAnimation ? (
                  <motion.div
                    className="flex space-x-1"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                        variants={{
                          hidden: { opacity: 0, y: 5 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.4,
                              repeat: Infinity,
                              repeatType: "mirror",
                              delay: i * 0.1,
                            },
                          },
                        }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span>Upload Files</span>
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Analyze Document",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-[25rem] rounded-2xl p-8 md:p-10 text-lg md:text-2xl font-semibold text-white bg-white/60 border border-gray-400 shadow-lg">
          <div className="space-y-6 text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:shadow-md hover:border-indigo-500 transition-colors">
              <FileText className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-100">Upload your legal document</h3>
              <p className="text-sm text-gray-400 mb-4">
                Drag and drop or click to upload PDF, DOCX, or TXT files
              </p>
              <Button variant="outline" className="text-gray-100 border-gray-400 hover:border-indigo-500 hover:text-indigo-500">
                Select File
              </Button>
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 text-base font-medium rounded-lg shadow-md transition-transform transform hover:scale-105">
              Analyze Document
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Generate Document",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-[25rem] rounded-2xl p-8 md:p-10 text-lg md:text-2xl font-semibold text-white bg-white/60 border border-gray-400 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Rental Agreement", "Employment Contract", "Legal Notice", "More Templates..."].map((template, idx) => (
              <Link href="/templates" key={idx} className="w-full">
                <Card className="cursor-pointer bg-gray-800 hover:bg-gray-700 hover:shadow-md rounded-lg transition-transform transform hover:scale-105">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="rounded-full bg-indigo-100 p-3 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-indigo-700" />
                    </div>
                    <span className="text-gray-100 font-medium">{template}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ),
    },
  ];


  return (
    <div className="min-h-screen ">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-10">
              <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 mb-4">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Powered by Advanced AI Technology
                </span>
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                India's <span className="text-indigo-200">First</span> AI Legal Assistant
              </h1>
              <p className="text-indigo-100 text-lg max-w-2xl">
                Get instant legal advice, document analysis, and case management powered by artificial intelligence
              </p>
            </div>




            <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-10">
              <Tabs tabs={tabs} />
            </div>























          </div>
        </section>
        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeading
              subtitle="Our Services"
              title="Comprehensive Legal Solutions"
              description="We offer a wide range of legal services tailored to meet your specific needs and challenges."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <ServiceCard
                icon={<Shield className="h-6 w-6 text-indigo-600" />}
                title="Corporate Law"
                description="Expert guidance on business formation, governance, compliance, and corporate transactions."
              />
              <ServiceCard
                icon={<FileText className="h-6 w-6 text-indigo-600" />}
                title="Contract Review"
                description="Thorough analysis and drafting of contracts to protect your interests and mitigate risks."
              />
              <ServiceCard
                icon={<Users className="h-6 w-6 text-indigo-600" />}
                title="Intellectual Property"
                description="Protection for your innovations, creative works, and brand identity through patents, trademarks, and copyrights."
              />
              <ServiceCard
                icon={<Calendar className="h-6 w-6 text-indigo-600" />}
                title="Litigation Support"
                description="Strategic representation and advocacy in court proceedings and dispute resolution."
              />
              <ServiceCard
                icon={<Clock className="h-6 w-6 text-indigo-600" />}
                title="Regulatory Compliance"
                description="Navigate complex regulatory frameworks with expert guidance to ensure full compliance."
              />
              <ServiceCard
                icon={<MessageSquare className="h-6 w-6 text-indigo-600" />}
                title="Legal Consultation"
                description="Personalized legal advice and strategy sessions tailored to your specific situation."
              />
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
                  Our team brings decades of combined experience across various legal specialties, allowing us to
                  provide comprehensive solutions to even the most complex legal challenges.
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
                Schedule a consultation with our team to discuss your legal needs and how we can help you achieve your
                goals.
              </p>

              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input type="text" id="name" placeholder="John Doe" className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input type="email" id="email" placeholder="john@example.com" className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input type="tel" id="phone" placeholder="+1 (555) 000-0000" className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
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
  )
}


function SectionHeading({ subtitle, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 mb-4">
        {subtitle}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  )
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
  )
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
  )
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
  )
}

function TestimonialCard({ quote, author, position, image }: TestimonialCardProps) {
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
          <Image src={image || "/placeholder.svg"} alt={author} width={40} height={40} className="object-cover" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{author}</p>
          <p className="text-sm text-gray-600">{position}</p>
        </div>
      </div>
    </div>
  )
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
  )
}

