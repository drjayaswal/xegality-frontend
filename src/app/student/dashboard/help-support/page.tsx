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
  Download,
  Share2,
  Scale,
  Gavel,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Mock penal code data - would be replaced with API call in production
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
    category: "White Collar Crimes",
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
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle search input changes
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);

      // Simulate API call delay
      const timer = setTimeout(() => {
        const results = Object.keys(mockPenalCodes).filter(
          (code) =>
            code.includes(searchQuery) ||
            mockPenalCodes[code as keyof typeof mockPenalCodes].title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            mockPenalCodes[code as keyof typeof mockPenalCodes].category
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle code selection
  const handleSelectCode = (code: string) => {
    setSelectedCode(code);

    // Add to search history
    const newHistoryItem: SearchHistoryItem = {
      code,
      timestamp: new Date(),
    };

    setSearchHistory((prev) => {
      // Remove duplicates
      const filteredHistory = prev.filter((item) => item.code !== code);
      return [newHistoryItem, ...filteredHistory].slice(0, 20); // Keep only last 20 searches
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

      // Show success message
      setShowBookmarkSuccess(true);
      setTimeout(() => setShowBookmarkSuccess(false), 2000);
    }
  };

  // Check if a code is bookmarked
  const isCodeBookmarked = (code: string) => {
    return bookmarkedCodes.some((item) => item.code === code);
  };

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="h-full flex flex-col relative border-[1.5px] rounded-lg shadow-none border-b-0">
      <div className="rounded-md">
        {/* Tab Switcher */}
        <div className="px-10 pt-10 pb-2 flex">
          {[
            { id: "search", label: "Search Codes", icon: Search },
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
                  "flex-1 py-4 text-center font-medium cursor-pointer transition-colors",
                  activeTab === tab.id
                    ? "border-b-2 border-[#3b82f6] text-gray-600 dark:text-gray-300 dark:hover:text-white"
                    : "text-gray-600 dark:text-gray-300 border-b-2 hover:text-[#3b82f6]"
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
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-[#3b82f6]" />
                <Input
                  ref={searchInputRef}
                  placeholder="Enter penal code number or search by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 bg-white/20 focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-black/40 dark:placeholder:text-white/40 text-lg border-[#3b82f6]/50 rounded-full"
                />
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-10">
              {activeTab === "search" && (
                <div className="space-y-6">
                  {selectedCode ? (
                    // Detailed View
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCode(null)}
                              className="h-8 w-8 p-0"
                            >
                              <ArrowRight className="h-4 w-4 rotate-180" />
                            </Button>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                              Section {selectedCode}:{" "}
                              {
                                mockPenalCodes[
                                  selectedCode as keyof typeof mockPenalCodes
                                ].title
                              }
                            </h2>
                          </div>
                          <div className="flex items-center gap-2 ml-11">
                            <span className="text-xs bg-[#3b82f6]/10 text-[#3b82f6] px-2 py-1 rounded-full">
                              {
                                mockPenalCodes[
                                  selectedCode as keyof typeof mockPenalCodes
                                ].category
                              }
                            </span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                              Updated{" "}
                              {
                                mockPenalCodes[
                                  selectedCode as keyof typeof mockPenalCodes
                                ].lastUpdated
                              }
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleBookmark(selectedCode)}
                            className={cn(
                              "h-9 w-9 p-0 rounded-full",
                              isCodeBookmarked(selectedCode)
                                ? "text-[#3b82f6] bg-[#3b82f6]/10"
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
                            className="h-9 w-9 p-0 rounded-full text-gray-500"
                          >
                            <Share2 className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 rounded-full text-gray-500"
                          >
                            <Download className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Content Cards */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Description */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                            <Scale className="h-5 w-5 text-[#3b82f6]" />
                            Description
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            {
                              mockPenalCodes[
                                selectedCode as keyof typeof mockPenalCodes
                              ].description
                            }
                          </p>
                        </div>

                        {/* Punishment */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                            <Gavel className="h-5 w-5 text-[#3b82f6]" />
                            Punishment
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            {
                              mockPenalCodes[
                                selectedCode as keyof typeof mockPenalCodes
                              ].punishment
                            }
                          </p>
                        </div>

                        {/* Elements */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[#3b82f6]" />
                            Elements of the Crime
                          </h3>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                            {mockPenalCodes[
                              selectedCode as keyof typeof mockPenalCodes
                            ].elements.map((element, index) => (
                              <li key={index}>{element}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Related Codes */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-[#3b82f6]" />
                            Related Penal Codes
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {mockPenalCodes[
                              selectedCode as keyof typeof mockPenalCodes
                            ].relatedCodes.map((code) => (
                              <Button
                                key={code}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSelectCode(code)}
                                className="border-[#3b82f6]/30 hover:bg-[#3b82f6]/10 hover:text-[#3b82f6] hover:border-[#3b82f6]"
                              >
                                Section {code}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Case References */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                          <ExternalLink className="h-5 w-5 text-[#3b82f6]" />
                          Case References
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mockPenalCodes[
                            selectedCode as keyof typeof mockPenalCodes
                          ].caseReferences.map((caseRef, index) => (
                            <div
                              key={index}
                              className="p-4 bg-white/10 rounded-lg border border-white/10"
                            >
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-[#3b82f6]" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">
                                  {caseRef}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // Search Results
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                        {searchQuery
                          ? `Search Results (${searchResults.length})`
                          : "Penal Code Search"}
                      </h2>

                      <AnimatePresence mode="wait">
                        {isLoading ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                              <div
                                key={i}
                                className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 animate-pulse"
                              >
                                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-3"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                              </div>
                            ))}
                          </div>
                        ) : searchResults.length > 0 ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                          >
                            {searchResults.map((code) => {
                              const penalCode =
                                mockPenalCodes[
                                  code as keyof typeof mockPenalCodes
                                ];
                              return (
                                <motion.div
                                  key={code}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleSelectCode(code)}
                                  className="bg-transparent hover:bg-[#3b82f6]/20 hover:dark:bg-white/10 backdrop-blur-sm rounded-xl border border-transparent p-6 hover:shadow-lg hover:shadow-[#3b82f6] transition-all cursor-pointer"
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-medium text-gray-800 dark:text-white">
                                      Section {code}
                                    </h3>
                                    <ChevronRight className="h-4 w-4 text-[#3b82f6]" />
                                  </div>
                                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    {penalCode.title}
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                                    {penalCode.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs bg-[#3b82f6]/10 text-[#3b82f6] px-2 py-1 rounded-full">
                                      {penalCode.category}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleBookmark(code);
                                      }}
                                      className="h-8 w-8 p-0"
                                    >
                                      {isCodeBookmarked(code) ? (
                                        <BookMarked className="h-4 w-4 text-[#3b82f6]" />
                                      ) : (
                                        <BookmarkPlus className="h-4 w-4 text-gray-500" />
                                      )}
                                    </Button>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        ) : searchQuery ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20"
                          >
                            <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                              No results found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              We couldn't find any penal codes matching "
                              {searchQuery}". Try a different search term.
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20"
                          >
                            <BookOpen className="h-12 w-12 mx-auto text-[#3b82f6] mb-4" />
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                              Search for a Penal Code
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                              Enter a penal code number (e.g., "187") or keyword
                              to find relevant information.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSearchQuery("187");
                                  handleSelectCode("187");
                                }}
                                className="border-[#3b82f6]/30 hover:bg-[#3b82f6]/10 hover:text-[#3b82f6] hover:border-[#3b82f6]"
                              >
                                Section 187 (Murder)
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSearchQuery("211");
                                  handleSelectCode("211");
                                }}
                                className="border-[#3b82f6]/30 hover:bg-[#3b82f6]/10 hover:text-[#3b82f6] hover:border-[#3b82f6]"
                              >
                                Section 211 (Robbery)
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSearchQuery("459");
                                  handleSelectCode("459");
                                }}
                                className="border-[#3b82f6]/30 hover:bg-[#3b82f6]/10 hover:text-[#3b82f6] hover:border-[#3b82f6]"
                              >
                                Section 459 (Burglary)
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "bookmarks" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Bookmarked Penal Codes
                  </h2>

                  {bookmarkedCodes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {bookmarkedCodes.map((bookmark) => {
                        const penalCode =
                          mockPenalCodes[
                            bookmark.code as keyof typeof mockPenalCodes
                          ];
                        return (
                          <motion.div
                            key={bookmark.code}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-transparent hover:bg-[#3b82f6]/20 hover:dark:bg-white/10 backdrop-blur-sm rounded-xl border border-transparent p-6 hover:shadow-lg hover:shadow-[#3b82f6] transition-all"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-gray-800 dark:text-white">
                                  Section {bookmark.code}: {penalCode?.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                  {penalCode?.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleToggleBookmark(bookmark.code)
                                  }
                                  className="h-8 w-8 p-0 text-[#3b82f6]"
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
                            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                              Bookmarked on{" "}
                              {bookmark.dateBookmarked.toLocaleDateString()}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                      <BookmarkPlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                        No bookmarks yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Bookmark penal codes for quick access. They will appear
                        here.
                      </p>
                      <Button
                        onClick={() => setActiveTab("search")}
                        className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white"
                      >
                        Search Penal Codes
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
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
                            className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                                <Clock className="h-4 w-4 text-[#3b82f6]" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800 dark:text-white">
                                  Section {item.code}: {penalCode?.title}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
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
                    <div className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                      <History className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                        No search history
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Your search history will appear here once you start
                        searching for penal codes.
                      </p>
                      <Button
                        onClick={() => setActiveTab("search")}
                        className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white"
                      >
                        Search Penal Codes
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Bookmark Success Toast */}
      <AnimatePresence>
        {showBookmarkSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-green-500 p-4 flex items-center gap-3 z-50"
          >
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">
                Bookmark Added
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Penal code saved to your bookmarks
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBookmarkSuccess(false)}
              className="h-8 w-8 p-0 ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
