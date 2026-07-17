import { Employee } from "../types/employee.types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { formatDate } from "@/components/utils/format-date";
import { UserIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { EmployeeStatusBadge } from "./employee-status-badge";

type EmployeeDetailsCardProps = {
  employee: Employee;
};

export function EmployeeDetailsCard({ employee }: EmployeeDetailsCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative size-16 shrink-0 items-center justify-center rounded-lg bg-muted overflow-hidden">
            {employee.avatar ? (
              <Image
                src={employee.avatar}
                alt={employee.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <UserIcon className="size-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <CardTitle className="text-lg @[250px]/card:text-xl">
              {employee.name}
            </CardTitle>
            <CardDescription>{employee.email}</CardDescription>
          </div>
          <CardAction>
            <EmployeeStatusBadge status={employee.status} />
          </CardAction>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Separator />

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {employee.department}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {employee.position}
          </Badge>
          {employee.performanceRating > 0 && (
            <Badge variant="outline" className="text-xs">
              <StarIcon className="size-3" />
              {employee.performanceRating}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Phone</FieldLabel>
            <FieldContent>
              <span className="text-sm">{employee.phone}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>City</FieldLabel>
            <FieldContent>
              <span className="text-sm">{employee.city}</span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Hire Date</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(employee.hireDate)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Salary</FieldLabel>
            <FieldContent>
              <span className="text-sm font-medium tabular-nums">
                ${employee.salary.toLocaleString()}
              </span>
            </FieldContent>
          </Field>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Created</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(employee.createdAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Updated</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(employee.updatedAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>National ID</FieldLabel>
            <FieldContent>
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                {employee.nationalId}
              </code>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Tax ID</FieldLabel>
            <FieldContent>
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                {employee.taxId}
              </code>
            </FieldContent>
          </Field>
        </div>

        {employee.skills.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[var(--info)] uppercase tracking-wide">
                Skills
              </p>
              <div className="flex flex-wrap gap-1">
                {employee.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-xs border-[var(--info)]/20 text-[var(--info)]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
