// api/storage.js — Vercel serverless key-value storage via Vercel KV (or simple file fallback)
// Uses Vercel's built-in KV store (free tier available)

const { kv } = require("@vercel/kv");

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { key } = req.method === "GET" ? req.query : req.body;

  if (!key) return res.status(400).json({ error: "Missing key" });

  try {
    if (req.method === "GET") {
      const value = await kv.get(key);
      return res.status(200).json({ key, value: value ?? null });
    }

    if (req.method === "POST") {
      const { value } = req.body;
      if (value === undefined) return res.status(400).json({ error: "Missing value" });
      await kv.set(key, value);
      return res.status(200).json({ key, value, ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("KV error:", err);
    return res.status(500).json({ error: "Storage error", detail: err.message });
  }
}
