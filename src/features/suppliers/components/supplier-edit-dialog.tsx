"use client"

import { useState } from "react"
import { Supplier } from "../types/supplier.types"
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

type SupplierEditDialogProps = {
  supplier: Supplier
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupplierEditDialog({
  supplier,
  open,
  onOpenChange,
}: SupplierEditDialogProps) {
  const [companyName, setCompanyName] = useState(supplier.companyName)
  const [contactPerson, setContactPerson] = useState(supplier.contactPerson)
  const [email, setEmail] = useState(supplier.email)
  const [phone, setPhone] = useState(supplier.phone)
  const [status, setStatus] = useState(supplier.status)
  const [paymentTerms, setPaymentTerms] = useState(supplier.paymentTerms)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-[var(--primary)]/10">
        <DialogHeader>
          <DialogTitle>Edit Supplier</DialogTitle>
          <DialogDescription>
            Update the supplier details below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field orientation="vertical">
            <FieldLabel>Company Name</FieldLabel>
            <FieldContent>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company name"
              />
            </FieldContent>
          </Field>

          <Field orientation="vertical">
            <FieldLabel>Contact Person</FieldLabel>
            <FieldContent>
              <Input
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="Contact person"
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
                  placeholder="supplier@email.com"
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

            <Field orientation="vertical">
              <FieldLabel>Payment Terms</FieldLabel>
              <FieldContent>
                <Input
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  placeholder="Net 30"
                />
              </FieldContent>
            </Field>
          </div>
        </div>

        <DialogFooter showCloseButton>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
