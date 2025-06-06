"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  BookmarkPlus,
  Clock,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  X,
  BookMarked,
  History,
  Filter,
  Download,
  Share2,
  Scale,
  Gavel,
  FileText,
  ExternalLink,
  TrendingUp,
  Zap,
  Star,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Enhanced mock penal code data with categories and severity
const mockPenalCodes = {
  "187": {
    title: "Murder",
    description:
      "The unlawful killing of a human being, or a fetus, with malice aforethought.",
    punishment:
      "15 years to life imprisonment, depending on circumstances and degree.",
    elements: [
      "Unlawful killing of a human being or fetus",
      "With malice aforethought",
      "Without lawful excuse or justification",
    ],
    relatedCodes: ["188", "189", "190"],
    caseReferences: [
      "People v. Anderson (1968) 70 Cal.2d 15",
      "People v. Blakeley (2000) 23 Cal.4th 82",
    ],
    lastUpdated: "2023-01-15",
    category: "Violent Crimes",
    severity: "Felony",
    maxSentence: "Life",
    popularity: 95,
  },
  "211": {
    title: "Robbery",
    description:
      "The felonious taking of personal property in the possession of another, from his person or immediate presence, and against his will, accomplished by means of force or fear.",
    punishment:
      "2, 3, or 5 years in state prison; 3, 6, or 9 years if in an inhabited dwelling.",
    elements: [
      "Taking of personal property",
      "In possession of another person",
      "From their person or immediate presence",
      "Against their will",
      "By force or fear",
      "With intent to permanently deprive",
    ],
    relatedCodes: ["212", "213", "215"],
    caseReferences: [
      "People v. Gomez (2008) 43 Cal.4th 249",
      "People v. Estes (1983) 147 Cal.App.3d 23",
    ],
    lastUpdated: "2022-11-03",
    category: "Property Crimes",
    severity: "Felony",
    maxSentence: "9 years",
    popularity: 88,
  },
  "459": {
    title: "Burglary",
    description:
      "Entry into a building or structure with intent to commit theft or any felony.",
    punishment:
      "First-degree (residential): 2, 4, or 6 years. Second-degree (commercial): 16 months, 2 or 3 years.",
    elements: [
      "Entry into a building, structure, or locked vehicle",
      "With intent to commit theft or any felony",
    ],
    relatedCodes: ["460", "461", "464"],
    caseReferences: [
      "People v. Davis (1998) 18 Cal.4th 712",
      "People v. Garcia (2004) 121 Cal.App.4th 271",
    ],
    lastUpdated: "2023-03-22",
    category: "Property Crimes",
    severity: "Felony",
    maxSentence: "6 years",
    popularity: 82,
  },
  "470": {
    title: "Forgery",
    description:
      "Falsely making, altering, forging, or counterfeiting certain documents with intent to defraud.",
    punishment:
      "Wobbler: up to 1 year in county jail or 16 months, 2 or 3 years in state prison.",
    elements: [
      "Falsely making, altering, forging, or counterfeiting a document",
      "With intent to defraud",
      "Document is of a type specified in the statute",
    ],
    relatedCodes: ["471", "472", "473"],
    caseReferences: [
      "People v. Gaul-Alexander (1995) 32 Cal.App.4th 735",
      "People v. Neder (1971) 16 Cal.App.3d 846",
    ],
    lastUpdated: "2022-08-17",
    category: "White Collar",
    severity: "Wobbler",
    maxSentence: "3 years",
    popularity: 65,
  },
  "240": {
    title: "Assault",
    description:
      "An unlawful attempt, coupled with a present ability, to commit a violent injury on the person of another.",
    punishment:
      "Misdemeanor: up to 6 months in county jail and/or fine up to $1,000.",
    elements: [
      "An unlawful attempt",
      "Present ability",
      "To commit violent injury on another person",
    ],
    relatedCodes: ["241", "242", "245"],
    caseReferences: [
      "People v. Williams (2001) 26 Cal.4th 779",
      "People v. Chance (2008) 44 Cal.4th 1164",
    ],
    lastUpdated: "2023-02-08",
    category: "Violent Crimes",
    severity: "Misdemeanor",
    maxSentence: "6 months",
    popularity: 78,
  },
  "242": {
    title: "Battery",
    description:
      "Any willful and unlawful use of force or violence upon the person of another.",
    punishment:
      "Misdemeanor: up to 6 months in county jail and/or fine up to $2,000.",
    elements: [
      "Willful and unlawful use of force or violence",
      "Upon another person",
    ],
    relatedCodes: ["240", "243", "245"],
    caseReferences: [
      "People v. Colantuono (1994) 7 Cal.4th 206",
      "People v. Shockley (2013) 58 Cal.4th 400",
    ],
    lastUpdated: "2023-01-30",
    category: "Violent Crimes",
    severity: "Misdemeanor",
    maxSentence: "6 months",
    popularity: 85,
  },
  "245": {
    title: "Assault with a Deadly Weapon",
    description:
      "An assault upon another person with a deadly weapon or instrument or by means of force likely to produce great bodily injury.",
    punishment:
      "Wobbler: up to 1 year in county jail or 2, 3, or 4 years in state prison.",
    elements: [
      "Assault (attempt to use force with present ability)",
      "With a deadly weapon or instrument",
      "Or by means of force likely to produce great bodily injury",
    ],
    relatedCodes: ["240", "242", "243"],
    caseReferences: [
      "People v. Aguilar (1997) 16 Cal.4th 1023",
      "People v. Brown (2012) 210 Cal.App.4th 1",
    ],
    lastUpdated: "2022-12-15",
    category: "Violent Crimes",
    severity: "Wobbler",
    maxSentence: "4 years",
    popularity: 90,
  },
  "288": {
    title: "Lewd Acts with a Minor",
    description:
      "Committing a lewd or lascivious act with a child under the age of 14 years with the intent of arousing, appealing to, or gratifying the lust, passions, or sexual desires of the perpetrator or the child.",
    punishment: "3, 6, or 8 years in state prison.",
    elements: [
      "Lewd or lascivious act",
      "With a child under 14 years of age",
      "With intent to arouse, appeal to, or gratify sexual desires",
    ],
    relatedCodes: ["288a", "289", "261.5"],
    caseReferences: [
      "People v. Martinez (1995) 11 Cal.4th 434",
      "People v. Lopez (2010) 185 Cal.App.4th 1220",
    ],
    lastUpdated: "2023-04-05",
    category: "Sex Crimes",
    severity: "Felony",
    maxSentence: "8 years",
    popularity: 72,
  },
  "314": {
    title: "Indecent Exposure",
    description:
      "Willfully and lewdly exposing private parts in a public place or in a place where there are present other persons to be offended or annoyed.",
    punishment:
      "Misdemeanor: up to 6 months in county jail and/or fine. Second offense is a felony.",
    elements: [
      "Willful exposure of private parts",
      "In a public place or where others are present",
      "With lewd intent",
    ],
    relatedCodes: ["288", "290", "415"],
    caseReferences: [
      "In re Smith (1972) 7 Cal.3d 362",
      "People v. Archer (2002) 98 Cal.App.4th 402",
    ],
    lastUpdated: "2022-10-19",
    category: "Sex Crimes",
    severity: "Misdemeanor",
    maxSentence: "6 months",
    popularity: 45,
  },
  "422": {
    title: "Criminal Threats",
    description:
      "Willfully threatening to commit a crime which will result in death or great bodily injury to another person, with the specific intent that the statement is to be taken as a threat.",
    punishment:
      "Wobbler: up to 1 year in county jail or up to 3 years in state prison.",
    elements: [
      "Willful threat to commit a crime resulting in death or great bodily injury",
      "Specific intent that statement be taken as a threat",
      "Threat caused reasonable fear in the victim",
    ],
    relatedCodes: ["136.1", "646.9", "518"],
    caseReferences: [
      "People v. Toledo (2001) 26 Cal.4th 221",
      "People v. Bolin (1998) 18 Cal.4th 297",
    ],
    lastUpdated: "2023-02-28",
    category: "Violent Crimes",
    severity: "Wobbler",
    maxSentence: "3 years",
    popularity: 68,
  },
};

