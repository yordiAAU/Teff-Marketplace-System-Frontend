import { useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, UserCircle, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useLogout } from "@/features/auth/hooks/useAuth";
import type { UserRole } from "@/types/api.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  role: UserRole;
}

export function UserMenu({ role }: UserMenuProps) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="group flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-slate-50">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">{user?.fullName ?? "User"}</p>
            <p className="text-xs capitalize text-slate-500">{role}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/20 bg-secondary/10 font-bold text-secondary">
            {user?.fullName?.charAt(0) ?? role[0].toUpperCase()}
          </div>
          <ChevronDown size={16} className="text-slate-400 transition-colors group-hover:text-slate-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate(`/${role}/profile`)}>
          <UserCircle size={16} /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`/${role}/dashboard`)}>
          <LayoutDashboard size={16} /> Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          <LogOut size={16} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
