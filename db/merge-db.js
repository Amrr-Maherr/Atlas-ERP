import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, basename, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, '..', 'db.json');

const db = {};

const entries = readdirSync(__dirname, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  if (entry.name === 'node_modules') continue;

  const dirPath = join(__dirname, entry.name);
  const jsonFiles = readdirSync(dirPath).filter(
    (f) => extname(f) === '.json' && statSync(join(dirPath, f)).isFile()
  );

  for (const file of jsonFiles) {
    const resourceName = basename(file, '.json');
    const filePath = join(dirPath, file);
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    db[resourceName] = data;
    console.log(`Loaded ${resourceName} (${data.length} records) from ${entry.name}/${file}`);
  }
}

writeFileSync(OUTPUT, JSON.stringify(db, null, 2) + '\n', 'utf-8');
console.log(`\nMerged ${Object.keys(db).length} collections into db.json`);
