"use client";

import type React from "react";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      //   setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        serviceType: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Legal District", "New York, NY 10001", "United States"],
      color: "text-blue-600",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+1 (555) 123-4567",
        "+1 (555) 987-6543",
        "Emergency: +1 (555) 911-0000",
      ],
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@xegality.com",
        "support@xegality.com",
        "legal@xegality.com",
      ],
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9AM - 6PM", "Sat: 10AM - 4PM", "Sun: Closed"],
      color: "text-orange-600",
    },
  ];

  const serviceTypes = [
    "Corporate Law",
    "Intellectual Property",
    "Litigation Support",
    "Contract Review",
    "Regulatory Compliance",
    "Legal Consultation",
    "Other",
  ];

  return (
    <div className="min-h-screen">
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Contact{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Xegality AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ready to transform your legal practice with AI? We're here to
              help.
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Info Section */}
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Card className="bg-white border-0 hover:scale-105 hover:shadow-lg shadow-none transition-all duration-200">
                    <CardContent className="flex gap-4">
                      <div className={`mt-0.5 rounded-full ${info.color}`}>
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {info.title}
                        </h3>
                        <ol>
                          {info.details.map((d, i) => (
                            <li
                              key={i}
                              className="text-gray-600 dark:text-gray-300 text-sm"
                            >
                              {d}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule a Consultation
                  </h3>
                  <p className="text-blue-100 mb-4 text-sm">
                    Book a free 30-minute consultation.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Book Now
                  </Button>
                </CardContent>
              </Card> */}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="shadow-none hover:shadow-xl border-0 hover:scale-102 transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          We'll get back to you soon.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          <div>
                            <Label htmlFor="serviceType">Service Type</Label>
                            <select
                              id="serviceType"
                              name="serviceType"
                              value={formData.serviceType}
                              onChange={handleInputChange}
                              className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring"
                            >
                              <option value="">Select a service</option>
                              {serviceTypes.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            placeholder="How can we help you?"
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Describe your legal needs..."
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Sending...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Send className="w-4 h-4" />
                              Send Message
                            </div>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20"
          >
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 bg-blue-100 dark:bg-blue-900 flex items-center justify-center rounded-2xl">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Visit Our Office
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Legal District, NY
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
