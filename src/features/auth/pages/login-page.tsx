import type { Metadata } from "next";
import { LoginView } from "@/features/auth/components/login-view";

export const metadata: Metadata = {
  title: "Login | Atlas ERP",
  description:
    "Sign in to your Atlas ERP account to securely access your dashboard and manage your workspace.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginView />;
}
