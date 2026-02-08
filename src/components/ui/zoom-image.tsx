'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ZoomImageProps {
    src: string;
    alt: string;
    className?: string;
    zoomScale?: number;
}

export function ZoomImage({ src, alt, className, zoomScale = 2 }: ZoomImageProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;

        setMousePos({ x, y });
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative overflow-hidden cursor-zoom-in group bg-[var(--color-bg-secondary)] border border-[var(--color-border)]',
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            <div
                className="relative w-full h-full transition-transform duration-200 ease-out"
                style={{
                    transform: isHovered ? `scale(${zoomScale})` : 'scale(1)',
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    );
}
