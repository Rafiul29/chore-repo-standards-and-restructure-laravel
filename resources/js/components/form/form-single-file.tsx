import * as React from 'react';
import { FileText, UploadCloud, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export interface FormFileUploadProps {
    id?: string;
    label?: string;
    name: string;
    required?: boolean;
    accept?: string;
    disabled?: boolean;
    className?: string;
    description?: string;
    value?: File | string | null;
    onChange?: (file: File | string | null) => void;
}

export function FormSingleFileUpload({
    id,
    label,
    name,
    required,
    accept = '*',
    disabled,
    className,
    description = 'Drag & drop a file here or click to browse',
    value,
    onChange,
}: FormFileUploadProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = React.useState<
        File | string | null
    >(value ?? null);

    React.useEffect(() => {
        if (value !== undefined) {
            setSelectedFile(value);
        }
    }, [value]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;

        setSelectedFile(file);
        onChange?.(file);
    };

    const handleRemove = () => {
        setSelectedFile(null);

        onChange?.(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div
            className={cn(
                'box-border w-full max-w-full space-y-2 overflow-hidden',
                className,
            )}
        >
            {label && (
                <Label className="block truncate">
                    {label}
                    {required && (
                        <span className="text-destructive ml-1">*</span>
                    )}
                </Label>
            )}

            <div
                onClick={() => !disabled && inputRef.current?.click()}
                className={cn(
                    'border-muted-foreground/30 bg-muted/20 hover:border-primary hover:bg-muted/40 box-border flex w-full max-w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition-all',
                    disabled && 'cursor-not-allowed opacity-50',
                )}
            >
                <UploadCloud className="text-muted-foreground mb-2 h-8 w-8 shrink-0" />

                <h3 className="text-sm font-medium">Click to upload</h3>

                <p className="text-muted-foreground mt-1 px-2 text-xs">
                    {description}
                </p>

                <input
                    id={id}
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={accept}
                    disabled={disabled}
                    onChange={handleFileChange}
                />
            </div>

            {selectedFile && (
                <div className="bg-muted/30 box-border flex w-full max-w-full items-center justify-between gap-3 overflow-hidden rounded-lg border p-2.5">
                    <div className="flex min-w-0 flex-1 items-center gap-2.5">
                        <FileText className="text-primary h-4 w-4 shrink-0" />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-medium">
                                {typeof selectedFile === 'string'
                                    ? selectedFile.split('/').pop()
                                    : selectedFile.name}
                            </p>

                            <p className="text-muted-foreground text-[11px]">
                                {typeof selectedFile === 'string'
                                    ? 'Existing File'
                                    : `${(selectedFile.size / 1024).toFixed(2)} KB`}
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0"
                        onClick={handleRemove}
                    >
                        <X className="h-3.5 w-3.5" />
                    </Button>
                </div>
            )}
        </div>
    );
}
