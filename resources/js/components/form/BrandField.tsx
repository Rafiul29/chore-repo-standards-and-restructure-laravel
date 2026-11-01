import * as React from 'react';

import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'ghost';

export type BrandFieldType =
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
    | 'range'
    | 'textarea';

type NativeInputType = Exclude<BrandFieldType, 'textarea'>;

interface BrandFieldBaseProps {
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
    /**
     * Read-only mode only. Overrides the hover/focus tooltip.
     * Defaults to the full value (useful when the text is truncated).
     */
    tooltip?: React.ReactNode;
}

export interface BrandFieldSpecificProps
    extends Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            keyof BrandFieldBaseProps | 'size' | 'type' | 'onChange'
        >,
        BrandFieldBaseProps {
    type?: NativeInputType;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    rightAction?: React.ReactNode;
    showCount?: boolean;
}

export interface BrandTextareaSpecificProps
    extends Omit<
            React.TextareaHTMLAttributes<HTMLTextAreaElement>,
            keyof BrandFieldBaseProps | 'size' | 'type' | 'onChange'
        >,
        BrandFieldBaseProps {
    type: 'textarea';
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    showCount?: boolean;
    resizable?: boolean;
}

export type BrandFieldProps =
    | BrandFieldSpecificProps
    | BrandTextareaSpecificProps;

/* -------------------------------------------------------------------------- */
/* Style configuration                                                        */
/* -------------------------------------------------------------------------- */

const sizeConfig: Record<
    InputSize,
    {
        input: string;
        textarea: string;
        icon: string;
        iconLeft: string;
        iconRight: string;
        padLeft: string;
        padRight: string;
        padRightDouble: string;
    }
> = {
    sm: {
        input: 'h-8 text-sm px-2.5',
        textarea: 'min-h-20 text-sm px-2.5 py-1.5',
        icon: 'size-3.5',
        iconLeft: 'left-2.5',
        iconRight: 'right-2',
        padLeft: 'pl-8',
        padRight: 'pr-8',
        padRightDouble: 'pr-14',
    },
    md: {
        input: 'h-9 text-sm px-3',
        textarea: 'min-h-24 text-sm px-3 py-2',
        icon: 'size-4',
        iconLeft: 'left-3',
        iconRight: 'right-2.5',
        padLeft: 'pl-9',
        padRight: 'pr-9',
        padRightDouble: 'pr-16',
    },
    lg: {
        input: 'h-11 text-base px-4',
        textarea: 'min-h-28 text-base px-4 py-2.5',
        icon: 'size-5',
        iconLeft: 'left-4',
        iconRight: 'right-3',
        padLeft: 'pl-11',
        padRight: 'pr-11',
        padRightDouble: 'pr-20',
    },
};

const variantConfig: Record<InputVariant, string> = {
    default: '',
    filled: 'bg-muted/50 border-transparent focus-visible:bg-background',
    ghost: 'border-transparent shadow-none bg-transparent focus-visible:border-input',
};

const errorClassName =
    'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20';

/* -------------------------------------------------------------------------- */
/* Per-type browser hints (overridable by the caller)                         */
/* -------------------------------------------------------------------------- */

const typeDefaults: Record<
    NativeInputType,
    Partial<React.InputHTMLAttributes<HTMLInputElement>>
> = {
    text: {},
    email: {
        autoComplete: 'email',
        inputMode: 'email',
        autoCapitalize: 'off',
        spellCheck: false,
    },
    // Use autoComplete="new-password" on sign-up / change-password forms.
    password: {
        autoComplete: 'current-password',
        autoCapitalize: 'off',
        autoCorrect: 'off',
        spellCheck: false,
    },
    search: { inputMode: 'search', enterKeyHint: 'search' },
    url: { inputMode: 'url', autoCapitalize: 'off', spellCheck: false },
    tel: { autoComplete: 'tel', inputMode: 'tel' },
    number: { inputMode: 'decimal' },
    date: {},
    time: {},
    'datetime-local': {},
    month: {},
    week: {},
    // "year" is not a native type: a 4-digit numeric text field is safer
    // than type="number" (no e/+/-, no scroll-wheel changes).
    year: {
        inputMode: 'numeric',
        pattern: '[0-9]{4}',
        maxLength: 4,
        autoComplete: 'off',
    },
    // min / max / step / placeholder are passed straight through.
    range: {},
};

