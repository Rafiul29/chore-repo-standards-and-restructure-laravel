import { cn } from '@/lib/utils';

export const errorClass = (message?: string) =>
  cn(message && 'border-red-500 focus-visible:ring-red-500');

interface FieldErrorProps {
  message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
  return message ? <p className="text-sm text-red-600">{message}</p> : null;
}