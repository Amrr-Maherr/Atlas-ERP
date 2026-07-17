import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpenIcon } from "lucide-react";
import { Customer } from "../types/customer.types";

type CustomersEmptyProps = {
  data: Customer[];
  isLoading: boolean;
  error: Error | null;
};

export function CustomersEmpty({ data, isLoading, error }: CustomersEmptyProps) {
  if (isLoading || error || data.length > 0) return null;
  return (
    <Card className="rounded-lg">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <FolderOpenIcon className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium">No customers yet</p>
        <p className="text-xs text-muted-foreground">
          Create your first customer to get started.
        </p>
        <Button size="sm">Add Customer</Button>
      </CardContent>
    </Card>
  );
}
