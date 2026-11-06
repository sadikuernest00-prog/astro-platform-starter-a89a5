import type { ImageMetadata } from 'astro';
import round from '../assets/diamonds/round.png';
import oval from '../assets/diamonds/oval.png';
import emerald from '../assets/diamonds/emerald.png';
import princess from '../assets/diamonds/princess.png';
import pear from '../assets/diamonds/pear.png';
import cushion from '../assets/diamonds/cushion.png';
import ring from '../assets/diamonds/ring.png';
import necklace from '../assets/diamonds/necklace.png';
import earrings from '../assets/diamonds/earrings.png';

export type DiamondCategory = 'natural' | 'lab-grown' | 'jewelry';

export interface Diamond {
    /** Unique reference shown to the customer and included in the WhatsApp message. */
    sku: string;
    name: string;
    category: DiamondCategory;
    /** Carat weight (total carat weight for jewelry). */
    carat: number;
    shape: string;
    color: string;
    clarity: string;
    cut: string;
    certificate: string;
    /** Price in USD. Use `null` to display "Price on Request". */
    price: number | null;
    image: ImageMetadata;
    /** Set to `true` for demo listings. Remove or set to `false` for your real inventory. */
    sample: boolean;
    featured?: boolean;
}

export const categoryLabels: Record<DiamondCategory, string> = {
    natural: 'Natural Diamond',
    'lab-grown': 'Lab-Grown Diamond',
    jewelry: 'Diamond Jewelry'
};

/**
 * ─────────────────────────────────────────────────────────────
 *  SAMPLE INVENTORY — replace these entries with your real stones.
 *  Every listing below is a DEMO product (sample: true).
 *  Add your own photos to src/assets/diamonds/ and import them above.
 * ─────────────────────────────────────────────────────────────
 */
export const diamonds: Diamond[] = [
    {
        sku: 'SAMPLE-N-101',
        name: 'The Aurora Round Brilliant',
        category: 'natural',
        carat: 2.01,
        shape: 'Round',
        color: 'D',
        clarity: 'VVS1',
        cut: 'Excellent',
        certificate: 'GIA',
        price: 48500,
        image: round,
        sample: true,
        featured: true
    },
    {
        sku: 'SAMPLE-N-102',
        name: 'Imperial Emerald Cut',
        category: 'natural',
        carat: 3.12,
        shape: 'Emerald',
        color: 'E',
        clarity: 'VS1',
        cut: 'Excellent',
        certificate: 'GIA',
        price: null,
        image: emerald,
        sample: true,
        featured: true
    },
    {
        sku: 'SAMPLE-N-103',
        name: 'Rosé Cushion Fancy Pink',
        category: 'natural',
        carat: 1.52,
        shape: 'Cushion',
        color: 'Fancy Light Pink',
        clarity: 'VS2',
        cut: 'Very Good',
        certificate: 'GIA',
        price: null,
        image: cushion,
        sample: true
    },
    {
        sku: 'SAMPLE-L-201',
        name: 'Celeste Oval Brilliant',
        category: 'lab-grown',
        carat: 2.5,
        shape: 'Oval',
        color: 'E',
        clarity: 'VVS2',
        cut: 'Excellent',
        certificate: 'IGI',
        price: 4900,
        image: oval,
        sample: true,
        featured: true
    },
    {
        sku: 'SAMPLE-L-202',
        name: 'Nova Princess Cut',
        category: 'lab-grown',
        carat: 1.8,
        shape: 'Princess',
        color: 'F',
        clarity: 'VS1',
        cut: 'Ideal',
        certificate: 'IGI',
        price: 2650,
        image: princess,
        sample: true
    },
    {
        sku: 'SAMPLE-L-203',
        name: 'Lumière Pear Shape',
        category: 'lab-grown',
        carat: 3.05,
        shape: 'Pear',
        color: 'G',
        clarity: 'VS2',
        cut: 'Excellent',
        certificate: 'IGI',
        price: 5400,
        image: pear,
        sample: true
    },
    {
        sku: 'SAMPLE-J-301',
        name: 'Sovereign Solitaire Ring — 18K Gold',
        category: 'jewelry',
        carat: 1.5,
        shape: 'Round',
        color: 'F',
        clarity: 'VS1',
        cut: 'Excellent',
        certificate: 'GIA',
        price: 18900,
        image: ring,
        sample: true,
        featured: true
    },
    {
        sku: 'SAMPLE-J-302',
        name: 'Riviera Tennis Necklace',
        category: 'jewelry',
        carat: 12.0,
        shape: 'Round',
        color: 'G',
        clarity: 'VS2',
        cut: 'Very Good',
        certificate: 'IGI',
        price: 24500,
        image: necklace,
        sample: true
    },
    {
        sku: 'SAMPLE-J-303',
        name: 'Étoile Diamond Studs — Platinum',
        category: 'jewelry',
        carat: 2.0,
        shape: 'Round',
        color: 'E',
        clarity: 'VVS2',
        cut: 'Excellent',
        certificate: 'GIA',
        price: 15800,
        image: earrings,
        sample: true
    }
];

export function formatPrice(price: number | null): string {
    if (price === null) return 'Price on Request';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}

export function formatCarat(carat: number, category: DiamondCategory): string {
    return `${carat.toFixed(2)} ct${category === 'jewelry' ? ' t.w.' : ''}`;
}
