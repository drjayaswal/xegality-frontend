import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/consumer/dashboard/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-2 min-h-screen w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
