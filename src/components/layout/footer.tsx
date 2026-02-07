import Link from 'next/link';
import { SITE_CONFIG, ROUTES } from '@/constants';
import { WatchIcon, InstagramIcon, FacebookIcon, TwitterIcon } from '@/components/icons';

const footerLinks = {
    auctions: [
        { href: '/all', label: 'All Products' },
        { href: '/live', label: 'On Sale' },
        { href: '/upcoming', label: 'Upcoming' },
        { href: '/how-it-works', label: 'How to Buy' },
    ],
    company: [
        { href: '/support', label: 'Support' },
        { href: '/about', label: 'About Us' },
        { href: '/dealers', label: 'Dealers' },
        { href: '/brands', label: 'Brands' },
        { href: '/faq', label: 'FAQ' },
        { href: '/contact', label: 'Contact' },
    ],
    legal: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Use' },
        { href: '/cookie', label: 'Cookie Policy' },
        { href: '/cookies-settings', label: 'Cookie Settings' },
    ],
};

export function Footer() {
    const currentYear = new Date().getFullYear();

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
                            Celebrating the art of time by connecting people,
                            stories, and exceptional vintage watches that inspire
                            you to live in the moment, seize opportunities.
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

                    {/* Auctions Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                            Products
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.auctions.map((link) => (
                                <li key={link.href}>
                                    <Link
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
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
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
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
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
                        © {currentYear} {SITE_CONFIG.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
