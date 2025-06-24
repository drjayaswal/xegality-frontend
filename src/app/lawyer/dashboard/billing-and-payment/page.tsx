"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Download,
  FileText,
  Search,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  Send,
  User,
  Receipt,
  Eye,
  Trash2,
  Copy,
  DollarSign,
  Save,
} from "lucide-react";

interface Invoice {
  id: string;
  name: string;
  email: string;
  amount: number;
  time: Date;
  dueDate: Date;
  description: string;
  status: "paid" | "pending" | "overdue" | "draft";
  items: InvoiceItem[];
  notes?: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function InvoiceManagement() {
  const tabs = [
    { id: "invoices", label: "All Invoices", icon: FileText },
    { id: "create", label: "Create Invoice", icon: Plus },
    { id: "drafts", label: "Drafts", icon: Clock },
  ];

  const [activeTab, setActiveTab] = useState<"invoices" | "create" | "drafts">(
    "invoices"
  );
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const tabCount = tabs.length;
  const indicatorWidth = 100 / tabCount;

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "pending" | "overdue" | "draft"
  >("all");
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [invoiceList, setInvoiceList] = useState<Invoice[]>([
    {
      id: "INV-2023-006",
      name: "Thomas Nguyen",
      email: "thomas.nguyen@email.com",
      amount: 980.0,
      time: new Date(2023, 6, 12),
      dueDate: new Date(2023, 7, 12),
      description: "Employment contract drafting and legal consultation",
      status: "paid",
      items: [
        {
          id: "1",
          description: "Legal consultation",
          quantity: 4,
          rate: 200,
          amount: 800,
        },
        {
          id: "2",
          description: "Document drafting",
          quantity: 1,
          rate: 180,
          amount: 180,
        },
      ],
      notes: "Payment received via bank transfer",
    },
    {
      id: "INV-2023-007",
      name: "Ashley Patel",
      email: "ashley.patel@email.com",
      amount: 1340.0,
      time: new Date(2023, 7, 3),
      dueDate: new Date(2023, 8, 3),
      description: "Business formation and incorporation documentation",
      status: "pending",
      items: [
        {
          id: "1",
          description: "Business formation",
          quantity: 1,
          rate: 1200,
          amount: 1200,
        },
        {
          id: "2",
          description: "Legal review",
          quantity: 1,
          rate: 140,
          amount: 140,
        },
      ],
    },
    {
      id: "INV-2023-008",
      name: "Christopher Brown",
      email: "chris.brown@email.com",
      amount: 1750.0,
      time: new Date(2023, 3, 28),
      dueDate: new Date(2023, 4, 28),
      description: "Civil litigation representation and pre-trial filings",
      status: "overdue",
      items: [
        {
          id: "1",
          description: "Litigation representation",
          quantity: 8,
          rate: 200,
          amount: 1600,
        },
        {
          id: "2",
          description: "Court filings",
          quantity: 1,
          rate: 150,
          amount: 150,
        },
      ],
    },
    {
      id: "DRAFT-001",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@email.com",
      amount: 750.0,
      time: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      description: "Contract review and negotiation",
      status: "draft",
      items: [
        {
          id: "1",
          description: "Contract review",
          quantity: 3,
          rate: 250,
          amount: 750,
        },
      ],
    },
  ]);

  const [newInvoiceForm, setNewInvoiceForm] = useState({
    name: "",
    email: "",
    amount: "",
    description: "",
    dueDate: "",
    items: [
      { id: "1", description: "", quantity: 1, rate: 0, amount: 0 },
    ] as InvoiceItem[],
    notes: "",
  });

  // Dashboard statistics
  const stats = useMemo(() => {
    const totalAmount = invoiceList
      .filter((inv) => inv.status !== "draft")
      .reduce((sum, inv) => sum + inv.amount, 0);
    const paidAmount = invoiceList
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.amount, 0);
    const pendingAmount = invoiceList
      .filter((inv) => inv.status === "pending")
      .reduce((sum, inv) => sum + inv.amount, 0);
    const overdueAmount = invoiceList
      .filter((inv) => inv.status === "overdue")
      .reduce((sum, inv) => sum + inv.amount, 0);
    const draftCount = invoiceList.filter(
      (inv) => inv.status === "draft"
    ).length;

    return {
      totalAmount,
      paidAmount,
      pendingAmount,
      overdueAmount,
      draftCount,
      invoiceCount: invoiceList.filter((inv) => inv.status !== "draft").length,
      clientCount: new Set(invoiceList.map((inv) => inv.name)).size,
    };
  }, [invoiceList]);

