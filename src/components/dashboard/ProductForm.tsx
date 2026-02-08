'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Input, Select } from '@/components/ui';
import { WatchCardProps } from '@/components/shared/watch-card';
import { WatchCreateInput } from '@/services/product.service';
import { BACKEND_URL, API_BASE_URL } from '@/services/api';
import Image from 'next/image';

interface ProductFormProps {
    initialData?: WatchCardProps;
    onSubmit: (data: Partial<WatchCreateInput>) => void;
    onCancel: () => void;
}

export function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
    const t = useTranslations('dashboard.products.form');
    const ct = useTranslations('product.conditions');

    // Default specifications to satisfy backend requirements
    const defaultSpecs = {
        diameter: '40mm',
        thickness: '12mm',
        material: 'Stainless Steel',
        movement: 'Automatic',
        waterResistance: '30m',
        crystal: 'Sapphire',
        strap: 'Leather',
    };

    const [formData, setFormData] = useState<Partial<WatchCreateInput>>(() => {
        // Prefer the full images array if available, otherwise fallback to the single image
        const initialImages = initialData?.images && initialData.images.length > 0
            ? initialData.images
            : (initialData?.image ? [initialData.image] : []);

        // Ensure existing images have absolute URLs if they are served from our backend
        const processedImages = initialImages.map(url =>
            (url.startsWith('/static/') || url.startsWith('static/'))
                ? `${BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`
                : url
        );

        return {
            name: initialData?.name || '',
            brand: initialData?.brand || '',
            price: initialData?.price || 0,
            condition: initialData?.condition || 'excellent',
            images: processedImages,
            description: initialData?.description || '',
            specifications: initialData?.specifications || defaultSpecs,
        };
    });

    const [newFiles, setNewFiles] = useState<{ file: File; preview: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newEntries = Array.from(files).map((file) => ({
            file,
            preview: URL.createObjectURL(file), // Generate local preview
        }));

        setNewFiles((prev) => [...prev, ...newEntries]);

        // Reset input so the same file can be selected again if removed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeExistingImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images?.filter((_, i) => i !== index),
        }));
    };

    const removeNewFile = (index: number) => {
        setNewFiles((prev) => {
            const filtered = prev.filter((_, i) => i !== index);
            // Clean up the object URL to avoid memory leaks
            URL.revokeObjectURL(prev[index].preview);
            return filtered;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('spec.')) {
            const specKey = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                specifications: {
                    ...prev.specifications!,
                    [specKey]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: name === 'price' ? Number(value) : value,
            }));
        }
    };

    const handleSelectChange = (e: { target: { value: string; name?: string } }) => {
        setFormData((prev) => ({
            ...prev,
            condition: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const uploadUrl = `${API_BASE_URL}/uploads/`;
            const uploadedUrls: string[] = [];

            // Upload all new files
            for (const item of newFiles) {
                const data = new FormData();
                data.append('file', item.file);

                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    body: data,
                });

                if (!response.ok) throw new Error(`Failed to upload ${item.file.name}`);

                const result = await response.json();
                const fullUrl = result.url.startsWith('http')
                    ? result.url
                    : `${BACKEND_URL}${result.url}`;

                uploadedUrls.push(fullUrl);
            }

            // Combine existing images (that weren't removed) with the new uploaded URLs
            const finalImages = [...(formData.images || []), ...uploadedUrls];

            onSubmit({
                ...formData,
                images: finalImages,
            });

            // Cleanup local previews
            newFiles.forEach((f) => URL.revokeObjectURL(f.preview));
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to upload images or save product. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const conditionOptions = [
        { value: 'like-new', label: ct('like-new') },
        { value: 'excellent', label: ct('excellent') },
        { value: 'good', label: ct('good') },
        { value: 'fair', label: ct('fair') },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-black/40 p-8 rounded-2xl border border-white/5 backdrop-blur-sm shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                        {t('name')}
                    </label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('name')}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                        {t('brand')}
                    </label>
                    <Input
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder={t('brand')}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                        {t('price')}
                    </label>
                    <Input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder={t('price')}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                        {t('condition')}
                    </label>
                    <Select
                        options={conditionOptions}
                        value={formData.condition}
                        onChange={handleSelectChange}
                        placeholder={t('condition')}
                    />
                </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4 pt-4 border-t border-white/5">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Product Images
                </label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Existing Images */}
                    {formData.images?.map((url, index) => (
                        <div key={`existing-${index}`} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                            <Image
                                src={url}
                                alt={`Existing Product ${index}`}
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeExistingImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}

                    {/* New Files Previews */}
                    {newFiles.map((item, index) => (
                        <div key={`new-${index}`} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--color-accent)]/30 group">
                            <Image
                                src={item.preview}
                                alt={`New Product ${index}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[var(--color-accent)] text-black text-[8px] font-bold uppercase rounded">New</div>
                            <button
                                type="button"
                                onClick={() => removeNewFile(index)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isSubmitting}
                        className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all flex flex-col items-center justify-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-2 border-t-transparent border-[var(--color-accent)] rounded-full animate-spin" />
                        ) : (
                            <>
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Add Image</span>
                            </>
                        )}
                    </button>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    multiple // Allow multiple selection
                    className="hidden"
                />
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white italic">Specifications (Required by API)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase">Diameter</label>
                        <Input name="spec.diameter" value={formData.specifications?.diameter} onChange={handleChange} size="sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase">Thickness</label>
                        <Input name="spec.thickness" value={formData.specifications?.thickness} onChange={handleChange} size="sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase">Material</label>
                        <Input name="spec.material" value={formData.specifications?.material} onChange={handleChange} size="sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase">Movement</label>
                        <Input name="spec.movement" value={formData.specifications?.movement} onChange={handleChange} size="sm" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded p-4 text-sm text-white focus:outline-none focus:border-[var(--color-accent)] min-h-[100px]"
                    required
                />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                <Button type="button" variant="outline" onClick={onCancel} className="px-8 font-bold uppercase tracking-widest text-xs h-12">
                    {t('cancel')}
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting} className="px-8 font-bold uppercase tracking-widest text-xs h-12">
                    {isSubmitting ? 'Saving...' : t('save')}
                </Button>
            </div>
        </form>
    );
}
