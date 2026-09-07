import * as React from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface FormTextareaProps {
    id: string;
    name?: string;
    label?: string;
    placeholder?: string;

    value?: string;
    defaultValue?: string;

    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;

    disabled?: boolean;
    required?: boolean;

    rows?: number;

    className?: string;

    /**
     * Maximum number of characters allowed.
     */
    maxLength?: number;

    /**
     * Show character counter.
     */
    showCharacterCount?: boolean;

    /**
     * Show remaining character count.
     */
    showRemainingCount?: boolean;

    /**
     * Optional helper text below textarea.
     */
    description?: string;
}

export function FormTextarea({
    id,
    name,
    label,
    placeholder,
    value,
    defaultValue,
    onChange,
    disabled,
    required,
    rows = 4,
    className = 'w-full',

    maxLength,
    showCharacterCount = false,
    showRemainingCount = false,

    description,
}: FormTextareaProps) {
    /**
     * Controlled value
     */
    const controlledValue = value !== undefined ? value : '';

    /**
     * Local value is only used for:
     * - uncontrolled textarea
     * - live character counter
     */
    const [internalValue, setInternalValue] = React.useState<string>(
        defaultValue ?? '',
    );

    /**
     * Keep local counter synchronized
     * when controlled value changes.
     */
    React.useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);

    /**
     * Current textarea value
     */
    const currentValue = value !== undefined ? controlledValue : internalValue;

    /**
     * Current character length
     */
    const characterCount = currentValue.length;

    /**
     * Remaining characters
     */
    const remainingCount =
        maxLength !== undefined
            ? Math.max(maxLength - characterCount, 0)
            : undefined;

    /**
     * Maximum length reached
     */
    const isLimitReached =
        maxLength !== undefined && characterCount >= maxLength;

    /**
     * Handle change
     */
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        let nextValue = event.target.value;

        /**
         * Extra protection:
         * Never allow more than maxLength.
         */
        if (maxLength !== undefined && nextValue.length > maxLength) {
            nextValue = nextValue.slice(0, maxLength);

            event.target.value = nextValue;
        }

        /**
         * Update local value
         */
        setInternalValue(nextValue);

        /**
         * Call parent onChange
         */
        onChange?.(event);
    };

    /**
     * Whether counter should be visible.
     */
    const showCounter =
        maxLength !== undefined && (showCharacterCount || showRemainingCount);

    return (
        <div className="space-y-2">
            {/* ================================================
          LABEL
      ================================================ */}

            {label && (
                <Label htmlFor={id} className="text-sm font-medium">
                    {label}

                    {required && (
                        <span className="text-destructive ml-1">*</span>
                    )}
                </Label>
            )}

            {/* ================================================
          TEXTAREA
      ================================================ */}

            <Textarea
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                disabled={disabled}
                required={required}
                rows={rows}
                maxLength={maxLength}
                className={cn('resize-y', className)}
            />

            {/* ================================================
          DESCRIPTION + CHARACTER COUNT
      ================================================ */}

            {(description || showCounter) && (
                <div className="flex items-start justify-between gap-3">
                    {/* Description */}
                    {description ? (
                        <p className="text-muted-foreground text-xs">
                            {description}
                        </p>
                    ) : (
                        <span />
                    )}

                    {/* Character Counter */}
                    {showCounter && (
                        <div
                            className={cn(
                                'shrink-0 text-xs',
                                isLimitReached
                                    ? 'text-destructive font-semibold'
                                    : 'text-muted-foreground',
                            )}
                        >
                            {showCharacterCount &&
                                `${characterCount}/${maxLength}`}

                            {showCharacterCount && showRemainingCount && ' • '}

                            {showRemainingCount && `${remainingCount} left`}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
