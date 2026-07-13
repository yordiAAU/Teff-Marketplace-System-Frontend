import { motion } from "framer-motion";
import {
  HeartPulse,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Package,
  ShoppingBag,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import type {
  MarketplaceHealth as MarketplaceHealthType,
  HealthLevel,
  PriceTrendDirection,
} from "@/types/api.types";

interface MarketplaceHealthProps {
  data?: MarketplaceHealthType;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const healthLevelConfig: Record<
  HealthLevel,
  { label: string; color: string; bg: string; percent: number; ring: string }
> = {
  LOW: {
    label: "Low",
    color: "text-red-600",
    bg: "bg-red-100",
    percent: 25,
    ring: "stroke-red-500",
  },
  MEDIUM: {
    label: "Medium",
    color: "text-amber-600",
    bg: "bg-amber-100",
    percent: 55,
    ring: "stroke-amber-500",
  },
  HIGH: {
    label: "High",
    color: "text-green-600",
    bg: "bg-green-100",
    percent: 90,
    ring: "stroke-green-500",
  },
};

const trendConfig: Record<
  PriceTrendDirection,
  { icon: typeof TrendingUp; label: string; color: string; bg: string }
> = {
  RISING: {
    icon: TrendingUp,
    label: "Rising",
    color: "text-green-700",
    bg: "bg-green-100",
  },
  FALLING: {
    icon: TrendingDown,
    label: "Falling",
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
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function RadialGauge({
  percent,
  ringClass,
  size = 56,
}: {
  percent: number;
  ringClass: string;
  size?: number;
}) {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        className={ringClass}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />
    </svg>
  );
}

function HealthGaugeCard({
  icon: Icon,
  label,
  level,
}: {
  icon: typeof Package;
  label: string;
  level: HealthLevel;
}) {
  const config = healthLevelConfig[level] ?? healthLevelConfig.LOW;

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
    >
      <div className="relative">
        <RadialGauge percent={config.percent} ringClass={config.ring} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={18} className="text-slate-500" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <span
          className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${config.bg} ${config.color}`}
        >
          {config.label}
        </span>
      </div>
    </motion.div>
  );
}

export function MarketplaceHealthSection({
  data,
  isLoading,
  isError,
  onRetry,
}: MarketplaceHealthProps) {
  if (isLoading) return <ChartSkeleton />;
  if (isError) return <PageState type="error" onRetry={onRetry} />;
  if (!data)
    return (
      <PageState
        type="empty"
        title="No health data"
        message="Select a product to see marketplace health."
      />
    );

  const trend = trendConfig[data.priceTrend] ?? trendConfig.STABLE;
  const TrendIcon = trend.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <HeartPulse size={18} className="text-primary" />
          <CardTitle>Marketplace Health</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Status headline */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white"
          >
            <div className="absolute right-4 top-4 opacity-10">
              <HeartPulse size={64} />
            </div>
            <div className="relative">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                Market Status
              </p>
              <h3 className="text-xl font-bold">{data.status}</h3>
              <div className="mt-3 flex items-center gap-2">
                <div
                  className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${trend.bg} ${trend.color}`}
                >
                  <TrendIcon size={12} />
                  Price {trend.label}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gauges grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            <HealthGaugeCard
              icon={Package}
              label="Supply"
              level={data.supply}
            />
            <HealthGaugeCard
              icon={ShoppingBag}
              label="Demand"
              level={data.demand}
            />
            <HealthGaugeCard
              icon={Activity}
              label="Market Activity"
              level={data.marketActivity}
            />
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <TrendIcon size={22} className={trend.color} />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-slate-500">Price Trend</p>
                <span
                  className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${trend.bg} ${trend.color}`}
                >
                  {trend.label}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Insight message */}
          <motion.div
            variants={itemVariants}
            className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50/50 p-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
              <Info size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Market Insight
              </p>
              <p className="mt-0.5 text-sm text-slate-600 leading-relaxed">
                {data.message}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
