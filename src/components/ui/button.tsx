import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer border',
                    // Variants
                    {
                        'bg-[var(--color-accent)] text-black border-transparent hover:bg-[var(--color-accent-hover)]':
                            variant === 'primary',
                        'bg-[var(--color-bg-secondary)] text-white border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]':
                            variant === 'secondary',
                        'bg-transparent border-[var(--color-border-light)] text-white hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]':
                            variant === 'outline',
                        'bg-transparent border-transparent text-[var(--color-text-secondary)] hover:text-white':
                            variant === 'ghost',
                    },
                    // Sizes
                    {
                        'px-3 py-1.5 text-xs rounded': size === 'sm',
                        'px-5 py-2.5 text-sm rounded': size === 'md',
                        'px-6 py-3 text-base rounded-md': size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
