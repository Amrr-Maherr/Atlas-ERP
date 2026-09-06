"use client";

import * as React from "react";

import { NavMain } from "@/components/layout/navigation/nav-main";
import { NavSecondary } from "@/components/layout/navigation/nav-secondary";
import { NavUser } from "@/components/layout/navigation/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  UsersIcon,
  TruckIcon,
  PackageIcon,
  ReceiptIcon,
  ShoppingCartIcon,
  BoxesIcon,
  CommandIcon,
  CircleUserRoundIcon,
} from "lucide-react";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: <UsersIcon />,
    },
    {
      title: "Suppliers",
      url: "/dashboard/suppliers",
      icon: <TruckIcon />,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: <PackageIcon />,
    },
    {
      title: "Sales",
      url: "/dashboard/sales",
      icon: <ReceiptIcon />,
    },
    {
      title: "Purchase Orders",
      url: "/dashboard/purchase-orders",
      icon: <ShoppingCartIcon />,
    },
    {
      title: "Inventory",
      url: "/dashboard/inventory",
      icon: <BoxesIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: <CircleUserRoundIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href={"/"} />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">Atlas ERP</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
