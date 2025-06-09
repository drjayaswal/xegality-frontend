"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  MessageCircle,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle,
  Plus,
  Download,
  Upload,
  Phone,
  Video,
  Star,
  Archive,
  Trash2,
  Eye,
  Building,
  Scale,
  Home,
  Users,
  TrendingUp,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

export default function CaseUpdatesPage() {
  const [selectedCase, setSelectedCase] = useState(cases[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.lawyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.caseNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterStatus === "all" || caseItem.status.toLowerCase() === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "on hold":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCaseTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "real estate":
        return <Home className="h-4 w-4" />
      case "corporate litigation":
        return <Building className="h-4 w-4" />
      case "family law":
        return <Users className="h-4 w-4" />
      case "criminal law":
        return <Scale className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="h-screen bg-gray-50">
      <ResizablePanelGroup direction="horizontal">
        {/* Left Sidebar - Case List */}
        <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
          <div className="h-full bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Cases</h1>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Case
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search cases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Case List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {filteredCases.map((caseItem) => (
                  <Card
                    key={caseItem.id}
                    className={`cursor-pointer transition-all duration-200 shadow-none scale-95 ${selectedCase.id === caseItem.id
                      ? "ring-2 ring-accent-violet/40 shadow-md  bg-accent-violet/5 scale-100"
                      : "hover:shadow-sm border-gray-200"
                      }`}
                    onClick={() => setSelectedCase(caseItem)}
                  >
                    <CardContent className="">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            {getCaseTypeIcon(caseItem.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{caseItem.title}</h3>
                            <p className="text-xs text-gray-500">{caseItem.caseNumber}</p>
                          </div>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(caseItem.status)}`}>{caseItem.status}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Lawyer:</span>
                          <span className="font-medium text-gray-900">{caseItem.lawyer}</span>
                        </div>
                        {/* <div className="flex items-center justify-between text-xs"> */}
                        {/*   <span className="text-gray-500">Last Activity:</span> */}
                        {/*   <span className="text-gray-700">{caseItem.lastActivity}</span> */}
                        {/* </div> */}
                        {/* <div className="flex items-center justify-between text-xs"> */}
                        {/*   <span className="text-gray-500">Progress:</span> */}
                        {/*   <span className="text-gray-700">{caseItem.progress}%</span> */}
                        {/* </div> */}
                        {/* <Progress value={caseItem.progress} className="h-1" /> */}
                      </div>

                      {/* {caseItem.urgentTasks > 0 && ( */}
                      {/*   <div className="mt-3 flex items-center text-xs text-red-600"> */}
                      {/*     <AlertCircle className="h-3 w-3 mr-1" /> */}
                      {/*     {caseItem.urgentTasks} urgent task{caseItem.urgentTasks > 1 ? "s" : ""} */}
                      {/*   </div> */}
                      {/* )} */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Content Area */}
        <ResizablePanel defaultSize={70} minSize={60}>
          <div className="h-full flex flex-col">
            {/* Case Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                    {getCaseTypeIcon(selectedCase.type)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{selectedCase.title}</h1>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-gray-600">Lawyer: {selectedCase.lawyer}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">Case #: {selectedCase.caseNumber}</span>
                      <Badge className={`${getStatusColor(selectedCase.status)}`}>{selectedCase.status}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Lawyer
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedCase.progress}%</p>
                        <p className="text-xs text-gray-500">Progress</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedCase.timeSpent}h</p>
                        <p className="text-xs text-gray-500">Time Spent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedCase.documents}</p>
                        <p className="text-xs text-gray-500">Documents</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedCase.activities.length}</p>
                        <p className="text-xs text-gray-500">Activities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Case Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Case Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Case Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Case Type</label>
                            <div className="flex items-center space-x-2 mt-1">
                              {getCaseTypeIcon(selectedCase.type)}
                              <span className="font-medium">{selectedCase.type}</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Status</label>
                            <div className="mt-1">
                              <Badge className={`${getStatusColor(selectedCase.status)}`}>{selectedCase.status}</Badge>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Priority</label>
                            <div className="mt-1">
                              <Badge className={`${getPriorityColor(selectedCase.priority)}`}>
                                {selectedCase.priority}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Assigned To</label>
                            <div className="flex items-center space-x-2 mt-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={selectedCase.assignedTo.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {selectedCase.assignedTo.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{selectedCase.assignedTo.name}</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Open Date</label>
                            <p className="font-medium mt-1">{selectedCase.openDate}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Last Activity</label>
                            <p className="font-medium mt-1">{selectedCase.lastActivity}</p>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-500">Description</label>
                          <p className="text-gray-700 mt-1 leading-relaxed">{selectedCase.description}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Activities */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Activities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedCase.activities.slice(0, 5).map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center ${activity.type === "completed"
                                  ? "bg-green-100 text-green-600"
                                  : activity.type === "pending"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-blue-100 text-blue-600"
                                  }`}
                              >
                                {activity.type === "completed" ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : activity.type === "pending" ? (
                                  <Clock className="h-4 w-4" />
                                ) : (
                                  <FileText className="h-4 w-4" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{activity.title}</p>
                                <p className="text-sm text-gray-600">{activity.description}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-xs text-gray-500">{activity.date}</span>
                                  {activity.dueDate && (
                                    <>
                                      <span className="text-xs text-gray-400">•</span>
                                      <span className="text-xs text-gray-500">Due: {activity.dueDate}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="activities" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">All Activities</CardTitle>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Activity
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedCase.activities.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center ${activity.type === "completed"
                                ? "bg-green-100 text-green-600"
                                : activity.type === "pending"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-blue-100 text-blue-600"
                                }`}
                            >
                              {activity.type === "completed" ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : activity.type === "pending" ? (
                                <Clock className="h-5 w-5" />
                              ) : (
                                <FileText className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                                <Badge
                                  className={`text-xs ${activity.type === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : activity.type === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                    }`}
                                >
                                  {activity.type}
                                </Badge>
                              </div>
                              <p className="text-gray-600 mt-1">{activity.description}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-gray-500">{activity.date}</span>
                                {activity.dueDate && (
                                  <>
                                    <span className="text-sm text-gray-400">•</span>
                                    <span className="text-sm text-gray-500">Due: {activity.dueDate}</span>
                                  </>
                                )}
                                <span className="text-sm text-gray-400">•</span>
                                <span className="text-sm text-gray-500">By {activity.assignee}</span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Documents</CardTitle>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            New Document
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedCase.documentList.map((doc, index) => (
                          <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                  <FileText className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                                  <p className="text-sm text-gray-500">{doc.size}</p>
                                  <p className="text-xs text-gray-400 mt-1">{doc.uploadDate}</p>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Rename
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Case Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {selectedCase.timeline.map((event, index) => (
                          <div key={index} className="relative pl-8">
                            {index !== selectedCase.timeline.length - 1 && (
                              <div className="absolute left-3 top-8 h-full w-0.5 bg-gray-200"></div>
                            )}
                            <div
                              className={`absolute left-0 top-1 h-6 w-6 rounded-full flex items-center justify-center ${event.type === "milestone"
                                ? "bg-green-500 text-white"
                                : event.type === "deadline"
                                  ? "bg-red-500 text-white"
                                  : "bg-blue-500 text-white"
                                }`}
                            >
                              {event.type === "milestone" ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : event.type === "deadline" ? (
                                <AlertCircle className="h-3 w-3" />
                              ) : (
                                <Clock className="h-3 w-3" />
                              )}
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                <span className="text-sm text-gray-500">{event.date}</span>
                              </div>
                              <p className="text-gray-600">{event.description}</p>
                              {event.assignee && (
                                <p className="text-sm text-gray-500 mt-2">Assigned to: {event.assignee}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Billing Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Total Hours</label>
                            <p className="text-2xl font-bold text-gray-900">{selectedCase.timeSpent}h</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Hourly Rate</label>
                            <p className="text-2xl font-bold text-gray-900">${selectedCase.hourlyRate}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Total Amount</label>
                            <p className="text-2xl font-bold text-green-600">
                              ${(selectedCase.timeSpent * selectedCase.hourlyRate).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Amount Paid</label>
                            <p className="text-2xl font-bold text-blue-600">
                              ${selectedCase.amountPaid.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Invoices</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedCase.invoices.map((invoice, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">Invoice #{invoice.number}</p>
                                <p className="text-sm text-gray-500">{invoice.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900">${invoice.amount.toLocaleString()}</p>
                                <Badge
                                  className={`text-xs ${invoice.status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : invoice.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                    }`}
                                >
                                  {invoice.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

// Mock Data
const cases = [
  {
    id: 1,
    title: "Chen Property Acquisition",
    lawyer: "Michael Chen",
    caseNumber: "RE-2023-0567",
    type: "Real Estate",
    status: "Active",
    priority: "Medium",
    progress: 75,
    timeSpent: 45,
    hourlyRate: 350,
    amountPaid: 12500,
    documents: 12,
    urgentTasks: 1,
    lastActivity: "2 hours ago",
    openDate: "May 5, 2023",
    description:
      "Commercial property acquisition requiring due diligence, contract negotiation, and title review. lawyer is looking to purchase a 50,000 sq ft warehouse facility for their expanding logistics business.",
    assignedTo: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    activities: [
      {
        title: "Prepare closing documents",
        description: "Draft and review all necessary closing documentation",
        type: "pending",
        date: "Today, 2:30 PM",
        dueDate: "Jul 1, 2023",
        assignee: "Jane Smith",
      },
      {
        title: "Title search completed",
        description: "Comprehensive title search revealed no major issues",
        type: "completed",
        date: "Yesterday, 4:15 PM",
        assignee: "John Doe",
      },
      {
        title: "Contract negotiation",
        description: "Negotiated favorable terms for the lawyer",
        type: "completed",
        date: "Jun 10, 2023",
        assignee: "Jane Smith",
      },
      {
        title: "Property inspection scheduled",
        description: "Coordinated with inspection team for comprehensive review",
        type: "completed",
        date: "Jun 8, 2023",
        assignee: "Jane Smith",
      },
    ],
    documentList: [
      { name: "Purchase Agreement.pdf", size: "2.4 MB", uploadDate: "Jun 12, 2023" },
      { name: "Title Report.pdf", size: "1.8 MB", uploadDate: "Jun 10, 2023" },
      { name: "Property Survey.pdf", size: "3.2 MB", uploadDate: "Jun 8, 2023" },
      { name: "Inspection Report.pdf", size: "1.5 MB", uploadDate: "Jun 5, 2023" },
    ],
    timeline: [
      {
        title: "Case Opened",
        description: "Initial consultation and case setup completed",
        date: "May 5, 2023",
        type: "milestone",
        assignee: "Jane Smith",
      },
      {
        title: "Due Diligence Phase",
        description: "Comprehensive property research and analysis",
        date: "May 15, 2023",
        type: "milestone",
        assignee: "John Doe",
      },
      {
        title: "Contract Negotiation",
        description: "Terms negotiated and agreed upon by both parties",
        date: "Jun 1, 2023",
        type: "milestone",
        assignee: "Jane Smith",
      },
      {
        title: "Closing Deadline",
        description: "Final closing must be completed by this date",
        date: "Jul 15, 2023",
        type: "deadline",
        assignee: "Jane Smith",
      },
    ],
    invoices: [
      { number: "INV-2023-001", amount: 5250, date: "Jun 1, 2023", status: "paid" },
      { number: "INV-2023-002", amount: 3500, date: "Jun 15, 2023", status: "paid" },
      { number: "INV-2023-003", amount: 2800, date: "Jul 1, 2023", status: "pending" },
    ],
  },
  {
    id: 2,
    title: "Johnson Corporate Litigation",
    lawyer: "Johnson Industries",
    caseNumber: "CL-2023-0234",
    type: "Corporate Litigation",
    status: "Pending",
    priority: "High",
    progress: 45,
    timeSpent: 32,
    hourlyRate: 450,
    amountPaid: 8500,
    documents: 8,
    urgentTasks: 2,
    lastActivity: "1 day ago",
    openDate: "Apr 20, 2023",
    description: "Complex corporate litigation involving breach of contract and intellectual property disputes.",
    assignedTo: {
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    activities: [
      {
        title: "Discovery phase preparation",
        description: "Preparing documents and evidence for discovery",
        type: "pending",
        date: "Today, 9:00 AM",
        dueDate: "Jun 30, 2023",
        assignee: "Robert Wilson",
      },
      {
        title: "Deposition scheduled",
        description: "Key witness deposition scheduled for next week",
        type: "pending",
        date: "Yesterday, 3:20 PM",
        dueDate: "Jun 25, 2023",
        assignee: "Sarah Johnson",
      },
    ],
    documentList: [
      { name: "Complaint.pdf", size: "1.2 MB", uploadDate: "Apr 20, 2023" },
      { name: "Answer.pdf", size: "0.8 MB", uploadDate: "May 5, 2023" },
    ],
    timeline: [],
    invoices: [],
  },
  {
    id: 3,
    title: "Rodriguez Family Custody",
    lawyer: "Maria Rodriguez",
    caseNumber: "FL-2023-0189",
    type: "Family Law",
    status: "Completed",
    priority: "Low",
    progress: 100,
    timeSpent: 28,
    hourlyRate: 300,
    amountPaid: 8400,
    documents: 15,
    urgentTasks: 0,
    lastActivity: "1 week ago",
    openDate: "Mar 15, 2023",
    description: "Child custody case involving modification of existing custody arrangement.",
    assignedTo: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    activities: [
      {
        title: "Final custody order filed",
        description: "Court approved the modified custody arrangement",
        type: "completed",
        date: "Jun 5, 2023",
        assignee: "Emily Davis",
      },
    ],
    documentList: [{ name: "Custody Agreement.pdf", size: "1.5 MB", uploadDate: "Jun 5, 2023" }],
    timeline: [],
    invoices: [],
  },
]
