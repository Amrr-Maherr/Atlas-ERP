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
import type { Product } from "../types/product.types";

type DeleteProductDialogProps = {
  product: Product;
  onConfirm: () => void;
  isPending: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteProductDialog({
  product,
  onConfirm,
  isPending,
  open,
  onOpenChange,
}: DeleteProductDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger
        render={<Button variant="destructive" size="icon-sm" />}
      >
        <Trash2Icon />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete product?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete <strong>{product.name}</strong>?
            This action cannot be undone and may affect related inventory and
            sale records.
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
