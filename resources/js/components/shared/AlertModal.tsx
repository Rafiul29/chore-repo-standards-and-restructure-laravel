import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type MaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AlertModalTone = 'destructive' | 'primary' | 'warning' | 'success';

interface ConfirmModalProps {
    open: boolean;
    loading?: boolean;

    title?: string;
    description?: string;

    confirmText?: string;
    cancelText?: string;

    icon?: LucideIcon;
    tone?: AlertModalTone;
    maxWidth?: MaxWidth;

    onConfirm: () => void;
    onClose: () => void;
}

const maxWidthClasses: Record<MaxWidth, string> = {
    xs: 'sm:max-w-xs',
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
};

const toneClasses: Record<
    AlertModalTone,
    { icon: string; confirm: string; confirmHover: string; focus: string }
> = {
    destructive: {
        icon: 'border-destructive/10 bg-destructive/10 text-destructive',
        confirm: 'bg-destructive text-destructive-foreground',
        confirmHover: 'hover:bg-destructive/90',
        focus: 'focus-visible:ring-destructive/30',
    },
    primary: {
        icon: 'border-primary/10 bg-primary/10 text-primary',
        confirm: 'bg-primary text-primary-foreground',
        confirmHover: 'hover:bg-primary/90',
        focus: 'focus-visible:ring-primary/30',
    },
    warning: {
        icon: 'border-amber-500/10 bg-amber-500/10 text-amber-600 dark:text-amber-400',
        confirm: 'bg-amber-700 text-white dark:bg-amber-400 dark:text-black',
        confirmHover: 'hover:bg-amber-800 dark:hover:bg-amber-300',
        focus: 'focus-visible:ring-amber-500/30',
    },
    success: {
        icon: 'border-emerald-500/10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        confirm:
            'bg-emerald-700 text-white dark:bg-emerald-400 dark:text-black',
        confirmHover: 'hover:bg-emerald-800 dark:hover:bg-emerald-300',
        focus: 'focus-visible:ring-emerald-500/30',
    },
};

/**
 * Reusable confirmation modal with configurable icon, labels, and semantic colors.
 */
export function AlertModal({
    open,
    loading = false,
    onClose,
    onConfirm,
    title = 'Delete this item?',
    description = 'This item will be permanently deleted from this application.',
    confirmText = 'Delete',
    cancelText = 'Cancel',
    icon: Icon = AlertTriangle,
    tone = 'destructive',
    maxWidth = 'xs',
}: ConfirmModalProps) {
    const toneClass = toneClasses[tone];

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen && !loading) {
                    onClose();
                }
            }}
        >
            <DialogContent
                showCloseButton={false}
                overlayClassName={cn(
                    'bg-black/55',
                    'data-[state=closed]:duration-150 data-[state=open]:duration-200',
                )}
                className={cn(
                    'border-border/60 gap-0 overflow-hidden rounded-2xl border',
                    'bg-background p-0 shadow-xl shadow-black/10',
                    'data-[state=open]:animate-in data-[state=open]:fade-in-0',
                    'data-[state=open]:zoom-in-95 data-[state=open]:duration-200 data-[state=open]:ease-out',
                    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
                    'data-[state=closed]:zoom-out-95 data-[state=closed]:duration-150 data-[state=closed]:ease-in',
                    maxWidthClasses[maxWidth],
                )}
            >
                <div className="flex flex-col items-center gap-4 px-6 pt-7 pb-6 text-center">
                    <div
                        className={cn(
                            'flex size-12 shrink-0 items-center justify-center rounded-xl border',
                            'transition-colors duration-200',
                            toneClass.icon,
                        )}
                    >
                        <Icon
                            aria-hidden="true"
                            className="size-5"
                            strokeWidth={1.8}
                        />
                    </div>

                    <div className="min-w-0 space-y-1.5">
                        <DialogTitle className="text-foreground text-base leading-6 font-semibold tracking-tight">
                            {title}
                        </DialogTitle>

                        <DialogDescription className="text-muted-foreground text-sm leading-5">
                            {description}
                        </DialogDescription>
                    </div>
                </div>

                <div className="border-border/50 bg-muted/20 flex flex-col-reverse gap-2 border-t px-5 py-4 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            'h-10 rounded-lg px-4 text-sm font-medium',
                            'transition-colors duration-200',
                        )}
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>

                    <Button
                        type="button"
                        variant="default"
                        className={cn(
                            'h-10 rounded-lg px-4 text-sm font-medium shadow-sm',
                            'transition-colors duration-200',
                            toneClass.confirm,
                            toneClass.confirmHover,
                            toneClass.focus,
                        )}
                        onClick={onConfirm}
                        disabled={loading}
                        aria-busy={loading}
                    >
                        {loading && (
                            <Loader2
                                aria-hidden="true"
                                className="size-4 animate-spin"
                            />
                        )}

                        {confirmText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
