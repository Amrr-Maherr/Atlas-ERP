"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function EmployeeForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>First Name</Label>
          <Input placeholder="First name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Last Name</Label>
          <Input placeholder="Last name" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input type="email" placeholder="employee@company.com" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Phone</Label>
        <Input placeholder="+1 (555) 000-0000" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Department</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Position</Label>
          <Input placeholder="Job title" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Salary</Label>
        <Input type="number" placeholder="0.00" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <Select defaultValue="active">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Avatar</Label>
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          Click to upload or drag and drop
        </div>
      </div>
    </div>
  )
}
