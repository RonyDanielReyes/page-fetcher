const http = require('http');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.error('Usage: node fetcher.js <URL> <file-path>');
  process.exit(1);
}

http.get(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        process.exit(1);
      }

      const fileSize = Buffer.byteLength(data);
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  });
}).on('error', (err) => {
  console.error('Error downloading the file:', err);
  process.exit(1);
});
