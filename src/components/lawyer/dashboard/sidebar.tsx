"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Archive,
  BookOpen,
  Code,
  History,
  ImageIcon,
  MessageCircle,
  Settings,
  Sparkles,
  Video,
  Moon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: string | number;
}

const NavItem = ({ icon, label, href, active, badge }: NavItemProps) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-indigo-500 text-white"
        : "text-gray-700 hover:bg-indigo-100 dark:text-gray-200 dark:hover:bg-indigo-950"
    )}
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

export function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-14 items-center border-b px-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            General
          </h2>
          <div className="space-y-1">
            <NavItem
              icon={<Sparkles className="h-4 w-4" />}
              label="Welcome"
              href="/"
              active
            />
            <NavItem
              icon={<Archive className="h-4 w-4" />}
              label="Archived"
              href="/archived"
            />
            <NavItem
              icon={<BookOpen className="h-4 w-4" />}
              label="Library"
              href="/library"
              badge="21"
            />
            <NavItem
              icon={<History className="h-4 w-4" />}
              label="History"
              href="/history"
            />
          </div>
        </div>
        <div className="mt-6 px-3 py-2">
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            AI Tools
          </h2>
          <div className="space-y-1">
            <NavItem
              icon={<MessageCircle className="h-4 w-4" />}
              label="Chat AI"
              href="/chat"
            />
            <NavItem
              icon={<ImageIcon className="h-4 w-4" />}
              label="Image Generator"
              href="/image-generator"
            />
            <NavItem
              icon={<Video className="h-4 w-4" />}
              label="Video Generator"
              href="/video-generator"
            />
            <NavItem
              icon={<Code className="h-4 w-4" />}
              label="Code Generator"
              href="/code-generator"
            />
          </div>
        </div>
        <div className="mt-6 px-3 py-2">
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Others
          </h2>
          <div className="space-y-1">
            <NavItem
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
              href="/settings"
            />
            <div className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center">
                  <Moon className="h-4 w-4" />
                </span>
                <span>Dark Mode</span>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

