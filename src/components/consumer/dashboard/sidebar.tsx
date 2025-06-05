"use client"

import { ArrowLeft, ArrowUpRight, BellDot, Calendar, ChevronRight, CircleHelp, DollarSign, Home, Inbox, LayoutDashboard, LogOut, Receipt, Search, Settings, User, Users, Zap, Scale, Briefcase, FileText, Building2, MessageSquare, History, HelpCircle } from "lucide-react";

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
  SidebarSeparator,
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// Menu items.
const top_menu_items = [
  {
    title: "Back to Home",
    url: "/consumer",
    icon: ArrowLeft,
  },
];


const services = [
  {
    title: "Lawyer Connect",
    url: "/consumer/dashboard/lawyers",
    icon: Scale,
  },
  {
    title: "Case Updates",
    url: "/consumer/dashboard/cases",
    icon: Briefcase,
  },
  {
    title: "Chartered Accountants",
    url: "/consumer/dashboard/ca",
    icon: Building2,
  },
  {
    title: "Contracts & Agreements",
    url: "/consumer/dashboard/agreements",
    icon: FileText,
  },
];

const quick_links = [
  {
    title: "Get a Lawyer",
    url: "/consumer/find-lawyer",
    icon: Scale,
  },
  {
    title: "Consult a CA",
    url: "/consumer/consult-ca",
    icon: MessageSquare,
  },
  {
    title: "New Contract",
    url: "/consumer/legal-services",
    icon: FileText,
  },
];


const other_menu_items = [
  {
    title: "Settings",
    url: "/consumer/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Billing & Payment",
    url: "/consumer/dashboard/billing",
    icon: DollarSign,
  },
  {
    title: "History",
    url: "/consumer/dashboard/history",
    icon: History,
  },
  {
    title: "Support",
    url: "/consumer/dashboard/support",
    icon: HelpCircle,
  },
]

const dropdown_menu_items = [
  {
    title: "Profile",
    url: "/consumer/dashboard/profile",
    icon: User,
  },
  {
    title: "Notifications",
    url: "/consumer/dashboard/notifications",
    icon: BellDot,
  },
  {
    title: "Upgrade to Pro",
    url: "/consumer/dashboard/subscription",
    icon: Zap,
  },
];


export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating" className="bg-transparent">

      <SidebarHeader className="w-full flex flex-col items-center">
        <Link href="/consumer" className="">
          {/* <Image src="/svg/temp-logo.svg" alt="Logo" width={100} height={40} className="w-full" /> */}
          <SidebarGroupLabel className="text-2xl bg-clip-text text-transparent font-extrabold bg-gradient-to-br from-accent-violet to-gray-300 tracking-wide">
            Xegality
          </SidebarGroupLabel>
        </Link>
      </SidebarHeader>

      <SidebarContent className="mt-10 text-gray-700 font-medium">
        {/* <SidebarGroup className=""> */}
        {/*   <SidebarGroupContent> */}
        {/*     <SidebarMenu className=""> */}
        {/*       {top_menu_items.map((item) => ( */}
        {/*         <SidebarMenuItem key={item.title}> */}
        {/*           <SidebarMenuButton asChild> */}
        {/*             <Link href={item.url}> */}
        {/*               <item.icon /> */}
        {/*               <span>{item.title}</span> */}
        {/*             </Link> */}
        {/*           </SidebarMenuButton> */}
        {/*         </SidebarMenuItem> */}
        {/*       ))} */}
        {/*     </SidebarMenu> */}
        {/*   </SidebarGroupContent> */}
        {/* </SidebarGroup> */}

        <SidebarGroup className="">
          {/* <SidebarGroupLabel>Services</SidebarGroupLabel> */}
          <SidebarGroupContent className="">
            <SidebarMenu className="">
              {services.map((item, index) => {
                const isActive = usePathname() === item.url;

                return (
                  <SidebarMenuItem key={index} className="">
                    <SidebarMenuButton asChild className={cn("pl-4 hover:bg-accent-violet/5 hover:text-accent-violet", isActive && "hover:bg-accent-violet")}>
                      <Link href={item.url} className={cn("", isActive && "hover:text-white text-white hover: bg-accent-violet rounded-lg shadow-lg")}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="border-t">
          {/* <SidebarGroupLabel>Others</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="">
              {other_menu_items.map((item, index) => {
                const isActive = usePathname() === item.url;

                return (
                  <SidebarMenuItem key={index} className="">
                    <SidebarMenuButton asChild className={cn("pl-4 hover:bg-accent-violet/5 hover:text-accent-violet", isActive && "hover:bg-accent-violet")}>
                      <Link href={item.url} className={cn("", isActive && "hover:text-white text-white hover: bg-accent-violet rounded-lg shadow-lg")}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="border-t">
          {/* <SidebarGroupLabel>Quick links</SidebarGroupLabel> */}
          <SidebarGroupContent className="">
            <SidebarMenu className="">
              {quick_links.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild className="pl-4 hover:bg-accent-violet/5 hover:text-accent-violet">
                    <Link href={item.url} className="">
                      <item.icon />
                      <span className="">{item.title}</span>
                      <ArrowUpRight className=" p-[1px] " />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="w-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton variant={'default'} size={'lg'} className="cursor-pointer bg-gradient-to-br from-accent-violet/5 to-accent-violet/20" asChild>
                <DropdownMenuTrigger className="flex items-center gap-3 pl-4">
                  <Avatar className="size-8 bg-cyan-800">
                    <AvatarImage src="/sampleDP.avif" alt="User Avatar" className="object-cover" />
                    <AvatarFallback className="bg-blue-700/10 text-white">U</AvatarFallback>
                  </Avatar>
                  <span> Lina Morales </span>
                  {/* <ChevronRight className="size-4" /> */}
                </DropdownMenuTrigger>
              </SidebarMenuButton>
              <DropdownMenuContent side="top" sideOffset={15} className="">
                <DropdownMenuLabel className="flex gap-2 items-center">
                  <Avatar className="size-10 bg-cyan-800">
                    <AvatarImage src="/sampleDP.avif" alt="User Avatar" className="object-cover" />
                    <AvatarFallback className="bg-blue-600/10 text-blue-800">U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span> Lina Morales </span>
                    <span className="text-xs font-normal text-gray-500"> linamorale@gmail.com </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                  dropdown_menu_items.map((item, index) => (
                    <Link href={item.url} className="">
                      <DropdownMenuItem className="cursor-pointer focus:bg-accent-violet/5 focus:text-accent-violet " key={index}>
                        <item.icon /> {item.title}
                      </DropdownMenuItem>
                    </Link>
                  ))
                }
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

    </Sidebar >
  );
}
