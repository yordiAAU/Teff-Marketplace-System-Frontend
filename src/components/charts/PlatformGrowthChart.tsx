import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import type { PlatformGrowthPoint } from "@/types/api.types";

interface PlatformGrowthChartProps {
  data?: PlatformGrowthPoint[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export function PlatformGrowthChart({ data = [], isLoading, isError, onRetry }: PlatformGrowthChartProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users size={18} className="text-primary" />
          <CardTitle>Platform Users & Orders</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ChartSkeleton />
        ) : isError ? (
          <PageState type="error" onRetry={onRetry} />
        ) : data.length === 0 ? (
          <PageState type="empty" title="No growth data" />
        ) : (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#EBBE7C" strokeWidth={3} name="Users" dot={false} />
                <Line type="monotone" dataKey="orders" stroke="#8B4E24" strokeWidth={3} name="Orders" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
