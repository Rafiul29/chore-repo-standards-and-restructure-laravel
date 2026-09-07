import * as React from "react";

import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "role"
> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            className,
            checked,
            defaultChecked,
            onCheckedChange,
            onChange,
            ...props
        },
        ref,
    ) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e);
            onCheckedChange?.(e.target.checked);
        };

        return (
            <label
                className={cn(
                    "peer inline-flex h-[1.15rem] w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-sm transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                    "has-[:checked]:bg-primary bg-input",
                    className,
                )}
            >
                <input
                    type="checkbox"
                    role="switch"
                    className="peer sr-only"
                    ref={ref}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onChange={handleChange}
                    {...props}
                />
                <span
                    className={cn(
                        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
                        "peer-checked:translate-x-[calc(100%-2px)] peer-unchecked:translate-x-0",
                    )}
                />
            </label>
        );
    },
);

Switch.displayName = "Switch";

export { Switch };
