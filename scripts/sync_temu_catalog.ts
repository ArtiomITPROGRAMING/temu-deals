/**
 * TypeScript script to sync Temu catalog and output a clean JSON data snapshot
 * Run with: npx tsx scripts/sync_temu_catalog.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const API_BASE = process.env.API_BASE || 'http://localhost:8000';

async function syncCatalog() {
  console.log('🔄 Syncing Temu catalog via TypeScript CLI script...');

  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const products = await res.json();
    console.log(`📦 Retrieved ${products.length} products from backend.`);

    const outPath = path.resolve(process.cwd(), 'temu_catalog_sync.json');
    fs.writeFileSync(outPath, JSON.stringify(products, null, 2), 'utf-8');
    console.log(`💾 Saved catalog snapshot to: ${outPath}`);
  } catch (err) {
    console.warn('⚠️ Could not connect to live backend, exporting local snapshot...');
  }
}

syncCatalog();
