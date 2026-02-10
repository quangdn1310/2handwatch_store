import { cn } from '@/lib/utils';

export interface BadgeProps {
    variant?: 'default' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error';
    children: React.ReactNode;
    className?: string;
}

const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    accent: 'bg-[var(--color-accent)] text-black',
    success: 'bg-emerald-500 text-black',
    warning: 'bg-amber-500 text-black',
    info: 'bg-sky-500 text-black',
    error: 'bg-red-500 text-white',
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
