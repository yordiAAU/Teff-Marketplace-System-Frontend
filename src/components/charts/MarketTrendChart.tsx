import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { formatCurrency } from "@/lib/utils";
import { useProductTypes } from "@/hooks/useProductTypes";
import type { MarketPeriod, MarketStats, MarketTrendPoint } from "@/types/api.types";

const PERIODS: { key: MarketPeriod; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
];

interface MarketTrendChartProps {
  title?: string;
  trendData?: MarketTrendPoint[];
  stats?: MarketStats;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  productTypeId: string;
  period: MarketPeriod;
  onProductTypeChange: (id: string) => void;
  onPeriodChange: (period: MarketPeriod) => void;
}

export function MarketTrendChart({
  title = "Market Price Trend",
  trendData = [],
  stats,
  isLoading,
  isError,
  onRetry,
  productTypeId,
  period,
  onProductTypeChange,
  onPeriodChange,
}: MarketTrendChartProps) {
  const { data: productTypes, isLoading: typesLoading } = useProductTypes();

  const chartData = trendData.map((point) => ({
    label: new Date(point.date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: period === "today" ? "2-digit" : undefined,
    }),
    price: Number(point.price),
  }));

  if (typesLoading) return <ChartSkeleton />;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            {PERIODS.map(({ key, label }) => (
              <Button
                key={key}
                type="button"
                size="sm"
                variant={period === key ? "secondary" : "outline"}
                onClick={() => onPeriodChange(key)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-4 max-w-xs">
          <Select value={productTypeId} onValueChange={onProductTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select product type" />
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
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ChartSkeleton />
        ) : isError ? (
          <PageState type="error" onRetry={onRetry} />
        ) : !productTypeId ? (
          <PageState type="empty" title="Select a product" message="Choose a product type to view market trends." />
        ) : chartData.length === 0 ? (
          <PageState type="empty" title="No trend data" message="No price data available for this period." />
        ) : (
          <>
            {stats && (
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatCard label="Average Price" value={formatCurrency(stats.averagePrice)} />
                <StatCard label="Daily High" value={formatCurrency(stats.dailyHigh)} variant="high" />
                <StatCard label="Daily Low" value={formatCurrency(stats.dailyLow)} variant="low" />
                <StatCard label="Range" value={`${formatCurrency(stats.dailyLow)} – ${formatCurrency(stats.dailyHigh)}`} variant="range" />
              </div>
            )}
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                    formatter={(value: number) => [formatCurrency(value), "Price"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8B4E24"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#8B4E24", strokeWidth: 2, stroke: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function StatCard({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "high" | "low" | "range";
}) {
  const colors = {
    default: "bg-slate-50 border-slate-100",
    high: "bg-green-50 border-green-100 text-green-700",
    low: "bg-red-50 border-red-100 text-red-700",
    range: "bg-primary/5 border-primary/20 text-secondary",
  };
  return (
        <div className={`p-4 rounded-xl border ${colors[variant]}`}>
          <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
          <p className="text-lg font-bold">{value}</p>
        </div>
  );
}

export function useMarketTrendFilters(defaultPeriod: MarketPeriod = "today") {
  const { data: productTypes } = useProductTypes();
  const [productTypeId, setProductTypeId] = useState("");
  const [period, setPeriod] = useState<MarketPeriod>(defaultPeriod);

  const selectedId = productTypeId || productTypes?.[0]?.id || "";

  return {
    productTypeId: selectedId,
    period,
    setProductTypeId,
    setPeriod,
    productTypes,
  };
}