interface SearchHistoryItem {
  code: string;
  timestamp: Date;
}

interface BookmarkedCode {
  code: string;
  notes?: string;
  dateBookmarked: Date;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Felony":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    case "Misdemeanor":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "Wobbler":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Violent Crimes":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800";
    case "Property Crimes":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-800";
    case "White Collar":
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800";
    case "Sex Crimes":
      return "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/10 dark:text-pink-400 dark:border-pink-800";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/10 dark:text-gray-400 dark:border-gray-800";
  }
};

export default function PenalCodeSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [bookmarkedCodes, setBookmarkedCodes] = useState<BookmarkedCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "search" | "bookmarks" | "history"
  >("search");
  const [showBookmarkSuccess, setShowBookmarkSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get popular codes for trending section
  const popularCodes = Object.entries(mockPenalCodes)
    .sort(([, a], [, b]) => b.popularity - a.popularity)
    .slice(0, 5);

  // Get unique categories
  const categories = Array.from(
    new Set(Object.values(mockPenalCodes).map((code) => code.category))
  );

  // Handle search input changes
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        const results = Object.keys(mockPenalCodes).filter((code) => {
          const penalCode = mockPenalCodes[code as keyof typeof mockPenalCodes];
          const matchesQuery =
            code.includes(searchQuery) ||
            penalCode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            penalCode.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            penalCode.category
              .toLowerCase()
              .includes(searchQuery.toLowerCase());

          const matchesCategory =
            !selectedCategory || penalCode.category === selectedCategory;

          return matchesQuery && matchesCategory;
        });
        setSearchResults(results);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedCategory]);

  // Handle code selection
  const handleSelectCode = (code: string) => {
    setSelectedCode(code);

    const newHistoryItem: SearchHistoryItem = {
      code,
      timestamp: new Date(),
    };

    setSearchHistory((prev) => {
      const filteredHistory = prev.filter((item) => item.code !== code);
      return [newHistoryItem, ...filteredHistory].slice(0, 20);
    });
  };

  // Handle bookmark toggle
  const handleToggleBookmark = (code: string) => {
    const isBookmarked = bookmarkedCodes.some((item) => item.code === code);

    if (isBookmarked) {
      setBookmarkedCodes((prev) => prev.filter((item) => item.code !== code));
    } else {
      const newBookmark: BookmarkedCode = {
        code,
        dateBookmarked: new Date(),
      };
      setBookmarkedCodes((prev) => [...prev, newBookmark]);

      setShowBookmarkSuccess(true);
      setTimeout(() => setShowBookmarkSuccess(false), 2000);
    }
  };

  const isCodeBookmarked = (code: string) => {
    return bookmarkedCodes.some((item) => item.code === code);
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col relative border-[1.5px] rounded-lg shadow-none border-b-0 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <div className="rounded-md h-full">
        {/* Modern Header with Gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 opacity-90"></div>
          <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)]'></div>
          <div className="relative px-10 pt-10 pb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Scale className="h-8 w-8 text-white" />
                  </div>
                  Penal Code Search
                </h1>
                <p className="text-blue-100 text-lg">
                  Comprehensive legal research tool for California Penal Codes
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {Object.keys(mockPenalCodes).length}
                  </div>
                  <div className="text-blue-200 text-sm">Total Codes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {categories.length}
                  </div>
                  <div className="text-blue-200 text-sm">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="px-10 -mt-6 relative z-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-white/20 p-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <Input
                ref={searchInputRef}
                placeholder="Search by code number, title, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-gray-50 dark:bg-gray-800 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Categories:
              </span>
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-10 pt-8 pb-2 flex">
          {[
            { id: "search", label: "Search Results", icon: Search },
            { id: "bookmarks", label: "Bookmarks", icon: BookMarked },
            { id: "history", label: "History", icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "search" | "bookmarks" | "history")
                }
                className={cn(
                  "flex-1 py-4 text-center font-medium cursor-pointer transition-all duration-200 relative",
                  activeTab === tab.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
                )}
              >
                <div className="flex items-center justify-center gap-2 hover:scale-105 duration-200">
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          <ScrollArea className="h-full">
            <div className="px-10 pb-10">
              {activeTab === "search" && (
                <div className="space-y-6">
                  {selectedCode ? (
                    // Detailed View
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Back Button and Header */}
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCode(null)}
                          className="rounded-full p-2"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                              Section {selectedCode}
                            </h2>
                            <Badge
                              className={getSeverityColor(
                                mockPenalCodes[
                                  selectedCode as keyof typeof mockPenalCodes
                                ].severity
                              )}
                            >
                              {
                                mockPenalCodes[
                                  selectedCode as keyof typeof mockPenalCodes
                                ].severity
                              }
                            </Badge>
                          </div>
                          <h3 className="text-xl text-gray-700 dark:text-gray-300 mb-3">
                            {
                              mockPenalCodes[
                                selectedCode as keyof typeof mockPenalCodes
                              ].title
                            }
                          </h3>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outline"
                              className={getCategoryColor(
                                mockPenalCodes[
                                  selectedCode as keyof typeof mockPenalCodes
                                ].category
                              )}
                            >
                              {
                                mockPenalCodes[
                                  selectedCode as keyof typeof mockPenalCodes
                                ].category
                              }
                            </Badge>
                            <span className="text-sm text-gray-500">
                              Updated{" "}
                              {
                                mockPenalCodes[
                                  selectedCode as keyof typeof mockPenalCodes
                                ].lastUpdated
                              }
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-gray-600">
                                {
                                  mockPenalCodes[
                                    selectedCode as keyof typeof mockPenalCodes
                                  ].popularity
                                }
                                % relevance
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleBookmark(selectedCode)}
                            className={cn(
                              "rounded-full p-2",
                              isCodeBookmarked(selectedCode)
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-500"
                            )}
                          >
                            {isCodeBookmarked(selectedCode) ? (
                              <BookMarked className="h-5 w-5" />
                            ) : (
                              <BookmarkPlus className="h-5 w-5" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full p-2 text-gray-500"
                          >
                            <Share2 className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full p-2 text-gray-500"
                          >
                            <Download className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Description */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Scale className="h-5 w-5 text-blue-600" />
                            Legal Definition
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {
                              mockPenalCodes[
                                selectedCode as keyof typeof mockPenalCodes
                              ].description
                            }
                          </p>
                        </div>

                        {/* Punishment */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Gavel className="h-5 w-5 text-red-600" />
                            Penalties
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {
                              mockPenalCodes[
                                selectedCode as keyof typeof mockPenalCodes
                              ].punishment
                            }
                          </p>
                          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="text-sm font-medium text-red-800 dark:text-red-400">
                              Maximum Sentence:{" "}
                              {
                                mockPenalCodes[
                                  selectedCode as keyof typeof mockPenalCodes
                                ].maxSentence
                              }
                            </div>
                          </div>
                        </div>

                        {/* Elements */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-green-600" />
                            Required Elements
                          </h4>
                          <ul className="space-y-3">
                            {mockPenalCodes[
                              selectedCode as keyof typeof mockPenalCodes
                            ].elements.map((element, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs font-medium text-green-700 dark:text-green-400">
                                    {index + 1}
                                  </span>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {element}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Related Codes */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                            Related Sections
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {mockPenalCodes[
                              selectedCode as keyof typeof mockPenalCodes
                            ].relatedCodes.map((code) => (
                              <Button
                                key={code}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSelectCode(code)}
                                className="rounded-full hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
                              >
                                Section {code}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Case References */}
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <ExternalLink className="h-5 w-5 text-blue-600" />
                          Key Case Law
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mockPenalCodes[
                            selectedCode as keyof typeof mockPenalCodes
                          ].caseReferences.map((caseRef, index) => (
                            <div
                              key={index}
                              className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                            >
                              <div className="flex items-start gap-3">
                                <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-blue-800 dark:text-blue-300 font-medium">
                                    {caseRef}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2 h-6 w-6 p-0"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // Search Results or Landing
                    <div className="space-y-8">
                      {searchQuery ? (
                        // Search Results
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                              Search Results ({searchResults.length})
                            </h2>
                            {searchResults.length > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                              >
                                <Filter className="h-4 w-4" />
                                Filter
                              </Button>
                            )}
                          </div>

                          <AnimatePresence mode="wait">
                            {isLoading ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                  <div
                                    key={i}
                                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm animate-pulse"
                                  >
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                                  </div>
                                ))}
                              </div>
                            ) : searchResults.length > 0 ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                              >
                                {searchResults.map((code) => {
                                  const penalCode =
                                    mockPenalCodes[
                                      code as keyof typeof mockPenalCodes
                                    ];
                                  return (
                                    <motion.div
                                      key={code}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      whileHover={{ y: -4, scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => handleSelectCode(code)}
                                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-all duration-200"
                                    >
                                      <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                                              {code}
                                            </span>
                                          </div>
                                          <Badge
                                            className={getSeverityColor(
                                              penalCode.severity
                                            )}
                                          >
                                            {penalCode.severity}
                                          </Badge>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleBookmark(code);
                                          }}
                                          className="h-8 w-8 p-0 rounded-full"
                                        >
                                          {isCodeBookmarked(code) ? (
                                            <BookMarked className="h-4 w-4 text-blue-600" />
                                          ) : (
                                            <BookmarkPlus className="h-4 w-4 text-gray-400" />
                                          )}
                                        </Button>
                                      </div>

                                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        {penalCode.title}
                                      </h3>
                                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                                        {penalCode.description}
                                      </p>

                                      <div className="flex items-center justify-between">
                                        <Badge
                                          variant="outline"
                                          className={getCategoryColor(
                                            penalCode.category
                                          )}
                                        >
                                          {penalCode.category}
                                        </Badge>
                                        <div className="flex items-center gap-1">
                                          <Star className="h-3 w-3 text-yellow-500" />
                                          <span className="text-xs text-gray-500">
                                            {penalCode.popularity}%
                                          </span>
                                        </div>
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                              >
                                <AlertCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                  No results found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                  We couldn't find any penal codes matching "
                                  {searchQuery}". Try adjusting your search
                                  terms or filters.
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        // Landing Page
                        <div className="space-y-8">
                          {/* Quick Access */}
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                              <Zap className="h-6 w-6 text-yellow-500" />
                              Quick Access
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {["187", "211", "459"].map((code) => {
                                const penalCode =
                                  mockPenalCodes[
                                    code as keyof typeof mockPenalCodes
                                  ];
                                return (
                                  <motion.div
                                    key={code}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelectCode(code)}
                                    className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 cursor-pointer border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-200"
                                  >
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold">
                                          {code}
                                        </span>
                                      </div>
                                      <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                          {penalCode.title}
                                        </h3>
                                        <Badge
                                          className={getSeverityColor(
                                            penalCode.severity
                                          )}
                                        >
                                          {penalCode.severity}
                                        </Badge>
                                      </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                      {penalCode.description}
                                    </p>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Trending */}
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                              <TrendingUp className="h-6 w-6 text-green-500" />
                              Most Searched
                            </h2>
                            <div className="space-y-3">
                              {popularCodes.map(([code, penalCode], index) => (
                                <motion.div
                                  key={code}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{ x: 4 }}
                                  onClick={() => handleSelectCode(code)}
                                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all duration-200"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                      <span className="text-green-600 dark:text-green-400 font-bold text-sm">
                                        #{index + 1}
                                      </span>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                          Section {code}: {penalCode.title}
                                        </h3>
                                        <Badge
                                          className={getSeverityColor(
                                            penalCode.severity
                                          )}
                                        >
                                          {penalCode.severity}
                                        </Badge>
                                      </div>
                                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-1">
                                        {penalCode.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span className="text-sm text-gray-600">
                                          {penalCode.popularity}%
                                        </span>
                                      </div>
                                      <ChevronRight className="h-5 w-5 text-gray-400" />
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "bookmarks" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Bookmarked Codes
                  </h2>

                  {bookmarkedCodes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {bookmarkedCodes.map((bookmark) => {
                        const penalCode =
                          mockPenalCodes[
                            bookmark.code as keyof typeof mockPenalCodes
                          ];
                        return (
                          <motion.div
                            key={bookmark.code}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                                    {bookmark.code}
                                  </span>
                                </div>
                                <Badge
                                  className={getSeverityColor(
                                    penalCode.severity
                                  )}
                                >
                                  {penalCode.severity}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleToggleBookmark(bookmark.code)
                                  }
                                  className="h-8 w-8 p-0 text-blue-600"
                                >
                                  <BookMarked className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedCode(bookmark.code);
                                    setActiveTab("search");
                                  }}
                                  className="h-8 w-8 p-0 text-gray-500"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {penalCode.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                              {penalCode.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <Badge
                                variant="outline"
                                className={getCategoryColor(penalCode.category)}
                              >
                                {penalCode.category}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {bookmark.dateBookmarked.toLocaleDateString()}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <BookmarkPlus className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No bookmarks yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Save important penal codes for quick reference
                      </p>
                      <Button
                        onClick={() => setActiveTab("search")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start Searching
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Search History
                  </h2>

                  {searchHistory.length > 0 ? (
                    <div className="space-y-3">
                      {searchHistory.map((item, index) => {
                        const penalCode =
                          mockPenalCodes[
                            item.code as keyof typeof mockPenalCodes
                          ];
                        return (
                          <motion.div
                            key={`${item.code}-${index}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                                <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  Section {item.code}: {penalCode?.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.timestamp.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedCode(item.code);
                                setActiveTab("search");
                              }}
                              className="h-8 w-8 p-0 text-gray-500"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <History className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No search history
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Your recent searches will appear here
                      </p>
                      <Button
                        onClick={() => setActiveTab("search")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start Searching
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showBookmarkSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-green-200 dark:border-green-800 p-4 flex items-center gap-3 z-50"
          >
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Bookmark Added!
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Code saved to your collection
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBookmarkSuccess(false)}
              className="h-8 w-8 p-0 ml-2 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
