"use client"

import { useState } from "react"
import { Employee } from "../types/employee.types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type EmployeeEditDialogProps = {
  employee: Employee
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmployeeEditDialog({
  employee,
  open,
  onOpenChange,
}: EmployeeEditDialogProps) {
  const [name, setName] = useState(employee.name)
  const [email, setEmail] = useState(employee.email)
  const [phone, setPhone] = useState(employee.phone)
  const [department, setDepartment] = useState(employee.department)
  const [status, setStatus] = useState(employee.status)
  const [position, setPosition] = useState(employee.position)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-[var(--primary)]/10">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Update the employee details below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field orientation="vertical">
            <FieldLabel>Name</FieldLabel>
            <FieldContent>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Employee name"
              />
            </FieldContent>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="employee@email.com"
                />
              </FieldContent>
            </Field>

            <Field orientation="vertical">
              <FieldLabel>Phone</FieldLabel>
              <FieldContent>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20..."
                />
              </FieldContent>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>Department</FieldLabel>
              <FieldContent>
                <Input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Department"
                />
              </FieldContent>
            </Field>

            <Field orientation="vertical">
              <FieldLabel>Position</FieldLabel>
              <FieldContent>
                <Input
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Position"
                />
              </FieldContent>
            </Field>
          </div>

          <Field orientation="vertical">
            <FieldLabel>Status</FieldLabel>
            <FieldContent>
              <Select value={status} onValueChange={(v) => v && setStatus(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        </div>

        <DialogFooter showCloseButton>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
