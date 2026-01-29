/**
 * Security test for portal API (Step 18).
 * Verifies:
 * 1. Unauthenticated GET /api/portal/results returns 401
 * 2. Request with fake client_id in URL is still 401 (we never trust client_id from request)
 *
 * Run with dev server up: npm run dev (in another terminal), then: node scripts/test-portal-security.mjs
 * Or: BASE_URL=https://your-app.vercel.app node scripts/test-portal-security.mjs
 */
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function run() {
  let passed = 0;
  let failed = 0;

  // Test 1: No auth → 401
  try {
    const res = await fetch(`${BASE_URL}/api/portal/results`, {
      method: 'GET',
      credentials: 'omit',
      headers: { Accept: 'application/json' },
    });
    if (res.status === 401) {
      console.log('✓ Unauthenticated request returns 401');
      passed++;
    } else {
      console.log(`✗ Expected 401, got ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.log('✗ Request failed (is the dev server running?):', err.message);
    failed++;
  }

  // Test 2: URL with client_id query (no auth) → still 401 (we ignore query params)
  try {
    const res = await fetch(`${BASE_URL}/api/portal/results?client_id=fake-id`, {
      method: 'GET',
      credentials: 'omit',
      headers: { Accept: 'application/json' },
    });
    if (res.status === 401) {
      console.log('✓ Request with client_id in URL (no auth) still returns 401');
      passed++;
    } else {
      console.log(`✗ Expected 401 for client_id probe, got ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.log('✗ Request failed:', err.message);
    failed++;
  }

  console.log('');
  if (failed === 0) {
    console.log(`Security tests passed: ${passed}/${passed + failed}`);
    process.exit(0);
  } else {
    console.log(`Security tests: ${passed} passed, ${failed} failed`);
    process.exit(1);
  }
}

run();
