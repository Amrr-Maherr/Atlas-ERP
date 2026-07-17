import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-[var(--success)] text-[var(--success-foreground)]",
  received: "bg-[var(--success)] text-[var(--success-foreground)]",
  cancelled: "bg-[var(--destructive)] text-[var(--destructive-foreground)]",
  rejected: "bg-[var(--destructive)] text-[var(--destructive-foreground)]",
  pending: "bg-[var(--warning)] text-[var(--warning-foreground)]",
};

const DEFAULT_STYLE = "bg-[var(--muted)] text-[var(--muted-foreground)]";

type PurchaseOrderStatusBadgeProps = {
  status: string;
};

export function PurchaseOrderStatusBadge({ status }: PurchaseOrderStatusBadgeProps) {
  return (
    <Badge className={STATUS_STYLES[status] ?? DEFAULT_STYLE}>
      {status}
    </Badge>
  );
}
