import content from "../content/site.json";

export type Language = "en" | "ar";

export type LocalizedText = Record<Language, string>;

export type EditableSection = {
  id: string;
  type: "hero" | "text" | "events" | "media" | "gallery" | "press" | "form";
  title: LocalizedText;
  body: LocalizedText;
  ctaLabel?: LocalizedText;
  image?: string;
  cards?: {
    title: LocalizedText;
    body: LocalizedText;
  }[];
  status: "published" | "draft";
};

export type EventItem = {
  slug: string;
  date: string;
  startTime: string;
  endTime: string;
  city: LocalizedText;
  venue: LocalizedText;
  label: LocalizedText;
  description: LocalizedText;
  ticketPrice: LocalizedText;
  ticketUrl: string;
  posterImage: string;
  posterTone: string;
  status: "on-sale" | "soon" | "past";
};

export type MediaItem = {
  title: LocalizedText;
  source: "YouTube" | "Instagram" | "Facebook" | "Google Drive" | "Hosted Video";
  url: string;
  thumbnailImage?: string;
  category: LocalizedText;
  sortOrder?: number;
  status?: "published" | "draft";
};

export type PressItem = {
  title: LocalizedText;
  outlet: string;
  url: string;
  type: "Interview" | "Article" | "YouTube";
  thumbnailImage?: string;
};

export type GalleryItem = {
  label: LocalizedText;
  image: string;
  url?: string;
  sortOrder?: number;
  status?: "published" | "draft";
  tone: string;
};

export type PageItem = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  posterImage?: string;
  posterAlt?: LocalizedText;
  featureLabel?: LocalizedText;
  featureTitle?: LocalizedText;
  featureBody?: LocalizedText;
  crew?: {
    name: string;
    role: LocalizedText;
    bio: LocalizedText;
    image?: string;
    imagePosition?: string;
    imageNote?: LocalizedText;
  }[];
  showings?: {
    date: string;
    time: string;
    venue: LocalizedText;
    city: LocalizedText;
    status: LocalizedText;
    ticketUrl?: string;
    ticketLabel?: LocalizedText;
  }[];
  contact?: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
    email: string;
    ctaLabel: LocalizedText;
  };
  sections: {
    heading: LocalizedText;
    body: LocalizedText;
  }[];
};

export type SiteContent = {
  nav: { label: LocalizedText; href: string }[];
  hero: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    subtitle: LocalizedText;
    image: string;
    primaryCta: LocalizedText;
    secondaryCta: LocalizedText;
  };
  sections: EditableSection[];
  events: EventItem[];
  media: MediaItem[];
  press: PressItem[];
  gallery: GalleryItem[];
  contacts: {
    email: string;
    facebook: string;
    instagram: string;
  };
  footer: {
    brand: LocalizedText;
    note: LocalizedText;
    copyright: LocalizedText;
  };
  pages: PageItem[];
};

export const initialContent = content as SiteContent;

export function t(text: LocalizedText, language: Language) {
  return text[language];
}
