const fs = require('fs');

async function testTemu() {
  const url = 'https://www.temu.com/search_result.html?search_key=earphones';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'Referer': 'https://www.temu.com/'
    }
  });

  const html = await res.text();
  console.log('HTML Length:', html.length);
  fs.writeFileSync('temu_sample.html', html.slice(0, 50000), 'utf8');

  // Look for JSON structures in HTML
  const matches = html.match(/window\.__[A-Z0-9_]+\s*=\s*\{.+?\};/g) || [];
  console.log('Global window matches:', matches.length);
  matches.forEach((m, idx) => {
    console.log(`Match ${idx}:`, m.slice(0, 100));
  });

  // Check for any embedded JSON with goods or product
  const jsonBlocks = [];
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const content = match[1];
    if (content.includes('goods') || content.includes('price') || content.includes('items')) {
      jsonBlocks.push(content.slice(0, 200));
    }
  }
  console.log('Script blocks with goods/price:', jsonBlocks.length);
  if (jsonBlocks.length > 0) {
    console.log('Sample script block:', jsonBlocks[0]);
  }
}

testTemu().catch(console.error);
