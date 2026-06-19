"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { EditableSection, EventItem, initialContent, Language, MediaItem, PageItem, PressItem, SiteContent } from "../content";

const storageKey = "mario-bassil-cms-draft";

const blankSection: EditableSection = {
  id: "new-page-section",
  type: "text",
  title: { en: "New editable page section", ar: "قسم جديد قابل للتعديل" },
  body: { en: "Write English content here.", ar: "اكتب المحتوى العربي هنا." },
  status: "draft",
};

const blankPage: PageItem = {
  slug: "new-page",
  title: { en: "New CMS page", ar: "صفحة CMS جديدة" },
  summary: { en: "Write a short page summary.", ar: "اكتب ملخصاً قصيراً للصفحة." },
  sections: [
    {
      heading: { en: "New section", ar: "قسم جديد" },
      body: { en: "Write page section content.", ar: "اكتب محتوى القسم." },
    },
  ],
};

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [activeLanguage, setActiveLanguage] = useState<Language>("en");
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      window.requestAnimationFrame(() => {
        setContent(JSON.parse(stored) as SiteContent);
      });
    }
  }, []);

  const serializedContent = useMemo(() => JSON.stringify(content, null, 2), [content]);

  function saveDraft(nextContent = content) {
    window.localStorage.setItem(storageKey, JSON.stringify(nextContent));
    setSavedAt(new Date().toLocaleTimeString());
  }

  function updateHero(field: keyof SiteContent["hero"], value: string) {
    const next = {
      ...content,
      hero: {
        ...content.hero,
        [field]: { ...content.hero[field], [activeLanguage]: value },
      },
    };
    setContent(next);
    saveDraft(next);
  }

  function updateSection(index: number, patch: Partial<EditableSection>) {
    const nextSections = content.sections.map((section, itemIndex) =>
      itemIndex === index ? { ...section, ...patch } : section,
    );
    const next = { ...content, sections: nextSections };
    setContent(next);
    saveDraft(next);
  }

  function updateSectionText(index: number, field: "title" | "body", value: string) {
    const section = content.sections[index];
    updateSection(index, {
      [field]: { ...section[field], [activeLanguage]: value },
    });
  }

  function addSection() {
    const next = {
      ...content,
      sections: [...content.sections, { ...blankSection, id: `section-${Date.now()}` }],
    };
    setContent(next);
    saveDraft(next);
  }

  function updatePage(index: number, patch: Partial<PageItem>) {
    const pages = content.pages.map((page, itemIndex) => (itemIndex === index ? { ...page, ...patch } : page));
    const next = { ...content, pages };
    setContent(next);
    saveDraft(next);
  }

  function updatePageText(index: number, field: "title" | "summary", value: string) {
    const page = content.pages[index];
    updatePage(index, {
      [field]: { ...page[field], [activeLanguage]: value },
    });
  }

  function updatePageSection(index: number, sectionIndex: number, field: "heading" | "body", value: string) {
    const page = content.pages[index];
    const sections = page.sections.map((section, itemIndex) =>
      itemIndex === sectionIndex
        ? { ...section, [field]: { ...section[field], [activeLanguage]: value } }
        : section,
    );
    updatePage(index, { sections });
  }

  function addPage() {
    const next = {
      ...content,
      pages: [...content.pages, { ...blankPage, slug: `new-page-${Date.now()}` }],
    };
    setContent(next);
    saveDraft(next);
  }

  function updateEvent(index: number, patch: Partial<EventItem>) {
    const events = content.events.map((event, itemIndex) => (itemIndex === index ? { ...event, ...patch } : event));
    const next = { ...content, events };
    setContent(next);
    saveDraft(next);
  }

  function updateMedia(index: number, patch: Partial<MediaItem>) {
    const media = content.media.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item));
    const next = { ...content, media };
    setContent(next);
    saveDraft(next);
  }

  function updatePress(index: number, patch: Partial<PressItem>) {
    const press = content.press.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item));
    const next = { ...content, press };
    setContent(next);
    saveDraft(next);
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#171717]">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-[#f4f1ea]/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-600">Mario Bassil CMS</p>
            <h1 className="mt-1 text-3xl font-black">Admin content studio</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(["en", "ar"] as Language[]).map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setActiveLanguage(language)}
                className={`h-10 rounded-md border px-4 text-sm font-black ${
                  activeLanguage === language ? "border-black bg-black text-white" : "border-black/15 bg-white"
                }`}
              >
                Edit {language.toUpperCase()}
              </button>
            ))}
            <button type="button" onClick={() => saveDraft()} className="h-10 rounded-md bg-amber-300 px-4 text-sm font-black">
              Save draft
            </button>
            <Link href="/" className="h-10 rounded-md border border-black/15 bg-white px-4 py-2 text-sm font-black">
              View site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-lg border border-black/10 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">Editable collections</p>
          {["Hero", "Pages / Sections", "CMS Pages", "Events", "Videos", "Gallery", "Press", "Booking", "SEO", "Analytics"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(" / ", "-").replaceAll(" ", "-")}`} className="mt-3 block rounded-md px-3 py-2 text-sm font-bold hover:bg-black hover:text-white">
              {item}
            </a>
          ))}
          <div className="mt-5 rounded-md bg-black p-3 text-xs leading-5 text-white/70">
            Drafts save in browser storage for preview. The same schema is ready for a database-backed CMS adapter.
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-lg border border-black/10 bg-white p-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-black">CMS status</h2>
                <p className="mt-1 text-sm text-black/55">Last local save: {savedAt || "not saved this session"}</p>
              </div>
              <div className="rounded-md bg-green-100 px-3 py-2 text-sm font-black text-green-900">First draft admin ready</div>
            </div>
          </div>

          <EditorPanel id="hero" title="Hero">
            <Field label="Eyebrow" value={content.hero.eyebrow[activeLanguage]} onChange={(value) => updateHero("eyebrow", value)} />
            <Field label="Title" value={content.hero.title[activeLanguage]} onChange={(value) => updateHero("title", value)} />
            <Area label="Subtitle" value={content.hero.subtitle[activeLanguage]} onChange={(value) => updateHero("subtitle", value)} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Primary CTA" value={content.hero.primaryCta[activeLanguage]} onChange={(value) => updateHero("primaryCta", value)} />
              <Field label="Secondary CTA" value={content.hero.secondaryCta[activeLanguage]} onChange={(value) => updateHero("secondaryCta", value)} />
            </div>
          </EditorPanel>

          <EditorPanel id="pages-sections" title="Pages / Sections">
            <div className="flex justify-end">
              <button type="button" onClick={addSection} className="rounded-md bg-black px-4 py-3 text-sm font-black text-white">
                Create page / section
              </button>
            </div>
            <div className="grid gap-4">
              {content.sections.map((section, index) => (
                <div key={section.id} className="rounded-md border border-black/10 bg-[#f9f7f2] p-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field label="Slug / ID" value={section.id} onChange={(value) => updateSection(index, { id: value })} />
                    <Select
                      label="Section type"
                      value={section.type}
                      options={["hero", "text", "events", "media", "gallery", "press", "form"]}
                      onChange={(value) => updateSection(index, { type: value as EditableSection["type"] })}
                    />
                    <Select
                      label="Status"
                      value={section.status}
                      options={["published", "draft"]}
                      onChange={(value) => updateSection(index, { status: value as EditableSection["status"] })}
                    />
                  </div>
                  <Field label="Title" value={section.title[activeLanguage]} onChange={(value) => updateSectionText(index, "title", value)} />
                  <Area label="Body" value={section.body[activeLanguage]} onChange={(value) => updateSectionText(index, "body", value)} />
                </div>
              ))}
            </div>
          </EditorPanel>

          <EditorPanel id="cms-pages" title="CMS Pages">
            <div className="flex justify-end">
              <button type="button" onClick={addPage} className="rounded-md bg-black px-4 py-3 text-sm font-black text-white">
                Create new page
              </button>
            </div>
            {content.pages.map((page, index) => (
              <div key={page.slug} className="rounded-md border border-black/10 bg-[#f9f7f2] p-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label="Slug" value={page.slug} onChange={(value) => updatePage(index, { slug: value })} />
                  <Field label="Title" value={page.title[activeLanguage]} onChange={(value) => updatePageText(index, "title", value)} />
                  <Field label="Summary" value={page.summary[activeLanguage]} onChange={(value) => updatePageText(index, "summary", value)} />
                </div>
                {page.sections.map((section, sectionIndex) => (
                  <div key={`${page.slug}-${sectionIndex}`} className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Field label="Section heading" value={section.heading[activeLanguage]} onChange={(value) => updatePageSection(index, sectionIndex, "heading", value)} />
                    <Area label="Section body" value={section.body[activeLanguage]} onChange={(value) => updatePageSection(index, sectionIndex, "body", value)} />
                  </div>
                ))}
              </div>
            ))}
          </EditorPanel>

          <EditorPanel id="events" title="Events / Tour Calendar">
            {content.events.map((event, index) => (
              <div key={`${event.date}-${index}`} className="grid gap-3 rounded-md border border-black/10 bg-[#f9f7f2] p-4 lg:grid-cols-5">
                <Field label="Date" value={event.date} onChange={(value) => updateEvent(index, { date: value })} />
                <Field label="City" value={event.city[activeLanguage]} onChange={(value) => updateEvent(index, { city: { ...event.city, [activeLanguage]: value } })} />
                <Field label="Venue" value={event.venue[activeLanguage]} onChange={(value) => updateEvent(index, { venue: { ...event.venue, [activeLanguage]: value } })} />
                <Field label="Ticket URL" value={event.ticketUrl} onChange={(value) => updateEvent(index, { ticketUrl: value })} />
                <Select label="Status" value={event.status} options={["on-sale", "soon", "past"]} onChange={(value) => updateEvent(index, { status: value as EventItem["status"] })} />
              </div>
            ))}
          </EditorPanel>

          <EditorPanel id="videos" title="Videos / Social Embeds">
            {content.media.map((item, index) => (
              <div key={`${item.url}-${index}`} className="grid gap-3 rounded-md border border-black/10 bg-[#f9f7f2] p-4 lg:grid-cols-4">
                <Field label="Title" value={item.title[activeLanguage]} onChange={(value) => updateMedia(index, { title: { ...item.title, [activeLanguage]: value } })} />
                <Select label="Source" value={item.source} options={["YouTube", "Instagram", "Facebook"]} onChange={(value) => updateMedia(index, { source: value as MediaItem["source"] })} />
                <Field label="URL" value={item.url} onChange={(value) => updateMedia(index, { url: value })} />
                <Field label="Category" value={item.category[activeLanguage]} onChange={(value) => updateMedia(index, { category: { ...item.category, [activeLanguage]: value } })} />
              </div>
            ))}
          </EditorPanel>

          <EditorPanel id="press" title="Press / Media Kit">
            {content.press.map((item, index) => (
              <div key={`${item.outlet}-${index}`} className="grid gap-3 rounded-md border border-black/10 bg-[#f9f7f2] p-4 lg:grid-cols-4">
                <Field label="Title" value={item.title[activeLanguage]} onChange={(value) => updatePress(index, { title: { ...item.title, [activeLanguage]: value } })} />
                <Field label="Outlet" value={item.outlet} onChange={(value) => updatePress(index, { outlet: value })} />
                <Field label="URL" value={item.url} onChange={(value) => updatePress(index, { url: value })} />
                <Select label="Type" value={item.type} options={["Interview", "Article", "Download"]} onChange={(value) => updatePress(index, { type: value as PressItem["type"] })} />
              </div>
            ))}
          </EditorPanel>

          <EditorPanel id="booking" title="Booking / Contacts">
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Booking email" value={content.contacts.email} onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, email: value } })} />
              <Field label="Instagram" value={content.contacts.instagram} onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, instagram: value } })} />
              <Field label="Facebook" value={content.contacts.facebook} onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, facebook: value } })} />
            </div>
          </EditorPanel>

          <EditorPanel id="seo" title="SEO">
            <div className="grid gap-3 sm:grid-cols-3">
              {["Mario Bassil official", "Comedy Night Lebanon", "Mario Bassil Dubai tour", "Mario Bassil Montreal", "Lebanese comedian booking", "Arab comedy shows"].map((keyword) => (
                <div key={keyword} className="rounded-md border border-black/10 bg-[#f9f7f2] p-3 text-sm font-bold">
                  {keyword}
                </div>
              ))}
            </div>
          </EditorPanel>

          <EditorPanel id="analytics" title="Analytics Placeholders">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="GA4 Measurement ID" value="G-XXXXXXXXXX" onChange={() => undefined} />
              <Field label="Meta Pixel ID" value="000000000000000" onChange={() => undefined} />
            </div>
          </EditorPanel>

          <EditorPanel id="export" title="Content Export">
            <textarea readOnly value={serializedContent} className="min-h-80 w-full rounded-md border border-black/10 bg-black p-4 font-mono text-xs text-green-200" />
          </EditorPanel>
        </section>
      </div>
    </main>
  );
}

function EditorPanel({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="rounded-lg border border-black/10 bg-white p-5">
      <h2 className="mb-5 text-2xl font-black">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-black/62">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="h-11 rounded-md border border-black/15 bg-white px-3 text-black outline-none focus:border-black" />
    </label>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-black/62">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className="min-h-28 rounded-md border border-black/15 bg-white p-3 text-black outline-none focus:border-black" />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-black/62">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-11 rounded-md border border-black/15 bg-white px-3 text-black outline-none focus:border-black">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
