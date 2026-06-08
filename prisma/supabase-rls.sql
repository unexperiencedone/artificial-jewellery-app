-- Run this in Supabase SQL Editor after `prisma db push`
-- Enables Row Level Security so the public anon/authenticated API keys
-- cannot read or write data directly. Only the server (postgres role via Prisma) can access.

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VerificationToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Cart" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CartItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WishlistItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "RateLimitLog" ENABLE ROW LEVEL SECURITY;

-- Revoke direct access from Supabase public roles
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated;

-- Products: allow public read-only via Supabase REST (optional, for future use)
-- CREATE POLICY "public_read_products" ON "Product"
--   FOR SELECT TO anon, authenticated USING (true);

-- No permissive policies = anon/authenticated cannot access any table.
-- Your Next.js server connects as `postgres` and bypasses RLS.
