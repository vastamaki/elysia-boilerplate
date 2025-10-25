import { Code2 } from "lucide-react";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/50 to-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            <Code2 className="h-6 w-6" />
            <span>Elysia Boilerplate</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>Built with ❤️ using Elysia, React Router, and shadcn/ui</p>
        </div>
      </footer>
    </div>
  );
}
