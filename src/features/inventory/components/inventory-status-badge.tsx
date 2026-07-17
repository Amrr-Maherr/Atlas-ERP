import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  "in-stock": "bg-[var(--success)] text-[var(--success-foreground)]",
  "low": "bg-[var(--warning)] text-[var(--warning-foreground)]",
  "out-of-stock": "bg-[var(--destructive)] text-[var(--destructive-foreground)]",
};

const DEFAULT_STYLE = "bg-[var(--muted)] text-[var(--muted-foreground)]";

type InventoryStatusBadgeProps = {
  status: string;
};

export function InventoryStatusBadge({ status }: InventoryStatusBadgeProps) {
  return (
    <Badge className={STATUS_STYLES[status] ?? DEFAULT_STYLE}>
      {status}
    </Badge>
  );
}
