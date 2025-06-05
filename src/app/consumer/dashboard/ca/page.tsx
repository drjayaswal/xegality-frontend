"use client";

import {
  CheckCircle,
  ChevronDown,
  MoreVertical,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  FileText,
  Calendar,
  Clock,
  User,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Download,
  Upload,
  Building2,
  Receipt,
  Scale,
  FileSignature,
  ChevronRight,
  ArrowRight,
  Plus,
  Bell,
  Settings,
  HelpCircle,
  Phone,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Service {
  id: string;
  title: string;
  category: "Company Registration" | "Licenses" | "Tax" | "Trademark";
  status: "pending" | "in-progress" | "completed" | "rejected";
  priority: "high" | "medium" | "low";
  assignedTo: string;
  startDate: Date;
  lastUpdate: Date;
  nextStep?: string;
  description: string;
  documents: Document[];
  updates: Update[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: Date;
}

interface Update {
  id: string;
  content: string;
  timestamp: Date;
  status: "info" | "success" | "warning" | "error";
}

export default function CADashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "in-progress" | "completed" | "rejected">("all");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "updates">("overview");
  const [selectedApplication, setSelectedApplication] = useState(applications[0])

  // Sample services data
  const services: Service[] = [
    {
      id: "svc-001",
      title: "Private Limited Company Registration",
      category: "Company Registration",
      status: "in-progress",
      priority: "high",
      assignedTo: "CA Rajesh Kumar",
      startDate: new Date(2024, 2, 15),
      lastUpdate: new Date(2024, 3, 10),
      nextStep: "Submit additional documents",
      description: "Registration of a new private limited company for tech startup",
      documents: [
        {
          id: "doc-001",
          name: "Company_Registration_Form.pdf",
          type: "application/pdf",
          size: "1.2 MB",
          uploadedBy: "Client",
          uploadedAt: new Date(2024, 2, 15),
        },
        {
          id: "doc-002",
          name: "Business_Plan.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: "2.8 MB",
          uploadedBy: "Client",
          uploadedAt: new Date(2024, 2, 20),
        },
      ],
      updates: [
        {
          id: "update-001",
          content: "Initial application submitted",
          timestamp: new Date(2024, 2, 15),
          status: "info",
        },
        {
          id: "update-002",
          content: "Documents under review",
          timestamp: new Date(2024, 2, 20),
          status: "info",
        },
        {
          id: "update-003",
          content: "Additional documents requested",
          timestamp: new Date(2024, 3, 10),
          status: "warning",
        },
      ],
    },
    {
      id: "svc-002",
      title: "GST Registration",
      category: "Tax",
      status: "completed",
      priority: "high",
      assignedTo: "CA Priya Sharma",
      startDate: new Date(2024, 1, 10),
      lastUpdate: new Date(2024, 2, 5),
      description: "GST registration for e-commerce business",
      documents: [
        {
          id: "doc-003",
          name: "GST_Registration_Form.pdf",
          type: "application/pdf",
          size: "0.8 MB",
          uploadedBy: "Client",
          uploadedAt: new Date(2024, 1, 10),
        },
      ],
      updates: [
        {
          id: "update-004",
          content: "Application submitted",
          timestamp: new Date(2024, 1, 10),
          status: "info",
        },
        {
          id: "update-005",
          content: "Registration approved",
          timestamp: new Date(2024, 2, 5),
          status: "success",
        },
      ],
    },
  ];

  const currentService = services.find((svc) => svc.id === selectedService);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock3 className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Company Registration":
        return <Building2 className="w-4 h-4" />;
      case "Licenses":
        return <FileSignature className="w-4 h-4" />;
      case "Tax":
        return <Receipt className="w-4 h-4" />;
      case "Trademark":
        return <Scale className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden backdrop-blur-md rounded-lg">
      {/* Top bar */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search applications..." className="pl-10 h-9 w-full" />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Contact CA
            </Button>
            <Button size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </header>

      {/* Application list */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r bg-white overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Your Applications</h2>
            <div className="space-y-3">
              {applications.map((app) => (
                <Card
                  key={app.id}
                  className={`cursor-pointer hover:border-purple-200 ${selectedApplication.id === app.id ? "border-purple-500" : ""}`}
                  onClick={() => setSelectedApplication(app)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${getStatusColor(app.status).bgColor}`}
                          >
                            {getStatusIcon(app.status)}
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium text-sm">{app.service}</h3>
                            <p className="text-xs text-gray-500">Ref: {app.reference}</p>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(app.status).badgeColor}`}>{app.status}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Last updated: {app.lastUpdated}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Application details */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">{selectedApplication.service}</h1>
                <Badge className={`ml-4 ${getStatusColor(selectedApplication.status).badgeColor}`}>
                  {selectedApplication.status}
                </Badge>
              </div>
              <p className="text-gray-500">Reference: {selectedApplication.reference}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Download Documents</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View all documents</DropdownMenuItem>
                  <DropdownMenuItem>Contact assigned CA</DropdownMenuItem>
                  <DropdownMenuItem>Cancel application</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Application Details</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Service Type</h3>
                      <p className="mt-1">{selectedApplication.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Service Name</h3>
                      <p className="mt-1">{selectedApplication.service}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <p className="mt-1">{selectedApplication.status}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Assigned To</h3>
                      <p className="mt-1">{selectedApplication.assignedTo}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Submission Date</h3>
                      <p className="mt-1">{selectedApplication.submissionDate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Expected Completion</h3>
                      <p className="mt-1">{selectedApplication.expectedCompletion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Application Timeline</h3>
                  <div className="space-y-8">
                    {selectedApplication.timeline.map((item, index) => (
                      <div key={index} className="relative pl-8">
                        {index !== selectedApplication.timeline.length - 1 && (
                          <div className="absolute left-3.5 top-6 h-full w-px bg-gray-200" />
                        )}
                        <div
                          className={`absolute left-0 top-1 h-7 w-7 rounded-full flex items-center justify-center ${getTimelineItemColor(item.type).bgColor}`}
                        >
                          {getTimelineItemIcon(item.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <span>{item.date}</span>
                            {item.by && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{item.by}</span>
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
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Application Documents</h3>
                  <div className="space-y-4">
                    {selectedApplication.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-gray-500">
                              {doc.size} • {doc.uploadedOn}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}


// Helper functions
function getStatusColor(status: string) {
  switch (status) {
    case "In Progress":
      return {
        bgColor: "bg-blue-500",
        badgeColor: "bg-blue-100 text-blue-800",
      }
    case "Completed":
      return {
        bgColor: "bg-green-500",
        badgeColor: "bg-green-100 text-green-800",
      }
    case "Pending":
      return {
        bgColor: "bg-yellow-500",
        badgeColor: "bg-yellow-100 text-yellow-800",
      }
    case "Requires Action":
      return {
        bgColor: "bg-red-500",
        badgeColor: "bg-red-100 text-red-800",
      }
    default:
      return {
        bgColor: "bg-gray-500",
        badgeColor: "bg-gray-100 text-gray-800",
      }
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "In Progress":
      return <Clock className="h-4 w-4" />
    case "Completed":
      return <CheckCircle className="h-4 w-4" />
    case "Pending":
      return <Clock className="h-4 w-4" />
    case "Requires Action":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

function getTimelineItemColor(type: string) {
  switch (type) {
    case "success":
      return { bgColor: "bg-green-100 text-green-600" }
    case "info":
      return { bgColor: "bg-blue-100 text-blue-600" }
    case "warning":
      return { bgColor: "bg-yellow-100 text-yellow-600" }
    case "error":
      return { bgColor: "bg-red-100 text-red-600" }
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
