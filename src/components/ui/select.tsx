'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (event: { target: { value: string; name?: string } }) => void;
    placeholder?: string;
    className?: string;
    name?: string;
}

export function Select({
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = 'Select an option',
    className,
    name,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(controlledValue || defaultValue || '');
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync internal state with controlled value
    useEffect(() => {
        if (controlledValue !== undefined) {
            setInternalValue(controlledValue);
        }
    }, [controlledValue]);

    useClickOutside(containerRef, () => setIsOpen(false));

    const selectedOption = options.find((opt) => opt.value === internalValue);

    const handleSelect = (option: SelectOption) => {
        if (controlledValue === undefined) {
            setInternalValue(option.value);
        }
        setIsOpen(false);
        onChange?.({
            target: {
                value: option.value,
                name,
            },
        });
    };

    return (
        <div ref={containerRef} className={cn('relative inline-block w-full', className)}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'flex items-center justify-between w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded px-4 py-3 text-sm text-white transition-all duration-200 outline-none hover:border-[var(--color-accent)]',
                    isOpen && 'border-[var(--color-accent)] shadow-[0_0_10px_rgba(212,168,83,0.2)]'
                )}
            >
                <span className={cn('truncate', !selectedOption && 'text-[var(--color-text-muted)]')}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg
                    className={cn(
                        'w-4 h-4 text-[var(--color-text-muted)] transition-transform duration-200',
                        isOpen && 'rotate-180 text-[var(--color-accent)]'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <ul
                    className={cn(
                        'absolute z-[100] w-full mt-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200',
                        'max-h-60 overflow-y-auto custom-scrollbar'
                    )}
                >
                    {options.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={cn(
                                    'w-full text-left px-4 py-3 text-sm transition-colors duration-150 flex items-center justify-between',
                                    option.value === internalValue
                                        ? 'bg-[var(--color-bg-card-hover)] text-[var(--color-accent)] font-bold'
                                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card-hover)] hover:text-white'
                                )}
                            >
                                <span>{option.label}</span>
                                {option.value === internalValue && (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
