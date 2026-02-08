'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface TopbarProps {
    locale: string;
}

export function Topbar({ locale }: TopbarProps) {
    const t = useTranslations('dashboard.topbar');

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-[var(--color-border)] bg-black/80 backdrop-blur-md">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <Link href={`/${locale}`} className="ms-2 flex md:me-24">
                            <span className="self-center whitespace-nowrap font-serif text-xl font-bold italic text-gold-gradient">
                                2HAND WATCH
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="ms-3 flex items-center">
                            <div className="text-right mr-3 hidden sm:block">
                                <p className="text-sm font-bold text-white leading-none">Admin</p>
                                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                                    Administrator
                                </p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-[var(--color-border)]">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
