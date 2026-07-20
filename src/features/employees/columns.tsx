"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/components/utils/format-date"
import { UserIcon } from "lucide-react"
import Image from "next/image"
import { EmployeeStatusBadge } from "./components/employee-status-badge"
import { EmployeeRowActions } from "./components/employee-row-actions"
import type { Employee } from "./types/employee.types"

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    id: "name",
    header: "Employee",
    cell: ({ row }) => {
      const employee = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {employee.avatar ? (
              <Image src={employee.avatar} alt={employee.name} fill sizes="40px" className="object-cover" />
            ) : (
              <UserIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <span className="font-medium">{employee.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <span className="block max-w-[200px] truncate text-muted-foreground">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ getValue }) => <Badge variant="secondary">{getValue() as string}</Badge>,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span>,
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue() as string)}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue() as string)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <EmployeeStatusBadge status={getValue() as string} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <EmployeeRowActions employee={row.original} />,
  },
]

export const employeeExportColumns = [
  { key: "name" as const, label: "Employee" },
  { key: "email" as const, label: "Email" },
  { key: "department" as const, label: "Department" },
  { key: "position" as const, label: "Position" },
  { key: "phone" as const, label: "Phone" },
  { key: "hireDate" as const, label: "Hire Date" },
  { key: "createdAt" as const, label: "Created" },
  { key: "status" as const, label: "Status" },
]
