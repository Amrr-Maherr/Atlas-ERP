"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { InventoryItem } from "../types/inventory.types";
import { inventoryColumns, inventoryExportColumns } from "../columns";
import { InventoryForm } from "./inventory-form";

type InventoryListProps = {
  inventoryData: InventoryItem[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function InventoryList({
  inventoryData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
}: InventoryListProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Inventory"
        description="Track stock levels, reorder points, and warehouse locations."
        actions={
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            Add Inventory Item
          </Button>
        }
      />
      <DataTable
        columns={inventoryColumns}
        data={inventoryData}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
        exportColumns={inventoryExportColumns}
        exportFilename="inventory"
        emptyTitle="No inventory items"
        emptyDescription="Add products to your inventory to get started."
      />
      <CreateDialog
        open={open}
        onOpenChange={setOpen}
        title="Add Inventory Item"
        description="Add a new item to your inventory."
      >
        <InventoryForm />
      </CreateDialog>
    </section>
  );
}
