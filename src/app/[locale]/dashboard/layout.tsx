import { ReactNode } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';

interface DashboardLayoutProps {
    children: ReactNode;
    params: Promise<{
        locale: string;
    }>;
}

export default async function DashboardLayout({
    children,
    params,
}: DashboardLayoutProps) {
    const { locale } = await params;
    return (
        <div className="min-h-screen bg-[#050505]">
            <Topbar locale={locale} />
            <Sidebar locale={locale} />
            <div className="p-4 sm:ml-64 pt-24 min-h-screen">
                <main className="container mx-auto max-w-7xl">
                    {children}
                </main>
            </div>
        </div>
    );
}
