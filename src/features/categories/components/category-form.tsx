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

export function CategoryForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input placeholder="Category name" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Textarea placeholder="Brief description of this category" rows={3} />
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
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Image</Label>
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          Click to upload or drag and drop
        </div>
      </div>
    </div>
  )
}
