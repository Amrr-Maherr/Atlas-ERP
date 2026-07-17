import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpenIcon } from "lucide-react";
import { Employee } from "../types/employee.types";

type EmployeesEmptyProps = {
  data: Employee[];
  isLoading: boolean;
  error: Error | null;
};

export function EmployeesEmpty({ data, isLoading, error }: EmployeesEmptyProps) {
  if (isLoading || error || data.length > 0) return null;
  return (
    <Card className="rounded-lg">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <FolderOpenIcon className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium">No employees yet</p>
        <p className="text-xs text-muted-foreground">
          Create your first employee to get started.
        </p>
        <Button size="sm">Add Employee</Button>
      </CardContent>
    </Card>
  );
}
