import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface FormInputProps {
  id: string;
  name?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export function FormInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled,
  required,
  className = "w-full",
  ref,
  onKeyDown,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={className}
        ref={ref}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}