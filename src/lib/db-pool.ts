import dns from "node:dns";
import { Pool } from "pg";

// Prefer IPv4 — some deploy environments cannot route IPv6 (ENETUNREACH).
dns.setDefaultResultOrder("ipv4first");

export function createDbPool(connectionString?: string) {
  const url = connectionString ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  return new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
}
