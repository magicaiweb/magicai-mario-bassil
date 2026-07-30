"use client";

import { useEffect, useRef, useState } from "react";
import { initialContent, t, type Language, type MediaItem } from "./content";

type ShowreelPlayerProps = {
  language: Language;
  showreel: MediaItem;
};

export function ShowreelPlayer({ language, showreel }: ShowreelPlayerProps) {
  const [expanded, setExpanded] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const isArabic = language === "ar";
  const poster = showreel.thumbnailImage || initialContent.hero.image;

  useEffect(() => {
    if (!expanded) return;

    const video = modalVideoRef.current;
    video?.play().catch(() => {
      // Some mobile browsers require a second user tap even after opening the modal.
    });
  }, [expanded]);

  return (
    <>
      <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#070707] shadow-2xl">
        <button
          id="showreel-player-button"
          type="button"
          onClick={() => setExpanded(true)}
          className="group relative flex aspect-video w-full items-center justify-center overflow-hidden bg-[#070707] text-white"
          aria-label={isArabic ? "تشغيل شوريل التمثيل بملء الشاشة" : "Play acting showreel fullscreen"}
        >
          <span
            className="absolute inset-0 scale-110 bg-cover bg-center opacity-38 blur-md transition duration-500 group-hover:scale-[1.14]"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.72), rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.72)), url(${poster})`,
            }}
          />
          <span
            className="absolute inset-0 bg-contain bg-center bg-no-repeat transition duration-500 group-hover:scale-[1.02]"
            style={{ backgroundImage: `url(${poster})` }}
          />
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,214,94,0.2),transparent_46%)]" />
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-amber-300 text-black shadow-2xl shadow-black/45 transition duration-300 group-hover:scale-105 group-hover:bg-white">
            <PlayIcon />
          </span>
        </button>
      </div>

      {expanded ? (
        <div className="fixed inset-0 z-50 bg-black text-white" role="dialog" aria-modal="true" aria-label={t(showreel.title, language)}>
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="absolute right-4 top-4 z-10 rounded-md border border-white/20 bg-black/70 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur transition hover:bg-white hover:text-black"
          >
            {isArabic ? "إغلاق" : "Close"}
          </button>
          <video
            ref={modalVideoRef}
            className="h-full w-full bg-black object-contain"
            controls
            autoPlay
            playsInline
            preload="auto"
            poster={poster}
            aria-label={t(showreel.title, language)}
          >
            <source src={showreel.url} type="video/mp4" />
            <a href={showreel.url}>{isArabic ? "فتح الشوريل" : "Open showreel"}</a>
          </video>
        </div>
      ) : null}
    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-10 w-10 fill-current">
      <path d="M8 5.2v13.6L18.8 12 8 5.2Z" />
    </svg>
  );
}
