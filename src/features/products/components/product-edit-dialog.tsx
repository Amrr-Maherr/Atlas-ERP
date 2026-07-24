"use client";

import { Product } from "../types/product.types";
import { useForm, Controller } from "react-hook-form";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
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

type ProductEditDialogProps = {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ProductFormValues = {
  name: string;
  description: string;
  slug: string;
  status: "active" | "low_stock" | "out_of_stock";
  price: number;
  stock: number;
  brand: string;
  sku: string;
};

export function ProductEditDialog({
  product,
  open,
  onOpenChange,
}: ProductEditDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: product.name,
      description: product.description,
      slug: product.slug,
      status: product.status as "active" | "low_stock" | "out_of_stock",
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      sku: product.sku,
    },
  });

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const onSubmit = (data: ProductFormValues): void => {
    const updatedProduct: Product = {
      ...product,
      ...data,
    };
    updateProduct(
      { id: product.id, UpdateData: updatedProduct },
      {
        onSuccess: () => {
          toast.success("Product updated");
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
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the product details below.
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
                    value: 100,
                    message: "Name must be at most 100 characters",
                  },
                })}
                placeholder="Product name"
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
                    value: 500,
                    message: "Description must be at most 500 characters",
                  },
                })}
                placeholder="Product description"
              />
              <FieldError
                errors={errors.description ? [errors.description] : []}
              />
            </FieldContent>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>SKU</FieldLabel>
              <FieldContent>
                <Input
                  {...register("sku", {
                    required: "SKU is required",
                  })}
                  placeholder="SKU"
                />
                <FieldError errors={errors.sku ? [errors.sku] : []} />
              </FieldContent>
            </Field>

            <Field orientation="vertical">
              <FieldLabel>Brand</FieldLabel>
              <FieldContent>
                <Input
                  {...register("brand", {
                    required: "Brand is required",
                  })}
                  placeholder="Brand"
                />
                <FieldError errors={errors.brand ? [errors.brand] : []} />
              </FieldContent>
            </Field>
          </div>

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
                  placeholder="product-slug"
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
                        <SelectItem value="low_stock">Low Stock</SelectItem>
                        <SelectItem value="out_of_stock">
                          Out of Stock
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={errors.status ? [errors.status] : []} />
              </FieldContent>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>Price</FieldLabel>
              <FieldContent>
                <Input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Price must be at least 0",
                    },
                  })}
                />
                <FieldError errors={errors.price ? [errors.price] : []} />
              </FieldContent>
            </Field>

            <Field orientation="vertical">
              <FieldLabel>Stock</FieldLabel>
              <FieldContent>
                <Input
                  type="number"
                  {...register("stock", {
                    required: "Stock is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Stock must be at least 0",
                    },
                  })}
                />
                <FieldError errors={errors.stock ? [errors.stock] : []} />
              </FieldContent>
            </Field>
          </div>

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
