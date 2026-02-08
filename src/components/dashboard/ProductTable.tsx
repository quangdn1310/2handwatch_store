'use client';

import { useTranslations } from 'next-intl';
import { EditIcon, DeleteIcon } from '@/components/icons';
import { Reveal } from '@/components/ui';
import { WatchCardProps } from '@/components/shared/watch-card';

interface ProductTableProps {
    products: WatchCardProps[];
    onEdit: (product: WatchCardProps) => void;
    onDelete: (product: WatchCardProps) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    const t = useTranslations('dashboard.products.table');
    const ct = useTranslations('product.conditions');

    return (
        <div className="relative overflow-x-auto shadow-2xl sm:rounded-xl border border-[var(--color-border)] bg-[#0A0A0A]">
            <table className="w-full text-sm text-left text-[var(--color-text-secondary)]">
                <thead className="text-xs text-white uppercase bg-white/5 border-b border-[var(--color-border)]">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-bold tracking-wider">
                            {t('name')}
                        </th>
                        <th scope="col" className="px-6 py-4 font-bold tracking-wider">
                            {t('brand')}
                        </th>
                        <th scope="col" className="px-6 py-4 font-bold tracking-wider">
                            {t('price')}
                        </th>
                        <th scope="col" className="px-6 py-4 font-bold tracking-wider">
                            {t('condition')}
                        </th>
                        <th scope="col" className="px-6 py-4 font-bold tracking-wider text-right">
                            {t('actions')}
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                    {products.map((product, index) => (
                        <tr
                            key={product.id}
                            className="bg-transparent hover:bg-white/5 transition-colors duration-200"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-white whitespace-nowrap flex items-center gap-4"
                            >
                                <div className="h-10 w-10 flex-shrink-0 relative rounded overflow-hidden bg-white/10">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <span className="max-w-[300px] truncate">{product.name}</span>
                            </th>
                            <td className="px-6 py-4">{product.brand}</td>
                            <td className="px-6 py-4 font-mono text-white">
                                {product.price.toLocaleString()}đ
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                                    {ct(product.condition)}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-all hover:scale-110"
                                        title="Edit"
                                    >
                                        <EditIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(product)}
                                        className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all hover:scale-110"
                                        title="Delete"
                                    >
                                        <DeleteIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
