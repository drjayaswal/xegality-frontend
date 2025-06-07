"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Book,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  Clock,
  Send,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  X,
  LifeBuoy,
  Users,
  Zap,
  Shield,
  Star,
  MessageCircle,
  FileText,
  Settings,
} from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  category: string;
  popularity: number;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  popularity: number;
  isNew?: boolean;
}

export default function HelpSupport() {
  const [activeTab, setActiveTab] = useState<"faq" | "articles" | "contact">(
    "contact"
  );
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqs: FAQ[] = [
    {
      question: "How do I create a new client profile?",
      answer:
        "To create a new client profile, navigate to the Clients tab in the sidebar, then click the 'Add Client' button in the top right corner. Fill out the required information including contact details, case information, and any relevant notes. Click 'Save' to create the new client profile. You can also import client data from CSV files for bulk uploads.",
      category: "Client Management",
      popularity: 95,
    },
    {
      question: "How do I schedule an appointment?",
      answer:
        "To schedule an appointment, go to the Calendar tab, click 'New Appointment', select a client from the dropdown, choose your preferred date and time, and select the appointment type (consultation, meeting, court appearance, etc.). You can also add notes, attach documents, and set reminders. The system will automatically send confirmation emails to both you and your client.",
      category: "Scheduling",
      popularity: 88,
    },
    {
      question: "How do I generate and send invoices?",
      answer:
        "Navigate to the Billing section, click 'New Invoice', select the client, add line items for services rendered with hourly rates or flat fees, set the due date, and apply any applicable taxes or discounts. You can preview the invoice before sending it directly to the client via email, or download it as a PDF for manual distribution.",
      category: "Billing & Payments",
      popularity: 92,
    },
    {
      question: "How do I upload and organize case documents?",
      answer:
        "Open the case file from Case Management, navigate to the Documents section, and click 'Upload Document'. You can drag and drop multiple files or browse to select them. Organize documents using folders, tags, and categories. The system supports OCR for searchable PDFs and automatic document classification.",
      category: "Document Management",
      popularity: 85,
    },
    {
      question: "How do I change my subscription plan?",
      answer:
        "Go to Account Settings > Subscription, review available plans and their features, click 'Upgrade' or 'Change Plan' under your desired option. You can preview the cost difference and effective date before confirming. Downgrades take effect at the next billing cycle, while upgrades are immediate.",
      category: "Account & Billing",
      popularity: 72,
    },
    {
      question: "How do I enable two-factor authentication?",
      answer:
        "Navigate to Account Settings > Security, find the Two-Factor Authentication section, and click 'Enable 2FA'. Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.), enter the verification code, and save your backup codes in a secure location. 2FA will be required for all future logins.",
      category: "Security",
      popularity: 68,
    },
    {
      question: "How do I set up automated reminders?",
      answer:
        "Go to Settings > Notifications, configure reminder preferences for appointments, deadlines, and follow-ups. You can set multiple reminders (email, SMS, in-app) at different intervals. Customize reminder templates and choose which events trigger notifications for you and your clients.",
      category: "Automation",
      popularity: 78,
    },
    {
      question: "How do I generate reports and analytics?",
      answer:
        "Access the Reports section from the main dashboard, select from pre-built report templates (financial, case progress, time tracking, client activity), customize date ranges and filters, then generate or schedule automated reports. Export options include PDF, Excel, and CSV formats.",
      category: "Reporting",
      popularity: 65,
    },
  ];

  const articles: Article[] = [
    {
      id: "art-1",
      title: "Getting Started with Xegality: Complete Setup Guide",
      excerpt:
        "A comprehensive walkthrough of account setup, initial configuration, and essential features to get your practice running smoothly.",
      category: "Getting Started",
      readTime: "8 min read",
      popularity: 95,
      isNew: true,
    },
    {
      id: "art-2",
      title: "Advanced Client Management Strategies",
      excerpt:
        "Learn professional techniques for managing client relationships, communications, and maintaining detailed case histories.",
      category: "Client Management",
      readTime: "12 min read",
      popularity: 88,
    },
    {
      id: "art-3",
      title: "Mastering Case Management Workflows",
      excerpt:
        "Discover advanced features for managing complex legal cases, tracking deadlines, and optimizing your workflow efficiency.",
      category: "Case Management",
      readTime: "15 min read",
      popularity: 82,
    },
    {
      id: "art-4",
      title: "Billing Best Practices and Automation",
      excerpt:
        "Comprehensive guide to streamlining your billing process, improving collection rates, and setting up automated invoicing.",
      category: "Billing & Payments",
      readTime: "10 min read",
      popularity: 90,
    },
    {
      id: "art-5",
      title: "Document Security and Compliance",
      excerpt:
        "Essential security measures, compliance requirements, and best practices for protecting sensitive legal documents.",
      category: "Security",
      readTime: "7 min read",
      popularity: 75,
    },
    {
      id: "art-6",
      title: "Time Tracking and Productivity Tips",
      excerpt:
        "Maximize billable hours with effective time tracking strategies and productivity optimization techniques.",
      category: "Productivity",
      readTime: "6 min read",
      popularity: 78,
      isNew: true,
    },
    {
      id: "art-7",
      title: "Integration Guide: Third-Party Tools",
      excerpt:
        "Connect Xegality with popular legal tools, accounting software, and communication platforms for seamless workflows.",
      category: "Integrations",
      readTime: "9 min read",
      popularity: 70,
    },
    {
      id: "art-8",
      title: "Mobile App Features and Usage",
      excerpt:
        "Complete guide to using Xegality on mobile devices, offline capabilities, and mobile-specific features.",
      category: "Mobile",
      readTime: "5 min read",
      popularity: 65,
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const toggleFAQ = (question: string) => {
    setExpandedFAQ(expandedFAQ === question ? null : question);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Client Management":
        return <Users className="h-4 w-4" />;
      case "Scheduling":
        return <Clock className="h-4 w-4" />;
      case "Billing & Payments":
        return <FileText className="h-4 w-4" />;
      case "Document Management":
        return <Book className="h-4 w-4" />;
      case "Security":
        return <Shield className="h-4 w-4" />;
      case "Account & Billing":
        return <Settings className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Client Management":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300";
      case "Scheduling":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300";
      case "Billing & Payments":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300";
      case "Document Management":
        return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300";
      case "Security":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300";
      case "Account & Billing":
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300";
    }
  };

  // Get popular FAQs and articles
  const popularFAQs = faqs
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);
  const popularArticles = articles
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  return (
    <div className="flex flex-col h-full relative border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-white dark:bg-slate-900 overflow-hidden max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-slate-950 to-amber-900">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-amber-600/20 to-amber-600/20"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
              <LifeBuoy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Help & Support
              </h1>
              <p className="text-amber-100 text-sm font-medium">
                Get help, find answers, and contact our support team
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          {[
            { id: "faq", label: "FAQs", icon: HelpCircle },
            { id: "articles", label: "Articles", icon: Book },
            { id: "contact", label: "Contact Support", icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "faq" | "articles" | "contact")
                }
                className={cn(
                  "flex-1 py-2 px-3 text-center font-medium cursor-pointer transition-all duration-200 rounded-md relative text-sm",
                  activeTab === tab.id
                    ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-semibold">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="px-4 sm:px-6 lg:px-8 pb-6 min-h-full">
            <AnimatePresence mode="wait">
              {activeTab === "faq" && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="pt-5">
                    <div className="space-y-3">
                      {faqs.map((faq, index) => (
                        <motion.div
                          key={faq.question}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                        >
                          <div
                            className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            onClick={() => toggleFAQ(faq.question)}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <div className="p-1.5 bg-gradient-to-br from-amber-700 via-cyan-750 to-amber-700 text-white dark:bg-amber-900/30 rounded-4xl">
                                {getCategoryIcon(faq.category)}
                              </div>
                              <div className="mt-1 flex-1 flex justify-between">
                                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                                  {faq.question}
                                </h3>
                                <div className="flex items-center gap-2"></div>
                                <div className="ml-4">
                                  {expandedFAQ === faq.question ? (
                                    <ChevronDown className="h-4 w-4 text-slate-400" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedFAQ === faq.question && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-0 border-t border-slate-200 dark:border-slate-700">
                                  <div className="pt-4">
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "articles" && (
                <motion.div
                  key="articles"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="pt-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {articles.map((article, index) => (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white flex flex-col justify-between dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-200"
                        >
                          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Clock className="h-3 w-3" />
                              <span>{article.readTime}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-500" />
                                <span>{article.popularity}%</span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="h-6 py-4 bg-transparent text-amber-600 hover:text-amber-700 shadow-none hover:bg-amber-800/20"
                            >
                              Read <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "contact" && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
                    {/* Contact Form */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                      <h3 className="text-base font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-amber-600" />
                        Send us a message
                      </h3>

                      <form
                        onSubmit={handleContactSubmit}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                            >
                              Your Name
                            </label>
                            <Input
                              id="name"
                              value={contactForm.name}
                              onChange={(e) =>
                                setContactForm({
                                  ...contactForm,
                                  name: e.target.value,
                                })
                              }
                              required
                              className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus-visible:ring-0 focus-visible:border-amber-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                            >
                              Email Address
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={contactForm.email}
                              onChange={(e) =>
                                setContactForm({
                                  ...contactForm,
                                  email: e.target.value,
                                })
                              }
                              required
                              className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus-visible:ring-0 focus-visible:border-amber-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                          >
                            Subject
                          </label>
                          <Input
                            id="subject"
                            value={contactForm.subject}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                subject: e.target.value,
                              })
                            }
                            required
                            className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus-visible:ring-0 focus-visible:border-amber-500"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                          >
                            Message
                          </label>
                          <Textarea
                            id="message"
                            value={contactForm.message}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                message: e.target.value,
                              })
                            }
                            required
                            rows={4}
                            className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus-visible:ring-0 focus-visible:border-amber-500"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                        <h3 className="text-base font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-600" />
                          Email Support
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Get help via email. We typically respond within 24
                          hours.
                        </p>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          support@xegality.com
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                        <h3 className="text-base font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          Phone Support
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Speak with our support team directly.
                        </p>
                        <div className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                          +1 (555) 123-4567
                        </div>
                        <div className="text-xs text-slate-500">
                          Mon-Fri: 9:00 AM - 6:00 PM EST
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                        <h3 className="text-base font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-600" />
                          Response Times
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">
                              Email:
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white">
                              Within 24 hours
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">
                              Phone:
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white">
                              Immediate
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">
                              Live Chat:
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white">
                              Within 5 minutes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-green-200 dark:border-green-800 p-4 flex items-center gap-3 z-50 max-w-sm"
          >
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                Message Sent!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                We'll get back to you soon
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuccessMessage(false)}
              className="h-6 w-6 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
