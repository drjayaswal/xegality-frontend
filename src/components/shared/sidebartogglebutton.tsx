"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";

export default function SidebarToggleButton() {
  const { open: isOpen = false } = useSidebar();

  return (
    <div
      className={clsx(
        "fixed top-3 z-50 transition-all duration-300",
        isOpen ? "left-[216px]" : "left-5 top-5"
      )}
    >
      <SidebarTrigger className="stroke-2.5 text-amber-700 hover:text-white hover:bg-amber-700 rounded-[8px] shadow-none hover:shadow-xl bg-amber-700/20 py-3 backdrop-blur-sm" />
    </div>
  );
}
