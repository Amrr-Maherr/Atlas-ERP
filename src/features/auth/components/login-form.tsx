import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { ValidationMessage } from "./ValidationMessage";
import { createClient } from "@/lib/supabase/client";
type Inputs = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const supabase = createClient();
    const response = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    console.log(response);
    console.log(errors);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
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
            aria-invalid={!!errors.email}
            {...register("email", { required: "Email is required" })}
            className={`${errors.email ? "border-solid border-red-500" : ""}`}
          />
        </Field>
        {errors.email && <ValidationMessage message={errors.email?.message} />}
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
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Password must not exceed 10 characters",
                },
              })}
              className={`${errors.password ? "border-solid border-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
        </Field>
        {errors.password && (
          <ValidationMessage message={errors.password?.message} />
        )}
        <Field>
          <Button type="submit" className="w-full h-9">
            Sign in
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
