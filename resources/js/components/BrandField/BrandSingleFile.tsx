"use client";

import * as React from "react";
import {
  AlertCircle,
  FileText,
  UploadCloud,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FILE_UPLOAD, formatUploadSize, UploadFileValue } from "../constants/file-upload";





/**
 * Only actual File instances and non-empty file paths
 * are valid selected values.
 *
 * Reject: null, undefined, {}, [], "", numbers, etc.
 */
export function normalizeUploadFile(
  value: unknown,
): UploadFileValue | null {
  if (typeof File !== "undefined" && value instanceof File) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  return null;
}

/**
 * Validate a newly selected browser File.
 */
export function validateUploadFile(
  file: File,
  accept: string,
  maxSizeMB: number,
): string | null {
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `${file.name}: সর্বোচ্চ ${maxSizeMB} MB ফাইল গ্রহণযোগ্য। নির্বাচিত ফাইল ${formatUploadSize(file.size)}।`;
  }

  if (!accept || accept === "*") {
    return null;
  }

  const allowed = accept
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (allowed.length === 0 || allowed.includes("*")) {
    return null;
  }

  const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;

  if (!allowed.includes(extension)) {
    return `অনুমোদিত ফাইলের ধরন: ${allowed.join(", ")}`;
  }

  const mimeTypes = FILE_UPLOAD.MIME_TYPES[extension];

  if (
    file.type &&
    mimeTypes &&
    !mimeTypes.includes(file.type.toLowerCase())
  ) {
    return `${file.name}: ফাইলের ধরন সঠিক নয়।`;
  }

  return null;
}

// ==========================================
// COMPONENT PROPS
// ==========================================

export interface FormFileUploadProps {
  id?: string;
  label?: string;
  name: string;
  required?: boolean;
  accept?: string;
  disabled?: boolean;
  className?: string;
  description?: string;
  value?: UploadFileValue | null;
  onChange?: (file: UploadFileValue | null) => void;
  maxFileSizeMB?: number;
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export function BrandSingleFile({
  id,
  label,
  name,
  required = false,
  accept = FILE_UPLOAD.DOCUMENT_ACCEPT,
  disabled = false,
  className,
  description = "ফাইল নির্বাচন করতে ক্লিক করুন",
  value,
  onChange,
  maxFileSizeMB = FILE_UPLOAD.MAX_SIZE_MB,
}: FormFileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [internalFile, setInternalFile] =
    React.useState<UploadFileValue | null>(
      normalizeUploadFile(value),
    );

  const [validationError, setValidationError] =
    React.useState<string | null>(null);

  // Controlled or uncontrolled mode
  const isControlled = value !== undefined;

  // Important: normalize every render, not only initial state
  const selectedFile = normalizeUploadFile(
    isControlled ? value : internalFile,
  );

  const updateFile = (file: UploadFileValue | null) => {
    const normalized = normalizeUploadFile(file);

    if (!isControlled) {
      setInternalFile(normalized);
    }

    onChange?.(normalized);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files?.[0];

    // User cancels file selection: preserve previous file.
    if (!file || disabled) {
      return;
    }

    const error = validateUploadFile(
      file,
      accept,
      maxFileSizeMB,
    );

    if (error) {
      // Show validation error.
      setValidationError(error);

      // Clear previous selected file and preview.
      updateFile(null);

      // Clear native input.
      event.currentTarget.value = "";

      return;
    }

    // Valid file selected.
    setValidationError(null);

    // Replace previous file with new valid file.
    updateFile(file);

    // Reset input for reselecting the same file.
    // This assumes submission uses Inertia useForm state.
    event.currentTarget.value = "";
  };

  const handleRemove = () => {
    if (disabled) return;

    updateFile(null);
    setValidationError(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const openPicker = () => {
    if (disabled) return;

    inputRef.current?.click();
  };

  // ==========================================
  // SAFE FILE DISPLAY
  // ==========================================

  const isNewFile =
    typeof File !== "undefined" &&
    selectedFile instanceof File;

  const isExistingFile =
    typeof selectedFile === "string" &&
    selectedFile.trim().length > 0;

  const hasSelectedFile = isNewFile || isExistingFile;

  const fileName = isNewFile
    ? selectedFile.name
    : isExistingFile
      ? (selectedFile as string).split("/").pop() || "সংযুক্ত ফাইল"
      : "";

  const fileSize = isNewFile
    ? formatUploadSize(selectedFile.size)
    : isExistingFile
      ? "পূর্বে সংযুক্ত ফাইল"
      : "";

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className={cn("w-full min-w-0 space-y-1", className)}>
      {/* Label */}
      {label && (
        <Label
          htmlFor={id}
          className="block text-[13px] font-semibold text-foreground"
        >
          {label}

          {required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </Label>
      )}

      {/* Upload Area */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-invalid={Boolean(validationError)}
        onClick={openPicker}
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
          "flex min-h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-4 text-center transition-colors",
          "border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          validationError &&
          "border-destructive/60 bg-destructive/5",
          disabled &&
          "cursor-not-allowed opacity-50",
        )}
      >
        <UploadCloud className="mb-2 h-7 w-7 text-primary" />

        <p className="text-xs font-medium">
          {hasSelectedFile
            ? "ফাইল পরিবর্তন করতে ক্লিক করুন"
            : description}
        </p>

        <p className="mt-2 text-[11px] text-muted-foreground">
          সর্বোচ্চ {maxFileSizeMB} MB
        </p>


        <p className="mt-1 break-words text-[11px] text-muted-foreground">
          গ্রহণযোগ্য ফাইল:
          <span className="ml-1 rounded bg-primary/10 px-2 py-0.5 font-medium text-primary">
            {accept.replaceAll(".", "").toUpperCase()}
          </span>
        </p>

        <input
          id={id}
          ref={inputRef}
          name={name}
          type="file"
          accept={accept}
          disabled={disabled}
          tabIndex={-1}
          className="hidden"
          onClick={(event) => event.stopPropagation()}
          onChange={handleFileChange}
        />
      </div>

      {/* Validation Error */}
      {validationError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />

          <span className="min-w-0 flex-1 break-words">
            {validationError}
          </span>

          <button
            type="button"
            aria-label="ত্রুটি বার্তা বন্ধ করুন"
            onClick={() => setValidationError(null)}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Selected File — only valid File or string */}
      {hasSelectedFile && (
        <div className="flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border bg-muted/30 p-2">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <FileText className="h-4 w-4 shrink-0 text-primary" />

            <div className="min-w-0 flex-1">
              <p
                className="truncate text-xs font-medium"
                title={fileName}
              >
                {fileName}
              </p>

              <p className="text-[11px] text-muted-foreground">
                {fileSize}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={handleRemove}
            className="h-7 w-7 shrink-0 hover:text-destructive"
            aria-label={`${fileName} মুছে ফেলুন`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}