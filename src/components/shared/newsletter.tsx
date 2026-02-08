'use client';

import { useTranslations } from 'next-intl';
import { Button, Input } from '@/components/ui';

export function Newsletter() {
    const t = useTranslations('newsletter');

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-accent)] opacity-[0.03] blur-[120px] pointer-events-none"></div>

            <div className="container text-center space-y-8 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white" dangerouslySetInnerHTML={{ __html: t.raw('title').replace('\n', '<br />') }}>
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-base leading-relaxed">
                    {t('description')}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch justify-center gap-0 max-w-2xl mx-auto pt-4 shadow-2xl">
                    <Button variant="primary" className="rounded-none px-8 font-bold uppercase tracking-widest text-xs h-14">
                        {t('button')}
                    </Button>
                    <div className="flex-1 relative">
                        <Input
                            type="email"
                            placeholder={t('placeholder')}
                            className="bg-[var(--color-bg-secondary)] border-0 h-14 rounded-none px-6 focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                        />
                    </div>
                </div>
                <p className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-[0.2em]">
                    {t('disclaimer')}
                </p>
            </div>
        </section>
    );
}
