"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardProduct, DashboardCategory, DashboardSupplier, DashboardCustomer } from "../types/dashboard.types";
import { formatCurrency } from "../utils/dashboard.utils";
import { formatDate } from "@/components/utils/format-date";

type InventoryCustomersCardProps = {
  products: DashboardProduct[];
  categories: DashboardCategory[];
  suppliers: DashboardSupplier[];
  customers: DashboardCustomer[];
};

const VIP_STYLES: Record<string, string> = {
  Gold: "bg-yellow-100 text-yellow-800",
  Silver: "bg-gray-100 text-gray-800",
  Bronze: "bg-orange-100 text-orange-800",
};

export function InventoryCustomersCard({
  products,
  categories,
  suppliers,
  customers,
}: InventoryCustomersCardProps) {
  const lowStockData = useMemo(() => {
    const catMap = new Map(categories.map((c) => [c.id, c.name]));
    const supMap = new Map(suppliers.map((s) => [s.id, s.name]));
    return products
      .filter((p) => p.stock <= p.minStock)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 8)
      .map((p) => ({
        ...p,
        categoryName: catMap.get(p.categoryId) ?? "—",
        supplierName: supMap.get(p.supplierId) ?? "—",
        stockPercent: p.minStock > 0 ? Math.min(100, Math.round((p.stock / p.minStock) * 100)) : 0,
      }));
  }, [products, categories, suppliers]);

  const topCustomers = useMemo(
    () =>
      [...customers]
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 10),
    [customers],
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <Tabs defaultValue="low-stock">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
              <TabsTrigger value="top-customers">Top Customers</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="low-stock" className="mt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Supplier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockData.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{p.name}</span>
                        <span className="text-xs text-muted-foreground">{p.sku}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              p.stock === 0
                                ? "text-sm font-medium text-red-600 tabular-nums"
                                : "text-sm font-medium text-yellow-600 tabular-nums"
                            }
                          >
                            {p.stock}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            / {p.minStock}
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              p.stock === 0
                                ? "bg-red-500"
                                : p.stock <= p.minStock * 0.5
                                  ? "bg-red-400"
                                  : "bg-yellow-400"
                            }`}
                            style={{ width: `${Math.max(p.stockPercent, 3)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{p.categoryName}</TableCell>
                    <TableCell className="text-sm">{p.supplierName}</TableCell>
                  </TableRow>
                ))}
                {lowStockData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-8">
                      All products are well-stocked
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="top-customers" className="mt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>VIP</TableHead>
                  <TableHead>Last Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{c.name}</span>
                        <span className="text-xs text-muted-foreground">{c.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{c.city}</TableCell>
                    <TableCell className="text-sm tabular-nums">{c.totalOrders}</TableCell>
                    <TableCell className="text-sm font-medium tabular-nums">
                      {formatCurrency(c.totalSpent)}
                    </TableCell>
                    <TableCell>
                      <Badge className={VIP_STYLES[c.vipStatus] ?? "bg-gray-100 text-gray-800"}>
                        {c.vipStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {c.lastOrderDate ? formatDate(c.lastOrderDate) : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}
