const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let fileName = urlPath.slice(1);

  if (!fileName || fileName === '') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Скачать DealFinder</title>
        <style>
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 20px; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
          .card { max-width: 440px; width: 100%; background: white; padding: 32px 24px; border-radius: 28px; box-shadow: 0 15px 35px rgba(0,0,0,0.06); text-align: center; }
          h1 { color: #0f172a; font-size: 24px; font-weight: 800; margin-top: 0; margin-bottom: 8px; }
          p { color: #64748b; font-size: 14px; line-height: 1.5; margin-bottom: 24px; }
          .btn { display: block; width: 100%; padding: 16px 20px; border-radius: 18px; font-size: 15px; font-weight: 700; text-decoration: none; margin-bottom: 12px; transition: transform 0.1s; }
          .btn:active { transform: scale(0.98); }
          .btn-primary { background: linear-gradient(135deg, #f97316, #ea580c); color: white; box-shadow: 0 6px 18px rgba(249,115,22,0.35); }
          .btn-secondary { background: #f1f5f9; color: #334155; }
          .hint { font-size: 12px; color: #94a3b8; margin-top: 20px; margin-bottom: 0; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; background: #ffedd5; color: #c2410c; margin-bottom: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">🔥 DealFinder Ready for Tiiny.host</div>
          <h1>Скачать архив проекта</h1>
          <p>Выберите любой вариант для публикации на <b>Tiiny.host</b> прямо со смартфона:</p>
          <a href="/dealfinder-tiiny.zip" download="dealfinder-tiiny.zip" class="btn btn-primary">
            📦 Скачать ZIP-архив (120 КБ)
          </a>
          <a href="/dealfinder.html" download="dealfinder.html" class="btn btn-secondary">
            📄 Скачать единый HTML-файл (450 КБ)
          </a>
          <p class="hint">
            <b>Как загрузить на Tiiny.host:</b><br>
            1. Нажмите кнопку выше и сохраните файл.<br>
            2. Откройте в браузере <b>tiiny.host</b>.<br>
            3. Загрузите этот файл и нажмите «Publish»!
          </p>
        </div>
      </body>
      </html>
    `);
    return;
  }

  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Файл не найден');
    return;
  }

  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath);
  let contentType = 'application/octet-stream';
  if (ext === '.zip') contentType = 'application/zip';
  if (ext === '.html') contentType = 'text/html; charset=utf-8';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Content-Disposition': `attachment; filename="${fileName}"`
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(3005, '0.0.0.0', () => {
  console.log('Download server running on port 3005');
});
