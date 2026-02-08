'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SITE_CONFIG, ROUTES } from '@/constants';
import { Button } from '@/components/ui';
import { CartIcon, MenuIcon, CloseIcon, WatchIcon } from '@/components/icons';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
    const t = useTranslations('nav');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: ROUTES.home, label: t('home') },
        { href: ROUTES.products, label: t('collection') },
        { href: ROUTES.about, label: t('about') },
        { href: '/brands', label: t('brands') },
        { href: '/faq', label: t('faq') },
        { href: ROUTES.contact, label: t('contact') },
    ];

    return (
        <header className="sticky top-0 z-50 w-full glass-header">
            <div className="container">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href={ROUTES.home} className="flex items-center gap-3 group">
                        <div className="relative">
                            <WatchIcon className="w-8 h-8 text-[var(--color-accent)] group-hover:rotate-12 transition-transform duration-300" />
                            <div className="absolute -inset-1 bg-[var(--color-accent)] opacity-20 blur-sm rounded-full group-hover:opacity-40 transition-opacity"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold tracking-[0.4em] text-[var(--color-text-muted)] uppercase leading-none mb-1">
                                Tiemdocu
                            </span>
                            <span className="text-xl font-serif font-bold text-white group-hover:text-[var(--color-accent)] transition-colors leading-none tracking-tight">
                                .Unisex
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                // @ts-ignore
                                href={link.href}
                                className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] hover:text-white transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--color-accent)] hover:after:w-full after:transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        {/* Language Selector */}
                        <LanguageSwitcher />

                        {/* New & Trending Button */}
                        <Button variant="outline" size="sm" className="hidden md:flex rounded-none border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white hover:border-white h-10 px-4 text-[10px] font-bold uppercase tracking-widest transition-all">
                            {t('trending')}
                        </Button>

                        {/* Cart */}
                        <Link
                            href={ROUTES.cart}
                            className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            <CartIcon className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-accent)] text-black text-xs font-bold rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-[var(--color-text-secondary)] hover:text-white transition-colors"
                        >
                            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-[var(--color-border)] py-4">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    // @ts-ignore
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-3 text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-secondary)] rounded transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
