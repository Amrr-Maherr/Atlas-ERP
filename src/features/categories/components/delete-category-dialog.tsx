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
import type { Category } from "../types/category.types";

type DeleteCategoryDialogProps = {
  category: Category;
  onConfirm: () => void;
  isPending: boolean;
};

export function DeleteCategoryDialog({
  category,
  onConfirm,
  isPending,
}: DeleteCategoryDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive" size="icon-sm" />}
      >
        <Trash2Icon />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete category?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete <strong>{category.name}</strong>?
            This action cannot be undone and may affect related products
            associated with this category.
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
