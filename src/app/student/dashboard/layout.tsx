import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/student/dashboard/sidebar";
import SidebarToggleButton from "@/components/shared/sidebartogglebutton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-emerald-700/6">
      <AppSidebar />
      <main className="md:m-2 md:ml-0.5 w-full min-h-full md:max-h-[calc(100svh-16px)]  bg-[#e1ebea] rounded-lg overflow-scroll shadow-md ">
        <SidebarToggleButton className="text-emerald-700 hover:bg-emerald-700 bg-emerald-700/20" />
        {children}
      </main>
    </SidebarProvider>
  );
}
