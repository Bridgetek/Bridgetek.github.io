// ---------------------------------------------------------------------------
// Content loader — the ONLY bridge between layout (.astro/.tsx) and data (.json)
// All text shown on the website lives in src/data/site.json under "en" and "ch".
// ---------------------------------------------------------------------------
import type { SiteContent } from './types';
import site from './site.json';

export const LANGUAGES = ['en', 'ch'] as const;
export type Lang = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = 'en';

export const LANGS: Record<Lang, string> = {
  en: 'en',
  ch: 'zh-Hans',
};

// The single JSON file holds every translation.
const content = site as unknown as Record<Lang, SiteContent>;

/** Returns the full content object for a language. */
export function getContent(lang: Lang): SiteContent {
  return content[lang] ?? content[DEFAULT_LANG];
}

/** Returns all navigation links as `{ id, label }[]`. */
export function getNavLinks(lang: Lang) {
  return getContent(lang).nav.links;
}

/** Whether a language route is served from the root (English is also copied to `/`). */
export function isDefault(lang: Lang): boolean {
  return lang === DEFAULT_LANG;
}

/**
 * Canonical URL of a language route. EN -> /en/ , CH -> /ch/.
 * (The root `/` always serves a copy of English as the default landing page.)
 */
export function langUrl(lang: Lang): string {
  return `/${lang}/`;
}

/** The current page's canonical path (used for <link hreflang>). */
export function canonicalPath(lang: Lang): string {
  return `/${lang}/`;
}
