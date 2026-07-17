"use client";
import { useEmployee } from "@/features/employees";
import { EmployeeDetails } from "@/features/employees";
import { useParams } from "next/navigation";

export default function EmployeeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useEmployee({ id });

  return (
    <div className="flex flex-col gap-6 p-6">
      <EmployeeDetails
        employeeData={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
