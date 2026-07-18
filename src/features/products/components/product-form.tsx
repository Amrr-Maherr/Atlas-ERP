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
import { Separator } from "@/components/ui/separator"

export function ProductForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Product Name</Label>
        <Input placeholder="Product name" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>SKU</Label>
          <Input placeholder="SKU-001" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Brand</Label>
          <Input placeholder="Brand name" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Category</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Supplier</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supplier-1">Supplier 1</SelectItem>
              <SelectItem value="supplier-2">Supplier 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Price</Label>
          <Input type="number" placeholder="0.00" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Cost</Label>
          <Input type="number" placeholder="0.00" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Stock</Label>
          <Input type="number" placeholder="0" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Textarea placeholder="Product description" rows={3} />
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
            <SelectItem value="draft">Draft</SelectItem>
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
