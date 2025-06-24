"use client"

import { useState } from "react"
import {
  Phone,
  MessageCircle,
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  Building,
  FileText,
  Shield,
  Award,
  Users,
  Clock,
  TrendingUp,
  Calculator,
  Globe,
  Zap,
  PlayCircle,
  Quote,
  ChevronRight,
  Target,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ConsultCA() {
  const [selectedService, setSelectedService] = useState("")
  const [consultationType, setConsultationType] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                India's Most Trusted CA Platform
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Expert <span className="text-yellow-300">CA Services</span>
                <br />
                At Your Fingertips
              </h1>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Get professional chartered accountant services for company registration, tax compliance, licensing, and
                more. Trusted by 50,000+ businesses across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Free Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg"
                >
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Quick Consultation Form */}
            <div className="lg:block">
              <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Consultation</h3>
                    <p className="text-gray-600">Get expert advice in 15 minutes</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Required</label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger className="w-full h-12">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="company-registration">Company Registration</SelectItem>
                          <SelectItem value="gst-registration">GST Registration</SelectItem>
                          <SelectItem value="tax-filing">Tax Filing</SelectItem>
                          <SelectItem value="trademark">Trademark Registration</SelectItem>
                          <SelectItem value="other">Other Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
                      <Select value={consultationType} onValueChange={setConsultationType}>
                        <SelectTrigger className="w-full h-12">
                          <SelectValue placeholder="Choose consultation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video Call</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="chat">Live Chat</SelectItem>
                          <SelectItem value="office">Office Visit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <Input placeholder="Enter your full name" className="h-12" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <Input placeholder="Enter your phone number" className="h-12" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brief Description</label>
                      <Textarea
                        placeholder="Describe your requirements briefly..."
                        className="min-h-[80px] resize-none"
                      />
                    </div>

                    <Button className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold">
                      <Zap className="h-4 w-4 mr-2" />
                      Get Instant Quote
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Response within 5 minutes
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expert CA Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive chartered accountant services to help your business grow and stay compliant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {serviceCategories.map((category, index) => (
              <ServiceCategoryCard key={index} category={category} />
            ))}
          </div>

          {/* Detailed Services */}
          <div className="space-y-16">
            {detailedServices.map((service, index) => (
              <ServiceSection key={index} service={service} isReversed={index % 2 === 1} />
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our CA Services?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our professional approach</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="h-16 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <reason.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Expert CAs Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert CAs</h2>
            <p className="text-xl text-gray-600">Qualified professionals with years of experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertCAs.map((ca, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-6 border-4 border-emerald-100">
                      <AvatarImage src={ca.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xl font-bold">
                        {ca.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{ca.name}</h3>
                    <p className="text-emerald-600 font-semibold mb-2">{ca.specialization}</p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        {ca.experience} years
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {ca.rating}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-6">{ca.bio}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 hover:bg-emerald-50 hover:text-emerald-700">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Book
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by thousands of businesses across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-emerald-500 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.company}</div>
                      <div className="text-sm text-emerald-600">{testimonial.service}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple 4-step process to get your work done</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-200 to-teal-200 transform translate-x-4"></div>
                )}
                <div className="h-16 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of satisfied clients who trust us with their CA needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now: +91 98765 43210
            </Button>
          </div>
          <div className="mt-8 text-emerald-100">
            <Clock className="h-4 w-4 inline mr-2" />
            Available 24/7 • Free Initial Consultation • No Hidden Charges
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceCategoryCard({ category }: { category: any }) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <CardContent className="p-6 text-center">
        <div className="h-16 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <category.icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
        <div className="text-emerald-600 font-semibold text-sm flex items-center justify-center">
          View Services
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  )
}

function ServiceSection({ service, isReversed }: { service: any; isReversed: boolean }) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? "lg:grid-flow-col-dense" : ""}`}
    >
      <div className={isReversed ? "lg:col-start-2" : ""}>
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
            <service.icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
        </div>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {service.services.map((item: string, index: number) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
        <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
          Get Started
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      <div className={isReversed ? "lg:col-start-1" : ""}>
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
            <div className="h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
              <service.icon className="h-24 w-24 text-emerald-600" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Data
const stats = [
  { value: "50K+", label: "Happy Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "99.9%", label: "Success Rate" },
  { value: "24/7", label: "Support" },
]

const serviceCategories = [
  {
    icon: Building,
    title: "Company Registration",
    description: "Complete business setup and registration services",
  },
  {
    icon: Shield,
    title: "Licenses & Registrations",
    description: "All types of business licenses and certifications",
  },
  {
    icon: Calculator,
    title: "Tax & Compliance",
    description: "GST, income tax, and compliance management",
  },
  {
    icon: Award,
    title: "Trademark & IP",
    description: "Intellectual property protection services",
  },
]

const detailedServices = [
  {
    icon: Building,
    title: "Company Registration and Setup",
    description:
      "Complete end-to-end company registration services with expert guidance. We handle all paperwork, government filings, and ensure your business is legally compliant from day one.",
    services: [
      "Private Limited Company Registration",
      "Limited Liability Partnership Registration",
      "One Person Company Registration",
      "Partnership Firm Registration",
      "Producer Company Registration",
      "Increase Authorized Capital",
      "Convert Private into Public Limited",
      "Close the LLP",
      "Convert Partnership into LLP",
      "Company Fresh Start Scheme (CFSS)",
    ],
  },
  {
    icon: Shield,
    title: "Licenses & Registrations",
    description:
      "Comprehensive licensing and registration services to ensure your business operates legally across all jurisdictions and industries.",
    services: [
      "Digital Signature Certificate Registration",
      "Udyam Registration Online",
      "MSME Registration",
      "ISO Certification",
      "Online FSSAI Registration",
      "Import Export Code Registration",
      "Revocation and Cancellation of GST",
      "NGO Registration (Section 8)",
      "Appointment of Director",
      "Apeda RCMC",
    ],
  },
  {
    icon: Calculator,
    title: "Tax & Compliances",
    description:
      "Expert tax planning, filing, and compliance services to keep your business financially healthy and legally compliant.",
    services: [
      "GST Registration",
      "Income Tax Return Filing for LLP",
      "GST Return Filing Online",
      "Accounting And Bookkeeping Services",
      "Director Removal",
      "Change Address",
      "Shop And Establishment Registration",
      "Indirect Tax",
      "Changes to LLP Agreement",
      "Accounting and Book-keeping Package",
    ],
  },
  {
    icon: Award,
    title: "Trademark and Intellectual Property",
    description: "Protect your brand and intellectual property with our comprehensive trademark and IP services.",
    services: ["Trademark Registration", "Trademark Search", "Trademark Renewal"],
  },
]

const whyChooseUs = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Qualified CAs with 15+ years of experience in various domains",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Fast processing with guaranteed timelines for all services",
  },
  {
    icon: Shield,
    title: "100% Compliance",
    description: "Ensure complete legal compliance with all regulations",
  },
  {
    icon: TrendingUp,
    title: "Cost Effective",
    description: "Transparent pricing with no hidden charges",
  },
  {
    icon: Target,
    title: "Personalized Service",
    description: "Dedicated CA assigned for personalized attention",
  },
  {
    icon: Globe,
    title: "Pan India Service",
    description: "Services available across all states and cities in India",
  },
]

const expertCAs = [
  {
    name: "CA Priya Sharma",
    specialization: "Corporate Law & Taxation",
    experience: 15,
    rating: 4.9,
    bio: "Expert in company registration, tax planning, and corporate compliance with 500+ successful registrations.",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    name: "CA Rajesh Kumar",
    specialization: "GST & Indirect Tax",
    experience: 12,
    rating: 4.8,
    bio: "Specialist in GST registration, return filing, and indirect tax matters with extensive industry experience.",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    name: "CA Meera Patel",
    specialization: "Trademark & IP",
    experience: 10,
    rating: 4.9,
    bio: "Intellectual property expert with successful trademark registrations for 1000+ brands and businesses.",
    avatar: "/placeholder.svg?height=96&width=96",
  },
]

const testimonials = [
  {
    name: "Amit Gupta",
    company: "TechStart Solutions",
    service: "Company Registration",
    content:
      "Excellent service! They helped us register our startup quickly and efficiently. The team was very professional and guided us through every step.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Priya Singh",
    company: "Fashion Hub",
    service: "GST Registration",
    content:
      "Outstanding support for GST registration and compliance. They made the complex process very simple and saved us a lot of time.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Rohit Sharma",
    company: "Food Express",
    service: "FSSAI License",
    content:
      "Got our FSSAI license processed in record time. The team was responsive and kept us updated throughout the process.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const process = [
  {
    icon: MessageCircle,
    title: "Consultation",
    description: "Free consultation to understand your requirements",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "We prepare and review all necessary documents",
  },
  {
    icon: CheckCircle,
    title: "Processing",
    description: "Submit applications and handle government procedures",
  },
  {
    icon: Award,
    title: "Completion",
    description: "Receive your certificates and ongoing support",
  },
]
