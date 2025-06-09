"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Mic,
  Smile,
  ImageIcon,
  File,
  Download,
  Play,
  Sun,
  Moon,
  Settings,
  Archive,
  Pin,
  Trash2,
  Reply,
  Forward,
  Copy,
  Check,
  CheckCheck,
  X,
  SendHorizonal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { AnimatePresence, motion } from "motion/react"

export default function ChatPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedChat, setSelectedChat] = useState(chats[0])
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSidebar, setShowSidebar] = useState(true)
  const [showRightSidebar, setShowRightSidebar] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedChat])

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage("")
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`h-full flex ${isDarkMode ? "dark" : ""}`}>
      <ResizablePanelGroup direction="horizontal" className="h-screen">
        {/* Left Sidebar */}
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          maxSize={40}
          className={`${showSidebar ? "" : "hidden"
            } border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h1>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-accent-violet/5 mb-2 scale-95 ${selectedChat.id === chat.id ? "bg-accent-violet/10 hover:bg-accent-violet/10 scale-100 dark:bg-blue-900/20" : ""}`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-accent-violet to-purple-500 text-white">
                        {chat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                    )}
                  </div>

                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{chat.name}</h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-blue-600 dark:text-blue-400">{chat.specialty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Main Chat Area */}
        <ResizablePanel defaultSize={showRightSidebar ? 50 : 75} minSize={40}>
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="lg:hidden h-8 w-8"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-accent-violet to-purple-500 text-white">
                      {selectedChat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">{selectedChat.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedChat.isOnline ? "Online" : `Last seen ${selectedChat.lastSeen}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 dark:text-gray-300">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowRightSidebar(!showRightSidebar)}
                    className="h-8 w-8 text-gray-600 dark:text-gray-300"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-transparent dark:bg-gray-800">
              <div className="space-y-4">
                {selectedChat.messages.map((msg, index) => (
                  <MessageBubble key={index} message={msg} isDarkMode={isDarkMode} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-600 dark:text-gray-300">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="dark:bg-gray-800 dark:border-gray-700">
                    <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Photo
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">
                      <File className="h-4 w-4 mr-2" />
                      Document
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-10 p-5 rounded-full bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 dark:text-white"
                  />
                </div>

                {message.trim() ? (
                  <Button
                    onClick={handleSendMessage}
                    className="h-10 w-10 rounded-full bg-accent-violet hover:bg-blue-600 text-white p-0"
                  >
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="h-10 w-10 p-0 bg-accent-violet hover:bg-accent-violet text-white rounded-full"
                    >
                      <motion.div
                        key="ready"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex items-center justify-center"
                      >
                        <Send className="h-5 w-5 text-white -rotate-45" />
                      </motion.div>
                    </Button>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsRecording(!isRecording)}
                    className={`h-10 w-10 rounded-full ${isRecording ? "bg-red-500 text-white" : "text-gray-600 dark:text-gray-300"
                      }`}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ResizablePanel>

        {showRightSidebar && (
          <>
            <ResizableHandle />

            {/* Right Sidebar - Chat Info */}
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
              <div className="border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-full">
                <div className="p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Chat Media</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowRightSidebar(false)}
                      className="h-8 w-8 text-gray-600 dark:text-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <Tabs defaultValue="media" className="w-full flex-1">
                    <TabsList className="grid w-full grid-cols-3 dark:bg-gray-800">
                      <TabsTrigger value="media" className="dark:data-[state=active]:bg-gray-700">
                        Media
                      </TabsTrigger>
                      <TabsTrigger value="files" className="dark:data-[state=active]:bg-gray-700">
                        Files
                      </TabsTrigger>
                      <TabsTrigger value="links" className="dark:data-[state=active]:bg-gray-700">
                        Links
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="media" className="mt-4 flex-1">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 dark:text-white">Shared Media</h3>
                          <Button variant="ghost" size="sm" className="text-accent-violet">
                            See All
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {sharedMedia.map((media, index) => (
                            <div
                              key={index}
                              className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
                            >
                              <img
                                src={media.url || "/placeholder.svg"}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="files" className="mt-4 flex-1">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 dark:text-white">Shared Files</h3>
                          <Button variant="ghost" size="sm" className="text-accent-violet">
                            See All
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {sharedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                                <File className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {file.size} • {file.date}
                                </p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="links" className="mt-4 flex-1">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 dark:text-white">Shared Links</h3>
                          <Button variant="ghost" size="sm" className="text-accent-violet">
                            See All
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {sharedLinks.map((link, index) => (
                            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
                              <CardContent className="p-3">
                                <div className="flex items-start space-x-3">
                                  <div className="h-12 w-12 bg-gradient-to-r from-accent-violet to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-sm">{link.domain[0].toUpperCase()}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                      {link.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{link.url}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{link.date}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  )
}

function MessageBubble({ message, isDarkMode }: { message: any; isDarkMode: boolean }) {
  const isOwn = message.sender === "me"

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} group`}>
      <div
        className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
      >
        {!isOwn && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={message.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-r from-accent-violet to-purple-500 text-white text-xs">
              {message.senderName?.split(" ").map((n: string) => n[0])}
            </AvatarFallback>
          </Avatar>
        )}

        <div className="space-y-1">
          {message.type === "text" && (
            <div
              className={`px-4 py-2 rounded-2xl ${isOwn
                ? "bg-accent-violet text-white rounded-br-md"
                : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md border border-gray-200 dark:border-gray-600"
                }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          )}

          {message.type === "image" && (
            <div className="relative">
              <img
                src={message.content || "/placeholder.svg"}
                alt=""
                className="max-w-xs rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
              />
              {message.caption && (
                <div
                  className={`mt-1 px-4 py-2 rounded-2xl ${isOwn
                    ? "bg-accent-violet text-white rounded-br-md"
                    : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md border border-gray-200 dark:border-gray-600"
                    }`}
                >
                  <p className="text-sm">{message.caption}</p>
                </div>
              )}
            </div>
          )}

          {message.type === "file" && (
            <div
              className={`px-4 py-3 rounded-2xl flex items-center space-x-3 ${isOwn
                ? "bg-accent-violet text-white rounded-br-md"
                : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md border border-gray-200 dark:border-gray-600"
                }`}
            >
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${isOwn ? "bg-blue-400" : "bg-gray-100 dark:bg-gray-600"}`}
              >
                <File className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{message.fileName}</p>
                <p className="text-xs opacity-70">{message.fileSize}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}

          {message.type === "voice" && (
            <div
              className={`px-4 py-3 rounded-2xl flex items-center space-x-3 ${isOwn
                ? "bg-accent-violet text-white rounded-br-md"
                : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md border border-gray-200 dark:border-gray-600"
                }`}
            >
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Play className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <div className={`h-1 rounded-full ${isOwn ? "bg-blue-300" : "bg-gray-300 dark:bg-gray-500"}`}>
                  <div className={`h-1 rounded-full w-1/3 ${isOwn ? "bg-white" : "bg-accent-violet"}`}></div>
                </div>
              </div>
              <span className="text-xs opacity-70">{message.duration}</span>
            </div>
          )}

          <div
            className={`flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 ${isOwn ? "justify-end" : ""}`}
          >
            <span>{message.time}</span>
            {isOwn && (
              <>
                {message.status === "sent" && <Check className="h-3 w-3" />}
                {message.status === "delivered" && <CheckCheck className="h-3 w-3" />}
                {message.status === "read" && <CheckCheck className="h-3 w-3 text-accent-violet" />}
              </>
            )}
          </div>
        </div>

        {/* Message Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">
                <Forward className="h-4 w-4 mr-2" />
                Forward
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700 text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

// Mock Data
const chats = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Corporate Law",
    avatar: "/placeholder.svg?height=48&width=48",
    lastMessage: "Hi, I need to discuss the merger documents we reviewed yesterday.",
    time: "12:50 PM",
    unreadCount: 2,
    isOnline: true,
    isPinned: true,
    messageStatus: "read",
    lastSeen: "2 minutes ago",
    messages: [
      {
        id: 1,
        type: "text",
        content: "Hi, I need to discuss the merger documents we reviewed yesterday.",
        sender: "other",
        senderName: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        time: "12:50 PM",
        status: "read",
      },
      {
        id: 2,
        type: "text",
        content:
          "Of course! I've reviewed the documents and have some recommendations. When would be a good time to discuss them?",
        sender: "me",
        time: "01:00 PM",
        status: "read",
      },
      {
        id: 3,
        type: "file",
        fileName: "Merger_Agreement_v2.pdf",
        fileSize: "2.4 MB",
        sender: "other",
        senderName: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        time: "01:10 PM",
        status: "delivered",
      },
      {
        id: 4,
        type: "text",
        content: "How about tomorrow at 2 PM? I'll be available for a call.",
        sender: "other",
        senderName: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        time: "01:20 PM",
        status: "sent",
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Real Estate",
    avatar: "/placeholder.svg?height=48&width=48",
    lastMessage: "The property documents are ready for review",
    time: "11:50 AM",
    unreadCount: 0,
    isOnline: false,
    isPinned: false,
    messageStatus: "delivered",
    lastSeen: "1 hour ago",
    messages: [
      {
        id: 1,
        type: "text",
        content: "The property documents are ready for review",
        sender: "other",
        senderName: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        time: "11:50 AM",
        status: "delivered",
      },
    ],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    specialty: "Family Law",
    avatar: "/placeholder.svg?height=48&width=48",
    lastMessage: "Thank you for your assistance with the custody case",
    time: "Yesterday",
    unreadCount: 0,
    isOnline: false,
    isPinned: false,
    messageStatus: "read",
    lastSeen: "Yesterday",
    messages: [
      {
        id: 1,
        type: "text",
        content: "Thank you for your assistance with the custody case",
        sender: "other",
        senderName: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        time: "Yesterday",
        status: "read",
      },
    ],
  },
]

const sharedMedia = [
  { url: "/placeholder.png" },
  { url: "/placeholder.png" },
  { url: "/placeholder.png" },
  { url: "/placeholder.png" },
  { url: "/placeholder.png" },
  { url: "/placeholder.png" },
]

const sharedFiles = [
  {
    name: "Contract_Agreement.pdf",
    size: "2.4 MB",
    date: "04.20.21",
  },
  {
    name: "Legal_Brief.docx",
    size: "1.2 MB",
    date: "04.19.21",
  },
  {
    name: "Case_Study.pdf",
    size: "3.1 MB",
    date: "04.18.21",
  },
]

const sharedLinks = [
  {
    title: "Legal Resources Portal",
    url: "https://legalresources.com/portal",
    domain: "legalresources.com",
    date: "04.20.21",
  },
  {
    title: "Court Filing Guidelines",
    url: "https://courtguidelines.gov/filing",
    domain: "courtguidelines.gov",
    date: "04.19.21",
  },
]
