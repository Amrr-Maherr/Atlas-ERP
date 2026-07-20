"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeleteInventoryItem } from "../hooks/inventory.hooks";
import { DeleteInventoryItemDialog } from "./delete-inventory-item-dialog";
import type { InventoryItem } from "../types/inventory.types";

type DeleteInventoryItemButtonProps = {
  inventoryItem: InventoryItem;
};

export function DeleteInventoryItemButton({
  inventoryItem,
}: DeleteInventoryItemButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, mutate: deleteInventoryItem } =
    useDeleteInventoryItem();

  function handleConfirm() {
    deleteInventoryItem(
      { id: inventoryItem.id },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success("Inventory item deleted", {
            description: `"${inventoryItem.name}" was successfully deleted.`,
          });
        },
        onError: () => {
          toast.error("Delete failed", {
            description:
              "Unable to delete this inventory item. Please try again later.",
          });
        },
      },
    );
  }

  return (
    <DeleteInventoryItemDialog
      inventoryItem={inventoryItem}
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
