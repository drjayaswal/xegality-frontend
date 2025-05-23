"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
  Search,
  Mic,
  ArrowUp,
  Plus,
  FileText,
  Code,
  BookOpen,
  PenTool,
  BrainCircuit,
  Sparkles,
  Scale,
  Paperclip,
  Mic2,
  MicVocal,
  MicVocalIcon,
  Voicemail,
  Ear,
  EarIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { AdvancedSearch } from "../advanced-seach";

export function AIAssistantInterface() {
  const [isListening, setIsListening] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [researchEnabled, setDeepResearchEnabled] = useState(false);
  const [reasonEnabled, setReasonEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const [activeCommandCategory, setActiveCommandCategory] = useState<
    string | null
  >(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandSuggestions = {
    learn: [
      "Explain the Big Bang theory",
      "How does photosynthesis work?",
      "What are black holes?",
      "Explain quantum computing",
      "How does the human brain work?",
    ],
    write: [
      "Write a professional email to a client",
      "Create a product description for a smartphone",
      "Draft a blog post about AI",
      "Write a creative story about space exploration",
      "Create a social media post about sustainability",
    ],
    legal: [
      "What are the key steps to file for bankruptcy?",
      "Explain the legal implications of a non-disclosure agreement",
      "How does copyright law apply to digital content?",
      "What is the process for patent registration?",
      "How to draft a basic contract for freelancers?",
    ],
  };

  // Handle voice search
  // Handle voice search
  const handleVoiceSearch = () => {
    // Check if the browser supports the Web Speech API
    if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
      const SpeechRecognition = window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      setIsListening(true)

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
        console.log(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      alert("Voice search is not supported in your browser")
    }
  }
  const handleUploadFile = () => {
    setShowUploadAnimation(true);

    // Simulate file upload with timeout
    setTimeout(() => {
      const newFile = `Document.pdf`;
      setUploadedFiles((prev) => [...prev, newFile]);
      setShowUploadAnimation(false);
    }, 1500);
  };

  const handleCommandSelect = (command: string) => {
    setInputValue(command);
    setActiveCommandCategory(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      console.log("Sending message:", inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-transparent px-5 py-[17px]">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center rounded-4xl">
        <div className="w-full px-2 bg-white/10 backdrop-blur-[2px] rounded-4xl focus-within:shadow-xl transition-all duration-400 border-2 border-indigo-600/60 overflow-hidden mb-4">
          <div className="flex items-center gap-4">
            <Sparkles className="h-5 w-5 text-indigo-600 mt-5 ml-6" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full h-10 text-gray-700 pt-8 pb-4 pr-4 text-base outline-none font-medium placeholder:text-gray-400"
            />
          </div>
          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="px-4 pt-3">
              <div className="flex flex-wrap gap-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-transparent py-1 px-2 rounded-md border border-indigo-600"
                  >
                    <FileText className="w-3 h-3 text-indigo-600" />
                    <span className="text-xs text-gray-700">{file}</span>
                    <button
                      onClick={() =>
                        setUploadedFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search, Research, Reason functions and actions */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchEnabled(!searchEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${searchEnabled
                  ? "bg-indigo-200 text-indigo-600"
                  : "bg-white-10 text-black/40"
                  }`}
              >
                <Scale className="w-4 h-4" />
                <span>Consulting</span>
              </button>
              <button
                onClick={() => setDeepResearchEnabled(!researchEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${researchEnabled
                  ? "bg-indigo-200 text-indigo-600"
                  : "bg-white-10 text-black/40"
                  }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    researchEnabled ? "text-indigo-600" : "text-gray-400"
                  }
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="8" cy="8" r="3" fill="currentColor" />
                </svg>
                <span>Researching</span>
              </button>
              <button
                onClick={() => setReasonEnabled(!reasonEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${reasonEnabled
                  ? "bg-indigo-200 text-indigo-600"
                  : "bg-white-10 text-black/40"
                  }`}
              >
                <BrainCircuit
                  className={`w-4 h-4 ${reasonEnabled ? "text-indigo-600" : "text-gray-400"
                    }`}
                />
                <span>Reasoning</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 mr-1" onClick={handleVoiceSearch}>
                {isListening
                  ?
                  <>
                    <EarIcon className="animate-pulse text-indigo-700" />
                  </>
                  :
                  <>
                    <Mic className="h-6 w-6 hover:scale-110 text-indigo-800" />
                  </>
                }
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${inputValue.trim()
                  ? "text-white animate-gradient"
                  : "border-2 border-indigo-600 text-indigo-600 cursor-not-allowed"
                  }`}              >
                <ArrowUp className="w-4 h-4 stroke-3" />
              </button>
            </div>
          </div>

          {/* Upload files */}
          <div className="px-4 gap-4 py-4 flex justify-center border-t-[3px] border-dotted border-indigo-600 items-center">
            <Button
              onClick={handleUploadFile}
              className="flex items-center gap-2 rounded-full text-gray-600 text-sm bg-transparent shadow-none hover:bg-indigo-400/30 px-8 py-2 hover:text-indigo-900 hover:scale-105 transition-all duration-150"
            >
              {showUploadAnimation ? (
                <motion.div
                  className="flex space-x-1"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-indigo-600 rounded-full"
                      variants={{
                        hidden: { opacity: 0, y: 5 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.4,
                            repeat: Infinity,
                            repeatType: "mirror",
                            delay: i * 0.1,
                          },
                        },
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <Paperclip className="w-4 h-4" />
              )}
              {showUploadAnimation ? <>
                <span>Attaching...</span>
              </> :
                <span>Attach</span>
              }
            </Button>
          </div>
        </div>

        {/* Command categories */}
        <div className="w-full grid grid-cols-3 gap-4 mb-4">
          <CommandButton
            icon={<BookOpen className="w-5 h-5" />}
            label="Learn"
            isActive={activeCommandCategory === "learn"}
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === "learn" ? null : "learn"
              )
            }
          />
          <CommandButton
            icon={<PenTool className="w-5 h-5" />}
            label="Write"
            isActive={activeCommandCategory === "write"}
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === "write" ? null : "write"
              )
            }
          />
          <CommandButton
            icon={<Scale className="w-5 h-5" />}
            label="Legal"
            isActive={activeCommandCategory === "legal"}
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === "legal" ? null : "legal"
              )
            }
          />
        </div>

        {/* Command suggestions */}
        <AnimatePresence>
          {activeCommandCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full mb-6 overflow-hidden"
            >
              <div className="bg-white/10 backdrop-blur-[2px] rounded-xl border-2 border-indigo-600 shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {commandSuggestions[
                    activeCommandCategory as keyof typeof commandSuggestions
                  ].map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleCommandSelect(suggestion)}
                      className="hover:bg-indigo-400/20 px-8 py-5 cursor-pointer transition-colors duration-75"
                    >
                      <div className="flex items-center gap-3">
                        {activeCommandCategory === "learn" ? (
                          <BookOpen className="w-4 h-4 text-indigo-600" />
                        ) : activeCommandCategory === "write" ? (
                          <PenTool className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Scale className="w-4 h-4 text-indigo-600" />
                        )}
                        <span className="text-sm text-gray-700">
                          {suggestion}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface CommandButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function CommandButton({ icon, label, isActive, onClick }: CommandButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 duration-500 rounded-xl border transition-all ${isActive
        ? "backdrop-blur-[2px] shadow-xl border-2 border-indigo-500"
        : "bg-transparent border-2 border-transparent"
        }`}
    >
      <div className={`${isActive ? "text-indigo-600" : "text-gray-500"}`}>
        {icon}
      </div>
      <span
        className={`text-sm font-medium ${isActive ? "text-indigo-700" : "text-gray-700"
          }`}
      >
        {label}
      </span>
    </motion.button>
  );
}
