import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/consumer/dashboard/sidebar"
import SidebarToggleButton from "@/components/shared/sidebartogglebutton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="md:m-2 md:ml-0.5 w-full min-h-full md:max-h-[calc(100svh-16px)]  bg-gradient-to-br from-white to-[#c0c4f7] rounded-lg overflow-scroll shadow-md border ">
        <SidebarToggleButton className="text-accent-violet hover:bg-accent-violet bg-accent-violet/8" />
        {children}
      </main>
    </SidebarProvider>
  )
}
