import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useProductTypes } from "@/hooks/useProductTypes";
import {
  useFarmerBusinessOverview,
  useMarketplaceOverview,
  useMarketActivityData,
  useMarketTrendLive,
  useMarketplaceHealth,
} from "@/features/farmer/hooks/useFarmer";
import { useMarketSocket } from "@/features/farmer/hooks/useMarketSocket";

import { ProductSelector } from "@/features/farmer/components/dashboard/ProductSelector";
import { BusinessPerformance } from "@/features/farmer/components/dashboard/BusinessPerformance";
import { LiveMarketPrice } from "@/features/farmer/components/dashboard/LiveMarketPrice";
import { MarketOverviewSection } from "@/features/farmer/components/dashboard/MarketOverviewSection";
import { MarketActivitySection } from "@/features/farmer/components/dashboard/MarketActivitySection";
import { MarketplaceHealthSection } from "@/features/farmer/components/dashboard/MarketplaceHealthSection";
import { DashboardSkeleton } from "@/features/farmer/components/dashboard/DashboardSkeleton";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

export default function FarmerDashboardPage() {
  // ── Product selection state ──
  const { data: productTypes, isLoading: typesLoading } = useProductTypes();
  const [selectedProductTypeId, setSelectedProductTypeId] = useState<string>("");

  // Resolve default product type
  const productTypeId = selectedProductTypeId || productTypes?.[0]?.id || "";

  // ── Data hooks ──
  // Business overview is NOT product-specific — fetched once
  const businessOverview = useFarmerBusinessOverview();

  // Product-specific queries — refetch when productTypeId changes
  const marketOverview = useMarketplaceOverview(productTypeId);
  const marketActivity = useMarketActivityData(productTypeId);
  const marketTrend = useMarketTrendLive(productTypeId);
  const marketHealth = useMarketplaceHealth(productTypeId);

  // Memoize initial points to avoid re-creating the array on every render
  const initialPoints = useMemo(
    () => marketTrend.data?.points ?? [],
    [marketTrend.data]
  );

  // ── WebSocket ──
  const { currentPrice, lastUpdated, priceHistory, isConnected } =
    useMarketSocket({
      productTypeId,
      initialPoints,
    });

  // ── Handlers ──
  const handleProductChange = (newId: string) => {
    setSelectedProductTypeId(newId);
  };

  // Show full skeleton while product types are loading
  if (typesLoading) {
    return (
      <DashboardLayout role="farmer">
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="farmer">
      <div className="space-y-8">
        {/* ── Header + Product Selector ── */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Your business performance and live market intelligence
            </p>
          </div>
          <ProductSelector
            value={productTypeId}
            onChange={handleProductChange}
          />
        </motion.div>

        {/* ── Section 1: Business Performance ── */}
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <BusinessPerformance
            data={businessOverview.data}
            isLoading={businessOverview.isLoading}
            isError={businessOverview.isError}
            onRetry={() => businessOverview.refetch()}
          />
        </motion.div>

        {/* ── Section 2: Live Market Price (Hero) ── */}
        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <LiveMarketPrice
            currentPrice={currentPrice}
            lastUpdated={lastUpdated}
            priceHistory={priceHistory}
            isConnected={isConnected}
            isLoading={marketTrend.isLoading}
          />
        </motion.div>

        {/* ── Sections 3 + 4: Market Overview + Activity (side by side) ── */}
        <motion.div
          custom={2}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <MarketOverviewSection
            data={marketOverview.data}
            isLoading={marketOverview.isLoading}
            isError={marketOverview.isError}
            onRetry={() => marketOverview.refetch()}
          />
          <MarketActivitySection
            data={marketActivity.data}
            isLoading={marketActivity.isLoading}
            isError={marketActivity.isError}
            onRetry={() => marketActivity.refetch()}
          />
        </motion.div>

        {/* ── Section 5: Marketplace Health ── */}
        <motion.div
          custom={3}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <MarketplaceHealthSection
            data={marketHealth.data}
            isLoading={marketHealth.isLoading}
            isError={marketHealth.isError}
            onRetry={() => marketHealth.refetch()}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
