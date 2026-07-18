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

export function InventoryForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Product</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="product-1">Product 1</SelectItem>
            <SelectItem value="product-2">Product 2</SelectItem>
            <SelectItem value="product-3">Product 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Warehouse</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select warehouse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main">Main Warehouse</SelectItem>
            <SelectItem value="secondary">Secondary Warehouse</SelectItem>
            <SelectItem value="overflow">Overflow Storage</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Quantity</Label>
          <Input type="number" placeholder="0" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Reorder Level</Label>
          <Input type="number" placeholder="0" />
        </div>
      </div>
    </div>
  )
}
