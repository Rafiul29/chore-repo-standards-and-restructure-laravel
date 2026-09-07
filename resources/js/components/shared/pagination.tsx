import { PaginatedMeta } from "@/types/pagination";
import { Link } from "@inertiajs/react";

interface PaginationProps {
    meta: PaginatedMeta;
}

export function Pagination({ meta }: PaginationProps) {
    if (meta.last_page <= 1) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {meta.from ?? 0}–{meta.to ?? 0} of {meta.total}
            </p>

            <nav className="flex flex-wrap items-center gap-1">
                {meta.links.map((link, position) =>
                    link.url ? (
                        <Link
                            key={position}
                            href={link.url}
                            preserveScroll
                            preserveState
                            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <span
                            key={position}
                            className="rounded-md px-3 py-1.5 text-sm text-gray-400 dark:text-gray-600"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ),
                )}
            </nav>
        </div>
    );
}
