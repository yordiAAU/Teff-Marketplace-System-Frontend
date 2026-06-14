import React, { useMemo, useState } from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowDownRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import {
  PRODUCT_CATALOG,
  PRICE_TREND_DATA,
  getPriceRange,
} from '../../data/mockData';
import type { TimeRange } from '../../data/mockData';

const TIME_RANGES: { key: TimeRange; label: string }[] = [
  { key: 'day', label: 'Today' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
];

interface PriceTrendChartProps {
  title?: string;
  showProductFilter?: boolean;
}

export default function PriceTrendChart({
  title = 'Market Price Trend',
  showProductFilter = true,
}: PriceTrendChartProps) {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCT_CATALOG[0].id);
  const [timeRange, setTimeRange] = useState<TimeRange>('day');

  const chartData = useMemo(
    () => PRICE_TREND_DATA[selectedProduct]?.[timeRange] ?? [],
    [selectedProduct, timeRange]
  );

  const { low, high, current, change } = useMemo(() => getPriceRange(chartData), [chartData]);
  const isPositive = change >= 0;
  const productName = PRODUCT_CATALOG.find((p) => p.id === selectedProduct)?.name ?? '';

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={18} className="text-primary" />
            <h3 className="font-bold text-slate-900">{title}</h3>
          </div>
          {showProductFilter && (
            <p className="text-sm text-slate-500">{productName} — marketplace price movement</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {TIME_RANGES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTimeRange(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === key
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {showProductFilter && (
        <div className="mb-6">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(Number(e.target.value))}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
          >
            {PRODUCT_CATALOG.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">Current Price</p>
          <p className="text-xl font-bold text-slate-900">${current}<span className="text-sm font-normal text-slate-400">/bag</span></p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
          <p className="text-xs font-medium text-green-600 mb-1">Day High</p>
          <p className="text-xl font-bold text-green-700">${high}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
          <p className="text-xs font-medium text-red-600 mb-1">Day Low</p>
          <p className="text-xl font-bold text-red-700">${low}</p>
        </div>
        <div className={`p-4 rounded-xl border ${isPositive ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
          <p className={`text-xs font-medium mb-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>Range</p>
          <p className={`text-lg font-bold ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
            ${low} – ${high}
          </p>
          <span className={`inline-flex items-center gap-0.5 text-xs font-bold mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="priceRangeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EBBE7C" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#EBBE7C" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              domain={['dataMin - 20', 'dataMax + 20']}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number, name: string) => {
                const labels: Record<string, string> = {
                  high: 'High',
                  low: 'Low',
                  price: 'Price',
                };
                return [`$${value}`, labels[name] ?? name];
              }}
            />
            <Area
              type="monotone"
              dataKey="high"
              stroke="none"
              fill="url(#priceRangeGradient)"
              connectNulls
            />
            <Area type="monotone" dataKey="low" stroke="none" fill="#fff" connectNulls />
            <Line
              type="monotone"
              dataKey="high"
              stroke="#EBBE7C"
              strokeWidth={1}
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="low"
              stroke="#EBBE7C"
              strokeWidth={1}
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8B4E24"
              strokeWidth={3}
              dot={{ r: 4, fill: '#8B4E24', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-500">
        <span className="flex items-center gap-2">
          <span className="w-6 h-0.5 bg-secondary rounded" /> Price
        </span>
        <span className="flex items-center gap-2">
          <span className="w-6 h-0.5 bg-primary border-dashed border-t border-primary" /> High/Low Range
        </span>
      </div>
    </div>
  );
}
