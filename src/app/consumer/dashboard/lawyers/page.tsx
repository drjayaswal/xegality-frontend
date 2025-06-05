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
  FileText,
  ImageIcon,
  File,
  ArrowRight,
  Plus,
  SendHorizonal,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Lawyer {
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
  client: Lawyer;
  messages: Message[];
  unreadCount: number;
  lastMessage: Message;
  isPinned: boolean;
}

export default function Lawyers() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "file_1",
      name: "Merger_Agreement_Draft.pdf",
      size: "2.4 MB",
      type: "application/pdf",
      uploadedAt: new Date(Date.now() - 2400000),
    },
  ]);
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
  const [showDocuments, setShowDocuments] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isReadyToSend, setIsReadyToSend] = useState(false);

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
          id: "file_1",
          content: "Uploaded: Merger_Agreement_Draft.pdf",
          sender: "lawyer",
          timestamp: new Date(Date.now() - 2400000),
          status: "read",
          type: "file",
          fileName: "Merger_Agreement_Draft.pdf",
          fileSize: "2.4 MB",
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
    if (!files || !selectedConversation) return;

    setShowUploadAnimation(true);

    // Process each file
    Array.from(files).forEach((file, index) => {
      // Simulate upload delay
      setTimeout(() => {
        const fileId = Date.now().toString() + Math.random();
        const newFile: UploadedFile = {
          id: fileId,
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          uploadedAt: new Date(),
        };

        // Add to uploaded files list
        setUploadedFiles((prev) => [...prev, newFile]);

        // Create a file message
        const fileMessage: Message = {
          id: fileId + "_message",
          content: `Uploaded: ${file.name}`,
          sender: "lawyer",
          timestamp: new Date(),
          status: "sent",
          type: "file",
          fileName: file.name,
          fileSize: formatFileSize(file.size),
        };

        // Add file message to conversation
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConversation
              ? {
                ...conv,
                messages: [...conv.messages, fileMessage],
                lastMessage: fileMessage,
              }
              : conv
          )
        );

        setShowUploadAnimation(false);
      }, 1500 + index * 500); // Stagger uploads
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
    if (messagesEndRef.current && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
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

  useEffect(() => {
    setIsReadyToSend(inputValue.trim() !== "");
  }, [inputValue]);

  return (
    <div className="w-full border-[1.5px] max-h-[calc(100svh-16px)] h-full dark:bg-black bg-white rounded-lg">
      <div className="w-full h-full rounded-lg overflow-hidden flex relative">
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
                <div className="relative">
                  {searchQuery && (
                    <>
                      <ArrowRight className="absolute left-3 top-2 h-5 w-5 text-accent-violet" />
                    </>
                  )}
                  <Input
                    placeholder="Search Lawyers"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "bg-transparent rounded-2xl text-left focus-visible:ring-0 border-2 border-accent-violet/30 focus-visible:scale-105 focus-visible:border-accent-violet/40 transition-all duration-150 dark:placeholder:text-white/40 placeholder:text-black/40",
                      searchQuery != "" ? "pl-11" : "text-left"
                    )}
                  />
                </div>
              </div>

              {/* Conversations List */}
              <ScrollArea className="flex border-t-2 border-accent-violet/50 ">
                <div className="p-5 h-[calc(100vh-20rem)]">
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
                          "px-4 py-3 rounded-[36px] border border-transparent cursor-pointer transition-all duration-200 mb-2 relative",
                          selectedConversation === conversation.id
                            ? "bg-accent-violet/5 backdrop-blur-lg shadow-lg"
                            : "hover:border-gray-200 backdrop-blur-sm m-2"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-accent-violet rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-800 dark:text-white truncate">
                                {conversation.client.name.split(" ")[0]}
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
            "flex-1 flex h-full max-h-full",
            isMobileView && showSidebar ? "hidden md:flex" : "flex"
          )}
        >
          {selectedConversation ? (
            <>
              {/* Main Chat Section */}
              <div className="flex-1 flex flex-col h-full">
                {/* Chat Header - Fixed at top */}
                <div
                  className={`flex-shrink-0 px-4 py-[8px] bg-accent-violet/10 border-b-2 ${activeButton == "phone"
                    ? "border-b-sky-500"
                    : activeButton == "video"
                      ? "border-b-green-500"
                      : "border-b-accent-violet/50"
                    } `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 p-2">
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
                        <div className="w-10 h-10 p-2 bg-accent-violet rounded-full flex items-center justify-center">
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 rounded-full ${activeButton === "phone"
                          ? "bg-sky-500 hover:bg-sky-500 hover:text-white text-white"
                          : ""
                          }`}
                        onClick={() =>
                          setActiveButton(
                            activeButton === "phone" ? null : "phone"
                          )
                        }
                      >
                        <Phone className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 flex gap-1 rounded-full ${activeButton === "video"
                          ? "bg-green-500 hover:bg-green-500 hover:text-white text-white"
                          : ""
                          }`}
                        onClick={() =>
                          setActiveButton(
                            activeButton === "video" ? null : "video"
                          )
                        }
                      >
                        <Video className="h-4 w-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
                            aria-label="More Options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          side="bottom"
                          align="end"
                          className="w-52 rounded-xl border border-white/10 bg-white/70 dark:bg-black/50 backdrop-blur-md shadow-lg text-sm text-black dark:text-white"
                        >
                          <DropdownMenuItem
                            onClick={() => alert("View Profile")}
                            className="hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-colors"
                          >
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert("Mute Notifications")}
                            className="hover:bg-yellow-500/10 dark:hover:bg-yellow-500/20 transition-colors"
                          >
                            Mute Notifications
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert("Report User")}
                            className="hover:bg-orange-500/10 dark:hover:bg-orange-500/20 transition-colors"
                          >
                            Report
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="my-1 bg-white/20" />

                          <DropdownMenuItem
                            onClick={() => alert("Blocked")}
                            className="text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-colors"
                          >
                            Block
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                {/* Messages Container - Scrollable area only */}
                <div className="flex-1 min-h-0 bg-accent-violet/10 relative overflow-hidden">
                  <ScrollArea className="h-full" ref={scrollAreaRef}>
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
                                  "bg-accent-violet rounded-full rounded-r-none"
                                )}
                              >
                                <User className="h-4 w-4 text-white" />
                              </div>
                            )}
                            <div
                              className={cn(
                                "max-w-[70%] rounded-2xl shadow-sm",
                                message.sender === "lawyer"
                                  ? "-mr-2 rounded-tr-none"
                                  : "-ml-2 rounded-tl-none"
                              )}
                            >
                              {message.type === "file" ? (
                                // File Message
                                <div
                                  className={cn(
                                    "p-3 bg-white/30 backdrop-blur-lg border border-white/20",
                                    message.sender === "lawyer"
                                      ? "rounded-tr-none"
                                      : "rounded-tl-none",
                                    "rounded-2xl"
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 p-2 rounded-lg">
                                      {getFileIcon(
                                        message.fileName?.split(".").pop() ||
                                        "",
                                        message.fileName || ""
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                        {message.fileName?.slice(0, 4)}...
                                        {
                                          message.fileName?.split(".")[
                                          message.fileName?.split(".")
                                            .length - 1
                                          ]
                                        }
                                      </h4>
                                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                                        {message.fileSize}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 mt-3"></div>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs opacity-70">
                                      {message.timestamp.toLocaleTimeString(
                                        [],
                                        {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        }
                                      )}
                                    </span>
                                    {message.sender === "lawyer" && (
                                      <div className="ml-2">
                                        {getMessageStatusIcon(message.status)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                // Text Message
                                <div
                                  className={cn(
                                    "p-3 bg-white/20 backdrop-blur-lg dark:text-white/90 text-black/90",
                                    message.sender === "lawyer"
                                      ? "rounded-tr-none"
                                      : "rounded-tl-none",
                                    "rounded-2xl"
                                  )}
                                >
                                  <p className="text-sm leading-relaxed">
                                    {message.content}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs opacity-70">
                                      {message.timestamp.toLocaleTimeString(
                                        [],
                                        {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        }
                                      )}
                                    </span>
                                    {message.sender === "lawyer" && (
                                      <div className="ml-2">
                                        {getMessageStatusIcon(message.status)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            {message.sender === "lawyer" && (
                              <div className="w-8 h-8 rounded-l-none bg-accent-violet rounded-full flex items-center justify-center">
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
                          <div className="w-8 h-8 bg-accent-violet rounded-full flex items-center justify-center shadow-md">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div className="bg-transparent dark:text-white/90 text-black/90 -ml-3 mt-1 p-2 rounded-2xl rounded-l-none shadow-none">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-accent-violet rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-accent-violet rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-accent-violet rounded-full animate-bounce"
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

                {/* Input Area - Fixed at bottom */}
                <div className="flex-shrink-0 p-4 bg-accent-violet/10">
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
                    <Button
                      onClick={handleUploadClick}
                      disabled={showUploadAnimation}
                      className="flex items-center gap-2 rounded-full text-gray-600 text-sm shadow-none hover:bg-transparent border-1 border-transparent hover:border-accent-violet/80 px-4 md:px-8 py-2 hover:text-indigo-900 hover:scale-105 transition-all duration-150 w-full md:w-auto mb-2 md:mb-0 bg-accent-violet/5"
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
                        <Paperclip className="w-4 h-4 text-accent-violet dark:text-white/70" />
                      )}
                      {showUploadAnimation ? (
                        <>
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <span className="text-accent-violet dark:text-white/70">
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
                        className="bg-white/20 text-left focus-visible:ring-0 border-1 border-accent-violet/40 focus-visible:border-accent-violet/40 transition-all duration-150 dark:placeholder:text-white/40 placeholder:text-black/40"
                      />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto justify-end mt-2 md:mt-0">
                      <Button
                        className="h-10 w-10 bg-accent-violet hover:bg-accent-violet hover:scale-110 text-white rounded-full"
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
                        className="h-10 w-10 p-0 bg-accent-violet hover:bg-accent-violet hover:scale-110 text-white rounded-full"
                      >
                        <AnimatePresence mode="wait">
                          {!isReadyToSend ? (
                            <motion.div
                              key="idle"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center justify-center"
                            >
                              <SendHorizonal className="text-white" />
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
                              <Send className="h-5 w-5 text-white -rotate-45" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md px-4">
                <User className="h-16 w-16 mx-auto text-accent-violet dark:text-white/60 mb-6" />
                <h2 className="text-2xl font-bold text-accent-violet dark:text-white/90 mb-4">
                  Lawyer Conversation
                </h2>
                <p className="dark:text-white/70 text-accent-violet mb-6">
                  Choose a lawyer from the sidebar to start conversation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
