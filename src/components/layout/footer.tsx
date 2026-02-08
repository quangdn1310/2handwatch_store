'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SITE_CONFIG, ROUTES } from '@/constants';
import { WatchIcon, InstagramIcon, FacebookIcon, TwitterIcon } from '@/components/icons';

export function Footer() {
    const t = useTranslations('footer');
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        products: [
            { href: '/all', label: t('links.all') },
            { href: '/live', label: t('links.sale') },
            { href: '/upcoming', label: t('links.upcoming') },
            { href: '/how-it-works', label: t('links.howToBuy') },
        ],
        company: [
            { href: '/support', label: t('links.support') },
            { href: '/about', label: t('links.about') },
            { href: '/dealers', label: t('links.dealers') },
            { href: '/brands', label: t('links.brands') },
            { href: '/faq', label: t('links.faq') },
            { href: '/contact', label: t('links.contact') },
        ],
        legal: [
            { href: '/privacy', label: t('links.privacy') },
            { href: '/terms', label: t('links.terms') },
            { href: '/cookie', label: t('links.cookie') },
            { href: '/cookies-settings', label: t('links.settings') },
        ],
    };

    return (
        <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Logo */}
                        <Link href={ROUTES.home} className="flex items-center gap-3">
                            <WatchIcon className="w-8 h-8 text-[var(--color-accent)]" />
                            <div className="flex flex-col">
                                <span className="text-sm font-light tracking-widest text-[var(--color-text-muted)] uppercase">
                                    Tiemdocu
                                </span>
                                <span className="text-lg font-serif font-semibold text-[var(--color-accent)] -mt-1">
                                    .Unisex
                                </span>
                            </div>
                        </Link>

                        <p className="text-sm text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
                            {t('description')}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                            >
                                <InstagramIcon />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                            >
                                <FacebookIcon />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                            >
                                <TwitterIcon />
                            </a>
                        </div>
                    </div>

                    {/* Products Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                            {t('columns.products')}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.products.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        // @ts-ignore
                                        href={link.href}
                                        className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                            {t('columns.company')}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        // @ts-ignore
                                        href={link.href}
                                        className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                            {t('columns.legal')}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        // @ts-ignore
                                        href={link.href}
                                        className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-[var(--color-border)]">
                <div className="container py-6">
                    <p className="text-center text-sm text-[var(--color-text-muted)]">
                        © {currentYear} {SITE_CONFIG.name}. {t('rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
