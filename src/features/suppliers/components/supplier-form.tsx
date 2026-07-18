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

export function SupplierForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Company Name</Label>
        <Input placeholder="Company name" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Contact Name</Label>
        <Input placeholder="Contact person" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input type="email" placeholder="supplier@company.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Phone</Label>
          <Input placeholder="+1 (555) 000-0000" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Address</Label>
        <Input placeholder="Street address" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Country</Label>
          <Input placeholder="Country" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Payment Terms</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="net15">Net 15</SelectItem>
              <SelectItem value="net30">Net 30</SelectItem>
              <SelectItem value="net60">Net 60</SelectItem>
              <SelectItem value="due-on-receipt">Due on Receipt</SelectItem>
            </SelectContent>
          </Select>
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
      <div className="flex flex-col gap-2">
        <Label>Logo</Label>
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          Click to upload or drag and drop
        </div>
      </div>
    </div>
  )
}
