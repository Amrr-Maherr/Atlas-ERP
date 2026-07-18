"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSale } from "../types/dashboard.types";
import { getMonthKey, getMonthLabel, formatCurrency } from "../utils/dashboard.utils";

type MonthlyRevenueChartProps = {
  sales: DashboardSale[];
};

export function MonthlyRevenueChart({ sales }: MonthlyRevenueChartProps) {
  const data = useMemo(() => {
    const revenueMap = new Map<string, number>();
    for (const s of sales) {
      if (s.orderStatus === "Cancelled" || s.orderStatus === "Refunded") continue;
      const key = getMonthKey(s.createdAt);
      revenueMap.set(key, (revenueMap.get(key) ?? 0) + s.total);
    }
    return Array.from(revenueMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, revenue]) => ({
        month: getMonthLabel(key),
        revenue: Math.round(revenue),
      }));
  }, [sales]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
