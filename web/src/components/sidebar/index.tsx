import { UserButton } from "@daveyplate/better-auth-ui";
import {
  BarChart3,
  ChevronRight,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Lock,
  type LucideIcon,
  Settings,
  Users,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { authClient } from "~/lib/auth";
import { cn } from "~/lib/utils";

interface SidebarSubItem {
  title: string;
  url?: string;
  includeHomeEnvironmentId?: boolean;
  role?: string;
}

interface SidebarItems {
  title: string;
  url?: string;
  icon: LucideIcon;
  includeHomeEnvironmentId?: boolean;
  role?: string;
  items?: SidebarSubItem[];
  expandable?: boolean;
}

const data: SidebarItems[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Analytics",
    icon: BarChart3,
    expandable: true,
    items: [
      {
        title: "Overview",
        url: "/analytics/overview",
      },
      {
        title: "Reports",
        url: "/analytics/reports",
      },
      {
        title: "Insights",
        url: "/analytics/insights",
      },
    ],
  },
  {
    title: "Documents",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Help Center",
    url: "/help",
    icon: HelpCircle,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const { state } = useSidebar();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem("sidebar_open_menus");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const user = session?.user;

  const toggleMenu = useCallback((menuTitle: string) => {
    setOpenMenus((prev) => {
      const newState = {
        ...prev,
        [menuTitle]: !prev[menuTitle],
      };
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          localStorage.setItem("sidebar_open_menus", JSON.stringify(newState));
        });
      } else {
        setTimeout(() => {
          localStorage.setItem("sidebar_open_menus", JSON.stringify(newState));
        }, 0);
      }
      return newState;
    });
  }, []);

  const hasRequiredGroups = useCallback(
    (role?: string) => {
      if (!role) return true;
      if (!user?.role) return false;
      return role === user.role;
    },
    [user?.role]
  );

  const handleNavigation = useCallback(
    (e: React.MouseEvent, item: SidebarItems | SidebarSubItem) => {
      e.preventDefault();

      if ("expandable" in item && item.expandable && item.items?.length) {
        toggleMenu(item.title);
        return;
      }

      if (!item.url) return;

      const url = item.url;

      const shouldOpenNewTab = e.ctrlKey || e.metaKey;
      shouldOpenNewTab ? window.open(url, "_blank") : navigate(url);
    },
    [navigate, toggleMenu]
  );

  return (
    <Sidebar variant={"inset"} collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 rounded-lg px-2 py-3 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 shadow-sm transition-all duration-200">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
            <h1 className="text-base font-semibold tracking-tight">
              Boilerplate
            </h1>
            <p className="text-xs text-muted-foreground">Project Name</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider">
              Platform
            </SidebarGroupLabel>
            <SidebarMenu>
              {data?.map((item) => {
                const isDisabled = !hasRequiredGroups(item.role);
                const hasSubItems = item.items && item.items.length > 0;

                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    open={openMenus[item.title] || false}
                    onOpenChange={() => !isDisabled && toggleMenu(item.title)}
                  >
                    <SidebarMenuItem className="flex flex-col">
                      {item.url ? (
                        <SidebarMenuButton
                          asChild
                          tooltip={
                            isDisabled ? "Requires admin access" : item.title
                          }
                          className={cn(
                            isDisabled && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <a
                            onClick={(e) => handleNavigation(e, item)}
                            href={item.url}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton
                          tooltip={
                            isDisabled
                              ? "Requires admin access"
                              : item.expandable && hasSubItems
                                ? `${item.title} (click to expand)`
                                : item.title
                          }
                          onClick={() => {
                            if (!isDisabled && hasSubItems) {
                              toggleMenu(item.title);
                            }
                          }}
                          className={cn(
                            isDisabled && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          {isDisabled && <Lock className="ml-auto h-3 w-3" />}
                        </SidebarMenuButton>
                      )}
                      {hasSubItems ? (
                        <>
                          <CollapsibleTrigger
                            asChild
                            className={cn(
                              isDisabled && "pointer-events-none opacity-50"
                            )}
                          >
                            <SidebarMenuAction className="data-[state=open]:rotate-90 transition-transform duration-200">
                              {hasRequiredGroups(item.role) ? (
                                <ChevronRight className="cursor-pointer" />
                              ) : (
                                <Lock />
                              )}
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem) => {
                                const isSubItemDisabled = !hasRequiredGroups(
                                  subItem.role
                                );

                                return (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                      asChild
                                      className={cn(
                                        "transition-all duration-200 relative",
                                        isSubItemDisabled &&
                                          "opacity-50 cursor-not-allowed"
                                      )}
                                    >
                                      {subItem.url ? (
                                        <a
                                          onClick={(e) =>
                                            handleNavigation(e, subItem)
                                          }
                                          href={subItem.url}
                                          className={cn(
                                            "flex items-center w-full",
                                            isSubItemDisabled &&
                                              "pointer-events-none"
                                          )}
                                        >
                                          <span className="truncate">
                                            {subItem.title}
                                          </span>
                                        </a>
                                      ) : (
                                        <Button
                                          type="button"
                                          className={cn(
                                            "w-full flex items-center justify-start",
                                            isSubItemDisabled &&
                                              "pointer-events-none"
                                          )}
                                        >
                                          <span className="truncate">
                                            {subItem.title}
                                          </span>
                                        </Button>
                                      )}
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <UserButton size={state === "collapsed" ? "icon" : "default"} />
      </SidebarFooter>
    </Sidebar>
  );
}
