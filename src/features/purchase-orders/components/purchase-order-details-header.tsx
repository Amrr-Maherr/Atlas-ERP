import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PurchaseOrderDetailsHeader() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/dashboard/purchase-orders" className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
        <ArrowLeftIcon />
      </Link>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold">Purchase Order Details</h3>
      </div>
    </div>
  );
}
