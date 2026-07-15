import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Sign in to Atlas
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the ERP system
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            required
            autoComplete="email"
          />
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </Field>
        <Field>
          <Button type="submit" className="w-full h-9">
            Sign in
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
