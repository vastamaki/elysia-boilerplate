import { Outlet } from "react-router";
import { AppSidebar } from "~/components/sidebar";
import Header from "~/components/sidebar/header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

export default function DashboardLayout() {
  return (
    <SidebarProvider className="h-screen! max-h-screen! min-h-0!">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <Header />
        </header>
        <div
          className={cn(
            "flex-1 overflow-y-auto p-4 max-w-[calc(1568px)] min-h-0"
          )}
          data-content-area="true"
        >
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
