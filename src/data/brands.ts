// Watch brand tiers data
export interface Brand {
    name: string;
    logo?: string; // Optional logo URL
}

export interface BrandTier {
    id: string;
    tier: number;
    stars: number;
    titleKey: string;
    brands: Brand[];
}

export const BRAND_TIERS: BrandTier[] = [
    {
        id: 'ultra-luxury',
        tier: 1,
        stars: 5,
        titleKey: 'ultraLuxury',
        brands: [
            { name: 'Patek Philippe' },
            { name: 'Audemars Piguet' },
            { name: 'Richard Mille' },
            { name: 'Vacheron Constantin' },
            { name: 'A. Lange & Söhne' },
            { name: 'Breguet' },
            { name: 'Blancpain' },
            { name: 'Jaeger-LeCoultre' },
            { name: 'Girard-Perregaux' },
            { name: 'Urwerk' },
            { name: 'MB&F' },
            { name: 'De Bethune' },
            { name: 'F.P. Journe' },
            { name: 'Bovet' },
            { name: 'Glashütte Original' },
            { name: 'Ulysse Nardin' },
            { name: 'HYT' },
            { name: 'Harry Winston' },
            { name: 'Piaget' },
            { name: 'Franck Muller' },
            { name: 'Hublot' },
        ]
    },
    {
        id: 'high-end-luxury',
        tier: 2,
        stars: 4,
        titleKey: 'highEndLuxury',
        brands: [
            { name: 'Rolex' },
            { name: 'Cartier' },
            { name: 'Omega' },
            { name: 'IWC' },
            { name: 'Panerai' },
            { name: 'Chopard' },
            { name: 'Zenith' },
            { name: 'Breitling' },
            { name: 'Tudor' },
            { name: 'Grand Seiko' },
            { name: 'Mont Blanc' },
            { name: 'Corum' },
            { name: 'Graham' },
            { name: 'Carl F. Bucherer' },
            { name: 'Bremont' },
            { name: 'Arnold & Son' },
        ]
    },
    {
        id: 'luxury',
        tier: 3,
        stars: 3,
        titleKey: 'luxury',
        brands: [
            { name: 'Longines' },
            { name: 'Tag Heuer' },
            { name: 'Oris' },
            { name: 'Rado' },
            { name: 'Bell & Ross' },
            { name: 'Baume & Mercier' },
            { name: 'Maurice Lacroix' },
            { name: 'Nomos Glashütte' },
            { name: 'Alpina' },
            { name: 'Frederique Constant' },
            { name: 'Charriol' },
            { name: 'Movado' },
            { name: 'Raymond Weil' },
        ]
    },
    {
        id: 'entry-luxury',
        tier: 4,
        stars: 2,
        titleKey: 'entryLuxury',
        brands: [
            { name: 'Tissot' },
            { name: 'Mido' },
            { name: 'Hamilton' },
            { name: 'Victorinox' },
            { name: 'Christopher Ward' },
            { name: 'Certina' },
            { name: 'Rado' },
        ]
    },
    {
        id: 'watches',
        tier: 5,
        stars: 1,
        titleKey: 'watches',
        brands: [
            { name: 'Seiko' },
            { name: 'Citizen' },
            { name: 'Casio' },
            { name: 'Orient' },
            { name: 'Swatch' },
            { name: 'Timex' },
            { name: 'Bulova' },
            { name: 'Fossil' },
            { name: 'Michael Kors' },
            { name: 'Invicta' },
        ]
    },
];
