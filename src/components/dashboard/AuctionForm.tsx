'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { auctionService, Auction } from '@/services/auction.service';
import { Button, Input } from '@/components/ui';
import { BACKEND_URL, api } from '@/services/api';
import Image from 'next/image';
import { X, Plus, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AuctionFormProps {
    initialData?: Auction;
    isEdit?: boolean;
}

export function AuctionForm({ initialData, isEdit = false }: AuctionFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        starting_price: initialData?.starting_price?.toString() || '',
        bid_step: initialData?.bid_step?.toString() || '100000',
        start_time: initialData?.start_time ? new Date(initialData.start_time).toISOString().slice(0, 16) : '',
        end_time: initialData?.end_time ? new Date(initialData.end_time).toISOString().slice(0, 16) : '',
        images: initialData?.images || [] as string[],
        specs: {
            brand: initialData?.specs?.brand || '',
            model: initialData?.specs?.model || '',
            diameter: initialData?.specs?.diameter || '',
            movement: initialData?.specs?.movement || '',
            material: initialData?.specs?.material || '',
            year: initialData?.specs?.year || '',
            condition: initialData?.specs?.condition || '',
            boxPapers: initialData?.specs?.boxPapers || ''
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name in formData.specs) {
            setFormData(prev => ({
                ...prev,
                specs: { ...prev.specs, [name]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            throw new Error('Cloudinary configuration is missing');
        }

        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', uploadPreset);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: uploadData,
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Cloudinary upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        try {
            const uploadedUrls = [...formData.images];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const secureUrl = await uploadToCloudinary(file);
                uploadedUrls.push(secureUrl);
            }
            setFormData(prev => ({ ...prev, images: uploadedUrls }));
        } catch (error: any) {
            console.error("Upload failed:", error);
            alert(`Failed to upload image: ${error.message || 'Check your configuration.'}`);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                starting_price: parseFloat(formData.starting_price),
                bid_step: parseFloat(formData.bid_step),
                start_time: new Date(formData.start_time).toISOString(),
                end_time: new Date(formData.end_time).toISOString(),
                images: formData.images,
                specs: formData.specs
            };

            if (isEdit && initialData) {
                await auctionService.updateAuction(initialData.id, payload);
            } else {
                await auctionService.createAuction(payload);
            }
            router.push('/dashboard/auctions');
            router.refresh();
        } catch (error) {
            console.error("Failed to save auction:", error);
            alert("Failed to save auction");
        } finally {
            setLoading(false);
        }
    };

    const getFullImageUrl = (url: string) => {
        if (url.startsWith('http')) return url;
        return `${BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 p-8 rounded-lg shadow-xl">
            {/* Image Upload Section */}
            <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Product Images</label>
                <div className="flex flex-wrap gap-4">
                    {formData.images.map((url, index) => (
                        <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                            <Image
                                src={getFullImageUrl(url)}
                                alt={`image-${index}`}
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                            >
                                <X className="w-3 h-3 text-white" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-lg hover:border-accent hover:bg-white/5 transition-all"
                    >
                        {uploading ? (
                            <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <Plus className="w-6 h-6 text-text-muted mb-1" />
                                <span className="text-[10px] text-text-muted font-bold uppercase">Upload</span>
                            </>
                        )}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Basic Info</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                        <label className="text-xs font-bold uppercase text-text-muted">Product Name</label>
                        <Input name="name" value={formData.name} onChange={handleChange} required className="bg-black/50 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <label className="text-xs font-bold uppercase text-text-muted">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full h-32 bg-black/50 border border-white/10 rounded-md p-3 text-white text-sm focus:outline-none focus:border-accent"
                        />
                    </div>
                </div>
            </div>

            {/* Pricing & Timing */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Pricing & Timing</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-text-muted">Starting Price (VND)</label>
                        <Input type="number" name="starting_price" value={formData.starting_price} onChange={handleChange} required className="bg-black/50 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-text-muted">Bid Step (VND)</label>
                        <Input type="number" name="bid_step" value={formData.bid_step} onChange={handleChange} required className="bg-black/50 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-text-muted">Start Time</label>
                        <Input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required className="bg-black/50 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-text-muted">End Time</label>
                        <Input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} required className="bg-black/50 border-white/10 text-white" />
                    </div>
                </div>
            </div>

            {/* Specs */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.keys(formData.specs).map((field) => (
                        <div key={field} className="space-y-2">
                            <label className="text-xs font-bold uppercase text-text-muted">{field}</label>
                            <Input name={field} value={(formData.specs as any)[field]} onChange={handleChange} className="bg-black/50 border-white/10 text-white" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6 flex justify-end gap-4 border-t border-white/10">
                <Link href="/dashboard/auctions">
                    <Button type="button" variant="outline" className="border-white/10 text-white hover:bg-white/10 h-12 px-8 font-bold uppercase tracking-wider text-xs">
                        Cancel
                    </Button>
                </Link>
                <Button type="submit" disabled={loading || uploading} className="bg-accent text-black hover:bg-accent/90 font-bold min-w-[180px] h-12 px-8 uppercase tracking-wider text-xs">
                    {loading ? (isEdit ? 'Updating...' : 'Creating...') : (
                        <span className="flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            {isEdit ? 'Update Auction' : 'Create Auction'}
                        </span>
                    )}
                </Button>
            </div>
        </form>
    );
}
