import { Skeleton } from "@/components/ui/skeleton";

/**
 * Full-page loading skeleton matching the dashboard layout.
 * Renders placeholder blocks for each dashboard section.
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="h-8 w-56" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>

      {/* Section 1: Business Performance */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <Skeleton className="mb-6 h-5 w-64" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Revenue highlight (spans 2 cols) */}
          <div className="rounded-xl border border-slate-100 p-5 md:col-span-2">
            <Skeleton className="mb-3 h-4 w-24" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Skeleton className="mb-1 h-3 w-16" />
                <Skeleton className="h-7 w-28" />
              </div>
              <div>
                <Skeleton className="mb-1 h-3 w-20" />
                <Skeleton className="h-7 w-28" />
              </div>
            </div>
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-100 p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <div>
                  <Skeleton className="mb-1 h-3 w-20" />
                  <Skeleton className="h-5 w-14" />
                </div>
              </div>
              <Skeleton className="mt-4 h-1 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Live Market Price (Hero) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div>
              <Skeleton className="h-5 w-36" />
              <Skeleton className="mt-1 h-3 w-48" />
            </div>
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="mb-6 h-12 w-48" />
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>

      {/* Sections 3+4: Market Overview + Activity side by side */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Skeleton className="mb-6 h-5 w-36" />
          <Skeleton className="mb-4 h-44 w-full rounded-xl" />
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Skeleton className="mb-6 h-5 w-32" />
          <div className="grid grid-cols-3 gap-3 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
          <Skeleton className="mb-4 h-32 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>
      </div>

      {/* Section 5: Marketplace Health */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <Skeleton className="mb-6 h-5 w-40" />
        <Skeleton className="mb-6 h-28 w-full rounded-2xl" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
