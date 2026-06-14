import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "primary";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700 border-slate-200",
  success: "bg-green-100 text-green-700 border-green-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
  error: "bg-red-100 text-red-700 border-red-200",
  primary: "bg-primary/10 text-secondary border-primary/20",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function statusBadgeVariant(status: string): BadgeVariant {
  switch (status.toLowerCase()) {
    case "active":
    case "completed":
    case "approved":
      return "success";
    case "pending":
      return "warning";
    case "suspended":
    case "rejected":
    case "cancelled":
    case "inactive":
    case "out of stock":
      return "error";
    default:
      return "primary";
  }
}
