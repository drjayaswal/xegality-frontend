"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
// import { Card, Cardfourth, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  ChevronDown,
  Globe,
  GraduationCap,
  Info,
  PlusCircle,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type Tab = {
  title: string;
  value: string;
  fourth?: string | React.ReactNode | any;
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
  const dashboardTabs: Tab[] = [
    {
      title: "one",
      value: "one",
      fourth: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>one Tab</p>
        </div>
      ),
    },
    {
      title: "two",
      value: "two",
      fourth: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>two tab</p>
        </div>
      ),
    },
    {
      title: "third",
      value: "third",
      fourth: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>third tab</p>
        </div>
      ),
    },
    {
      title: "fourth",
      value: "fourth",
      fourth: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>fourth tab</p>
        </div>
      ),
    },
    {
      title: "five",
      value: "five",
      fourth: (
        <div className="w-full overflow-hidden relative rounded-lg h-full p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>five tab</p>
        </div>
      ),
    },
  ];
  const [active, setActive] = useState<Tab>(dashboardTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(dashboardTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = tabs;
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="flex h-screen bg-white/10 backdrop-blur-[2px] gap-1 justify-center dark:bg-gray-900">
      {/* Sidebar */}
      <div className="flex h-full w-64 flex-col border-r bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="flex h-14 items-center border-b px-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Sections
            </h2>
            <div className="space-y-1">
              {dashboardTabs.map((tab, idx) => (
                <NavItem
                  key={tab.title}
                  onClick={() => moveSelectedTabToTop(idx)}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  icon={<Info className="h-4 w-4" />}
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
          hovering={hovering}
          className="mt-2"
        />
      </div>
    </div>
  );
}

export const FadeInDiv = ({
  tabs,
  className,
  hovering,
}: {
  tabs: Tab[];
  active: Tab;
  className?: string;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => tab.value === tabs[0].value;

  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.fourth}
        </motion.div>
      ))}
    </div>
  );
};
