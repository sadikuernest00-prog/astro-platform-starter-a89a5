/**
 * Central business settings.
 * Change the name, WhatsApp number or e-mail here and it updates across the whole website.
 */
export const site = {
    name: 'AmicBridge Diamonds',
    shortName: 'AmicBridge',
    tagline: 'International Diamond Trading',
    description:
        'Discover exceptional natural diamonds, lab-grown diamonds and fine diamond jewelry. Certified stones, transparent pricing and personal service via WhatsApp.',
    /** WhatsApp number in international format, digits only (no +, spaces or dashes). */
    whatsappNumber: '4792928373',
    /** Human-readable version of the number shown on the page. */
    whatsappDisplay: '+47 92 92 83 73',
    founded: 2014
};

/** Build a https://wa.me link with an optional prefilled message. Works on mobile (app) and desktop (WhatsApp Web / Desktop). */
export function whatsappLink(message?: string): string {
    const base = `https://wa.me/${site.whatsappNumber}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage = `Hello ${site.name}, I would like to learn more about your diamonds.`;
