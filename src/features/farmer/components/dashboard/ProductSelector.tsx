import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductTypes } from "@/hooks/useProductTypes";
import { Skeleton } from "@/components/ui/skeleton";
import { Wheat } from "lucide-react";

interface ProductSelectorProps {
  value: string;
  onChange: (productTypeId: string) => void;
}

export function ProductSelector({ value, onChange }: ProductSelectorProps) {
  const { data: productTypes, isLoading } = useProductTypes();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-48" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10">
        <Wheat size={18} className="text-secondary" />
      </div>
      <div className="min-w-[200px]">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="border-slate-200 bg-white font-medium shadow-sm">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            {productTypes?.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
