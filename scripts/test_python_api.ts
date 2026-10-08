/**
 * TypeScript script to test the Python FastAPI backend
 * Run with: npx tsx scripts/test_python_api.ts
 */

const API_BASE = process.env.API_BASE || 'http://localhost:8000';

async function testBackend() {
  console.log(`\n🚀 Testing Python FastAPI Backend at ${API_BASE}...\n`);

  try {
    // 1. Health check
    console.log('1️⃣ Checking /api/health...');
    const healthRes = await fetch(`${API_BASE}/api/health`);
    const healthData = await healthRes.json();
    console.log('✅ Health status:', healthData);

    // 2. Products catalog
    console.log('\n2️⃣ Fetching products from /api/products...');
    const prodRes = await fetch(`${API_BASE}/api/products?max_price=100`);
    const products = await prodRes.json();
    console.log(`✅ Loaded ${products.length} products under 100 RUB:`);
    products.slice(0, 3).forEach((p: any) => {
      console.log(`   - [${p.currentPrice} ₽] ${p.title.slice(0, 45)}...`);
    });

    // 3. Deal Analysis
    if (products.length > 0) {
      console.log('\n3️⃣ Testing /api/analyze-deal...');
      const analyzeRes = await fetch(`${API_BASE}/api/analyze-deal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products[0]),
      });
      const analysis = await analyzeRes.json();
      console.log('✅ Deal analysis result:');
      console.log(`   - Status: ${analysis.statusBadge}`);
      console.log(`   - Deal score: ${analysis.dealScore}/100`);
      console.log(`   - 90-day avg: ${analysis.averagePrice90d} ₽`);
      console.log(`   - Verdict: ${analysis.verdict}`);
    }

    // 4. Resolve Temu Link
    console.log('\n4️⃣ Testing /api/resolve-temu-link...');
    const linkRes = await fetch(`${API_BASE}/api/resolve-temu-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://temu.com/goods.html?goods_id=60109951234' }),
    });
    const linkData = await linkRes.json();
    console.log('✅ Temu link resolved:', {
      goodsId: linkData.goodsId,
      flashPrice: linkData.flashPrice,
      discount: `-${linkData.discountPercent}%`,
    });

    // 5. Sync Cart to Temu
    console.log('\n5️⃣ Testing /api/temu/sync-cart...');
    const syncRes = await fetch(`${API_BASE}/api/temu/sync-cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          { productId: 'p-temu-cheap-1', quantity: 2, price: 29.0 },
          { productId: 'p-temu-cheap-2', quantity: 1, price: 39.0 },
        ],
        accountPhoneOrEmail: '+7 (926) 482-19-02',
      }),
    });
    const syncData = await syncRes.json();
    console.log('✅ Cart synced with Temu:');
    console.log(`   - Basket ID: ${syncData.temuBasketId}`);
    console.log(`   - Total amount: ${syncData.totalAmount} ₽`);
    console.log(`   - Message: ${syncData.message}`);

    console.log('\n🎉 All Python API tests completed successfully!\n');
  } catch (error) {
    console.error('❌ Error testing Python backend:', error);
    console.log('\n👉 Make sure the Python server is running: npm run backend\n');
  }
}

testBackend();
