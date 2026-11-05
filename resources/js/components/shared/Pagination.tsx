import { Link } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from 'lucide-react';

import type { PaginatedMeta } from '@/types/pagination';

interface PaginationProps {
    meta?: PaginatedMeta;
}

type PageItem =
    | {
        type: 'page';
        page: number;
    }
    | {
        type: 'ellipsis';
    };

/**
 * Creates compact pagination items.
 *
 * Examples for 10 pages:
 *
 * Page 1:
 * 1 2 ... 9 10
 *
 * Page 2:
 * 1 2 ... 9 10
 *
 * Page 5:
 * 1 ... 5 6 ... 10
 *
 * Page 9:
 * 1 ... 9 10
 *
 * Page 10:
 * 1 ... 9 10
 */
function getPageItems(
    currentPage: number,
    lastPage: number,
): PageItem[] {
    if (lastPage <= 5) {
        return Array.from(
            { length: lastPage },
            (_, index) => ({
                type: 'page' as const,
                page: index + 1,
            }),
        );
    }

    // Beginning pages
    if (currentPage <= 2) {
        return [
            {
                type: 'page',
                page: 1,
            },
            {
                type: 'page',
                page: 2,
            },
            {
                type: 'ellipsis',
            },
            {
                type: 'page',
                page: lastPage - 1,
            },
            {
                type: 'page',
                page: lastPage,
            },
        ];
    }

    // Ending pages
    if (currentPage >= lastPage - 1) {
        return [
            {
                type: 'page',
                page: 1,
            },
            {
                type: 'ellipsis',
            },
            {
                type: 'page',
                page: lastPage - 1,
            },
            {
                type: 'page',
                page: lastPage,
            },
        ];
    }

    // Middle pages
    return [
        {
            type: 'page',
            page: 1,
        },
        {
            type: 'ellipsis',
        },
        {
            type: 'page',
            page: currentPage,
        },
        {
            type: 'page',
            page: currentPage + 1,
        },
        {
            type: 'ellipsis',
        },
        {
            type: 'page',
            page: lastPage,
        },
    ];
}

/**
 * Data table pagination component.
 */
export function Pagination({
    meta,
}: PaginationProps) {
    if (!meta || meta.last_page <= 1) {
        return null;
    }

    const currentPage = meta.current_page;
    const lastPage = meta.last_page;

    const previousLink = meta.links[0];

    const nextLink =
        meta.links[meta.links.length - 1];

    const pageLinks = meta.links.filter(
        (link) =>
            link.page !== null &&
            /^\d+$/.test(link.label.trim()),
    );

    /**
     * Returns the URL for a specific page.
     */
    const getPageUrl = (
        page: number,
    ): string | null => {
        return (
            pageLinks.find(
                (link) => link.page === page,
            )?.url ?? null
        );
    };

    const pageItems = getPageItems(
        currentPage,
        lastPage,
    );

    /**
     * Page button classes.
     */
    const getPageClassName = (
        isActive: boolean,
    ): string => {
        return [
            'inline-flex h-7 min-w-7 shrink-0',
            'items-center justify-center',
            'rounded-md border px-1.5',
            'text-[11px] font-medium',
            'whitespace-nowrap',
            'transition-colors',
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-ring',
            isActive
                ? 'border-primary bg-primary text-primary-foreground shadow-xs hover:bg-primary/90'
                : 'border-border/40 bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
        ].join(' ');
    };

    /**
     * Navigation button classes.
     */
    const navigationClassName =
        'inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-md border border-border/40 bg-background px-2 text-[11px] font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

    /**
     * Disabled navigation button classes.
     */
    const disabledNavigationClassName =
        'inline-flex h-7 shrink-0 cursor-not-allowed items-center gap-1 whitespace-nowrap rounded-md border border-border/30 bg-muted/40 px-2 text-[11px] font-medium text-muted-foreground/50';

    /**
     * Renders a page item.
     */
    const renderPageItem = (
        item: PageItem,
        index: number,
    ) => {
        if (item.type === 'ellipsis') {
            return (
                <span
                    key={`ellipsis-${index}`}
                    className="inline-flex h-7 w-5 shrink-0 items-center justify-center"
                    aria-hidden="true"
                >
                    <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                </span>
            );
        }

        const url = getPageUrl(item.page);

        if (!url) {
            return null;
        }

        const isActive =
            item.page === currentPage;

        return (
            <Link
                key={`page-${item.page}`}
                href={url}
                preserveScroll
                aria-current={
                    isActive ? 'page' : undefined
                }
                className={getPageClassName(isActive)}
            >
                {item.page}
            </Link>
        );
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="flex w-max min-w-full items-center justify-start gap-1">
                {/* Previous */}
                {previousLink?.url ? (
                    <Link
                        href={previousLink.url}
                        preserveScroll
                        className={navigationClassName}
                    >
                        <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                        <span>Previous</span>
                    </Link>
                ) : (
                    <span
                        className={
                            disabledNavigationClassName
                        }
                    >
                        <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                        <span>Previous</span>
                    </span>
                )}

                {/* Pages */}
                <div className="flex shrink-0 items-center gap-1">
                    {pageItems.map(renderPageItem)}
                </div>

                {/* Next */}
                {nextLink?.url ? (
                    <Link
                        href={nextLink.url}
                        preserveScroll
                        className={navigationClassName}
                    >
                        <span>Next</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                ) : (
                    <span
                        className={
                            disabledNavigationClassName
                        }
                    >
                        <span>Next</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                  
                    </span>
                )}
            </div>
        </div>
    );
}