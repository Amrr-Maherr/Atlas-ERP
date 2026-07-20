import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import type { InventoryItem } from "../types/inventory.types";

type DeleteInventoryItemDialogProps = {
  inventoryItem: InventoryItem;
  onConfirm: () => void;
  isPending: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteInventoryItemDialog({
  inventoryItem,
  onConfirm,
  isPending,
  open,
  onOpenChange,
}: DeleteInventoryItemDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger
        render={<Button variant="destructive" size="icon-sm" />}
      >
        <Trash2Icon />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete inventory item?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{inventoryItem.name}</strong>? This action cannot be undone
            and may affect related product and sales records associated with
            this item.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
