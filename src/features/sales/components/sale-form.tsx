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

export function SaleForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Customer</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer-1">Customer 1</SelectItem>
            <SelectItem value="customer-2">Customer 2</SelectItem>
            <SelectItem value="customer-3">Customer 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Order Date</Label>
        <Input type="date" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Payment Method</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="credit-card">Credit Card</SelectItem>
            <SelectItem value="debit-card">Debit Card</SelectItem>
            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
            <SelectItem value="check">Check</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <Select defaultValue="pending">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
