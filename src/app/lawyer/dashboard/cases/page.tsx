"use client";

import { useState, useRef, useMemo, useCallback } from "react";
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
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

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

  const getStatusColor = useMemo(
    () => (status: string) => {
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
    },
    []
  );

  const getPriorityColor = useMemo(
    () => (priority: string) => {
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
    },
    []
  );

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

  const handleAddNote = useCallback(() => {
    if (!newNote.trim() || !currentCase) return;

    // In a real app, you would add the note to the database
    // For this demo, we're just showing the UI
    alert("Note added: " + newNote);
    setNewNote("");
  }, [newNote, currentCase]);

  const handleUploadDocument = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="w-full h-full border-[1.5px] dark:bg-black bg-white  rounded-lg">
      <div className="w-full h-full rounded-lg overflow-hidden flex relative">
        {/* <div className="w-full h-full rounded-2xl overflow-hidden flex flex-col relative"> */}
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.xlsx,.xls"
          className="hidden"
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row ">
          <div
            className={cn(
              isMobileView
                ? "absolute inset-y-0 left-0 z-20 w-full md:w-80"
                : "w-80"
            )}
          >
            {/* Search */}
            <div className="p-5">
              <div className="relative">
                {searchQuery && (
                  <>
                    <ArrowRight className="absolute left-3 top-2 h-5 w-5 text-amber-700" />
                  </>
                )}
                <Input
                  placeholder="Search Cases"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "bg-transparent rounded-2xl text-left focus-visible:ring-0 border-2 border-amber-700/40 focus-visible:scale-105 focus-visible:border-amber-700/40 transition-all duration-150 dark:placeholder:text-white/40 placeholder:text-black/40",
                    searchQuery != "" ? "text-center" : "text-left"
                  )}
                />
              </div>
            </div>

            {/* Case List */}
            <ScrollArea className="flex border-t-2 border-amber-700/50 ">
              <div className="p-5 h-[calc(100vh-20rem)]">
                {isLoading ? (
                  <></>
                ) : cases
                    .filter(
                      (caseItem) =>
                        caseItem.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        (caseItem.type &&
                          caseItem.type
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))
                    )
                    .sort((a, b) => {
                      // if (a.isPinned && !b.isPinned) return -1;
                      // if (!a.isPinned && b.isPinned) return 1;
                      return (
                        new Date(b.openDate).getTime() -
                        new Date(a.openDate).getTime()
                      );
                    }).length > 0 ? (
                  cases
                    .filter(
                      (caseItem) =>
                        caseItem.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        (caseItem.type &&
                          caseItem.type
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))
                    )
                    .sort((a, b) => {
                      // if (a.isPinned && !b.isPinned) return -1;
                      // if (!a.isPinned && b.isPinned) return 1;
                      return (
                        new Date(b.openDate).getTime() -
                        new Date(a.openDate).getTime()
                      );
                    })
                    .map((caseItem) => (
                      <motion.div
                        key={caseItem.id}
                        onClick={() => {
                          setSelectedCase(caseItem.id);
                          if (isMobileView) {
                            // setShowSidebar(false);
                          }
                        }}
                        className={cn(
                          "px-4 py-3 rounded-[36px] cursor-pointer transition-all duration-200 mb-2 relative",
                          selectedCase === caseItem.id
                            ? "bg-white/30 backdrop-blur-lg shadow-lg"
                            : "hover:bg-white/20 backdrop-blur-sm m-2"
                        )}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-center">
                          <div className="relative">
                            <div className="w-12 h-12 bg-amber-700 mr-4 rounded-full flex items-center justify-center">
                              <Briefcase className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 mt-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-800 dark:text-white truncate">
                                {caseItem.title.split(" ")[0]}
                              </h3>
                              <div className="flex items-center gap-1 justify-center mr-6">
                                <span className="text-xs text-black dark:text-white/40">
                                  {caseItem.lastActivity.toLocaleTimeString(
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
                                {caseItem.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                ) : (
                  <div className="text-center py-12 rounded-xl border border-white/40">
                    <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                      No cases found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {searchQuery
                        ? "Try adjusting your search criteria"
                        : "You don't have any cases yet"}
                    </p>
                    <Button className="mt-4 bg-amber-700 hover:bg-amber-700 gap-2">
                      <Plus className="h-4 w-4 mr-2" /> Create New Case
                    </Button>
                  </div>
                )}
              </div>
              {/* New Case Button */}
              <div className="flex justify-center items-center mb-4 mx-auto">
                <Button className="text-white rounded-2xl hover:text-black bg-amber-700 hover:bg-white backdrop-blur-sm border-2 border-white gap-2">
                  <Plus className="h-4 w-4 mr-2" /> New Case
                </Button>
              </div>
            </ScrollArea>
          </div>

          {/* Case Details */}
          {currentCase ? (
            <div className="flex-1 p-0">
              {/* Case Header */}
              <div className="p-4 border-b border-white/20  bg-amber-700/10">
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
                    <Button className="bg-amber-700 hover:bg-amber-700 gap-2">
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
                        ? "text-amber-700 border-b-2 border-[#3b82f6-600"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#3b82f6-600"
                    )}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("documents")}
                    className={cn(
                      "px-4 py-2 font-medium transition-colors",
                      activeTab === "documents"
                        ? "text-amber-700 border-b-2 border-[#3b82f6-600"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#3b82f6-600"
                    )}
                  >
                    Documents
                  </button>
                  <button
                    onClick={() => setActiveTab("notes")}
                    className={cn(
                      "px-4 py-2 font-medium transition-colors",
                      activeTab === "notes"
                        ? "text-amber-700 border-b-2 border-[#3b82f6-600"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#3b82f6-600"
                    )}
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => setActiveTab("tasks")}
                    className={cn(
                      "px-4 py-2 font-medium transition-colors",
                      activeTab === "tasks"
                        ? "text-amber-700 border-b-2 border-[#3b82f6-600"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#3b82f6-600"
                    )}
                  >
                    Tasks
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="p-6">
                  <div className="tab-content">
                    {/* Overview Tab */}
                    <div
                      className={cn(
                        "space-y-6 transition-opacity duration-300",
                        activeTab === "overview"
                          ? "opacity-100"
                          : "opacity-0 hidden"
                      )}
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
                          <div className="mt-6 p-4 bg-amber-7000/50 dark:bg-amber-7000/20 rounded-lg border border-amber-700 dark:border-[#3b82f6-800">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-[#3b82f6-600" />
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
                                  <div className="w-8 h-8 bg-amber-700 dark:bg-amber-7000/50 rounded-full flex items-center justify-center">
                                    {isNote ? (
                                      <MessageSquare className="h-4 w-4 text-[#3b82f6-600" />
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
                          <Upload className="h-6 w-6 text-[#3b82f6-600" />
                          <span className="font-medium">Upload Document</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="p-6 h-auto flex flex-col items-center justify-center gap-2 bg-white/20 hover:bg-white/30"
                        >
                          <Plus className="h-6 w-6 text-[#3b82f6-600" />
                          <span className="font-medium">Add Task</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="p-6 h-auto flex flex-col items-center justify-center gap-2 bg-white/20 hover:bg-white/30"
                        >
                          <Calendar className="h-6 w-6 text-[#3b82f6-600" />
                          <span className="font-medium">Schedule Hearing</span>
                        </Button>
                      </div>
                    </div>

                    {/* Documents Tab */}
                    <div
                      className={cn(
                        "space-y-6 transition-opacity duration-300",
                        activeTab === "documents"
                          ? "opacity-100"
                          : "opacity-0 hidden"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Documents ({currentCase.documents.length})
                        </h3>
                        <Button
                          className="bg-amber-700 hover:bg-amber-700 gap-2"
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
                            className="mt-4 bg-amber-700 hover:bg-amber-700 gap-2"
                            onClick={handleUploadDocument}
                          >
                            <Upload className="h-4 w-4" /> Upload Document
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Notes Tab */}
                    <div
                      className={cn(
                        "space-y-6 transition-opacity duration-300",
                        activeTab === "notes"
                          ? "opacity-100"
                          : "opacity-0 hidden"
                      )}
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
                              className="min-h-[100px] bg-white/20 focus-visible:ring-0 focus-visible:border-[#3b82f6-600"
                            />
                          </div>
                          <Button
                            className="bg-amber-700 hover:bg-amber-700 self-end gap-2"
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
                              .map((note, index) => (
                                <div
                                  key={note.id}
                                  className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 opacity-0 transform translate-y-4 animate-fade-in"
                                  style={{
                                    animationDelay: `${index * 100}ms`,
                                    animationFillMode: "forwards",
                                  }}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-amber-700 dark:bg-amber-7000/50 rounded-full flex items-center justify-center">
                                      <User className="h-5 w-5 text-[#3b82f6-600" />
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
                                </div>
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
                    </div>

                    {/* Tasks Tab */}
                    <div
                      className={cn(
                        "space-y-6 transition-opacity duration-300",
                        activeTab === "tasks"
                          ? "opacity-100"
                          : "opacity-0 hidden"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Tasks ({currentCase.tasks.length})
                        </h3>
                        <Button className="bg-amber-700 hover:bg-amber-700 gap-2">
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
                                    <Calendar className="h-4 w-4 text-[#3b82f6-600" />
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
                          <Button className="mt-4 bg-amber-700 hover:bg-amber-700 gap-2">
                            <Plus className="h-4 w-4" /> Add Task
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md px-4">
                <User className="h-16 w-16 mx-auto text-amber-700 dark:text-white/60 mb-6" />
                <h2 className="text-2xl font-bold text-amber-700 dark:text-white/90 mb-4">
                  Case Management
                </h2>
                <p className="dark:text-white/70 text-amber-700 mb-6">
                  Select a case from the sidebar to manage
                </p>
                <Button className="bg-transparent dark:text-white text-amber-700 hover:text-white hover:bg-amber-700 backdrop-blur-sm border-2 border-amber-700 gap-2">
                  <Plus className="h-4 w-4" /> Create New Case
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
