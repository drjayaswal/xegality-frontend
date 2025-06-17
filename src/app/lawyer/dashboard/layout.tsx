"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function SidebarToggleButton({
  className,
}: {
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const storedState = localStorage.getItem("sidebarOpen");
    if (storedState !== null) {
      setIsOpen(storedState === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", String(isOpen));
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "fixed top-[8px] z-50 transition-all duration-300 ",
        isOpen ? "left-[220px]" : "left-[20px] top-[20px]"
      )}
    >
      <SidebarTrigger
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          isOpen
            ? "text-sky-600 hover:bg-sky-600 bg-sky-600/20 stroke-2.5 hover:text-white  rounded-none rounded-bl-[12px] rounded-tr-[12px] shadow-none py-3 backdrop-blur-sm border-0"
            : "text-white bg-sky-600 stroke-2.5 hover:bg-sky-600 hover:text-white  rounded-full shadow-none py-3 animate-spin",
          className
        )}
      />
    </div>
  );
}
