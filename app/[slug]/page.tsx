import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initialContent, t, type Language } from "../content";
import { ShowreelPlayer } from "../ShowreelPlayer";

type Params = Promise<{ slug: string }>;

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

  const isComedyNight = page.slug === "comedy-night";
  const posterImage = page.posterImage ?? "/websites/mario-bassil/images/mario/comedy-night-crew-poster.png";
  const posterAlt = page.posterAlt ?? {
    en: "Comedy Night poster with Mario Bassil, Chady Maroun, and Aline Ahmar",
    ar: "بوستر كوميدي نايت مع ماريو باسيل وشادي مارون وألين أحمر",
  };
  const featureLabel = page.featureLabel ?? { en: "Comedy Night crew", ar: "فريق كوميدي نايت" };
  const featureTitle = page.featureTitle ?? {
    en: "Mario Bassil, Chady Maroun, and Aline Ahmar",
    ar: "ماريو باسيل، شادي مارون، وألين أحمر",
  };
  const featureBody = page.featureBody ?? {
    en: "A live Lebanese comedy lineup built for theatre nights, diaspora events, festivals, and private bookings.",
    ar: "فريق كوميدي لبناني مباشر للعروض المسرحية، فعاليات الاغتراب، المهرجانات، والحفلات الخاصة.",
  };
  const comedyNightCrew = page.crew ?? [];
  const comedyNightShowings = page.showings ?? [];
  const comedyNightContact = page.contact ?? {
    eyebrow: { en: "Contact us", ar: "تواصلوا معنا" },
    title: { en: "Book the Comedy Night crew", ar: "احجزوا فريق كوميدي نايت" },
    body: {
      en: "For theatre shows, festivals, diaspora events, and private comedy nights with Mario, Chady, and Aline.",
      ar: "للعروض المسرحية، المهرجانات، فعاليات الاغتراب، والليالي الكوميدية الخاصة مع ماريو وشادي وألين.",
    },
    email: initialContent.contacts.email,
    ctaLabel: { en: initialContent.contacts.email, ar: initialContent.contacts.email },
  };

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
        {isComedyNight ? (
          <>
            <section className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#180f0f]">
              <div className="relative aspect-[1175/550] min-h-[220px]">
                <Image
                  src={posterImage}
                  alt={t(posterAlt, language)}
                  fill
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="border-t border-white/10 p-6 sm:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-red-400">{t(featureLabel, language)}</p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">{t(featureTitle, language)}</h2>
                <p className="mt-4 max-w-3xl leading-8 text-white/66">
                  {t(featureBody, language)}
                </p>
              </div>
            </section>

            {comedyNightCrew.length > 0 ? (
              <section className="mt-8 grid gap-4 md:grid-cols-3">
              {comedyNightCrew.map((member) => (
                <article key={member.name} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]">
                  {member.image ? (
                    <div className="relative aspect-[4/5] bg-black">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: member.imagePosition ?? "center top" }}
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">{t(member.role, language)}</p>
                  <h3 className="mt-3 text-2xl font-black">{member.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/62">{t(member.bio, language)}</p>
                  </div>
                </article>
              ))}
              </section>
            ) : null}

            {comedyNightShowings.length > 0 ? (
              <section className="mt-8 rounded-xl border border-white/10 bg-white/[0.045] p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">Showings dates</p>
                  <h2 className="mt-3 text-3xl font-black sm:text-4xl">Comedy Night tour archive</h2>
                </div>
                <span className="text-sm font-bold text-white/55">More dates will be announced soon.</span>
              </div>
              <div className="mt-6 grid gap-3">
                {comedyNightShowings.map((showing) => (
                  <div key={`${showing.date}-${t(showing.city, language)}`} className="grid gap-3 rounded-lg border border-white/10 bg-black/24 p-4 sm:grid-cols-[150px_1fr_auto] sm:items-center">
                    <div>
                      <p className="font-black text-amber-300">{showing.date}</p>
                      <p className="mt-1 text-sm text-white/48">{showing.time}</p>
                    </div>
                    <div>
                      <p className="font-black">{t(showing.venue, language)}</p>
                      <p className="mt-1 text-sm text-white/55">{t(showing.city, language)}</p>
                    </div>
                    {showing.ticketUrl ? (
                      <a
                        href={showing.ticketUrl}
                        className="w-fit rounded-md bg-amber-300 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-white"
                      >
                        {showing.ticketLabel ? t(showing.ticketLabel, language) : t(showing.status, language)}
                      </a>
                    ) : (
                      <span className="w-fit rounded-md border border-white/15 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/58">
                        {t(showing.status, language)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              </section>
            ) : null}
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
        {isComedyNight ? (
          <section id="contact" className="mt-8 rounded-xl border border-amber-300/35 bg-amber-300 p-6 text-black sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-black/55">{t(comedyNightContact.eyebrow, language)}</p>
            <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="text-3xl font-black sm:text-4xl">{t(comedyNightContact.title, language)}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-black/68">
                  {t(comedyNightContact.body, language)}
                </p>
              </div>
              <a
                href={`mailto:${comedyNightContact.email}?subject=${encodeURIComponent("Comedy Night crew booking inquiry")}`}
                className="inline-flex rounded-md bg-black px-5 py-3 text-sm font-black uppercase text-white transition hover:bg-white hover:text-black"
              >
                {t(comedyNightContact.ctaLabel, language)}
              </a>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
