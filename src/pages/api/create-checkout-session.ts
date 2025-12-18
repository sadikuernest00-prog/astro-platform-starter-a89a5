import type { APIRoute } from "astro";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

// Server-side catalog: DO NOT trust prices coming from the browser
const CATALOG: Record<string, { name: string; amount: number; currency: string }> = {
  "set-black": { name: "Black Satin-Look Cami & Shorts Set", amount: 49900, currency: "nok" },
  "set-white": { name: "White Satin-Look Cami & Shorts Set", amount: 49900, currency: "nok" },
  "nude-slip": { name: "Nude Satin-Look Slip Dress", amount: 49900, currency: "nok" },
  "white-slip": { name: "White Satin-Look Slip Dress", amount: 49900, currency: "nok" },
  "black-chemise": { name: "Black Satin-Look Chemise Dress", amount: 49900, currency: "nok" },
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const items = body?.items ?? [];

    const line_items = items.map((it: any) => {
      const p = CATALOG[it.id];
      if (!p) throw new Error(`Unknown product id: ${it.id}`);

      return {
        quantity: Number(it.quantity ?? 1),
        price_data: {
          currency: p.currency,
          unit_amount: p.amount,
          product_data: {
            name: p.name,
            metadata: { size: it.size ?? "", color: it.color ?? "" },
          },
        },
      };
    });

    const siteUrl = import.meta.env.PUBLIC_SITE_URL;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["NO", "SE", "DK"] },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};

