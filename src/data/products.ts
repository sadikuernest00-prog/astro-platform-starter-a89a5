// AmicBridge marketplace content.
// To add a product, append an entry to `products`. Prices are intentionally
// never shown — all pricing is negotiated directly between buyer and seller.

export const WHATSAPP_NUMBER = '4740975815';
export const WHATSAPP_DISPLAY = '+47 40975815';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const whatsappLink = (message: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export type CategoryId = 'diamonds' | 'cars' | 'commodities' | 'other';

export interface Category {
    id: CategoryId;
    name: string;
    description: string;
    items: string[];
    image: string;
}

export interface Product {
    name: string;
    category: CategoryId;
    tag: string;
    summary: string;
    details: string[];
    image: string;
    alt: string;
}

export const categories: Category[] = [
    {
        id: 'diamonds',
        name: 'Diamonds',
        description: 'Rough and polished stones from vetted mines, cutters and traders.',
        items: ['Rough diamonds', 'Polished diamonds', 'Parcels & lots'],
        image: img('photo-1599707367072-cd6ada2bc375', 700)
    },
    {
        id: 'cars',
        name: 'Cars',
        description: 'Luxury, new and pre-owned vehicles sourced and exported worldwide.',
        items: ['Luxury & sports', 'New vehicles', 'Used vehicles'],
        image: img('photo-1503376780353-7e6692767b70', 700)
    },
    {
        id: 'commodities',
        name: 'Commodities',
        description: 'Agricultural products, metals and raw materials in any volume.',
        items: ['Almonds & nuts', 'Agricultural goods', 'Metals & raw materials'],
        image: img('photo-1494412574643-ff11b0a5c1c3', 700)
    },
    {
        id: 'other',
        name: 'Other Products',
        description: 'Anything else with genuine buyers and sellers — ask us.',
        items: ['Industrial goods', 'Consumer goods', 'Special requests'],
        image: img('photo-1586528116311-ad8dd3c8310d', 700)
    }
];

export const products: Product[] = [
    {
        name: 'Porsche',
        category: 'cars',
        tag: 'For Sale',
        summary: 'Premium Porsche available for international buyers. Specification, condition and delivery on request.',
        details: ['Luxury vehicle', 'Worldwide delivery possible', 'Documents on request'],
        image: img('photo-1503376780353-7e6692767b70'),
        alt: 'Black Porsche driving on a highway at dusk'
    },
    {
        name: 'Tesla',
        category: 'cars',
        tag: 'For Sale',
        summary: 'Electric Tesla available for purchase. Model, mileage and export options shared on enquiry.',
        details: ['Electric vehicle', 'New / used options', 'Export support'],
        image: img('photo-1560958089-b8a1929cea89'),
        alt: 'White Tesla parked by green hills'
    },
    {
        name: 'Almonds',
        category: 'commodities',
        tag: '1 kg',
        summary: 'Quality almonds offered per 1 kg, with larger wholesale quantities available on request.',
        details: ['Sold per 1 kg', 'Bulk volumes available', 'Origin details on request'],
        image: img('photo-1508061253366-f7da158b6d46'),
        alt: 'Close-up of whole raw almonds'
    },
    {
        name: 'Rough Diamonds',
        category: 'diamonds',
        tag: 'For Sale',
        summary: 'Rough diamonds available to serious buyers. Carat, quality and certification discussed privately.',
        details: ['Rough stones', 'Certification on request', 'Discreet handling'],
        image: img('photo-1599707367072-cd6ada2bc375'),
        alt: 'Diamonds on a dark reflective surface'
    }
];
