'use client';

/**
 * BrandRadioGroup Component
 *
 * A radio group component for selecting a single option from multiple choices.
 * Built on top of shadcn/ui RadioGroup with custom styling.
 *
 * @component
 * @example
 * ```tsx
 * <BrandRadioGroup
 *   label="Subscription Plan"
 *   value={selectedPlan}
 *   options={['Free', 'Pro', 'Enterprise']}
 *   theme={['red', 'amber', 'green']}
 *   onChange={(value) => setSelectedPlan(value)}
 * />
 * ```
 */


import { cn } from '@/lib/utils';
import type React from 'react';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type ThemeKey =
  | 'gray'
  | 'green'
  | 'yellow'
  | 'amber'
  | 'red'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'teal'
  | 'cyan'
  | 'indigo';

/**
 * Returns the Tailwind text classes for a given theme key.
 * Uses static class strings so Tailwind can include them in the build output.
 */
function getThemeTextClasses(themeKey?: ThemeKey) {
  const map: Record<ThemeKey, string> = {
    gray: 'text-gray-700 dark:text-gray-200',
    green: 'text-green-700 dark:text-green-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    amber: 'text-amber-700 dark:text-amber-400',
    red: 'text-red-700 dark:text-red-400',
    blue: 'text-blue-700 dark:text-blue-400',
    purple: 'text-purple-700 dark:text-purple-400',
    pink: 'text-pink-700 dark:text-pink-400',
    teal: 'text-teal-700 dark:text-teal-400',
    cyan: 'text-cyan-700 dark:text-cyan-400',
    indigo: 'text-indigo-700 dark:text-indigo-400',
  };

  return map[themeKey ?? 'gray'];
}

interface BrandRadioGroupOption {
  value: string;
  label: string;
}

interface BrandRadioGroupProps {
  label?: string;
  value?: string;
  options: string[] | BrandRadioGroupOption[];
  onChange?: (value: string) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
  error?: string;
  isRequired?: boolean;

  /**
   * Theme can be:
   * - an array (index-based): ['green','amber','red']
   * - a map (value-based): { Low:'green', Medium:'amber', High:'red' }
   */
  theme?: ThemeKey[] | Partial<Record<string, ThemeKey>>;

  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const BrandRadioGroup: React.FC<BrandRadioGroupProps> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
  error,
  isRequired = false,
  theme,
  className = '',
  defaultChecked,
  orientation = 'vertical',
}) => {
  const normalizedOptions: BrandRadioGroupOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  /**
   * Returns a theme key for the option using either theme map or theme array.
   */
  const resolveThemeKey = (option: BrandRadioGroupOption, index: number): ThemeKey | undefined => {
    if (!theme) return undefined;

    if (Array.isArray(theme)) {
      return theme[index];
    }

    return theme[option.value] ?? theme[option.label];
  };

  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">
          {label}
          {isRequired && <span className="text-xs text-red-600 ml-1">*</span>}
        </Label>
      )}

      <RadioGroup
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        defaultValue={defaultChecked ? value : undefined}
        className={cn(
          orientation === 'horizontal' ? 'flex flex-row gap-4' : 'flex flex-col gap-2',
          className
        )}
      >
        {normalizedOptions.map((option, index) => {
          const id = `radio-${option.value.toLowerCase().replace(/\s+/g, '-')}`;
          const themeKey = resolveThemeKey(option, index);

          return (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={id} />
              <Label
                onClick={(e) => e.preventDefault()}
                htmlFor={id}
                className={cn('text-xs font-normal cursor-pointer', getThemeTextClasses(themeKey))}
              >
                {option.label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
    </div>
  );
};
