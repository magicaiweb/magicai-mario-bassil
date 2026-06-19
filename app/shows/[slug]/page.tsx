import { notFound } from "next/navigation";
import { initialContent } from "../../content";
import { EventDetail } from "./EventDetail";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return initialContent.events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const event = initialContent.events.find((item) => item.slug === slug);

  if (!event) {
    return {};
  }

  return {
    title: `${event.label.en} | Mario Bassil Shows`,
    description: event.description.en,
  };
}

export default async function ShowDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const event = initialContent.events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}
