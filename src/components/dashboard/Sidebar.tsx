'use client';

import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
    DashboardIcon,
    GavelIcon,
    WatchIcon,
    // Add more icons as needed
} from '@/components/icons';

interface SidebarProps {
    locale: string;
}

export function Sidebar({ locale }: SidebarProps) {
    const pathname = usePathname();
    const t = useTranslations('dashboard.sidebar');

    const navItems = [
        {
            name: t('overview'),
            href: '/dashboard',
            icon: DashboardIcon,
        },
        {
            name: t('products'),
            href: '/dashboard/products',
            icon: WatchIcon,
        },
        {
            name: t('auctions'),
            href: '/dashboard/auctions',
            icon: GavelIcon,
        },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[var(--color-border)] bg-black pt-20 transition-transform">
            <div className="h-full overflow-y-auto px-3 pb-4">
                <ul className="space-y-2 font-medium">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center rounded-lg p-3 transition-colors duration-200 group',
                                        isActive
                                            ? 'bg-white/10 text-white'
                                            : 'text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white'
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            'w-5 h-5 transition-colors duration-200',
                                            isActive
                                                ? 'text-white'
                                                : 'text-[var(--color-text-muted)] group-hover:text-white'
                                        )}
                                    />
                                    <span className="ml-3 text-sm font-semibold tracking-wide uppercase">
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
