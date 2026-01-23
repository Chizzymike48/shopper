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
const mismatches = [];

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = importRegex.exec(src)) !== null) {
    const spec = m[1];
    if (spec.startsWith('.') ) {
      const refer = path.resolve(path.dirname(file), spec);
      // Try files with extensions
      for (const ext of ['', ...exts]) {
        const candidate = refer + ext;
        const dir = path.dirname(candidate);
        const base = path.basename(candidate);
        try {
          const entries = fs.readdirSync(dir);
          const found = entries.find(e => e.toLowerCase() === base.toLowerCase());
          if (found) {
            // compare exact match
            if (found !== base) {
              // Record mismatch
              mismatches.push({
                file,
                importPath: spec,
                resolvedDir: dir,
                importBasename: base,
                actualFilename: found,
                candidate,
              });
            }
            break;
          }
        } catch {
          // ignore
        }
      }
    }
  }
}

if (mismatches.length === 0) {
  console.log('No case-only mismatches found.');
  fs.writeFileSync('tmp_case_mismatches.json', JSON.stringify([], null, 2));
  process.exit(0);
}

console.log('Found case-only mismatches:');
for (const mm of mismatches) {
  console.log(`- In ${path.relative(process.cwd(), mm.file)}: import '${mm.importPath}' -> actual '${mm.actualFilename}'`);
}
fs.writeFileSync('tmp_case_mismatches.json', JSON.stringify(mismatches, null, 2));
process.exit(0);
