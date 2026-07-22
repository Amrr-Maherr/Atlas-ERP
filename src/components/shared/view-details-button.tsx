import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ViewDetailsButtonProps = {
  href: string;
  label: string;
};

export function ViewDetailsButton({ href, label }: ViewDetailsButtonProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
    >
      <Tooltip>
        <TooltipTrigger>
          <EyeIcon />
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </Link>
  );
}
