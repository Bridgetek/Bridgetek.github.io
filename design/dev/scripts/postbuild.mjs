// ---------------------------------------------------------------------------
// Post-build script (runs automatically after `astro build` via npm run build)
//
// The Astro build (see astro.config.mjs) writes directly into design/dist:
//   dist/index.html            -> English landing (/)
//   dist/en/index.html         -> English site (/en/)
//   dist/ch/index.html         -> Chinese site (/ch/)
//   dist/_astro/*, images, ... -> shared assets (referenced root-absolute)
//
// So design/dist IS the deployable site. This script only has one extra job:
// copy the static tutorials/ (Sphinx builds from design1) into dist/tutorials
// once, because they are not part of the Astro pipeline. They are shared by
// every language via absolute /tutorials/... links.
// ---------------------------------------------------------------------------
import { cpSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dev = resolve(here, '..'); // design/dev
const root = resolve(dev, '..'); // design
const dist = join(root, 'dist');

const design1 = resolve(root, '..', 'design1');
const tutorialsSrc = join(design1, 'tutorials');
const tutorialsDst = join(dist, 'tutorials');

if (!existsSync(dist)) {
  console.error('[postbuild] design/dist missing. Did `astro build` run first?');
  process.exit(1);
}

if (!existsSync(tutorialsDst)) {
  if (existsSync(tutorialsSrc)) {
    cpSync(tutorialsSrc, tutorialsDst, { recursive: true });
    console.log('[postbuild] copied tutorials -> design/dist/tutorials');
  } else {
    console.warn('[postbuild] design1/tutorials not found — skipped');
  }
} else {
  console.log('[postbuild] tutorials/ already present — skipping copy');
}

console.log('\n[postbuild] done ✔');
console.log('  • design/dist/           -> deployable site');
console.log('  • design/dist/           -> English landing (default)');
console.log('  • design/dist/en         -> /en/');
console.log('  • design/dist/ch         -> /ch/');
