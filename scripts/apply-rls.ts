/**
 * Applies Row Level Security to Supabase tables.
 * Run after db:push — npm run db:secure
 */
import "dotenv/config";
import { readFileSync } from "fs";
import { join } from "path";
import { createDbPool } from "../src/lib/db-pool";

async function main() {
  const pool = createDbPool();

  const sql = readFileSync(
    join(process.cwd(), "prisma", "supabase-rls.sql"),
    "utf-8",
  );

  const statements = sql
    .split(";")
    .map((s) =>
      s
        .split("\n")
        .filter((line) => !line.trim().startsWith("--"))
        .join("\n")
        .trim(),
    )
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    try {
      await pool.query(statement);
      console.log("✓", statement.split("\n")[0].slice(0, 60));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("already enabled") || msg.includes("does not exist")) {
        console.log("– skipped:", msg.slice(0, 80));
      } else {
        throw err;
      }
    }
  }

  await pool.end();
  console.log("\nRLS applied. Database is protected from public Supabase API access.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
