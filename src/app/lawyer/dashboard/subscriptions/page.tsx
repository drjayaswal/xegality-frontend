"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  ArrowRight,
  CheckCircle2,
  Star,
  Crown,
  Building,
  Rocket,
  Shield,
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
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  buttonColor: string;
  shadowColor: string;
}

export default function CompactSubscription() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      price: billingCycle === "monthly" ? 29 : 290,
      billing: billingCycle,
      description: "Perfect for individual lawyers",
      buttonColor: "bg-blue-500 hover:bg-blue-600 text-white",
      features: [
        "Up to 25 active cases",
        "5GB secure cloud storage",
        "Basic client portal",
        "Email support",
        "Mobile app access",
      ],
      icon: <Rocket className="h-4 w-4" />,
      gradient: "bg-gradient-to-br from-blue-500 to-sky-500",
      borderColor: "border-blue-300",
      shadowColor: "shadow-blue-500/20",
    },
    {
      id: "professional",
      name: "Professional",
      price: billingCycle === "monthly" ? 79 : 790,
      billing: billingCycle,
      buttonColor: "bg-yellow-500 hover:bg-amber-600 text-white",
      description: "Advanced tools for growing firms",
      features: [
        "Unlimited cases",
        "50GB secure cloud storage",
        "Advanced client portal",
        "Priority email support",
        "Advanced analytics",
        "Custom branding",
        "Time tracking & billing",
      ],
      isPopular: true,
      isCurrent: true,
      icon: <Building className="h-4 w-4" />,
      gradient: "bg-gradient-to-br from-yellow-500 to-amber-600",
      borderColor: "border-yellow-500",
      shadowColor: "shadow-yellow-500/20",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: billingCycle === "monthly" ? 149 : 1490,
      buttonColor: "bg-purple-500 hover:bg-fuschia-600 text-white",
      billing: billingCycle,
      description: "Complete solution for large firms",
      features: [
        "Everything in Professional",
        "Unlimited storage",
        "White-label solution",
        "24/7 phone support",
        "Advanced security",
        "API access",
        "Custom integrations",
      ],
      icon: <Crown className="h-4 w-4" />,
      gradient: "bg-gradient-to-br from-purple-600 to-fuchsia-500",
      borderColor: "border-purple-300",
      shadowColor: "shadow-purple-500/20",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 px-6 py-6 min-h-0">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
              <span className="bg-gradient-to-r from-indigo-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                Xegality's Plan
              </span>
            </h1>
            <p className="text-slate-600 text-base max-w-xl mx-auto mb-6">
              Whether you're solo or scaling your firm, Xegality adapts to your
              legal workflow with secure, efficient, and smart tools.
            </p>

            {/* Plans Grid */}
            <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-full"
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Most Popular
                        </div>
                      </div>
                    </div>
                  )}

                  <Card
                    className={cn(
                      "h-full transition-all duration-300 hover:shadow-xl flex flex-col",
                      `${plan.shadowColor} ${plan.borderColor}`
                    )}
                  >
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Plan Header */}
                      <div className="text-center mb-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-3",
                            plan.gradient
                          )}
                        >
                          {plan.icon}
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-slate-900">
                            {plan.name}
                          </h3>
                          {plan.isCurrent && (
                            <Badge
                              variant="outline"
                              className="border-amber-200 text-amber-700 text-xs"
                            >
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm">
                          {plan.description}
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="text-center mb-4">
                        <div className="flex items-baseline justify-center gap-1 mb-1">
                          <span className="text-3xl font-bold text-slate-900">
                            {formatCurrency(plan.price)}
                          </span>
                          <span className="text-slate-500 text-sm">
                            /{plan.billing === "monthly" ? "mo" : "yr"}
                          </span>
                        </div>
                        {billingCycle === "yearly" && (
                          <p className="text-amber-600 font-medium text-xs">
                            Save 2 months free
                          </p>
                        )}
                      </div>

                      {/* Features */}
                      <div className="flex-1 mb-4">
                        <ul className="space-y-2.5">
                          {plan.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center gap-2.5"
                            >
                              <div
                                className={cn(
                                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                                  plan.gradient
                                )}
                              >
                                <Check className="h-3 w-3 text-white" />
                              </div>
                              <span className="text-slate-700 text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        className={cn(
                          "w-full h-10 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
                          plan.isCurrent
                            ? "bg-slate-100 text-slate-500 cursor-not-allowed hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400"
                            : `${plan.buttonColor} shadow-md hover:shadow-xl hover:scale-[1.03]`
                        )}
                        disabled={plan.isCurrent}
                      >
                        {plan.isCurrent ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Current Plan
                          </>
                        ) : (
                          <>
                            {plan.isPopular ? "Get Started" : "Choose Plan"}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-amber-100 dark:border-amber-800 bg-gradient-to-r from-amber-50/30 to-orange-100/30 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                    <Shield className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Bank-level Security</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="font-medium">30-day Money Back</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                    <Star className="h-4 w-4" />
                  </div>
                  <span className="font-medium">
                    Trusted by 10,000+ Lawyers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
