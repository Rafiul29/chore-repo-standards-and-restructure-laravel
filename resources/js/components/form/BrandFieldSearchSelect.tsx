"use client";

import { Check, ChevronDown, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface ComboboxOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface FormSelectSearchLabels {
    clear: string;
    clearAll: string;
    remove: string;
    selected: string;
    loading: string;
    selectedCount: (count: number) => string;
    moreSelected: (count: number) => string;
    maxSelected: (max: number) => string;
}

const defaultLabels: FormSelectSearchLabels = {
    clear: "Clear selection",
    clearAll: "Clear all",
    remove: "Remove",
    selected: "selected",
    loading: "Loading...",
    selectedCount: (count) => `${count} selected`,
    moreSelected: (count) => `${count} more selected`,
    maxSelected: (max) => `Maximum of ${max} selected`,
};

interface FormSelectSearchBaseProps {
    id?: string;
    /** Submitted with the form (hidden input). For PHP/Laravel arrays use "ids[]". */
    name?: string;
    label?: string;
    required?: boolean;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    options?: ComboboxOption[];
    /** Styles the field box (the bordered control). */
    className?: string;
    /** Styles the outer wrapper (label + field + messages). */
    wrapperClassName?: string;
    disabled?: boolean;
    /** Auto-select when there is exactly one (enabled) option. */
    autoSelectSingleOption?: boolean;
    /** Show the clear button(s). Default: true. */
    clearable?: boolean;
    /** Show a loading state in the list while options are being fetched. */
    loading?: boolean;
    /** Validation message. Turns the field red and is announced to screen readers. */
    error?: React.ReactNode;
    helperText?: React.ReactNode;
    /** Called when the popover closes (use it to mark the field as "touched"). */
    onBlur?: () => void;
    /** Override any built-in text (i18n). */
    labels?: Partial<FormSelectSearchLabels>;
}

export interface FormSelectSearchSingleProps extends FormSelectSearchBaseProps {
    multiple?: false;
    /** Controlled value. Use "" for "nothing selected" - never `undefined`. */
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}

export interface FormSelectSearchMultipleProps extends FormSelectSearchBaseProps {
    multiple: true;
    /** Controlled value. Use [] for "nothing selected" - never `undefined`. */
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (values: string[]) => void;
    /** Maximum number of selectable options. */
    maxSelected?: number;
    /** Show at most this many chips, then "+N". */
    maxVisibleChips?: number;
}

export type FormSelectSearchProps =
    | FormSelectSearchSingleProps
    | FormSelectSearchMultipleProps;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const EMPTY_OPTIONS: ComboboxOption[] = [];

/** Turns anything the parent might pass (string, array, null, junk) into a clean string[]. */
function normalizeValues(
    input: string | string[] | null | undefined,
    multiple: boolean,
): string[] {
    const list = Array.isArray(input)
        ? input.filter((v): v is string => typeof v === "string" && v !== "")
        : typeof input === "string" && input !== ""
          ? [input]
          : [];

    const unique = Array.from(new Set(list));

    return multiple ? unique : unique.slice(0, 1);
}

interface ResolvedOption extends ComboboxOption {
    /** The selected value is not in `options` (stale, removed, or still loading). */
    missing?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function BrandFieldSearchSelect(props: FormSelectSearchProps) {
    const {
        id: idProp,
        name,
        label,
        required = false,
        placeholder = "Select an option",
        searchPlaceholder = "Search...",
        emptyMessage = "No item found.",
        options = EMPTY_OPTIONS,
        className,
        wrapperClassName,
        disabled = false,
        autoSelectSingleOption = false,
        clearable = true,
        loading = false,
        error,
        helperText,
        onBlur,
        labels: labelOverrides,
    } = props;

    const multiple = props.multiple === true;
    const maxSelected = props.multiple ? props.maxSelected : undefined;
    const maxVisibleChips = props.multiple ? props.maxVisibleChips : undefined;

    const labels = React.useMemo(
        () => ({ ...defaultLabels, ...labelOverrides }),
        [labelOverrides],
    );

    // A unique id per instance, so several selects on one page keep their own labels.
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const describedBy = error ? errorId : helperText ? helperId : undefined;

    const triggerRef = React.useRef<HTMLButtonElement>(null);

    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const isOpen = open && !disabled;

    /* ------------------------------ options -------------------------------- */

    // Drop duplicate values (first wins) so keys and selection never collide.
    const { uniqueOptions, optionMap } = React.useMemo(() => {
        const map = new Map<string, ComboboxOption>();

        for (const option of options) {
            if (
                option &&
                typeof option.value === "string" &&
                !map.has(option.value)
            ) {
                map.set(option.value, option);
            }
        }

        return { uniqueOptions: Array.from(map.values()), optionMap: map };
    }, [options]);

    const singleOptionValue =
        uniqueOptions.length === 1 && !uniqueOptions[0].disabled
            ? uniqueOptions[0].value
            : null;

    /* ------------------------------- value --------------------------------- */

    const isControlled = props.value !== undefined;

    const [internal, setInternal] = React.useState<string[]>(() =>
        normalizeValues(props.defaultValue, multiple),
    );

    const selected = React.useMemo(
        () => normalizeValues(isControlled ? props.value : internal, multiple),
        [isControlled, props.value, internal, multiple],
    );

    const selectedSet = React.useMemo(() => new Set(selected), [selected]);
    const hasValue = selected.length > 0;

    // A selected value that is missing from `options` is still shown (and can be removed).
    const selectedOptions: ResolvedOption[] = React.useMemo(
        () =>
            selected.map(
                (value) =>
                    optionMap.get(value) ?? {
                        value,
                        label: value,
                        missing: true,
                    },
            ),
        [selected, optionMap],
    );

    const commit = (next: string[]) => {
        const normalized = normalizeValues(next, multiple);

        if (!isControlled) {
            setInternal(normalized);
        }

        if (props.multiple) {
            props.onValueChange?.(normalized);
        } else {
            props.onValueChange?.(normalized[0] ?? "");
        }
    };

    // Always call the latest `commit` from effects without re-running them.
    const commitRef = React.useRef(commit);

    React.useEffect(() => {
        commitRef.current = commit;
    });

    /* --------------------------- auto-select one --------------------------- */

    const autoRef = React.useRef<{
        requested: string | null;
        cleared: string | null;
    }>({ requested: null, cleared: null });

    React.useEffect(() => {
        const state = autoRef.current;

        if (!autoSelectSingleOption || disabled || !singleOptionValue) {
            state.requested = null;

            if (!singleOptionValue) {
                state.cleared = null;
            }

            return;
        }

        if (hasValue) {
            state.requested = null;
            state.cleared = null;

            return;
        }

        // The user cleared it on purpose, or we already asked the parent.
        if (
            state.cleared === singleOptionValue ||
            state.requested === singleOptionValue
        ) {
            return;
        }

        state.requested = singleOptionValue;
        commitRef.current([singleOptionValue]);
    }, [autoSelectSingleOption, disabled, singleOptionValue, hasValue]);

    /* ------------------------------ handlers ------------------------------- */

    /** Every user-driven change goes through here. */
    const userCommit = (next: string[]) => {
        autoRef.current.requested = null;
        autoRef.current.cleared =
            next.length === 0 && singleOptionValue ? singleOptionValue : null;

        commit(next);
    };

    const atLimit =
        multiple && maxSelected !== undefined && selected.length >= maxSelected;

    const handleSelect = (optionValue: string) => {
        if (!multiple) {
            userCommit([optionValue]);
            handleOpenChange(false);

            return;
        }

        if (selectedSet.has(optionValue)) {
            userCommit(selected.filter((value) => value !== optionValue));

            return;
        }

        if (atLimit) {
            return;
        }

        // Multiple: keep the list open so several options can be picked in a row.
        userCommit([...selected, optionValue]);
    };

    const handleRemove = (optionValue: string) => {
        userCommit(selected.filter((value) => value !== optionValue));
        triggerRef.current?.focus();
    };

    const handleClear = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        userCommit([]);
        triggerRef.current?.focus();
    };

    const removeLast = () => {
        if (multiple && selected.length > 0) {
            userCommit(selected.slice(0, -1));
        }
    };

    const handleOpenChange = (next: boolean) => {
        if (disabled && next) {
            return;
        }

        setOpen(next);

        if (!next) {
            setSearch("");
            onBlur?.();
        }
    };

    const handleTriggerKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement>,
    ) => {
        if (event.key === "Backspace" && !isOpen && !disabled) {
            removeLast();
        }
    };

    const handleSearchKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Backspace" && search === "") {
            removeLast();
        }
    };

    /* ------------------------------- display ------------------------------- */

    const showClear =
        clearable && !disabled && (multiple ? selected.length > 1 : hasValue);

    const visibleChips =
        maxVisibleChips !== undefined
            ? selectedOptions.slice(0, Math.max(0, maxVisibleChips))
            : selectedOptions;

    const hiddenChipCount = selectedOptions.length - visibleChips.length;

    const triggerText = multiple ? (
        hasValue ? (
            <span className="sr-only">
                {labels.selectedCount(selected.length)}
            </span>
        ) : (
            placeholder
        )
    ) : (
        (selectedOptions[0]?.label ?? placeholder)
    );

    return (
        <div className={cn("flex min-w-0 flex-col gap-1", wrapperClassName)}>
            {label && (
                <Label
                    htmlFor={id}
                    className="text-foreground text-xs font-semibold"
                >
                    {label}

                    {required && (
                        <span
                            aria-hidden="true"
                            className="text-destructive ml-1"
                        >
                            *
                        </span>
                    )}
                </Label>
            )}

            <Popover open={isOpen} onOpenChange={handleOpenChange}>
                <div
                    className={cn(
                        "border-input relative flex w-full min-w-0 items-center rounded-md border bg-transparent",
                        "shadow-xs transition-colors focus-within:border-primary",
                        multiple ? "min-h-8" : "h-8",
                        error &&
                            "border-destructive focus-within:border-destructive",
                        disabled && "cursor-not-allowed opacity-50",
                        className,
                    )}
                >
                    {/* The real trigger covers the whole box, so clicking anywhere opens the list. */}
                    <PopoverTrigger asChild>
                        <Button
                            ref={triggerRef}
                            id={id}
                            type="button"
                            variant="ghost"
                            role="combobox"
                            size="sm"
                            aria-expanded={isOpen}
                            aria-haspopup="listbox"
                            aria-required={required || undefined}
                            aria-invalid={error ? true : undefined}
                            aria-describedby={describedBy}
                            disabled={disabled}
                            onKeyDown={handleTriggerKeyDown}
                            className={cn(
                                "absolute inset-0 h-full w-full min-w-0 items-center justify-between rounded-md",
                                "border-0 bg-transparent px-2 text-xs font-normal shadow-none",
                                "hover:bg-transparent dark:hover:bg-transparent",
                                "focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-100",
                                !hasValue && "text-muted-foreground",
                                showClear && "pr-14",
                            )}
                        >
                            <span className="min-w-0 flex-1 truncate text-left text-xs">
                                {triggerText}
                            </span>

                            <ChevronDown
                                aria-hidden="true"
                                className="text-muted-foreground h-4 w-4 shrink-0 opacity-50"
                            />
                        </Button>
                    </PopoverTrigger>

                    {/* Multiple: one chip per value, each with its own close button. */}
                    {multiple && hasValue && (
                        <ul
                            aria-label={labels.selectedCount(selected.length)}
                            className={cn(
                                "pointer-events-none relative flex min-w-0 flex-1 flex-wrap items-center gap-1 py-1 pl-2",
                                showClear ? "pr-14" : "pr-8",
                            )}
                        >
                            {visibleChips.map((option) => (
                                <li
                                    key={option.value}
                                    className={cn(
                                        "bg-secondary text-secondary-foreground inline-flex max-w-full items-center gap-0.5",
                                        "rounded-sm py-0.5 pr-0.5 pl-1.5 text-xs",
                                        option.missing &&
                                            "text-muted-foreground italic",
                                    )}
                                >
                                    <span
                                        className="min-w-0 truncate"
                                        title={option.label}
                                    >
                                        {option.label}
                                    </span>

                                    {!disabled && (
                                        <button
                                            type="button"
                                            aria-label={`${labels.remove} ${option.label}`}
                                            onClick={() =>
                                                handleRemove(option.value)
                                            }
                                            className={cn(
                                                "pointer-events-auto relative z-10 flex size-4 shrink-0 items-center justify-center rounded-sm",
                                                "text-muted-foreground hover:bg-foreground/10 hover:text-foreground",
                                                "focus-visible:ring-ring/50 outline-none focus-visible:ring-2",
                                            )}
                                        >
                                            <X
                                                aria-hidden="true"
                                                className="h-3 w-3"
                                            />
                                        </button>
                                    )}
                                </li>
                            ))}

                            {hiddenChipCount > 0 && (
                                <li className="bg-secondary text-secondary-foreground rounded-sm px-1.5 py-0.5 text-xs">
                                    <span aria-hidden="true">
                                        +{hiddenChipCount}
                                    </span>
                                    <span className="sr-only">
                                        {labels.moreSelected(hiddenChipCount)}
                                    </span>
                                </li>
                            )}
                        </ul>
                    )}

                    {showClear && (
                        <button
                            type="button"
                            aria-label={
                                multiple ? labels.clearAll : labels.clear
                            }
                            onClick={handleClear}
                            className={cn(
                                "absolute top-1/2 right-7 z-10 flex size-5 -translate-y-1/2",
                                "items-center justify-center rounded",
                                "text-muted-foreground hover:text-foreground",
                                "focus-visible:ring-ring/50 outline-none focus-visible:ring-2",
                            )}
                        >
                            <X aria-hidden="true" className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                <PopoverContent
                    align="start"
                    className="w-[var(--radix-popover-trigger-width)] p-0"
                >
                    <Command>
                        <CommandInput
                            value={search}
                            onValueChange={setSearch}
                            onKeyDown={handleSearchKeyDown}
                            placeholder={searchPlaceholder}
                            className="h-8 text-xs"
                        />

                        <CommandList
                            aria-busy={loading || undefined}
                            className="max-h-64 overflow-y-auto"
                        >
                            {loading ? (
                                <div
                                    role="status"
                                    className="text-muted-foreground py-3 text-center text-xs"
                                >
                                    {labels.loading}
                                </div>
                            ) : (
                                <>
                                    <CommandEmpty className="text-muted-foreground py-3 text-center text-xs">
                                        {emptyMessage}
                                    </CommandEmpty>

                                    <CommandGroup>
                                        {uniqueOptions.map((option) => {
                                            const isSelected = selectedSet.has(
                                                option.value,
                                            );
                                            const isDisabled =
                                                Boolean(option.disabled) ||
                                                (atLimit && !isSelected);

                                            return (
                                                <CommandItem
                                                    key={option.value}
                                                    // Searchable by label and value; unique because values are unique.
                                                    value={`${option.label} ${option.value}`}
                                                    disabled={isDisabled}
                                                    onSelect={() =>
                                                        handleSelect(
                                                            option.value,
                                                        )
                                                    }
                                                    className={cn(
                                                        "flex cursor-pointer items-center justify-between gap-2 py-1.5 text-xs",
                                                        isSelected &&
                                                            "bg-gray-500/15 font-medium text-gray-900 dark:bg-gray-400/20 dark:text-gray-200",
                                                    )}
                                                >
                                                    <span className="min-w-0 flex-1 truncate text-xs">
                                                        {option.label}
                                                    </span>

                                                    {isSelected && (
                                                        <span className="sr-only">
                                                            {labels.selected}
                                                        </span>
                                                    )}

                                                    <Check
                                                        aria-hidden="true"
                                                        className={cn(
                                                            "h-3.5 w-3.5 shrink-0",
                                                            isSelected
                                                                ? "text-gray-600 opacity-100 dark:text-gray-400"
                                                                : "opacity-0",
                                                        )}
                                                    />
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>

                                    {atLimit && maxSelected !== undefined && (
                                        <p
                                            role="status"
                                            className="text-muted-foreground border-t px-2 py-1.5 text-center text-xs"
                                        >
                                            {labels.maxSelected(maxSelected)}
                                        </p>
                                    )}
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {error ? (
                <p
                    id={errorId}
                    role="alert"
                    className="text-destructive text-xs"
                >
                    {error}
                </p>
            ) : helperText ? (
                <p id={helperId} className="text-muted-foreground text-xs">
                    {helperText}
                </p>
            ) : null}

            {/* Native form submission. Disabled fields are not submitted, like a real <select>. */}
            {name &&
                (multiple ? (
                    selected.map((value) => (
                        <input
                            key={value}
                            type="hidden"
                            name={name}
                            value={value}
                            disabled={disabled}
                        />
                    ))
                ) : (
                    <input
                        type="hidden"
                        name={name}
                        value={selected[0] ?? ""}
                        disabled={disabled}
                    />
                ))}
        </div>
    );
}

/* Aliases: use whichever name your project prefers. */
export type BrandFieldSearchSelectProps = FormSelectSearchProps;
export const FormSelectSearch = BrandFieldSearchSelect;
