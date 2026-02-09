'use client';

import { useEffect } from 'react';
import { productService } from '@/services/product.service';

export function AnalyticsTracker() {
    useEffect(() => {
        productService.incrementSiteVisit().catch(console.error);
    }, []);

    return null;
}
