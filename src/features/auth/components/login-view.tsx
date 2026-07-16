"use client";

import { LoginForm } from "@/features/auth/components/login-form";
import { LayersIcon } from "lucide-react";
import Image from "next/image";

export function LoginView() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 p-6 lg:p-10">
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground">
            <LayersIcon className="size-4 text-background" />
          </div>
          <span className="text-base font-semibold text-foreground">
            Atlas ERP
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-lg">
            <LoginForm />
          </div>
        </div>
        <div className="px-6 pb-6 lg:px-10 lg:pb-10">
          <p className="text-xs text-muted-foreground">
            Atlas ERP &copy; {new Date().getFullYear()}. Internal use only.
          </p>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <Image
          width={1000}
          height={1000}
          quality={90}
          priority
          src="/download.svg"
          alt="Atlas ERP Analytics"
          className="relative z-10 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
