"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DeleteButton } from "@/components/shared/delete-button/delete-button";
import { useDeleteInventoryItem } from "../hooks/inventory.hooks";

type DeleteInventoryItemButtonProps = {
  inventoryItem: { id: string; name: string };
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
    <DeleteButton
      entityName="Inventory item"
      entityDisplayName={inventoryItem.name}
      description="This action cannot be undone and may affect related product and sales records associated with this item."
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
