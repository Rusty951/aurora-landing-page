import http from 'node:http';
import path from 'node:path';
import { readFile, stat } from 'node:fs/promises';

const root = process.cwd();
const preferredPort = Number(process.env.PORT || 4173);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

function mobilePreviewHtml(port, previewPath) {
  const safePreviewPath = previewPath === '/' ? '/' : '/interview';
  const targetUrl = `http://localhost:${port}${safePreviewPath}`;
  const previewLabel = safePreviewPath === '/' ? '대표/오가닉 페이지' : '광고 랜딩';

  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>오로라의소리 모바일 미리보기 — ${previewLabel}</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: #0b0b12;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .phone {
    width: min(390px, 100vw);
    height: min(844px, 100vh);
    border: 1px solid rgba(255,255,255,.16);
    border-radius: 28px;
    overflow: hidden;
    background: #0b0b12;
    box-shadow: 0 24px 80px rgba(0,0,0,.45);
  }
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
    background: #0b0b12;
  }
  @media (max-width: 420px) {
    .phone {
      width: 100vw;
      height: 100vh;
      border: 0;
      border-radius: 0;
      box-shadow: none;
    }
  }
</style>
</head>
<body>
  <main class="phone" aria-label="Mobile preview">
    <iframe src="${targetUrl}" title="오로라의소리 모바일 미리보기 — ${previewLabel}"></iframe>
  </main>
</body>
</html>`;
}

function resolveRequestPath(url, port) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);

  if (pathname === '/interview' || pathname === '/interview/') {
    return path.join(root, 'index.html');
  }

  const relativePath = pathname === '/' ? 'index.html' : pathname.slice(1);
  const resolvedPath = path.resolve(root, relativePath);
  const relativeResolvedPath = path.relative(root, resolvedPath);

  if (relativeResolvedPath.startsWith('..') || path.isAbsolute(relativeResolvedPath)) {
    return null;
  }

  return resolvedPath;
}

function createServer(port) {
  return http.createServer(async (req, res) => {
    try {
      const requestUrl = new URL(req.url || '/', `http://localhost:${port}`);
      const pathname = decodeURIComponent(requestUrl.pathname);

      if (pathname === '/__mobile-preview') {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
        });
        res.end(mobilePreviewHtml(port, requestUrl.searchParams.get('path') || '/interview'));
        return;
      }

      let filePath = resolveRequestPath(req.url || '/', port);

      if (!filePath) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      const body = await readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();

      res.writeHead(200, {
        'Content-Type': contentTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(body);
    } catch (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      res.writeHead(500);
      res.end('Internal server error');
    }
  });
}

function listen(port) {
  const server = createServer(port);

  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && !process.env.PORT) {
      listen(port + 1);
      return;
    }

    throw error;
  });

  server.listen(port, () => {
    console.log(`Aurora organic page: http://localhost:${port}/`);
    console.log(`Aurora ad landing:   http://localhost:${port}/interview`);
  });
}

listen(preferredPort);
