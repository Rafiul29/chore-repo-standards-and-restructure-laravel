/**
 * BrandSwitch Component
 *
 * A toggle switch component for boolean values.
 * Built on top of shadcn/ui Switch with custom styling.
 *
 * @component
 * @example
 * ```tsx
 * <BrandSwitch
 *   label="Enable Notifications"
 *   checked={notifications}
 *   onChange={(checked) => setNotifications(checked)}
 * />
 * ```
 */

import { cn } from '@/lib/utils';
import type React from 'react';
import { useId } from 'react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

interface BrandSwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  description?: string;
}

export const BrandSwitch: React.FC<BrandSwitchProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  className = '',
  description,
}) => {
  // Ties the visible label to the switch, so the switch has an accessible name.
  const switchId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <div className={cn('flex items-center justify-between gap-3', className)}>
        <div className="flex flex-col gap-0.5">
          {label && (
            <Label
              htmlFor={switchId}
              className="text-xs font-medium text-gray-700 dark:text-gray-200"
            >
              {label}
            </Label>
          )}
          {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
        <Switch id={switchId} checked={checked} onCheckedChange={onChange} disabled={disabled} />
      </div>
      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
    </div>
  );
};
