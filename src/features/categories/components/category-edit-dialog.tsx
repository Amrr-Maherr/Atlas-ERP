"use client"

import { useState } from "react"
import { Category } from "../types/category.types"
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

type CategoryEditDialogProps = {
  category: Category
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CategoryEditDialog({
  category,
  open,
  onOpenChange,
}: CategoryEditDialogProps) {
  const [name, setName] = useState(category.name)
  const [description, setDescription] = useState(category.description)
  const [slug, setSlug] = useState(category.slug)
  const [status, setStatus] = useState(category.status)
  const [displayOrder, setDisplayOrder] = useState(category.displayOrder)
  const [seoTitle, setSeoTitle] = useState(category.seoTitle)
  const [seoDescription, setSeoDescription] = useState(category.seoDescription)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-[var(--primary)]/10">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category details below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field orientation="vertical">
            <FieldLabel>Name</FieldLabel>
            <FieldContent>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
              />
            </FieldContent>
          </Field>

          <Field orientation="vertical">
            <FieldLabel>Description</FieldLabel>
            <FieldContent>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Category description"
              />
            </FieldContent>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>Slug</FieldLabel>
              <FieldContent>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="category-slug"
                />
              </FieldContent>
            </Field>

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

          <Field orientation="vertical">
            <FieldLabel>Display Order</FieldLabel>
            <FieldContent>
              <Input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
              />
            </FieldContent>
          </Field>

          <Field orientation="vertical">
            <FieldLabel>SEO Title</FieldLabel>
            <FieldContent>
              <Input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="SEO title"
              />
            </FieldContent>
          </Field>

          <Field orientation="vertical">
            <FieldLabel>SEO Description</FieldLabel>
            <FieldContent>
              <Input
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="SEO description"
              />
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
