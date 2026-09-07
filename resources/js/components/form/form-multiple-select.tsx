import { useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
    value: string;
    label: string;
}

interface SelectBadgeProps {
    children: React.ReactNode;
    onRemove: () => void;
}

function SelectBadge({ children, onRemove }: SelectBadgeProps) {
    return (
        <span className="flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
            {children}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="rounded-full hover:bg-muted"
            >
                <X className="h-3 w-3" />
            </button>
        </span>
    );
}

interface MultiSelectDropdownProps {
    options?: Option[];
    label?: string;
    placeholder?: string;
    /** Controlled value */
    value?: string[];
    /** Fires whenever the selection changes */
    onChange?: (value: string[]) => void;
    className?: string;
    error?: string;
}

const DEFAULT_OPTIONS: Option[] = [];

export default function MultiSelectDropdown({
    options = DEFAULT_OPTIONS,
    label,
    placeholder = "Select options...",
    value,
    onChange,
    className,
    error,
}: MultiSelectDropdownProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [internalSelected, setInternalSelected] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Support both controlled and uncontrolled usage
    const selected = value ?? internalSelected;

    const setSelected = (next: string[]) => {
        if (!value) setInternalSelected(next);
        onChange?.(next);
    };

    const toggleValue = (val: string) => {
        const next = selected.includes(val)
            ? selected.filter((v) => v !== val)
            : [...selected, val];
        setSelected(next);
    };

    const removeValue = (val: string) => {
        setSelected(selected.filter((v) => v !== val));
    };

    const filtered = options.filter((f) =>
        f.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            {label && (
                <Label className="mb-1.5 block text-sm font-medium">
                    {label}
                </Label>
            )}

            {/* Trigger button */}
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={cn(
                    "flex min-h-10 w-full items-center justify-between gap-2 rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors",
                    "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                    error ? "border-destructive" : "border-input",
                    open && "ring-2 ring-ring ring-offset-1"
                )}
            >
                <div className="flex flex-1 flex-wrap gap-1">
                    {selected.length === 0 && (
                        <span className="text-muted-foreground">{placeholder}</span>
                    )}
                    {selected.map((val) => {
                        const item = options.find((f) => f.value === val);
                        return (
                            <SelectBadge key={val} onRemove={() => removeValue(val)}>
                                {item?.label ?? val}
                            </SelectBadge>
                        );
                    })}
                </div>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                        open && "rotate-180"
                    )}
                />
            </button>

            {error && (
                <p className="mt-1 text-xs text-destructive">{error}</p>
            )}

            {/* Dropdown panel */}
            {open && (
                <>
                    {/* Click-away overlay */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => {
                            setOpen(false);
                            setSearch("");
                        }}
                    />
                    <div className="absolute z-20 mt-1 w-full rounded-md border border-border bg-popover text-popover-foreground shadow-md">
                        {/* Search */}
                        <div className="border-b border-border p-2">
                            <input
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="w-full rounded-sm bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
                            />
                        </div>

                        {/* Options list */}
                        <div className="max-h-56 overflow-y-auto p-1">
                            {filtered.length === 0 && (
                                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                                    No results found.
                                </div>
                            )}
                            {filtered.map((item) => {
                                const isSelected = selected.includes(item.value);
                                return (
                                    <div
                                        key={item.value}
                                        onClick={() => toggleValue(item.value)}
                                        className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {/* Checkbox indicator */}
                                        <div
                                            className={cn(
                                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors",
                                                isSelected
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "border-input bg-background"
                                            )}
                                        >
                                            {isSelected && <Check className="h-3 w-3" />}
                                        </div>
                                        <span>{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        {selected.length > 0 && (
                            <div className="flex items-center justify-between border-t border-border p-2">
                                <button
                                    type="button"
                                    onClick={() => setSelected([])}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Clear all
                                </button>
                                <span className="text-xs text-muted-foreground">
                                    {selected.length} selected
                                </span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}