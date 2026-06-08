import "dotenv/config";
import { createDbPool } from "../src/lib/db-pool";

async function main() {
  const pool = createDbPool();

  const tables = await pool.query(`
    SELECT tablename, rowsecurity
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `);

  const counts = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM "User") AS users,
      (SELECT COUNT(*) FROM "Product") AS products
  `);

  console.log("=== Table RLS Status ===");
  console.table(tables.rows);
  console.log("\n=== Data Counts ===");
  console.table(counts.rows);

  await pool.end();
}

main().catch(console.error);