  const filteredInvoices = useMemo(() => {
    let filtered = invoiceList;

    if (activeTab === "drafts") {
      filtered = invoiceList.filter((invoice) => invoice.status === "draft");
    } else if (activeTab === "invoices") {
      filtered = invoiceList.filter((invoice) => invoice.status !== "draft");
    }

    return filtered.filter((invoice) => {
      const matchesSearch =
        invoice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || invoice.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [invoiceList, searchQuery, filterStatus, activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "overdue":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300";
      case "draft":
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "draft":
        return <FileText className="h-4 w-4 text-slate-600" />;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const toggleInvoiceExpand = (id: string) => {
    setExpandedInvoice(expandedInvoice === id ? null : id);
  };

  const handleNewInvoiceSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    if (
      !newInvoiceForm.name ||
      !newInvoiceForm.email ||
      !newInvoiceForm.description
    ) {
      return;
    }

    const totalAmount = newInvoiceForm.items.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const newInvoice: Invoice = {
      id: isDraft
        ? `DRAFT-${String(stats.draftCount + 1).padStart(3, "0")}`
        : `INV-${new Date().getFullYear()}-${String(
            invoiceList.length + 1
          ).padStart(3, "0")}`,
      name: newInvoiceForm.name,
      email: newInvoiceForm.email,
      amount: totalAmount,
      time: new Date(),
      dueDate: new Date(newInvoiceForm.dueDate),
      description: newInvoiceForm.description,
      status: isDraft ? "draft" : "pending",
      items: newInvoiceForm.items,
      notes: newInvoiceForm.notes,
    };

    setInvoiceList([newInvoice, ...invoiceList]);
    setNewInvoiceForm({
      name: "",
      email: "",
      amount: "",
      description: "",
      dueDate: "",
      items: [{ id: "1", description: "", quantity: 1, rate: 0, amount: 0 }],
      notes: "",
    });
    setSuccessMessage(
      isDraft ? "Draft saved successfully!" : "Invoice created successfully!"
    );
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    setActiveTab("invoices");
  };

  const handleFormChange = (field: string, value: string) => {
    setNewInvoiceForm((prev) => ({ ...prev, [field]: value }));
  };

  const addInvoiceItem = () => {
    const newItem: InvoiceItem = {
      id: String(newInvoiceForm.items.length + 1),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setNewInvoiceForm((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateInvoiceItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updatedItems = [...newInvoiceForm.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (field === "quantity" || field === "rate") {
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].rate;
    }

    setNewInvoiceForm((prev) => ({ ...prev, items: updatedItems }));
  };

  const removeInvoiceItem = (index: number) => {
    if (newInvoiceForm.items.length > 1) {
      setNewInvoiceForm((prev) => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index),
      }));
    }
  };

  const deleteInvoice = (invoiceId: string) => {
    setInvoiceList((prev) =>
      prev.filter((invoice) => invoice.id !== invoiceId)
    );
    if (expandedInvoice === invoiceId) {
      setExpandedInvoice(null);
    }
    setSuccessMessage("Invoice deleted successfully!");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const duplicateInvoice = (invoice: Invoice) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: `INV-${new Date().getFullYear()}-${String(
        invoiceList.length + 1
      ).padStart(3, "0")}`,
      time: new Date(),
      status: "draft",
    };
    setInvoiceList([newInvoice, ...invoiceList]);
    setSuccessMessage("Invoice duplicated as draft!");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const updateInvoiceStatus = (
    invoiceId: string,
    newStatus: Invoice["status"]
  ) => {
    setInvoiceList((prev) =>
      prev.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
      )
    );
    setSuccessMessage(`Invoice status updated to ${newStatus}!`);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="flex flex-col h-full relative border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-amber-700/5 overflow-hidden">
      {/* Header */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-950 to-amber-900 transition-all duration-300"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-slate-900/20 to-amber-600/20"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <Receipt className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Invoice Management
                </h1>
                <p className="text-amber-100 text-sm font-medium">
                  Create, manage, and track your invoices
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-amber-100 text-sm">Total Revenue</p>
              <p className="text-white text-lg sm:text-xl font-bold">
                {formatCurrency(stats.totalAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="relative flex rounded-lg p-1 overflow-hidden">
          {/* Sliding indicator */}
          <motion.div
            className="absolute top-1 bottom-1 bg-amber-800 dark:bg-slate-700 rounded-md shadow-sm"
            style={{
              width: `calc(${indicatorWidth}% - 8px)`,
              left: "4px",
            }}
            animate={{
              x: `calc(${activeIndex * 100}% + ${activeIndex * 4}px)`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex-1 relative z-10 py-2 px-3 text-center text-sm font-medium transition-colors duration-200 rounded-md",
                  isActive
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="px-4 sm:px-6 lg:px-8 pb-6 min-h-full">
            <AnimatePresence mode="wait">
              {(activeTab === "invoices" || activeTab === "drafts") && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-5">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-700" />
                      <Input
                        placeholder="Search invoices..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10  border-amber-700/40 focus-visible:ring-0 focus-visible:border-amber-700"
                      />
                    </div>
                    <div className="flex gap-2">
                      {activeTab === "invoices" && (
                        <select
                          value={filterStatus}
                          onChange={(e) =>
                            setFilterStatus(e.target.value as any)
                          }
                          className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:border-amber-500"
                        >
                          <option value="all">All Status</option>
                          <option value="paid">Paid</option>
                          <option value="pending">Pending</option>
                          <option value="overdue">Overdue</option>
                        </select>
                      )}
                      <Button
                        onClick={() => setActiveTab("create")}
                        className="bg-amber-800 hover:bg-amber-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        New Invoice
                      </Button>
                    </div>
                  </div>

                  {/* Invoice List */}
                  <div className="space-y-3">
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((invoice, index) => (
                        <motion.div
                          key={invoice.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-transparent dark:bg-slate-800 rounded-xl overflow-hidden"
                        >
                          <div
                            className="p-4 flex justify-between items-center cursor-pointer hover:bg-amber-700/10 dark:hover:bg-slate-700/50 transition-colors"
                            onClick={() => toggleInvoiceExpand(invoice.id)}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <div className="p-1.5 bg-gradient-to-br from-amber-700 to-amber-800 text-white rounded-lg">
                                <Receipt className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                                    {invoice.name}
                                  </h3>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                  <span>{invoice.id}</span>
                                  <span>{invoice.email}</span>
                                  <span>{formatDate(invoice.time)}</span>
                                  <span className="font-medium text-amber-600">
                                    {formatCurrency(invoice.amount)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              {expandedInvoice === invoice.id ? (
                                <ChevronDown className="h-4 w-4 text-black" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-black" />
                              )}
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedInvoice === invoice.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-0 border-t border-amber-700 dark:border-slate-700">
                                  <div className="pt-4 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                                          Description
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">
                                          {invoice.description}
                                        </p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                                          Due Date
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">
                                          {formatDate(invoice.dueDate)}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Invoice Items */}
                                    <div>
                                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                                        Items
                                      </h4>
                                      <div className="space-y-2">
                                        {invoice.items.map((item) => (
                                          <div
                                            key={item.id}
                                            className="flex justify-between items-center text-sm font-bold bg-amber-700/10 rounded-lg px-4 p-2"
                                          >
                                            <span className="text-slate-600 dark:text-slate-400">
                                              {item.description}
                                            </span>
                                            <span className="text-slate-900 dark:text-white">
                                              {item.quantity} ×{" "}
                                              {formatCurrency(item.rate)} ={" "}
                                              {formatCurrency(item.amount)}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {invoice.notes && (
                                      <div>
                                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                                          Notes
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 font-bold bg-amber-700/10 rounded-lg px-4 py-2">
                                          {invoice.notes}
                                        </p>
                                      </div>
                                    )}

                                    <div className="flex justify-between items-center pt-2">
                                      <div className="flex gap-2">
                                        {invoice.status !== "paid" && (
                                          <select
                                            value={invoice.status}
                                            onChange={(e) =>
                                              updateInvoiceStatus(
                                                invoice.id,
                                                e.target
                                                  .value as Invoice["status"]
                                              )
                                            }
                                            className="px-2 py-1 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:border-amber-500"
                                          >
                                            <option value="draft">Draft</option>
                                            <option value="pending">
                                              Pending
                                            </option>
                                            <option value="paid">Paid</option>
                                            <option value="overdue">
                                              Overdue
                                            </option>
                                          </select>
                                        )}
                                      </div>
                                      <div className="flex gap-2">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            duplicateInvoice(invoice)
                                          }
                                          className="px-2 py-1 text-xs bg-transparent border-0 shadow-none hover:bg-amber-700 hover:text-white"
                                        >
                                          <Copy className="h-4 w-4 mr-1" />
                                          Duplicate
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="px-2 py-1 text-xs bg-transparent border-0 shadow-none hover:bg-amber-700 hover:text-white"
                                        >
                                          <Eye className="h-4 w-4 mr-1" />
                                          View
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="px-2 py-1 text-xs bg-transparent border-0 text-emerald-500 shadow-none hover:bg-emerald-600 hover:text-white"
                                        >
                                          <Download className="h-4 w-4 mr-1" />
                                          PDF
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="px-2 py-1 text-xs bg-transparent text-red-500 border-0 shadow-none hover:bg-red-600 hover:text-white"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            deleteInvoice(invoice.id);
                                          }}
                                        >
                                          <Trash2 className="h-4 w-4 mr-1" />
                                          Delete
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-66 rounded-xl border-amber-600 border-dotted border-2 bg-muted/30 dark:bg-muted/10">
                        <FileText className="h-14 w-14 mx-auto text-amber-600 mb-3" />
                        <h3 className="text-lg font-semibold text-foreground">
                          {searchQuery
                            ? "No invoices found"
                            : activeTab === "drafts"
                            ? "No drafts yet"
                            : "No invoices yet"}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {activeTab === "drafts"
                            ? "Create a new invoice and save it as draft"
                            : "Create your first invoice to get started"}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "create" && (
                <motion.div
                  key="create"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="pt-5">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                      Create New Invoice
                    </h2>

                    <form className="space-y-6">
                      {/* Client Information */}
                      <div className=" rounded-xl p-6">
                        <h3 className="font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <User className="h-4 w-4 text-amber-600" />
                          Client Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Client Name *
                            </label>
                            <Input
                              type="text"
                              value={newInvoiceForm.name}
                              onChange={(e) =>
                                handleFormChange("name", e.target.value)
                              }
                              placeholder="Enter client name"
                              className="border-amber-700/40 focus-visible:ring-0 focus-visible:border-amber-700"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              value={newInvoiceForm.email}
                              onChange={(e) =>
                                handleFormChange("email", e.target.value)
                              }
                              placeholder="client@email.com"
                              className="border-amber-700/40 focus-visible:ring-0 focus-visible:border-amber-700"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      {/* Invoice Details */}
                      <div className=" rounded-xl p-6">
                        <h3 className="font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-amber-600" />
                          Invoice Details
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Description *
                            </label>
                            <Input
                              type="text"
                              value={newInvoiceForm.description}
                              onChange={(e) =>
                                handleFormChange("description", e.target.value)
                              }
                              placeholder="Brief description of services"
                              className="border-amber-700/40 focus-visible:ring-0 focus-visible:border-amber-700"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Due Date *
                            </label>
                            <Input
                              type="date"
                              value={newInvoiceForm.dueDate}
                              onChange={(e) =>
                                handleFormChange("dueDate", e.target.value)
                              }
                              className="border-amber-700/40 focus-visible:ring-0 focus-visible:border-amber-700"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      {/* Invoice Items */}
                      <div className="rounded-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-amber-600" />
                            Invoice Items
                          </h3>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={addInvoiceItem}
                            className="bg-transparent text-amber-700 border-0 shadow-none hover:bg-amber-700 hover:text-white"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Item
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {newInvoiceForm.items.map((item, index) => (
                            <div
                              key={item.id}
                              className="grid grid-cols-12 gap-3 items-end"
                            >
                              <div className="col-span-5">
                                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                                  Description
                                </label>
                                <Input
                                  type="text"
                                  value={item.description}
                                  onChange={(e) =>
                                    updateInvoiceItem(
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Service description"
                                  className="border-amber-700/40 focus-visible:ring-0 focus-visible:border-amber-700"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                                  Qty
                                </label>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateInvoiceItem(
                                      index,
                                      "quantity",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="border-amber-700/40 focus-visible:ring-0 focus-visible:border-amber-700"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                                  Rate
                                </label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={item.rate}
                                  onChange={(e) =>
                                    updateInvoiceItem(
                                      index,
                                      "rate",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="border-amber-700/40 focus-visible:ring-0 focus-visible:border-amber-700"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                                  Amount
                                </label>
                                <Input
                                  type="text"
                                  value={formatCurrency(item.amount)}
                                  readOnly
                                  className="border-amber-700/40 focus-visible:ring-0 focus-visible:border-amber-700"
                                />
                              </div>
                              <div className="col-span-1">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeInvoiceItem(index)}
                                  disabled={newInvoiceForm.items.length === 1}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-900 dark:text-white">
                              Total Amount:
                            </span>
                            <span className="text-lg font-bold text-amber-600">
                              {formatCurrency(
                                newInvoiceForm.items.reduce(
                                  (sum, item) => sum + item.amount,
                                  0
                                )
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Notes */}
                      <div className=" rounded-xl p-6">
                        <h3 className="font-medium text-slate-900 dark:text-white mb-4">
                          Additional Notes
                        </h3>
                        <Textarea
                          value={newInvoiceForm.notes}
                          onChange={(e) =>
                            handleFormChange("notes", e.target.value)
                          }
                          placeholder="Any additional notes or terms..."
                          className="border-amber-700/40 focus-visible:ring-0 focus-visible:border-amber-700"
                          rows={3}
                        />
                      </div>
                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("invoices")}
                          className="flex-1 border-0 hover:bg-gray-700 hover:text-white dark:bg-transparent shadow-none border-gray-700/10 dark:border-gray-600 text-white dark:text-gray-400 bg-gray-700/50 dark:hover:bg-gray-800/30 transition"
                        >
                          Cancel
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={(e) => handleNewInvoiceSubmit(e, true)}
                          className="flex-1 border-0 hover:bg-amber-700 hover:text-white dark:bg-transparent shadow-none border-amber-700/10 dark:border-amber-600 text-white dark:text-amber-400 bg-amber-700/50 dark:hover:bg-amber-800/30 transition"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save as Draft
                        </Button>

                        <Button
                          type="button"
                          onClick={(e) => handleNewInvoiceSubmit(e, false)}
                          className="flex-1 bg-amber-700 hover:bg-amber-800 text-white shadow-md transition"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Create Invoice
                        </Button>
                      </div>{" "}
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-amber-200 dark:border-amber-800 p-4 flex items-center gap-3 z-50 max-w-sm"
          >
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                Success!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {successMessage}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuccessMessage(false)}
              className="h-6 w-6 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
