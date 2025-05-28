"use client";

import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/lawyer/dashboard/sidebar";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

function SidebarToggleButton() {
  const { open: isOpen = false } = useSidebar(); // Fallback to false if undefined

  return (
    <div
      className={clsx(
        "fixed top-1 z-50 transition-all duration-300",
        isOpen ? "left-[260px]" : "left-2.5"
      )}
    >
      <SidebarTrigger
        icon={isOpen ? <ArrowLeft /> : <ArrowRight />}
        className="stroke-2.5 text-[#3b82f6] hover:text-white hover:bg-[#3b82f6] rounded-md shadow-none hover:shadow-xl bg-[#3b82f6]/10 rounded-xl backdrop-blur-sm"
      />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarToggleButton />
        {children}
      </main>
    </SidebarProvider>
  );
}
