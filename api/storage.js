// api/storage.js — key-value storage backed by Upstash Redis
// The Upstash Vercel integration auto-injects UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const key = req.method === "GET" ? req.query.key : (req.body || {}).key;
  if (!key) return res.status(400).json({ error: "Missing key" });

  try {
    if (req.method === "GET") {
      const value = await redis.get(key);
      return res.status(200).json({ key, value: value ?? null });
    }
    if (req.method === "POST") {
      const { value } = req.body;
      if (value === undefined) return res.status(400).json({ error: "Missing value" });
      await redis.set(key, value);
      return res.status(200).json({ key, ok: true });
    }
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Redis error:", err);
    return res.status(500).json({ error: "Storage error", detail: err.message });
  }
}
