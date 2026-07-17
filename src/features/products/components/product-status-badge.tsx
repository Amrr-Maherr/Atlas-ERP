import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-[var(--success)] text-[var(--success-foreground)]",
  low_stock: "bg-[var(--warning)] text-[var(--warning-foreground)]",
  out_of_stock: "bg-[var(--destructive)] text-[var(--destructive-foreground)]",
};

const DEFAULT_STYLE = "bg-[var(--muted)] text-[var(--muted-foreground)]";

type ProductStatusBadgeProps = {
  status: string;
};

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  return (
    <Badge className={STATUS_STYLES[status] ?? DEFAULT_STYLE}>
      {status.replace("_", " ")}
    </Badge>
  );
}
