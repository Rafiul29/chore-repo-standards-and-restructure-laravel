"use client";

import * as React from "react";
import {
  AlertCircle,
  FileText,
  Files,
  UploadCloud,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FILE_UPLOAD, UploadFileValue, validateUploadFile } from "../../constants/file-upload";



export interface FormMultipleFileUploadProps {
  id?: string;
  name?: string;
  label?: string;
  required?: boolean;
  accept?: string;
  disabled?: boolean;
  className?: string;
  description?: string;
  value?: UploadFileValue[];
  onChange?: (files: UploadFileValue[]) => void;
  maxFiles?: number;
  maxFileSizeMB?: number;
}

const getFileKey = (file: UploadFileValue) =>
  typeof file === "string"
    ? file
    : `${file.name}-${file.size}-${file.lastModified}`;

export function BrandMultipleFile({
  id,
  name,
  label,
  required = false,
  accept = FILE_UPLOAD.DOCUMENT_ACCEPT,
  disabled = false,
  className,
  description = "ফাইল নির্বাচন করুন অথবা এখানে টেনে আনুন",
  value,
  onChange,
  maxFiles = FILE_UPLOAD.MAX_FILES,
  maxFileSizeMB = FILE_UPLOAD.MAX_SIZE_MB,
}: FormMultipleFileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [internalFiles, setInternalFiles] =
    React.useState<UploadFileValue[]>(value ?? []);

  const [validationError, setValidationError] =
    React.useState<string | null>(null);

  const selectedFiles =
    value !== undefined ? value : internalFiles;

  const selectedCount = selectedFiles.length;
  const remaining = Math.max(0, maxFiles - selectedCount);
  const isFull = selectedCount >= maxFiles;

  const updateFiles = (files: UploadFileValue[]) => {
    if (value === undefined) {
      setInternalFiles(files);
    }

    onChange?.(files);
  };

  const validateAndAddFiles = (incomingFiles: File[]) => {
    if (disabled || incomingFiles.length === 0) return;

    const errors = incomingFiles
      .map((file) =>
        validateUploadFile(file, accept, maxFileSizeMB),
      )
      .filter((message): message is string => Boolean(message));

    if (errors.length > 0) {
      setValidationError(errors.join("\n"));
      return;
    }

    const keys = new Set(selectedFiles.map(getFileKey));

    const uniqueFiles = incomingFiles.filter((file) => {
      const key = getFileKey(file);

      if (keys.has(key)) return false;

      keys.add(key);
      return true;
    });

    if (uniqueFiles.length === 0) {
      setValidationError(
        "নির্বাচিত ফাইলগুলো ইতোমধ্যে যুক্ত করা হয়েছে।",
      );
      return;
    }

    const total = selectedCount + uniqueFiles.length;

    if (total > maxFiles) {
      setValidationError(
        `সর্বোচ্চ ${maxFiles}টি ফাইল নির্বাচন করতে পারবেন। বর্তমানে ${selectedCount}টি আছে। আরও ${remaining}টি যোগ করা যাবে।`,
      );
      return;
    }

    setValidationError(null);
    updateFiles([...selectedFiles, ...uniqueFiles]);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.currentTarget.files ?? []);

    event.currentTarget.value = "";

    validateAndAddFiles(files);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!disabled) {
      validateAndAddFiles(Array.from(event.dataTransfer.files));
    }
  };

  const openPicker = () => {
    if (disabled) return;

    if (isFull) {
      setValidationError(
        `সর্বোচ্চ ${maxFiles}টি ফাইল নির্বাচন করা হয়েছে। নতুন ফাইল যোগ করতে আগে একটি মুছে ফেলুন।`,
      );
      return;
    }

    inputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    if (disabled) return;

    updateFiles(selectedFiles.filter((_, i) => i !== index));
    setValidationError(null);
  };

  const handleRemoveAll = () => {
    if (disabled) return;

    updateFiles([]);
    setValidationError(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("w-full min-w-0 space-y-1", className)}>
      {label && (
        <Label htmlFor={id} className="block text-[13px] font-semibold text-foreground">
          {label}
          {required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </Label>
      )}

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-invalid={Boolean(validationError)}
        onClick={openPicker}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        onKeyDown={(event) => {
          if (
            event.target === event.currentTarget &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            openPicker();
          }
        }}
        className={cn(
          "relative flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-4 text-center transition-colors",
          "border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          validationError && "border-destructive/60 bg-destructive/5",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        {/* Top Left: Multiple File Selection Info */}
        <span className="absolute top-2 left-2 rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
          একাধিক ফাইল নির্বাচন করুন
        </span>

        {/* Top Right: File Counter */}
        <span className="absolute top-2 right-2 rounded-md bg-muted px-2 py-1 text-[11px] font-semibold">
          {selectedCount}/{maxFiles}
        </span>

        <UploadCloud className="mb-2 h-8 w-8 text-primary mt-6 md:mt-2" />

        <p className="text-xs font-medium">
          {isFull
            ? "সর্বোচ্চ ফাইল নির্বাচন করা হয়েছে"
            : description}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          সর্বোচ্চ {maxFiles}টি ফাইল • প্রতিটি {maxFileSizeMB} MB
        </p>

        <p className="mt-1 break-words text-[11px] text-muted-foreground">
          গ্রহণযোগ্য ফাইল:
          <span className="ml-1 rounded bg-primary/10 px-2 py-0.5 font-medium text-primary">
            {accept.replaceAll(".", "").toUpperCase()}
          </span>
        </p>

        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          multiple
          accept={accept}
          disabled={disabled}
          tabIndex={-1}
          className="hidden"
          onClick={(event) => event.stopPropagation()}
          onChange={handleFileChange}
        />
      </div>

      {validationError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

          <p className="min-w-0 flex-1 whitespace-pre-line break-words text-xs leading-5">
            {validationError}
          </p>

          <button
            type="button"
            onClick={() => setValidationError(null)}
            aria-label="ত্রুটি বার্তা বন্ধ করুন"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {selectedCount > 0 && (
        <div className="overflow-hidden rounded-lg border bg-background">
          <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">
            <div className="flex items-center gap-2">
              <Files className="h-4 w-4 text-primary" />

              <span className="text-xs font-semibold">
                নির্বাচিত ফাইল ({selectedCount}/{maxFiles})
              </span>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={disabled}
              onClick={handleRemoveAll}
              className="h-7 px-2 text-xs text-destructive hover:text-destructive"
            >
              সব মুছুন
            </Button>
          </div>

          <div className="divide-y">
            {selectedFiles.map((file, index) => {
              const fileName =
                typeof file === "string"
                  ? file.split("/").pop() || file
                  : file.name;

              return (
                <div
                  key={`${getFileKey(file)}-${index}`}
                  className="flex min-w-0 items-center justify-between gap-2 px-3 py-2"
                >
                  <FileText className="h-4 w-4 shrink-0 text-primary" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">
                      {fileName}
                    </p>

                    <p className="text-[11px] text-muted-foreground">
                      {typeof file === "string"
                        ? "পূর্বে সংযুক্ত ফাইল"
                        : formatUploadSize(file.size)}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onClick={() => handleRemove(index)}
                    className="h-7 w-7 shrink-0 hover:text-destructive"
                    aria-label={`${fileName} মুছে ফেলুন`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>

          <p className="border-t bg-muted/20 px-3 py-2 text-[11px] text-muted-foreground">
            {isFull
              ? "ফাইলের সর্বোচ্চ সীমা পূর্ণ হয়েছে।"
              : `আরও ${remaining}টি ফাইল যোগ করতে পারবেন।`}
          </p>
        </div>
      )}
    </div>
  );
}