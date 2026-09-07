"use client";

import * as React from "react";
import {
  FileText,
  Files,
  UploadCloud,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
  accept = "*",
  disabled = false,
  className,
  description = "ফাইল নির্বাচন করুন অথবা এখানে ফাইল টেনে আনুন",
  value,
  onChange,
}: FormMultipleFileUploadProps) {
  const inputRef =
    React.useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] =
    React.useState<(File | string)[]>(value ?? []);

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
    typeof file === "string" ? file : `${file.name}-${file.size}-${file.lastModified}`;

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
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(
      event.target.files ?? [],
    );

    if (files.length === 0) {
      return;
    }

    setSelectedFiles((previousFiles) => {
      const existingKeys = new Set(
        previousFiles.map(getFileKey),
      );

      const newFiles = files.filter(
        (file) =>
          !existingKeys.has(
            getFileKey(file),
          ),
      );

      const updatedFiles = [
        ...previousFiles,
        ...newFiles,
      ];

      onChange?.(updatedFiles);

      return updatedFiles;
    });

    /**
     * Allow selecting the same file again
     */
    event.target.value = "";
  };

  /**
   * Remove single file
   */
  const handleRemove = (
    index: number,
  ) => {
    setSelectedFiles((previousFiles) => {
      const updatedFiles =
        previousFiles.filter(
          (_, fileIndex) =>
            fileIndex !== index,
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
      inputRef.current.value = "";
    }
  };

  /**
   * Format file size
   */
  const formatFileSize = (
    bytes: number,
  ) => {
    if (bytes < 1024) {
      return `${bytes} Bytes`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
      return `${(
        bytes /
        (1024 * 1024)
      ).toFixed(1)} MB`;
    }

    return `${(
      bytes /
      (1024 * 1024 * 1024)
    ).toFixed(1)} GB`;
  };

  /**
   * Format accepted file types
   */
  const formatAccept = () => {
    if (accept === "*") {
      return "যেকোনো ফাইল";
    }

    return accept
      .replaceAll(".", "")
      .replaceAll(",", ", ")
      .toUpperCase();
  };

  return (
    <div
      className={cn(
        "space-y-2",
        className,
      )}
    >
      {/* Label */}
      {label && (
        <Label
          htmlFor={id}
          className="text-sm font-medium"
        >
          {label}

          {required && (
            <span className="ml-1 text-destructive">
              *
            </span>
          )}
        </Label>
      )}

      {/* Upload area */}
      <div
        onClick={openFilePicker}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/20 px-6 py-8 text-center transition-all",

          "hover:border-primary/70 hover:bg-primary/[0.03]",

          "dark:hover:bg-primary/[0.05]",

          disabled &&
            "cursor-not-allowed opacity-50",
        )}
      >
        {/* Multiple file badge */}
        <span
          className={cn(
            "absolute right-0 top-0 inline-flex items-center gap-1.5",
            "rounded-bl-lg rounded-tr-xl",
            "border-b border-l border-primary/20",
            "bg-primary/10 px-3 py-1.5",
            "text-[11px] font-semibold text-primary",
          )}
        >
          <Files className="h-3.5 w-3.5" />
          একাধিক ফাইল
        </span>

        {/* Icon */}
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
          <UploadCloud className="h-6 w-6" />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold">
          একাধিক ফাইল নির্বাচন করুন
        </h3>

        {/* Info */}
        <p className="mt-1 text-xs font-medium text-primary">
          একসাথে একাধিক ফাইল দেওয়া যাবে
        </p>

        {/* Description */}
        <p className="mt-1.5 text-xs text-muted-foreground">
          {description}
        </p>

        {/* Accepted files */}
        <p className="mt-2 text-[11px] text-muted-foreground">
          অনুমোদিত ফাইল:{" "}
          <span className="font-medium">
            {formatAccept()}
          </span>
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
        <div className="overflow-hidden rounded-xl border bg-background">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b bg-muted/30 px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Files className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-semibold">
                  ফাইল নির্বাচিত
                </p>

                <p className="text-[11px] text-muted-foreground">
                  মোট{" "}
                  <span className="font-semibold text-primary">
                    {selectedFiles.length}
                  </span>{" "}
                  টি ফাইল
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
              className="h-7 px-2 text-xs hover:text-destructive"
            >
              সব মুছে ফেলুন
            </Button>
          </div>

          {/* File list */}
          <div className="divide-y">
            {selectedFiles.map(
              (file, index) => (
                <div
                  key={`${getFileKey(file)}-${index}`}
                  className="flex items-center justify-between gap-3 px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p
                        title={typeof file === 'string' ? file.split('/').pop() : file.name}
                        className="truncate text-xs font-medium"
                      >
                        {typeof file === 'string' ? file.split('/').pop() : file.name}
                      </p>

                      <p className="mt-0.5 text-[11px] text-muted-foreground">
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
                    className="h-8 w-8 shrink-0 hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`${typeof file === 'string' ? 'file' : file.name} remove`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ),
            )}
          </div>

          {/* Footer */}
          <div className="border-t bg-muted/20 px-3 py-2">
            <p className="text-[11px] text-muted-foreground">
              আরও ফাইল যোগ করতে উপরের
              upload box-এ আবার ক্লিক করুন।
            </p>
          </div>
        </div>
      )}
    </div>
  );
}