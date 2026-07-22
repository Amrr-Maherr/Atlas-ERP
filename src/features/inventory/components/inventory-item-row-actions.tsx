import { ViewDetailsButton } from "@/components/shared/view-details-button";
import type { InventoryItem } from "../types/inventory.types";
import { DeleteInventoryItemButton } from "./delete-inventory-item-button";

type InventoryItemRowActionsProps = {
  inventoryItem: InventoryItem;
};

export function InventoryItemRowActions({
  inventoryItem,
}: InventoryItemRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <ViewDetailsButton
        href={`/dashboard/inventory/${inventoryItem.id}`}
        label="View inventory item details"
      />
      <DeleteInventoryItemButton inventoryItem={inventoryItem} />
    </div>
  );
}
