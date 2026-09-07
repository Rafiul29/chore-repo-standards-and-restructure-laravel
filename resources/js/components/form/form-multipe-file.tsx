'use client';

import * as React from 'react';
import { FileText, Files, UploadCloud, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export interface FormMultipleFileUploadProps {
    id?: string;
    name?: string;
    label?: string;
    required?: boolean;
    accept?: string;
    disabled?: boolean;
    className?: string;
    description?: string;

    /**
     * Controlled value
     */
    value?: (File | string)[];

    /**
     * Returns (File | string)[] directly
     */
    onChange?: (files: (File | string)[]) => void;
}

export function FormMultipleFileUpload({
    id,
    name,
    label,
    required = false,
    accept = '*',
    disabled = false,
    className,
    description = 'Select files or drag them here',
    value,
    onChange,
}: FormMultipleFileUploadProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [selectedFiles, setSelectedFiles] = React.useState<(File | string)[]>(
        value ?? [],
    );

    /**
     * Sync controlled value
     */
    React.useEffect(() => {
        if (value !== undefined) {
            setSelectedFiles(value);
        }
    }, [value]);

    /**
     * Generate unique file key
     */
    const getFileKey = (file: File | string) =>
        typeof file === 'string'
            ? file
            : `${file.name}-${file.size}-${file.lastModified}`;

    /**
     * Open file picker
     */
    const openFilePicker = () => {
        if (disabled) {
            return;
        }

        inputRef.current?.click();
    };

    /**
     * Handle file selection
     */
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);

        if (files.length === 0) {
            return;
        }

        setSelectedFiles((previousFiles) => {
            const existingKeys = new Set(previousFiles.map(getFileKey));

            const newFiles = files.filter(
                (file) => !existingKeys.has(getFileKey(file)),
            );

            const updatedFiles = [...previousFiles, ...newFiles];

            onChange?.(updatedFiles);

            return updatedFiles;
        });

        /**
         * Allow selecting the same file again
         */
        event.target.value = '';
    };

    /**
     * Remove single file
     */
    const handleRemove = (index: number) => {
        setSelectedFiles((previousFiles) => {
            const updatedFiles = previousFiles.filter(
                (_, fileIndex) => fileIndex !== index,
            );

            onChange?.(updatedFiles);

            return updatedFiles;
        });
    };

    /**
     * Remove all files
     */
    const handleRemoveAll = () => {
        setSelectedFiles([]);

        onChange?.([]);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    /**
     * Format file size
     */
    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) {
            return `${bytes} Bytes`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        if (bytes < 1024 * 1024 * 1024) {
            return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        }

        return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    };

    /**
     * Format accepted file types
     */
    const formatAccept = () => {
        if (accept === '*') {
            return 'Any file';
        }

        return accept.replaceAll('.', '').replaceAll(',', ', ').toUpperCase();
    };

    return (
        <div className={cn('space-y-2', className)}>
            {/* Label */}
            {label && (
                <Label htmlFor={id} className="text-sm font-medium">
                    {label}

                    {required && (
                        <span className="text-destructive ml-1">*</span>
                    )}
                </Label>
            )}

            {/* Upload area */}
            <div
                onClick={openFilePicker}
                className={cn(
                    'group border-muted-foreground/30 bg-muted/20 relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all',

                    'hover:border-primary/70 hover:bg-primary/[0.03]',

                    'dark:hover:bg-primary/[0.05]',

                    disabled && 'cursor-not-allowed opacity-50',
                )}
            >
                {/* Multiple file badge */}
                <span
                    className={cn(
                        'absolute top-0 right-0 inline-flex items-center gap-1.5',
                        'rounded-tr-xl rounded-bl-lg',
                        'border-primary/20 border-b border-l',
                        'bg-primary/10 px-3 py-1.5',
                        'text-primary text-[11px] font-semibold',
                    )}
                >
                    <Files className="h-3.5 w-3.5" />
                    Multiple files
                </span>

                {/* Icon */}
                <div className="bg-primary/10 text-primary mb-3 flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105">
                    <UploadCloud className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold">Select multiple files</h3>

                {/* Info */}
                <p className="text-primary mt-1 text-xs font-medium">
                    Upload several files at once
                </p>

                {/* Description */}
                <p className="text-muted-foreground mt-1.5 text-xs">
                    {description}
                </p>

                {/* Accepted files */}
                <p className="text-muted-foreground mt-2 text-[11px]">
                    Allowed files:{' '}
                    <span className="font-medium">{formatAccept()}</span>
                </p>

                {/* Native file input */}
                <input
                    ref={inputRef}
                    id={id}
                    name={name}
                    type="file"
                    multiple
                    hidden
                    accept={accept}
                    disabled={disabled}
                    onChange={handleFileChange}
                />
            </div>

            {/* Selected files */}
            {selectedFiles.length > 0 && (
                <div className="bg-background overflow-hidden rounded-xl border">
                    {/* Header */}
                    <div className="bg-muted/30 flex items-center justify-between gap-3 border-b px-3 py-2.5">
                        <div className="flex min-w-0 items-center gap-2">
                            <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                                <Files className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-xs font-semibold">
                                    Files selected
                                </p>

                                <p className="text-muted-foreground text-[11px]">
                                    Total{' '}
                                    <span className="text-primary font-semibold">
                                        {selectedFiles.length}
                                    </span>{' '}
                                    files
                                </p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={disabled}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleRemoveAll();
                            }}
                            className="hover:text-destructive h-7 px-2 text-xs"
                        >
                            Remove all
                        </Button>
                    </div>

                    {/* File list */}
                    <div className="divide-y">
                        {selectedFiles.map((file, index) => (
                            <div
                                key={`${getFileKey(file)}-${index}`}
                                className="flex items-center justify-between gap-3 px-3 py-2.5"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                                        <FileText className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <p
                                            title={
                                                typeof file === 'string'
                                                    ? file.split('/').pop()
                                                    : file.name
                                            }
                                            className="truncate text-xs font-medium"
                                        >
                                            {typeof file === 'string'
                                                ? file.split('/').pop()
                                                : file.name}
                                        </p>

                                        <p className="text-muted-foreground mt-0.5 text-[11px]">
                                            {typeof file === 'string'
                                                ? 'Existing File'
                                                : formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    disabled={disabled}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleRemove(index);
                                    }}
                                    className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 shrink-0"
                                    aria-label={`${typeof file === 'string' ? 'file' : file.name} remove`}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="bg-muted/20 border-t px-3 py-2">
                        <p className="text-muted-foreground text-[11px]">
                            Click the upload box above to add more files.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
