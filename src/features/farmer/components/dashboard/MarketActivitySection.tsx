import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ShoppingCart,
  Package,
  BarChart3,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import type { MarketActivityData } from "@/types/api.types";

interface MarketActivityProps {
  data?: MarketActivityData;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const DONUT_COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function MarketActivitySection({
  data,
  isLoading,
  isError,
  onRetry,
}: MarketActivityProps) {
  if (isLoading) return <ChartSkeleton />;
  if (isError) return <PageState type="error" onRetry={onRetry} />;
  if (!data)
    return (
      <PageState
        type="empty"
        title="No activity data"
        message="Select a product to see market activity."
      />
    );

  const donutData = useMemo(
    () => [
      { name: "Completed", value: data.completedOrders },
      { name: "Pending", value: data.pendingOrders },
      { name: "Cancelled", value: data.cancelledOrders },
    ],
    [data.completedOrders, data.pendingOrders, data.cancelledOrders]
  );

  const hasDonutData = donutData.some((d) => d.value > 0);
  const hasHourlyData =
    data.hourlyActivity && data.hourlyActivity.length > 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-primary" />
          <CardTitle className="text-base">Market Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Summary row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-3"
          >
            <ActivityMetric
              icon={ShoppingCart}
              label="Orders Today"
              value={data.ordersToday}
            />
            <ActivityMetric
              icon={Package}
              label="Products Sold"
              value={data.productsSold}
            />
            <ActivityMetric
              icon={Clock}
              label="Avg Order Size"
              value={data.averageOrderSize}
            />
          </motion.div>

          {/* Orders breakdown donut */}
          <motion.div variants={itemVariants}>
            <p className="mb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
              Orders Breakdown
            </p>
            {hasDonutData ? (
              <div className="flex items-center gap-6">
                <div className="h-32 w-32 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={55}
                        dataKey="value"
                        strokeWidth={2}
                        stroke="#fff"
                      >
                        {donutData.map((_entry, index) => (
                          <Cell
                            key={index}
                            fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "10px",
                          border: "none",
                          boxShadow: "0 4px 12px rgb(0 0 0 / 0.1)",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 text-sm">
                  {donutData.map((item, idx) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: DONUT_COLORS[idx] }}
                      />
                      <span className="text-slate-600">{item.name}</span>
                      <span className="ml-auto font-semibold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 py-8">
                <ShoppingCart
                  size={28}
                  className="mb-2 text-slate-300"
                />
                <p className="text-sm font-medium text-slate-400">
                  No orders today
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Order data will show once customers start buying
                </p>
              </div>
            )}
          </motion.div>

          {/* Hourly activity chart */}
          <motion.div variants={itemVariants}>
            <p className="mb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
              Hourly Activity
            </p>
            {hasHourlyData ? (
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.hourlyActivity} barSize={16}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="hour"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "10px",
                        border: "none",
                        boxShadow: "0 4px 12px rgb(0 0 0 / 0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Bar
                      dataKey="orders"
                      fill="#EBBE7C"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 py-6">
                <BarChart3 size={24} className="mb-2 text-slate-300" />
                <p className="text-sm font-medium text-slate-400">
                  No hourly data yet
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Activity data will populate throughout the day
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

function ActivityMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShoppingCart;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-center">
      <Icon size={16} className="mx-auto mb-1 text-slate-400" />
      <p className="text-lg font-bold text-slate-900">{value}</p>
      <p className="text-[10px] font-medium text-slate-500 leading-tight">
        {label}
      </p>
    </div>
  );
}
