"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { initialContent, Language, t } from "./content";

const languageLabels: Record<Language, string> = {
  en: "EN",
  ar: "AR",
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [formError, setFormError] = useState("");
  const isArabic = language === "ar";
  const aboutSection = initialContent.sections.find((section) => section.id === "about") ?? initialContent.sections[0];
  const bookingSection = initialContent.sections.find((section) => section.id === "book") ?? initialContent.sections[1];

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(isArabic ? "ar-LB" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [isArabic],
  );

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setFormError(isArabic ? "يرجى تعبئة كل الحقول المطلوبة بشكل صحيح." : "Please complete all required fields with valid values.");
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const body = Array.from(data.entries())
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    setFormError("");
    window.location.href = `mailto:${initialContent.contacts.email}?subject=${encodeURIComponent("Mario Bassil booking inquiry")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[#111111] text-white">
      <header className="border-b border-white/10 bg-[#111111]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#home" className="text-sm font-black uppercase tracking-[0.28em] text-amber-300">
            Mario Bassil
          </a>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-white/78 lg:flex">
            {initialContent.nav.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-amber-300">
                {t(item.label, language)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {(Object.keys(languageLabels) as Language[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setLanguage(key)}
                className={`h-9 min-w-10 rounded-md border px-3 text-sm font-black transition ${
                  language === key
                    ? "border-amber-300 bg-amber-300 text-black"
                    : "border-white/15 bg-white/5 text-white"
                }`}
              >
                {languageLabels[key]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section id="home" className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-black">
        <Image
          src={initialContent.hero.image}
          alt={isArabic ? "ماريو باسيل" : "Mario Bassil"}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
        />
      </section>

      <section className="border-y border-white/10 bg-amber-300 text-black">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 text-sm font-black uppercase tracking-[0.16em] sm:grid-cols-3 sm:px-8">
          <span>Comedy Night</span>
          <span>{isArabic ? "عروض مباشرة وحفلات خاصة" : "Live shows and private events"}</span>
          <span>{isArabic ? "لبنان، الخليج، أوروبا، أميركا الشمالية" : "Lebanon, Gulf, Europe, North America"}</span>
        </div>
      </section>

      <section id="about" className="bg-[#f7f2e8] text-[#161616]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-600">{isArabic ? "نبذة" : "About"}</p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              {t(aboutSection.title, language)}
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-9 text-black/72">
            <p>{t(aboutSection.body, language)}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {(aboutSection.cards ?? []).map((item) => (
                <div key={item.title.en} className="rounded-md border border-black/10 bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">{isArabic ? "قابل للتعديل" : "Editable"}</p>
                  <p className="mt-2 text-lg font-black text-black">{t(item.title, language)}</p>
                  <p className="mt-2 text-sm leading-6 text-black/55">{t(item.body, language)}</p>
                </div>
              ))}
            </div>
            <Link href="/comedy-night/" className="inline-flex rounded-md bg-black px-5 py-3 text-sm font-black uppercase text-white">
              {aboutSection.ctaLabel ? t(aboutSection.ctaLabel, language) : (isArabic ? "صفحة كوميدي نايت" : "Comedy Night")}
            </Link>
          </div>
        </div>
      </section>

      <section id="shows" className="bg-[#111111]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">{isArabic ? "العروض" : "Shows / Events"}</p>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">{isArabic ? "تقويم الجولات والتذاكر" : "Tour calendar and tickets"}</h2>
            </div>
            <a href="#book" className="rounded-md border border-white/20 px-5 py-3 text-sm font-black uppercase text-white">
              {isArabic ? "اطلب عرضاً خاصاً" : "Request private event"}
            </a>
          </div>
          <div className="mt-10 grid gap-4">
            {initialContent.events.map((event) => (
              <Link
                key={event.slug}
                href={`/shows/${event.slug}/`}
                className="grid gap-4 rounded-lg border border-white/12 bg-white/[0.04] p-5 transition hover:border-amber-300 sm:grid-cols-[170px_1fr_auto] sm:items-center"
              >
                <time className="text-lg font-black text-amber-300">{dateFormatter.format(new Date(event.date))}</time>
                <div>
                  <h3 className="text-2xl font-black">{t(event.city, language)}</h3>
                  <p className="mt-1 text-white/65">{t(event.label, language)} · {t(event.venue, language)}</p>
                  <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-white/42">
                    {isArabic ? "عرض التفاصيل" : "View event details"}
                  </p>
                </div>
                <span className="rounded-md bg-white px-5 py-3 text-center text-sm font-black uppercase text-black">
                  {event.status === "on-sale" ? (isArabic ? "تذاكر" : "Tickets") : (isArabic ? "قريباً" : "Soon")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="videos" className="bg-white text-black">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-600">{isArabic ? "الفيديو" : "Videos"}</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black sm:text-5xl">{isArabic ? "مقاطع وريلز وروابط اجتماعية" : "Clips, reels, and social embeds"}</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {initialContent.media
              .filter((item) => (item.status ?? "published") === "published")
              .toSorted((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
              .map((item) => (
                <a key={item.url} href={item.url} className="group rounded-lg border border-black/10 bg-[#f7f2e8] p-5 transition hover:-translate-y-1 hover:border-black">
                  <MediaPreview url={item.url} label={item.source} thumbnailImage={item.thumbnailImage} />
                  <h3 className="mt-5 text-2xl font-black">{t(item.title, language)}</h3>
                  <p className="mt-2 text-black/62">{t(item.category, language)}</p>
                </a>
              ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#111111]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">{isArabic ? "المعرض" : "Gallery"}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {initialContent.gallery
              .filter((item) => (item.status ?? "published") === "published")
              .toSorted((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
              .map((item) => {
                const className = `flex aspect-[4/5] items-end overflow-hidden rounded-lg bg-gradient-to-br ${item.tone} bg-cover bg-center p-5 transition hover:-translate-y-1`;
                const style = item.image ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.74)), url(${item.image})` } : undefined;
                const content = (
                  <p className="rounded-md bg-black/55 px-3 py-2 text-sm font-black uppercase text-white backdrop-blur">{t(item.label, language)}</p>
                );

                return item.url ? (
                  <a key={`${item.image}-${item.url}`} href={item.url} className={className} style={style}>
                    {content}
                  </a>
                ) : (
                  <div key={item.image} className={className} style={style}>
                    {content}
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section id="press" className="bg-[#f7f2e8] text-black">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-600">{isArabic ? "الإعلام" : "Press / Media"}</p>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">{isArabic ? "مقابلات، مقالات، وملف صحفي" : "Interviews, articles, and press kit"}</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {initialContent.press.map((item) => (
              <a key={item.title.en} href={item.url} className="rounded-lg border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:border-black">
                <MediaPreview url={item.url} label={item.type} />
                <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">{item.type} · {item.outlet}</p>
                <h3 className="mt-4 text-2xl font-black">{t(item.title, language)}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="bg-[#111111]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">{isArabic ? "الحجز" : "Book Mario"}</p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">{t(bookingSection.title, language)}</h2>
            <p className="mt-5 text-lg leading-8 text-white/70">{t(bookingSection.body, language)}</p>
            <div className="mt-6 flex items-center gap-3 text-white/70">
              <a href={`mailto:${initialContent.contacts.email}`} className="block font-black text-white">{initialContent.contacts.email}</a>
              <a href={initialContent.contacts.instagram} aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition hover:border-amber-300 hover:text-amber-300">
                <InstagramIcon />
              </a>
              <a href={initialContent.contacts.facebook} aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition hover:border-amber-300 hover:text-amber-300">
                <FacebookIcon />
              </a>
            </div>
          </div>
          <form onSubmit={submitInquiry} className="grid gap-3 rounded-lg border border-white/15 bg-white/[0.04] p-5">
            <InquiryField name="eventType" label={isArabic ? "نوع الفعالية" : "Event type"} required />
            <InquiryField name="date" label={isArabic ? "التاريخ" : "Date"} type="date" required />
            <InquiryField name="location" label={isArabic ? "الدولة / المدينة" : "Country / city"} required />
            <InquiryField name="audienceSize" label={isArabic ? "عدد الحضور" : "Audience size"} type="number" required min="1" />
            <InquiryField name="budget" label={isArabic ? "نطاق الميزانية" : "Budget range"} required />
            <InquiryField name="name" label={isArabic ? "الاسم" : "Name"} required />
            <InquiryField name="email" label={isArabic ? "البريد الإلكتروني" : "Email"} type="email" required />
            <InquiryField name="phone" label={isArabic ? "الهاتف" : "Phone"} type="tel" required />
            <label className="grid gap-2 text-sm font-bold text-white/70">
              {isArabic ? "تفاصيل إضافية" : "Additional notes"}
              <textarea name="notes" className="min-h-28 rounded-md border border-white/12 bg-black p-3 text-white outline-none focus:border-amber-300" />
            </label>
            {formError ? <p className="text-sm font-bold text-red-300">{formError}</p> : null}
            <button type="submit" className="mt-2 rounded-md bg-amber-300 px-5 py-4 text-sm font-black uppercase text-black">
              {bookingSection.ctaLabel ? t(bookingSection.ctaLabel, language) : (isArabic ? "إرسال الطلب" : "Send inquiry")}
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-black">{isArabic ? "النشرة البريدية" : "Newsletter"}</h2>
            <p className="mt-2 text-black/60">{isArabic ? "تحديثات العروض والجولات والروابط الجديدة." : "Show updates, tour alerts, and new media links."}</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
            <input type="email" required placeholder={isArabic ? "البريد الإلكتروني" : "Email address"} className="h-12 min-w-72 rounded-md border border-black/15 px-3" />
            <button type="submit" className="rounded-md bg-black px-5 py-3 text-sm font-black uppercase text-white">
              {isArabic ? "اشترك" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#111111] px-5 py-8 text-sm text-white/60 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row">
          <span>Mario Bassil Official</span>
          <span>GA4 and Meta Pixel placeholders are ready for production IDs.</span>
        </div>
      </footer>
    </main>
  );
}

function InquiryField({
  label,
  name,
  type = "text",
  required = false,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/70">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        min={min}
        className="h-12 rounded-md border border-white/12 bg-black px-3 text-white outline-none focus:border-amber-300"
      />
    </label>
  );
}

function MediaPreview({ url, label, thumbnailImage }: { url: string; label: string; thumbnailImage?: string }) {
  const videoId = getYouTubeId(url);
  const previewImage = thumbnailImage || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "");

  if (previewImage) {
    return (
      <div
        className="flex aspect-video items-center justify-center overflow-hidden rounded-md bg-black bg-cover bg-center text-white"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.24)), url(${previewImage})` }}
      >
        <span className="rounded-full bg-black/72 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
          {label}
        </span>
      </div>
    );
  }

  if (!videoId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-md bg-black text-white">
        <span className="text-sm font-black uppercase tracking-[0.22em]">{label}</span>
      </div>
    );
  }

  return (
    <iframe
      title={`${label} video`}
      src={`https://www.youtube.com/embed/${videoId}`}
      className="aspect-video w-full rounded-md bg-black"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:watch\?v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
  return match?.[1] ?? "";
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17.5 6.8h.01" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M14.1 8.2V6.9c0-.7.5-1 1.1-1h1.5V3.3A20 20 0 0 0 14.5 3c-2.2 0-3.7 1.3-3.7 3.7v1.5H8.3V11h2.5v10h3.1V11h2.5l.4-2.8h-2.7Z" />
    </svg>
  );
}
