"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
    case "Misdemeanor":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800";
    case "Wobbler":
      return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Violent Crimes":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800";
    case "Property Crimes":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-800";
    case "White Collar":
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800";
    case "Sex Crimes":
      return "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/10 dark:text-pink-400 dark:border-pink-800";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/10 dark:text-slate-400 dark:border-slate-800";
  }
};

// SectionCard component for displaying sections in a card layout
interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  iconBg?: string;
  children: React.ReactNode;
}

function SectionCard({
  title,
  icon,
  iconBg = "bg-slate-100",
  children,
}: SectionCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
        <h4 className="text-base font-medium text-slate-900 dark:text-white">
          {title}
        </h4>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function Research() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [bookmarkedCodes, setBookmarkedCodes] = useState<BookmarkedCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"search" | "bookmarks">("search");
  const [showBookmarkSuccess, setShowBookmarkSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get popular codes for trending section
  const popularCodes = Object.entries(mockPenalCodes)
    .sort(([, a], [, b]) => b.popularity - a.popularity)
    .slice(0, 4);

  // Get unique categories
  const categories = Array.from(
    new Set(Object.values(mockPenalCodes).map((code) => code.category))
  );

  // Handle search input changes
  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        const results = Object.keys(mockPenalCodes).filter((code) => {
          const penalCode = mockPenalCodes[code as keyof typeof mockPenalCodes];
          const matchesQuery =
            code.includes(searchTerm) ||
            penalCode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            penalCode.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            penalCode.category.toLowerCase().includes(searchTerm.toLowerCase());

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
  }, [searchTerm, selectedCategory]);

  const handleSearch = () => {
    setSearchTerm(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle code selection
  const handleSelectCode = (code: string) => {
    setSelectedCode(code);

    const newHistoryItem: SearchHistoryItem = {
      code,
      timestamp: new Date(),
    };
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

  return (
    <div className="flex flex-col h-screen relative border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-white dark:bg-slate-900 overflow-hidden max-w-7xl mx-auto">
      {/* Compact Header */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-emerald-900 via-cyan-950 to-emerald-900 transition-all duration-300",
          isSearchFocused ? "blur-md" : "blur-0"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-emerald-600/20"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
              <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Legal Research
              </h1>
              <p className="text-emerald-100 text-sm font-medium">
                Comprehensive Penal Code Database
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Search Section */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <div
          className={cn(
            "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-all duration-300",
            isSearchFocused
              ? "shadow-2xl shadow-emerald-800/30 -translate-y-2"
              : "shadow-lg shadow-emerald-800/20"
          )}
        >
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                placeholder="Search by code number, title, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 pr-20 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border-emerald-700/20 dark:border-slate-700 rounded-lg focus-visible:ring-0 focus-visible:border-emerald-500 border-2 transition-all duration-200"
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchTerm("");
                    }}
                    className="h-6 w-6 p-0 rounded-full hover:text-red-600 text-emerald-600 dark:hover:bg-slate-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSearch}
                    disabled={!searchQuery.trim()}
                    className="h-7 px-2 rounded-md rounded-l-none border-emerald-500 border-l-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Search
                  </Button>
                )}{" "}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "rounded-full border transition-colors duration-200 text-xs px-3 py-1.5 h-auto",
                  selectedCategory === null
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md border-emerald-600"
                    : "border-slate-300 dark:border-slate-600 hover:bg-transparent hover:border-emerald-400 hover:text-emerald-600"
                )}
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
                  className={cn(
                    "rounded-full border transition-colors duration-200 text-xs px-3 py-1.5 h-auto",
                    selectedCategory === category
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md border-emerald-600"
                      : "border-slate-300 dark:border-slate-600 hover:bg-transparent hover:border-emerald-400 hover:text-emerald-600"
                  )}
                >
                  {category.replace(" Crimes", "")}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compact Tab Navigation */}
      <div
        className={cn(
          "px-4 sm:px-6 lg:px-8 pt-6 pb-2 transition-all duration-300",
          isSearchFocused ? "blur-md" : "blur-0"
        )}
      >
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          {[
            { id: "search", label: "Search", icon: Search },
            { id: "bookmarks", label: "Bookmarks", icon: BookMarked },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "search" | "bookmarks")}
                className={cn(
                  "flex-1 py-2 px-3 text-center font-medium cursor-pointer transition-all duration-200 rounded-md relative text-sm",
                  activeTab === tab.id
                    ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-semibold">{tab.label}</span>
                  {tab.id === "bookmarks" && bookmarkedCodes.length > 0 && (
                    <Badge className="ml-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs px-1.5 py-0.5">
                      {bookmarkedCodes.length}
                    </Badge>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex-1 min-h-0 transition-all duration-300",
          isSearchFocused ? "blur-md" : "blur-0"
        )}
      >
        <ScrollArea className="h-full">
          <div className="px-4 sm:px-6 lg:px-8 pb-6 min-h-full">
            {activeTab === "search" && (
              <div className="space-y-6 min-h-full">
                {selectedCode ? (
                  // Detailed View
                  <div className="space-y-6">
                    {/* Back Button and Header */}
                    <div className="space-y-8 mt-3">
                      <div className="flex items-start gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCode(null)}
                          className="rounded-full border-0 hover:bg-emerald-800 hover:text-white text-emerald-800 bg-emerald-700/15"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex-1 space-y-4">
                          {/* Title & Meta */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-2xl font-medium text-slate-900 dark:text-white">
                                  Section {selectedCode}
                                </h2>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs font-semibold",
                                    getSeverityColor(
                                      mockPenalCodes[
                                        selectedCode as keyof typeof mockPenalCodes
                                      ].severity
                                    )
                                  )}
                                >
                                  {
                                    mockPenalCodes[
                                      selectedCode as keyof typeof mockPenalCodes
                                    ].severity
                                  }
                                </Badge>
                              </div>
                              <h3 className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                                {
                                  mockPenalCodes[
                                    selectedCode as keyof typeof mockPenalCodes
                                  ].title
                                }
                              </h3>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Bookmark */}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleToggleBookmark(selectedCode)
                                }
                                className={cn(
                                  "rounded-full p-2 transition-all duration-200",
                                  isCodeBookmarked(selectedCode)
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
                                    : "border-slate-300 dark:border-slate-600 hover:border-emerald-400 hover:text-emerald-600"
                                )}
                              >
                                {isCodeBookmarked(selectedCode) ? (
                                  <BookMarked className="h-4 w-4" />
                                ) : (
                                  <BookmarkPlus className="h-4 w-4" />
                                )}
                              </Button>

                              {/* Share */}
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full p-2 border-slate-300 dark:border-slate-600 hover:border-slate-400"
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Meta Info */}
                          <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                            <Badge
                              variant="outline"
                              className={cn(
                                "font-medium text-xs",
                                getCategoryColor(
                                  mockPenalCodes[selectedCode].category
                                )
                              )}
                            >
                              {mockPenalCodes[selectedCode].category}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Updated {mockPenalCodes[selectedCode].lastUpdated}
                            </div>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="h-3 w-3" />
                              <span className="font-medium text-slate-600 dark:text-slate-400">
                                {mockPenalCodes[selectedCode].popularity}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Legal Definition */}
                        <SectionCard
                          title="Legal Definition"
                          icon={
                            <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          }
                          iconBg="bg-emerald-100 dark:bg-emerald-900/30"
                        >
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {
                              mockPenalCodes[
                                selectedCode as keyof typeof mockPenalCodes
                              ].description
                            }
                          </p>
                        </SectionCard>

                        {/* Penalties */}
                        <SectionCard
                          title="Penalties"
                          icon={
                            <Gavel className="h-4 w-4 text-red-600 dark:text-red-400" />
                          }
                          iconBg="bg-red-100 dark:bg-red-900/30"
                        >
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            {
                              mockPenalCodes[
                                selectedCode as keyof typeof mockPenalCodes
                              ].punishment
                            }
                          </p>
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-xs font-medium text-red-800 dark:text-red-300">
                            Maximum:{" "}
                            {
                              mockPenalCodes[
                                selectedCode as keyof typeof mockPenalCodes
                              ].maxSentence
                            }
                          </div>
                        </SectionCard>

                        {/* Required Elements */}
                        <SectionCard
                          title="Required Elements"
                          icon={
                            <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                          }
                          iconBg="bg-green-100 dark:bg-green-900/30"
                        >
                          <ul className="space-y-2">
                            {mockPenalCodes[
                              selectedCode as keyof typeof mockPenalCodes
                            ].elements.map((element, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs font-medium text-green-700 dark:text-green-400">
                                    {index + 1}
                                  </span>
                                </div>
                                <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                  {element}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </SectionCard>

                        {/* Related Sections */}
                        <SectionCard
                          title="Related Sections"
                          icon={
                            <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          }
                          iconBg="bg-purple-100 dark:bg-purple-900/30"
                        >
                          <div className="flex flex-wrap gap-2">
                            {mockPenalCodes[
                              selectedCode as keyof typeof mockPenalCodes
                            ].relatedCodes.map((code) => (
                              <Button
                                key={code}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSelectCode(code)}
                                className="rounded-full border-purple-200 dark:border-purple-800 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-all duration-200 text-xs px-3 py-1 h-auto"
                              >
                                {code}
                              </Button>
                            ))}
                          </div>
                        </SectionCard>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Search Results or Landing
                  <div className="space-y-6">
                    {searchTerm ? (
                      // Search Results
                      <div>
                        <div className="flex items-center justify-between my-3 ml-2">
                          <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                            Results ({searchResults.length})
                          </h2>
                        </div>

                        <div>
                          {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div
                                  key={i}
                                  className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 animate-pulse border border-slate-200 dark:border-slate-700"
                                >
                                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-3"></div>
                                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                                </div>
                              ))}
                            </div>
                          ) : searchResults.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {searchResults.map((code) => {
                                const penalCode =
                                  mockPenalCodes[
                                    code as keyof typeof mockPenalCodes
                                  ];
                                return (
                                  <div
                                    key={code}
                                    onClick={() => handleSelectCode(code)}
                                    className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200"
                                  >
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                                          <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                                            {code}
                                          </span>
                                        </div>
                                        <Badge
                                          variant="outline"
                                          className={cn(
                                            "font-medium text-xs",
                                            getSeverityColor(penalCode.severity)
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
                                        className="h-6 w-6 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                                      >
                                        {isCodeBookmarked(code) ? (
                                          <BookMarked className="h-3 w-3 text-emerald-600" />
                                        ) : (
                                          <BookmarkPlus className="h-3 w-3 text-slate-400" />
                                        )}
                                      </Button>
                                    </div>

                                    <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2 line-clamp-1">
                                      {penalCode.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                                      {penalCode.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                      <Badge
                                        variant="outline"
                                        className={cn(
                                          "font-medium text-xs",
                                          getCategoryColor(penalCode.category)
                                        )}
                                      >
                                        {penalCode.category.replace(
                                          " Crimes",
                                          ""
                                        )}
                                      </Badge>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 text-amber-500" />
                                        <span className="text-xs text-slate-500 font-medium">
                                          {penalCode.popularity}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <AlertCircle className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                No results found
                              </h3>
                              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm">
                                We couldn't find any penal codes matching "
                                {searchQuery}". Try adjusting your search terms.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Landing Page
                      <div className="space-y-8 mt-3">
                        {/* Most Searched */}
                        <div>
                          <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            Most Searched
                          </h2>
                          <div className="space-y-3">
                            {popularCodes.map(([code, penalCode], index) => (
                              <div
                                key={code}
                                className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200"
                                onClick={() => handleSelectCode(code)}
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                    <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                                      #{index + 1}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                      <h3 className="font-medium text-slate-900 dark:text-white text-sm">
                                        Section {code}: {penalCode.title}
                                      </h3>
                                      <Badge
                                        variant="outline"
                                        className={cn(
                                          "font-medium text-xs",
                                          getSeverityColor(penalCode.severity)
                                        )}
                                      >
                                        {penalCode.severity}
                                      </Badge>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 line-clamp-1 leading-relaxed text-xs">
                                      {penalCode.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 text-amber-500" />
                                      <span className="text-slate-600 dark:text-slate-400 font-semibold text-xs">
                                        {penalCode.popularity}%
                                      </span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                  </div>
                                </div>
                              </div>
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
              <div className="space-y-6 min-h-full">
                <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                  Bookmarked Codes
                </h2>

                {bookmarkedCodes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {bookmarkedCodes.map((bookmark) => {
                      const penalCode =
                        mockPenalCodes[
                          bookmark.code as keyof typeof mockPenalCodes
                        ];
                      return (
                        <div
                          key={bookmark.code}
                          className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                                  {bookmark.code}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "font-medium text-xs",
                                  getSeverityColor(penalCode.severity)
                                )}
                              >
                                {penalCode.severity}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleToggleBookmark(bookmark.code)
                                }
                                className="h-6 w-6 p-0 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                              >
                                <BookMarked className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedCode(bookmark.code);
                                  setActiveTab("search");
                                }}
                                className="h-6 w-6 p-0 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                              >
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2 line-clamp-1">
                            {penalCode.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                            {penalCode.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className={cn(
                                "font-medium text-xs",
                                getCategoryColor(penalCode.category)
                              )}
                            >
                              {penalCode.category.replace(" Crimes", "")}
                            </Badge>
                            <span className="text-xs text-slate-500 font-medium">
                              {bookmark.dateBookmarked.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center py-12">
                    <BookmarkPlus className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      No bookmarks yet
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                      Save important penal codes for quick reference
                    </p>
                    <Button
                      onClick={() => setActiveTab("search")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold text-sm"
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

      {/* Success Toast */}
      {showBookmarkSuccess && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-green-200 dark:border-green-800 p-4 flex items-center gap-3 z-50 max-w-sm">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-slate-900 dark:text-white text-sm">
              Bookmark Added!
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Code saved to your collection
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBookmarkSuccess(false)}
            className="h-6 w-6 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
