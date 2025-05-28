"use client";
import {
  Briefcase,
  DollarSign,
  HandHelping,
  Home,
  Receipt,
  Search,
  Settings,
  Users,
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

// Menu items.

import { usePathname } from "next/navigation";
import clsx from "clsx";

// Menu items

const items = [
  { title: "Home", url: "/lawyer/dashboard", icon: Home },
  { title: "Xegality AI", url: "/lawyer/dashboard/xegality-ai", icon: Search },
  { title: "Clients", url: "/lawyer/dashboard/clients", icon: Users },
  { title: "Cases", url: "/lawyer/dashboard/cases", icon: Briefcase },
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
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-3">
            <SidebarGroupLabel className="text-2xl font-semibold text-[#3b82f6] tracking-wide">
              Dashboard
            </SidebarGroupLabel>
          </div>{" "}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 pt-3">
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={clsx(
                        "hover:bg-[#3b82f6] hover:text-white",
                        isActive ? "shadow-xl" : ""
                      )}
                    >
                      <a
                        href={item.url}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                          isActive
                            ? "bg-[#3b82f6] text-white shadow"
                            : "text-gray-700 hover:bg-[#3b82f6] hover:text-[#3b82f6]"
                        )}
                      >
                        <item.icon
                          className={clsx(
                            "h-5 w-5",
                            isActive ? "text-white hover:text-white" : ""
                          )}
                        />
                        <span>{item.title}</span>
                      </a>
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
