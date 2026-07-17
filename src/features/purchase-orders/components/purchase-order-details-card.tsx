import { PurchaseOrder } from "../types/purchase-order.types";
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
import { PurchaseOrderStatusBadge } from "./purchase-order-status-badge";

type PurchaseOrderDetailsCardProps = {
  purchaseOrder: PurchaseOrder;
};

export function PurchaseOrderDetailsCard({ purchaseOrder }: PurchaseOrderDetailsCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <CardTitle className="text-lg @[250px]/card:text-xl">
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                {purchaseOrder.poNumber}
              </code>
            </CardTitle>
            <CardDescription>{purchaseOrder.notes}</CardDescription>
          </div>
          <PurchaseOrderStatusBadge status={purchaseOrder.orderStatus} />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Payment Method</FieldLabel>
            <FieldContent>
              <span className="text-sm">{purchaseOrder.paymentMethod}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Payment Status</FieldLabel>
            <FieldContent>
              <Badge variant="outline" className="text-xs">
                {purchaseOrder.paymentStatus}
              </Badge>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Items</FieldLabel>
            <FieldContent>
              <Badge variant="secondary">{purchaseOrder.items.length}</Badge>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Shipping Cost</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">
                ${purchaseOrder.shippingCost.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Tax</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">
                ${purchaseOrder.tax.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Total</FieldLabel>
            <FieldContent>
              <span className="text-sm font-medium tabular-nums">
                ${purchaseOrder.total.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Order Date</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(purchaseOrder.orderDate)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Expected Date</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(purchaseOrder.expectedDate)}
              </span>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Created</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(purchaseOrder.createdAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Updated</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(purchaseOrder.updatedAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Received Date</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {purchaseOrder.receivedDate ? formatDate(purchaseOrder.receivedDate) : "Not received"}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Shipping Address</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground line-clamp-1">
                {purchaseOrder.shippingAddress}
              </span>
            </FieldContent>
          </Field>
        </div>

        {purchaseOrder.items.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[var(--info)] uppercase tracking-wide">
                Items
              </p>
              <div className="flex flex-wrap gap-1">
                {purchaseOrder.items.map((item) => (
                  <Badge
                    key={item.productId}
                    variant="outline"
                    className="text-xs border-[var(--info)]/20 text-[var(--info)]"
                  >
                    {item.productName} x{item.quantity}
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
