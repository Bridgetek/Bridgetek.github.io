// ---------------------------------------------------------------------------
// TypeScript types that mirror src/data/site.json (en & ch share one schema).
// ---------------------------------------------------------------------------

export interface LinkItem {
  name: string;
  desc?: string;
  url: string;
}

export interface NavLink {
  id: string;
  label: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  nav: {
    brand: { name: string; sub: string };
    links: NavLink[];
    community: { label: string; url: string };
    language: { label: string; en: string; ch: string };
  };
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    chipNodes: { label: string }[];
    scroll: string;
  };
  overview: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      text: string;
      icon: string;
    }[];
  };
  stats: { value: string; label: string }[];
  platforms: {
    eyebrow: string;
    title: string;
    description: string;
    items: { image: string; label: string }[];
  };
  modules: {
    eyebrow: string;
    title: string;
    description: string;
    items: LinkItem[];
  };
  an: {
    eyebrow: string;
    title: string;
    description: string;
    groups: { title: string; items: LinkItem[] }[];
  };
  mcu: {
    eyebrow: string;
    title: string;
    description: string;
    items: { desc: string; name: string; url: string }[];
  };
  eve: {
    eyebrow: string;
    title: string;
    description: string;
    groups: { title: string; items: LinkItem[] }[];
  };
  embedded_world: {
    eyebrow: string;
    title: string;
    description: string;
    years: LinkItem[];
    videos: { id: string; title: string }[];
  };
  tutorials: {
    eyebrow: string;
    title: string;
    description: string;
    groups: { title: string; items: { label: string; url: string }[] }[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    items: { image: string; title: string }[];
  };
  opensource: { title: string; text: string; image: string };
  questions: {
    title: string;
    description: string;
    links: { label: string; url: string }[];
    emailLabel: string;
    email: string;
  };
  footer: {
    company: string;
    aboutTitle: string;
    aboutText: string;
    contactTitle: string;
    address: string;
    tel: string;
    website: string;
    linksTitle: string;
    links: NavLink[];
    social: { facebook: string; twitter: string; youtube: string; linkedin: string };
    copyright: string;
  };
}
