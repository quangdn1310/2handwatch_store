'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealProps {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none' | 'scale';
    delay?: number;
    duration?: number;
    threshold?: number;
    triggerOnce?: boolean;
}

export function Reveal({
    children,
    className,
    direction = 'up',
    delay = 0,
    duration = 0.8,
    threshold = 0.1,
    triggerOnce = true,
}: RevealProps) {
    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            scale: direction === 'scale' ? 0.95 : 1,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: duration,
                delay: delay / 1000,
                ease: [0.22, 1, 0.36, 1], // easeOutQuart
            },
        },
    };

    return (
        <motion.div
            className={cn('will-change-[transform,opacity]', className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: triggerOnce, amount: threshold }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
}
