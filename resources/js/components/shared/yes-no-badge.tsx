import { Badge } from "@/components/ui/badge";

interface YesNoBadgeProps {
    on: boolean;
    onLabel?: string;
    offLabel?: string;
}

export function YesNoBadge({
    on,
    onLabel = "Yes",
    offLabel = "No",
}: YesNoBadgeProps) {
    return on ? (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
            {onLabel}
        </Badge>
    ) : (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
            {offLabel}
        </Badge>
    );
}
