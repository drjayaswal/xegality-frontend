"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { hover, motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Bell,
  CreditCard,
  DoorOpen,
  HelpCircle,
  LinkIcon,
  Moon,
  ReceiptText,
  Settings,
  Shield,
  Sparkles,
  Sun,
  User,
  Users,
} from "lucide-react";
import DashBoardSettings from "./Settings";
import Clients from "./Clients";
import XegalityAI from "./Xegality-AI";

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
        : "text-gray-700 border-2 border-transparent hover:bg-indigo-100 dark:text-gray-200 dark:hover:bg-indigo-950"
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
      content: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-orange-600 to-orange-900">
          <p>Appointments</p>
        </div>
      ),
    },
    {
      title: "Case Management",
      value: "case-management",
      category: "services",
      content: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-purple-900">
          <p>Case Management</p>
        </div>
      ),
    },
    {
      title: "Billing & Payments",
      value: "billing-payments",
      category: "services",
      content: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-600 to-red-900">
          <p>Billing & Payments</p>
        </div>
      ),
    },
    {
      title: "Profile Settings",
      value: "profile-settings",
      category: "account",
      content: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-indigo-600 to-indigo-900">
          <p>Profile Settings</p>
        </div>
      ),
    },
    {
      title: "Notifications",
      value: "notifications",
      category: "account",
      content: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-teal-600 to-teal-900">
          <p>Notifications</p>
        </div>
      ),
    },
    {
      title: "Security",
      value: "security",
      category: "account",
      content: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-700 to-gray-900">
          <p>Security</p>
        </div>
      ),
    },
    {
      title: "Subscription",
      value: "subscription",
      category: "account",
      content: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-yellow-600 to-yellow-900">
          <p>Subscription</p>
        </div>
      ),
    },
    {
      title: "Help & Support",
      value: "help-support",
      category: "account",
      content: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-pink-600 to-pink-900">
          <p>Help & Support</p>
        </div>
      ),
    },
    {
      title: "Settings",
      value: "settings",
      category: "account",
      content: (
        <>
          <DashBoardSettings />
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
            <div>
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
            <div>
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
      <div
        className={cn(
          "h-[calc(100vh-17px)] flex flex-col mx-2 w-full items-start justify-start transition-transform duration-300",
          hovering ? "scale-90" : "scale-100"
        )}
      >
        <FadeInDiv
          tabs={tabs}
          active={active}
          key={active.value}
          hovering={hovering}
          className={cn("mt-2")}
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
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: isActive(tab) ? 10 : -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          <>{tab.content}</>
        </motion.div>
      ))}
    </div>
  );
};
