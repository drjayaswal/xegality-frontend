"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import clsx from "clsx";

export default function SidebarToggleButton({ className }: { className?: string }) {
  const { open: isOpen = false } = useSidebar();

  return (
    <div
      className={clsx(
        "fixed top-3 z-50 transition-all duration-300",
        isOpen ? "left-[216px]" : "left-5 top-5"
      )}
    >
      <SidebarTrigger className={cn("stroke-2.5 text-blue-700 hover:text-white hover:bg-blue-700 rounded-[8px] shadow-none hover:shadow-xl bg-blue-700/20 py-3 backdrop-blur-sm", className)} />
    </div>
  );
}
