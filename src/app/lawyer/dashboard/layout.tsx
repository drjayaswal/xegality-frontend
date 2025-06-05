import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/lawyer/dashboard/sidebar";
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
        <SidebarToggleButton className="text-amber-700 hover:bg-amber-700 bg-amber-700/20" />
        {children}
      </main>
    </SidebarProvider>
  );
}
