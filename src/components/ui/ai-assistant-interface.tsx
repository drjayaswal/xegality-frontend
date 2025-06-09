"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  BookOpen,
  PenTool,
  BrainCircuit,
  Sparkles,
  Scale,
  Search,
  Brain,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

export default function AIAssistantForm({
  onFocus,
  onBlur,
  onChange,
  onLoadingChange,
  placeholder = "Ask me anything...",
  from = "slate-800",
  to = "amber-800",
}: {
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: (value: string) => void;
  onLoadingChange?: (loading: boolean) => void;
  placeholder?: string;
  from?: string;
  to?: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [researchEnabled, setResearchEnabled] = useState(false);
  const [reasonEnabled, setReasonEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [activeCommandCategory, setActiveCommandCategory] = useState<
    string | null
  >(null);

  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const commandSuggestions = {
    learn: [
      "Explain contract law basics",
      "What is intellectual property?",
      "How does litigation work?",
      "Corporate governance principles",
    ],
    write: [
      "Draft a legal contract",
      "Write a cease and desist letter",
      "Create a privacy policy",
      "Draft terms of service",
    ],
    legal: [
      "File for bankruptcy steps",
      "Non-disclosure agreement implications",
      "Copyright law for digital content",
      "Patent registration process",
    ],
  };

  const getGradientClass = (fromColor: string, toColor: string) => {
    return `from-${fromColor} to-${toColor}`;
  };

  const getTextColorClass = (color: string) => {
    return `text-${color}`;
  };

  const getBorderColorClass = (color: string, opacity?: string) => {
    return opacity ? `border-${color}/${opacity}` : `border-${color}`;
  };

  const getBgColorClass = (color: string, opacity?: string) => {
    return opacity ? `bg-${color}/${opacity}` : `bg-${color}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange?.(value);
  };

  const handleCommandSelect = (command: string) => {
    setInputValue(command);
    onChange?.(command);
    setActiveCommandCategory(null);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isSubmitting) {
      setIsSubmitting(true);
      onLoadingChange?.(true);

      const basePath = pathname.slice(1);
      const dashboardUrl = `/${basePath}/dashboard/xegality-ai?query=${encodeURIComponent(
        inputValue
      )}`;

      // Clear the form
      setInputValue("");
      onChange?.("");

      // Simulate loading time before redirect
      setTimeout(() => {
        router.push(dashboardUrl);
      }, 2000);
    }
  };

  // Reset loading state when component unmounts or when not submitting
  useEffect(() => {
    if (!isSubmitting) {
      onLoadingChange?.(false);
    }
  }, [isSubmitting, onLoadingChange]);

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="relative flex items-center justify-center">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r ${getGradientClass(
                    from,
                    to
                  )} opacity-40`}
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}

              <div
                className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r ${getGradientClass(
                  from,
                  to
                )} flex items-center justify-center shadow-2xl`}
              >
                <Brain
                  className={`w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md`}
                />
              </div>
            </div>

            {/* Loading Text */}
            <div className="mt-20 text-center space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg font-semibold text-gray-800 dark:text-gray-200"
              >
                Xegality AI
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Preparing your legal workspace...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-4xl mx-auto p-3 sm:p-5
          ${isSubmitting ? "blur-md" : ""}`}
      >
        {/* Main Input Container */}
        <div className="bg-white/60 backdrop-blur-lg mt-1 rounded-2xl sm:rounded-3xl dark:border-white-900/10 shadow-none focus-within:shadow-xl dark:focus-within:bg-white-900/10 transition-all duration-300 mb-4">
          {/* Input Field */}
          <div className="flex items-center gap-3 p-4 sm:p-6">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${getGradientClass(
                from,
                to
              )} flex items-center justify-center shadow-md`}
            >
              {inputValue !== "" ? (
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </div>
            <input
              onFocus={onFocus}
              onBlur={onBlur}
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="flex-1 text-sm sm:text-base text-gray-900 dark:text-gray-100 bg-transparent outline-none font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50"
            />
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                disabled={!inputValue || isSubmitting}
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 border-0 p-0",
                  inputValue.trim() && !isSubmitting
                    ? `bg-gradient-to-r ${getGradientClass(
                      from,
                      to
                    )} text-white shadow-md hover:shadow-lg`
                    : `bg-white/40 dark:bg-gray-700/40 border-2 ${getBorderColorClass(
                      from,
                      "40"
                    )} dark:${getBorderColorClass(
                      from,
                      "40"
                    )} ${getTextColorClass(from)}/60 dark:${getTextColorClass(
                      from
                    )}/60 hover:text-white hover:bg-gradient-to-r hover:${getGradientClass(
                      from,
                      to
                    )}`
                )}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* AI Mode Toggles */}
          <div className="px-4 sm:px-6 py-3 border-t border-white/30 dark:border-gray-700/30">
            <div className="flex flex-wrap gap-2 justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    key: "search",
                    label: "Consulting",
                    icon: Scale,
                    state: searchEnabled,
                    setter: setSearchEnabled,
                  },
                  {
                    key: "research",
                    label: "Research",
                    icon: () => (
                      <div className="w-3 h-3 rounded-full border-2 border-current" />
                    ),
                    state: researchEnabled,
                    setter: setResearchEnabled,
                  },
                  {
                    key: "reason",
                    label: "Reasoning",
                    icon: BrainCircuit,
                    state: reasonEnabled,
                    setter: setReasonEnabled,
                  },
                ].map(({ key, label, icon: Icon, state, setter }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setter(!state)}
                    disabled={isSubmitting}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border-2 disabled:opacity-50 disabled:cursor-not-allowed",
                      state
                        ? `bg-gradient-to-r ${getGradientClass(
                          from,
                          to
                        )} border-transparent text-white shadow-md`
                        : `${getBgColorClass(
                          from,
                          "10"
                        )} dark:${getBgColorClass(
                          from,
                          "10"
                        )} ${getTextColorClass(
                          from
                        )} dark:${getTextColorClass(
                          from
                        )} border-transparent hover:${getBgColorClass(
                          from,
                          "20"
                        )} dark:hover:${getBgColorClass(from, "20")}`
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Command Categories */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
          {[
            { key: "learn", label: "Learn", icon: BookOpen },
            { key: "write", label: "Write", icon: PenTool },
            { key: "legal", label: "Legal", icon: Scale },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() =>
                setActiveCommandCategory(
                  activeCommandCategory === key ? null : key
                )
              }
              disabled={isSubmitting}
              className={cn(
                "flex flex-col cursor-pointer items-center gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                activeCommandCategory === key
                  ? `bg-gradient-to-r ${getGradientClass(
                    from,
                    to
                  )} text-white border-white/40 dark:border-gray-600/40 shadow-lg`
                  : "bg-white/60 dark:bg-gray-800/40 dark:border-gray-700/60 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/60 hover:text-gray-800 dark:hover:text-gray-100"
              )}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Command Suggestions */}
        <AnimatePresence>
          {activeCommandCategory && !isSubmitting && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/60 dark:border-gray-700/60 shadow-lg overflow-hidden"
            >
              {commandSuggestions[
                activeCommandCategory as keyof typeof commandSuggestions
              ].map((suggestion, index) => (
                <motion.button
                  key={index}
                  type="button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCommandSelect(suggestion)}
                  className="w-full active:cursor-grabbing cursor-grab flex items-center gap-3 p-3 sm:p-4 text-left hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors border-b border-white/20 dark:border-gray-700/20 last:border-b-0"
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r ${getGradientClass(
                      from,
                      to
                    )} flex items-center justify-center shadow-sm`}
                  >
                    {activeCommandCategory === "learn" ? (
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    ) : activeCommandCategory === "write" ? (
                      <PenTool className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    ) : (
                      <Scale className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {suggestion}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}
