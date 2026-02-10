'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
    children: ReactNode[];
    autoplay?: boolean;
    autoplayInterval?: number;
    itemsPerView?: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    gap?: number;
    showDots?: boolean;
    showArrows?: boolean;
    className?: string;
}

export function Carousel({
    children,
    autoplay = false,
    autoplayInterval = 5000,
    itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
    gap = 32,
    showDots = true,
    showArrows = true,
    className = ''
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const totalItems = children.length;
    const totalSlides = Math.ceil(totalItems / itemsToShow);

    // Handle responsive items per view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsToShow(itemsPerView.mobile);
            } else if (window.innerWidth < 1024) {
                setItemsToShow(itemsPerView.tablet);
            } else {
                setItemsToShow(itemsPerView.desktop);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [itemsPerView]);

    // Reset index when items to show changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [itemsToShow]);

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning]);

    const goToPrevious = useCallback(() => {
        const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
        goToSlide(newIndex);
    }, [currentIndex, totalSlides, goToSlide]);

    const goToNext = useCallback(() => {
        const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex);
    }, [currentIndex, totalSlides, goToSlide]);

    // Autoplay
    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            goToNext();
        }, autoplayInterval);

        return () => clearInterval(interval);
    }, [autoplay, autoplayInterval, goToNext]);

    const visibleItems = children.slice(
        currentIndex * itemsToShow,
        (currentIndex + 1) * itemsToShow
    );

    return (
        <div className={`relative ${className}`}>
            {/* Carousel Track */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-all duration-500 ease-out"
                    style={{ gap: `${gap}px` }}
                >
                    {visibleItems.map((child, index) => (
                        <div
                            key={currentIndex * itemsToShow + index}
                            className="flex-shrink-0"
                            style={{ width: `calc((100% - ${gap * (itemsToShow - 1)}px) / ${itemsToShow})` }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            {showArrows && totalSlides > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        disabled={isTransitioning}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 flex items-center justify-center bg-black/80 backdrop-blur-sm border border-white/10 hover:border-accent/50 hover:bg-black/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
                    </button>
                    <button
                        onClick={goToNext}
                        disabled={isTransitioning}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 flex items-center justify-center bg-black/80 backdrop-blur-sm border border-white/10 hover:border-accent/50 hover:bg-black/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {showDots && totalSlides > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            disabled={isTransitioning}
                            className={`h-1 transition-all duration-300 ${index === currentIndex
                                    ? 'w-12 bg-accent'
                                    : 'w-6 bg-white/20 hover:bg-white/40'
                                } disabled:cursor-not-allowed`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
