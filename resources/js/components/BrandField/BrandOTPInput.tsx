/**
 * BrandOTPInput Component
 *
 * An OTP (One-Time Password) input component for verification codes.
 * Built on top of shadcn/ui InputOTP with custom styling.
 *
 * @component
 * @example
 * ```tsx
 * <BrandOTPInput
 *   label="Verification Code"
 *   value={otp}
 *   onChange={(value) => setOtp(value)}
 *   length={6}
 * />
 * ```
 */


import { cn } from '@/lib/utils';
import type React from 'react';
import { Label } from '../ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

interface BrandOTPInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  length?: number;
  disabled?: boolean;
  error?: string;
  isRequired?: boolean;
  className?: string;
}

export const BrandOTPInput: React.FC<BrandOTPInputProps> = ({
  label,
  value = '',
  onChange,
  length = 6,
  disabled = false,
  error,
  isRequired = false,
  className = '',
}) => {
  const slots = Array.from({ length }, (_, i) => i);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">
          {label}
          {isRequired && <span className="text-xs text-red-600 ml-1">*</span>}
        </Label>
      )}
      <InputOTP
        maxLength={length}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={cn(className)}
      >
        <InputOTPGroup>
          {slots.map((slotIndex) => (
            <InputOTPSlot key={`slot-${slotIndex}`} index={slotIndex} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
    </div>
  );
};
