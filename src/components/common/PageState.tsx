import { AlertCircle, Inbox, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageStateProps {
  type: "loading" | "error" | "empty";
  title?: string;
  message?: string;
  onRetry?: () => void;
  children?: React.ReactNode;
}

export function PageState({ type, title, message, onRetry, children }: PageStateProps) {
  if (type === "loading") {
    return <>{children}</>;
  }

  if (type === "error") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <AlertCircle size={28} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title ?? "Failed to load data"}</h3>
          <p className="mt-1 text-sm text-slate-500">{message ?? "Please try again."}</p>
        </div>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            <RefreshCw size={16} />
            Retry
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Inbox size={28} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title ?? "No data found"}</h3>
        <p className="mt-1 text-sm text-slate-500">{message ?? "Nothing to display yet."}</p>
      </div>
    </div>
  );
}
