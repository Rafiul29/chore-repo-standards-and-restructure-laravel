// resources/js/Components/ui/responsive-modal.tsx

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: MaxWidth;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  hideHeader?: boolean;
}

const maxWidthClasses: Record<MaxWidth, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  full: "sm:max-w-[95vw] sm:h-[95vh]",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "lg",
  className,
  bodyClassName,
  headerClassName,
  footerClassName,
  hideHeader = false,
}: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Desktop View (Dialog)
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className={cn(
            // ডিফল্ট width, max-h, min-h এখানে সেট করা আছে
            "gap-0 p-0 w-full max-h-[85vh] min-h-[250px] flex flex-col overflow-hidden",
            maxWidthClasses[maxWidth],
            className // বাইরে থেকে দিলে ওভাররাইড হবে, না দিলে ডিফল্ট নেবে
          )}
        >
          {!hideHeader && (title || description) && (
            <DialogHeader className={cn("border-b p-4 shrink-0", headerClassName)}>
              {title && <DialogTitle>{title}</DialogTitle>}
            </DialogHeader>
          )}

          <div className={cn("p-4 overflow-y-auto flex-1 min-h-[120px]", bodyClassName)}>
            {description && (
              <DialogDescription className="mb-2 text-muted-foreground text-sm">
                {description}
              </DialogDescription>
            )}
            {children}
          </div>

          {footer && (
            <div className={cn("border-t p-4 shrink-0 bg-background", footerClassName)}>
              {footer}
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile View (Drawer)
  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent
        className={cn(
          // ডিফল্ট মোবাইল ড্রয়ার হাইট ও মিনিমাম সাইজ
          "w-full max-h-[90vh] min-h-[250px] flex flex-col",
          className
        )}
      >
        {!hideHeader && (title || description) && (
          <DrawerHeader className={cn("border-b p-4 text-left shrink-0", headerClassName)}>
            {title && <DrawerTitle>{title}</DrawerTitle>}
          </DrawerHeader>
        )}

        <div className={cn("p-4 overflow-y-auto flex-1 min-h-[120px]", bodyClassName)}>
          {description && (
            <DrawerDescription className="mb-2 text-muted-foreground text-sm">
              {description}
            </DrawerDescription>
          )}
          {children}
        </div>

        {footer && (
          <DrawerFooter className={cn("border-t p-4 shrink-0 pt-2", footerClassName)}>
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}