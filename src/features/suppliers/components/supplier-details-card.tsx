import { Supplier } from "../types/supplier.types";
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
import { BuildingIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { SupplierStatusBadge } from "./supplier-status-badge";

type SupplierDetailsCardProps = {
  supplier: Supplier;
};

export function SupplierDetailsCard({ supplier }: SupplierDetailsCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative size-16 shrink-0 items-center justify-center rounded-lg bg-muted overflow-hidden">
            {supplier.logo ? (
              <Image
                src={supplier.logo}
                alt={supplier.companyName}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <BuildingIcon className="size-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <CardTitle className="text-lg @[250px]/card:text-xl">
              {supplier.companyName}
            </CardTitle>
            <CardDescription>{supplier.contactPerson}</CardDescription>
          </div>
          <CardAction>
            <SupplierStatusBadge status={supplier.status} />
          </CardAction>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Separator />

        <div className="flex items-center gap-2">
          {supplier.isVerified && (
            <Badge variant="outline" className="text-xs">
              Verified
            </Badge>
          )}
          {supplier.rating > 0 && (
            <Badge variant="outline" className="text-xs">
              <StarIcon className="size-3" />
              {supplier.rating}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <span className="text-sm">{supplier.email}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Phone</FieldLabel>
            <FieldContent>
              <span className="text-sm">{supplier.phone}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Country</FieldLabel>
            <FieldContent>
              <span className="text-sm">{supplier.country}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Website</FieldLabel>
            <FieldContent>
              <span className="text-sm">{supplier.website}</span>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Orders</FieldLabel>
            <FieldContent>
              <Badge variant="secondary">{supplier.totalOrders}</Badge>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Balance</FieldLabel>
            <FieldContent>
              <span className="text-sm font-medium tabular-nums">
                ${supplier.balance.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Delivery Days</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">
                {supplier.deliveryDays} days
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Payment Terms</FieldLabel>
            <FieldContent>
              <span className="text-sm">{supplier.paymentTerms}</span>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Created</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(supplier.createdAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Updated</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(supplier.updatedAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Last Order</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(supplier.lastOrderDate)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Tax Number</FieldLabel>
            <FieldContent>
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                {supplier.taxNumber}
              </code>
            </FieldContent>
          </Field>
        </div>

        {supplier.notes && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[var(--info)] uppercase tracking-wide">
                Notes
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {supplier.notes}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
