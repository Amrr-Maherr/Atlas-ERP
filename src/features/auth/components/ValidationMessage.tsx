import { AlertCircleIcon } from "lucide-react";

type ErrorMessageProps = {
  message?: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="flex items-center gap-1.5 text-sm font-medium text-destructive"
    >
      <AlertCircleIcon className="size-4 shrink-0" />
      {message}
    </p>
  );
}
