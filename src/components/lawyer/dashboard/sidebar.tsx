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
  { title: "Home", url: "/lawyer", icon: Home },
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
];

const other_menu_items = [
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
];

const dropdown_menu_items = [
  {
    title: "Profile",
    url: "/lawyer/dashboard/settings",
    icon: User,
  },
  {
    title: "Notifications",
    url: "/lawyer/dashboard/notifications",
    icon: BellDot,
  },
  {
    title: "Upgrade to Pro",
    url: "/lawyer/dashboard/subscriptions",
    icon: Zap,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating" className="bg-transparent">
      <SidebarHeader className="w-full flex flex-col items-center bg-amber-700/10 rounded-t-[9px]">
        <Link href="/lawyer" className="">
          <SidebarGroupLabel className="py-8 text-4xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-slate-600 to-amber-600 tracking-wide">
            Xegality
          </SidebarGroupLabel>
        </Link>
      </SidebarHeader>

      <SidebarContent className={`text-gray-700 font-medium bg-amber-700/10`}>
        <SidebarGroup className="">
          <SidebarGroupContent className="">
            <SidebarMenu className="">
              {services.map((item, index) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={index} className="">
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "pl-4 hover:bg-amber-700/15 hover:text-amber-700 active:bg-amber-700/80 active:text-white",
                        isActive && "bg-amber-700 hover:bg-amber-700"
                      )}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          "",
                          isActive &&
                            "hover:text-white text-white hover:bg-amber-700 rounded-lg shadow-lg"
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
                        "pl-4 hover:bg-amber-700/15 hover:text-amber-700 active:bg-amber-700/80 active:text-white",
                        isActive && "bg-amber-700 hover:bg-amber-700"
                      )}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          "",
                          isActive &&
                            "hover:text-white text-white hover:bg-amber-700 rounded-lg shadow-lg"
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
                    className="pl-4 hover:bg-amber-700/5 bg-amber-700/5 text-amber-700 hover:text-amber-700"
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

      <SidebarFooter className="w-full bg-amber-700/10 rounded-b-[9px]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton
                variant={"default"}
                size={"lg"}
                className="cursor-pointer bg-amber-700/10 hover:bg-amber-700/15 focus-visible:ring-0"
                asChild
              >
                <DropdownMenuTrigger className="flex items-center gap-3 pl-4">
                  <Avatar className="size-8 bg-amber-800">
                    <AvatarImage
                      src="/sampleDP.avif"
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-amber-700/10 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <span>John Lawyer</span>
                </DropdownMenuTrigger>
              </SidebarMenuButton>
              <DropdownMenuContent
                side="right"
                sideOffset={15}
                className="mb-2 rounded-xl shadow-sm -ml-1 bg-[#f6f1ee] border-[1.5px]"
              >
                <DropdownMenuLabel className="flex gap-2 items-center">
                  <Avatar className="size-10 bg-amber-800">
                    <AvatarImage
                      src="/sampleDP.avif"
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-amber-600/10 text-amber-800">
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
                      className="cursor-pointer focus:bg-amber-700/5 focus:text-amber-700"
                      key={index}
                    >
                      <item.icon className="group-hover:text-amber-700" />{" "}
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
