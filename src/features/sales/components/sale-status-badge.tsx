import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-[var(--success)] text-[var(--success-foreground)]",
  completed: "bg-[var(--success)] text-[var(--success-foreground)]",
  cancelled: "bg-[var(--destructive)] text-[var(--destructive-foreground)]",
  refunded: "bg-[var(--warning)] text-[var(--warning-foreground)]",
  pending: "bg-[var(--warning)] text-[var(--warning-foreground)]",
};

const DEFAULT_STYLE = "bg-[var(--muted)] text-[var(--muted-foreground)]";

type SaleStatusBadgeProps = {
  status: string;
};

export function SaleStatusBadge({ status }: SaleStatusBadgeProps) {
  return (
    <Badge className={STATUS_STYLES[status] ?? DEFAULT_STYLE}>
      {status}
    </Badge>
  );
}
