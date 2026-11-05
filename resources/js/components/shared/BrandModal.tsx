import * as React from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: MaxWidth;
  className?: string;
  hideHeader?: boolean;
}

const maxWidthClasses: Record<MaxWidth, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
};

/**
 * Reusable compact modal component.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'lg',
  className,
  hideHeader = false,
}: ModalProps) {
  const hasHeader = !hideHeader && (title || description);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        className={cn(
          'gap-0 overflow-hidden',
          'rounded-xl border border-border/40',
          'bg-background p-0 shadow-md',
          maxWidthClasses[maxWidth],
          className,
        )}
      >
        {hasHeader && (
          <DialogHeader
            className={cn(
              'space-y-0.5',
              'border-b border-border/30',
              'bg-muted/5',
              'px-3 py-2.5',
            )}
          >
            {title && (
              <DialogTitle className="text-sm font-semibold leading-5">
                {title}
              </DialogTitle>
            )}

            {description && (
              <DialogDescription className="text-xs leading-4">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        <div
          className={cn(
            'min-w-0',
            'px-4 py-3',
          )}
        >
          {!hasHeader && description && (
            <DialogDescription className="mb-2 text-xs leading-4">
              {description}
            </DialogDescription>
          )}

          {children}
        </div>

        {footer && (
          <div
            className={cn(
              'border-t border-border/30',
              'bg-muted/5',
              'px-3 py-2',
            )}
          >
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}