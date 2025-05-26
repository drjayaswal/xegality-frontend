"use client";

import type React from "react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Bell,
  CreditCard,
  DoorOpen,
  HelpCircle,
  LinkIcon,
  ReceiptText,
  Settings,
  Shield,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import XegalityAI from "./Xegality-AI";
import HelpSupport from "./Help&Support";
import Subscription from "./Subscription";
import BillingPayments from "./Billing&Payment";
import CaseManagement from "./Case-Management";
import Appointments from "./Appointment";
import Clients from "./Clients";
import SettingsLite from "./Settings";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
  category: "services" | "account";
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavItem = ({
  icon,
  label,
  href,
  active,
  badge,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: NavItemProps) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-indigo-500 text-white"
        : "text-gray-700 hover:bg-indigo-100 dark:text-gray-200 dark:hover:bg-indigo-950"
    )}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
  >
    <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
    <span className="flex-1">{label}</span>
    {badge && (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-200 text-xs font-semibold text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200">
        {badge}
      </span>
    )}
  </Link>
);

export default function LawyerDashboard() {
  // Combine all tabs into one array with categories
  const allTabs: Tab[] = [
    {
      title: "Xegality AI",
      value: "xegality-ai",
      category: "services",
      content: (
        <>
          <XegalityAI />
        </>
      ),
    },
    {
      title: "Clients",
      value: "clients",
      category: "services",
      content: (
        <>
          <Clients />
        </>
      ),
    },
    {
      title: "Appointments",
      value: "appointments",
      category: "services",
      content: <Appointments />,
    },
    {
      title: "Case Management",
      value: "case-management",
      category: "services",
      content: <CaseManagement />,
    },
    {
      title: "Billing & Payments",
      value: "billing-payments",
      category: "services",
      content: <BillingPayments />,
    },
    {
      title: "Subscription",
      value: "subscription",
      category: "account",
      content: <Subscription />,
    },
    {
      title: "Help & Support",
      value: "help-support",
      category: "account",
      content: <HelpSupport />,
    },
    {
      title: "Settings",
      value: "settings",
      category: "account",
      content: (
        <>
          <SettingsLite />
        </>
      ),
    },
  ];
  // Separate tabs by category for sidebar display
  const servicesTabs = allTabs.filter((tab) => tab.category === "services");
  const accountTabs = allTabs.filter((tab) => tab.category === "account");

  const [active, setActive] = useState<Tab>(allTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(allTabs);

  const moveSelectedTabToTop = (tabValue: string) => {
    const clickedTab = allTabs.find((tab) => tab.value === tabValue);
    if (!clickedTab || clickedTab.value === active.value) {
      return; // Do nothing if tab not found or already active
    }

    const newTabs = [...tabs];
    const tabIndex = newTabs.findIndex((tab) => tab.value === tabValue);
    if (tabIndex > -1) {
      const selectedTab = newTabs.splice(tabIndex, 1)[0];
      newTabs.unshift(selectedTab);
      setTabs(newTabs);
      setActive(selectedTab);
    }
  };

  const [hovering, setHovering] = useState(false);

  const getTabIcon = (title: string) => {
    switch (title) {
      case "Xegality AI":
        return <Sparkles className="h-4 w-4" />;
      case "Clients":
        return <Users className="h-4 w-4" />;
      case "Appointments":
        return <LinkIcon className="h-4 w-4" />;
      case "Case Management":
        return <DoorOpen className="h-4 w-4" />;
      case "Billing & Payments":
        return <ReceiptText className="h-4 w-4" />;
      case "Profile Settings":
        return <User className="h-4 w-4" />;
      case "Notifications":
        return <Bell className="h-4 w-4" />;
      case "Security":
        return <Shield className="h-4 w-4" />;
      case "Subscription":
        return <CreditCard className="h-4 w-4" />;
      case "Help & Support":
        return <HelpCircle className="h-4 w-4" />;
      case "Settings":
        return <Settings className="h-4 w-4" />;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex h-screen bg-white/10 backdrop-blur-[2px] gap-1 justify-center dark:bg-gray-900">
      {/* Sidebar */}
      <div className="flex h-full w-64 flex-col border-r bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="flex h-14 items-center border-b px-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        <div className="flex-1 overflow-auto py-4">
          {/* Services Section */}
          <div className="px-3 py-2">
            <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Services
            </h2>
            <div className="space-y-1">
              {servicesTabs.map((tab) => (
                <NavItem
                  key={tab.value}
                  onClick={() => moveSelectedTabToTop(tab.value)}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  icon={getTabIcon(tab.title)}
                  label={tab.title}
                  href="#"
                  active={active.value === tab.value}
                />
              ))}
            </div>
          </div>

          {/* Account Section */}
          <div className="px-3 py-2 mt-6">
            <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Account
            </h2>
            <div className="space-y-1">
              {accountTabs.map((tab) => (
                <NavItem
                  key={tab.value}
                  onClick={() => moveSelectedTabToTop(tab.value)}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  icon={getTabIcon(tab.title)}
                  label={tab.title}
                  href="#"
                  active={active.value === tab.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-17px)] flex flex-col mx-2 w-full items-start justify-start">
        <FadeInDiv
          tabs={tabs}
          active={active}
          key={active.value}
          hovering={hovering}
          className="mt-2"
        />
      </div>
    </div>
  );
}

export const FadeInDiv = ({
  tabs,
  active,
  className,
  hovering,
}: {
  tabs: Tab[];
  active: Tab;
  className?: string;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => tab.value === active.value;

  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <div
          key={tab.value}
          style={{
            opacity: isActive(tab) ? 1 : 0,
            visibility: isActive(tab) ? "visible" : "hidden",
            transition: "opacity 0.3s ease, visibility 0.3s ease",
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
