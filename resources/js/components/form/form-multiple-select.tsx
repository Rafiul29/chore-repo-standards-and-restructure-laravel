import { useRef, useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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
        <span className="bg-accent text-accent-foreground flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium">
            {children}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="hover:bg-muted rounded-full"
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
    placeholder = 'Select options...',
    value,
    onChange,
    className,
    error,
}: MultiSelectDropdownProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
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
        f.label.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className={cn('relative', className)} ref={containerRef}>
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
                    'bg-background flex min-h-10 w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-sm transition-colors',
                    'hover:bg-accent focus:ring-ring focus:ring-2 focus:ring-offset-1 focus:outline-none',
                    error ? 'border-destructive' : 'border-input',
                    open && 'ring-ring ring-2 ring-offset-1',
                )}
            >
                <div className="flex flex-1 flex-wrap gap-1">
                    {selected.length === 0 && (
                        <span className="text-muted-foreground">
                            {placeholder}
                        </span>
                    )}
                    {selected.map((val) => {
                        const item = options.find((f) => f.value === val);
                        return (
                            <SelectBadge
                                key={val}
                                onRemove={() => removeValue(val)}
                            >
                                {item?.label ?? val}
                            </SelectBadge>
                        );
                    })}
                </div>
                <ChevronDown
                    className={cn(
                        'text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200',
                        open && 'rotate-180',
                    )}
                />
            </button>

            {error && <p className="text-destructive mt-1 text-xs">{error}</p>}

            {/* Dropdown panel */}
            {open && (
                <>
                    {/* Click-away overlay */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => {
                            setOpen(false);
                            setSearch('');
                        }}
                    />
                    <div className="border-border bg-popover text-popover-foreground absolute z-20 mt-1 w-full rounded-md border shadow-md">
                        {/* Search */}
                        <div className="border-border border-b p-2">
                            <input
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="placeholder:text-muted-foreground w-full rounded-sm bg-transparent px-2 py-1.5 text-sm outline-none"
                            />
                        </div>

                        {/* Options list */}
                        <div className="max-h-56 overflow-y-auto p-1">
                            {filtered.length === 0 && (
                                <div className="text-muted-foreground px-2 py-4 text-center text-sm">
                                    No results found.
                                </div>
                            )}
                            {filtered.map((item) => {
                                const isSelected = selected.includes(
                                    item.value,
                                );
                                return (
                                    <div
                                        key={item.value}
                                        onClick={() => toggleValue(item.value)}
                                        className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm"
                                    >
                                        {/* Checkbox indicator */}
                                        <div
                                            className={cn(
                                                'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors',
                                                isSelected
                                                    ? 'border-primary bg-primary text-primary-foreground'
                                                    : 'border-input bg-background',
                                            )}
                                        >
                                            {isSelected && (
                                                <Check className="h-3 w-3" />
                                            )}
                                        </div>
                                        <span>{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        {selected.length > 0 && (
                            <div className="border-border flex items-center justify-between border-t p-2">
                                <button
                                    type="button"
                                    onClick={() => setSelected([])}
                                    className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                                >
                                    Clear all
                                </button>
                                <span className="text-muted-foreground text-xs">
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
