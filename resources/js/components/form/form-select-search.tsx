import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

export interface ComboboxOption {
    label: string;
    value: string;
}

export interface FormSelectSearchProps {
    label?: string;
    required?: boolean;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    options: ComboboxOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
}

export function FormSelectSearch({
    label,
    required,
    placeholder = 'Select an option',
    searchPlaceholder = 'Search...',
    emptyMessage = 'No item found.',
    options,
    value,
    onValueChange,
    className,
    disabled,
}: FormSelectSearchProps) {
    const [open, setOpen] = React.useState(false);

    const [selectedValue, setSelectedValue] = React.useState(value ?? '');

    React.useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);

    const selectedOption = options.find(
        (option) => option.value === selectedValue,
    );

    const handleSelect = (selectedLabel: string) => {
        const option = options.find(
            (item) => item.label.toLowerCase() === selectedLabel.toLowerCase(),
        );

        if (!option) return;

        setSelectedValue(option.value);
        onValueChange?.(option.value);
        setOpen(false);
    };

    return (
        <div className="space-y-2">
            {label && (
                <Label>
                    {label}
                    {required && (
                        <span className="text-destructive ml-1">*</span>
                    )}
                </Label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        disabled={disabled}
                        className={cn(
                            'w-full justify-between font-normal',
                            !selectedOption && 'text-muted-foreground',
                            className,
                        )}
                    >
                        <span className="mr-2 truncate text-left">
                            {selectedOption
                                ? selectedOption.label
                                : placeholder}
                        </span>

                        <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-0"
                    align="start"
                >
                    <Command>
                        <CommandInput placeholder={searchPlaceholder} />

                        <CommandList className="scrollbar-thumb-muted-foreground/30 max-h-64 scrollbar-thin scrollbar-track-transparent overflow-y-auto">
                            <CommandEmpty>{emptyMessage}</CommandEmpty>

                            <CommandGroup>
                                {options.map((option) => {
                                    const isSelected =
                                        selectedValue === option.value;

                                    return (
                                        <CommandItem
                                            key={option.value}
                                            value={option.label}
                                            disabled={isSelected}
                                            onSelect={handleSelect}
                                            className={cn(
                                                isSelected &&
                                                    'bg-accent text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground cursor-not-allowed font-medium opacity-100',
                                            )}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-1 h-4 w-4',
                                                    isSelected
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />

                                            {option.label}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
