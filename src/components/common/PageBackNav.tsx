import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PageBackNavProps {
  label?: string;
  to?: string;
}

export function PageBackNav({ label = "Back", to }: PageBackNavProps) {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      variant="ghost"
      className="-ml-2 mb-2 gap-2 px-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      onClick={() => (to ? navigate(to) : navigate(-1))}
    >
      <ArrowLeft size={20} className="shrink-0" />
      <span className="font-semibold">{label}</span>
    </Button>
  );
}
