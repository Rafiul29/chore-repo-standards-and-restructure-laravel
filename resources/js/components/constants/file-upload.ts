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
