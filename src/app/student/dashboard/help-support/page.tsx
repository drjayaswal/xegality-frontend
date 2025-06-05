"use client";

import type React from "react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
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
} from "lucide-react";
import SiriWave from "@/components/ui/ai";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"faq" | "articles" | "contact">(
    "articles"
  );
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
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
        "To create a new client profile, navigate to the Clients tab in the sidebar, then click the 'Add Client' button in the top right corner. Fill out the required information in the form and click 'Save' to create the new client profile.",
      category: "Clients",
    },
    {
      question: "How do I schedule an appointment?",
      answer:
        "To schedule an appointment, go to the Appointments tab, click 'New Appointment', select a client, date, time, and appointment type. You can also add notes or documents related to the appointment before saving.",
      category: "Appointments",
    },
    {
      question: "How do I generate an invoice?",
      answer:
        "To generate an invoice, navigate to the Billing & Payments tab, click 'New Invoice', select the client, add line items for services rendered, set the due date, and click 'Generate Invoice'. You can then send the invoice directly to the client via email.",
      category: "Billing",
    },
    {
      question: "How do I upload documents to a case?",
      answer:
        "To upload documents to a case, open the case file from the Case Management tab, scroll to the Documents section, and click 'Upload Document'. You can drag and drop files or browse to select them from your computer.",
      category: "Documents",
    },
    {
      question: "How do I change my subscription plan?",
      answer:
        "To change your subscription plan, go to the Subscription tab, review the available plans, and click 'Select Plan' under your desired option. Follow the prompts to confirm your selection and update your billing information if needed.",
      category: "Subscription",
    },
    {
      question: "How do I enable two-factor authentication?",
      answer:
        "To enable two-factor authentication, go to the Security tab under Profile Settings, find the Two-Factor Authentication section, and click 'Enable'. Follow the instructions to set up an authenticator app on your mobile device.",
      category: "Security",
    },
  ];

  const articles: Article[] = [
    {
      id: "art-1",
      title: "Getting Started with Xegality",
      excerpt:
        "A comprehensive guide to setting up your account and navigating the dashboard.",
      category: "Getting Started",
      readTime: "5 min read",
    },
    {
      id: "art-2",
      title: "Best Practices for Client Management",
      excerpt:
        "Learn how to effectively manage client information, communications, and documents.",
      category: "Clients",
      readTime: "8 min read",
    },
    {
      id: "art-3",
      title: "Advanced Case Management Techniques",
      excerpt:
        "Discover advanced features for managing complex legal cases and improving workflow efficiency.",
      category: "Case Management",
      readTime: "12 min read",
    },
    {
      id: "art-4",
      title: "Optimizing Your Billing Process",
      excerpt:
        "Tips and strategies for streamlining your billing workflow and improving collection rates.",
      category: "Billing",
      readTime: "7 min read",
    },
    {
      id: "art-5",
      title: "Security Best Practices",
      excerpt:
        "Essential security measures to protect your firm's and clients' sensitive information.",
      category: "Security",
      readTime: "6 min read",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    return (
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(
      "Your message has been sent. Our support team will get back to you soon."
    );
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

  return (
    <div className=" flex flex-col relative  border-[1.5px] rounded-lg  shadow-none border-b-0">
      <div className="rounded-md">
        {/* <div className="absolute inset-0 -z-1 flex items-center justify-center">
        <div className="w-full h-fit flex items-center justify-center">
          <SiriWave isWaveMode={false} />
        </div>
      </div> */}

        {/* Tab Switcher */}
        <div className="px-10 pt-10 pb-2 flex">
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
                  "flex-1 py-4 text-center font-medium cursor-pointer transition-colors",
                  activeTab === tab.id
                    ? "border-b-2 border-amber-700 text-gray-600 dark:text-gray-300 dark:hover:text-white"
                    : "text-gray-600 dark:text-gray-300 border-b-2hover:text-amber-700"
                )}
              >
                <div className="flex items-center justify-center gap-2 hover:scale-105 duration-100">
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 pt-6">
          <ScrollArea className="h-full">
            {/* Search Bar */}
            <div className="backdrop-blur-sm pb-8">
              <div className="mx-10 relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-amber-700" />
                <Input
                  placeholder="Search for help, articles, FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 bg-white/20 focus-visible:ring-0 focus-visible:border-amber-700 placeholder:text-black/40 dark:placeholder:text-white/40 text-lg border-amber-700/50 rounded-full"
                />
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {activeTab === "faq" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Frequently Asked Questions
                  </h2>

                  {filteredFAQs.length > 0 ? (
                    <div className="space-y-4">
                      {filteredFAQs.map((faq) => (
                        <div
                          key={faq.question}
                          className="bg-white/10 rounded-lg overflow-hidden"
                        >
                          {/* Header Section */}
                          <div
                            className="p-4 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleFAQ(faq.question)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-transparent rounded-full flex items-center justify-center">
                                <HelpCircle className="text-black dark:text-white/40" />
                              </div>
                              <h3 className="text-gray-900 dark:text-white">
                                {faq.question}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2">
                              {expandedFAQ === faq.question ? (
                                <ChevronDown className="text-black dark:text-gray-400" />
                              ) : (
                                <ChevronRight className="text-black dark:text-gray-400" />
                              )}
                            </div>
                          </div>

                          {/* Animated Content Section */}
                          <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${
                              expandedFAQ === faq.question
                                ? "max-h-[1000px] opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                            style={{
                              transitionProperty: "max-height, opacity",
                              willChange: "max-height, opacity",
                            }}
                          >
                            <div className="px-6 pb-4 pt-0">
                              <p className="pt-4 text-amber-700 dark:text-gray-300">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                      <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                        No FAQs found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {searchQuery
                          ? "Try adjusting your search criteria"
                          : "We're working on adding more FAQs"}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "articles" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Help Articles
                  </h2>

                  {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredArticles.map((article) => (
                        <div
                          key={article.id}
                          className="bg-transparent hover:bg-amber-700/20 hover:dark:bg-white/10 backdrop-blur-sm rounded-xl border border-transparent p-6 hover:shadow-lg hover:shadow-amber-700 transition-all"
                        >
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {article.excerpt}
                          </p>

                          <Button className="dark:text-white text-black hover:text-white border-black hover:border-white dark:border-white bg-transparent hover:bg-amber-700 gap-2 shadow-none">
                            Read Article <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                      <Book className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                        No articles found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {searchQuery
                          ? "Try adjusting your search criteria"
                          : "We're working on adding more articles"}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "contact" && (
                <div className="space-y-8">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Contact Support
                  </h2>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                    <h3 className="text-lg font-medium text-black dark:text-white mb-4">
                      Send us a message
                    </h3>

                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-black dark:text-white mb-1"
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
                            className="bg-white/30 focus:ring-0 focus-visible:border-amber-700 border-amber-700/20 focus-visible:ring-0"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-black dark:text-white mb-1"
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
                            className="bg-white/30 focus:ring-0 focus-visible:border-amber-700 border-amber-700/20 focus-visible:ring-0"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-black dark:text-white mb-1"
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
                          className="bg-white/30 focus:ring-0 focus-visible:border-amber-700 border-amber-700/20 focus-visible:ring-0"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-black dark:text-white mb-1"
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
                          className="bg-white/30 focus:ring-0 focus-visible:border-amber-700 border-amber-700/20 focus-visible:ring-0"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="bg-amber-700 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-lg"
                        >
                          <Send className="h-4 w-4 mr-2" /> Send Message
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
