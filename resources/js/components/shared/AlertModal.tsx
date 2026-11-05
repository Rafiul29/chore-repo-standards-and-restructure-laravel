import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type MaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ConfirmModalProps {
  open: boolean;
  loading?: boolean;

  title?: string;
  description?: string;

  confirmText?: string;
  cancelText?: string;

  icon?: LucideIcon;
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

/**
 * Compact confirmation modal for destructive actions.
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
  maxWidth = 'xs',
}: ConfirmModalProps) {
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
        className={cn(
          'gap-0 overflow-hidden',
          'rounded-xl border border-border/50',
          'bg-background p-0 shadow-md',
          maxWidthClasses[maxWidth],
        )}
      >
        {/* Content */}
        <div className="flex flex-col items-center gap-3.5 px-5 py-5 text-center">
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center',
              'rounded-lg',
              'bg-destructive/10 text-destructive',
            )}
          >
            <Icon className="size-5" strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold leading-5 text-foreground">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div
          className={cn(
            'flex items-center',
            'border-t border-border/40',
            'bg-muted/5',
          )}
        >
          <Button
            type="button"
            variant="ghost"
            className={cn(
              'h-10 flex-1 rounded-none',
              'bg-transparent px-3',
              'text-sm font-medium text-primary',
              'shadow-none',
              'hover:bg-primary/5 hover:text-primary',
            )}
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <span
            aria-hidden="true"
            className="h-5 w-px shrink-0 bg-border/50"
          />

          <Button
            type="button"
            variant="ghost"
            className={cn(
              'h-10 flex-1 rounded-none',
              'bg-transparent px-3',
              'text-sm font-medium text-destructive',
              'shadow-none',
              'hover:bg-destructive/5 hover:text-destructive',
            )}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading && (
              <Loader2 className="mr-1.5 size-3.5 animate-spin" />
            )}

            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}