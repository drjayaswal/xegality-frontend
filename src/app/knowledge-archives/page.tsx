"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BookOpen,
  Scale,
  Shield,
  Gavel,
  FileText,
  Users,
  AlertCircle,
  Download,
  ExternalLink,
  Clock,
  Star,
  ChevronRight,
  Library,
  Eye,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

export default function KnowledgeArchivesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", icon: Library, count: 156 },
    { id: "penal-code", name: "Penal Code", icon: Shield, count: 45 },
    { id: "civil-rights", name: "Civil Rights", icon: Users, count: 32 },
    {
      id: "court-procedures",
      name: "Court Procedures",
      icon: Gavel,
      count: 28,
    },
    {
      id: "constitutional-law",
      name: "Constitutional Law",
      icon: Scale,
      count: 25,
    },
    { id: "criminal-law", name: "Criminal Law", icon: AlertCircle, count: 26 },
  ];

  const knowledgeArticles = [
    {
      id: 1,
      title: "Understanding Miranda Rights: A Comprehensive Guide",
      category: "civil-rights",
      difficulty: "Beginner",
      readTime: "8 min",
      views: 2847,
      rating: 4.8,
      summary:
        "Complete overview of Miranda rights, when they apply, and what happens if they're violated.",
      tags: ["Miranda Rights", "Criminal Defense", "Police Procedures"],
      lastUpdated: "2024-01-15",
      author: "Sarah Mitchell, JD",
    },
    {
      id: 2,
      title: "Penal Code Section 187: Murder in the First Degree",
      category: "penal-code",
      difficulty: "Intermediate",
      readTime: "12 min",
      views: 1923,
      rating: 4.9,
      summary:
        "Detailed analysis of murder charges, degrees, and potential defenses under current penal code.",
      tags: ["Murder", "Homicide", "Criminal Defense", "Sentencing"],
      lastUpdated: "2024-01-10",
      author: "Michael Chen, JD",
    },
    {
      id: 3,
      title: "Filing a Motion to Dismiss: Step-by-Step Process",
      category: "court-procedures",
      difficulty: "Intermediate",
      readTime: "15 min",
      views: 3156,
      rating: 4.7,
      summary:
        "Complete guide to filing motions to dismiss, including grounds, timing, and procedural requirements.",
      tags: ["Motion to Dismiss", "Court Filing", "Civil Procedure"],
      lastUpdated: "2024-01-08",
      author: "Emily Rodriguez, JD",
    },
    {
      id: 4,
      title: "Fourth Amendment: Search and Seizure Protections",
      category: "constitutional-law",
      difficulty: "Beginner",
      readTime: "10 min",
      views: 4231,
      rating: 4.9,
      summary:
        "Understanding your constitutional rights against unreasonable searches and seizures.",
      tags: ["Fourth Amendment", "Search Warrant", "Privacy Rights"],
      lastUpdated: "2024-01-12",
      author: "David Thompson, JD",
    },
    {
      id: 5,
      title: "Bail and Pretrial Release: Rights and Procedures",
      category: "criminal-law",
      difficulty: "Beginner",
      readTime: "7 min",
      views: 1876,
      rating: 4.6,
      summary:
        "Everything you need to know about bail, pretrial release, and your rights during detention.",
      tags: ["Bail", "Pretrial Release", "Criminal Defense"],
      lastUpdated: "2024-01-14",
      author: "Sarah Mitchell, JD",
    },
    {
      id: 6,
      title: "Evidence Rules: Admissibility and Objections",
      category: "court-procedures",
      difficulty: "Advanced",
      readTime: "20 min",
      views: 2654,
      rating: 4.8,
      summary:
        "Advanced guide to evidence rules, admissibility standards, and common courtroom objections.",
      tags: ["Evidence", "Trial Procedure", "Objections"],
      lastUpdated: "2024-01-09",
      author: "Michael Chen, JD",
    },
  ];

  const legalResources = [
    {
      title: "Federal Rules of Criminal Procedure",
      description: "Complete text of federal criminal procedure rules",
      type: "PDF",
      size: "2.4 MB",
      downloads: 15420,
    },
    {
      title: "State Penal Code Reference",
      description: "Comprehensive state penal code with recent amendments",
      type: "PDF",
      size: "8.7 MB",
      downloads: 23156,
    },
    {
      title: "Constitutional Rights Handbook",
      description: "Citizen's guide to constitutional rights and protections",
      type: "PDF",
      size: "1.8 MB",
      downloads: 18934,
    },
    {
      title: "Court Forms and Templates",
      description: "Standard court forms and legal document templates",
      type: "ZIP",
      size: "5.2 MB",
      downloads: 12876,
    },
  ];

  const quickGuides = [
    {
      title: "What to Do When Arrested",
      steps: [
        "Remain silent",
        "Ask for a lawyer",
        "Don't resist",
        "Remember details",
      ],
      urgency: "high",
    },
    {
      title: "Preparing for Court",
      steps: [
        "Gather documents",
        "Dress appropriately",
        "Arrive early",
        "Bring representation",
      ],
      urgency: "medium",
    },
    {
      title: "Understanding Your Rights",
      steps: [
        "Know your Miranda rights",
        "Understand search laws",
        "Learn about bail",
        "Know court procedures",
      ],
      urgency: "low",
    },
  ];

  const legalCodes = [
    {
      title: "Penal Code",
      sections: 1200,
      description: "Criminal offenses and penalties",
    },
    {
      title: "Civil Code",
      sections: 850,
      description: "Civil rights and obligations",
    },
    {
      title: "Evidence Code",
      sections: 450,
      description: "Rules of evidence in court",
    },
    {
      title: "Criminal Procedure",
      sections: 320,
      description: "Criminal court procedures",
    },
    {
      title: "Civil Procedure",
      sections: 280,
      description: "Civil court procedures",
    },
    {
      title: "Constitutional Law",
      sections: 150,
      description: "Constitutional provisions and rights",
    },
  ];

  const filteredArticles = knowledgeArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || article.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
              <BookOpen className="w-4 h-4 mr-2" />
              Legal Knowledge Archive
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Legal{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Knowledge Archives
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive legal resources, guides, and educational content to
              help you understand your rights, court procedures, and legal
              codes.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto relative">
              <Search
                className={clsx(
                  "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5",
                  searchQuery != "" ? "text-[#3b82f6]" : "text-blue-200"
                )}
              />
              <Input
                placeholder="Search legal topics, codes, procedures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/30 rounded-full border-2 border-blue-200 focus-visible:ring-0 focus-visible:outline-0 focus-visible:border-blue-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-4 gap-4 mb-8 p-2 shadow-none bg-transparent">
            <TabsTrigger
              value="articles"
              className="flex items-center cursor-pointer justify-center gap-2 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-[#3b82f6]/20 data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="flex items-center cursor-pointer justify-center gap-2 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-[#3b82f6]/20 data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white"
            >
              <Download className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger
              value="quick-guides"
              className="flex items-center cursor-pointer justify-center gap-2 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-[#3b82f6]/20 data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white"
            >
              <AlertCircle className="h-4 w-4" />
              Quick Guides
            </TabsTrigger>
            <TabsTrigger
              value="legal-codes"
              className="flex items-center cursor-pointer justify-center gap-2 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-[#3b82f6]/20 data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white"
            >
              <Scale className="h-4 w-4" />
              Legal Codes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="articles" className="space-y-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent py-1.5 px-5 outline-0 border-0 ring-0 rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-transparent py-1.5 px-5 outline-0 border-0 ring-0 rounded-md"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <Badge variant="outline" className="text-sm">
                {filteredArticles.length} articles found
              </Badge>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer group border-transparent">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          className={getDifficultyColor(article.difficulty)}
                        >
                          {article.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {article.rating}
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {article.summary}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {article.views.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          By {article.author}
                        </span>
                        <Link href={`/articles/${article.id}`}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-blue-600/10 hover:text-blue-600"
                          >
                            Read More
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Resources Grid */}
          <TabsContent value="resources" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {legalResources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-shadow border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {resource.description}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={clsx(
                            resource.type === "PDF"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-gray-200 text-gray-800 dark:bg-green-900 dark:text-gray-300"
                          )}
                        >
                          {resource.type}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{resource.size}</span>
                          <span>
                            {resource.downloads.toLocaleString()} downloads
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-emerald-600 text-white hover:bg-emerald-600/10 hover:text-emerald-600"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Quick Guide Grid */}
          <TabsContent value="quick-guides" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickGuides.map((guide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-shadow border-0 cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2">
                        {guide.steps.map((step, stepIndex) => (
                          <li
                            key={stepIndex}
                            className="flex items-center gap-3"
                          >
                            <span className="flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-full text-sm font-medium">
                              {stepIndex + 1}
                            </span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                      <Button
                        variant="outline"
                        className="w-full mt-4 bg-[#3b82f6] border-2  border-transparent text-white hover:bg-transparent hover:text-[#3b82f6] hover:border-[#3b82f6]"
                      >
                        View Full Guide
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Legal Codes Grid */}
          <TabsContent value="legal-codes" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {legalCodes.map((code, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-shadow border-0 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Scale className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {code.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {code.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline">
                          {code.sections} sections
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-blue-600/10 hover:text-blue-600"
                        >
                          Browse
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Section */}
        <section className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need Legal Assistance?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Can't find what you're looking for? Our AI-powered legal assistant
              can help you navigate complex legal questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lawyer/dashboard/xegality-ai">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3">
                  <Sparkles />
                  Ask Xegality AI
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-3">
                  <Scale />
                  Contact a Lawyer
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
