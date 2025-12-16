export default async (request, context) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body = await request.json();
    const { amount, orderId } = body;

    // ⚠️ Replace these with Netlify environment variables later
    const VIPPS_CLIENT_ID = process.env.VIPPS_CLIENT_ID;
    const VIPPS_CLIENT_SECRET = process.env.VIPPS_CLIENT_SECRET;
    const VIPPS_SUBSCRIPTION_KEY = process.env.VIPPS_SUBSCRIPTION_KEY;
    const VIPPS_MERCHANT_SERIAL = process.env.VIPPS_MERCHANT_SERIAL;

    // This is just a placeholder response for now
    // (real Vipps API call comes next step)
    return new Response(
      JSON.stringify({
        success: true,
        message: "Vipps payment endpoint is ready",
        amount,
        orderId,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
};
