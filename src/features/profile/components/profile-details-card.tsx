import type { UserProfile } from "../types/profile.types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { formatDate } from "@/components/utils/format-date";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  Building2Icon,
  BriefcaseIcon,
  ShieldIcon,
  CalendarIcon,
  ClockIcon,
} from "lucide-react";

type ProfileDetailsCardProps = {
  user: UserProfile;
};

const roleColors: Record<string, "default" | "secondary" | "outline"> = {
  admin: "default",
  manager: "secondary",
  warehouse: "outline",
  cashier: "outline",
};

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ProfileDetailsCard({ user }: ProfileDetailsCardProps) {
  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Avatar className="size-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge variant={roleColors[user.role] ?? "secondary"}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Badge>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>Full Name</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-1.5">
                  <UserIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm">{user.name}</span>
                </div>
              </FieldContent>
            </Field>
            <Field orientation="vertical">
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-1.5">
                  <MailIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
              </FieldContent>
            </Field>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>Phone</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-1.5">
                  <PhoneIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              </FieldContent>
            </Field>
            <Field orientation="vertical">
              <FieldLabel>Department</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-1.5">
                  <Building2Icon className="size-4 text-muted-foreground" />
                  <span className="text-sm">{user.department}</span>
                </div>
              </FieldContent>
            </Field>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>Position</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-1.5">
                  <BriefcaseIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm">{user.position}</span>
                </div>
              </FieldContent>
            </Field>
            <Field orientation="vertical">
              <FieldLabel>Permissions</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-1.5">
                  <ShieldIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm">{user.permissions.join(", ")}</span>
                </div>
              </FieldContent>
            </Field>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <Field orientation="vertical">
              <FieldLabel>Joined</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              </FieldContent>
            </Field>
            <Field orientation="vertical">
              <FieldLabel>Last Login</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDateTime(user.lastLogin)}
                  </span>
                </div>
              </FieldContent>
            </Field>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
