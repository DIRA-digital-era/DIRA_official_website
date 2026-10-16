const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.html')) {
    fs.copyFileSync(path.join(root, entry.name), path.join(output, entry.name));
  }
}

for (const directory of ['images', 'js', 'reports', 'style']) {
  const source = path.join(root, directory);
  if (fs.existsSync(source)) {
    fs.cpSync(source, path.join(output, directory), { recursive: true });
  }
}

for (const file of ['robots.txt', 'sitemap.xml']) {
  const source = path.join(root, file);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, path.join(output, file));
  }
}
