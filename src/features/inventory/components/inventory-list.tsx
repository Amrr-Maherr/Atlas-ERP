"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { InventoryItem } from "../types/inventory.types";
import { inventoryColumns, inventoryExportColumns } from "../columns";
import { InventoryForm } from "./inventory-form";
import { useCreateInventoryItem } from "../hooks/inventory.hooks";

type InventoryListProps = {
  inventoryData: InventoryItem[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
  search?: string;
  sort?: string;
  onSearch?: (search: string) => void;
  onSort?: (sort: string) => void;
};

export function InventoryList({
  inventoryData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
  search,
  sort,
  onSearch,
  onSort,
}: InventoryListProps) {
  const [open, setOpen] = useState(false);
  const { isPending, mutate: createInventoryItem } = useCreateInventoryItem();

  function handleSave() {
    createInventoryItem(
      { CreateData: {} as InventoryItem },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Inventory item created", {
            description: "New inventory item was successfully created.",
          });
        },
        onError: () => {
          toast.error("Create failed", {
            description:
              "Unable to create this inventory item. Please try again later.",
          });
        },
      },
    );
  }

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
        search={search}
        sort={sort}
        onSearch={onSearch}
        onSort={onSort}
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
        onSave={handleSave}
        saveLabel={isPending ? "Creating..." : "Save"}
      >
        <InventoryForm />
      </CreateDialog>
    </section>
  );
}
