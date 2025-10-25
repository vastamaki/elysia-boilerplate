import { Copy } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const generateBreadcrumbItem = useCallback(
    (pathSnippets: string[], endIndex: number) => {
      const href = `/${pathSnippets.slice(0, endIndex + 1).join("/")}`;
      const key = pathSnippets[endIndex];
      return { key, title: key, href };
    },
    []
  );

  const breadcrumbItems = useMemo(() => {
    if (pathSnippets.length === 0) return [];
    return pathSnippets.length === 1
      ? [generateBreadcrumbItem(pathSnippets, 0)]
      : pathSnippets.map((_, index) =>
          generateBreadcrumbItem(pathSnippets, index)
        );
  }, [pathSnippets, generateBreadcrumbItem]);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);

    toast.success("Copied to clipboard! :)", {
      description: "You can now paste it anywhere.",
    });
  };

  const isNumeric = (value: string): boolean => {
    return !Number.isNaN(Number(value));
  };

  return (
    <div className="flex w-full justify-between items-center gap-2 px-2 py-1">
      <div className="flex items-center justify-between gap-2">
        <SidebarTrigger className="hover:bg-accent transition-colors" />
        <Separator orientation="vertical" className="h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.key}>
                <BreadcrumbItem className="flex items-center gap-1">
                  <BreadcrumbLink
                    onClick={() => navigate(item.href)}
                    className="capitalize hover:text-primary transition-colors cursor-pointer font-medium"
                  >
                    {item.title}
                  </BreadcrumbLink>
                  {isNumeric(item.key) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-accent transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyId(item.key);
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Header;
