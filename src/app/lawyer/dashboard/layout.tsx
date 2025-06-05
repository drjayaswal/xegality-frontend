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
      <main className="md:m-2 md:ml-0.5 w-full min-h-full md:max-h-[calc(100svh-16px)]  bg-gradient-to-br from-[#e9f0fd] to-[#b1cdfb] rounded-lg overflow-scroll shadow-md ">
        <SidebarToggleButton className="text-amber-700 hover:bg-amber-700 bg-amber-700/20" />
        {children}
      </main>
    </SidebarProvider>
  );
}
