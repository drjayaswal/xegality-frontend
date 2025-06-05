"use client";

import type React from "react";
import { useState, useRef } from "react";
import {
  Mic,
  ArrowUp,
  FileText,
  BookOpen,
  PenTool,
  BrainCircuit,
  Sparkles,
  Scale,
  Paperclip,
  EarIcon,
  X,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export function AIAssistantInterface({
  onFocus,
  onBlur,
  onChange,
  placeholder = "Ask me anything...",
  from = "slate-800",
  to = "amber-800",
}: {
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: (value: string) => void;
  placeholder?: string;
  from?: string;
  to?: string;
}) {
  const [isListening, setIsListening] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [researchEnabled, setResearchEnabled] = useState(false);
  const [reasonEnabled, setReasonEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const [activeCommandCategory, setActiveCommandCategory] = useState<
    string | null
  >(null);
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

  const handleVoiceSearch = () => {
    if (
      typeof window !== "undefined" &&
      (window as any).webkitSpeechRecognition
    ) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        onChange?.(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  const handleUploadFile = () => {
    setShowUploadAnimation(true);
    setTimeout(() => {
      setUploadedFiles((prev) => [...prev, `Document${prev.length + 1}.pdf`]);
      setShowUploadAnimation(false);
    }, 1000);
  };

  const handleCommandSelect = (command: string) => {
    setInputValue(command);
    onChange?.(command);
    setActiveCommandCategory(null);
    inputRef.current?.focus();
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setInputValue("");
      onChange?.("");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-5">
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
            className="flex-1 text-sm sm:text-base text-gray-900 dark:text-gray-100 bg-transparent outline-none font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceSearch}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-transparent border-2 ${getBorderColorClass(
                from
              )} hover:${getBorderColorClass(to)} flex ${getTextColorClass(
                to
              )} dark:${getTextColorClass(
                to
              )} hover:text-white items-center justify-center hover:bg-gradient-to-r hover:${getGradientClass(
                from,
                to
              )} transition-all duration-200 active:scale-95 ${
                isListening
                  ? `cursor-progress bg-gradient-to-r ${getGradientClass(
                      from,
                      to
                    )} text-white animate-aurora`
                  : "cursor-pointer"
              }`}
            >
              {isListening ? (
                <EarIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
              ) : (
                <Mic className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
              )}
            </button>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue}
              className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 border-0 p-0",
                inputValue.trim()
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
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {/* Uploaded Files */}
        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 sm:px-6 pb-4"
            >
              <div className="flex flex-wrap gap-2">
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 py-1.5 px-3 rounded-lg border ${getBorderColorClass(
                      from,
                      "30"
                    )} dark:${getBorderColorClass(
                      from,
                      "30"
                    )} text-xs sm:text-sm`}
                  >
                    <FileText
                      className={`w-3 h-3 ${getTextColorClass(
                        from
                      )} dark:${getTextColorClass(from)}`}
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {file}
                    </span>
                    <button
                      onClick={() =>
                        setUploadedFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  onClick={() => setter(!state)}
                  className={cn(
                    "flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border-2",
                    state
                      ? `bg-gradient-to-r ${getGradientClass(
                          from,
                          to
                        )} border-transparent text-white shadow-md`
                      : `${getBgColorClass(from, "10")} dark:${getBgColorClass(
                          from,
                          "10"
                        )} ${getTextColorClass(from)} dark:${getTextColorClass(
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
            <Button
              onClick={handleUploadFile}
              className={`rounded-full bg-transparent border-2 ${getBorderColorClass(
                from
              )} dark:${getBorderColorClass(from)} flex ${getTextColorClass(
                from
              )} dark:${getTextColorClass(
                from
              )} hover:text-white items-center justify-center hover:bg-gradient-to-r hover:${getGradientClass(
                from,
                to
              )} transition-all duration-200 active:scale-95 gap-1.5 px-3 py-1.5 h-auto shadow-none`}
              disabled={showUploadAnimation}
            >
              {showUploadAnimation ? (
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-current rounded-full"
                      animate={{ y: [-2, 2, -2] }}
                      transition={{
                        duration: 0.6,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Paperclip className="w-3 h-3" />
              )}
              <span className="hidden sm:inline text-xs sm:text-sm font-medium">
                {showUploadAnimation ? "Uploading..." : "Attach"}
              </span>
            </Button>
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
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === key ? null : key
              )
            }
            className={cn(
              "flex flex-col cursor-pointer items-center gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200",
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
        {activeCommandCategory && (
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
    </div>
  );
}
