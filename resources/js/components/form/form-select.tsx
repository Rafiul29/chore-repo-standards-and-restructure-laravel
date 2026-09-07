import * as React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '../ui/label';

export interface DropdownOption {
    label: string;
    value: string | number;
}

export interface FormSelectProps {
    options: DropdownOption[];
    groupLabel?: string;
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    isDisabled?: boolean;
    name?: string;
    label?: string;
    required?: boolean;
    id?: string;
}

export function FormSelect({
    options,
    groupLabel = 'Options',
    placeholder = 'Select an option',
    value,
    onValueChange,
    className = 'w-full max-w-48 py-1',
    isDisabled,
    name,
    label,
    required,
    id,
}: FormSelectProps) {
    const [selectedValue, setSelectedValue] = React.useState<
        string | undefined
    >(value);

    React.useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);

    const handleValueChange = (nextValue: string) => {
        setSelectedValue(nextValue);
        onValueChange?.(nextValue);
    };

    return (
        <div className="space-y-2">
            {label && (
                <Label>
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </Label>
            )}
            <Select
                value={selectedValue}
                onValueChange={handleValueChange}
                disabled={isDisabled}
                name={name}
                required={required}
            >
                <SelectTrigger className={className}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent
                    position="popper"
                    sideOffset={0}
                    className="w-(--radix-select-trigger-width)"
                >
                    <SelectGroup id={id}>
                        {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value.toString()}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
