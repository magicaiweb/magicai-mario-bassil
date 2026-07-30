import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initialContent, t, type Language } from "../content";
import { ShowreelPlayer } from "../ShowreelPlayer";

type Params = Promise<{ slug: string }>;

const comedyNightCrew = [
  {
    name: "Mario Bassil",
    role: "Headliner / creator",
    copy: "The face of Comedy Night, bringing stage characters, television energy, and Lebanese satire to live audiences.",
  },
  {
    name: "Chady Maroun",
    role: "Comedy performer",
    copy: "A core Comedy Night performer known for fast character work, sketch timing, and crowd-driven stage presence.",
  },
  {
    name: "Aline Ahmar",
    role: "Comedy performer",
    copy: "Aline brings a sharp live presence to the Comedy Night cast, adding character work and audience chemistry to the show.",
  },
];

const comedyNightShowings = [
  {
    date: "October 25, 2025",
    time: "10:00 PM",
    venue: "Beirut Hall, Sin El Fil",
    location: "Lebanon",
    status: "Archive",
  },
  {
    date: "January 16, 2026",
    time: "Evening show",
    venue: "Decorum Midtown",
    location: "Houston, TX",
    status: "Archive",
  },
  {
    date: "February 1, 2026",
    time: "8:00 PM",
    venue: "Zikrayet Lebanese Restaurant and Lounge",
    location: "Alexandria, VA",
    status: "Archive",
  },
  {
    date: "February 8, 2026",
    time: "Evening show",
    venue: "Layali Miami",
    location: "Miami, FL",
    status: "Archive",
  },
];

export function generateStaticParams() {
  return initialContent.pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const page = initialContent.pages.find((item) => item.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title.en} | Mario Bassil Official`,
    description: page.summary.en,
  };
}

export default async function CmsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = initialContent.pages.find((item) => item.slug === slug);
  const language: Language = "en";
  const showreel = initialContent.media.find((item) => item.source === "Hosted Video" || item.source === "Google Drive") ?? initialContent.media[0];

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-16">
        <Link
          href="/"
          className="rounded-md border border-white/15 px-4 py-2 text-sm font-bold text-white/75 transition hover:border-amber-300 hover:text-amber-300"
        >
          Back to home
        </Link>
        <section className="mt-12 border-b border-white/10 pb-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
            Comedy Archive
          </p>
          <h1 className="mt-4 text-5xl font-black sm:text-7xl">
            {t(page.title, language)}
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/68">
            {t(page.summary, language)}
          </p>
        </section>
        <section id="showreel" className="mt-8 border-b border-white/10 pb-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <ShowreelPlayer language={language} showreel={showreel} />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">Showreel</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                {t(showreel.title, language)}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/68">
                {t(showreel.category, language)}
              </p>
            </div>
          </div>
        </section>
        {page.slug === "comedy-night" ? (
          <>
            <section className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#180f0f]">
              <div className="relative aspect-[1175/550] min-h-[220px]">
                <Image
                  src="/websites/mario-bassil/images/mario/comedy-night-crew-poster.png"
                  alt="Comedy Night poster with Mario Bassil, Chady Maroun, and Aline Ahmar"
                  fill
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="border-t border-white/10 p-6 sm:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-red-400">Comedy Night crew</p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">Mario Bassil, Chady Maroun, and Aline Ahmar</h2>
                <p className="mt-4 max-w-3xl leading-8 text-white/66">
                  A live Lebanese comedy lineup built for theatre nights, diaspora events, festivals, and private bookings.
                </p>
              </div>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-3">
              {comedyNightCrew.map((member) => (
                <article key={member.name} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">{member.role}</p>
                  <h3 className="mt-3 text-2xl font-black">{member.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{member.copy}</p>
                </article>
              ))}
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/[0.045] p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">Showings dates</p>
                  <h2 className="mt-3 text-3xl font-black sm:text-4xl">Comedy Night tour archive</h2>
                </div>
                <span className="text-sm font-bold text-white/55">New dates can be added from the backend.</span>
              </div>
              <div className="mt-6 grid gap-3">
                {comedyNightShowings.map((showing) => (
                  <div key={`${showing.date}-${showing.location}`} className="grid gap-3 rounded-lg border border-white/10 bg-black/24 p-4 sm:grid-cols-[150px_1fr_auto] sm:items-center">
                    <div>
                      <p className="font-black text-amber-300">{showing.date}</p>
                      <p className="mt-1 text-sm text-white/48">{showing.time}</p>
                    </div>
                    <div>
                      <p className="font-black">{showing.venue}</p>
                      <p className="mt-1 text-sm text-white/55">{showing.location}</p>
                    </div>
                    <span className="w-fit rounded-md border border-white/15 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/58">
                      {showing.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}
        <section className="mt-8 grid gap-4">
          {page.sections.map((section) => (
            <article
              key={section.heading.en}
              className="rounded-lg border border-white/10 bg-white/[0.045] p-6"
            >
              <h2 className="text-3xl font-black">
                {t(section.heading, language)}
              </h2>
              <p className="mt-4 leading-8 text-white/65">
                {t(section.body, language)}
              </p>
            </article>
          ))}
        </section>
        {page.slug === "comedy-night" ? (
          <section id="contact" className="mt-8 rounded-xl border border-amber-300/35 bg-amber-300 p-6 text-black sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-black/55">Contact us</p>
            <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="text-3xl font-black sm:text-4xl">Book the Comedy Night crew</h2>
                <p className="mt-3 max-w-2xl leading-7 text-black/68">
                  For theatre shows, festivals, diaspora events, and private comedy nights with Mario, Chady, and Aline.
                </p>
              </div>
              <a
                href={`mailto:${initialContent.contacts.email}?subject=${encodeURIComponent("Comedy Night crew booking inquiry")}`}
                className="inline-flex rounded-md bg-black px-5 py-3 text-sm font-black uppercase text-white transition hover:bg-white hover:text-black"
              >
                {initialContent.contacts.email}
              </a>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
