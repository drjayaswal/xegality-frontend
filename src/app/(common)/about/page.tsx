"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  Shield,
  Sparkles,
  Users,
  Award,
  Target,
  Heart,
  Lightbulb,
  ArrowRight,
  Globe,
  Brain,
  Route,
  PartyPopper,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {
  const stats = [
    {
      number: "10,000+",
      label: "Cases Handled",
      icon: Scale,
      color: "text-indigo-600",
    },
    {
      number: "500+",
      label: "Happy Clients",
      icon: Users,
      color: "text-emerald-600",
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: Award,
      color: "text-yellow-500",
    },
    {
      number: "99%",
      label: "Success Rate",
      icon: Target,
      color: "text-red-500",
    },
  ];

  const values = [
    {
      icon: Shield,
      color: "text-blue-600",
      title: "Integrity",
      description:
        "We uphold the highest ethical standards in all our legal practices and AI implementations.",
    },
    {
      icon: Lightbulb,
      color: "text-yellow-500",
      title: "Innovation",
      description:
        "Pioneering the future of legal services through cutting-edge AI technology and solutions.",
    },
    {
      icon: Heart,
      color: "text-red-500",
      title: "Client-Focused",
      description:
        "Your success is our priority. We tailor our AI-enhanced services to meet your unique needs.",
    },
    {
      icon: Globe,
      color: "text-green-600",
      title: "Excellence",
      description:
        "Delivering exceptional results through the perfect blend of human expertise and AI precision.",
    },
  ];
  const team = [
    {
      name: "Sarah Mitchell",
      position: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Harvard Law graduate with 20+ years in corporate law and AI innovation.",
    },
    {
      name: "Dr. Michael Chen",
      position: "Chief Technology Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Former Google AI researcher specializing in legal technology applications.",
    },
    {
      name: "Emily Rodriguez",
      position: "Head of Legal Operations",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Stanford Law alumna with expertise in litigation and regulatory compliance.",
    },
    {
      name: "David Thompson",
      position: "AI Research Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "PhD in Machine Learning with focus on natural language processing for legal documents.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description:
        "Xegality AI was established with a vision to revolutionize legal services through AI.",
    },
    {
      year: "2019",
      title: "First AI Model",
      description:
        "Launched our first AI-powered contract analysis tool, serving 100+ law firms.",
    },
    {
      year: "2021",
      title: "Series A Funding",
      description:
        "Raised $10M to expand our AI capabilities and legal expertise.",
    },
    {
      year: "2023",
      title: "Global Expansion",
      description:
        "Extended services internationally, now serving clients in 25+ countries.",
    },
    {
      year: "2024",
      title: "AI Legal Assistant",
      description:
        "Launched comprehensive AI legal assistant platform with advanced reasoning capabilities.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                <Sparkles className="w-4 h-4 mr-2" />
                About Xegality AI
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Revolutionizing{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Legal Services
                </span>{" "}
                with AI
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We're pioneering the future of legal practice by combining
                decades of legal expertise with cutting-edge artificial
                intelligence to deliver unprecedented efficiency and accuracy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-3">
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-100 rounded-2xl shadow-2xl overflow-hidden group">
                {/* Lower image - static background */}
                <Image
                  src="/imagedown.png"
                  alt="Xegality AI Office"
                  fill
                  className="object-cover opacity-90 absolute invert"
                />

                {/* Upper image - moves on hover */}
                <Image
                  src="/imageup.png"
                  alt="Xegality AI Office"
                  fill
                  className="object-cover absolute transition-all duration-300 ease-in-out group-hover:scale-110"
                />
              </div>{" "}
              <div className="absolute -bottom-10 -right-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <Brain className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      AI-Powered
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Legal Solutions
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Centered Badge */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
              <PartyPopper className="w-4 h-4 mr-2" />
              What we have achieved till now
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Empowering Access to Justice
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Our mission is to democratize access to high-quality legal
              services by harnessing the power of artificial intelligence.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="border-2 border-transparent hover:border-blue-500 transition-all duration-100 hover:scale-105 hover:shadow-2xl">
                  <CardContent className="p-6 text-center">
                    <stat.icon
                      className={`h-8 w-8 mx-auto mb-4 ${stat.color}`}
                    />
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
              <Target className="w-4 h-4 mr-2" />
              What we want to achieve
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              To democratize access to high-quality legal services by harnessing
              the power of artificial intelligence, making legal expertise more
              accessible, efficient, and affordable for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-2 h-full border-transparent hover:border-blue-500 transition-all duration-100 hover:scale-105 hover:shadow-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-transparent dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
            <Route className="w-4 h-4 mr-2" />
            From Ideas to Reality
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            How we evolved from an idea to a full-fledged AI legal platform.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-1 bg-blue-600 dark:bg-blue-800"></div>

          {/* Timeline Items */}
          <div className="space-y-24">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-1/3 transform -translate-x-1/2 w-5 h-5 bg-white rounded-full border-4 border-blue-600 dark:border-gray-900 z-10 animate-spin"></div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block"></div>

                {/* Card */}
                <div className="flex-1 px-4 md:px-10">
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl border-2 border-transparent hover:border-blue-600 transition duration-300 hover:scale-109 p-6">
                    <div className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <button className="mt-6 px-6 py-3 hover:bg-blue-600 bg-blue-600/20 hover:text-white text-blue-600 rounded-full transition">
            Join Our Mission
          </button>
        </div>

        {/* Footer Summary */}
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
              <Users className="w-4 h-4 mr-2" />
              Our Dedicated Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our diverse team of legal experts, AI researchers, and tech
              innovators works together to shape the future of legal services.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center -mt-10">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg bg-blue-50 dark:bg-blue-900">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2 text-sm uppercase tracking-wide">
                    {member.position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Legal Practice?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of legal professionals who trust Xegality AI to
              enhance their practice with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-3 border-0">
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
