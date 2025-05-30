"use client";

import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/lawyer/dashboard/sidebar";
import clsx from "clsx";

function SidebarToggleButton() {
  const { open: isOpen = false } = useSidebar();

  return (
    <div
      className={clsx(
        "fixed top-3 z-50 transition-all duration-300",
        isOpen ? "left-[216px]" : "left-5 top-5"
      )}
    >
      <SidebarTrigger className="stroke-2.5 text-[#3b82f6] hover:text-white hover:bg-[#3b82f6] rounded-[8px] shadow-none hover:shadow-xl bg-[#3b82f6]/20 py-3 backdrop-blur-sm" />
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
      <main className="p-2 min-h-screen w-full">
        <SidebarToggleButton />
        {children}
      </main>
    </SidebarProvider>
  );
}
