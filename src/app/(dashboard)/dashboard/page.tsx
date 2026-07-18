"use client";

import { useMemo } from "react";
import {
  useDashboardCategories,
  useDashboardCustomers,
  useDashboardSuppliers,
  useDashboardEmployees,
  useDashboardProducts,
  useDashboardSales,
  useDashboardPurchaseOrders,
} from "@/features/dashboard/hooks/dashboard.hooks";
import { DashboardLoading, DashboardError } from "@/features/dashboard/components/dashboard-loading";
import { SectionCards } from "@/features/dashboard/components/section-cards";
import { MonthlyRevenueChart } from "@/features/dashboard/components/monthly-revenue-chart";
import { OrdersOverviewCard } from "@/features/dashboard/components/orders-overview-card";
import { InventoryCustomersCard } from "@/features/dashboard/components/inventory-customers-card";
import { formatCurrency } from "@/features/dashboard/utils/dashboard.utils";
import type { DashboardSale, DashboardProduct } from "@/features/dashboard/types/dashboard.types";

export default function AdminDashboardPage() {
  const { data: categories, isLoading: catLoading, error: catError } = useDashboardCategories();
  const { data: customers, isLoading: custLoading, error: custError } = useDashboardCustomers();
  const { data: suppliers, isLoading: supLoading, error: supError } = useDashboardSuppliers();
  const { data: employees, isLoading: empLoading, error: empError } = useDashboardEmployees();
  const { data: products, isLoading: prodLoading, error: prodError } = useDashboardProducts();
  const { data: sales, isLoading: salesLoading, error: salesError } = useDashboardSales();
  const { data: purchaseOrders, isLoading: poLoading, error: poError } = useDashboardPurchaseOrders();

  const isLoading = catLoading || custLoading || supLoading || empLoading || prodLoading || salesLoading || poLoading;
  const error = catError || custError || supError || empError || prodError || salesError || poError;

  const typedSales = useMemo(() => (sales ?? []) as DashboardSale[], [sales]);
  const typedProducts = useMemo(() => (products ?? []) as DashboardProduct[], [products]);

  const totalProducts = products?.length ?? 0;
  const totalCustomers = customers?.length ?? 0;
  const totalOrders = sales?.length ?? 0;

  const totalRevenue = useMemo(
    () =>
      typedSales
        .filter((s) => s.orderStatus !== "Cancelled" && s.orderStatus !== "Refunded")
        .reduce((sum, s) => sum + s.total, 0),
    [typedSales],
  );

  if (isLoading) return <DashboardLoading />;
  if (error) return <DashboardError error={error} />;

  const typedCategories = categories ?? [];
  const typedSuppliers = suppliers ?? [];
  const typedCustomers = customers ?? [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Business overview and key performance indicators
        </p>
      </div>

      <SectionCards
        totalRevenue={formatCurrency(totalRevenue)}
        totalCustomers={totalCustomers}
        totalOrders={totalOrders}
        totalProducts={totalProducts}
      />

      <div className="grid gap-6">
        <MonthlyRevenueChart sales={typedSales} />
      </div>

      <div className="grid gap-6">
        <OrdersOverviewCard sales={typedSales} />
      </div>

      <div className="grid gap-6">
        <InventoryCustomersCard
          products={typedProducts}
          categories={typedCategories}
          suppliers={typedSuppliers}
          customers={typedCustomers}
        />
      </div>
    </div>
  );
}
