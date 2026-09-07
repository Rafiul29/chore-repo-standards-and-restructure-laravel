import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type InputSize = 'sm' | 'md' | 'lg';

export type InputVariant = 'default' | 'filled' | 'ghost';

export type FormInputType =
    | 'text'
    | 'email'
    | 'password'
    | 'search'
    | 'url'
    | 'tel'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'year'
    | 'textarea';

/* -------------------------------------------------------------------------- */
/* Temporal types                                                             */
/* -------------------------------------------------------------------------- */

const TEMPORAL_TYPES = new Set<FormInputType>([
    'date',
    'time',
    'datetime-local',
    'month',
    'week',
]);

/* -------------------------------------------------------------------------- */
/* Base props                                                                 */
/* -------------------------------------------------------------------------- */

interface FormFieldBaseProps {
    id?: string;
    label?: React.ReactNode;

    error?: React.ReactNode;
    helperText?: React.ReactNode;

    size?: InputSize;
    variant?: InputVariant;

    hideLabel?: boolean;
    wrapperClassName?: string;

    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Input props                                                                */
/* -------------------------------------------------------------------------- */

interface InputSpecificProps
    extends
        Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            keyof FormFieldBaseProps | 'size' | 'type' | 'onChange'
        >,
        FormFieldBaseProps {
    type?: Exclude<FormInputType, 'textarea'>;

    /**
     * Explicitly typed input change handler.
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    rightAction?: React.ReactNode;

    showCount?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Textarea props                                                             */
/* -------------------------------------------------------------------------- */

interface TextareaSpecificProps
    extends
        Omit<
            React.TextareaHTMLAttributes<HTMLTextAreaElement>,
            keyof FormFieldBaseProps | 'size' | 'type' | 'onChange'
        >,
        FormFieldBaseProps {
    type: 'textarea';

    /**
     * Explicitly typed textarea change handler.
     */
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

    showCount?: boolean;
    resizable?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Union                                                                      */
/* -------------------------------------------------------------------------- */

export type FormInputProps = InputSpecificProps | TextareaSpecificProps;

/* -------------------------------------------------------------------------- */
/* Size configuration                                                         */
/* -------------------------------------------------------------------------- */

const sizeConfig: Record<
    InputSize,
    {
        input: string;
        textarea: string;
        icon: string;
    }
> = {
    sm: {
        input: 'h-8 text-sm px-2.5',
        textarea: 'min-h-20 text-sm px-2.5 py-1.5',
        icon: 'size-3.5',
    },

    md: {
        input: 'h-9 text-sm px-3',
        textarea: 'min-h-24 text-sm px-3 py-2',
        icon: 'size-4',
    },

    lg: {
        input: 'h-11 text-base px-4',
        textarea: 'min-h-28 text-base px-4 py-2.5',
        icon: 'size-5',
    },
};

/* -------------------------------------------------------------------------- */
/* Variant configuration                                                      */
/* -------------------------------------------------------------------------- */

const variantConfig: Record<InputVariant, string> = {
    default: '',

    filled: 'bg-muted/50 border-transparent focus-visible:bg-background',

    ghost: 'border-transparent shadow-none bg-transparent focus-visible:border-input',
};

/* -------------------------------------------------------------------------- */
/* Described by                                                               */
/* -------------------------------------------------------------------------- */

function buildDescribedBy(
    id: string | undefined,
    error: React.ReactNode,
    helperText: React.ReactNode,
) {
    const ids: string[] = [];

    if (error && id) {
        ids.push(`${id}-error`);
    }

    if (helperText && id) {
        ids.push(`${id}-helper`);
    }

    return ids.length > 0 ? ids.join(' ') : undefined;
}

/* -------------------------------------------------------------------------- */
/* Input type                                                                 */
/* -------------------------------------------------------------------------- */

function resolvedInputType(
    type: Exclude<FormInputType, 'textarea'> | undefined,
): React.HTMLInputTypeAttribute {
    if (!type) {
        return 'text';
    }

    /**
     * "year" is not a native HTML input type.
     * We represent it using number.
     */
    if (type === 'year') {
        return 'number';
    }

    return type;
}

/* -------------------------------------------------------------------------- */
/* Year constraints                                                           */
/* -------------------------------------------------------------------------- */

function getYearConstraints(
    min?: React.InputHTMLAttributes<HTMLInputElement>['min'],
    max?: React.InputHTMLAttributes<HTMLInputElement>['max'],
) {
    const currentYear = new Date().getFullYear();

    return {
        min: min ?? 1900,
        max: max ?? currentYear + 10,
    };
}

/* -------------------------------------------------------------------------- */
/* Label                                                                      */
/* -------------------------------------------------------------------------- */

function FieldLabel({
    id,
    label,
    required,
    hideLabel,
}: {
    id?: string;
    label?: React.ReactNode;
    required?: boolean;
    hideLabel?: boolean;
}) {
    if (!label) {
        return null;
    }

    return (
        <label
            htmlFor={id}
            className={cn(
                'mb-1.5 block text-sm font-medium',
                hideLabel && 'sr-only',
            )}
        >
            {label}

            {required && <span className="text-destructive ml-1">*</span>}
        </label>
    );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

function FieldFooter({
    id,
    error,
    helperText,
    value,
    maxLength,
    showCount,
}: {
    id?: string;
    error?: React.ReactNode;
    helperText?: React.ReactNode;
    value?: unknown;
    maxLength?: number;
    showCount?: boolean;
}) {
    const currentLength =
        value === undefined || value === null ? 0 : String(value).length;

    const hasFooter =
        !!error || !!helperText || (showCount && maxLength !== undefined);

    if (!hasFooter) {
        return null;
    }

    return (
        <div className="mt-1.5 flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
                {error && (
                    <p
                        id={id ? `${id}-error` : undefined}
                        className="text-destructive text-sm"
                    >
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p
                        id={id ? `${id}-helper` : undefined}
                        className="text-muted-foreground text-sm"
                    >
                        {helperText}
                    </p>
                )}
            </div>

            {showCount && maxLength !== undefined && (
                <span
                    className={cn(
                        'shrink-0 text-xs',
                        currentLength >= maxLength
                            ? 'text-destructive'
                            : 'text-muted-foreground',
                    )}
                >
                    {currentLength}/{maxLength}
                </span>
            )}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* FormInput                                                                  */
/* -------------------------------------------------------------------------- */

const FormInput = React.forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    FormInputProps
>((props, ref) => {
    /* ====================================================================== */
    /* TEXTAREA                                                               */
    /* ====================================================================== */

    if (props.type === 'textarea') {
        const {
            id,
            label,
            error,
            helperText,

            size = 'md',
            variant = 'default',

            hideLabel = false,
            wrapperClassName,

            disabled,
            required,
            readOnly,

            showCount = false,
            resizable = true,

            className,
            onChange,
            maxLength,

            value,
            defaultValue,

            ...restTextarea
        } = props;

        const describedBy = buildDescribedBy(id, error, helperText);

        const currentValue =
            value !== undefined
                ? value
                : defaultValue !== undefined
                  ? defaultValue
                  : '';

        /* ------------------------------------------------------------------ */
        /* Textarea change handler                                            */
        /* ------------------------------------------------------------------ */

        const handleTextareaChange = (
            event: React.ChangeEvent<HTMLTextAreaElement>,
        ) => {
            let nextValue = event.target.value;

            if (maxLength !== undefined && nextValue.length > maxLength) {
                nextValue = nextValue.slice(0, maxLength);

                event.target.value = nextValue;
            }

            onChange?.(event);
        };

        return (
            <div className={cn('w-full', wrapperClassName)}>
                <FieldLabel
                    id={id}
                    label={label}
                    required={required}
                    hideLabel={hideLabel}
                />

                <Textarea
                    {...restTextarea}
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    id={id}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    required={required}
                    readOnly={readOnly}
                    maxLength={maxLength}
                    onChange={handleTextareaChange}
                    aria-invalid={!!error}
                    aria-describedby={describedBy}
                    className={cn(
                        sizeConfig[size].textarea,
                        variantConfig[variant],

                        !resizable && 'resize-none',

                        error &&
                            'border-destructive focus-visible:border-destructive',

                        className,
                    )}
                />

                <FieldFooter
                    id={id}
                    error={error}
                    helperText={helperText}
                    value={currentValue}
                    maxLength={maxLength}
                    showCount={showCount}
                />
            </div>
        );
    }

    /* ====================================================================== */
    /* INPUT                                                                  */
    /* ====================================================================== */

    const {
        id,
        label,
        error,
        helperText,

        size = 'md',
        variant = 'default',

        hideLabel = false,
        wrapperClassName,

        disabled,
        required,
        readOnly,

        leftIcon,
        rightIcon,
        rightAction,

        showCount = false,

        className,
        onChange,

        type,
        min,
        max,
        maxLength,

        value,
        defaultValue,

        ...restInput
    } = props;

    const inputType = resolvedInputType(type);

    const isYear = type === 'year';

    const yearConstraints = isYear
        ? getYearConstraints(min, max)
        : {
              min,
              max,
          };

    const describedBy = buildDescribedBy(id, error, helperText);

    const currentValue =
        value !== undefined
            ? value
            : defaultValue !== undefined
              ? defaultValue
              : '';

    /* ---------------------------------------------------------------------- */
    /* Input change handler                                                   */
    /* ---------------------------------------------------------------------- */

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
    };

    return (
        <div className={cn('w-full', wrapperClassName)}>
            <FieldLabel
                id={id}
                label={label}
                required={required}
                hideLabel={hideLabel}
            />

            <div className="relative">
                {leftIcon && (
                    <div
                        className={cn(
                            'text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2',
                            sizeConfig[size].icon,
                        )}
                    >
                        {leftIcon}
                    </div>
                )}

                <Input
                    {...restInput}
                    ref={ref as React.Ref<HTMLInputElement>}
                    id={id}
                    type={inputType}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    required={required}
                    readOnly={readOnly}
                    min={yearConstraints.min}
                    max={yearConstraints.max}
                    maxLength={maxLength}
                    onChange={handleInputChange}
                    aria-invalid={!!error}
                    aria-describedby={describedBy}
                    role={type === 'search' ? 'searchbox' : undefined}
                    className={cn(
                        sizeConfig[size].input,
                        variantConfig[variant],

                        leftIcon && 'pl-9',

                        (rightIcon || rightAction) && 'pr-9',

                        error &&
                            'border-destructive focus-visible:border-destructive',

                        className,
                    )}
                />

                {(rightIcon || rightAction) && (
                    <div
                        className={cn(
                            'text-muted-foreground absolute top-1/2 right-2 z-10 flex -translate-y-1/2 items-center gap-1',
                            sizeConfig[size].icon,
                        )}
                    >
                        {rightIcon}
                        {rightAction}
                    </div>
                )}
            </div>

            <FieldFooter
                id={id}
                error={error}
                helperText={helperText}
                value={currentValue}
                maxLength={maxLength}
                showCount={showCount}
            />
        </div>
    );
});

FormInput.displayName = 'FormInput';

export { FormInput };
