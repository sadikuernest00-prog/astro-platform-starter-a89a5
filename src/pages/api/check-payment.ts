// File: src/pages/api/check-payment.ts
import type { APIRoute } from "astro";

const BLOCKSTREAM_API = "https://blockstream.info/api";

export const GET: APIRoute = async ({ url }) => {
  const txid = url.searchParams.get("txid");
  const address = url.searchParams.get("address");
  const minSatsStr = url.searchParams.get("min");

  if (!txid || !address) {
    return new Response(
      JSON.stringify({ ok: false, message: "Missing txid or address." }),
      { status: 400 }
    );
  }

  const minSats = minSatsStr ? parseInt(minSatsStr, 10) || 0 : 0;

  try {
    // Fetch transaction data
    const txRes = await fetch(`${BLOCKSTREAM_API}/tx/${txid}`);
    if (!txRes.ok) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Transaction not found on blockchain.",
        }),
        { status: 404 }
      );
    }

    const tx = await txRes.json();

    // Blockstream tx JSON structure has "status" + "vout"
    const status = tx.status;
    const vout = tx.vout as Array<{
      scriptpubkey_address?: string;
      value: number;
    }>;

    const matchingOutputs = vout.filter(
      (o) => o.scriptpubkey_address === address
    );
    const totalSats = matchingOutputs.reduce((sum, o) => sum + o.value, 0);

    const confirmed = status?.confirmed === true;
    const confirmations = status?.block_height ? 1 : 0; // simplified

    if (!confirmed) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Transaction exists but is not yet confirmed.",
          confirmed: false,
          confirmations,
          amount_sats: totalSats,
          address,
        }),
        { status: 200 }
      );
    }

    if (totalSats < minSats) {
      return new Response(
        JSON.stringify({
          ok: false,
          message:
            "Transaction confirmed but amount to this address is too low.",
          confirmed: true,
          confirmations,
          amount_sats: totalSats,
          address,
        }),
        { status: 200 }
      );
    }

    const amountBtc = totalSats / 100_000_000;

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Payment confirmed.",
        confirmed: true,
        confirmations,
        amount_sats: totalSats,
        amount_btc: amountBtc,
        address,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Error talking to blockchain API.",
      }),
      { status: 500 }
    );
  }
};
