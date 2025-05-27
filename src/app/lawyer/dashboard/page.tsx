"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Bell,
  Contact,
  CreditCard,
  DoorOpen,
  HelpCircle,
  Moon,
  ReceiptText,
  Settings,
  Shield,
  Sparkles,
  Sun,
  User,
  Users,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import XegalityAI from "@/components/lawyer/dashboard/xegality-ai";
import HelpSupport from "@/components/lawyer/dashboard/help-and-support";
import Subscription from "@/components/lawyer/dashboard/subscription";
import BillingPayments from "@/components/lawyer/dashboard/billing-and-payment";
import CaseManagement from "@/components/lawyer/dashboard/case-management";
import Appointments from "@/components/lawyer/dashboard/appointment";
import Clients from "@/components/lawyer/dashboard/clients";
import SettingsLite from "@/components/lawyer/dashboard/settings";

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
        ? "bg-[#3b82f6] text-white"
        : "text-gray-700 hover:bg-[#3b82f6]/50 dark:text-gray-200 dark:hover:bg-[#3b82f6]/50"
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
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3b82f6] text-xs font-semibold text-[#3b82f6] dark:bg-[#3b82f6] dark:text-[#3b82f6]">
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
      category: "account",
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
      category: "account",
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
      category: "services",
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

  // useEffect(() => {
  //   const storedTheme = localStorage.getItem("theme");
  //   if (storedTheme === "dark") {
  //     setIsDarkMode(true);
  //   }
  // }, []);

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(storedTheme === "dark");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setIsDarkMode(!isDarkMode);
  };
  const getTabIcon = (title: string) => {
    switch (title) {
      case "Xegality AI":
        return <Sparkles className="h-4 w-4" />;
      case "Clients":
        return <Users className="h-4 w-4" />;
      case "Appointments":
        return <Contact className="h-4 w-4" />;
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
    <div className="flex h-screen bg-white backdrop-blur-[2px] gap-1 justify-center dark:bg-black">
      {/* Sidebar */}
      <div className="flex h-full w-64 flex-col border-r">
        <div className="flex h-[86px] items-center flex justify-center border-b-2 border-[#3b82f6]/50 p-2">
          <h1 className="text-2xl font-semibold">Xegality</h1>
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

          <div className="border-t-2 border-[#3b82f6]/50 flex gap-1 mt-5 items-center justify-center p-6">
            {isDarkMode ? (
              <Moon className="h-5 w-5 dark:text-[#3b82f6] text-[#3b82f6]" />
            ) : (
              <Sun className="h-5 w-5 dark:text-[#3b82f6] text-[#3b82f6]" />
            )}
            <span className="text-[#3b82f6]"> - - - </span>
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-[#3b82f6] data-[state=unchecked]:bg-[#3b82f6] data-[state=unchecked]:border-transparent data-[state=unchecked]:shadow-none"
            />
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

const FadeInDiv = ({
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
