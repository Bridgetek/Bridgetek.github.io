# Bridgetek EVE — Open Source Portal (design)

A complete redesign of the Bridgetek open-source portal, rebuilt from the ground
up with **Astro + Tailwind CSS v4**. All website text is generated from **one
JSON file** (`dev/src/data/site.json`) that holds both the **en** and **ch**
translations, so layout and data are fully separated.

Design language is inspired by modern robotics/tech sites (e.g. roboseasy.ai):
a dark, tech-forward theme with a self-drawn **EVE chip animation** in the header
(twinkling stars + moving connections), glowing cards, and a fully responsive grid.

---

## Folder structure

```
design/
├─ dev/                        ← Astro project (SOURCE)
│  ├─ src/
│  │  ├─ data/site.json        ← THE single content file: { "en": {...}, "ch": {...} }
│  │  ├─ data/site.ts          ← typed loader bridging components ↔ JSON
│  │  ├─ components/           ← Navbar, Hero, ChipAnimation, sections, Footer...
│  │  ├─ layouts/ pages/ styles/
│  ├─ public/                  ← static assets (images, demo_images, logo, favicon)
│  ├─ scripts/postbuild.mjs    ← copies repository tutorials/ into dist
│  ├─ astro.config.mjs         ← outDir: "../dist"
│  ├─ package.json  tsconfig.json  .gitignore
│  └─ node_modules/
├─ dist/                       ← BUILD OUTPUT (deployable, generated)
│  ├─ index.html               ← /   (English default landing)
│  ├─ en/                      ← /en/
│  ├─ ch/                      ← /ch/
│  ├─ _astro/  images/  demo_images/  ...  ← shared assets
│  └─ tutorials/               ← copied from design1 (shared by all languages)
└─ README.md
```

## Commands

Run everything from the **`dev/`** folder:

```bash
cd dev
npm install        # install dependencies
npm run dev        # start Astro dev server
npm run build      # build → design/dist (and copy tutorials)
npm run preview    # preview the built site from dist/
```

`npm run build` runs `astro build` (which writes directly into `../dist` thanks
to `outDir: "../dist"`) and then `scripts/postbuild.mjs`, which copies
`tutorials/` from the repository root into `dist/tutorials` after each clean build.

Result — `design/dist/` is the deployable site:

- `/`   → English landing (default)
- `/en` → English site
- `/ch` → Chinese site

## How the EN / 中文 switch works

The header (and footer) language switch are plain links:

- **EN** → `/en/`
- **中文** → `/ch/`

The root `/` always serves English, so a visitor landing on the site sees English
by default and can jump to `/ch/` (or back to `/en/`) with one click.

## Adding / editing content

Open `dev/src/data/site.json` and edit the matching key in `en` and/or `ch`.
Every word on the site comes from that file — no HTML edits required.
Run `npm run build` afterwards to regenerate `design/dist`.

## i18n notes

- `hreflang` / `canonical` links point to `/` and `/ch/` (root-absolute paths).
- All asset references are root-absolute (`/images/...`, `/_astro/...`), so the
  site must be served with `design/dist` as the web root (as is done when
  deployed). For local preview: `python -m http.server 4321 --directory dist`.