/** Types where maxLength / character counting is meaningful. */
const COUNTABLE_TYPES = new Set<NativeInputType>([
    'text',
    'email',
    'search',
    'url',
    'tel',
    'year',
]);

/** Validate a year value (client-side only; always re-validate on the server). */
export function isValidYear(
    value: string,
    min = 1900,
    max = new Date().getFullYear() + 10,
): boolean {
    if (!/^\d{4}$/.test(value)) return false;
    const year = Number(value);
    return year >= min && year <= max;
}

/* -------------------------------------------------------------------------- */
/* Hooks                                                                      */
/* -------------------------------------------------------------------------- */

function useMergedRef<T>(...refs: Array<React.Ref<T> | undefined>) {
    return React.useCallback(
        (node: T | null) => {
            for (const ref of refs) {
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as React.MutableRefObject<T | null>).current = node;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        refs,
    );
}

/**
 * Tracks the current value ONLY when it is needed (character counter).
 * - Controlled: reads `value` directly (no duplicate state).
 * - Uncontrolled: mirrors the DOM value and resyncs on form reset.
 * - Disabled: no state, no re-render on every keystroke.
 */
function useFieldValue<T extends HTMLInputElement | HTMLTextAreaElement>({
    value,
    defaultValue,
    enabled,
}: {
    value: unknown;
    defaultValue: unknown;
    enabled: boolean;
}) {
    const elementRef = React.useRef<T | null>(null);
    const isControlled = value !== undefined;

    const [uncontrolled, setUncontrolled] = React.useState(() =>
        enabled ? String(defaultValue ?? '') : '',
    );

    React.useEffect(() => {
        if (!enabled || isControlled) return;

        // Pick up the browser's real initial value (e.g. a range's default midpoint).
        setUncontrolled(elementRef.current?.value ?? '');

        const form = elementRef.current?.form;
        if (!form) return;

        const handleReset = () => {
            // "reset" fires before the DOM values are restored.
            window.setTimeout(
                () => setUncontrolled(elementRef.current?.value ?? ''),
                0,
            );
        };

        form.addEventListener('reset', handleReset);
        return () => form.removeEventListener('reset', handleReset);
    }, [enabled, isControlled]);

    const onValueChange = (next: string) => {
        if (enabled && !isControlled) setUncontrolled(next);
    };

    const text = enabled
        ? String(isControlled ? (value ?? '') : uncontrolled)
        : '';

    return { elementRef, length: text.length, text, onValueChange };
}

/* -------------------------------------------------------------------------- */
/* Shared helpers                                                             */
/* -------------------------------------------------------------------------- */

function buildDescribedBy(
    id: string,
    error: React.ReactNode,
    helperText: React.ReactNode,
    callerDescribedBy?: string,
) {
    const own = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;
    const merged = [callerDescribedBy, own].filter(Boolean).join(' ');
    return merged || undefined;
}

function FieldLabel({
    id,
    label,
    required,
    hideLabel,
}: {
    id: string;
    label?: React.ReactNode;
    required?: boolean;
    hideLabel?: boolean;
}) {
    if (!label) return null;

    return (
        <label
            htmlFor={id}
            className={cn('mb-1.5 block text-sm font-medium', hideLabel && 'sr-only')}
        >
            {label}
            {required && (
                <span aria-hidden="true" className="text-destructive ml-1">
                    *
                </span>
            )}
        </label>
    );
}

function FieldFooter({
    id,
    error,
    helperText,
    length,
    maxLength,
    showCount,
}: {
    id: string;
    error?: React.ReactNode;
    helperText?: React.ReactNode;
    length: number;
    maxLength?: number;
    showCount?: boolean;
}) {
    const counter = showCount && maxLength !== undefined ? maxLength : undefined;

    if (!error && !helperText && counter === undefined) return null;

    // Only announce the counter to screen readers when the limit is near,
    // otherwise every keystroke is read out.
    const nearLimit = counter !== undefined && length >= counter * 0.9;

    return (
        <div className="mt-0.5 flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
                {error ? (
                    <p id={`${id}-error`} role="alert" className="text-destructive text-sm">
                        {error}
                    </p>
                ) : helperText ? (
                    <p id={`${id}-helper`} className="text-muted-foreground text-sm">
                        {helperText}
                    </p>
                ) : null}
            </div>

            {counter !== undefined && (
                <span
                    aria-live={nearLimit ? 'polite' : 'off'}
                    className={cn(
                        'shrink-0 text-xs',
                        length >= counter ? 'text-destructive' : 'text-muted-foreground',
                    )}
                >
                    {length}/{counter}
                </span>
            )}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Read-only display                                                          */
/* -------------------------------------------------------------------------- */

const MASK = '\u2022'.repeat(8);

/**
 * Read-only mode: renders "label + plain text" (no input box).
 * - Full value appears in a tooltip on hover and keyboard focus.
 * - Passwords are masked and never shown in the tooltip.
 * - `disabled` keeps its look (dimmed, not-allowed) and drops the tooltip.
 */
function ReadOnlyField({
    id,
    label,
    hideLabel,
    text,
    masked = false,
    multiline = false,
    tooltip,
    disabled,
    wrapperClassName,
    size,
    error,
    helperText,
    submitField,
}: {
    id: string;
    label?: React.ReactNode;
    hideLabel?: boolean;
    text: string;
    masked?: boolean;
    multiline?: boolean;
    tooltip?: React.ReactNode;
    disabled?: boolean;
    wrapperClassName?: string;
    size: InputSize;
    error?: React.ReactNode;
    helperText?: React.ReactNode;
    /** Hidden field so the value still submits with the form, like a real readOnly input. */
    submitField?: React.ReactNode;
}) {
    const hasValue = text !== '';
    const shown = masked && hasValue ? MASK : text;

    const tip =
        disabled || multiline
            ? undefined
            : (tooltip ?? (masked || !hasValue ? undefined : text));

    const tipId = `${id}-tooltip`;

    return (
        <div className={cn('w-full', wrapperClassName)}>
            <dl>
                {label && (
                    <dt
                        className={cn(
                            'text-muted-foreground mb-1 text-sm font-medium',
                            hideLabel && 'sr-only',
                        )}
                    >
                        {label}
                    </dt>
                )}

                <dd className="group relative m-0">
                    <span
                        id={id}
                        tabIndex={tip ? 0 : undefined}
                        aria-describedby={tip ? tipId : undefined}
                        className={cn(
                            'text-foreground block rounded-sm py-1 outline-none',
                            'focus-visible:ring-ring/50 focus-visible:ring-2',
                            size === 'lg' ? 'text-base' : 'text-sm',
                            multiline ? 'break-words whitespace-pre-wrap' : 'truncate',
                            disabled && 'cursor-not-allowed opacity-50',
                        )}
                    >
                        {hasValue ? (
                            shown
                        ) : (
                            <>
                                <span aria-hidden="true" className="text-muted-foreground">
                                    &mdash;
                                </span>
                                <span className="sr-only">No value</span>
                            </>
                        )}
                    </span>

                    {tip && (
                        <span
                            id={tipId}
                            role="tooltip"
                            className={cn(
                                'pointer-events-none absolute bottom-full left-0 z-20 mb-1 w-max max-w-xs',
                                'bg-foreground text-background rounded-md px-2 py-1 text-xs break-words shadow-md',
                                'opacity-0 transition-opacity motion-reduce:transition-none',
                                'group-focus-within:opacity-100 group-hover:opacity-100',
                            )}
                        >
                            {tip}
                        </span>
                    )}
                </dd>
            </dl>

            {submitField}

            <FieldFooter id={id} error={error} helperText={helperText} length={0} />
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Textarea field                                                             */
/* -------------------------------------------------------------------------- */

const BrandTextareaField = React.forwardRef<
    HTMLTextAreaElement,
    BrandTextareaSpecificProps
>(function BrandTextareaField(props, forwardedRef) {
    const {
        id: idProp,
        // `type` must not reach the DOM (<textarea type="textarea"> is invalid).
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        type: _type,
        label,
        error,
        helperText,
        size = 'md',
        variant = 'default',
        hideLabel = false,
        wrapperClassName,
        required,
        disabled,
        readOnly,
        tooltip,
        name,
        showCount = false,
        resizable = true,
        className,
        onChange,
        maxLength,
        value,
        defaultValue,
        'aria-describedby': callerDescribedBy,
        ...rest
    } = props;

    const generatedId = React.useId();
    const fieldId = idProp ?? `brand-input-${generatedId}`;

    const { elementRef, length, onValueChange } = useFieldValue<HTMLTextAreaElement>({
        value,
        defaultValue,
        enabled: showCount,
    });

    const ref = useMergedRef<HTMLTextAreaElement>(elementRef, forwardedRef);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onValueChange(event.target.value);
        onChange?.(event);
    };

    if (readOnly) {
        const text = String(value ?? defaultValue ?? '');

        return (
            <ReadOnlyField
                id={fieldId}
                label={label}
                hideLabel={hideLabel}
                text={text}
                multiline
                disabled={disabled}
                wrapperClassName={wrapperClassName}
                size={size}
                error={error}
                helperText={helperText}
                submitField={
                    <textarea
                        hidden
                        readOnly
                        ref={ref}
                        name={disabled ? undefined : name}
                        value={text}
                    />
                }
            />
        );
    }

    return (
        <div className={cn('w-full', wrapperClassName)}>
            <FieldLabel
                id={fieldId}
                label={label}
                required={required}
                hideLabel={hideLabel}
            />

            <Textarea
                {...rest}
                ref={ref}
                id={fieldId}
                value={value}
                defaultValue={defaultValue}
                name={name}
                disabled={disabled}
                required={required}
                maxLength={maxLength}
                onChange={handleChange}
                aria-invalid={error ? true : undefined}
                aria-describedby={buildDescribedBy(
                    fieldId,
                    error,
                    helperText,
                    callerDescribedBy,
                )}
                className={cn(
                    sizeConfig[size].textarea,
                    variantConfig[variant],
                    !resizable && 'resize-none',
                    error && errorClassName,
                    className,
                )}
            />

            <FieldFooter
                id={fieldId}
                error={error}
                helperText={helperText}
                length={length}
                maxLength={maxLength}
                showCount={showCount}
            />
        </div>
    );
});

/* -------------------------------------------------------------------------- */
/* Input field                                                                */
/* -------------------------------------------------------------------------- */

const BrandFieldField = React.forwardRef<HTMLInputElement, BrandFieldSpecificProps>(
    function BrandFieldField(props, forwardedRef) {
        const {
            id: idProp,
            type = 'text',
            label,
            error,
            helperText,
            size = 'md',
            variant = 'default',
            hideLabel = false,
            wrapperClassName,
            required,
            disabled,
            readOnly,
            tooltip,
            name,
            leftIcon,
            rightIcon,
            rightAction,
            showCount = false,
            className,
            onChange,
            onWheel,
            maxLength,
            value,
            defaultValue,
            'aria-describedby': callerDescribedBy,
            ...rest
        } = props;

        const generatedId = React.useId();
        const fieldId = idProp ?? `brand-input-${generatedId}`;

        const defaults = typeDefaults[type];
        const isYear = type === 'year';
        const effectiveMaxLength = maxLength ?? defaults.maxLength;

        // Never mirror passwords (or non-text types) into React state.
        const trackValue = showCount && COUNTABLE_TYPES.has(type);
        const isRange = type === 'range';

        const { elementRef, length, text, onValueChange } =
            useFieldValue<HTMLInputElement>({
                value,
                defaultValue,
                enabled: (trackValue || isRange) && !readOnly,
            });

        const ref = useMergedRef<HTMLInputElement>(elementRef, forwardedRef);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (isYear) {
                // Keep digits only; parent handlers then see the clean value.
                event.target.value = event.target.value.replace(/\D/g, '');
            }
            onValueChange(event.target.value);
            onChange?.(event);
        };

        // Prevent accidental value changes from scrolling over a focused number field.
        const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
            if (type === 'number') event.currentTarget.blur();
            onWheel?.(event);
        };

        const rightCount = (rightIcon ? 1 : 0) + (rightAction ? 1 : 0);
        const s = sizeConfig[size];

        if (readOnly) {
            const readOnlyText = String(value ?? defaultValue ?? '');

            return (
                <ReadOnlyField
                    id={fieldId}
                    label={label}
                    hideLabel={hideLabel}
                    text={readOnlyText}
                    masked={type === 'password'}
                    tooltip={tooltip}
                    disabled={disabled}
                    wrapperClassName={wrapperClassName}
                    size={size}
                    error={error}
                    helperText={helperText}
                    submitField={
                        <input
                            ref={ref}
                            type="hidden"
                            name={disabled ? undefined : name}
                            value={readOnlyText}
                            readOnly
                        />
                    }
                />
            );
        }

        return (
            <div className={cn('w-full', wrapperClassName)}>
                <FieldLabel
                    id={fieldId}
                    label={label}
                    required={required}
                    hideLabel={hideLabel}
                />

                <div className={cn('relative', isRange && 'flex items-center gap-3')}>
                    {leftIcon && (
                        <span
                            aria-hidden="true"
                            className={cn(
                                'text-muted-foreground pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 [&>svg]:size-full',
                                s.icon,
                                s.iconLeft,
                            )}
                        >
                            {leftIcon}
                        </span>
                    )}

                    <Input
                        {...defaults}
                        {...rest}
                        ref={ref}
                        id={fieldId}
                        type={isYear ? 'text' : type}
                        value={value}
                        defaultValue={defaultValue}
                        name={name}
                        disabled={disabled}
                        required={required}
                        maxLength={effectiveMaxLength}
                        onChange={handleChange}
                        onWheel={handleWheel}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={buildDescribedBy(
                            fieldId,
                            error,
                            helperText,
                            callerDescribedBy,
                        )}
                        className={cn(
                            isRange
                                ? 'accent-primary h-5 flex-1 cursor-pointer border-0 bg-transparent p-0 shadow-none'
                                : [s.input, variantConfig[variant]],
                            leftIcon && s.padLeft,
                            rightCount === 1 && s.padRight,
                            rightCount === 2 && s.padRightDouble,
                            error && errorClassName,
                            className,
                        )}
                    />

                    {isRange && (
                        <output
                            htmlFor={fieldId}
                            className="text-muted-foreground min-w-8 text-right text-sm tabular-nums"
                        >
                            {text}
                        </output>
                    )}

                    {rightCount > 0 && (
                        <div
                            className={cn(
                                'text-muted-foreground absolute top-1/2 z-10 flex -translate-y-1/2 items-center gap-1',
                                s.iconRight,
                            )}
                        >
                            {rightIcon && (
                                <span
                                    aria-hidden="true"
                                    className={cn('pointer-events-none [&>svg]:size-full', s.icon)}
                                >
                                    {rightIcon}
                                </span>
                            )}
                            {rightAction}
                        </div>
                    )}
                </div>

                <FieldFooter
                    id={fieldId}
                    error={error}
                    helperText={helperText}
                    length={length}
                    maxLength={effectiveMaxLength}
                    showCount={trackValue}
                />
            </div>
        );
    },
);

/* -------------------------------------------------------------------------- */
/* BrandField (thin dispatcher: no hooks, so no conditional-hook risk)        */
/* -------------------------------------------------------------------------- */

const BrandFieldImpl = React.forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    BrandFieldProps
>(function BrandField(props, ref) {
    if (props.type === 'textarea') {
        return (
            <BrandTextareaField
                {...props}
                ref={ref as React.Ref<HTMLTextAreaElement>}
            />
        );
    }

    return <BrandFieldField {...props} ref={ref as React.Ref<HTMLInputElement>} />;
});

BrandFieldImpl.displayName = 'BrandField';

/**
 * Overloaded signature so consumers get a correctly typed ref:
 * <BrandField ref={inputRef} />                  -> HTMLInputElement
 * <BrandField type="textarea" ref={textareaRef} /> -> HTMLTextAreaElement
 */
type BrandFieldComponent = {
    (
        props: BrandFieldSpecificProps & React.RefAttributes<HTMLInputElement>,
    ): React.ReactElement | null;
    (
        props: BrandTextareaSpecificProps & React.RefAttributes<HTMLTextAreaElement>,
    ): React.ReactElement | null;
    displayName?: string;
};

export const BrandField = BrandFieldImpl as unknown as BrandFieldComponent;