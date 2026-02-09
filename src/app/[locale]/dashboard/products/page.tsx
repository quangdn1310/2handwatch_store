'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ProductTable } from '@/components/dashboard/ProductTable';
import { ProductForm } from '@/components/dashboard/ProductForm';
import { Button, Reveal } from '@/components/ui';
import { PlusIcon } from '@/components/icons';
import { WatchCardProps } from '@/components/shared/watch-card';
import { Pagination } from '@/components/shared';
import { productService, WatchCreateInput } from '@/services/product.service';

export default function ProductsManagementPage() {
    const t = useTranslations('dashboard.products');
    const [products, setProducts] = useState<WatchCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<WatchCardProps | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const itemsPerPage = 10;

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await productService.getAll(currentPage, itemsPerPage);
            setProducts(response.items);
            setTotalPages(response.totalPages);
            setTotalProducts(response.total);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch products:', err);
            setError('Failed to load products. Please ensure the API server is running.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleEditProduct = (product: WatchCardProps) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleDeleteProduct = async (product: WatchCardProps) => {
        if (confirm(`Are you sure you want to delete ${product.name}?`)) {
            try {
                await productService.delete(product.id);
                setProducts(products.filter((p) => p.id !== product.id));
            } catch (err) {
                alert('Failed to delete product. Please try again.');
            }
        }
    };

    const handleFormSubmit = async (data: Partial<WatchCreateInput>) => {
        try {
            if (editingProduct) {
                const updated = await productService.update(editingProduct.id, data);
                setProducts(products.map((p) => (p.id === editingProduct.id ? updated : p)));
            } else {
                const created = await productService.create(data as WatchCreateInput);
                setProducts([created, ...products]);
            }
            setIsFormOpen(false);
            setEditingProduct(null);
        } catch (err) {
            alert('Failed to save product. Please check the form and your API connection.');
        }
    };

    const handleFormCancel = () => {
        setIsFormOpen(false);
        setEditingProduct(null);
    };

    if (isLoading && products.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <Reveal direction="up">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
                            {t('title')}
                        </h1>
                        <p className="text-[var(--color-text-secondary)] mt-1 font-light italic">
                            {t('subtitle')}
                        </p>
                    </div>
                    {!isFormOpen && (
                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                onClick={fetchProducts}
                                className="px-6 font-bold uppercase tracking-widest text-xs h-12"
                            >
                                Refresh
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleAddProduct}
                                className="flex items-center gap-2 px-6 font-bold uppercase tracking-widest text-xs h-12"
                            >
                                <PlusIcon className="w-4 h-4" />
                                {t('addProduct')}
                            </Button>
                        </div>
                    )}
                </div>
            </Reveal>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                    {error}
                </div>
            )}

            {isFormOpen ? (
                <Reveal direction="up">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white">
                            {editingProduct ? t('editProduct') : t('addProduct')}
                        </h2>
                        <ProductForm
                            initialData={editingProduct || undefined}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                    </div>
                </Reveal>
            ) : (
                <div className="space-y-8">
                    <Reveal direction="up" delay={200}>
                        <ProductTable
                            products={products}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteProduct}
                        />
                    </Reveal>

                    {totalPages > 1 && (
                        <Reveal direction="up" delay={300}>
                            <div className="pt-4 border-t border-white/5">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </Reveal>
                    )}
                </div>
            )}
        </div>
    );
}
