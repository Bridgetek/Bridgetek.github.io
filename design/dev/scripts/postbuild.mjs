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
// copy the static tutorials/ from the repository root into dist/tutorials
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

const repository = resolve(root, '..');
const tutorialsSrc = join(repository, 'tutorials');
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
    console.error('[postbuild] repository tutorials/ missing — cannot build tutorial links');
    process.exit(1);
  }
} else {
  console.log('[postbuild] tutorials/ already present — skipping copy');
}

console.log('\n[postbuild] done ✔');
console.log('  • design/dist/           -> deployable site');
console.log('  • design/dist/           -> English landing (default)');
console.log('  • design/dist/en         -> /en/');
console.log('  • design/dist/ch         -> /ch/');
