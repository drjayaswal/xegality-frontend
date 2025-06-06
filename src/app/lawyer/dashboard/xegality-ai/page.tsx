"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  FileText,
  Mic,
  Paperclip,
  User,
  Brain,
  EarIcon,
  X,
  ImageIcon,
  SendHorizonal,
} from "lucide-react";
import SiriWave from "@/components/ui/ai";
import { useSearchParams } from "next/navigation";
import { useQueryStore } from "@/stores/query-store";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "suggestion";
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: Date;
}

export default function XegalityAI() {
  const searchParams = useSearchParams();
  const { query, isProcessing, setQuery, setIsProcessing, clearQuery } =
    useQueryStore();

  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [hasAutoSearched, setHasAutoSearched] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const isReadyToSend = inputValue.trim().length > 0;
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize query from URL params and auto-search
  const hasSentInitialQuery = useRef(false);

  useEffect(() => {
    const urlQuery = searchParams.get("query");

    if (urlQuery && !hasSentInitialQuery.current) {
      hasSentInitialQuery.current = true;
      setQuery(urlQuery);
      setInputValue(urlQuery);

      setTimeout(() => {
        handleSendMessage(urlQuery);
      }, 100);
    }
  }, [searchParams]);

  // Sync input value with store query
  useEffect(() => {
    if (query && query !== inputValue) {
      setInputValue(query);
    }
  }, [query]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setShowUploadAnimation(true);

    // Process each file
    Array.from(files).forEach((file) => {
      // Simulate upload delay
      setTimeout(() => {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          uploadedAt: new Date(),
        };
        setUploadedFiles((prev) => [...prev, newFile]);
        setShowUploadAnimation(false);
      }, 1500);
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const getFileIcon = (fileType: string, fileName: string) => {
    if (fileType.includes("pdf"))
      return <FileText className="h-5 w-5 text-red-500" />;
    if (
      fileType.includes("word") ||
      fileType.includes("document") ||
      fileName.includes(".doc")
    )
      return <ImageIcon className="h-5 w-5 text-slate-500" />;
    if (fileType.includes("image"))
      return <ImageIcon className="h-5 w-5 text-green-500" />;
    return <ImageIcon className="h-5 w-5 text-purple-500" />;
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle voice search
  const handleVoiceSearch = () => {
    // Check if the browser supports the Web Speech API
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
        setQuery(transcript);
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

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue;
    console.log("called with input: ", content);

    if (!content.trim()) return;

    setIsProcessing(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    clearQuery();
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
      setIsProcessing(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "I understand you need assistance with that. Let me analyze the relevant legal frameworks and provide you with comprehensive guidance based on current case law and regulations.",
      "Based on my analysis of similar cases and legal precedents, I can provide you with several strategic approaches to consider for your situation.",
      "I've reviewed the relevant statutes and case law. Here are the key points you should consider, along with potential risks and opportunities.",
      "Let me break down the legal implications and provide you with actionable insights based on the latest legal developments in this area.",
      "I can help you with that. Based on my knowledge of legal best practices and current regulations, here's what I recommend for your specific situation.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setQuery(value);
  };

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  return (
    <div className="shadow-lg border-[1.5px] bg-gray-50 flex flex-col relative rounded-lg h-full">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header - Fixed at top */}
      <div className="sticky top-0 z-30 h-24 bg-amber-700/5 overflow-hidden rounded-t-md">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-fit flex items-center justify-center opacity-50">
            <SiriWave
              colors={[
                "#334155", // slate-700
                "#1e293b", // slate-800
                "#ca8a04", // amber-600
                "#b45309", // amber-700
              ]}
              isWaveMode={
                isListening || isTyping || inputValue !== "" || isProcessing
              }
            />
          </div>
        </div>
      </div>

      {/* Chat Messages - Scrollable area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full px-5 py-10 bg-amber-700/5">
          <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={cn(
                      "flex gap-2",
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    {message.sender === "ai" && (
                      <div className="w-10 h-10 bg-amber-600 rounded-full rounded-r-none flex items-center justify-center shadow-md">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] p-4 relative rounded-2xl shadow-none duration-200 hover:shadow-lg",
                        message.sender === "user"
                          ? "-mr-2 bg-gray-50/20 backdrop-blur-lg dark:text-white/90 text-black/90 rounded-tr-none"
                          : "-ml-2 bg-gray-50/20 backdrop-blur-lg dark:text-white/90 text-black/90 rounded-tl-none"
                      )}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p className="text-xs mt-2 text-black/40 dark:text-white/40">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="w-10 h-10 bg-slate-500 rounded-full rounded-l-none flex items-center justify-center shadow-md">
                        <User className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-10 h-10 animate-gradient rounded-full flex items-center justify-center shadow-none">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                </motion.div>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Floating Uploaded Files Display */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-24 overflow-visible left-6 right-6 z-40"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 max-h-100 overflow-hidden">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="relative group bg-gray-50/30 backdrop-blur-md rounded-2xl p-2 border border-white/10 dark:border-black/20 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 p-1 bg-gray-50/70 rounded-md">
                      {getFileIcon(file.type, file.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-xs font-medium text-gray-800 dark:text-white truncate"
                        title={file.name}
                      >
                        {file.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {file.size}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 p-0 hover:bg-red-500 hover:text-white text-red-500"
                    >
                      <X className="h-3 w-3 stroke-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Animation Overlay */}
      <AnimatePresence>
        {showUploadAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-xs flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-50/30 dark:bg-black/30 rounded-2xl p-8 flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-12 h-12 border-4 border-slate-500 border-t-transparent rounded-full"
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Uploading Document
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Please wait while we process your file...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area - Fixed at bottom */}
      <div className="sticky bottom-0 left-0 w-full z-30 bg-amber-700/5 backdrop-blur-sm rounded-b-md">
        <div className="pt-4 px-4 pb-0 rounded-none">
          <div className="flex items-center gap-1 py-2 rounded-none">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask Xegality AI anything about law, cases, or legal research..."
                disabled={isProcessing}
                className="w-full py-2.5 pr-24 pl-4 font-medium
                 rounded-l-2xl border-none shadow-sm focus-visible:ring-0 text-gray-500
                bg-gray-50/30
              dark:hover:bg-gray-50/20 rounded-2xl focus-visible:shadow-inner
              transition-all duration-150"
              />
            </div>

            {/* Upload Button */}
            <Button
              onClick={handleUploadClick}
              disabled={showUploadAnimation || isProcessing}
              className="relative h-10 w-10 min-w-[2.5rem] flex items-center justify-center 
bg-gray-50/30 dark:bg-gray-50/10 
hover:bg-gray-50/40 dark:hover:bg-gray-50/20 
rounded-2xl shadow-sm active:shadow-inner 
transition-all duration-150"
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
                      className="w-1.5 h-1.5 bg-amber-600 rounded-full"
                      variants={{
                        hidden: { opacity: 0, y: 5 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.4,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "mirror",
                            delay: i * 0.1,
                          },
                        },
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <Paperclip className="w-5 h-5 text-black/70 dark:text-white/70" />
              )}
            </Button>

            {/* Voice Button */}
            <Button
              className="relative h-10 w-10 min-w-[2.5rem] flex items-center justify-center 
    bg-gray-50/30 dark:bg-gray-50/10 
    hover:bg-gray-50/40 dark:hover:bg-gray-50/20 
    rounded-2xl shadow-sm active:shadow-inner 
    transition-all duration-150 overflow-visible"
              onClick={handleVoiceSearch}
              disabled={isProcessing}
            >
              {isListening && (
                // Ripple container
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute inset-0 m-auto w-full h-full rounded-2xl bg-amber-700/20 pointer-events-none"
                      initial={{ scale: 1, opacity: 0.4 }}
                      animate={{ scale: 2.8, opacity: 0 }}
                      transition={{
                        duration: 2.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </>
              )}
              {isListening ? (
                <EarIcon className="h-5 w-5 text-black z-10" />
              ) : (
                <Mic className="h-5 w-5 text-black" />
              )}
            </Button>

            {/* Send Button */}
            <Button
              disabled={!isReadyToSend || isTyping || isProcessing}
              onClick={() => handleSendMessage()}
              className={`relative h-10 w-10 min-w-[2.5rem] flex items-center justify-center
                rounded-2xl overflow-hidden transition-all duration-200
                ${
                  isReadyToSend && !isTyping && !isProcessing
                    ? "bg-gray-50/30 dark:bg-gray-50/10 hover:bg-gray-50/40 dark:hover:bg-gray-50/20 shadow-sm active:shadow-inner"
                    : "bg-transparent shadow-none"
                }`}
            >
              <AnimatePresence mode="wait">
                {!isReadyToSend || isProcessing ? (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center"
                  >
                    <SendHorizonal className="text-black/40" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 text-black -rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
          <p className="text-[8px] text-center mt-2 mb-2 text-black/40 dark:text-white/40">
            Xegality AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
