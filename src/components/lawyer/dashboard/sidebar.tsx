"use client";

import {
  Briefcase,
  DollarSign,
  HandHelping,
  Receipt,
  Settings,
  Users,
  GraduationCap,
  Clock,
  ChevronLeft,
  Sparkles,
  SquareChartGantt,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

// Menu items
const items = [
  {
    title: "Xegality AI",
    url: "/lawyer/dashboard/xegality-ai",
    icon: Sparkles,
  },
  { title: "Clients", url: "/lawyer/dashboard/clients", icon: Users },
  { title: "Cases", url: "/lawyer/dashboard/cases", icon: Briefcase },
  {
    title: "Appointments",
    url: "/lawyer/dashboard/appointments",
    icon: Clock,
  },
  {
    title: "Manage Interns",
    url: "/lawyer/dashboard/manage-interns",
    icon: GraduationCap,
  },
  {
    title: "Internships",
    url: "/lawyer/dashboard/internships",
    icon: SquareChartGantt,
  },
  {
    title: "Subscription",
    url: "/lawyer/dashboard/subscriptions",
    icon: Receipt,
  },
  {
    title: "Help & Support",
    url: "/lawyer/dashboard/help-support",
    icon: HandHelping,
  },
  {
    title: "Billing & Payment",
    url: "/lawyer/dashboard/billing-and-payment",
    icon: DollarSign,
  },
  { title: "Settings", url: "/lawyer/dashboard/settings", icon: Settings },
  { title: "Back To Home", url: "/lawyer", icon: ChevronLeft },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating" className="bg-transparent">
      <SidebarContent className="bg-white rounded-4xl">
        <SidebarGroup>
          <div className="px-4 py-3">
            <SidebarGroupLabel className="text-2xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-slate-600 to-amber-600 tracking-wide">
              Xegality
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 mt-5">
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={clsx(
                        "rounded-full hover:bg-amber-700 hover:text-white",
                        isActive ? "shadow-xl" : ""
                      )}
                    >
                      <Link
                        href={item.url}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                          isActive
                            ? "bg-amber-700 text-white shadow"
                            : "text-gray-700 hover:bg-slate-700/60 hover:text-white dark:text-gray-300 dark:hover:text-white"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
