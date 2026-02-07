'use client';

import { Button, Input } from '@/components/ui';

export function Newsletter() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-accent)] opacity-[0.03] blur-[120px] pointer-events-none"></div>

            <div className="container text-center space-y-8 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                    Don't Miss a Single <br />
                    <span className="text-gold-gradient font-serif italic font-medium">Vintage Treasure</span>
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-base leading-relaxed">
                    Get early access to rare vintage finds, sneak-peaks, and behind-the-scenes moments.
                    Follow the journey. Stay inspired.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch justify-center gap-0 max-w-2xl mx-auto pt-4 shadow-2xl">
                    <Button variant="primary" className="rounded-none px-8 font-bold uppercase tracking-widest text-xs h-14">
                        Subscribe
                    </Button>
                    <div className="flex-1 relative">
                        <Input
                            type="email"
                            placeholder="Enter your email..."
                            className="bg-[var(--color-bg-secondary)] border-0 h-14 rounded-none px-6 focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                        />
                    </div>
                    <Button variant="outline" className="rounded-none border-l-0 border-[var(--color-border)] px-8 font-bold uppercase tracking-widest text-xs h-14 hover:bg-[var(--color-bg-secondary)]">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Follow Instagram
                    </Button>
                </div>
            </div>
        </section>
    );
}
