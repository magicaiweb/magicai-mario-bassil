"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EventItem, initialContent, Language, t } from "../../content";

const languageLabels: Record<Language, string> = {
  en: "EN",
  ar: "AR",
};

export function EventDetail({ event }: { event: EventItem }) {
  const [language, setLanguage] = useState<Language>("en");
  const isArabic = language === "ar";

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat(isArabic ? "ar-LB" : "en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(`${event.date}T00:00:00`)),
    [event.date, isArabic],
  );

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[#111111] text-white">
      <header className="border-b border-white/10 bg-black/55 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/#shows" className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
            Mario Bassil
          </Link>
          <div className="flex items-center gap-2">
            {(Object.keys(languageLabels) as Language[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setLanguage(key)}
                className={`h-9 min-w-10 rounded-md border px-3 text-sm font-black transition ${
                  language === key ? "border-amber-300 bg-amber-300 text-black" : "border-white/15 bg-white/5 text-white"
                }`}
              >
                {languageLabels[key]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,207,64,0.2),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(255,53,94,0.2),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[370px_1fr] lg:gap-9 lg:py-16">
        <EventPoster event={event} />

        <article>
          <div className="grid gap-5 border-b-4 border-amber-300 pb-5 text-sm font-black text-white/78 md:grid-cols-3">
            <EventMeta icon="calendar" label={formattedDate} />
            <EventMeta icon="clock" label={`${event.startTime} - ${event.endTime}`} />
            <EventMeta icon="pin" label={t(event.city, language)} />
          </div>

          <div className="py-8">
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              {t(event.label, language)}
            </h1>
            <p className="mt-2 text-xl font-bold text-white/62">
              {t(event.venue, language)}
            </p>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">
              {t(event.description, language)}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4">
            <p className="text-2xl font-black tracking-normal text-amber-300">
              {isArabic ? "سعر التذكرة: " : "Ticket Price : "}
              {t(event.ticketPrice, language)}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={event.ticketUrl}
                className="rounded-md bg-amber-300 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              >
                {isArabic ? "شراء تذكرة" : "Buy Ticket"}
              </a>
              <Link
                href="/#book"
                className="rounded-md border border-white/15 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-amber-300 hover:text-amber-300"
              >
                {isArabic ? "طلب حجز" : "Booking Inquiry"}
              </Link>
            </div>
          </div>
        </article>
        </div>
      </section>
    </main>
  );
}

function EventPoster({ event }: { event: EventItem }) {
  const posterImage = event.posterImage || initialContent.hero.image;
  const posterStyle = {
    backgroundImage: `url(${posterImage})`,
    backgroundPosition: "center top",
    backgroundSize: "cover",
  };

  return (
    <div
      className="relative aspect-[3/4] min-h-[420px] overflow-hidden rounded-lg bg-black shadow-2xl"
      style={posterStyle}
    />
  );
}

function EventMeta({ icon, label }: { icon: "calendar" | "clock" | "pin"; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center text-amber-300">
        <Icon name={icon} />
      </span>
      <span>{label}</span>
    </div>
  );
}

function Icon({ name }: { name: "calendar" | "clock" | "pin" }) {
  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6l4 2" />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-2">
        <path d="M12 21s7-5.2 7-12A7 7 0 1 0 5 9c0 6.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-2">
      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
