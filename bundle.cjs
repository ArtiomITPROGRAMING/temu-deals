const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');

// Find asset files in dist/assets
const assetsDir = path.join(__dirname, 'dist', 'assets');
const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

if (cssFile) {
  const css = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
  html = html.replace(/<link rel="stylesheet"[^>]*>/, `<style>\n${css}\n</style>`);
}

if (jsFile) {
  const js = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
  html = html.replace(/<script type="module"[^>]*><\/script>/, `<script type="module">\n${js}\n</script>`);
}

fs.writeFileSync(path.join(__dirname, 'dealfinder.html'), html, 'utf8');
console.log('Single dealfinder.html created successfully! Size:', fs.statSync(path.join(__dirname, 'dealfinder.html')).size, 'bytes');
