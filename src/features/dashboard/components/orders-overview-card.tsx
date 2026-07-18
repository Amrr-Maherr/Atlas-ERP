"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardSale } from "../types/dashboard.types";
import { formatCurrency } from "../utils/dashboard.utils";
import { formatDate } from "@/components/utils/format-date";
import { ORDER_STATUS_COLORS } from "../constants/dashboard.constants";

type OrdersOverviewCardProps = {
  sales: DashboardSale[];
};

const STATUS_STYLES: Record<string, string> = {
  Completed: "bg-emerald-100 text-emerald-800",
  Processing: "bg-blue-100 text-blue-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
  Refunded: "bg-gray-100 text-gray-800",
};

export function OrdersOverviewCard({ sales }: OrdersOverviewCardProps) {
  const statusData = useMemo(() => {
    const countMap = new Map<string, number>();
    for (const s of sales) {
      const status = s.orderStatus || "Unknown";
      countMap.set(status, (countMap.get(status) ?? 0) + 1);
    }
    return Array.from(countMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [sales]);

  const latestOrders = useMemo(
    () =>
      [...sales]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10),
    [sales],
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <Tabs defaultValue="latest-orders">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="latest-orders">Latest Orders</TabsTrigger>
              <TabsTrigger value="orders-status">Orders by Status</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="latest-orders" className="mt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestOrders.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                        {sale.invoiceNumber}
                      </code>
                    </TableCell>
                    <TableCell className="text-sm">{sale.customerName}</TableCell>
                    <TableCell className="text-sm font-medium tabular-nums">
                      {formatCurrency(sale.total)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={STATUS_STYLES[sale.orderStatus] ?? "bg-gray-100 text-gray-800"}
                      >
                        {sale.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(sale.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="orders-status" className="mt-3">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={ORDER_STATUS_COLORS[entry.name] ?? "#6b7280"}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}
