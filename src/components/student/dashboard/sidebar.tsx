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
    url: "/student/dashboard/xegality-ai",
    icon: Sparkles,
  },
  { title: "Clients", url: "/student/dashboard/clients", icon: Users },
  { title: "Cases", url: "/student/dashboard/cases", icon: Briefcase },
  {
    title: "Appointments",
    url: "/student/dashboard/appointments",
    icon: Clock,
  },
  {
    title: "Manage Interns",
    url: "/student/dashboard/manage-interns",
    icon: GraduationCap,
  },
  {
    title: "Internships",
    url: "/student/dashboard/internships",
    icon: SquareChartGantt,
  },
  {
    title: "Subscription",
    url: "/student/dashboard/subscriptions",
    icon: Receipt,
  },
  {
    title: "Help & Support",
    url: "/student/dashboard/help-support",
    icon: HandHelping,
  },
  {
    title: "Billing & Payment",
    url: "/student/dashboard/billing-and-payment",
    icon: DollarSign,
  },
  { title: "Settings", url: "/student/dashboard/settings", icon: Settings },
  { title: "Back To Home", url: "/student", icon: ChevronLeft },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating" className="bg-transparent">
      <SidebarContent className="bg-white rounded-4xl">
        <SidebarGroup>
          <div className="px-4 py-3">
            <SidebarGroupLabel className="text-2xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-slate-600 to-emerald-600 tracking-wide">
              Student
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
                        "rounded-full hover:bg-emerald-700 hover:text-white",
                        isActive ? "shadow-xl" : ""
                      )}
                    >
                      <Link
                        href={item.url}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                          isActive
                            ? "bg-emerald-700 text-white shadow"
                            : "text-gray-700 hover:bg-emerald-200/30 hover:text-white dark:text-gray-300 dark:hover:text-white"
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
