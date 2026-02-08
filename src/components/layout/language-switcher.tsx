'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const toggleLocale = () => {
        const nextLocale = locale === 'en' ? 'vi' : 'en';
        router.replace(
            // @ts-ignore
            { pathname, params },
            { locale: nextLocale }
        );
    };

    return (
        <button
            onClick={toggleLocale}
            className="flex items-center gap-2 group"
            aria-label="Switch Language"
        >
            <div className="relative w-10 h-6 border border-[var(--color-border)] rounded-full overflow-hidden transition-colors group-hover:border-[var(--color-accent)]">
                <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-all duration-300 ${locale === 'vi' ? 'left-1' : 'left-5'
                        } group-hover:bg-[var(--color-accent)] shadow-sm`}
                />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
                {locale === 'en' ? 'EN' : 'VI'}
            </span>
        </button>
    );
}
