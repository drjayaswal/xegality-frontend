"use client";
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
} from "lucide-react";

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

// Main menu items from previous page
const services = [
  { title: "Home", url: "/student", icon: Home },
  {
    title: "Xegality AI",
    url: "/student/dashboard/xegality-ai",
    icon: Sparkles,
  },
  {
    title: "Professionals",
    url: "/student/dashboard/professionals",
    icon: Users,
  },
];

const other_menu_items = [
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
  { title: "Settings", url: "/student/dashboard/settings", icon: Settings },
];

const dropdown_menu_items = [
  {
    title: "Profile",
    url: "/student/dashboard/settings",
    icon: User,
  },
  {
    title: "Upgrade to Pro",
    url: "/student/dashboard/subscriptions",
    icon: Zap,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating" className="bg-transparent">
      <SidebarHeader className="w-full flex flex-col items-center bg-emerald-700/10 rounded-t-[9px]">
        <Link href="/student" className="">
          <SidebarGroupLabel className="py-8 text-4xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-slate-600 to-emerald-600 tracking-wide">
            Xegality
          </SidebarGroupLabel>
        </Link>
      </SidebarHeader>

      <SidebarContent className={`text-gray-700 font-medium bg-emerald-700/10`}>
        <SidebarGroup>
          <SidebarGroupContent className="">
            <SidebarMenu className="">
              {services.map((item, index) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={index} className="">
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "pl-4 hover:bg-emerald-700/15 hover:text-emerald-700 active:bg-emerald-700/80 active:text-white",
                        isActive && "bg-emerald-700 hover:bg-emerald-700"
                      )}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          "",
                          isActive &&
                            "hover:text-white text-white hover:bg-emerald-700 rounded-lg shadow-lg"
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
            <SidebarMenu className="">
              {other_menu_items.map((item, index) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={index} className="">
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "pl-4 hover:bg-emerald-700/15 hover:text-emerald-700 active:bg-emerald-700/80 active:text-white",
                        isActive && "bg-emerald-700 hover:bg-emerald-700"
                      )}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          "",
                          isActive &&
                            "hover:text-white text-white hover:bg-emerald-700 rounded-lg shadow-lg"
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
                    className="pl-4 hover:bg-emerald-700/5 bg-emerald-700/5 text-emerald-700 hover:text-emerald-700"
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

      <SidebarFooter className="w-full bg-emerald-700/10 rounded-b-[9px]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton
                variant={"default"}
                size={"lg"}
                className="cursor-pointer bg-emerald-700/10 hover:bg-emerald-700/15 focus-visible:ring-0"
                asChild
              >
                <DropdownMenuTrigger className="flex items-center gap-3 pl-4">
                  <Avatar className="size-8 bg-emerald-800">
                    <AvatarImage
                      src="/sampleDP.avif"
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-emerald-700/10 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <span>Sarah Johnson</span>
                </DropdownMenuTrigger>
              </SidebarMenuButton>
              <DropdownMenuContent
                side="right"
                sideOffset={15}
                className="mb-2 rounded-xl shadow-sm -ml-1 bg-[#e5ebea] border-[1.5px]"
              >
                <DropdownMenuLabel className="flex gap-2 items-center">
                  <Avatar className="size-10 bg-emerald-800">
                    <AvatarImage
                      src="/sampleDP.avif"
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-emerald-600/10 text-emerald-800">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>Sarah Johnson</span>
                    <span className="text-xs font-normal text-gray-500">
                      johnstudent@gmail.com
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dropdown_menu_items.map((item, index) => (
                  <Link key={index} href={item.url} className="">
                    <DropdownMenuItem
                      className="cursor-pointer focus:bg-emerald-700/5 focus:text-emerald-700"
                      key={index}
                    >
                      <item.icon className="group-hover:text-emerald-700" />{" "}
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
