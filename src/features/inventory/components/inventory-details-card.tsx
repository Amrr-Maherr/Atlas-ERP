import { InventoryItem } from "../types/inventory.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { formatDate } from "@/components/utils/format-date";
import { InventoryStatusBadge } from "./inventory-status-badge";

type InventoryDetailsCardProps = {
  item: InventoryItem;
};

export function InventoryDetailsCard({ item }: InventoryDetailsCardProps) {
  const stockStatus = item.stock <= item.minStock ? "low" : "in-stock";

  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <CardTitle className="text-lg @[250px]/card:text-xl">
              {item.name}
            </CardTitle>
            <CardDescription className="line-clamp-1">
              {item.description}
            </CardDescription>
          </div>
          <InventoryStatusBadge status={stockStatus} />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>SKU</FieldLabel>
            <FieldContent>
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                {item.sku}
              </code>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Brand</FieldLabel>
            <FieldContent>
              <span className="text-sm">{item.brand}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Unit</FieldLabel>
            <FieldContent>
              <Badge variant="secondary">{item.unit}</Badge>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Warehouse Location</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {item.warehouseLocation}
              </span>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Current Stock</FieldLabel>
            <FieldContent>
              <span className="text-sm font-medium tabular-nums">{item.stock}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Minimum Stock</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums text-muted-foreground">
                {item.minStock}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Reorder Level</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums text-muted-foreground">
                {item.reorderLevel}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Maximum Stock</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums text-muted-foreground">
                {item.maximumStock}
              </span>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Cost Price</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">
                ${item.costPrice.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Sell Price</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">
                ${item.price.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Wholesale Price</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">
                ${item.wholesalePrice.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Tax Rate</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">{item.taxRate}%</span>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Created</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(item.createdAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Updated</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(item.updatedAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Weight</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {item.weight}kg
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Dimensions</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {item.dimensions}
              </span>
            </FieldContent>
          </Field>
        </div>

        {item.tags.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[var(--info)] uppercase tracking-wide">
                Tags
              </p>
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
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
