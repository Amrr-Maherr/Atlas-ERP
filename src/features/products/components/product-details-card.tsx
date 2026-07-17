import { Product } from "../types/product.types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { formatDate } from "@/components/utils/format-date";
import { ImageIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { ProductStatusBadge } from "./product-status-badge";

type ProductDetailsCardProps = {
  product: Product;
};

export function ProductDetailsCard({ product }: ProductDetailsCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative size-16 shrink-0 items-center justify-center rounded-lg bg-muted overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <ImageIcon className="size-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <CardTitle className="text-lg @[250px]/card:text-xl">
              {product.name}
            </CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </div>
          <CardAction>
            <ProductStatusBadge status={product.status} />
          </CardAction>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Separator />

        <div className="flex items-center gap-2">
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
            {product.sku}
          </code>
          <Badge variant="outline" className="text-xs">
            {product.brand}
          </Badge>
          {product.isFeatured && (
            <Badge variant="outline" className="text-xs border-[var(--info)]/20 text-[var(--info)]">
              <StarIcon className="size-3" />
              Featured
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Price</FieldLabel>
            <FieldContent>
              <span className="text-sm font-medium tabular-nums text-[var(--success)]">
                ${product.price}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Cost Price</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground tabular-nums">
                ${product.costPrice}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Stock</FieldLabel>
            <FieldContent>
              <Badge variant="secondary">{product.stock}</Badge>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Min Stock</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">{product.minStock}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Category</FieldLabel>
            <FieldContent>
              <span className="text-sm">{product.categoryId.slice(0, 8)}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Unit</FieldLabel>
            <FieldContent>
              <span className="text-sm">{product.unit}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Created</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(product.createdAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Updated</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(product.updatedAt)}
              </span>
            </FieldContent>
          </Field>
        </div>

        {product.tags.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[var(--info)] uppercase tracking-wide">
                Tags
              </p>
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-[var(--info)]/20 text-[var(--info)]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
