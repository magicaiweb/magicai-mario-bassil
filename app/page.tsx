"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { initialContent, Language, t } from "./content";

const languageLabels: Record<Language, string> = {
  en: "EN",
  ar: "AR",
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const isArabic = language === "ar";

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(isArabic ? "ar-LB" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [isArabic],
  );

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[#111111] text-white">
      <section id="home" className="relative min-h-[92vh] overflow-hidden">
        <img
          src={initialContent.hero.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[56%_18%] opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.82)_36%,rgba(0,0,0,0.42)_72%,rgba(0,0,0,0.7)_100%),linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,207,64,0.28),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(255,53,94,0.28),transparent_30%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,#111111)]" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col px-5 py-5 sm:px-8">
          <header className="flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-black/35 px-4 py-3 backdrop-blur">
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
              <Link
                href="/admin/"
                className="hidden rounded-md border border-white/15 px-3 py-2 text-sm font-bold text-white/80 transition hover:border-amber-300 hover:text-amber-300 sm:block"
              >
                CMS
              </Link>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <p className="mb-5 max-w-2xl text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                {t(initialContent.hero.eyebrow, language)}
              </p>
              <h1 className="max-w-4xl text-6xl font-black leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-8xl">
                {t(initialContent.hero.title, language)}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76 sm:text-xl">
                {t(initialContent.hero.subtitle, language)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#book" className="rounded-md bg-amber-300 px-6 py-4 text-center text-sm font-black uppercase text-black">
                  {t(initialContent.hero.primaryCta, language)}
                </a>
                <a
                  href="#shows"
                  className="rounded-md border border-white/18 px-6 py-4 text-center text-sm font-black uppercase text-white transition hover:border-white"
                >
                  {t(initialContent.hero.secondaryCta, language)}
                </a>
              </div>
            </div>

            <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-white/15 bg-black/50 p-4 shadow-2xl">
              <img
                src={initialContent.hero.image}
                alt={isArabic ? "ماريو باسيل" : "Mario Bassil"}
                className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.14),rgba(0,0,0,0.02)_42%,rgba(0,0,0,0.44)),linear-gradient(180deg,transparent_48%,rgba(0,0,0,0.8))]" />
              <div className="absolute bottom-8 left-8 right-8 rounded-md border border-white/20 bg-black/50 p-5 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-300">Official portrait</p>
                <h2 className="mt-3 text-3xl font-black">{isArabic ? "ماريو باسيل" : "Mario Bassil"}</h2>
                <p className="mt-3 text-sm leading-6 text-white/74">
                  {isArabic ? "صورة مؤقتة من الصفحة الرسمية على فيسبوك." : "Placeholder portrait from Mario's official Facebook profile."}
                </p>
              </div>
            </div>
          </div>
        </div>
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
              {t(initialContent.sections[0].title, language)}
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-9 text-black/72">
            <p>{t(initialContent.sections[0].body, language)}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Comedy Night", "TV / Theatre", "Corporate Booking"].map((item) => (
                <div key={item} className="rounded-md border border-black/10 bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">CMS block</p>
                  <p className="mt-2 text-lg font-black text-black">{item}</p>
                </div>
              ))}
            </div>
            <Link href="/comedy-night/" className="inline-flex rounded-md bg-black px-5 py-3 text-sm font-black uppercase text-white">
              {isArabic ? "صفحة كوميدي نايت" : "CMS page: Comedy Night"}
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
            {initialContent.media.map((item) => (
              <a key={item.url} href={item.url} className="group rounded-lg border border-black/10 bg-[#f7f2e8] p-5 transition hover:-translate-y-1 hover:border-black">
                <div className="flex aspect-video items-center justify-center rounded-md bg-black text-white">
                  <span className="text-sm font-black uppercase tracking-[0.22em]">{item.source}</span>
                </div>
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
            {initialContent.gallery.map((item) => (
              <div key={item.tone} className={`flex aspect-[4/5] items-end rounded-lg bg-gradient-to-br ${item.tone} p-5`}>
                <p className="rounded-md bg-black/55 px-3 py-2 text-sm font-black uppercase text-white backdrop-blur">{t(item.label, language)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="press" className="bg-[#f7f2e8] text-black">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-600">{isArabic ? "الإعلام" : "Press / Media"}</p>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">{isArabic ? "مقابلات، مقالات، وملف صحفي" : "Interviews, articles, and press kit"}</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {initialContent.press.map((item) => (
              <a key={item.title.en} href={item.url} className="rounded-lg border border-black/10 bg-white p-5">
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
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">{t(initialContent.sections[1].title, language)}</h2>
            <p className="mt-5 text-lg leading-8 text-white/70">{t(initialContent.sections[1].body, language)}</p>
            <div className="mt-6 space-y-2 text-white/70">
              <a href={`mailto:${initialContent.contacts.email}`} className="block font-black text-white">{initialContent.contacts.email}</a>
              <a href={initialContent.contacts.instagram} className="block">Instagram</a>
              <a href={initialContent.contacts.facebook} className="block">Facebook</a>
            </div>
          </div>
          <form className="grid gap-3 rounded-lg border border-white/15 bg-white/[0.04] p-5">
            {[
              isArabic ? "نوع الفعالية" : "Event type",
              isArabic ? "التاريخ" : "Date",
              isArabic ? "الدولة / المدينة" : "Country / city",
              isArabic ? "عدد الحضور" : "Audience size",
              isArabic ? "نطاق الميزانية" : "Budget range",
              isArabic ? "الاسم والبريد والهاتف" : "Name, email, phone",
            ].map((label) => (
              <label key={label} className="grid gap-2 text-sm font-bold text-white/70">
                {label}
                <input className="h-12 rounded-md border border-white/12 bg-black px-3 text-white outline-none focus:border-amber-300" />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-bold text-white/70">
              {isArabic ? "تفاصيل إضافية" : "Additional notes"}
              <textarea className="min-h-28 rounded-md border border-white/12 bg-black p-3 text-white outline-none focus:border-amber-300" />
            </label>
            <button type="button" className="mt-2 rounded-md bg-amber-300 px-5 py-4 text-sm font-black uppercase text-black">
              {isArabic ? "إرسال الطلب" : "Send inquiry"}
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
          <form className="flex flex-col gap-3 sm:flex-row">
            <input placeholder={isArabic ? "البريد الإلكتروني" : "Email address"} className="h-12 min-w-72 rounded-md border border-black/15 px-3" />
            <button type="button" className="rounded-md bg-black px-5 py-3 text-sm font-black uppercase text-white">
              {isArabic ? "اشترك" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      <section className="bg-[#111111]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">
            {isArabic ? "صفحات CMS" : "CMS pages"}
          </p>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            {isArabic ? "صفحات وأقسام قابلة للإضافة" : "Add new pages and sections"}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {initialContent.pages.map((page) => (
              <a
                key={page.slug}
                href={`${page.slug}/`}
                className="rounded-lg border border-white/12 bg-white/[0.04] p-5 transition hover:border-amber-300"
              >
                <h3 className="text-2xl font-black">{t(page.title, language)}</h3>
                <p className="mt-3 leading-7 text-white/62">{t(page.summary, language)}</p>
              </a>
            ))}
          </div>
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
