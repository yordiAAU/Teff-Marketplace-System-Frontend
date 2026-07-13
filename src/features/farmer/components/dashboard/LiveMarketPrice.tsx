import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Activity, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { formatEtb } from "@/lib/utils";
import type { MarketTrendPoint_Live } from "@/types/api.types";

interface LiveMarketPriceProps {
  currentPrice: number | null;
  lastUpdated: Date | null;
  priceHistory: MarketTrendPoint_Live[];
  isConnected: boolean;
  isLoading: boolean;
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getTimeAgo(date: Date | null): string {
  if (!date) return "—";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

function LiveIndicator({ isConnected }: { isConnected: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium">
      <span className="relative flex h-2 w-2">
        {isConnected && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-slate-400"
          }`}
        />
      </span>
      {isConnected ? "Live" : "Disconnected"}
    </span>
  );
}

function TimeAgoDisplay({ lastUpdated }: { lastUpdated: Date | null }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
      <Clock size={12} />
      {getTimeAgo(lastUpdated)}
    </span>
  );
}

export function LiveMarketPrice({
  currentPrice,
  lastUpdated,
  priceHistory,
  isConnected,
  isLoading,
}: LiveMarketPriceProps) {
  const chartData = useMemo(
    () =>
      priceHistory.map((p) => ({
        time: formatTime(p.timestamp),
        price: p.averagePrice,
      })),
    [priceHistory]
  );

  if (isLoading) return <ChartSkeleton />;

  return (
    <Card className="relative overflow-hidden">
      {/* Subtle gradient background for the hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.03] via-transparent to-primary/[0.03] pointer-events-none" />

      <CardHeader className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white shadow-lg shadow-secondary/25">
              <Activity size={20} />
            </div>
            <div>
              <CardTitle className="text-base">Live Market Price</CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">
                Real-time average market price
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TimeAgoDisplay lastUpdated={lastUpdated} />
            <LiveIndicator isConnected={isConnected} />
          </div>
        </div>

        {/* Big current price */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPrice ?? "empty"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-baseline gap-3"
            >
              <span className="text-4xl font-bold text-slate-900 tabular-nums sm:text-5xl">
                {currentPrice !== null ? formatEtb(currentPrice) : "—"}
              </span>
              {currentPrice !== null && (
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                  <TrendingUp size={12} />
                  Current
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardHeader>

      <CardContent className="relative">
        {chartData.length === 0 ? (
          <PageState
            type="empty"
            title="Waiting for market data"
            message="Live price updates will appear here as the market becomes active."
          />
        ) : (
          <div className="h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B4E24" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8B4E24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickFormatter={(v) => `${v}`}
                  domain={["auto", "auto"]}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow:
                      "0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    padding: "12px 16px",
                  }}
                  formatter={(value: number) => [formatEtb(value), "Price"]}
                  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#8B4E24"
                  strokeWidth={2.5}
                  fill="url(#priceGradient)"
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "#8B4E24",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  isAnimationActive={true}
                  animationDuration={500}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
