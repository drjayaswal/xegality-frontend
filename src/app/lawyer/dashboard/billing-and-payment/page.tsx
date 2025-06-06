"use client";

import type React from "react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Clock,
  DollarSign,
  Download,
  FileText,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
} from "lucide-react";

interface Invoice {
  id: string;
  client: string;
  amount: number;
  date: Date;
  dueDate: Date;
  status: "paid" | "pending" | "overdue";
  description: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  name: string;
  last4: string;
  expiryDate?: string;
  isDefault: boolean;
}

export default function BillingPayments() {
  const [activeTab, setActiveTab] = useState<"invoices" | "payments">(
    "invoices"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "pending" | "overdue"
  >("all");
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);

  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([
    {
      id: "INV-2023-001",
      client: "Sarah Johnson",
      amount: 1250.0,
      date: new Date(2023, 4, 15),
      dueDate: new Date(2023, 5, 15),
      status: "paid",
      description:
        "Legal consultation and document preparation for corporate merger",
    },
    {
      id: "INV-2023-002",
      client: "Michael Chen",
      amount: 850.0,
      date: new Date(2023, 5, 2),
      dueDate: new Date(2023, 6, 2),
      status: "pending",
      description: "Property contract review and legal advisory services",
    },
    {
      id: "INV-2023-003",
      client: "Emily Rodriguez",
      amount: 1500.0,
      date: new Date(2023, 4, 10),
      dueDate: new Date(2023, 5, 10),
      status: "overdue",
      description: "Family law case representation and court appearance",
    },
    {
      id: "INV-2023-004",
      client: "David Wilson",
      amount: 750.0,
      date: new Date(2023, 5, 20),
      dueDate: new Date(2023, 6, 20),
      status: "paid",
      description:
        "Trademark registration and intellectual property consultation",
    },
  ]);
  const [newInvoiceForm, setNewInvoiceForm] = useState({
    client: "",
    amount: "",
    description: "",
    dueDate: "",
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: "pm-1",
      type: "card",
      name: "Visa ending in",
      last4: "4242",
      expiryDate: "05/25",
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "bank",
      name: "Bank Of Baro",
      last4: "6789",
      isDefault: false,
    },
  ];

  const filteredInvoices = invoiceList.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "overdue":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
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

  const handleNewInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newInvoiceForm.client ||
      !newInvoiceForm.amount ||
      !newInvoiceForm.description ||
      !newInvoiceForm.dueDate
    ) {
      return;
    }

    const newInvoice: Invoice = {
      id: `INV-${new Date().getFullYear()}-${String(
        invoiceList.length + 1
      ).padStart(3, "0")}`,
      client: newInvoiceForm.client,
      amount: Number.parseFloat(newInvoiceForm.amount),
      date: new Date(),
      dueDate: new Date(newInvoiceForm.dueDate),
      status: "pending",
      description: newInvoiceForm.description,
    };

    setInvoiceList([newInvoice, ...invoiceList]);
    setNewInvoiceForm({ client: "", amount: "", description: "", dueDate: "" });
    setShowNewInvoiceModal(false);
  };

  const handleFormChange = (field: string, value: string) => {
    setNewInvoiceForm((prev) => ({ ...prev, [field]: value }));
  };

  const markAsPaid = (invoiceId: string) => {
    setInvoiceList((prev) =>
      prev.map((invoice) =>
        invoice.id === invoiceId
          ? { ...invoice, status: "paid" as const }
          : invoice
      )
    );
  };

  const deleteInvoice = (invoiceId: string) => {
    setInvoiceList((prev) =>
      prev.filter((invoice) => invoice.id !== invoiceId)
    );
    if (expandedInvoice === invoiceId) {
      setExpandedInvoice(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-gray-700/50 p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Billing & Payments
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Manage your invoices and payment methods
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Outstanding
                  </p>
                  <p className="text-xl font-semibold text-amber-600">
                    {formatCurrency(
                      invoiceList
                        .filter((inv) => inv.status !== "paid")
                        .reduce((sum, inv) => sum + inv.amount, 0)
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
          <div className="flex border-b border-amber-200/50 dark:border-gray-700/50">
            <button
              onClick={() => setActiveTab("invoices")}
              className={cn(
                "flex-1 py-4 px-6 text-center font-medium transition-all duration-200 relative",
                activeTab === "invoices"
                  ? "text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/20"
                  : "text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/30 dark:hover:bg-amber-900/10"
              )}
            >
              <span className="relative z-10">Invoices</span>
              {activeTab === "invoices" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-400 transition-all duration-200" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={cn(
                "flex-1 py-4 px-6 text-center font-medium transition-all duration-200 relative",
                activeTab === "payments"
                  ? "text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/20"
                  : "text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/30 dark:hover:bg-amber-900/10"
              )}
            >
              <span className="relative z-10">Payment Methods</span>
              {activeTab === "payments" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-400 transition-all duration-200" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <ScrollArea className="h-[calc(100vh-300px)]">
              {activeTab === "invoices" ? (
                <div className="space-y-6">
                  {/* Search and Filter */}
                  <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-600" />
                      <Input
                        placeholder="Search invoices..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/50 dark:bg-gray-700/50 border-amber-200 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-4 py-2 rounded-lg border border-amber-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-200"
                      >
                        <option value="all">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                      </select>
                      <Button
                        className="bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
                        onClick={() => setShowNewInvoiceModal(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" /> New Invoice
                      </Button>
                    </div>
                  </div>

                  {/* Invoices List */}
                  <div className="space-y-4">
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((invoice, index) => (
                        <div
                          key={invoice.id}
                          className={cn(
                            "bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl border border-amber-200/50 dark:border-gray-600/50 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]",
                            "animate-in fade-in slide-in-from-bottom-4"
                          )}
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animationFillMode: "both",
                          }}
                        >
                          <div
                            className="p-4 sm:p-6 cursor-pointer"
                            onClick={() => toggleInvoiceExpand(invoice.id)}
                          >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <FileText className="h-6 w-6 text-amber-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                    {invoice.id}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-300 truncate">
                                    {invoice.client}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-8">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(invoice.status)}
                                  <span
                                    className={cn(
                                      "px-3 py-1 rounded-full text-sm font-medium border",
                                      getStatusColor(invoice.status)
                                    )}
                                  >
                                    {invoice.status.charAt(0).toUpperCase() +
                                      invoice.status.slice(1)}
                                  </span>
                                </div>

                                <div className="text-right">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Amount
                                  </p>
                                  <p className="font-semibold text-gray-900 dark:text-white text-lg">
                                    {formatCurrency(invoice.amount)}
                                  </p>
                                </div>

                                <div className="text-right">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Due Date
                                  </p>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {formatDate(invoice.dueDate)}
                                  </p>
                                </div>

                                <div className="flex-shrink-0">
                                  {expandedInvoice === invoice.id ? (
                                    <ChevronUp className="h-5 w-5 text-gray-400 transition-transform duration-200" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {expandedInvoice === invoice.id && (
                            <div className="border-t border-amber-200/50 dark:border-gray-600/50 bg-amber-50/30 dark:bg-gray-800/30 animate-in slide-in-from-top-2 duration-300">
                              <div className="p-4 sm:p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                      </h4>
                                      <p className="text-gray-900 dark:text-white leading-relaxed">
                                        {invoice.description}
                                      </p>
                                    </div>

                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Invoice Details
                                      </h4>
                                      <div className="space-y-2">
                                        <div className="flex justify-between py-1">
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Invoice Date:
                                          </span>
                                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatDate(invoice.date)}
                                          </span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Due Date:
                                          </span>
                                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatDate(invoice.dueDate)}
                                          </span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Status:
                                          </span>
                                          <span
                                            className={cn(
                                              "text-sm font-medium capitalize",
                                              invoice.status === "paid"
                                                ? "text-green-600"
                                                : invoice.status === "pending"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                            )}
                                          >
                                            {invoice.status}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Payment Summary
                                      </h4>
                                      <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Subtotal:
                                          </span>
                                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(
                                              invoice.amount * 0.9
                                            )}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Tax (10%):
                                          </span>
                                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(
                                              invoice.amount * 0.1
                                            )}
                                          </span>
                                        </div>
                                        <div className="flex justify-between font-semibold pt-2 border-t border-gray-200 dark:border-gray-600">
                                          <span className="text-gray-900 dark:text-white">
                                            Total:
                                          </span>
                                          <span className="text-gray-900 dark:text-white">
                                            {formatCurrency(invoice.amount)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                      <Button
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Download functionality would go here
                                        }}
                                      >
                                        <Download className="h-4 w-4 mr-2" />{" "}
                                        Download
                                      </Button>
                                      {invoice.status !== "paid" && (
                                        <Button
                                          className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            markAsPaid(invoice.id);
                                          }}
                                        >
                                          <DollarSign className="h-4 w-4 mr-2" />{" "}
                                          Mark as Paid
                                        </Button>
                                      )}
                                      <Button
                                        variant="outline"
                                        className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteInvoice(invoice.id);
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-16 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl border border-amber-200/50 dark:border-gray-600/50">
                        <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          No invoices found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                          {searchQuery || filterStatus !== "all"
                            ? "Try adjusting your search or filter criteria"
                            : "You don't have any invoices yet. Create your first invoice to get started."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Your Payment Methods
                    </h2>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                      <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <div
                        key={method.id}
                        className={cn(
                          "bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl border border-amber-200/50 dark:border-gray-600/50 p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]",
                          "animate-in fade-in slide-in-from-bottom-4"
                        )}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animationFillMode: "both",
                        }}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                              {method.type === "card" ? (
                                <CreditCard className="h-6 w-6 text-amber-600" />
                              ) : (
                                <DollarSign className="h-6 w-6 text-amber-600" />
                              )}
                            </div>
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                  {method.name} •••• {method.last4}
                                </h3>
                                {method.isDefault && (
                                  <span className="px-3 py-1 bg-amber-600 text-white text-xs rounded-full font-medium w-fit">
                                    Default
                                  </span>
                                )}
                              </div>
                              {method.expiryDate && (
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                  Expires {method.expiryDate}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            {!method.isDefault && (
                              <Button
                                size="sm"
                                className="bg-amber-100 text-amber-700 hover:bg-amber-600 hover:text-white dark:bg-amber-900/30 dark:text-amber-400 transition-colors duration-200"
                              >
                                Set as Default
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* New Invoice Modal */}
      {showNewInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowNewInvoiceModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md animate-in zoom-in-95 fade-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create New Invoice
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewInvoiceModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleNewInvoiceSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client Name *
                </label>
                <Input
                  type="text"
                  value={newInvoiceForm.client}
                  onChange={(e) => handleFormChange("client", e.target.value)}
                  placeholder="Enter client name"
                  className="w-full transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount *
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={newInvoiceForm.amount}
                  onChange={(e) => handleFormChange("amount", e.target.value)}
                  placeholder="0.00"
                  className="w-full transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Due Date *
                </label>
                <Input
                  type="date"
                  value={newInvoiceForm.dueDate}
                  onChange={(e) => handleFormChange("dueDate", e.target.value)}
                  className="w-full transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={newInvoiceForm.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  placeholder="Enter service description"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none"
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewInvoiceModal(false)}
                  className="flex-1 transition-colors duration-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-200"
                >
                  Create Invoice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
