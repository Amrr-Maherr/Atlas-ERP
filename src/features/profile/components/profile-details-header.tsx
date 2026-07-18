import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProfileDetailsHeader() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
        <ArrowLeftIcon />
      </Link>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold">My Profile</h3>
        <p className="text-sm text-muted-foreground">
          View and manage your account details
        </p>
      </div>
    </div>
  );
}
