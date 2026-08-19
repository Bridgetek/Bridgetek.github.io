// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://brtchip.com',
  // Build output lands directly in design/dist (the deployable folder):
  //   dist/index.html  -> English landing (/)
  //   dist/en/         -> /en/
  //   dist/ch/         -> /ch/
  //   dist/_astro, images, ... -> shared assets (root-absolute paths)
  outDir: '../dist',
  vite: {
    plugins: [tailwindcss()],
  },
});
