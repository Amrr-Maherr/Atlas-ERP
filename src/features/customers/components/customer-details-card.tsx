import { Customer } from "../types/customer.types";
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
import { UserIcon, ShoppingCartIcon, CreditCardIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { CustomerStatusBadge } from "./customer-status-badge";

type CustomerDetailsCardProps = {
  customer: Customer;
};

export function CustomerDetailsCard({ customer }: CustomerDetailsCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative size-16 shrink-0 items-center justify-center rounded-lg bg-muted overflow-hidden">
            {customer.avatar ? (
              <Image
                src={customer.avatar}
                alt={customer.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <UserIcon className="size-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <CardTitle className="text-lg @[250px]/card:text-xl">
              {customer.name}
            </CardTitle>
            <CardDescription>{customer.email}</CardDescription>
          </div>
          <CardAction>
            <CustomerStatusBadge status={customer.status} />
          </CardAction>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Separator />

        <div className="flex items-center gap-2">
          {customer.companyName && (
            <Badge variant="outline" className="text-xs">
              {customer.companyName}
            </Badge>
          )}
          {customer.vipStatus && (
            <Badge variant="outline" className="text-xs">
              <StarIcon className="size-3" />
              {customer.vipStatus}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Phone</FieldLabel>
            <FieldContent>
              <span className="text-sm">{customer.phone}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>City</FieldLabel>
            <FieldContent>
              <span className="text-sm">{customer.city}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Country</FieldLabel>
            <FieldContent>
              <span className="text-sm">{customer.country}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Preferred Contact</FieldLabel>
            <FieldContent>
              <span className="text-sm">{customer.preferredContact}</span>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Orders</FieldLabel>
            <FieldContent>
              <div className="flex items-center gap-1.5">
                <ShoppingCartIcon className="size-4 text-muted-foreground" />
                <Badge variant="secondary">{customer.totalOrders}</Badge>
              </div>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Total Spent</FieldLabel>
            <FieldContent>
              <span className="text-sm font-medium tabular-nums">
                ${customer.totalSpent.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Loyalty Points</FieldLabel>
            <FieldContent>
              <span className="text-sm font-medium tabular-nums">
                {customer.loyaltyPoints.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Avg Order Value</FieldLabel>
            <FieldContent>
              <span className="text-sm tabular-nums">
                ${customer.averageOrderValue.toLocaleString()}
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
                {formatDate(customer.createdAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Updated</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(customer.updatedAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Last Order</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(customer.lastOrderDate)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Customer Since</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(customer.customerSince)}
              </span>
            </FieldContent>
          </Field>
        </div>

        {customer.paymentTerms && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[var(--info)] uppercase tracking-wide">
                Payment
              </p>
              <div className="grid grid-cols-1 gap-3 @[400px]/card:grid-cols-2">
                <Field orientation="vertical">
                  <FieldLabel>Payment Terms</FieldLabel>
                  <FieldContent>
                    <span className="text-sm">{customer.paymentTerms}</span>
                  </FieldContent>
                </Field>
                <Field orientation="vertical">
                  <FieldLabel>Preferred Method</FieldLabel>
                  <FieldContent>
                    <span className="text-sm">{customer.preferredPaymentMethod}</span>
                  </FieldContent>
                </Field>
              </div>
              {customer.creditLimit > 0 && (
                <Field orientation="vertical">
                  <FieldLabel>Credit Limit</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-1.5">
                      <CreditCardIcon className="size-4 text-muted-foreground" />
                      <span className="text-sm font-medium tabular-nums">
                        ${customer.creditLimit.toLocaleString()}
                      </span>
                    </div>
                  </FieldContent>
                </Field>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
