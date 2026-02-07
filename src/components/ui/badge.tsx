import { cn } from '@/lib/utils';

export interface BadgeProps {
    variant?: 'accent' | 'success' | 'warning' | 'info';
    children: React.ReactNode;
    className?: string;
}

const variantStyles = {
    accent: 'bg-[var(--color-accent)] text-black',
    success: 'bg-emerald-500 text-black',
    warning: 'bg-amber-500 text-black',
    info: 'bg-sky-500 text-black',
};

export function Badge({ variant = 'accent', children, className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded',
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
