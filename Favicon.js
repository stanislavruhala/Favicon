import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
const favicon = readFileSync('./favicon-32x32.png');
const appleIcon = readFileSync('./apple-touch-icon.png'); // <-- ADD THIS
const server = createServer(async (req, res) => {
    console.log(req.url);
    if (req.url === '/favicon.ico') {
    try {
    //   const image = await readFile('./favicon-32x32.png');

      const resizedImage = await sharp(favicon)
        .resize(100, 100)
        .png()
        .toBuffer();

      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(resizedImage);
    } catch (err) {
      res.writeHead(500);
      res.end('Error processing image');
    }
    return;
  }
  if (req.url === '/image') {
    try {
    //   const image = await readFile('./apple-touch-icon.png');

      const resizedImage = await sharp(appleIcon)
        .resize(100, 100)
        .png()
        .toBuffer();

      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(resizedImage);
    } catch (err) {
        console.error(err)
      res.writeHead(500);
      res.end('Error processing image');
    }
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('good site\n');
});
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});