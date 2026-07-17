import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-[var(--success)] text-[var(--success-foreground)]",
  inactive: "bg-[var(--destructive)] text-[var(--destructive-foreground)]",
  pending: "bg-[var(--warning)] text-[var(--warning-foreground)]",
};

const DEFAULT_STYLE = "bg-[var(--muted)] text-[var(--muted-foreground)]";

type EmployeeStatusBadgeProps = {
  status: string;
};

export function EmployeeStatusBadge({ status }: EmployeeStatusBadgeProps) {
  return (
    <Badge className={STATUS_STYLES[status] ?? DEFAULT_STYLE}>
      {status}
    </Badge>
  );
}
