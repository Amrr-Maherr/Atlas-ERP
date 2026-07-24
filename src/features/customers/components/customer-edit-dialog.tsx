"use client";

import { Customer } from "../types/customer.types";
import { useForm, Controller } from "react-hook-form";
import { useUpdateCustomer } from "../hooks/customers.hooks";
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

type CustomerEditDialogProps = {
  customer: Customer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type CustomerFormValues = {
  name: string;
  email: string;
  phone: string;
  city: string;
  status: "active" | "inactive" | "pending";
  paymentTerms: string;
};

export function CustomerEditDialog({
  customer,
  open,
  onOpenChange,
}: CustomerEditDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      city: customer.city,
      status: customer.status as "active" | "inactive" | "pending",
      paymentTerms: customer.paymentTerms,
    },
  });

  const { mutate: updateCustomer, isPending } = useUpdateCustomer();

  const onSubmit = (data: CustomerFormValues): void => {
    const updatedCustomer: Customer = {
      ...customer,
      ...data,
    };
    updateCustomer(
      { id: customer.id, UpdateData: updatedCustomer },
      {
        onSuccess: () => {
          toast.success("Customer updated");
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
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>
            Update the customer details below.
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
                placeholder="Customer name"
              />
              <FieldError errors={errors.name ? [errors.name] : []} />
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
                  placeholder="customer@email.com"
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
              <FieldLabel>City</FieldLabel>
              <FieldContent>
                <Input
                  {...register("city", {
                    required: "City is required",
                  })}
                  placeholder="City"
                />
                <FieldError errors={errors.city ? [errors.city] : []} />
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
