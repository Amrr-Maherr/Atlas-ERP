"use client";

import { LoginForm } from "@/features/auth/components/login-form";
import { LayersIcon } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 p-6 lg:p-8">
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground">
            <LayersIcon className="size-4 text-background" />
          </div>
          <span className="text-base font-semibold text-foreground">
            Atlas ERP
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-[320px]">
            <LoginForm />
          </div>
        </div>
        <div className="px-6 pb-6 lg:px-8 lg:pb-8">
          <p className="text-xs text-muted-foreground">
            Atlas ERP &copy; {new Date().getFullYear()}. Internal use only.
          </p>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60" />
        <Image
          width={800}
          height={800}
          quality={90}
          priority
          src="/Dark analytics-rafiki.png"
          alt="Atlas ERP Analytics"
          className="relative z-10 h-auto w-full max-w-lg object-contain p-12 opacity-90"
        />
      </div>
    </div>
  );
}
