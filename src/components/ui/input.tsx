import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, ...props }, ref) => {
        return (
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-white text-sm transition-colors duration-200',
                        'focus:outline-none focus:border-[var(--color-accent)]',
                        'placeholder:text-[var(--color-text-muted)]',
                        icon ? 'pl-10 pr-4 py-3' : 'px-4 py-3',
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
