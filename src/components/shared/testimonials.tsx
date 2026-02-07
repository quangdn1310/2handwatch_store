'use client';

import { Reveal } from '@/components/ui';

const REVIEWS = [
    {
        name: 'Alexander Thompson',
        location: 'London, UK',
        text: 'The precision and condition of the 1968 Omega Seamaster I purchased exceeded all expectations. Exceptional service and authenticity verification.',
        stars: 5,
    },
    {
        name: 'Julianne Dubois',
        location: 'Paris, France',
        text: 'A truly premium experience. The watch arrived fully insured and the presentation was magnificent. Finding rare unisex pieces here is a joy.',
        stars: 5,
    },
    {
        name: 'Kenji Suzuki',
        location: 'Tokyo, Japan',
        text: 'Tiemdocu.unisex is my go-to for vintage restoration quality. Their master watchmakers clearly love these machines as much as I do.',
        stars: 5,
    },
];

export function Testimonials() {
    return (
        <section className="py-24 bg-[var(--color-bg-secondary)]/30 overflow-hidden">
            <div className="container space-y-16">
                <Reveal direction="up">
                    <div className="text-center space-y-4">
                        <h4 className="text-[var(--color-accent)] font-bold tracking-[0.4em] uppercase text-xs">
                            The Collective
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                            Voices of <span className="text-gold-gradient italic">Excellence</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review, index) => (
                        <Reveal
                            key={index}
                            direction="up"
                            delay={index * 200}
                        >
                            <div className="card p-8 h-full flex flex-col justify-between space-y-8 bg-black/40 backdrop-blur-sm">
                                <div className="space-y-6">
                                    <div className="flex gap-1 text-[var(--color-accent)]">
                                        {[...Array(review.stars)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-[var(--color-text-secondary)] italic leading-relaxed text-lg font-serif">
                                        "{review.text}"
                                    </p>
                                </div>
                                <div className="border-t border-[var(--color-border)] pt-6">
                                    <p className="text-white font-bold tracking-wide uppercase text-xs">
                                        {review.name}
                                    </p>
                                    <p className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-widest mt-1">
                                        {review.location}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
