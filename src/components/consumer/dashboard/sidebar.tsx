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
  SquareGanttChartIcon as SquareChartGantt,
  ArrowUpRight,
  User,
  BellDot,
  Zap,
  LogOut,
  Home,
  MessageCircle,
  Scale,
  FileCheck,
  MessageSquare,
  FileText,
  CreditCard,
  History,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";


// Main menu items from previous page
const services = [
  { title: "Home", url: "/consumer", icon: Home, },
  { title: "Legal Chat", url: "/consumer/dashboard/legal-chat", icon: MessageCircle, },
  { title: "Case Updates", url: "/consumer/dashboard/cases", icon: Scale, },
  { title: "Application Updates", url: "/consumer/dashboard/ca", icon: FileCheck, },
  { title: "Contracts & Agreements", url: "/consumer/dashboard/agreements", icon: FileText, },
];

const other_menu_items = [
  { title: "History", url: "/consumer/dashboard/history", icon: History, },
  { title: "Subscription", url: "/consumer/dashboard/subscription", icon: Receipt, },
  { title: "Billing & Payment", url: "/consumer/dashboard/billing", icon: CreditCard, },
  { title: "Help & Support", url: "/consumer/dashboard/support", icon: HandHelping, },
  { title: "Settings", url: "/consumer/dashboard/settings", icon: Settings },
  // { title: "Get a Lawyer", url: "/consumer/find-lawyer", icon: Scale, },
  // { title: "Consult a CA", url: "/consumer/consult-ca", icon: MessageSquare, },
  // { title: "New Contract", url: "/consumer/legal-services", icon: FileText, },
];

const dropdown_menu_items = [
  { title: "Profile", url: "/consumer/dashboard/profile", icon: User, },
  { title: "Notifications", url: "/consumer/dashboard/notifications", icon: BellDot, },
  { title: "Upgrade to Pro", url: "/consumer/dashboard/subscriptions", icon: Zap, },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating" className="bg-transparent">
      <SidebarHeader className="w-full flex flex-col items-center bg-accent-violet/3 rounded-t-[9px]">
        <Link href="/consumer" className="">
          <SidebarGroupLabel className="py-8 text-3xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-slate-600 to-accent-violet tracking-wide">
            Xegality
          </SidebarGroupLabel>
        </Link>
      </SidebarHeader>

      <SidebarContent className={`text-gray-700 bg-accent-violet/3 font-medium group-data-[collapsible=icon]:pt-20 pt-10 transition-all duration-500`}>
        <SidebarGroup className="">
          <SidebarGroupContent className="">
            <SidebarMenu className="flex flex-col gap-2">
              {services.map((item, index) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={index} className="">
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "p-5 hover:bg-accent-violet/5 hover:text-accent-violet active:bg-accent-violet/5 active:text-text-accent-violet",
                        isActive && "bg-accent-violet hover:bg-accent-violet active:bg-accent-violet active:text-text-accent-violet"
                      )}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          "",
                          isActive &&
                          "hover:text-white text-white hover:bg-accent-violet rounded-lg shadow-lg"
                        )}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="border-t">
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {other_menu_items.map((item, index) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={index} className="">
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "p-5 hover:bg-accent-violet/5 hover:text-accent-violet active:bg-accent-violet/5 active:text-text-accent-violet",
                        isActive && "bg-accent-violet hover:bg-accent-violet active:bg-accent-violet active:text-text-accent-violet"
                      )}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          "",
                          isActive &&
                          "hover:text-white text-white hover:bg-accent-violet rounded-lg shadow-lg"
                        )}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup className="border-t">
          <SidebarGroupContent className="">
            <SidebarMenu className="">
              {quick_links.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton
                    asChild
                    className="pl-4 hover:bg-accent-violet/5 bg-accent-violet/5 text-accent-violet hover:text-accent-violet"
                  >
                    <Link href={item.url} className="">
                      <item.icon />
                      <span className="">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter className="w-full bg-accent-violet/3 rounded-b-[9px]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton
                variant={"default"}
                size={"lg"}
                className="cursor-pointer bg-accent-violet/10 hover:bg-accent-violet/15 focus-visible:ring-0"
                asChild
              >
                <DropdownMenuTrigger className="flex items-center gap-3 pl-4">
                  <Avatar className="size-8 bg-accent-violet">
                    <AvatarImage
                      src="/sampleDP.avif"
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-accent-violet/10 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <span>John Lawyer</span>
                </DropdownMenuTrigger>
              </SidebarMenuButton>
              <DropdownMenuContent
                side="right"
                sideOffset={15}
                className="mb-2 rounded-xl shadow-sm -ml-1 bg-[#f1f1f9] border-[1.5px]"
              >
                <DropdownMenuLabel className="flex gap-2 items-center">
                  <Avatar className="size-10 bg-accent-violet/50">
                    <AvatarImage
                      src="/sampleDP.avif"
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-indigo-600/10 text-indigo-800">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>John Lawyer</span>
                    <span className="text-xs font-normal text-gray-500">
                      johnlawyer@gmail.com
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dropdown_menu_items.map((item, index) => (
                  <Link key={index} href={item.url} className="">
                    <DropdownMenuItem
                      className="cursor-pointer focus:bg-accent-violet/5 focus:text-accent-violet"
                      key={index}
                    >
                      <item.icon className="group-hover:text-accent-violet" />{" "}
                      {item.title}
                    </DropdownMenuItem>
                  </Link>
                ))}
                <DropdownMenuSeparator />

                <Link href={""} className="">
                  <DropdownMenuItem className="cursor-pointer focus:bg-red-500/5 focus:text-red-600">
                    <LogOut className="group-hover:text-red-600" /> Log out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
