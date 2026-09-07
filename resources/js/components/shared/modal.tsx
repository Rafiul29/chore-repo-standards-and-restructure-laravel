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
                        // default width, max-h, min-h are set here
                        "flex max-h-[85vh] min-h-[250px] w-full flex-col gap-0 overflow-hidden p-0",
                        maxWidthClasses[maxWidth],
                        className, // provided externally overrides; otherwise the default is used
                    )}
                >
                    {!hideHeader && (title || description) && (
                        <DialogHeader
                            className={cn(
                                "shrink-0 border-b p-4",
                                headerClassName,
                            )}
                        >
                            {title && <DialogTitle>{title}</DialogTitle>}
                        </DialogHeader>
                    )}

                    <div
                        className={cn(
                            "min-h-[120px] flex-1 overflow-y-auto p-4",
                            bodyClassName,
                        )}
                    >
                        {description && (
                            <DialogDescription className="text-muted-foreground mb-2 text-sm">
                                {description}
                            </DialogDescription>
                        )}
                        {children}
                    </div>

                    {footer && (
                        <div
                            className={cn(
                                "bg-background shrink-0 border-t p-4",
                                footerClassName,
                            )}
                        >
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
                    // default mobile drawer height and minimum size
                    "flex max-h-[90vh] min-h-[250px] w-full flex-col",
                    className,
                )}
            >
                {!hideHeader && (title || description) && (
                    <DrawerHeader
                        className={cn(
                            "shrink-0 border-b p-4 text-left",
                            headerClassName,
                        )}
                    >
                        {title && <DrawerTitle>{title}</DrawerTitle>}
                    </DrawerHeader>
                )}

                <div
                    className={cn(
                        "min-h-[120px] flex-1 overflow-y-auto p-4",
                        bodyClassName,
                    )}
                >
                    {description && (
                        <DrawerDescription className="text-muted-foreground mb-2 text-sm">
                            {description}
                        </DrawerDescription>
                    )}
                    {children}
                </div>

                {footer && (
                    <DrawerFooter
                        className={cn(
                            "shrink-0 border-t p-4 pt-2",
                            footerClassName,
                        )}
                    >
                        {footer}
                    </DrawerFooter>
                )}
            </DrawerContent>
        </Drawer>
    );
}
