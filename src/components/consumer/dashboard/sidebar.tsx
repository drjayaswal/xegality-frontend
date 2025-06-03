import { Calendar, ChevronRight, DollarSign, Home, Inbox, LogOut, Receipt, Search, Settings } from "lucide-react";

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
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Menu items.
const top_menu_items = [
  {
    title: "Home",
    url: "/consumer",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/consumer/dashboard/inbox",
    icon: Inbox,
  },
  {
    title: "Subscription",
    url: "/lawyer/dashboard/subscriptions",
    icon: Receipt,
  },
  {
    title: "Billing & Payment",
    url: "/consumer/dashboard/billing-and-payment",
    icon: DollarSign,
  },
  {
    title: "Settings",
    url: "/consumer/dashboard/settings",
    icon: Settings,
  },
];


const bottom_menu_items = [
  {
    title: "Home",
    url: "/consumer",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/consumer/dashboard/inbox",
    icon: Inbox,
  },
  {
    title: "Subscription",
    url: "/lawyer/dashboard/subscriptions",
    icon: Receipt,
  },
  {
    title: "Billing & Payment",
    url: "/consumer/dashboard/billing-and-payment",
    icon: DollarSign,
  },
  {
    title: "Settings",
    url: "/consumer/dashboard/settings",
    icon: Settings,
  },
];

const account = [
  {
    title: "Settings",
    url: "/consumer/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    url: "/consumer/dashboard/help-support",
    icon: Search,
  },
  {
    title: "Billing & Payment",
    url: "/consumer/dashboard/billing-and-payment",
    icon: DollarSign,
  },
  {
    title: "Subscription",
    url: "/consumer/dashboard/subscriptions",
    icon: Receipt,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  }
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating" className="bg-transparent">
      <SidebarContent className=" flex flex-cols justify-between items-center">

        <SidebarHeader className="">
          <Link href="/consumer" className="">
            {/* <Image src="/svg/temp-logo.svg" alt="Logo" width={100} height={40} className="w-full" /> */}
            <SidebarGroupLabel className="text-2xl font-semibold text-[#3b82f6] tracking-wide">
              Xegality
            </SidebarGroupLabel>
          </Link>
        </SidebarHeader>

        <SidebarGroup>
          {/* <SidebarGroupLabel>Consumer Dashboard</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="">
              {top_menu_items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent className="">
            <SidebarMenu className="">
              {top_menu_items.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild className="pl-4">
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter className="w-full">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            {account.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <DropdownMenu>
                <SidebarMenuButton variant={'default'} size={'lg'} className="cursor-pointer bg-gradient-to-br from-zinc-600/20 to-zinc-600/5" asChild>
                  <DropdownMenuTrigger className="flex items-center gap-3">
                    <Avatar className="size-8 bg-cyan-800">
                      <AvatarImage src="/sampleDP.avif" alt="User Avatar" className="object-contain" />
                      <AvatarFallback className="bg-blue-700/10 text-white">U</AvatarFallback>
                    </Avatar>
                    <span> Lina Morales </span>
                    <ChevronRight className="size-4 text-gray-700" />
                  </DropdownMenuTrigger>
                </SidebarMenuButton>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex gap-2 items-center">
                    <Avatar className="size-10 bg-cyan-800">
                      <AvatarImage src="/sampleDP.avif" alt="User Avatar" className="object-contain" />
                      <AvatarFallback className="bg-blue-600/10 text-blue-800">U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span> Lina Morales </span>
                      <span className="text-xs font-normal text-gray-500"> linamorale@gmail.com </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><LogOut /> Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

      </SidebarContent>
    </Sidebar >
  );
}
