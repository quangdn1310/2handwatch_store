'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Reveal, Button } from '@/components/ui';
import { authService } from '@/services/auth.service';

export default function LoginPage() {
    const t = useTranslations('auth');
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await authService.login(username, password);
            router.push('/dashboard');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-black px-4">
            <Reveal direction="up">
                <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-serif font-bold text-white mb-2">ĐĂNG NHẬP</h1>
                        <p className="text-white/40 text-sm tracking-widest uppercase">Quản trị viên hệ thống</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Tên đăng nhập</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Mật khẩu</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full h-12 font-bold uppercase tracking-widest text-xs mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
                        </Button>
                    </form>
                </div>
            </Reveal>
        </div>
    );
}
