'use client';

import { Input } from '@/components/ui';
import { SearchIcon } from '@/components/icons';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export function SearchBar({
    placeholder = 'Tìm kiếm theo tên, thương hiệu...',
    value,
    onChange,
}: SearchBarProps) {
    return (
        <div className="relative w-full max-w-2xl">
            <Input
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                icon={<SearchIcon className="w-5 h-5" />}
                className="w-full"
            />
        </div>
    );
}
