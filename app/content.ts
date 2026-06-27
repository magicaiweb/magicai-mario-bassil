import content from "../content/site.json";

export type Language = "en" | "ar";

export type LocalizedText = Record<Language, string>;

export type EditableSection = {
  id: string;
  type: "hero" | "text" | "events" | "media" | "gallery" | "press" | "form";
  title: LocalizedText;
  body: LocalizedText;
  ctaLabel?: LocalizedText;
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
  source: "YouTube" | "Instagram" | "Facebook";
  url: string;
  thumbnailImage?: string;
  category: LocalizedText;
};

export type PressItem = {
  title: LocalizedText;
  outlet: string;
  url: string;
  type: "Interview" | "Article" | "YouTube";
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
  pages: PageItem[];
};

export const initialContent = content as SiteContent;

export function t(text: LocalizedText, language: Language) {
  return text[language];
}
