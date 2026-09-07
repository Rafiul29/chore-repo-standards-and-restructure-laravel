import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export interface FormSwitchProps {
    id: string;
    name?: string;
    label?: string;
    description?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export function FormSwitch({
    id,
    name,
    label,
    description,
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    required,
    className = 'flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/50',
}: FormSwitchProps) {
    return (
        <div className={className}>
            <div className="space-y-0.5">
                {label && (
                    <Label
                        htmlFor={id}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        {label}
                        {required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </Label>
                )}
                {description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>

            <Switch
                id={id}
                name={name}
                checked={checked}
                defaultChecked={defaultChecked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
            />
        </div>
    );
}
