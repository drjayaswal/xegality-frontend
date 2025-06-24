"use client"

import { useState } from "react"
import { Bell, CheckCircle, AlertCircle, FileText, MessageSquare, Calendar, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"

interface Notification {
  id: string
  type: "case-update" | "message" | "document" | "deadline" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "high" | "medium" | "low"
}

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<Notification["type"] | "all">("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "case-update",
      title: "Case Status Update",
      message: "Your case #12345 has been updated to 'In Progress'",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      priority: "high"
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      message: "You have received a new message from your lawyer",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
      priority: "medium"
    },
    {
      id: "3",
      type: "document",
      title: "Document Uploaded",
      message: "A new document has been uploaded to your case",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: false,
      priority: "medium"
    },
    {
      id: "4",
      type: "deadline",
      title: "Upcoming Deadline",
      message: "You have a deadline approaching in 3 days",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      read: true,
      priority: "high"
    },
    {
      id: "5",
      type: "system",
      title: "System Update",
      message: "The platform has been updated with new features",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      read: true,
      priority: "low"
    }
  ])

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "case-update":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "document":
        return <FileText className="h-5 w-5 text-purple-500" />
      case "deadline":
        return <Calendar className="h-5 w-5 text-red-500" />
      case "system":
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    }
  }

  const filteredNotifications = notifications
    .filter(notification => 
      (filter === "all" || notification.type === filter) &&
      (notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       notification.message.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <Button
          variant="outline"
          onClick={markAllAsRead}
          className="text-sm"
        >
          Mark all as read
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="text-sm"
          >
            All
          </Button>
          <Button
            variant={filter === "case-update" ? "default" : "outline"}
            onClick={() => setFilter("case-update")}
            className="text-sm"
          >
            Case Updates
          </Button>
          <Button
            variant={filter === "message" ? "default" : "outline"}
            onClick={() => setFilter("message")}
            className="text-sm"
          >
            Messages
          </Button>
          <Button
            variant={filter === "document" ? "default" : "outline"}
            onClick={() => setFilter("document")}
            className="text-sm"
          >
            Documents
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors ${
                notification.read
                  ? "bg-white dark:bg-gray-800"
                  : "bg-blue-50 dark:bg-blue-900/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={`${getPriorityColor(notification.priority)}`}
                    >
                      {notification.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </span>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs"
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Notifications
