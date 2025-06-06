"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Check,
  Calendar,
  Download,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  billing: "monthly" | "yearly";
  description: string;
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
}

interface BillingHistory {
  id: string;
  date: Date;
  amount: number;
  status: "paid" | "pending" | "failed";
  invoice?: string;
}

export default function Subscription() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plans: Plan[] = [
    {
      id: "basic",
      name: "Basic",
      price: billingCycle === "monthly" ? 49 : 470,
      billing: billingCycle,
      description: "Essential legal tools for solo practitioners",
      features: [
        "Case management",
        "Client portal",
        "Document storage (10GB)",
        "Basic reporting",
        "Email support",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: billingCycle === "monthly" ? 99 : 950,
      billing: billingCycle,
      description: "Advanced features for growing practices",
      features: [
        "Everything in Basic",
        "Client billing & invoicing",
        "Document storage (50GB)",
        "Advanced reporting",
        "Priority email support",
        "Client intake forms",
        "Calendar integrations",
      ],
      isPopular: true,
      isCurrent: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: billingCycle === "monthly" ? 199 : 1900,
      billing: billingCycle,
      description: "Complete solution for established firms",
      features: [
        "Everything in Professional",
        "Unlimited document storage",
        "Custom reporting",
        "24/7 phone support",
        "Advanced analytics",
        "Multi-user permissions",
        "API access",
        "Dedicated account manager",
      ],
    },
  ];

  const billingHistory: BillingHistory[] = [
    {
      id: "inv-001",
      date: new Date(2023, 4, 1),
      amount: 99,
      status: "paid",
      invoice: "INV-2023-001",
    },
    {
      id: "inv-002",
      date: new Date(2023, 3, 1),
      amount: 99,
      status: "paid",
      invoice: "INV-2023-002",
    },
    {
      id: "inv-003",
      date: new Date(2023, 2, 1),
      amount: 99,
      status: "paid",
      invoice: "INV-2023-003",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Calendar className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className=" h-full shadow-lg border-[1.5px] rounded-lg">
      {/* Content */}
      <div className="flex-1 p-8 rounded-md">
        <ScrollArea className="h-full">
          {/* Current Plan */}
          <div className="bg-gray-50/30 dark:bg-gray-50/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Professional Plan
                  </h2>
                  <span className="px-3 py-1 text-xs dark:bg-emerald-700/30 font-bold bg-emerald-700/60 text-white dark:text-white/80 rounded-full">
                    Current Plan
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Your subscription renews on June 1, 2023
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                <Button
                  //   variant="outline"
                  className="bg-transparent rounded-3xl rounded-r-none border-r-1 border-2 border-emerald-700/60 dark:border-white/40 hover:border-transparent dark: hover:bg-emerald-700/60 dark: hover:text-white dark:text-white text-emerald-700/60 dark:hover:text-white"
                >
                  Manage Payment Methods
                </Button>
                <Button className="bg-transparent rounded-3xl -ml-2 rounded-l-none border-l-1 border-2 border-emerald-700/60 dark:border-white/40 hover:border-transparent dark: hover:bg-emerald-700/60 dark: hover:text-white dark:text-white text-emerald-700/60 dark:hover:text-white">
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Plan Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl ml-4 font-semibold text-gray-800 dark:text-white">
                Available Plans
              </h2>

              <div className="flex p-1 bg-gray-50/20 backdrop-blur-sm rounded-full">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    billingCycle === "monthly"
                      ? "bg-gray-50 text-black shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-black outline-0 ring-0"
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    billingCycle === "yearly"
                      ? "bg-gray-50 text-black shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-black"
                  )}
                >
                  Yearly
                  <span className="ml-2 text-green-600 font-medium">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "bg-gray-50/30 dark:bg-gray-50/10 backdrop-blur-sm rounded-[36px] relative",
                    plan.isPopular
                      ? " border-4 border-emerald-700/60 shadow-lg shadow-emerald-700/10"
                      : ""
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-emerald-700/60 text-white text-xs font-medium py-2 px-3 rounded-full m-3">
                      Most Popular
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 h-12">
                      {plan.description}
                    </p>

                    <div className="mt-4 mb-6">
                      <span className="text-3xl font-bold text-gray-800 dark:text-white">
                        ₹ {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {" "}
                        / {plan.billing === "monthly" ? "month" : "year"}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={cn(
                        "w-full",
                        plan.isCurrent
                          ? "bg-emerald-700/60 rounded-3xl text-white hover:text-black"
                          : "bg-transparent rounded-3xl border-2 border-emerald-700/60 hover:bg-emerald-700/60 hover:text-white hover:border-transparent text-emerald-700/60 dark:border-white dark:hover:text-white dark:text-white"
                      )}
                      disabled={plan.isCurrent}
                    >
                      {plan.isCurrent ? "Current Plan" : "Select Plan"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
