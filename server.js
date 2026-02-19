import { createServer } from 'http';
import { readFile } from 'fs';
import { extname, join } from 'path';

const PORT = 8080;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
};

createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = pathname === '/' ? 'index.html' : pathname.slice(1);
  const fp = join(process.cwd(), file);

  readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Wall live → http://localhost:${PORT}`);
});
