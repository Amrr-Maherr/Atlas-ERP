"use client";

import { Employee } from "../types/employee.types";
import { useForm, Controller } from "react-hook-form";
import { useUpdateEmployee } from "../hooks/employees.hooks";
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

type EmployeeEditDialogProps = {
  employee: Employee;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type EmployeeFormValues = {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: "active" | "inactive" | "pending";
};

export function EmployeeEditDialog({
  employee,
  open,
  onOpenChange,
}: EmployeeEditDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    defaultValues: {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      status: employee.status as "active" | "inactive" | "pending",
    },
  });

  const { mutate: updateEmployee, isPending } = useUpdateEmployee();

  const onSubmit = (data: EmployeeFormValues): void => {
    const updatedEmployee: Employee = {
      ...employee,
      ...data,
    };
    updateEmployee(
      { id: employee.id, UpdateData: updatedEmployee },
      {
        onSuccess: () => {
          toast.success("Employee updated");
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
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Update the employee details below.
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
                placeholder="Employee name"
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
                  placeholder="employee@email.com"
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
              <FieldLabel>Department</FieldLabel>
              <FieldContent>
                <Input
                  {...register("department", {
                    required: "Department is required",
                  })}
                  placeholder="Department"
                />
                <FieldError
                  errors={errors.department ? [errors.department] : []}
                />
              </FieldContent>
            </Field>

            <Field orientation="vertical">
              <FieldLabel>Position</FieldLabel>
              <FieldContent>
                <Input
                  {...register("position", {
                    required: "Position is required",
                  })}
                  placeholder="Position"
                />
                <FieldError
                  errors={errors.position ? [errors.position] : []}
                />
              </FieldContent>
            </Field>
          </div>

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
