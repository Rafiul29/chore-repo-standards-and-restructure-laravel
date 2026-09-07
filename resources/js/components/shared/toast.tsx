import { AlertTriangle, Check, Info, Loader2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export const appToast = {
    success: (title: string, description?: string) =>
        toast.success(title, {
            description,
            icon: <Check className="h-4 w-4" />,
        }),

    warning: (title: string, description?: string) =>
        toast.warning(title, {
            description,
            icon: <AlertTriangle className="h-4 w-4" />,
        }),

    error: (title: string, description?: string) =>
        toast.error(title, {
            description,
            icon: <XCircle className="h-4 w-4" />,
        }),

    info: (title: string, description?: string) =>
        toast.info(title, {
            description,
            icon: <Info className="h-4 w-4" />,
        }),

    loading: (title: string, description?: string) =>
        toast.loading(title, {
            description,
            icon: <Loader2 className="h-4 w-4 animate-spin" />,
        }),

    dismiss: (id?: string | number) => toast.dismiss(id),
};
