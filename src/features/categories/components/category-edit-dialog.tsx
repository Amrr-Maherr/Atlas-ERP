"use client";

import { Category } from "../types/category.types";
import { useForm, Controller } from "react-hook-form";
import { useUpdateCategory } from "../hooks/categories.hooks";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryEditDialogProps = {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type CategoryFormValues = {
  name: string;
  description: string;
  slug: string;
  status: "active" | "inactive" | "pending";
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
};

export function CategoryEditDialog({
  category,
  open,
  onOpenChange,
}: CategoryEditDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      name: category.name,
      description: category.description,
      slug: category.slug,
      status: category.status as "active" | "inactive" | "pending",
      displayOrder: category.displayOrder,
      seoTitle: category.seoTitle,
      seoDescription: category.seoDescription,
    },
  });

  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const onSubmit = (data: CategoryFormValues): void => {
    const updatedCategory: Category = {
      ...category,
      ...data,
    };
    updateCategory(
      { id: category.id, UpdateData: updatedCategory },
      {
        onSuccess: () => {
          toast.success("Category updated");
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || "Update failed");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-[var(--primary)]/10">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field orientation="vertical">
            <FieldLabel>Name</FieldLabel>
            <FieldContent>
              <Input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name must be at most 50 characters",
                  },
                })}
                placeholder="Category name"
              />
              <FieldError errors={errors.name ? [errors.name] : []} />
            </FieldContent>
          </Field>

          <Field orientation="vertical">
            <FieldLabel>Description</FieldLabel>
            <FieldContent>
              <Input
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                  maxLength: {
                    value: 200,
                    message: "Description must be at most 200 characters",
                  },
                })}
                placeholder="Category description"
              />
              <FieldError
                errors={errors.description ? [errors.description] : []}
              />
            </FieldContent>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>Slug</FieldLabel>
              <FieldContent>
                <Input
                  {...register("slug", {
                    required: "Slug is required",
                    pattern: {
                      value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                      message:
                        "Slug must contain only lowercase letters, numbers, and hyphens",
                    },
                  })}
                  placeholder="category-slug"
                />
                <FieldError errors={errors.slug ? [errors.slug] : []} />
              </FieldContent>
            </Field>

            <Field orientation="vertical">
              <FieldLabel>Status</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="status"
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(v) => v && field.onChange(v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={errors.status ? [errors.status] : []} />
              </FieldContent>
            </Field>
          </div>

          <Field orientation="vertical">
            <FieldLabel>Display Order</FieldLabel>
            <FieldContent>
              <Input
                type="number"
                {...register("displayOrder", {
                  required: "Display order is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Display order must be at least 0",
                  },
                  max: {
                    value: 9999,
                    message: "Display order must be at most 9999",
                  },
                })}
              />
              <FieldError
                errors={errors.displayOrder ? [errors.displayOrder] : []}
              />
            </FieldContent>
          </Field>

          <Field orientation="vertical">
            <FieldLabel>SEO Title</FieldLabel>
            <FieldContent>
              <Input
                {...register("seoTitle", {
                  required: "SEO title is required",
                  minLength: {
                    value: 5,
                    message: "SEO title must be at least 5 characters",
                  },
                  maxLength: {
                    value: 60,
                    message: "SEO title must be at most 60 characters",
                  },
                })}
                placeholder="SEO title"
              />
              <FieldError errors={errors.seoTitle ? [errors.seoTitle] : []} />
            </FieldContent>
          </Field>

          <Field orientation="vertical">
            <FieldLabel>SEO Description</FieldLabel>
            <FieldContent>
              <Input
                {...register("seoDescription", {
                  required: "SEO description is required",
                  minLength: {
                    value: 20,
                    message: "SEO description must be at least 20 characters",
                  },
                  maxLength: {
                    value: 160,
                    message: "SEO description must be at most 160 characters",
                  },
                })}
                placeholder="SEO description"
              />
              <FieldError
                errors={errors.seoDescription ? [errors.seoDescription] : []}
              />
            </FieldContent>
          </Field>

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
