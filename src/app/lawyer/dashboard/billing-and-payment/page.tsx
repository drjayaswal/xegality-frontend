"use client";

import { useState } from "react";
import { motion } from "motion/react";
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
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";
import SiriWave from "@/components/ui/ai";

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

  const invoices: Invoice[] = [
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
  ];

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
      name: "Chase Bank",
      last4: "6789",
      isDefault: false,
    },
  ];

  const filteredInvoices = invoices.filter((invoice) => {
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

  return (
    <div className="w-full h-full dark:bg-black bg-white bg-gradient-to-r from-[#3b82f6]/10 to-[#3b82f6]/40 rounded-2xl">
      <div className="w-full h-full rounded-lg overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="relative h-24 overflow-hidden ">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-fit flex items-center justify-center">
              <SiriWave opacity={0.5} isWaveMode={false} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/20">
          <button
            onClick={() => setActiveTab("invoices")}
            className={cn(
              "flex-1 py-4 text-center font-medium transition-colors",
              activeTab === "invoices"
                ? "dark:text-indigo-400 text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            )}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={cn(
              "flex-1 py-4 text-center font-medium transition-colors",
              activeTab === "payments"
                ? "dark:text-indigo-400 text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 dark:text-gray-300 hover:text-indigo-400 dark:hover:text-indigo-400"
            )}
          >
            Payment Methods
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <ScrollArea className="h-full">
            {activeTab === "invoices" ? (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/20 focus-visible:ring-0 focus-visible:border-indigo-600 placeholder:text-black/40 dark:placeholder:text-white/40"
                    />
                  </div>
                  <div className="flex gap-4 justify-center items-center">
                    <div className="relative inline-block">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-3 py-1 rounded-lg focus-visible:outline-0 text-sm"
                      >
                        <option value="all">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </div>
                    <Button className="text-white bg-indigo-600 hover:bg-indigo-700 ml-2">
                      <Plus className="h-4 w-4 mr-2" /> New Invoice
                    </Button>
                  </div>
                </div>

                {/* Invoices List */}
                <div className="space-y-4">
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                      <motion.div
                        key={invoice.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
                      >
                        <div
                          className="p-4 cursor-pointer flex flex-wrap md:flex-nowrap items-center justify-between gap-4"
                          onClick={() => toggleInvoiceExpand(invoice.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800 dark:text-white">
                                {invoice.id}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {invoice.client}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right">
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Amount
                              </p>
                              <p className="font-medium text-gray-800 dark:text-white">
                                {formatCurrency(invoice.amount)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Due Date
                              </p>
                              <p className="font-medium text-gray-800 dark:text-white">
                                {formatDate(invoice.dueDate)}
                              </p>
                            </div>
                            {expandedInvoice === invoice.id ? (
                              <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>

                        {expandedInvoice === invoice.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 border-t border-white/20"
                          >
                            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                                  Description
                                </h4>
                                <p className="text-gray-800 dark:text-white">
                                  {invoice.description}
                                </p>

                                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-4 mb-2">
                                  Invoice Details
                                </h4>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                      Invoice Date:
                                    </span>
                                    <span className="text-sm text-gray-800 dark:text-white">
                                      {formatDate(invoice.date)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                      Due Date:
                                    </span>
                                    <span className="text-sm text-gray-800 dark:text-white">
                                      {formatDate(invoice.dueDate)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                      Status:
                                    </span>
                                    <span
                                      className={cn(
                                        "text-sm capitalize",
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

                              <div className="flex flex-col justify-between">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                                    Payment Summary
                                  </h4>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Subtotal:
                                      </span>
                                      <span className="text-sm text-gray-800 dark:text-white">
                                        {formatCurrency(invoice.amount * 0.9)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Tax (10%):
                                      </span>
                                      <span className="text-sm text-gray-800 dark:text-white">
                                        {formatCurrency(invoice.amount * 0.1)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between font-medium pt-1 border-t border-white/20">
                                      <span className="text-gray-800 dark:text-white">
                                        Total:
                                      </span>
                                      <span className="text-gray-800 dark:text-white">
                                        {formatCurrency(invoice.amount)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex gap-2 mt-4 justify-end">
                                  <Button variant="outline" className="gap-2">
                                    <Download className="h-4 w-4" /> Download
                                  </Button>
                                  {invoice.status !== "paid" && (
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                                      <DollarSign className="h-4 w-4" /> Pay Now
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                      <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                        No invoices found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {searchQuery || filterStatus !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "You don't have any invoices yet"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Your Payment Methods
                  </h2>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                  </Button>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                            {method.type === "card" ? (
                              <CreditCard className="h-5 w-5 text-indigo-600" />
                            ) : (
                              <DollarSign className="h-5 w-5 text-indigo-600" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-800 dark:text-white">
                                {method.name} •••• {method.last4}
                              </h3>
                              {method.isDefault && (
                                <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            {method.expiryDate && (
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Expires {method.expiryDate}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {!method.isDefault && (
                            <Button variant="outline" size="sm">
                              Set as Default
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-white/50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 rounded-xl border border-white/20 p-6">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    Billing Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                        Billing Address
                      </h4>
                      <p className="text-gray-800 dark:text-white">John Doe</p>
                      <p className="text-gray-800 dark:text-white">
                        123 Legal Street
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        Law City, LC 12345
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        United States
                      </p>

                      <Button
                        variant="link"
                        className="p-0 h-auto mt-2 text-indigo-600 hover:text-indigo-700"
                      >
                        Edit Billing Address
                      </Button>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                        Billing Contact
                      </h4>
                      <p className="text-gray-800 dark:text-white">
                        john.doe@example.com
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        +1 (555) 123-4567
                      </p>

                      <Button
                        variant="link"
                        className="p-0 h-auto mt-2 text-indigo-600 hover:text-indigo-700"
                      >
                        Edit Billing Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
