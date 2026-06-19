import Link from "next/link";
import { notFound } from "next/navigation";
import { initialContent, t, type Language } from "../content";

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
            CMS Page
          </p>
          <h1 className="mt-4 text-5xl font-black sm:text-7xl">
            {t(page.title, language)}
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/68">
            {t(page.summary, language)}
          </p>
        </section>
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
      </div>
    </main>
  );
}
