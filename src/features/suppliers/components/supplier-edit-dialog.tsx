"use client";

import { Supplier } from "../types/supplier.types";
import { useForm, Controller } from "react-hook-form";
import { useUpdateSupplier } from "../hooks/suppliers.hooks";
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

type SupplierEditDialogProps = {
  supplier: Supplier;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type SupplierFormValues = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  paymentTerms: string;
};

export function SupplierEditDialog({
  supplier,
  open,
  onOpenChange,
}: SupplierEditDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SupplierFormValues>({
    defaultValues: {
      companyName: supplier.companyName,
      contactPerson: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      status: supplier.status as "active" | "inactive" | "pending",
      paymentTerms: supplier.paymentTerms,
    },
  });

  const { mutate: updateSupplier, isPending } = useUpdateSupplier();

  const onSubmit = (data: SupplierFormValues): void => {
    const updatedSupplier: Supplier = {
      ...supplier,
      ...data,
    };
    updateSupplier(
      { id: supplier.id, UpdateData: updatedSupplier },
      {
        onSuccess: () => {
          toast.success("Supplier updated");
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
          <DialogTitle>Edit Supplier</DialogTitle>
          <DialogDescription>
            Update the supplier details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field orientation="vertical">
            <FieldLabel>Company Name</FieldLabel>
            <FieldContent>
              <Input
                {...register("companyName", {
                  required: "Company name is required",
                  minLength: {
                    value: 2,
                    message: "Company name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Company name must be at most 100 characters",
                  },
                })}
                placeholder="Company name"
              />
              <FieldError
                errors={errors.companyName ? [errors.companyName] : []}
              />
            </FieldContent>
          </Field>

          <Field orientation="vertical">
            <FieldLabel>Contact Person</FieldLabel>
            <FieldContent>
              <Input
                {...register("contactPerson", {
                  required: "Contact person is required",
                  minLength: {
                    value: 3,
                    message:
                      "Contact person must be at least 3 characters",
                  },
                })}
                placeholder="Contact person"
              />
              <FieldError
                errors={errors.contactPerson ? [errors.contactPerson] : []}
              />
            </FieldContent>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="supplier@email.com"
                />
                <FieldError errors={errors.email ? [errors.email] : []} />
              </FieldContent>
            </Field>

            <Field orientation="vertical">
              <FieldLabel>Phone</FieldLabel>
              <FieldContent>
                <Input
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                  placeholder="+20..."
                />
                <FieldError errors={errors.phone ? [errors.phone] : []} />
              </FieldContent>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <Field orientation="vertical">
              <FieldLabel>Payment Terms</FieldLabel>
              <FieldContent>
                <Input
                  {...register("paymentTerms", {
                    required: "Payment terms are required",
                  })}
                  placeholder="Net 30"
                />
                <FieldError
                  errors={errors.paymentTerms ? [errors.paymentTerms] : []}
                />
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
