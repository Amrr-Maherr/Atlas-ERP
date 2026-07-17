import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";

export function CustomerRowActions() {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon-sm">
        <EyeIcon />
      </Button>
      <Button variant="ghost" size="icon-sm">
        <PencilIcon />
      </Button>
      <Button variant="destructive" size="icon-sm">
        <Trash2Icon />
      </Button>
    </div>
  );
}
