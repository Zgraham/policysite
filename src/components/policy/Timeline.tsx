import { useEffect, useRef, useState } from "react";
import { cards as cardData, type PolicyCard } from "@/data/timeline";
import poorhouseImg from "@/assets/poorhouse.jpg";
import ssaActImg from "@/assets/Timeline_02_SSA-act.jpg";
import ssaNursingImg from "@/assets/Timeline_03_SSA-nursing.jpg";
import lbjMedicareImg from "@/assets/Timeline_04_medicare-medicaid.jpg";
import oaaImg from "@/assets/Timeline_05.jpg";
import nursingLicenseImg from "@/assets/Timeline_06.jpg";
import federalStandardsImg from "@/assets/Timeline_07.jpg";
import oaaAmendmentsImg from "@/assets/Timeline_08.jpg";
import hcbsWaiverImg from "@/assets/Timeline_09.jpg";
import obra87Img from "@/assets/Timeline_10.jpg";
import oregonDwdImg from "@/assets/Timeline_11.jpg";
import caEolImg from "@/assets/Timeline_12.jpg";

// Images are kept here so the data file stays plain text — no asset imports needed there.
const cardImages: (string | undefined)[] = [
  poorhouseImg,       // 1 — Almshouses
  ssaActImg,          // 2 — Social Security Act
  ssaNursingImg,      // 3 — Direct Payments to Nursing Homes
  lbjMedicareImg,     // 4 — Medicare & Medicaid
  oaaImg,             // 5 — Older Americans Act
  nursingLicenseImg,  // 6 — Nursing Home Licensing
  federalStandardsImg,// 7 — Federal Standards
  oaaAmendmentsImg,   // 8 — OAA Amendments
  hcbsWaiverImg,      // 9 — HCBS Waiver
  obra87Img,          // 10 — OBRA-87
  oregonDwdImg,       // 11 — Oregon DWD
  caEolImg,           // 12 — California EOLA
];

const cards: PolicyCard[] = cardData.map((c, i) => ({ ...c, image: cardImages[i] }));

/* ─── Visual affordance ───────────────────────────────────────────── */

