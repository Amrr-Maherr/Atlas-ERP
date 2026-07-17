import { Sale } from "../types/sale.types";
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
import { SaleStatusBadge } from "./sale-status-badge";

type SaleDetailsCardProps = {
  sale: Sale;
};

export function SaleDetailsCard({ sale }: SaleDetailsCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <CardTitle className="text-lg @[250px]/card:text-xl">
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                {sale.invoiceNumber}
              </code>
            </CardTitle>
            <CardDescription>{sale.customerName}</CardDescription>
          </div>
          <SaleStatusBadge status={sale.orderStatus} />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Employee</FieldLabel>
            <FieldContent>
              <span className="text-sm">{sale.employeeName}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Items</FieldLabel>
            <FieldContent>
              <Badge variant="secondary">{sale.items}</Badge>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Payment Method</FieldLabel>
            <FieldContent>
              <span className="text-sm">{sale.paymentMethod}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Payment Status</FieldLabel>
            <FieldContent>
              <Badge variant="outline" className="text-xs">
                {sale.paymentStatus}
              </Badge>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Subtotal</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">
                ${sale.subtotal.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Tax</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">
                ${sale.tax.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Discount</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">
                ${sale.discount.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Total</FieldLabel>
            <FieldContent>
              <span className="text-sm font-medium tabular-nums">
                ${sale.total.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Sale Date</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(sale.saleDate)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Created</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(sale.createdAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Updated</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(sale.updatedAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Shipping</FieldLabel>
            <FieldContent>
              <span className="text-sm">{sale.shippingMethod}</span>
            </FieldContent>
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
