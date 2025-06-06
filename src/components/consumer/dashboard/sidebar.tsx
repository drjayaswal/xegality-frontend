"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  BellDot,
  Calendar,
  ChevronRight,
  CircleHelp,
  DollarSign,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Receipt,
  Search,
  Settings,
  User,
  Users,
  Zap,
  Scale,
  Briefcase,
  FileText,
  Building2,
  MessageSquare,
  History,
  HelpCircle,
  CirclePlus,
  CircleArrowOutUpRight,
  SquareArrowOutUpRight,
  CreditCard,
  MessageCircle,
  FileCheck,
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
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// Menu items organized by groups
const menuItems = [
  // {
  //   group: "top",
  //   content: [{
  //     title: "Back to Home",
  //     url: "/consumer",
  //     icon: ArrowLeft,
  //   },
  //   ]
  // },
  {
    groupName: "Services",
    groupContent: [
      {
        title: "Legal Chat",
        url: "/consumer/dashboard/lawyers",
        icon: MessageCircle,
      },
      {
        title: "Case Updates",
        url: "/consumer/dashboard/cases",
        icon: Scale,
      },
      {
        title: "Application Updates",
        url: "/consumer/dashboard/ca",
        icon: FileCheck,
      },
      {
        title: "Contracts & Agreements",
        url: "/consumer/dashboard/agreements",
        icon: FileText,
      },
    ]
  },
  {
    groupName: "QuickLinks",
    groupContent: [
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
    ]
  },
  {
    groupName: "Others",
    groupContent: [
      {
        title: "Billing & Payment",
        url: "/consumer/dashboard/billing",
        icon: CreditCard,
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
      {
        title: "Settings",
        url: "/consumer/dashboard/settings",
        icon: Settings,
      },
    ]
  },
];

const dropdownItems = [
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
]

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

      <SidebarContent className="mt-10 group-data-[collapsible=icon]:mt-20 transition-all duration-700  text-gray-700">
        {menuItems.map((group, index) => (
          <SidebarGroup className="group-data-[collapsible=icon]:border-t gap-1">
            <SidebarGroupLabel className="ml-2 text-gray-400 text-sm font-normal">{group.groupName}</SidebarGroupLabel>
            <SidebarGroupContent className="">
              <SidebarMenu className="gap-2">
                {group.groupContent.map((item, index) => {
                  const isActive = usePathname() === item.url;

                  return (
                    <SidebarMenuItem key={index} className="">
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "pl-4 hover:bg-accent-violet/5 hover:text-accent-violet",
                          isActive && "hover:bg-accent-violet text-sm"
                        )}
                      >
                        <Link
                          href={item.url}
                          className={cn("", isActive && "hover:text-white  text-accent-violet font-medium hover: bg-accent-violet/5")}
                        >
                          <item.icon className={cn("stroke-[1.5px]", isActive && "stroke-2")} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="w-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton variant={'default'} size={'lg'} className="cursor-pointer bg-gradient-to-br from-accent-violet/5 to-accent-violet/20" asChild>
                <DropdownMenuTrigger className="flex items-center gap-3 pl-4">
                  <Avatar className="size-8 bg-cyan-800">
                    <AvatarImage
                      src="/sampleDP.avif"
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-700/10 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <span> Lina Morales </span>
                  {/* <ChevronRight className="size-4" /> */}
                </DropdownMenuTrigger>
              </SidebarMenuButton>
              <DropdownMenuContent side="top" sideOffset={15} className="">
                <DropdownMenuLabel className="flex gap-2 items-center">
                  <Avatar className="size-10 bg-cyan-800">
                    <AvatarImage
                      src="/sampleDP.avif"
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-600/10 text-blue-800">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span> Lina Morales </span>
                    <span className="text-xs font-normal text-gray-500">
                      {" "}
                      linamorale@gmail.com{" "}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dropdownItems.map((item, index) => (
                  <Link key={index} href={item.url} className="">
                    <DropdownMenuItem
                      className="cursor-pointer focus:bg-accent-violet/5 focus:text-accent-violet "
                      key={index}
                    >
                      <item.icon /> {item.title}
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
