import {
  Check,
  AlertTriangle,
  XCircle,
  Info,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";

type ToastVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "loading";

interface ToastMessageProps {
  variant: ToastVariant;
  children: React.ReactNode;
  className?: string;
}

const variants = {
  success: {
    icon: Check,
    className:
      "bg-green-100 text-green-700 border-green-200",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "bg-amber-100 text-amber-700 border-amber-200",
  },
  error: {
    icon: XCircle,
    className:
      "bg-red-100 text-red-700 border-red-200",
  },
  info: {
    icon: Info,
    className:
      "bg-blue-100 text-blue-700 border-blue-200",
  },
  loading: {
    icon: Loader2,
    className:
      "bg-purple-100 text-purple-700 border-purple-200",
  },
};

export function ToastMessage({
  variant,
  children,
  className,
}: ToastMessageProps) {
  
  const { icon: Icon, className: styles } = variants[variant];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium",
        styles,
        className
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4",
          variant === "loading" && "animate-spin"
        )}
      />
      {children}
    </div>
  );
}