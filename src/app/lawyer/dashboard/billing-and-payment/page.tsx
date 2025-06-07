"use client";

import type React from "react";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Landmark,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Invoice {
  id: string;
  name: string;
  amount: number;
  time: Date;
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

export default function InvoiceManagement() {
  const [activeTab, setActiveTab] = useState<"invoices" | "payments">(
    "invoices"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "pending" | "overdue"
  >("all");
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showInvoiceDetailModal, setShowInvoiceDetailModal] = useState(false);

  const [invoiceList, setInvoiceList] = useState<Invoice[]>([
    {
      id: "INV-2023-006",
      name: "Thomas Nguyen",
      amount: 980.0,
      time: new Date(2023, 6, 12),
      description: "Employment contract drafting and legal consultation",
    },
    {
      id: "INV-2023-007",
      name: "Ashley Patel",
      amount: 1340.0,
      time: new Date(2023, 7, 3),
      description: "Business formation and incorporation documentation",
    },
    {
      id: "INV-2023-008",
      name: "Christopher Brown",
      amount: 1750.0,
      time: new Date(2023, 3, 28),
      description: "Civil litigation representation and pre-trial filings",
    },
    {
      id: "INV-2023-009",
      name: "Natalie Kim",
      amount: 1120.0,
      time: new Date(2023, 2, 15),
      description: "Will preparation and estate planning legal services",
    },
    {
      id: "INV-2023-010",
      name: "Brian Thompson",
      amount: 630.0,
      time: new Date(2023, 1, 22),
      description: "Small claims court filing and legal representation",
    },
    {
      id: "INV-2023-011",
      name: "Isabella Garcia",
      amount: 1420.0,
      time: new Date(2023, 10, 9),
      description: "Immigration visa petition filing and legal review",
    },
    {
      id: "INV-2023-012",
      name: "Andrew Davis",
      amount: 890.0,
      time: new Date(2023, 9, 5),
      description: "Real estate closing legal review and documentation",
    },
    {
      id: "INV-2023-013",
      name: "Sophia Martinez",
      amount: 1600.0,
      time: new Date(2023, 8, 18),
      description: "Intellectual property infringement case consultation",
    },
    {
      id: "INV-2023-014",
      name: "Ethan Walker",
      amount: 720.0,
      time: new Date(2023, 6, 30),
      description: "Contract negotiation and liability assessment",
    },
    {
      id: "INV-2023-015",
      name: "Olivia Hernandez",
      amount: 2000.0,
      time: new Date(2023, 7, 21),
      description: "Securities compliance audit and legal opinion",
    },
  ]);

  const [newInvoiceForm, setNewInvoiceForm] = useState({
    name: "",
    amount: "",
    description: "",
    time: "",
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

  // Dashboard statistics
  const stats = useMemo(() => {
    const totalAmount = invoiceList.reduce((sum, inv) => sum + inv.amount, 0);

    const invoicesByMonth: Record<string, number> = {};
    invoiceList.forEach((inv) => {
      const monthYear = `${inv.time.getMonth() + 1}/${inv.time.getFullYear()}`;
      invoicesByMonth[monthYear] = (invoicesByMonth[monthYear] || 0) + 1;
    });

    return {
      totalAmount,
      invoiceCount: invoiceList.length,
      clientCount: new Set(invoiceList.map((inv) => inv.name)).size,
      invoicesByMonth,
    };
  }, [invoiceList]);

  const filteredInvoices = useMemo(() => {
    return invoiceList.filter((invoice) => {
      const matchesSearch =
        invoice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = true; // Remove status filtering since we don't have status anymore
      return matchesSearch && matchesFilter;
    });
  }, [invoiceList, searchQuery]);

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
      !newInvoiceForm.name ||
      !newInvoiceForm.amount ||
      !newInvoiceForm.description ||
      !newInvoiceForm.time
    ) {
      return;
    }

    const newInvoice: Invoice = {
      id: `INV-${new Date().getFullYear()}-${String(
        invoiceList.length + 1
      ).padStart(3, "0")}`,
      name: newInvoiceForm.name,
      amount: Number.parseFloat(newInvoiceForm.amount),
      time: new Date(newInvoiceForm.time),
      description: newInvoiceForm.description,
    };

    setInvoiceList([newInvoice, ...invoiceList]);
    setNewInvoiceForm({
      name: "",
      amount: "",
      description: "",
      time: "",
    });
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

  const viewInvoiceDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetailModal(true);
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-gray-700/50 p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Invoice Management
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
                    {formatCurrency(stats.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
          <Tabs
            defaultValue="invoices"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as any)}
          >
            <TabsList className="grid grid-cols-2 w-full p-1 cursor-pointer bg-transparent">
              <TabsTrigger
                value="invoices"
                className="text-md cursor-pointer data-[state=active]:bg-amber-700/20 data-[state=inactive]:hover:bg-amber-700/5 py-3 dark:data-[state=active]:bg-amber-900/20 data-[state=active]:text-amber-700 rounded-none rounded-tl-lg"
              >
                <FileText className="h-4 scale-150 w-4 mr-2" />
                Invoices
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="text-md cursor-pointer data-[state=active]:bg-amber-700/20 py-3 dark:data-[state=active]:bg-amber-900/20 data-[state=inactive]:hover:bg-amber-700/5 data-[state=active]:text-amber-700 rounded-none rounded-tr-lg"
              >
                <CreditCard className="h-4 scale-150 w-4 mr-2" />
                Payments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="invoices" className="p-6">
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6 p-5">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-4 transform -translate-y-1/2 h-5 w-5 text-amber-600" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-20 py-2.5 text-sm bg-transparent dark:bg-slate-900 border-amber-700/20 dark:border-slate-700 rounded-lg focus-visible:ring-0 focus-visible:border-amber-600 border-2 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                    <Button
                      className="bg-amber-600 hover:bg-amber-700 text-white duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      onClick={() => setShowNewInvoiceModal(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" /> New Invoice
                    </Button>
                  </div>
                </div>

                {filteredInvoices.length > 0 ? (
                  <div className="space-y-2">
                    {filteredInvoices.map((invoice, index) => (
                      <div key={invoice.id}>
                        <div
                          className={cn(
                            "cursor-pointer rounded-xl border border-gray-200 bg-white/50 dark:bg-gray-900/30 backdrop-blur-md",
                            "transition-all duration-300 hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-900/50",
                            "animate-in fade-in slide-in-from-bottom-4",
                            expandedInvoice === invoice.id &&
                              "border-b-0 rounded-bl-none rounded-br-none hover:shadow-none"
                          )}
                          style={{
                            animationDelay: `${index * 80}ms`,
                            animationFillMode: "both",
                          }}
                          onClick={() => toggleInvoiceExpand(invoice.id)}
                        >
                          <div className="p-4 flex justify-between items-center gap-4">
                            {/* Left Side */}
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative">
                                <div className="w-10 h-10 bg-amber-700/20 rounded-lg flex items-center justify-center shadow-sm">
                                  <FileText className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                                </div>
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                  {invoice.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(invoice.time)}
                                </p>
                              </div>
                            </div>

                            {/* Right Side */}
                            <div className="text-right space-y-1">
                              <div className="p-1 rounded-full bg-amber-100/60 dark:bg-amber-900/30 inline-block transition-transform duration-300">
                                {expandedInvoice === invoice.id ? (
                                  <ChevronUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {expandedInvoice === invoice.id && (
                          <div className="-mt-1 p-4 rounded-xl rounded-tl-none rounded-tr-none bg-white/80 dark:bg-gray-900/50 border border-gray-200 shadow-sm transition-all animate-in fade-in-50 slide-in-from-top-2 duration-300">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 text-sm">
                              {/* Left: Description & Timeline */}
                              <div className="flex-1 p-4 rounded-lg">
                                <div className="space-y-1 mb-3">
                                  <h4 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold">
                                    <Clock className="w-4 h-4" /> Created
                                  </h4>
                                  <p className="text-gray-800 dark:text-white">
                                    {formatDate(invoice.time)}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <h4 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold">
                                    <FileText className="w-4 h-4" /> Description
                                  </h4>
                                  <p className="text-gray-700 dark:text-gray-300">
                                    {invoice.description}
                                  </p>
                                </div>
                              </div>

                              {/* Center: Payment Summary */}
                              <div className="flex-1 p-4 rounded-lg bg-amber-700/10 dark:from-gray-800 dark:to-amber-900/10 border border-amber-100/50 dark:border-amber-800/30">
                                <h4 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold mb-2">
                                  <DollarSign className="w-4 h-4" /> Payment
                                  Summary
                                </h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>
                                      {formatCurrency(invoice.amount * 0.9)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Tax (10%)</span>
                                    <span>
                                      {formatCurrency(invoice.amount * 0.1)}
                                    </span>
                                  </div>
                                  <div className="pt-2 mt-2 border-t border-amber-200/50 dark:border-amber-700/30 font-semibold flex justify-between">
                                    <span>Total</span>
                                    <span className="text-amber-700 dark:text-amber-400 font-bold">
                                      {formatCurrency(invoice.amount)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right: Actions */}
                              <div className="flex flex-col gap-2 md:w-40">
                                <Button
                                  className="bg-amber-500/10 text-amber-700 hover:bg-amber-600 hover:text-white dark:bg-amber-900/20 dark:hover:bg-amber-700/90 dark:hover:text-white border border-amber-500 dark:border-amber-700 font-semibold shadow-sm hover:shadow-md transition-all"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </Button>
                                <Button
                                  className="bg-red-500/10 text-red-700 hover:bg-red-600 hover:text-white dark:bg-red-900/20 dark:hover:bg-red-700/90 dark:hover:text-white border border-red-500 dark:border-red-700 font-semibold shadow-sm hover:shadow-md transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteInvoice(invoice.id);
                                  }}
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Delete Invoice
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 rounded-xl border-amber-600 border-dotted border-2 bg-muted/30 dark:bg-muted/10">
                    <FileText className="h-14 w-14 mx-auto text-amber-600 mb-3" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {searchQuery
                        ? "No invoices found"
                        : "You don't have any invoices yet."}
                    </h3>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="payments" className="p-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 py-2 mx-3">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Your Payment Methods
                  </h2>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                  </Button>
                </div>

                <div className="space-y-4 overflow-hidden">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={method.id}
                      className={cn(
                        "p-6 shadow-none transition-all duration-300 transform",
                        "animate-in fade-in slide-in-from-bottom-4"
                      )}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-amber-700/30 rounded-xl flex items-center justify-center">
                            {method.type === "card" ? (
                              <CreditCard className="h-6 w-6 text-amber-700" />
                            ) : (
                              <Landmark className="h-6 w-6 text-amber-700" />
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
                              className="bg-amber-700/30 text-amber-700 hover:bg-amber-700 hover:text-white dark:bg-amber-900/30 dark:text-amber-400 transition-colors duration-200 shadow-none"
                            >
                              Set as Default
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 bg-transparent border-0 shadow-none hover:bg-red-500 hover:text-white transition-colors duration-200"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
                  Name *
                </label>
                <Input
                  type="text"
                  value={newInvoiceForm.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  placeholder="Enter name"
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
                  Time *
                </label>
                <Input
                  type="datetime-local"
                  value={newInvoiceForm.time}
                  onChange={(e) => handleFormChange("time", e.target.value)}
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
                  placeholder="Enter description"
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
      {/* Invoice Detail Modal */}
      <Dialog
        open={showInvoiceDetailModal}
        onOpenChange={setShowInvoiceDetailModal}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedInvoice && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-600" />
                  Invoice #{selectedInvoice.id}
                </DialogTitle>
                <DialogDescription>
                  Created on {formatDate(selectedInvoice.time)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">
                      {selectedInvoice.name}
                    </h3>
                  </div>
                </div>

                <div className="border-t border-b py-4 space-y-2">
                  <h4 className="font-medium">Description</h4>
                  <p className="text-sm">{selectedInvoice.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(selectedInvoice.amount * 0.9)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>{formatCurrency(selectedInvoice.amount * 0.1)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-amber-700 dark:text-amber-400">
                      {formatCurrency(selectedInvoice.amount)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-medium">
                      {formatDate(selectedInvoice.time)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Download className="h-4 w-4 mr-1" /> PDF
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
