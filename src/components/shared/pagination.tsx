'use client';

import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Show max 5 page numbers
    const getVisiblePages = () => {
        if (totalPages <= 5) return pages;

        if (currentPage <= 3) return [...pages.slice(0, 5), -1, totalPages];
        if (currentPage >= totalPages - 2) return [1, -1, ...pages.slice(-5)];

        return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center gap-2">
            {/* Previous */}
            <button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                    'w-10 h-10 flex items-center justify-center rounded border border-[var(--color-border)] transition-colors',
                    currentPage === 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                )}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Page Numbers */}
            {visiblePages.map((page, index) =>
                page === -1 ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-[var(--color-text-muted)]">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange?.(page)}
                        className={cn(
                            'w-10 h-10 flex items-center justify-center rounded border transition-colors text-sm font-medium',
                            page === currentPage
                                ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black'
                                : 'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                        )}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                    'w-10 h-10 flex items-center justify-center rounded border border-[var(--color-border)] transition-colors',
                    currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                )}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Last */}
            <button
                onClick={() => onPageChange?.(totalPages)}
                disabled={currentPage === totalPages}
                className={cn(
                    'w-10 h-10 flex items-center justify-center rounded border border-[var(--color-border)] transition-colors',
                    currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                )}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
