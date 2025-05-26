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
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Mic,
  User,
  CheckCheck,
  Check,
  EarIcon,
  X,
  FileText,
  ImageIcon,
  File,
  ArrowRight,
  Plus,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  lastSeen?: Date;
  caseType: string;
  priority: "high" | "medium" | "low";
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: Date;
}

interface Message {
  id: string;
  content: string;
  sender: "client" | "lawyer";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  type: "text" | "file" | "image";
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
}

interface Conversation {
  id: string;
  client: Client;
  messages: Message[];
  unreadCount: number;
  lastMessage: Message;
  isPinned: boolean;
}

export default function Clients() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      client: {
        id: "1",
        name: "Sarah Johnson",
        status: "online",
        caseType: "Corporate Law",
        priority: "high",
      },
      messages: [
        {
          id: "1",
          content:
            "Hi, I need to discuss the merger documents we reviewed yesterday.",
          sender: "client",
          timestamp: new Date(Date.now() - 3600000),
          status: "read",
          type: "text",
        },
        {
          id: "2",
          content:
            "Of course! I've reviewed the documents and have some recommendations. When would be a good time to discuss them?",
          sender: "lawyer",
          timestamp: new Date(Date.now() - 3000000),
          status: "read",
          type: "text",
        },
        {
          id: "3",
          content: "How about tomorrow at 2 PM? I'll be available for a call.",
          sender: "client",
          timestamp: new Date(Date.now() - 1800000),
          status: "read",
          type: "text",
        },
      ],
      unreadCount: 0,
      lastMessage: {
        id: "3",
        content: "How about tomorrow at 2 PM? I'll be available for a call.",
        sender: "client",
        timestamp: new Date(Date.now() - 1800000),
        status: "read",
        type: "text",
      },
      isPinned: true,
    },
    {
      id: "2",
      client: {
        id: "2",
        name: "Michael Chen",
        status: "away",
        lastSeen: new Date(Date.now() - 7200000),
        caseType: "Real Estate",
        priority: "medium",
      },
      messages: [
        {
          id: "1",
          content:
            "The property inspection report is ready. Should I send it over?",
          sender: "client",
          timestamp: new Date(Date.now() - 7200000),
          status: "delivered",
          type: "text",
        },
      ],
      unreadCount: 1,
      lastMessage: {
        id: "1",
        content:
          "The property inspection report is ready. Should I send it over?",
        sender: "client",
        timestamp: new Date(Date.now() - 7200000),
        status: "delivered",
        type: "text",
      },
      isPinned: false,
    },
    {
      id: "3",
      client: {
        id: "3",
        name: "Emily Rodriguez",
        status: "offline",
        lastSeen: new Date(Date.now() - 86400000),
        caseType: "Family Law",
        priority: "low",
      },
      messages: [
        {
          id: "1",
          content:
            "Thank you for handling my case so professionally. The outcome was better than expected!",
          sender: "client",
          timestamp: new Date(Date.now() - 86400000),
          status: "read",
          type: "text",
        },
        {
          id: "2",
          content:
            "I'm so glad we could achieve a positive outcome for you. Please don't hesitate to reach out if you need anything else.",
          sender: "lawyer",
          timestamp: new Date(Date.now() - 82800000),
          status: "read",
          type: "text",
        },
      ],
      unreadCount: 0,
      lastMessage: {
        id: "2",
        content:
          "I'm so glad we could achieve a positive outcome for you. Please don't hesitate to reach out if you need anything else.",
        sender: "lawyer",
        timestamp: new Date(Date.now() - 82800000),
        status: "read",
        type: "text",
      },
      isPinned: false,
    },
  ]);

  const currentConversation = conversations.find(
    (conv) => conv.id === selectedConversation
  );

  const handleSendMessage = () => {
    if (!inputValue.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "lawyer",
      timestamp: new Date(),
      status: "sent",
      type: "text",
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage,
            }
          : conv
      )
    );

    setInputValue("");

    // Simulate client typing and response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const clientResponse: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "Thank you for the quick response! I'll review this and get back to you.",
          sender: "client",
          timestamp: new Date(),
          status: "delivered",
          type: "text",
        };

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConversation
              ? {
                  ...conv,
                  messages: [...conv.messages, clientResponse],
                  lastMessage: clientResponse,
                }
              : conv
          )
        );
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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

  const getFileIcon = (fileType: string, fileName: string) => {
    if (fileType.includes("pdf"))
      return <FileText className="h-5 w-5 text-red-500" />;
    if (
      fileType.includes("word") ||
      fileType.includes("document") ||
      fileName.includes(".doc")
    )
      return <FileText className="h-5 w-5 text-blue-500" />;
    if (fileType.includes("image"))
      return <ImageIcon className="h-5 w-5 text-green-500" />;
    return <File className="h-5 w-5 text-purple-500" />;
  };

  const getFileColor = (fileType: string, fileName: string) => {
    if (fileType.includes("pdf"))
      return "from-red-500/20 to-red-600/20 border-red-500/30";
    if (
      fileType.includes("word") ||
      fileType.includes("document") ||
      fileName.includes(".doc")
    )
      return "from-blue-500/20 to-blue-600/20 border-blue-500/30";
    if (fileType.includes("image"))
      return "from-green-500/20 to-green-600/20 border-green-500/30";
    return "from-purple-500/20 to-purple-600/20 border-purple-500/30";
  };

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

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

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

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentConversation?.messages, isTyping]);

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowSidebar(!selectedConversation);
      } else {
        setShowSidebar(true);
      }
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, [selectedConversation]);

  return (
    <div className="w-full h-full dark:bg-black bg-white rounded-2xl">
      <div className="w-full h-full bg-gradient-to-r from-[#3b82f6]/10 to-[#3b82f6]/40 rounded-2xl overflow-hidden flex relative">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Conversations Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={isMobileView ? { x: -300, opacity: 0 } : { opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={isMobileView ? { x: -300, opacity: 0 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                isMobileView
                  ? "absolute inset-y-0 left-0 z-20 w-full md:w-80"
                  : "w-80"
              )}
            >
              {/* Header */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  {isMobileView && selectedConversation && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={toggleSidebar}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                <div className="relative">
                  {searchQuery && (
                    <>
                      <ArrowRight className="absolute left-3 top-2 h-5 w-5 text-[#3b82f6]" />
                    </>
                  )}
                  <Input
                    placeholder="Search Clients"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "bg-white/20 rounded-2xl text-left focus-visible:ring-0 border-1 border-[#3b82f6]/40 focus-visible:scale-105 focus-visible:border-[#3b82f6]/40 transition-all duration-150 dark:placeholder:text-white/40 placeholder:text-black/40",
                      searchQuery != "" ? "text-center" : "text-left"
                    )}
                  />
                </div>
              </div>

              {/* Conversations List */}
              <ScrollArea className="flex-1 h-[calc(100vh-140px)]">
                <div className="px-3 py-2">
                  {conversations
                    .filter(
                      (conv) =>
                        conv.client.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        conv.client.caseType
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    )
                    .sort((a, b) => {
                      if (a.isPinned && !b.isPinned) return -1;
                      if (!a.isPinned && b.isPinned) return 1;
                      return (
                        b.lastMessage.timestamp.getTime() -
                        a.lastMessage.timestamp.getTime()
                      );
                    })
                    .map((conversation) => (
                      <motion.div
                        key={conversation.id}
                        onClick={() => {
                          setSelectedConversation(conversation.id);
                          if (isMobileView) {
                            setShowSidebar(false);
                          }
                        }}
                        className={cn(
                          "px-4 py-3 rounded-[36px] cursor-pointer transition-all duration-200 mb-2 relative",
                          selectedConversation === conversation.id
                            ? "bg-white/30 backdrop-blur-lg shadow-lg"
                            : "hover:bg-white/20 backdrop-blur-sm m-2"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-[#3b82f6] rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-800 dark:text-white truncate">
                                {conversation.client.name}
                              </h3>
                              <div className="flex items-center gap-1 justify-center mr-6">
                                <span className="text-xs text-black dark:text-white/40">
                                  {conversation.lastMessage.timestamp.toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-600 dark:text-gray-300">
                                {conversation.client.caseType}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div
          className={cn(
            "flex-1 flex flex-col",
            isMobileView && showSidebar ? "hidden md:flex" : "flex"
          )}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="px-4 py-6 bg-[#3b82f6]/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isMobileView && !showSidebar && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 mr-1"
                        onClick={toggleSidebar}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="relative">
                      <div className="w-10 h-10 bg-[#3b82f6] rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        {currentConversation!.client.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {currentConversation!.client.status === "online"
                          ? "Online"
                          : currentConversation!.client.lastSeen
                          ? `Last seen ${currentConversation!.client.lastSeen.toLocaleTimeString()}`
                          : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea
                  className="h-full bg-[#3b82f6]/10"
                  ref={scrollAreaRef}
                >
                  <div className="p-4 space-y-4">
                    <AnimatePresence>
                      {currentConversation!.messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={cn(
                            "flex gap-2",
                            message.sender === "lawyer"
                              ? "justify-end"
                              : "justify-start"
                          )}
                        >
                          {message.sender === "client" && (
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center",
                                "bg-[#3b82f6] rounded-full rounded-r-none"
                              )}
                            >
                              <User className="h-4 w-4 text-white" />
                            </div>
                          )}
                          <div
                            className={cn(
                              "max-w-[70%] p-3 rounded-2xl shadow-sm",
                              message.sender === "lawyer"
                                ? "-mr-2 bg-white/20 backdrop-blur-lg dark:text-white/90 text-black/90 rounded-tr-none"
                                : "-ml-2 bg-white/20 backdrop-blur-lg dark:text-white/90 text-black/90 rounded-tl-none"
                            )}
                          >
                            <p className="text-sm leading-relaxed">
                              {message.content}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              {message.sender === "lawyer" && (
                                <div className="ml-2">
                                  {getMessageStatusIcon(message.status)}
                                </div>
                              )}
                            </div>
                          </div>
                          {message.sender === "lawyer" && (
                            <div className="w-8 h-8 rounded-l-none bg-[#3b82f6] rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
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
                        <div className="w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center shadow-md">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="bg-transparent dark:text-white/90 text-black/90 -ml-3 mt-1 p-2 rounded-2xl rounded-l-none shadow-none">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 dark:bg-white/40 bg-black/40 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 dark:bg-white/40 bg-black/40 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 dark:bg-white/40 bg-black/40 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>

              {/* Floating Uploaded Files Display */}
              <AnimatePresence>
                {uploadedFiles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="absolute bottom-24 left-6 right-6 z-40"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 max-h-100 overflow-y-auto">
                      {uploadedFiles.map((file, index) => (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: { delay: index * 0.1 },
                          }}
                          exit={{ opacity: 0, scale: 0.8, y: -20 }}
                          whileHover={{
                            scale: 1.02,
                            y: -2,
                            transition: { duration: 0.2 },
                          }}
                          className="relative group bg-white backdrop-blur-md rounded-2xl p-2 border border-white/10 dark:border-black/20 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg">
                              {getFileIcon(file.type, file.name)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4
                                className="text-sm font-medium text-gray-800 dark:text-white truncate"
                                title={file.name}
                              >
                                {file.name}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                                {file.size}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {file.uploadedAt.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 p-0 hover:bg-[#3b82f6] hover:text-white text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Floating effect indicators */}
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                        </motion.div>
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
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl border border-white/20"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
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

              {/* Input Area */}
              <div className="p-4 bg-[#3b82f6]/10">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
                  <Button
                    onClick={handleUploadClick}
                    disabled={showUploadAnimation}
                    className="flex items-center gap-2 rounded-full text-gray-600 text-sm bg-transparent shadow-none hover:bg-transparent border-1 border-transparent hover:border-[#3b82f6]/80 px-4 md:px-8 py-2 hover:text-indigo-900 hover:scale-105 transition-all duration-150 w-full md:w-auto mb-2 md:mb-0"
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
                      <Paperclip className="w-4 h-4 text-[#3b82f6] dark:text-white/70" />
                    )}
                    {showUploadAnimation ? (
                      <>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <span className="text-[#3b82f6] dark:text-white/70">
                        Attach
                      </span>
                    )}
                  </Button>
                  <div className="flex-1 relative w-full">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="bg-white/20 text-left focus-visible:ring-0 border-1 border-[#3b82f6]/40 focus-visible:border-[#3b82f6]/40 transition-all duration-150 dark:placeholder:text-white/40 placeholder:text-black/40"
                    />
                  </div>
                  <div className="flex gap-2 w-full md:w-auto justify-end mt-2 md:mt-0">
                    <Button
                      className="h-10 w-10 bg-[#3b82f6] hover:bg-[#3b82f6] hover:scale-110 text-white rounded-full"
                      onClick={handleVoiceSearch}
                    >
                      {isListening ? (
                        <>
                          <EarIcon className="animate-pulse text-white" />
                        </>
                      ) : (
                        <>
                          <Mic className="h-8 w-8 text-white" />
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="h-10 w-10 p-0 bg-[#3b82f6] hover:bg-[#3b82f6] hover:scale-110 text-white rounded-full"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md px-4">
                <User className="h-16 w-16 mx-auto text-white/60 mb-6" />
                <h2 className="text-2xl font-bold text-white/90 mb-4">
                  Client Conversation
                </h2>
                <p className="text-white/70 mb-6">
                  Choose a client from the sidebar to start conversation
                </p>
                <Button className="bg-transparent text-white hover:text-black hover:bg-white backdrop-blur-sm border-2 border-white gap-2">
                  <Plus className="h-4 w-4" /> Start New Conversation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
