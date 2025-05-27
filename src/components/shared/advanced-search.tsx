"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Mic,
  X,
  Filter,
  Clock,
  Tag,
  ArrowRight,
  ChevronDown,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface AdvancedSearchProps {
  placeholder?: string;
  onSearch?: (query: string, filters: Record<string, string[]>) => void;
  suggestions?: string[];
  filters?: {
    name: string;
    options: string[];
  }[];
  className?: string;
  variant?: "default" | "minimal";
}

export function AdvancedSearch({
  placeholder = "Ask Xegality AI Anything...",
  onSearch,
  suggestions = [],
  filters = [],
  className,
  variant = "default",
}: AdvancedSearchProps) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<Record<string, string[]>>({});

  // Initialize filters ref on first render
  if (Object.keys(filtersRef.current).length === 0 && filters.length > 0) {
    const initialFilters: Record<string, string[]> = {};
    filters.forEach((filter) => {
      initialFilters[filter.name] = [];
    });
    filtersRef.current = initialFilters;
  }

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRecentSearches(Array.isArray(parsed) ? parsed.slice(0, 5) : []);
      } catch (e) {
        console.error("Failed to parse recent searches:", e);
      }
    }
  }, []);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle voice search
  const handleVoiceSearch = () => {
    // Check if the browser supports the Web Speech API
    if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Voice search is not supported in your browser");
    }
  };

  // Handle search
  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    // Save to recent searches
    const updatedRecents = [
      searchQuery,
      ...recentSearches.filter((item) => item !== searchQuery),
    ].slice(0, 5);

    setRecentSearches(updatedRecents);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecents));

    // Call onSearch callback with query and filters
    onSearch?.(searchQuery, filtersRef.current);
    setShowSuggestions(false);
  };

  // Handle filter selection
  const toggleFilter = (filterName: string, option: string) => {
    const current = [...(filtersRef.current[filterName] || [])];
    const index = current.indexOf(option);

    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(option);
    }

    filtersRef.current = {
      ...filtersRef.current,
      [filterName]: current,
    };

    // Force re-render
    setIsFocused((prev) => prev);
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: Record<string, string[]> = {};
    filters.forEach((filter) => {
      clearedFilters[filter.name] = [];
    });
    filtersRef.current = clearedFilters;

    // Force re-render
    setIsFocused((prev) => prev);
  };

  // Clear specific filter
  const clearFilter = (filterName: string, option: string) => {
    const current = [...(filtersRef.current[filterName] || [])];
    const index = current.indexOf(option);

    if (index >= 0) {
      current.splice(index, 1);
    }

    filtersRef.current = {
      ...filtersRef.current,
      [filterName]: current,
    };

    // Force re-render
    setIsFocused((prev) => prev);
  };

  // Get all selected filter options
  const getSelectedFilterOptions = () => {
    const options: { filter: string; option: string }[] = [];

    Object.entries(filtersRef.current).forEach(
      ([filterName, filterOptions]) => {
        filterOptions.forEach((option) => {
          options.push({ filter: filterName, option });
        });
      }
    );

    return options;
  };

  // Check if any filters are selected
  const hasSelectedFilters = Object.values(filtersRef.current).some(
    (options) => options.length > 0
  );

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  // Handle input focus
  const handleInputFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  // Handle key down
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Filtered suggestions based on current query
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className={cn("relative backdrop-blur-xl", className)}
      ref={searchContainerRef}
    >
      {/* Search Input Container */}
      <div
        className={cn(
          "flex items-center h-14 px-1 w-full border rounded-full transition-all",
          "backdrop-blur-lg bg-white/20 border-transparent ring-transparent focus-within:ring-[#3b82f6] focus-within:border-[#3b82f6]",
          isFocused ? "shadow-sm" : "shadow-2xl",
          variant === "minimal" ? "border-gray-200" : "border-gray-300"
        )}
      >
        {" "}
        <div className="flex-1 flex items-center">
          {query ? (
            <Search className="h-7 w-7 ml-3 text-[#3b82f6] flex-shrink-0" />
          ) : (
            <Button className="h-12 rounded-full bg-transparent shadow-none hover:scale-105 hover:bg-transparent px-4">
              <Sparkles className="text-[#3b82f6] size-6 stroke-[1.5px] m-0.5" />
            </Button>
          )}

          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className="border-0 focus-visible:ring-0 shadow-none text-black focus-visible:ring-offset-0 px-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
          />
        </div>
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 mr-1"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4 text-gray-400" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        {variant === "default" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 mr-1",
                  hasSelectedFilters && "bg-white text-[#3b82f6]"
                )}
              >
                <Filter className="h-6 w-6 hover:scale-110" />
                <span className="sr-only">Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0" align="end">
              <Command>
                <CommandInput placeholder="Search filters..." />
                <CommandList>
                  <CommandEmpty>No filters found.</CommandEmpty>
                  {filters.map((filter) => (
                    <CommandGroup key={filter.name} heading={filter.name}>
                      {filter.options.map((option) => {
                        const isSelected =
                          filtersRef.current[filter.name]?.includes(option);
                        return (
                          <CommandItem
                            key={option}
                            onSelect={() => toggleFilter(filter.name, option)}
                            className="flex items-center justify-between"
                          >
                            <span>{option}</span>
                            {isSelected && (
                              <div className="h-4 w-4 bg-[#3b82f6] rounded-full"></div>
                            )}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  ))}
                </CommandList>
                <div className="border-t p-2 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    disabled={!hasSelectedFilters}
                  >
                    Clear all
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#3b82f6]"
                    onClick={() => handleSearch()}
                  >
                    Apply filters
                  </Button>
                </div>
              </Command>
            </PopoverContent>
          </Popover>
        )}
        <button
          className="h-8 w-8 mr-1"
          onClick={handleVoiceSearch}
          disabled={isListening}
        >
          <Mic
            className={cn(
              "h-6 w-6 hover:scale-110",
              isListening ? "text-[#3b82f6] animate-pulse" : "text-[#3b82f6]"
            )}
          />
        </button>
        <Button
          className="group h-12 rounded-full bg-transparent shadow-none hover:bg-[#3b82f6] flex items-center justify-center gap-2 **:transition-all **:duration-500"
          onClick={() => handleSearch()}
        >
          <ArrowUp className="size-6 stroke-2 text-[#3b82f6] group-hover:text-white" />
          <span className="overflow-hidden whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs">
            Search
          </span>
        </Button>
      </div>
      {/* Selected Filters */}
      {hasSelectedFilters && variant === "default" && (
        <div className="flex flex-wrap gap-2 mt-2">
          {getSelectedFilterOptions().map(({ filter, option }) => (
            <Badge
              key={`${filter}-${option}`}
              variant="outline"
              className="bg-[#3b82f6] text-[#3b82f6] border-[#3b82f6] py-1"
            >
              {filter}: {option}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0"
                onClick={() => clearFilter(filter, option)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {getSelectedFilterOptions().length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-gray-500"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          )}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (query || recentSearches.length > 0) && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {recentSearches.length > 0 && (
            <div className="p-2">
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-2 text-gray-400" />
                      <span className="text-gray-400">{search}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