const VisualAffordance = ({ card, idx }: { card: PolicyCard; idx: number }) => {
  if (card.visualKind === "chart") {
    return (
      <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`fill-${idx}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 0% 100%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(0 0% 100%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((y) => (
          <line key={y} x1="0" x2="320" y1={180 * y} y2={180 * y}
            stroke="hsl(0 0% 100%)" strokeOpacity="0.1" strokeWidth="1" />
        ))}
        <path d="M0,150 C40,140 70,120 100,100 S160,40 200,50 240,30 280,25 L320,20 L320,180 L0,180 Z"
          fill={`url(#fill-${idx})`} />
        <path d="M0,150 C40,140 70,120 100,100 S160,40 200,50 240,30 280,25 L320,20"
          fill="none" stroke="hsl(0 0% 100%)" strokeOpacity="0.85" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (card.visualKind === "document") {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="relative aspect-[3/4] w-[55%] rounded-sm bg-white/10 p-5 shadow-paper backdrop-blur-sm">
          <div className="space-y-2">
            <div className="h-2 w-2/3 rounded-sm bg-white/60" />
            <div className="h-1 w-1/3 rounded-sm bg-white/30" />
          </div>
          <div className="mt-5 space-y-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-[3px] rounded-sm bg-white/20"
                style={{ width: `${65 + ((i * 13) % 30)}%` }} />
            ))}
          </div>
          <div className="absolute bottom-4 right-4 font-serif text-[9px] uppercase tracking-[0.2em] text-white/40">
            Sec. 1
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const Timeline = () => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const wheelAccumRef = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => Math.min(i + 1, cards.length - 1));
      if (e.key === "ArrowLeft") setActive((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const STEP_THRESHOLD = 20;
    const MIN_LOCK_MS = 820;
    let lockUntil = 0;

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      const dx = e.shiftKey && absX < absY ? e.deltaY : e.deltaX;

      const horizIntent = e.shiftKey || absX > 10 || (absX > 4 && absX > absY * 0.45);
      if (!horizIntent) return;

      e.preventDefault();
      if (Date.now() < lockUntil) return;

      wheelAccumRef.current += dx;
      if (Math.abs(wheelAccumRef.current) < STEP_THRESHOLD) return;

      const dir = wheelAccumRef.current > 0 ? 1 : -1;
      wheelAccumRef.current = 0;
      lockUntil = Date.now() + MIN_LOCK_MS;
      setActive((i) => Math.max(0, Math.min(i + dir, cards.length - 1)));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const go = (i: number) => setActive(Math.max(0, Math.min(i, cards.length - 1)));

  const cardW = 80;
  const gap = 8;
  const sideMargin = 8;
  const translate = -(active * (cardW + gap)) + sideMargin;

  const activeCard = cards[active];
  const isImmersiveActive = activeCard.layout === "immersive";

  return (
    <section id="timeline" className="snap-section relative flex flex-col overflow-hidden">

      {/* Immersive backgrounds — gradient fallback when image not yet set */}
      {cards.map((c, i) =>
        c.layout === "immersive" ? (
          <div
            key={`bg-${i}`}
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
            style={{ opacity: active === i ? 1 : 0 }}
            aria-hidden
          >
            {c.image ? (
              <>
                <img src={c.image} alt="" className="h-full w-full object-cover" draggable={false} />
                <div
                  className="absolute inset-0"
                  style={{
                    background: c.overlayColor
                      ? `linear-gradient(to right, rgba(${c.overlayColor}, 0.95) 0%, rgba(${c.overlayColor}, 0.80) 30%, rgba(${c.overlayColor}, 0.55) 50%, rgba(${c.overlayColor}, 0.30) 65%, rgba(${c.overlayColor}, 0.12) 78%, rgba(${c.overlayColor}, 0.03) 91%, transparent 100%)`
                      : "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 70%)",
                  }}
                />
              </>
            ) : (
              <div className={`absolute inset-0 ${c.gradient}`} />
            )}
          </div>
        ) : null
      )}

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="relative z-10 w-full flex-1 flex items-center touch-pan-y"
        role="region"
        aria-roledescription="carousel"
        aria-label="Landmark policies"
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(${translate}vw)`, gap: `${gap}vw` }}
        >
          {cards.map((c, i) => {
            const isActive = i === active;
            return (
              <article
                key={i}
                aria-hidden={!isActive}
                aria-label={`${c.date} — ${c.title}`}
                className={`relative flex flex-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  c.layout === "immersive" ? "overflow-visible" : "overflow-hidden rounded-sm"
                } ${isActive ? "scale-100 opacity-100" : "scale-[0.88] opacity-30"}`}
                style={{ width: `${cardW}vw`, height: "60vh" }}
              >
                {c.layout === "immersive" ? (
                  <div className="flex h-full flex-col justify-center px-10 sm:px-14 md:w-[52%]">
                    <div className="flex flex-col gap-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                        {c.date}
                      </div>
                      <h3 className="font-serif text-[clamp(36px,4.5vw,72px)] font-700 leading-[1.02] tracking-[-0.03em] text-white">
                        {c.title}
                      </h3>
                      <p className="font-serif text-[clamp(15px,1.3vw,20px)] leading-[1.65] text-white/75">
                        {c.summary}
                      </p>
                      {c.source && (
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                          Source: {c.source}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex h-full w-full flex-col justify-center py-2 pr-10 sm:pr-14 md:w-[48%]">
                      <div className="flex flex-col gap-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                          {c.date}
                        </div>
                        <h3 className="font-serif text-[clamp(28px,3.5vw,56px)] font-700 leading-[1.05] tracking-[-0.03em] text-ink">
                          {c.title}
                        </h3>
                        <p className="font-serif text-[clamp(15px,1.35vw,21px)] leading-[1.65] text-ink-soft">
                          {c.summary}
                        </p>
                        {c.source && (
                          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/30">
                            Source: {c.source}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={`relative hidden h-full w-[52%] overflow-hidden rounded-sm md:block ${c.gradient}`}>
                      {c.image ? (
                        <img src={c.image} alt={c.visualLabel} className="h-full w-full object-cover" draggable={false} />
                      ) : (
                        <VisualAffordance card={c} idx={i} />
                      )}
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 z-10 mx-auto flex w-full max-w-7xl items-center gap-3 px-6 sm:px-14" style={{ bottom: 32 }}>
        {/* Prev */}
        <button
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
          className={`flex h-11 w-11 flex-none items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${
            isImmersiveActive
              ? "border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 disabled:hover:border-white/30 disabled:hover:bg-white/10"
              : "border-rule bg-paper text-ink hover:border-ink hover:bg-secondary disabled:hover:border-rule disabled:hover:bg-paper"
          }`}
        >
          ←
        </button>
        {/* Next */}
        <button
          onClick={() => go(active + 1)}
          disabled={active === cards.length - 1}
          aria-label="Next"
          className={`flex h-11 w-11 flex-none items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${
            isImmersiveActive
              ? "border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 disabled:hover:border-white/30 disabled:hover:bg-white/10"
              : "border-rule bg-paper text-ink hover:border-ink hover:bg-secondary disabled:hover:border-rule disabled:hover:bg-paper"
          }`}
        >
          →
        </button>

        {/* Timeline strip */}
        <div className="relative ml-2 flex flex-1 items-center">
          {/* Track */}
          <div className={`absolute inset-x-0 h-px ${isImmersiveActive ? "bg-white/20" : "bg-rule"}`} />
          {/* Progress fill */}
          <div
            className={`absolute left-0 h-px transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isImmersiveActive ? "bg-white/55" : "bg-ink/20"}`}
            style={{ width: `${(active / (cards.length - 1)) * 100}%` }}
          />
          {/* Dots */}
          <div className="relative flex w-full justify-between">
            {cards.map((c, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`${c.year} — ${c.title}`}
                title={`${c.year} · ${c.title}`}
                className="group relative flex h-6 w-6 items-center justify-center"
              >
                <span className={`block rounded-full transition-all duration-100 ease-out ${
                  i === active
                    ? `h-3 w-3 ${isImmersiveActive ? "bg-white" : "bg-accent"}`
                    : i < active
                    ? `h-1.5 w-1.5 ${isImmersiveActive ? "bg-white/60" : "bg-ink/40"} group-hover:scale-[2.5] group-hover:bg-white`
                    : `h-1.5 w-1.5 ${isImmersiveActive ? "bg-white/30" : "bg-rule"} group-hover:scale-[2.5] group-hover:bg-white`
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
