'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ZoomImageProps {
    src: string;
    alt: string;
    className?: string;
    zoomScale?: number;
    lensSize?: number;
}

export function ZoomImage({
    src,
    alt,
    className,
    zoomScale = 2.5,
    lensSize = 150
}: ZoomImageProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0, relX: 0, relY: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const { left, top, width, height } = containerRef.current.getBoundingClientRect();

        // Position relative to the container for the lens placement
        const relX = e.clientX - left;
        const relY = e.clientY - top;

        // Percentage for the background position
        const x = (relX / width) * 100;
        const y = (relY / height) * 100;

        setMousePos({ x, y, relX, relY });
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative overflow-hidden cursor-none bg-[var(--color-bg-secondary)] border border-[var(--color-border)]',
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Primary Image */}
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority
            />

            {/* Magnifying Glass Lens */}
            {isHovered && (
                <div
                    className="absolute pointer-events-none border-2 border-[var(--color-accent)] rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-no-repeat z-50"
                    style={{
                        width: `${lensSize}px`,
                        height: `${lensSize}px`,
                        left: `${mousePos.relX - lensSize / 2}px`,
                        top: `${mousePos.relY - lensSize / 2}px`,
                        backgroundImage: `url(${src})`,
                        backgroundSize: `${containerRef.current ? containerRef.current.offsetWidth * zoomScale : 0}px ${containerRef.current ? containerRef.current.offsetHeight * zoomScale : 0}px`,
                        backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    }}
                />
            )}
        </div>
    );
}
