/**
 * DDoS simulation script — tests rate limiting on API endpoints.
 * Run with dev server active: npm run dev
 * Then: npm run test:ddos
 */

const BASE_URL = process.env.TEST_URL ?? "http://localhost:3000";
const CONCURRENT = parseInt(process.env.DDOS_CONCURRENT ?? "50", 10);
const TOTAL_REQUESTS = parseInt(process.env.DDOS_TOTAL ?? "200", 10);

interface TestResult {
  endpoint: string;
  total: number;
  success: number;
  rateLimited: number;
  errors: number;
  avgLatencyMs: number;
}

async function hammerEndpoint(
  endpoint: string,
  tier: string,
): Promise<TestResult> {
  let success = 0;
  let rateLimited = 0;
  let errors = 0;
  let totalLatency = 0;

  const requests = Array.from({ length: TOTAL_REQUESTS }, (_, i) => i);

  const batchSize = CONCURRENT;
  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async () => {
        const start = Date.now();
        try {
          const res = await fetch(`${BASE_URL}${endpoint}`, {
            headers: { "X-Forwarded-For": `sim-attacker-${Math.random()}` },
          });
          const latency = Date.now() - start;
          if (res.status === 429) return { type: "limited" as const, latency };
          if (res.ok) return { type: "success" as const, latency };
          return { type: "error" as const, latency };
        } catch {
          return { type: "error" as const, latency: Date.now() - start };
        }
      }),
    );

    for (const r of results) {
      totalLatency += r.latency;
      if (r.type === "success") success++;
      else if (r.type === "limited") rateLimited++;
      else errors++;
    }
  }

  return {
    endpoint: `${endpoint} (${tier})`,
    total: TOTAL_REQUESTS,
    success,
    rateLimited,
    errors,
    avgLatencyMs: Math.round(totalLatency / TOTAL_REQUESTS),
  };
}

async function main() {
  console.log("=== Lumière DDoS Simulation ===");
  console.log(`Target: ${BASE_URL}`);
  console.log(`Requests: ${TOTAL_REQUESTS} | Concurrency: ${CONCURRENT}\n`);

  const healthCheck = await fetch(`${BASE_URL}/api/health`);
  if (!healthCheck.ok) {
    console.error("Server not reachable. Start with: npm run dev");
    process.exit(1);
  }

  const tests = [
    { endpoint: "/api/health", tier: "general" },
    { endpoint: "/api/products", tier: "general" },
    { endpoint: "/api/auth/register", tier: "auth (POST blocked without body)" },
  ];

  const results: TestResult[] = [];

  for (const test of tests) {
    console.log(`Testing ${test.endpoint}...`);
    if (test.endpoint.includes("register")) {
      let rateLimited = 0;
      let success = 0;
      for (let i = 0; i < 20; i++) {
        const res = await fetch(`${BASE_URL}${test.endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": "sim-auth-attacker",
          },
          body: JSON.stringify({}),
        });
        if (res.status === 429) rateLimited++;
        else success++;
      }
      results.push({
        endpoint: test.endpoint,
        total: 20,
        success,
        rateLimited,
        errors: 0,
        avgLatencyMs: 0,
      });
    } else {
      results.push(await hammerEndpoint(test.endpoint, test.tier));
    }
  }

  console.log("\n=== Results ===\n");
  console.table(results);

  const totalBlocked = results.reduce((s, r) => s + r.rateLimited, 0);
  if (totalBlocked > 0) {
    console.log(`\n✓ Rate limiting active — ${totalBlocked} requests blocked`);
  } else {
    console.log("\n⚠ No requests were rate-limited. Consider lowering RATE_LIMIT_MAX_REQUESTS.");
  }
}

main().catch(console.error);
