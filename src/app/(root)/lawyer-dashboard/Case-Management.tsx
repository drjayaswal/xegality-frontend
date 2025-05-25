"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Filter,
  Plus,
  FileText,
  Calendar,
  Clock,
  User,
  MoreHorizontal,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Send,
  Download,
  Upload,
  Trash2,
  Edit,
  MessageSquare,
  BarChart,
  Briefcase,
  Folder,
} from "lucide-react";

interface Case {
  id: string;
  title: string;
  client: string;
  caseNumber: string;
  type: string;
  status: "active" | "pending" | "closed" | "archived";
  priority: "high" | "medium" | "low";
  assignedTo: string;
  openDate: Date;
  lastActivity: Date;
  nextHearing?: Date;
  description: string;
  documents: Document[];
  notes: Note[];
  tasks: Task[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: Date;
}

interface Note {
  id: string;
  content: string;
  createdBy: string;
  createdAt: Date;
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "in-progress" | "completed" | "overdue";
  assignedTo: string;
}

export default function CaseManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "pending" | "closed" | "archived"
  >("all");
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "documents" | "notes" | "tasks"
  >("overview");
  const [newNote, setNewNote] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample cases data
  const cases: Case[] = [
    {
      id: "case-001",
      title: "Johnson v. Smith",
      client: "Sarah Johnson",
      caseNumber: "CV-2023-1234",
      type: "Corporate Litigation",
      status: "active",
      priority: "high",
      assignedTo: "John Doe",
      openDate: new Date(2023, 2, 15),
      lastActivity: new Date(2023, 5, 10),
      nextHearing: new Date(2023, 6, 20),
      description:
        "Corporate merger dispute involving allegations of breach of fiduciary duty and misrepresentation of financial statements.",
      documents: [
        {
          id: "doc-001",
          name: "Complaint.pdf",
          type: "application/pdf",
          size: "2.4 MB",
          uploadedBy: "John Doe",
          uploadedAt: new Date(2023, 2, 15),
        },
        {
          id: "doc-002",
          name: "Financial_Statements_2022.xlsx",
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          size: "1.8 MB",
          uploadedBy: "John Doe",
          uploadedAt: new Date(2023, 3, 5),
        },
        {
          id: "doc-003",
          name: "Merger_Agreement.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: "3.2 MB",
          uploadedBy: "Jane Smith",
          uploadedAt: new Date(2023, 3, 10),
        },
      ],
      notes: [
        {
          id: "note-001",
          content:
            "Initial consultation with client. Discussed potential claims and strategy. Client provided copies of merger agreement and financial statements.",
          createdBy: "John Doe",
          createdAt: new Date(2023, 2, 15),
        },
        {
          id: "note-002",
          content:
            "Reviewed financial statements. Found discrepancies in Q3 and Q4 reports that support client's claims of misrepresentation.",
          createdBy: "Jane Smith",
          createdAt: new Date(2023, 3, 5),
        },
        {
          id: "note-003",
          content:
            "Drafted complaint. Focusing on breach of fiduciary duty, misrepresentation, and violation of securities regulations.",
          createdBy: "John Doe",
          createdAt: new Date(2023, 3, 20),
        },
      ],
      tasks: [
        {
          id: "task-001",
          title: "File complaint with court",
          description: "Finalize and file complaint with the district court",
          dueDate: new Date(2023, 4, 1),
          status: "completed",
          assignedTo: "John Doe",
        },
        {
          id: "task-002",
          title: "Prepare discovery requests",
          description:
            "Draft initial discovery requests including interrogatories and document requests",
          dueDate: new Date(2023, 5, 15),
          status: "in-progress",
          assignedTo: "Jane Smith",
        },
        {
          id: "task-003",
          title: "Prepare for preliminary hearing",
          description:
            "Develop arguments and prepare exhibits for preliminary hearing",
          dueDate: new Date(2023, 6, 15),
          status: "pending",
          assignedTo: "John Doe",
        },
      ],
    },
    {
      id: "case-002",
      title: "Chen Property Acquisition",
      client: "Michael Chen",
      caseNumber: "RE-2023-0567",
      type: "Real Estate",
      status: "pending",
      priority: "medium",
      assignedTo: "Jane Smith",
      openDate: new Date(2023, 4, 5),
      lastActivity: new Date(2023, 5, 12),
      description:
        "Commercial property acquisition requiring due diligence, contract negotiation, and title review.",
      documents: [
        {
          id: "doc-004",
          name: "Purchase_Agreement_Draft.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: "1.5 MB",
          uploadedBy: "Jane Smith",
          uploadedAt: new Date(2023, 4, 5),
        },
        {
          id: "doc-005",
          name: "Property_Survey.pdf",
          type: "application/pdf",
          size: "4.2 MB",
          uploadedBy: "Jane Smith",
          uploadedAt: new Date(2023, 4, 20),
        },
      ],
      notes: [
        {
          id: "note-004",
          content:
            "Initial meeting with client. Discussed property details, budget, and timeline. Client is looking to close within 60 days.",
          createdBy: "Jane Smith",
          createdAt: new Date(2023, 4, 5),
        },
        {
          id: "note-005",
          content:
            "Reviewed property survey and title report. Found potential easement issue that needs to be addressed before closing.",
          createdBy: "Jane Smith",
          createdAt: new Date(2023, 4, 25),
        },
      ],
      tasks: [
        {
          id: "task-004",
          title: "Complete title review",
          description:
            "Review title report and address any issues or encumbrances",
          dueDate: new Date(2023, 5, 1),
          status: "completed",
          assignedTo: "Jane Smith",
        },
        {
          id: "task-005",
          title: "Negotiate purchase agreement",
          description:
            "Finalize terms and conditions of the purchase agreement",
          dueDate: new Date(2023, 5, 15),
          status: "in-progress",
          assignedTo: "Jane Smith",
        },
        {
          id: "task-006",
          title: "Prepare closing documents",
          description: "Draft and review all documents required for closing",
          dueDate: new Date(2023, 6, 1),
          status: "pending",
          assignedTo: "John Doe",
        },
      ],
    },
    {
      id: "case-003",
      title: "Rodriguez Custody Modification",
      client: "Emily Rodriguez",
      caseNumber: "FC-2023-0789",
      type: "Family Law",
      status: "closed",
      priority: "high",
      assignedTo: "John Doe",
      openDate: new Date(2023, 1, 10),
      lastActivity: new Date(2023, 4, 30),
      description:
        "Modification of child custody arrangement due to relocation of custodial parent.",
      documents: [
        {
          id: "doc-006",
          name: "Original_Custody_Order.pdf",
          type: "application/pdf",
          size: "1.2 MB",
          uploadedBy: "John Doe",
          uploadedAt: new Date(2023, 1, 10),
        },
        {
          id: "doc-007",
          name: "Modification_Petition.pdf",
          type: "application/pdf",
          size: "0.8 MB",
          uploadedBy: "John Doe",
          uploadedAt: new Date(2023, 1, 15),
        },
        {
          id: "doc-008",
          name: "Final_Modified_Order.pdf",
          type: "application/pdf",
          size: "1.5 MB",
          uploadedBy: "John Doe",
          uploadedAt: new Date(2023, 4, 30),
        },
      ],
      notes: [
        {
          id: "note-006",
          content:
            "Client seeking modification of custody order due to job relocation. Wants to maintain primary custody with adjusted visitation schedule.",
          createdBy: "John Doe",
          createdAt: new Date(2023, 1, 10),
        },
        {
          id: "note-007",
          content:
            "Mediation session with both parties. Reached tentative agreement on modified visitation schedule.",
          createdBy: "John Doe",
          createdAt: new Date(2023, 3, 15),
        },
        {
          id: "note-008",
          content:
            "Court approved modified custody order. Case closed successfully.",
          createdBy: "John Doe",
          createdAt: new Date(2023, 4, 30),
        },
      ],
      tasks: [
        {
          id: "task-007",
          title: "File modification petition",
          description:
            "Prepare and file petition for modification of custody order",
          dueDate: new Date(2023, 1, 20),
          status: "completed",
          assignedTo: "John Doe",
        },
        {
          id: "task-008",
          title: "Schedule mediation",
          description: "Arrange mediation session with both parties",
          dueDate: new Date(2023, 3, 1),
          status: "completed",
          assignedTo: "Jane Smith",
        },
        {
          id: "task-009",
          title: "Prepare final order",
          description: "Draft modified custody order for court approval",
          dueDate: new Date(2023, 4, 15),
          status: "completed",
          assignedTo: "John Doe",
        },
      ],
    },
  ];

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || caseItem.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const currentCase = cases.find((caseItem) => caseItem.id === selectedCase);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "closed":
        return "bg-blue-500/20 text-blue-700 border-blue-500/30";
      case "archived":
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "in-progress":
        return "bg-blue-500/20 text-blue-700 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "overdue":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock3 className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf"))
      return <FileText className="h-5 w-5 text-red-500" />;
    if (
      type.includes("spreadsheet") ||
      type.includes("excel") ||
      type.includes("xlsx")
    )
      return <BarChart className="h-5 w-5 text-green-500" />;
    if (
      type.includes("word") ||
      type.includes("document") ||
      type.includes("docx")
    )
      return <FileText className="h-5 w-5 text-blue-500" />;
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim() || !currentCase) return;

    // In a real app, you would add the note to the database
    // For this demo, we're just showing the UI
    alert("Note added: " + newNote);
    setNewNote("");
  };

  const handleUploadDocument = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-full bg-white dark:bg-black rounded-lg overflow-hidden flex flex-col relative">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.xlsx,.xls"
        className="hidden"
      />

      {/* Header */}
      <div className="relative h-24 overflow-hidden bg-gradient-to-r from-[#4f46e5]/40 via-[#ec4899]/40 to-[#3b82f6]/40">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white/90">Case Management</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Case List Sidebar */}
        <div
          className={cn(
            "w-full md:w-80 border-r border-white/20 bg-gradient-to-b from-[#4f46e5]/20 to-[#3b82f6]/20",
            selectedCase && "hidden md:block"
          )}
        >
          {/* Search and Filter */}
          <div className="p-4 border-b border-white/20">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 focus-visible:ring-0 focus-visible:border-indigo-600 placeholder:text-black/40 dark:placeholder:text-white/40"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="relative inline-block">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="appearance-none bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 pr-8 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-600"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                  <option value="archived">Archived</option>
                </select>
                <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" /> New Case
              </Button>
            </div>
          </div>

          {/* Case List */}
          <ScrollArea className="h-[calc(100vh-13rem)]">
            <div className="p-2">
              {filteredCases.length > 0 ? (
                filteredCases.map((caseItem) => (
                  <motion.div
                    key={caseItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-4 rounded-xl cursor-pointer transition-all duration-200 mb-2",
                      selectedCase === caseItem.id
                        ? "bg-white/40 backdrop-blur-lg border border-white/30 shadow-lg"
                        : "hover:bg-white/20 backdrop-blur-sm"
                    )}
                    onClick={() => setSelectedCase(caseItem.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 dark:text-white truncate">
                          {caseItem.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {caseItem.client}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium border",
                              getStatusColor(caseItem.status)
                            )}
                          >
                            {caseItem.status}
                          </span>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium border",
                              getPriorityColor(caseItem.priority)
                            )}
                          >
                            {caseItem.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span>Opened: {formatDate(caseItem.openDate)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 mx-2">
                  <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                    No cases found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {searchQuery || filterStatus !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "You don't have any cases yet"}
                  </p>
                  <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-2" /> Create New Case
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Case Details */}
        {currentCase ? (
          <div className="flex-1 bg-gradient-to-r from-[#4f46e5]/40 via-[#ec4899]/40 to-[#3b82f6]/40">
            {/* Case Header */}
            <div className="p-4 border-b border-white/20 bg-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="md:hidden h-8 w-8 p-0"
                      onClick={() => setSelectedCase(null)}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {currentCase.title}
                    </h2>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium border",
                        getStatusColor(currentCase.status)
                      )}
                    >
                      {currentCase.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Client:</span>{" "}
                      {currentCase.client}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Case #:</span>{" "}
                      {currentCase.caseNumber}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" /> Edit Case
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                    <MessageSquare className="h-4 w-4" /> Message Client
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex mt-6 border-b border-white/20">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={cn(
                    "px-4 py-2 font-medium transition-colors",
                    activeTab === "overview"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                  )}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("documents")}
                  className={cn(
                    "px-4 py-2 font-medium transition-colors",
                    activeTab === "documents"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                  )}
                >
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={cn(
                    "px-4 py-2 font-medium transition-colors",
                    activeTab === "notes"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                  )}
                >
                  Notes
                </button>
                <button
                  onClick={() => setActiveTab("tasks")}
                  className={cn(
                    "px-4 py-2 font-medium transition-colors",
                    activeTab === "tasks"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                  )}
                >
                  Tasks
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <ScrollArea className="h-[calc(100vh-13rem)]">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Case Details */}
                      <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                          Case Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Case Type
                                </p>
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {currentCase.type}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Status
                                </p>
                                <p className="font-medium text-gray-800 dark:text-white capitalize">
                                  {currentCase.status}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Priority
                                </p>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      "px-2 py-0.5 rounded-full text-xs font-medium border",
                                      getPriorityColor(currentCase.priority)
                                    )}
                                  >
                                    {currentCase.priority}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Assigned To
                                </p>
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {currentCase.assignedTo}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Open Date
                                </p>
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {formatDate(currentCase.openDate)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Last Activity
                                </p>
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {formatDate(currentCase.lastActivity)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Description
                          </p>
                          <p className="mt-1 text-gray-800 dark:text-white">
                            {currentCase.description}
                          </p>
                        </div>

                        {currentCase.nextHearing && (
                          <div className="mt-6 p-4 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-indigo-600" />
                              <h4 className="font-medium text-gray-800 dark:text-white">
                                Next Hearing
                              </h4>
                            </div>
                            <p className="mt-1 text-gray-800 dark:text-white">
                              {formatDate(currentCase.nextHearing)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Recent Activity */}
                      <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                          Recent Activity
                        </h3>

                        <div className="space-y-4">
                          {/* Combine and sort notes and tasks by date */}
                          {[...currentCase.notes, ...currentCase.tasks]
                            .sort((a, b) => {
                              const dateA =
                                "createdAt" in a ? a.createdAt : a.dueDate;
                              const dateB =
                                "createdAt" in b ? b.createdAt : b.dueDate;
                              return dateB.getTime() - dateA.getTime();
                            })
                            .slice(0, 5)
                            .map((item) => {
                              const isNote = "createdAt" in item;
                              return (
                                <div
                                  key={item.id}
                                  className="flex gap-3 p-3 bg-white/20 dark:bg-white/5 rounded-lg border border-white/10"
                                >
                                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                                    {isNote ? (
                                      <MessageSquare className="h-4 w-4 text-indigo-600" />
                                    ) : (
                                      getTaskStatusIcon(item.status)
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    {isNote ? (
                                      <>
                                        <p className="text-sm text-gray-800 dark:text-white">
                                          {item.content}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-600 dark:text-gray-400">
                                          <span>{item.createdBy}</span>
                                          <span>•</span>
                                          <span>
                                            {formatDateTime(item.createdAt)}
                                          </span>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-sm text-gray-800 dark:text-white">
                                          {item.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-600 dark:text-gray-400">
                                          <span
                                            className={cn(
                                              "px-2 py-0.5 rounded-full text-xs font-medium border",
                                              getTaskStatusColor(item.status)
                                            )}
                                          >
                                            {item.status}
                                          </span>
                                          <span>•</span>
                                          <span>
                                            Due: {formatDate(item.dueDate)}
                                          </span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button
                          variant="outline"
                          className="p-6 h-auto flex flex-col items-center justify-center gap-2 bg-white/20 hover:bg-white/30"
                        >
                          <Upload className="h-6 w-6 text-indigo-600" />
                          <span className="font-medium">Upload Document</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="p-6 h-auto flex flex-col items-center justify-center gap-2 bg-white/20 hover:bg-white/30"
                        >
                          <Plus className="h-6 w-6 text-indigo-600" />
                          <span className="font-medium">Add Task</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="p-6 h-auto flex flex-col items-center justify-center gap-2 bg-white/20 hover:bg-white/30"
                        >
                          <Calendar className="h-6 w-6 text-indigo-600" />
                          <span className="font-medium">Schedule Hearing</span>
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "documents" && (
                    <motion.div
                      key="documents"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Documents ({currentCase.documents.length})
                        </h3>
                        <Button
                          className="bg-indigo-600 hover:bg-indigo-700 gap-2"
                          onClick={handleUploadDocument}
                        >
                          <Upload className="h-4 w-4" /> Upload Document
                        </Button>
                      </div>

                      <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
                        <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/20 bg-white/10 font-medium text-gray-700 dark:text-gray-300">
                          <div className="col-span-2">Name</div>
                          <div>Uploaded By</div>
                          <div>Date</div>
                          <div className="text-right">Actions</div>
                        </div>

                        {currentCase.documents.map((document) => (
                          <div
                            key={document.id}
                            className="grid grid-cols-5 gap-4 p-4 border-b border-white/20 last:border-0 items-center"
                          >
                            <div className="col-span-2 flex items-center gap-3">
                              {getFileIcon(document.type)}
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {document.name}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {document.size}
                                </p>
                              </div>
                            </div>
                            <div className="text-gray-800 dark:text-white">
                              {document.uploadedBy}
                            </div>
                            <div className="text-gray-800 dark:text-white">
                              {formatDate(document.uploadedAt)}
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Download className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {currentCase.documents.length === 0 && (
                        <div className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                          <Folder className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                            No documents yet
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            Upload documents related to this case to keep
                            everything organized.
                          </p>
                          <Button
                            className="mt-4 bg-indigo-600 hover:bg-indigo-700 gap-2"
                            onClick={handleUploadDocument}
                          >
                            <Upload className="h-4 w-4" /> Upload Document
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "notes" && (
                    <motion.div
                      key="notes"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                          Add Note
                        </h3>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Textarea
                              placeholder="Add a note about this case..."
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              className="min-h-[100px] bg-white/20 focus-visible:ring-0 focus-visible:border-indigo-600"
                            />
                          </div>
                          <Button
                            className="bg-indigo-600 hover:bg-indigo-700 self-end gap-2"
                            onClick={handleAddNote}
                            disabled={!newNote.trim()}
                          >
                            <Send className="h-4 w-4" /> Add Note
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                          Notes ({currentCase.notes.length})
                        </h3>

                        <div className="space-y-4">
                          {currentCase.notes.length > 0 ? (
                            currentCase.notes
                              .sort(
                                (a, b) =>
                                  b.createdAt.getTime() - a.createdAt.getTime()
                              )
                              .map((note) => (
                                <motion.div
                                  key={note.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                                      <User className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-gray-800 dark:text-white">
                                          {note.createdBy}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {formatDateTime(note.createdAt)}
                                          </span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                          >
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                      <p className="mt-2 text-gray-800 dark:text-white whitespace-pre-line">
                                        {note.content}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              ))
                          ) : (
                            <div className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                              <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                                No notes yet
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300">
                                Add notes to keep track of important information
                                about this case.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "tasks" && (
                    <motion.div
                      key="tasks"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Tasks ({currentCase.tasks.length})
                        </h3>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                          <Plus className="h-4 w-4" /> Add Task
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Tasks by Status */}
                        <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
                          <h4 className="font-medium text-gray-800 dark:text-white mb-4">
                            Tasks by Status
                          </h4>

                          <div className="space-y-2">
                            {[
                              "pending",
                              "in-progress",
                              "completed",
                              "overdue",
                            ].map((status) => {
                              const count = currentCase.tasks.filter(
                                (task) => task.status === status
                              ).length;
                              return (
                                <div
                                  key={status}
                                  className="flex items-center justify-between p-2 bg-white/20 dark:bg-white/5 rounded-lg"
                                >
                                  <div className="flex items-center gap-2">
                                    {getTaskStatusIcon(status)}
                                    <span className="capitalize text-gray-800 dark:text-white">
                                      {status}
                                    </span>
                                  </div>
                                  <span
                                    className={cn(
                                      "px-2 py-0.5 rounded-full text-xs font-medium",
                                      getTaskStatusColor(status)
                                    )}
                                  >
                                    {count}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Upcoming Deadlines */}
                        <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
                          <h4 className="font-medium text-gray-800 dark:text-white mb-4">
                            Upcoming Deadlines
                          </h4>

                          <div className="space-y-2">
                            {currentCase.tasks
                              .filter((task) => task.status !== "completed")
                              .sort(
                                (a, b) =>
                                  a.dueDate.getTime() - b.dueDate.getTime()
                              )
                              .slice(0, 3)
                              .map((task) => (
                                <div
                                  key={task.id}
                                  className="flex items-center justify-between p-2 bg-white/20 dark:bg-white/5 rounded-lg"
                                >
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-indigo-600" />
                                    <span className="text-gray-800 dark:text-white">
                                      {task.title}
                                    </span>
                                  </div>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {formatDate(task.dueDate)}
                                  </span>
                                </div>
                              ))}

                            {currentCase.tasks.filter(
                              (task) => task.status !== "completed"
                            ).length === 0 && (
                              <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                                No upcoming deadlines
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Task List */}
                      <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
                        <div className="grid grid-cols-6 gap-4 p-4 border-b border-white/20 bg-white/10 font-medium text-gray-700 dark:text-gray-300">
                          <div className="col-span-2">Task</div>
                          <div>Assigned To</div>
                          <div>Due Date</div>
                          <div>Status</div>
                          <div className="text-right">Actions</div>
                        </div>

                        {currentCase.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="grid grid-cols-6 gap-4 p-4 border-b border-white/20 last:border-0 items-center"
                          >
                            <div className="col-span-2">
                              <p className="font-medium text-gray-800 dark:text-white">
                                {task.title}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {task.description}
                              </p>
                            </div>
                            <div className="text-gray-800 dark:text-white">
                              {task.assignedTo}
                            </div>
                            <div className="text-gray-800 dark:text-white">
                              {formatDate(task.dueDate)}
                            </div>
                            <div>
                              <span
                                className={cn(
                                  "px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 w-fit",
                                  getTaskStatusColor(task.status)
                                )}
                              >
                                {getTaskStatusIcon(task.status)}
                                <span className="capitalize">
                                  {task.status}
                                </span>
                              </span>
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {currentCase.tasks.length === 0 && (
                        <div className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                          <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                            No tasks yet
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            Add tasks to keep track of deadlines and
                            responsibilities for this case.
                          </p>
                          <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 gap-2">
                            <Plus className="h-4 w-4" /> Add Task
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-[#4f46e5]/40 via-[#ec4899]/40 to-[#3b82f6]/40">
            <div className="text-center max-w-md px-4">
              <Briefcase className="h-16 w-16 mx-auto text-white/60 mb-6" />
              <h2 className="text-2xl font-bold text-white/90 mb-4">
                Case Management
              </h2>
              <p className="text-white/70 mb-6">
                Select a case from the sidebar to view details, manage
                documents, add notes, and track tasks.
              </p>
              <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 gap-2">
                <Plus className="h-4 w-4" /> Create New Case
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
