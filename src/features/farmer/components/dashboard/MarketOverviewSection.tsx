import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  ShoppingBag,
  Layers,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { formatEtb } from "@/lib/utils";
import type { MarketplaceOverview as MarketplaceOverviewType, MarketDirection } from "@/types/api.types";

interface MarketOverviewProps {
  data?: MarketplaceOverviewType;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const directionConfig: Record<
  MarketDirection,
  { icon: typeof TrendingUp; label: string; color: string; bg: string }
> = {
  UP: {
    icon: TrendingUp,
    label: "Prices Rising",
    color: "text-green-700",
    bg: "bg-green-100",
  },
  DOWN: {
    icon: TrendingDown,
    label: "Prices Falling",
    color: "text-red-700",
    bg: "bg-red-100",
  },
  STABLE: {
    icon: Minus,
    label: "Stable",
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function MarketOverviewSection({
  data,
  isLoading,
  isError,
  onRetry,
}: MarketOverviewProps) {
  if (isLoading) return <ChartSkeleton />;
  if (isError) return <PageState type="error" onRetry={onRetry} />;
  if (!data)
    return (
      <PageState
        type="empty"
        title="No market data"
        message="Select a product to see market overview."
      />
    );

  const dir = directionConfig[data.marketDirection] ?? directionConfig.STABLE;
  const DirIcon = dir.icon;

  const priceData = [
    { name: "Lowest", value: data.lowestPrice, fill: "#ef4444" },
    { name: "Average", value: data.averagePrice, fill: "#8B4E24" },
    { name: "Highest", value: data.highestPrice, fill: "#22c55e" },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-primary" />
            <CardTitle className="text-base">Market Overview</CardTitle>
          </div>
          <div
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${dir.bg} ${dir.color}`}
          >
            <DirIcon size={14} />
            {dir.label}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Price comparison chart */}
          <motion.div variants={itemVariants}>
            <p className="mb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
              Price Comparison
            </p>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceData} barSize={40}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    width={45}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: number) => [formatEtb(value), "Price"]}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {priceData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Market metrics */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-3"
          >
            <MetricMini
              icon={ShoppingBag}
              label="Orders Today"
              value={data.ordersToday.toString()}
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <MetricMini
              icon={Layers}
              label="Active Listings"
              value={data.activeListings.toString()}
              color="text-purple-600"
              bg="bg-purple-50"
            />
            <MetricMini
              icon={Users}
              label="Sellers"
              value={data.farmersSelling.toString()}
              color="text-amber-600"
              bg="bg-amber-50"
            />
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

function MetricMini({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className={`rounded-xl ${bg} p-3 text-center`}>
      <Icon size={16} className={`mx-auto mb-1 ${color}`} />
      <p className="text-lg font-bold text-slate-900">{value}</p>
      <p className="text-[10px] font-medium text-slate-500 leading-tight">{label}</p>
    </div>
  );
}
