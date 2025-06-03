"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, Clock, Shield, Phone, MessageCircle, ChevronDown, Menu, X, Star, Users, Award, CheckCircle, ArrowRight, Play, Quote, Moon, Sun, Zap, Globe, FileText, Video, Calendar, TrendingUp, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  const [searchType, setSearchType] = useState<"quick" | "specialized">("quick")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <div className={`min-h-screen transition-colors duration-500`}>
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-500">

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Animated Background */}
          <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </motion.div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Online Lawyers Indicator */}
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-gray-200 dark:border-gray-700 shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white dark:border-gray-800"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">2,847+ Lawyers Online</span>
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
                variants={itemVariants}
              >
                Find Legal Help{" "}
                <motion.span
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  Instantly
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
                variants={itemVariants}
              >
                Connect with verified lawyers in minutes. Get instant consultations via chat or voice call.
              </motion.p>

              {/* Search Type Toggle */}
              <motion.div className="flex justify-center mb-8" variants={itemVariants}>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 border border-gray-200 dark:border-gray-700 shadow-lg">
                  {[
                    { type: "quick", icon: Clock, label: "Quick Search" },
                    { type: "specialized", icon: Search, label: "Specialized Search" },
                  ].map(({ type, icon: Icon, label }) => (
                    <motion.button
                      key={type}
                      onClick={() => setSearchType(type as "quick" | "specialized")}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${searchType === type
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4 inline mr-2" />
                      {label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Search Interface */}
              <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
                {searchType === "quick" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className=" bg-white/70 shadow-none border-none">
                      <CardContent className="p-10">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Describe Your Legal Issue
                        </h3>
                        <div className="space-y-4">
                          <motion.textarea
                            placeholder="e.g., I need help with a property dispute, divorce proceedings, or business contract..."
                            className="w-full h-32 p-4 border border-gray-200 dark:border-gray-600 shadow-xl rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                            whileFocus={{ scale: 1.02 }}
                          />
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button className="w-fit rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                              <Zap className="w-5 h-5 mr-2" />
                              Find Lawyer Now
                            </Button>
                          </motion.div>
                        </div>
                        <motion.p
                          className="text-sm text-gray-500 dark:text-gray-400 mt-4"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          ⚡ Get matched with a lawyer in under 2 hours
                        </motion.p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                          Find Specialized Lawyers
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {[
                            { placeholder: "Select City", options: ["Mumbai", "Delhi", "Bangalore"] },
                            { placeholder: "Practice Area", options: ["Family Law", "Criminal Law", "Corporate Law"] },
                            { placeholder: "Lawyer name or keyword", isInput: true },
                          ].map((field, index) => (
                            <motion.div
                              key={index}
                              className="relative"
                              whileHover={{ scale: 1.02 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              {field.isInput ? (
                                <Input
                                  placeholder={field.placeholder}
                                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                                />
                              ) : (
                                <>
                                  <select className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300">
                                    <option>{field.placeholder}</option>
                                    {field.options?.map((option) => (
                                      <option key={option}>{option}</option>
                                    ))}
                                  </select>
                                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </>
                              )}
                            </motion.div>
                          ))}
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                            <Search className="w-5 h-5 mr-2" />
                            Search Lawyers
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>

              {/* Quick Categories */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mt-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {["Family Law", "Criminal Law", "Property Law", "Corporate Law", "Cyber Crime"].map(
                  (category, index) => (
                    <motion.button
                      key={category}
                      className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ),
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { number: "10,000+", label: "Verified Lawyers", icon: Users },
                { number: "50,000+", label: "Cases Resolved", icon: CheckCircle },
                { number: "98%", label: "Success Rate", icon: TrendingUp },
                { number: "24/7", label: "Support Available", icon: Clock },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h3
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Popular Attorneys Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Popular Attorneys</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Connect with our top-rated lawyers who have helped thousands of clients
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  name: "Adv. Priya Sharma",
                  specialty: "Family Law Expert",
                  rating: 4.9,
                  cases: 500,
                  experience: "15 years",
                  image: "/placeholder.svg?height=100&width=100&query=professional+indian+female+lawyer",
                },
                {
                  name: "Adv. Rajesh Kumar",
                  specialty: "Criminal Defense",
                  rating: 4.8,
                  cases: 750,
                  experience: "20 years",
                  image: "/placeholder.svg?height=100&width=100&query=professional+indian+male+lawyer",
                },
                {
                  name: "Adv. Meera Patel",
                  specialty: "Corporate Law",
                  rating: 4.9,
                  cases: 300,
                  experience: "12 years",
                  image: "/placeholder.svg?height=100&width=100&query=professional+indian+female+lawyer+corporate",
                },
              ].map((lawyer, index) => (
                <motion.div
                  key={lawyer.name}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <Card className="bg-white dark:bg-gray-700 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                          <Avatar className="w-16 h-16 border-4 border-gradient-to-r from-blue-600 to-purple-600">
                            <AvatarImage src={lawyer.image || "/placeholder.svg"} alt={lawyer.name} />
                            <AvatarFallback>
                              {lawyer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{lawyer.name}</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{lawyer.specialty}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {lawyer.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{lawyer.cases}+</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cases Won</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{lawyer.experience}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Consult Now
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  View All Lawyers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Xegality Section */}
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Xegality?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the future of legal consultations with our innovative platform
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Clock,
                  title: "Instant Matching",
                  description: "Get connected with qualified lawyers in under 2 hours, just like booking a ride",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: MessageCircle,
                  title: "Multiple Communication",
                  description: "Chat, voice calls, or video consultations - choose what works best for you",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Shield,
                  title: "Verified Lawyers",
                  description: "All lawyers are verified and rated by previous clients for your peace of mind",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Globe,
                  title: "24/7 Availability",
                  description: "Legal help when you need it most, available round the clock",
                  color: "from-orange-500 to-red-500",
                },
                {
                  icon: Award,
                  title: "Expert Network",
                  description: "Access to specialized lawyers across all practice areas",
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  icon: CheckCircle,
                  title: "Guaranteed Results",
                  description: "98% success rate with money-back guarantee on consultations",
                  color: "from-teal-500 to-green-500",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 hover:shadow-lg transition-all duration-500 group"
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive legal solutions tailored to your needs
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: MessageCircle,
                  title: "Legal Consultation",
                  description: "One-on-one consultations with expert lawyers via chat, voice, or video call",
                  features: ["Instant chat support", "Video consultations", "Voice calls", "Document review"],
                },
                {
                  icon: FileText,
                  title: "Document Drafting",
                  description: "Professional legal document preparation and review services",
                  features: ["Contract drafting", "Legal notices", "Agreements", "Court filings"],
                },
                {
                  icon: Video,
                  title: "Court Representation",
                  description: "Expert legal representation in courts across all jurisdictions",
                  features: ["Trial advocacy", "Appeal representation", "Bail applications", "Case management"],
                },
                {
                  icon: Calendar,
                  title: "Legal Advisory",
                  description: "Ongoing legal advisory services for businesses and individuals",
                  features: ["Compliance advice", "Risk assessment", "Legal strategy", "Regular consultations"],
                },
                {
                  icon: Globe,
                  title: "Online Mediation",
                  description: "Alternative dispute resolution through online mediation services",
                  features: ["Conflict resolution", "Settlement negotiations", "Arbitration", "Mediation sessions"],
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-white dark:bg-gray-700 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                    <CardContent className="p-8">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <service.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <motion.li
                            key={feature}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Real stories from satisfied clients who found justice through Xegality
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  name: "Anita Desai",
                  role: "Business Owner",
                  rating: 5,
                  review:
                    "Xegality helped me resolve my property dispute in just 3 weeks. The lawyer was professional and the process was seamless.",
                  image: "/placeholder.svg?height=60&width=60&query=indian+business+woman",
                },
                {
                  name: "Rohit Sharma",
                  role: "Software Engineer",
                  rating: 5,
                  review:
                    "Quick response and excellent legal advice for my employment contract. Highly recommend their services!",
                  image: "/placeholder.svg?height=60&width=60&query=indian+software+engineer",
                },
                {
                  name: "Priya Nair",
                  role: "Entrepreneur",
                  rating: 5,
                  review:
                    "The family law expert helped me through a difficult divorce case with compassion and expertise. Thank you Xegality!",
                  image: "/placeholder.svg?height=60&width=60&query=indian+entrepreneur+woman",
                },
              ].map((review, index) => (
                <motion.div key={review.name} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }}>
                  <Card className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 border-0 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{review.review}"</p>
                      <div className="flex items-center">
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <Avatar className="w-12 h-12 mr-4">
                            <AvatarImage src={review.image || "/placeholder.svg"} alt={review.name} />
                            <AvatarFallback>
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{review.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{review.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Lawyer Ratings Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Top Rated Lawyers</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our highest-rated legal professionals across different practice areas
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  category: "Family Law",
                  lawyers: [
                    { name: "Adv. Sunita Rao", rating: 4.9, reviews: 234 },
                    { name: "Adv. Vikram Singh", rating: 4.8, reviews: 189 },
                    { name: "Adv. Kavya Menon", rating: 4.9, reviews: 156 },
                  ],
                },
                {
                  category: "Criminal Law",
                  lawyers: [
                    { name: "Adv. Rajesh Gupta", rating: 4.9, reviews: 298 },
                    { name: "Adv. Neha Sharma", rating: 4.8, reviews: 267 },
                    { name: "Adv. Arjun Patel", rating: 4.7, reviews: 203 },
                  ],
                },
                {
                  category: "Corporate Law",
                  lawyers: [
                    { name: "Adv. Meera Joshi", rating: 4.9, reviews: 178 },
                    { name: "Adv. Amit Kumar", rating: 4.8, reviews: 145 },
                    { name: "Adv. Riya Agarwal", rating: 4.8, reviews: 134 },
                  ],
                },
                {
                  category: "Property Law",
                  lawyers: [
                    { name: "Adv. Deepak Verma", rating: 4.9, reviews: 223 },
                    { name: "Adv. Pooja Reddy", rating: 4.8, reviews: 198 },
                    { name: "Adv. Sanjay Iyer", rating: 4.7, reviews: 167 },
                  ],
                },
              ].map((category, index) => (
                <motion.div key={category.category} variants={itemVariants} whileHover={{ scale: 1.02 }}>
                  <Card className="bg-white dark:bg-gray-700 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{category.category}</h3>
                      <div className="space-y-4">
                        {category.lawyers.map((lawyer, lawyerIndex) => (
                          <motion.div
                            key={lawyer.name}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: lawyerIndex * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ x: 5 }}
                          >
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{lawyer.name}</h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                                    {lawyer.rating}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  ({lawyer.reviews} reviews)
                                </span>
                              </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              >
                                Contact
                              </Button>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Get legal help in three simple steps
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  step: "01",
                  title: "Describe Your Issue",
                  description: "Tell us about your legal problem using our quick search or detailed form",
                  icon: FileText,
                },
                {
                  step: "02",
                  title: "Get Matched",
                  description: "Our AI matches you with the most suitable lawyer based on your needs",
                  icon: Users,
                },
                {
                  step: "03",
                  title: "Start Consultation",
                  description: "Connect instantly via chat, voice, or video call and get expert legal advice",
                  icon: MessageCircle,
                },
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  className="text-center relative"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  {index < 2 && (
                    <motion.div
                      className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 z-0"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: index * 0.3 }}
                      viewport={{ once: true }}
                    />
                  )}
                  <motion.div
                    className="relative z-10 w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{step.step}</span>
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Legal Help?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of satisfied clients who found justice through Xegality
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4"
                  >
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  )
}
