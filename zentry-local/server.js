const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 5173;
const ROOT_DIR = __dirname;
const REMOTE_ORIGIN = 'https://zentry-rust-zeta.vercel.app';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4'
};

function serveLocalFile(filePath, req, res, ext) {
  const stat = fs.statSync(filePath);
  const totalSize = stat.size;
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

    if (start >= totalSize || end >= totalSize) {
      res.writeHead(416, { 'Content-Range': `bytes */${totalSize}` });
      return res.end();
    }

    const chunkSize = end - start + 1;
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${totalSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': mimeType
    });

    const stream = fs.createReadStream(filePath, { start, end });
    stream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': totalSize,
      'Content-Type': mimeType,
      'Accept-Ranges': 'bytes'
    });
    fs.createReadStream(filePath).pipe(res);
  }
}

function proxyAndCache(reqUrl, req, res, localPath) {
  const targetUrl = REMOTE_ORIGIN + reqUrl;
  const headers = { ...req.headers };
  delete headers.host;

  const proxyReq = https.request(targetUrl, {
    method: req.method,
    headers: headers
  }, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);

    // If it's a full 200 GET, cache to local file for next time
    if (proxyRes.statusCode === 200 && req.method === 'GET' && !req.headers.range) {
      fs.mkdirSync(path.dirname(localPath), { recursive: true });
      const fileStream = fs.createWriteStream(localPath);
      proxyRes.pipe(fileStream);
    }
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', reqUrl, err.message);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('Bad Gateway');
    }
  });

  req.pipe(proxyReq);
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname === '/') {
    pathname = '/index.html';
  } else if (!path.extname(pathname) && fs.existsSync(path.join(ROOT_DIR, pathname + '.html'))) {
    pathname = pathname + '.html';
  }

  const localPath = path.join(ROOT_DIR, pathname);
  const ext = path.extname(pathname).toLowerCase();

  if (fs.existsSync(localPath) && fs.statSync(localPath).isFile()) {
    try {
      serveLocalFile(localPath, req, res, ext);
    } catch (e) {
      console.error('Error serving local file:', localPath, e);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  } else {
    // Transparent fallback & cache to disk
    proxyAndCache(pathname, req, res, localPath);
  }
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`=========================================`);
  console.log(`🚀 Zentry is live at: ${url}`);
  console.log(`=========================================`);

  // Open default browser on Windows
  exec(`start ${url}`);
});
