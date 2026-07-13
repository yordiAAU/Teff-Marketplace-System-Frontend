import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Package,
  ShoppingCart,
  Clock,
  BarChart3,
  Layers,
} from "lucide-react";
import { formatEtb } from "@/lib/utils";
import type { FarmerBusinessOverview } from "@/types/api.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";

interface BusinessPerformanceProps {
  data?: FarmerBusinessOverview;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function KPIWidget({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}) {
  return (
    <motion.div variants={itemVariants} className="group relative">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bgColor} transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon size={20} className={color} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-0.5 text-lg font-bold text-slate-900">{value}</p>
          </div>
        </div>
        {/* Subtle accent bar */}
        <div className={`mt-4 h-1 w-full rounded-full bg-slate-100 overflow-hidden`}>
          <motion.div
            className={`h-full rounded-full ${bgColor}`}
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function RevenueHighlight({
  todayRevenue,
  monthRevenue,
}: {
  todayRevenue: number;
  monthRevenue: number;
}) {
  return (
    <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
      <div className="relative overflow-hidden rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/5 via-primary/5 to-transparent p-6 shadow-sm">
        <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10">
              <TrendingUp size={18} className="text-secondary" />
            </div>
            <h3 className="text-sm font-semibold text-slate-600">Revenue</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Today</p>
              <motion.p
                className="mt-1 text-2xl font-bold text-slate-900"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {formatEtb(todayRevenue)}
              </motion.p>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">This Month</p>
              <motion.p
                className="mt-1 text-2xl font-bold text-secondary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                {formatEtb(monthRevenue)}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BusinessPerformance({
  data,
  isLoading,
  isError,
  onRetry,
}: BusinessPerformanceProps) {
  if (isLoading) return <CardSkeleton count={4} />;
  if (isError) return <PageState type="error" onRetry={onRetry} />;
  if (!data)
    return (
      <PageState
        type="empty"
        title="No business data"
        message="Your business performance metrics will appear here once you start selling."
      />
    );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-primary" />
          <CardTitle>How is my business performing?</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <RevenueHighlight
            todayRevenue={data.revenueToday}
            monthRevenue={data.revenueMonth}
          />

          <KPIWidget
            icon={ShoppingCart}
            label="Completed Orders"
            value={data.completedOrders.toString()}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <KPIWidget
            icon={Clock}
            label="Pending Orders"
            value={data.pendingOrders.toString()}
            color="text-amber-600"
            bgColor="bg-amber-100"
          />
          <KPIWidget
            icon={Layers}
            label="Active Listings"
            value={data.activeListings.toString()}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <KPIWidget
            icon={Package}
            label="Quantity Sold"
            value={`${data.quantitySold} units`}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
          <KPIWidget
            icon={DollarSign}
            label="Avg. Selling Price"
            value={formatEtb(data.averageSellingPrice)}
            color="text-secondary"
            bgColor="bg-primary/20"
          />
        </motion.div>
      </CardContent>
    </Card>
  );
}
