import * as React from "react";
import { FileText, UploadCloud, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
  accept = "*",
  disabled,
  className,
  description = "Drag & drop a file here or click to browse",
  value,
  onChange,
}: FormFileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = React.useState<File | string | null>(
    value ?? null
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedFile(value);
    }
  }, [value]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;

    setSelectedFile(file);
    onChange?.(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);

    onChange?.(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("w-full max-w-full space-y-2 box-border overflow-hidden", className)}>
      {label && (
        <Label className="block truncate">
          {label}
          {required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </Label>
      )}

      <div
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "w-full max-w-full box-border flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/20 px-4 py-6 text-center transition-all hover:border-primary hover:bg-muted/40",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground shrink-0" />

        <h3 className="font-medium text-sm">
          Click to upload
        </h3>

        <p className="mt-1 text-xs text-muted-foreground px-2">
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
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 p-2.5 w-full max-w-full box-border overflow-hidden">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <FileText className="h-4 w-4 text-primary shrink-0" />

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">
                {typeof selectedFile === 'string'
                  ? selectedFile.split('/').pop()
                  : selectedFile.name}
              </p>

              <p className="text-[11px] text-muted-foreground">
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