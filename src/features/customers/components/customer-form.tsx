"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CustomerForm() {
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
        <Input type="email" placeholder="customer@example.com" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Phone</Label>
        <Input placeholder="+1 (555) 000-0000" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Address</Label>
        <Input placeholder="Street address" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>City</Label>
          <Input placeholder="City" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Country</Label>
          <Input placeholder="Country" />
        </div>
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
        <Label>Notes</Label>
        <Textarea placeholder="Additional notes" rows={2} />
      </div>
    </div>
  )
}
