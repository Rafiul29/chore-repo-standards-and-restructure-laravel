import { Loader2 } from "lucide-react";

import { Modal } from "./modal";
import { Button } from "@/components/ui/button";

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl";

interface ConfirmModalProps {
    open: boolean;
    loading?: boolean;

    title?: string;
    description?: string;

    confirmText?: string;
    cancelText?: string;
    maxWidth?: MaxWidth; // <-- Added maxWidth prop

    onConfirm: () => void;
    onClose: () => void;
}

export function ConfirmModal({
    open,
    loading,
    onClose,
    onConfirm,
    title = "Delete Item",
    description = "Are you sure? This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel",
    maxWidth = "sm", // <-- Default to "sm" (or change to your preferred default)
}: ConfirmModalProps) {
    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title={title}
            description={description}
            maxWidth={maxWidth} // <-- Passed down to Modal
            footer={
                <div className="flex justify-end gap-2">
                    <Button
                        variant="default"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        {confirmText}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>
                </div>
            }
        >
            <div />
        </Modal>
    );
}
