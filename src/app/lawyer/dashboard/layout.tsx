import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/lawyer/dashboard/sidebar";
import clsx from "clsx";
import SidebarToggleButton from "@/components/shared/sidebartogglebutton";

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
