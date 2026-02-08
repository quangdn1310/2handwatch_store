'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui';

const POLICY_KEYS = ['authenticity', 'warranty', 'shipping', 'heritage'] as const;

export function StorePolicies() {
    const t = useTranslations('policies');

    const policies = [
        {
            key: 'authenticity' as const,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            key: 'warranty' as const,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            key: 'shipping' as const,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            ),
        },
        {
            key: 'heritage' as const,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-24 bg-black border-y border-[var(--color-border)]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {policies.map((policy, index) => (
                        <Reveal
                            key={index}
                            direction="up"
                            delay={index * 100}
                        >
                            <div className="space-y-6 flex flex-col items-center text-center group">
                                <div className="p-4 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-accent)] border border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-colors duration-500">
                                    {policy.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-serif font-bold text-white tracking-wide">
                                        {t(`${policy.key}.title`)}
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[250px] mx-auto">
                                        {t(`${policy.key}.description`)}
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
