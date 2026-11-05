// ==========================================
// SHARED FILE CONSTANTS
// ==========================================

export const FILE_UPLOAD = {
    MAX_SIZE_MB: 2,
    MAX_FILES: 3,

    IMAGE_ACCEPT: ".jpg,.jpeg,.png,.webp",
    DOCUMENT_ACCEPT: ".pdf,.jpg,.jpeg,.png,.webp",

    MIME_TYPES: {
        ".jpg": ["image/jpeg"],
        ".jpeg": ["image/jpeg"],
        ".png": ["image/png"],
        ".webp": ["image/webp"],
        ".pdf": ["application/pdf"],
    } as Record<string, string[]>,
} as const;

export type UploadFileValue = File | string;

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
// HELPERS
// ==========================================

export const formatUploadSize = (bytes: number): string => {
    if (!Number.isFinite(bytes) || bytes < 0) {
        return "0 MB";
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
