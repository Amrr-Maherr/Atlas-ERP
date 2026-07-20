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
import type { Sale } from "../types/sale.types";

type DeleteSaleDialogProps = {
  sale: Sale;
  onConfirm: () => void;
  isPending: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteSaleDialog({
  sale,
  onConfirm,
  isPending,
  open,
  onOpenChange,
}: DeleteSaleDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger
        render={<Button variant="destructive" size="icon-sm" />}
      >
        <Trash2Icon />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete sale?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{sale.invoiceNumber}</strong>? This action cannot be undone
            and may affect related inventory and payment records associated with
            this sale.
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
