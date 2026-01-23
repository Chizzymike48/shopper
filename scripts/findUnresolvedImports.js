import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), 'src');
const exts = ['.js', '.jsx', '.ts', '.tsx'];
const files = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (exts.includes(path.extname(name))) files.push(full);
  }
}

walk(root);

const importRegex = /import\s+[^'";]+\s+from\s+['"](.+)['"];?/g;
const unresolved = [];

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = importRegex.exec(src)) !== null) {
    const spec = m[1];
    if (spec.startsWith('.')) {
      // try to resolve by checking files with extensions and index files
      const base = path.resolve(path.dirname(file), spec);
      let resolved = false;
      for (const ext of exts) {
        if (fs.existsSync(base + ext)) { resolved = base + ext; break; }
      }
      if (!resolved) {
        if (fs.existsSync(base) && fs.statSync(base).isDirectory()) {
          for (const ext of exts) {
            if (fs.existsSync(path.join(base, 'index' + ext))) { resolved = path.join(base, 'index' + ext); break; }
          }
        }
      }
      if (!resolved) {
        // search for case-insensitive match in parent dir
        const dir = path.dirname(base);
        const targetBase = path.basename(base);
        let suggestion = null;
        try {
          const entries = fs.readdirSync(dir);
          const match = entries.find(e => e.toLowerCase() === targetBase.toLowerCase() || e.toLowerCase() === (targetBase + '.js').toLowerCase() || e.toLowerCase() === (targetBase + '.jsx').toLowerCase());
          if (match) suggestion = path.join(dir, match);
        } catch {
          // ignore
        }
        unresolved.push({ file, spec, suggestion });
      }
    }
  }
}

fs.writeFileSync('tmp_unresolved_imports.json', JSON.stringify(unresolved, null, 2));
console.log('Wrote tmp_unresolved_imports.json');
process.exit(0);
