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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  },
};

// More comprehensive mock data for additional penal codes
const additionalPenalCodes = {
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
  },
};

// Combine all penal codes
const allPenalCodes = { ...mockPenalCodes, ...additionalPenalCodes };

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
  const [activeTab, setActiveTab] = useState("search");
  const [showBookmarkSuccess, setShowBookmarkSuccess] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle search input changes
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);

      // Simulate API call delay
      const timer = setTimeout(() => {
        const results = Object.keys(allPenalCodes).filter(
          (code) =>
            code.includes(searchQuery) ||
            allPenalCodes[code as keyof typeof allPenalCodes].title
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
    <div className="w-full h-full flex flex-col rounded-lg border-[1.5px] overflow-hidden">
      <div className="p-6 border-b border-[#3b82f6]/20">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Penal Code Search
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Search for any penal code to get detailed information and legal
          references
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="border-b border-[#3b82f6]/20">
          <TabsList className="w-full justify-start bg-transparent p-0">
            <TabsTrigger
              value="search"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] rounded-none px-6 py-3"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </TabsTrigger>
            <TabsTrigger
              value="bookmarks"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] rounded-none px-6 py-3"
            >
              <BookMarked className="w-4 h-4 mr-2" />
              Bookmarks
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] rounded-none px-6 py-3"
            >
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <TabsContent
            value="search"
            className="flex-1 flex flex-col md:flex-row m-0 overflow-hidden"
          >
            {/* Search Panel */}
            <div className="w-full md:w-1/3 border-r border-[#3b82f6]/20 p-4 flex flex-col">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  ref={searchInputRef}
                  placeholder="Enter penal code number or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-transparent border-2 border-[#3b82f6]/40 focus-visible:ring-0 focus-visible:border-[#3b82f6] transition-all duration-150"
                />
              </div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {searchResults.length}{" "}
                  {searchResults.length === 1 ? "Result" : "Results"}
                </h3>
                {searchResults.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-[#3b82f6]"
                  >
                    <Filter className="h-3 w-3" />
                    <span className="text-xs">Filter</span>
                  </Button>
                )}
              </div>

              <ScrollArea className="flex-1">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <div className="flex flex-col space-y-2 py-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg animate-pulse"
                        >
                          <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  ) : searchResults.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col space-y-2 py-2"
                    >
                      {searchResults.map((code) => {
                        const penalCode =
                          allPenalCodes[code as keyof typeof allPenalCodes];
                        return (
                          <motion.div
                            key={code}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleSelectCode(code)}
                            className={cn(
                              "p-3 border rounded-lg cursor-pointer transition-all",
                              selectedCode === code
                                ? "border-[#3b82f6] bg-[#3b82f6]/5"
                                : "border-gray-200 dark:border-gray-800 hover:border-[#3b82f6]/50"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-800 dark:text-white">
                                Section {code}
                              </h3>
                              <ChevronRight className="h-4 w-4 text-[#3b82f6]" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                              {penalCode.title}
                            </p>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : searchQuery ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                        No results found
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                        We couldn't find any penal codes matching "{searchQuery}
                        ". Try a different search term.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <BookOpen className="h-12 w-12 text-[#3b82f6] mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                        Search for a Penal Code
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                        Enter a penal code number (e.g., "187") or keyword to
                        find relevant information.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </div>

            {/* Details Panel */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <AnimatePresence mode="wait">
                {selectedCode ? (
                  <motion.div
                    key={selectedCode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col overflow-hidden"
                  >
                    <div className="p-6 border-b border-[#3b82f6]/20 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            Section {selectedCode}:{" "}
                            {
                              allPenalCodes[
                                selectedCode as keyof typeof allPenalCodes
                              ].title
                            }
                          </h2>
                          <span className="text-xs bg-[#3b82f6]/10 text-[#3b82f6] px-2 py-1 rounded-full">
                            Updated{" "}
                            {
                              allPenalCodes[
                                selectedCode as keyof typeof allPenalCodes
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

                    <ScrollArea className="flex-1 p-6 overflow-visible">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                            Description
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            {
                              allPenalCodes[
                                selectedCode as keyof typeof allPenalCodes
                              ].description
                            }
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                            Elements of the Crime
                          </h3>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                            {allPenalCodes[
                              selectedCode as keyof typeof allPenalCodes
                            ].elements.map((element, index) => (
                              <li key={index}>{element}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                            Punishment
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            {
                              allPenalCodes[
                                selectedCode as keyof typeof allPenalCodes
                              ].punishment
                            }
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                            Related Penal Codes
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {allPenalCodes[
                              selectedCode as keyof typeof allPenalCodes
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

                        <div>
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                            Case References
                          </h3>
                          <ul className="space-y-2">
                            {allPenalCodes[
                              selectedCode as keyof typeof allPenalCodes
                            ].caseReferences.map((caseRef, index) => (
                              <li
                                key={index}
                                className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-[#3b82f6]" />
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {caseRef}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </ScrollArea>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <BookOpen className="h-16 w-16 text-[#3b82f6]/30 mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                      Select a Penal Code
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                      Search for a penal code and select it from the results to
                      view detailed information.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
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
          </TabsContent>

          <TabsContent
            value="bookmarks"
            className="flex-1 flex flex-col m-0 overflow-hidden"
          >
            <div className="p-6 border-b border-[#3b82f6]/20">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Bookmarked Penal Codes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Access your saved penal codes for quick reference
              </p>
            </div>

            <ScrollArea className="flex-1 p-6">
              {bookmarkedCodes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookmarkedCodes.map((bookmark) => {
                    const penalCode =
                      allPenalCodes[
                        bookmark.code as keyof typeof allPenalCodes
                      ];
                    return (
                      <motion.div
                        key={bookmark.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
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
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <BookmarkPlus className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                    No bookmarks yet
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                    Bookmark penal codes for quick access. They will appear
                    here.
                  </p>
                  <Button
                    onClick={() => setActiveTab("search")}
                    className="mt-4 bg-[#3b82f6] hover:bg-[#3b82f6]/90"
                  >
                    Search Penal Codes
                  </Button>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent
            value="history"
            className="flex-1 flex flex-col m-0 overflow-visible"
          >
            <div className="p-6 border-b border-[#3b82f6]/20">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Search History
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your recent penal code searches
              </p>
            </div>

            <ScrollArea className="flex-1 p-6">
              {searchHistory.length > 0 ? (
                <div className="space-y-3">
                  {searchHistory.map((item, index) => {
                    const penalCode =
                      allPenalCodes[item.code as keyof typeof allPenalCodes];
                    return (
                      <motion.div
                        key={`${item.code}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg flex items-center justify-between"
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
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <History className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                    No search history
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                    Your search history will appear here once you start
                    searching for penal codes.
                  </p>
                  <Button
                    onClick={() => setActiveTab("search")}
                    className="mt-4 bg-[#3b82f6] hover:bg-[#3b82f6]/90"
                  >
                    Search Penal Codes
                  </Button>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>

      {/* Bookmark Success Toast */}
      <AnimatePresence>
        {showBookmarkSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-green-500 p-4 flex items-center gap-3"
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
