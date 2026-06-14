import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  LogOut,
  Menu,
  Bell,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { UserMenu } from "@/components/layout/UserMenu";
import { useLogout } from "@/features/auth/hooks/useAuth";
import type { UserRole } from "@/types/api.types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

const navigation: Record<UserRole, { name: string; href: string; icon: typeof LayoutDashboard }[]> = {
  customer: [
    { name: "Dashboard", href: "/customer/dashboard", icon: LayoutDashboard },
    { name: "Marketplace", href: "/customer/marketplace", icon: ShoppingBag },
    { name: "My Orders", href: "/customer/orders", icon: Package },
    { name: "Profile", href: "/customer/profile", icon: UserCircle },
  ],
  farmer: [
    { name: "Dashboard", href: "/farmer/dashboard", icon: LayoutDashboard },
    { name: "My Products", href: "/farmer/products", icon: Package },
    { name: "Orders", href: "/farmer/orders", icon: ShoppingBag },
    { name: "Profile", href: "/farmer/profile", icon: UserCircle },
  ],
  admin: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Profile", href: "/admin/profile", icon: UserCircle },
  ],
};

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const logout = useLogout();
  const currentNav = navigation[role];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-bold text-white">T</span>
              </div>
              <span className="font-serif text-xl font-bold text-slate-900">TeffMarket</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-4">
            {currentNav.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-4">
            <button
              type="button"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:block" />

          <div className="flex items-center gap-4">
            <button type="button" className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
            </button>
            <div className="mx-2 h-8 w-px bg-slate-200" />
            <UserMenu role={role} />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
