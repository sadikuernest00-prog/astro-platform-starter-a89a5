const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { items, successUrl, cancelUrl } = JSON.parse(event.body || "{}");
    if (!Array.isArray(items) || items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Cart is empty" }) };
    }

    // ✅ IMPORTANT: Do NOT trust price from the browser.
    // Use Stripe Price IDs you created in the Stripe Dashboard.
    //
    // Put YOUR Stripe Price IDs here:
    // Example keys are based on your cart fields: name|size|color
    const PRICE_MAP = {
      // "T-Shirt|M|Black": "price_123",
      // "Hoodie|L|Grey": "price_456",
    };

    function keyForItem(i) {
      return `${i.name || ""}|${i.size || ""}|${i.color || ""}`.trim();
    }

    const line_items = items.map((i) => {
      const key = keyForItem(i);
      const price = PRICE_MAP[key];
      if (!price) {
        throw new Error(
          `No Stripe price configured for item: "${key}". Add it to PRICE_MAP in create-checkout-session.js`
        );
      }
      const quantity = Math.max(1, Math.min(99, Number(i.qty || 1)));
      return { price, quantity };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${successUrl}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url, sessionId: session.id }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message || "Unknown error" }),
    };
  }
};
