'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui';
import { DashboardIcon, WatchIcon } from '@/components/icons';

export default function DashboardOverviewPage() {
    const t = useTranslations('dashboard.sidebar');

    const stats = [
        { name: t('products'), value: '12', icon: WatchIcon, color: 'text-blue-500' },
        { name: 'Total Orders', value: '48', icon: DashboardIcon, color: 'text-green-500' },
        { name: 'Revenue', value: '250.000.000đ', icon: DashboardIcon, color: 'text-gold-gradient' },
    ];

    return (
        <div className="space-y-8 pb-12">
            <Reveal direction="up">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
                        {t('overview')}
                    </h1>
                    <p className="text-[var(--color-text-secondary)] mt-1 font-light italic">
                        Welcome to your dashboard. Control everything from here.
                    </p>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Reveal key={stat.name} direction="up" delay={index * 100}>
                        <div className="bg-[#0A0A0A] border border-[var(--color-border)] p-6 rounded-2xl hover:border-[var(--color-accent)] transition-all group overflow-hidden relative">
                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <stat.icon className="w-32 h-32" />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[var(--color-text-muted)] text-xs font-bold uppercase tracking-widest">
                                        {stat.name}
                                    </p>
                                    <p className="text-2xl font-bold text-white mt-1">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal direction="up" delay={300}>
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-[#0A0A0A] border border-[var(--color-border)] p-8 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-4 italic">Recent Activity</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                                            <span className="text-[10px] text-white">#{i}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-white font-medium">New product added: Rado Manhattan</p>
                                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">2 hours ago</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-[var(--color-accent)] cursor-pointer hover:underline">View</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
