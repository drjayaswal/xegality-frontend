"use client"

import { useState } from "react"
import {
  Search,
  Phone,
  MessageSquare,
  MoreVertical,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  Home,
  FileCheck,
  Settings,
  CreditCard,
  HelpCircle,
  User,
  PlusCircle,
  Download,
  Calendar,
  Building,
  Briefcase,
  Award,
  Bookmark,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  const [selectedApplication, setSelectedApplication] = useState(applications[0])

  return (
    <div className="flex h-full bg-slate-50">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className=" border-b px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search applications..."
                className="pl-10 h-10 w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-4 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact CA
              </Button>
              <Button
                size="sm"
                className="h-10 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transition-colors"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </header>

        {/* Application list */}
        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 border-r bg-white overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Your Applications</h2>
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card
                    key={app.id}
                    className={`cursor-pointer border-2 border-gray-500/10 shadow-none hover:shadow-lg transition-all duration-200 ${selectedApplication.id === app.id
                      ? "border-2 border-accent-violet/30 shadow-lg bg-accent-violet/3 "
                      : "hover:border-gray-300"
                      }`}
                    onClick={() => setSelectedApplication(app)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center text-white shadow-sm ${getStatusColor(app.status).bgColor}`}
                          >
                            {getCategoryIcon(app.category)}
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium">{app.service}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Ref: {app.reference}</p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(app.status).badgeColor} ml-2`}>{app.status}</Badge>
                      </div>

                      <div className="mt-3 pt-3 border-t border-dashed">
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Progress</span>
                          <span>{getProgressPercentage(app.status)}%</span>
                        </div>
                        <Progress
                          value={getProgressPercentage(app.status)}
                          className="h-1.5 mt-1.5"
                          indicatorClassName={getStatusColor(app.status).progressColor}
                        />
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-500">Last updated: {app.lastUpdated}</span>
                          <span className="text-xs font-medium text-gray-700">{app.assignedTo.split(",")[0]}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Application details */}
          <div className="flex-1 overflow-y-auto bg-slate-50">
            <div className="max-w-5xl mx-auto p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center text-white shadow-md ${getStatusColor(selectedApplication.status).bgColor} mr-4`}
                    >
                      {getCategoryIcon(selectedApplication.category)}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{selectedApplication.service}</h1>
                      <div className="flex items-center mt-1">
                        <Badge className={`rounded-full border-none ${getStatusColor(selectedApplication.status).badgeColor} mr-3`}>
                          {selectedApplication.status}
                        </Badge>
                        <p className="text-gray-500 text-sm">Reference: {selectedApplication.reference}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Documents
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem className="cursor-pointer">View all documents</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Contact assigned CA</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-red-600">Cancel application</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="bg-white shadow-lg rounded-full px-1.5 gap-5">
                  <TabsTrigger value="details" className="data-[state=active]:bg-accent-violet/5 data-[state=active]:text-accent-violet rounded-full ">
                    Application Details
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="data-[state=active]:bg-accent-violet/5 data-[state=active]:text-accent-violet rounded-full ">
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="data-[state=active]:bg-accent-violet/5 data-[state=active]:text-accent-violet rounded-full">
                    Documents
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6">
                  <Card className="overflow-hidden shadow-none p-0 border-gray-500/10 border-2">
                    <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 px-6 py-4">
                      <h3 className="text-lg font-semibold text-purple-600">Application Overview</h3>
                    </div>
                    <CardContent className="p-6 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Service Category</h3>
                            <div className="mt-2 flex items-center">
                              {getCategoryIcon(selectedApplication.category, "text-purple-600")}
                              <p className="ml-2 font-medium">{selectedApplication.category}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Service Name</h3>
                            <p className="mt-2 font-medium">{selectedApplication.service}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Status</h3>
                            <div className="mt-2">
                              <Badge className={`${getStatusColor(selectedApplication.status).badgeColor}`}>
                                {selectedApplication.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Assigned To</h3>
                            <div className="mt-2 flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback>
                                  {selectedApplication.assignedTo.split(" ")[0][0]}
                                  {selectedApplication.assignedTo.split(" ")[1][0]}
                                </AvatarFallback>
                              </Avatar>
                              <p className="font-medium">{selectedApplication.assignedTo}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Submission Date</h3>
                            <p className="mt-2 font-medium">{selectedApplication.submissionDate}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Expected Completion</h3>
                            <p className="mt-2 font-medium">{selectedApplication.expectedCompletion}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <h3 className="text-sm font-medium text-gray-500 mb-3">Application Progress</h3>
                        <div className="flex justify-between items-center text-sm mb-2">
                          <span>Overall Completion</span>
                          <span className="font-medium">{getProgressPercentage(selectedApplication.status)}%</span>
                        </div>
                        <Progress
                          value={getProgressPercentage(selectedApplication.status)}
                          className="h-2"
                          indicatorClassName={getStatusColor(selectedApplication.status).progressColor}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline" className="mt-6 border border-accent-violet/0 shadow-none">
                  <Card className="overflow-hidden shadow-none p-0 border-gray-500/10 border-2">
                    <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 px-6 py-4">
                      <h3 className="text-lg font-semibold text-purple-600">Application Timeline</h3>
                    </div>
                    <CardContent className="p-6 bg-white">
                      <div className="space-y-8">
                        {selectedApplication.timeline.map((item, index) => (
                          <div key={index} className="relative pl-10">
                            {index !== selectedApplication.timeline.length - 1 && (
                              <div className="absolute left-4 top-8 h-full w-0.5 bg-gray-200" />
                            )}
                            <div
                              className={`absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${getTimelineItemColor(item.type).bgColor}`}
                            >
                              {getTimelineItemIcon(item.type)}
                            </div>
                            <div className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors">
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <p className="text-gray-600 mt-1">{item.description}</p>
                              <div className="flex items-center mt-3 text-sm">
                                <span className="text-gray-500 font-medium">{item.date}</span>
                                {item.by && (
                                  <>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <div className="flex items-center">
                                      <Avatar className="h-5 w-5 mr-1">
                                        <AvatarFallback className="text-[10px]">
                                          {item.by.split(" ")[0][0]}
                                          {item.by.split(" ")[1]?.[0] || ""}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-gray-700">{item.by}</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <Card className="overflow-hidden shadow-none p-0 border-gray-500/10 border-2">
                    <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 px-6 py-4">
                      <h3 className="text-lg font-semibold text-purple-600">Application Documents</h3>
                    </div>
                    <CardContent className="p-6 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedApplication.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {doc.size} • Uploaded on {doc.uploadedOn}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex justify-center">
                        <Button variant="outline" className="border-dashed border-gray-300 text-gray-600">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Upload Additional Document
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getStatusColor(status: string) {
  switch (status) {
    case "In Progress":
      return {
        bgColor: "bg-blue-600",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        progressColor: "bg-blue-600",
      }
    case "Completed":
      return {
        bgColor: "bg-emerald-600",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        progressColor: "bg-emerald-600",
      }
    case "Pending":
      return {
        bgColor: "bg-amber-500",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        progressColor: "bg-amber-500",
      }
    case "Requires Action":
      return {
        bgColor: "bg-rose-600",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
        progressColor: "bg-rose-600",
      }
    default:
      return {
        bgColor: "bg-gray-600",
        badgeColor: "bg-gray-100 text-gray-800 border-gray-200",
        progressColor: "bg-gray-600",
      }
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "In Progress":
      return <Clock className="h-5 w-5" />
    case "Completed":
      return <CheckCircle className="h-5 w-5" />
    case "Pending":
      return <Clock className="h-5 w-5" />
    case "Requires Action":
      return <AlertCircle className="h-5 w-5" />
    default:
      return <FileText className="h-5 w-5" />
  }
}

function getCategoryIcon(category: string, className = "") {
  switch (category) {
    case "Company Registration and Setup":
      return <Building className={`h-5 w-5 ${className}`} />
    case "Tax & Compliances":
      return <FileCheck className={`h-5 w-5 ${className}`} />
    case "Trademark and Intellectual Property":
      return <Award className={`h-5 w-5 ${className}`} />
    case "Licenses & Registrations":
      return <Bookmark className={`h-5 w-5 ${className}`} />
    default:
      return <Briefcase className={`h-5 w-5 ${className}`} />
  }
}

function getTimelineItemColor(type: string) {
  switch (type) {
    case "success":
      return { bgColor: "bg-emerald-100 text-emerald-600" }
    case "info":
      return { bgColor: "bg-blue-100 text-blue-600" }
    case "warning":
      return { bgColor: "bg-amber-100 text-amber-600" }
    case "error":
      return { bgColor: "bg-rose-100 text-rose-600" }
    default:
      return { bgColor: "bg-gray-100 text-gray-600" }
  }
}

function getTimelineItemIcon(type: string) {
  switch (type) {
    case "success":
      return <CheckCircle className="h-4 w-4" />
    case "info":
      return <FileText className="h-4 w-4" />
    case "warning":
      return <AlertCircle className="h-4 w-4" />
    case "error":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

function getProgressPercentage(status: string) {
  switch (status) {
    case "In Progress":
      return 65
    case "Completed":
      return 100
    case "Pending":
      return 25
    case "Requires Action":
      return 45
    default:
      return 0
  }
}

// Sample data
const applications = [
  {
    id: 1,
    category: "Company Registration and Setup",
    service: "Private Limited Company Registration",
    status: "In Progress",
    reference: "CA-2023-0001",
    lastUpdated: "Today, 10:30 AM",
    assignedTo: "Priya Sharma, CA",
    submissionDate: "June 1, 2023",
    expectedCompletion: "June 15, 2023",
    timeline: [
      {
        type: "info",
        title: "Application Submitted",
        description: "Your application for Private Limited Company Registration has been received.",
        date: "June 1, 2023, 09:15 AM",
      },
      {
        type: "info",
        title: "Document Verification",
        description: "Your submitted documents are being verified by our team.",
        date: "June 2, 2023, 11:30 AM",
        by: "Priya Sharma, CA",
      },
      {
        type: "success",
        title: "Name Approval",
        description: 'Your proposed company name "TechSolutions Pvt Ltd" has been approved.',
        date: "June 5, 2023, 03:45 PM",
        by: "Priya Sharma, CA",
      },
      {
        type: "info",
        title: "DSC Application",
        description: "Digital Signature Certificate application has been submitted.",
        date: "June 7, 2023, 10:20 AM",
        by: "System",
      },
      {
        type: "warning",
        title: "Additional Documents Required",
        description: "Please provide address proof for all directors.",
        date: "Today, 10:30 AM",
        by: "Priya Sharma, CA",
      },
    ],
    documents: [
      {
        name: "ID Proof - Director 1.pdf",
        size: "1.2 MB",
        uploadedOn: "June 1, 2023",
      },
      {
        name: "ID Proof - Director 2.pdf",
        size: "980 KB",
        uploadedOn: "June 1, 2023",
      },
      {
        name: "Proposed Company Name.docx",
        size: "45 KB",
        uploadedOn: "June 1, 2023",
      },
      {
        name: "Business Plan.pdf",
        size: "3.5 MB",
        uploadedOn: "June 1, 2023",
      },
    ],
  },
  {
    id: 2,
    category: "Tax & Compliances",
    service: "GST Registration",
    status: "Requires Action",
    reference: "CA-2023-0002",
    lastUpdated: "Yesterday, 04:15 PM",
    assignedTo: "Vikram Mehta, CA",
    submissionDate: "May 28, 2023",
    expectedCompletion: "June 12, 2023",
    timeline: [
      {
        type: "info",
        title: "Application Submitted",
        description: "Your application for GST Registration has been received.",
        date: "May 28, 2023, 02:30 PM",
      },
      {
        type: "info",
        title: "Document Verification",
        description: "Your submitted documents are being verified by our team.",
        date: "May 29, 2023, 10:45 AM",
        by: "Vikram Mehta, CA",
      },
      {
        type: "error",
        title: "Document Discrepancy",
        description: "There is a mismatch in the address on your rental agreement and business address provided.",
        date: "May 31, 2023, 01:20 PM",
        by: "Vikram Mehta, CA",
      },
      {
        type: "warning",
        title: "Action Required",
        description: "Please provide corrected address proof or update your business address details.",
        date: "Yesterday, 04:15 PM",
        by: "Vikram Mehta, CA",
      },
    ],
    documents: [
      {
        name: "PAN Card.pdf",
        size: "850 KB",
        uploadedOn: "May 28, 2023",
      },
      {
        name: "Rental Agreement.pdf",
        size: "2.1 MB",
        uploadedOn: "May 28, 2023",
      },
      {
        name: "Business Registration.pdf",
        size: "1.7 MB",
        uploadedOn: "May 28, 2023",
      },
    ],
  },
  {
    id: 3,
    category: "Trademark and Intellectual Property",
    service: "Trademark Registration",
    status: "Completed",
    reference: "CA-2023-0003",
    lastUpdated: "May 20, 2023, 11:45 AM",
    assignedTo: "Ananya Patel, CA",
    submissionDate: "April 15, 2023",
    expectedCompletion: "May 20, 2023",
    timeline: [
      {
        type: "info",
        title: "Application Submitted",
        description: "Your application for Trademark Registration has been received.",
        date: "April 15, 2023, 03:20 PM",
      },
      {
        type: "info",
        title: "Document Verification",
        description: "Your submitted documents are being verified by our team.",
        date: "April 17, 2023, 09:30 AM",
        by: "Ananya Patel, CA",
      },
      {
        type: "info",
        title: "Trademark Search Initiated",
        description: "We are conducting a comprehensive search to ensure your trademark is unique.",
        date: "April 20, 2023, 02:15 PM",
        by: "Ananya Patel, CA",
      },
      {
        type: "success",
        title: "Trademark Search Completed",
        description: "No conflicts found with your proposed trademark.",
        date: "April 28, 2023, 11:40 AM",
        by: "Ananya Patel, CA",
      },
      {
        type: "info",
        title: "Application Filed",
        description: "Your trademark application has been filed with the Trademark Registry.",
        date: "May 2, 2023, 10:05 AM",
        by: "System",
      },
      {
        type: "success",
        title: "Trademark Registered",
        description: "Congratulations! Your trademark has been successfully registered.",
        date: "May 20, 2023, 11:45 AM",
        by: "Ananya Patel, CA",
      },
    ],
    documents: [
      {
        name: "Logo Design.png",
        size: "2.5 MB",
        uploadedOn: "April 15, 2023",
      },
      {
        name: "Business Details.pdf",
        size: "1.3 MB",
        uploadedOn: "April 15, 2023",
      },
      {
        name: "Trademark Certificate.pdf",
        size: "950 KB",
        uploadedOn: "May 20, 2023",
      },
    ],
  },
  {
    id: 4,
    category: "Licenses & Registrations",
    service: "FSSAI Registration",
    status: "Pending",
    reference: "CA-2023-0004",
    lastUpdated: "3 days ago",
    assignedTo: "Rajesh Kumar, CA",
    submissionDate: "May 25, 2023",
    expectedCompletion: "June 25, 2023",
    timeline: [
      {
        type: "info",
        title: "Application Submitted",
        description: "Your application for FSSAI Registration has been received.",
        date: "May 25, 2023, 04:30 PM",
      },
      {
        type: "info",
        title: "Application Assigned",
        description: "Your application has been assigned to Rajesh Kumar, CA.",
        date: "May 26, 2023, 10:15 AM",
        by: "System",
      },
      {
        type: "info",
        title: "Pending Review",
        description: "Your application is in queue for initial review.",
        date: "3 days ago",
        by: "System",
      },
    ],
    documents: [
      {
        name: "Business Registration.pdf",
        size: "1.8 MB",
        uploadedOn: "May 25, 2023",
      },
      {
        name: "Food Business Plan.pdf",
        size: "2.3 MB",
        uploadedOn: "May 25, 2023",
      },
      {
        name: "Premises Layout.pdf",
        size: "3.1 MB",
        uploadedOn: "May 25, 2023",
      },
    ],
  },
]
