import { useEffect, useRef, useState } from "react";
import poorhouseImg from "@/assets/poorhouse.jpg";

type PolicyCard = {
  year: string;
  date: string;
  era: string;
  title: string;
  summary: string;
  gradient: string;
  visualKind: "image" | "chart" | "document";
  visualLabel: string;
  image?: string;
  layout?: "split" | "immersive";
  overlayColor?: string; // used by immersive layout — CSS color for the tint
};

const cards: PolicyCard[] = [
  {
    year: "1760",
    date: "c. 1760s",
    era: "Colonial Era",
    title: "Poorhouses & Almshouses",
    summary:
      "Before any federal safety net existed, local governments and churches managed poverty through poorhouses — institutions where the destitute, elderly, and disabled lived and worked in exchange for basic shelter and food.",
    gradient: "bg-gradient-archive",
    visualKind: "image",
    visualLabel: "County poorhouse ward, c. 1890s",
    image: poorhouseImg,
    layout: "immersive",
    overlayColor: "22, 26, 32",
  },
  {
    year: "1964",
    date: "July 2, 1964",
    era: "Civil Rights Era",
    title: "The Civil Rights Act",
    summary:
      "Sweeping federal legislation banning discrimination on the basis of race, color, religion, sex, or national origin — and arming the federal government with new enforcement powers.",
    gradient: "bg-gradient-civil",
    visualKind: "image",
    visualLabel: "March on Washington — August 1963",
  },
  {
    year: "1965",
    date: "July 30, 1965",
    era: "Great Society",
    title: "Medicare & Medicaid",
    summary:
      "Twin federal health programs created to cover Americans over 65 and low-income families — reshaping the relationship between the state, the citizen, and the doctor.",
    gradient: "bg-gradient-society",
    visualKind: "chart",
    visualLabel: "Coverage growth, 1966 – 2024",
  },
  {
    year: "1996",
    date: "August 22, 1996",
    era: "Reform Era",
    title: "Welfare Reform",
    summary:
      "PRWORA replaces AFDC with TANF, introducing time limits and work requirements — a fundamental shift in the philosophy of federal cash assistance.",
    gradient: "bg-gradient-reform",
    visualKind: "chart",
    visualLabel: "Caseload decline, 1996 – 2010",
  },
  {
    year: "2010",
    date: "March 23, 2010",
    era: "Modern Era",
    title: "The Affordable Care Act",
    summary:
      "The largest expansion of health coverage since 1965 — introducing the marketplace, the individual mandate, and Medicaid expansion across participating states.",
    gradient: "bg-gradient-modern",
    visualKind: "document",
    visualLabel: "Public Law 111–148",
  },
];

/* ─── Visual affordance placeholders ─────────────────────────────
   Each renders inside the gradient panel. Swap with real assets later. */

const VisualAffordance = ({ card }: { card: PolicyCard }) => {
  if (card.visualKind === "chart") {
    return (
      <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`fill-${card.year}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 0% 100%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(0 0% 100%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* gridlines */}
        {[0.25, 0.5, 0.75].map((y) => (
          <line
            key={y}
            x1="0" x2="320" y1={180 * y} y2={180 * y}
            stroke="hsl(0 0% 100%)" strokeOpacity="0.1" strokeWidth="1"
          />
        ))}
        {/* area + line */}
        <path
          d="M0,150 C40,140 70,120 100,100 S160,40 200,50 240,30 280,25 L320,20 L320,180 L0,180 Z"
          fill={`url(#fill-${card.year})`}
        />
        <path
          d="M0,150 C40,140 70,120 100,100 S160,40 200,50 240,30 280,25 L320,20"
          fill="none" stroke="hsl(0 0% 100%)" strokeOpacity="0.85" strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (card.visualKind === "document") {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="relative aspect-[3/4] w-[55%] rounded-sm bg-paper-elev/95 p-5 shadow-paper">
          <div className="space-y-2">
            <div className="h-2 w-2/3 rounded-sm bg-ink/80" />
            <div className="h-1 w-1/3 rounded-sm bg-ink/40" />
          </div>
          <div className="mt-5 space-y-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-[3px] rounded-sm bg-ink/25"
                style={{ width: `${65 + ((i * 13) % 30)}%` }}
              />
            ))}
          </div>
          <div className="absolute bottom-4 right-4 font-serif text-[9px] uppercase tracking-[0.2em] text-ink/50">
            Sec. 1
          </div>
        </div>
      </div>
    );
  }

  // image — full-bleed placeholder (swap with <img className="h-full w-full object-cover" /> later)
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="text-paper-elev/35">
        <rect x="3" y="4" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="9" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 17l5.5-5 4.5 4 3-2.5L21 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

const Timeline = () => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const wheelAccumRef = useRef(0);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => Math.min(i + 1, cards.length - 1));
      if (e.key === "ArrowLeft") setActive((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Wheel / trackpad horizontal navigation.
  // After each step we impose a hard MIN_LOCK_MS cooldown (>= card animation
  // duration) so inertia can never trigger a second step mid-animation.
  // After the cooldown we also require STEP_THRESHOLD px of fresh input.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const STEP_THRESHOLD = 20;
    const MIN_LOCK_MS = 820; // must exceed the 700ms card animation
    let lockUntil = 0;

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      const dx = e.shiftKey && absX < absY ? e.deltaY : e.deltaX;

      const horizIntent =
        e.shiftKey ||
        absX > 10 ||
        (absX > 4 && absX > absY * 0.45);

      if (!horizIntent) return;

      e.preventDefault();

      // Hard cooldown after a step — swallow all events until it expires.
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

  // Each card is 80vw wide with 2vw gap; track shifts so active card sits with 8vw left margin.
  const cardW = 80; // vw
  const gap = 8; // vw
  const sideMargin = 8; // vw — left peek/padding
  const translate = -(active * (cardW + gap)) + sideMargin;

  const activeCard = cards[active];
  const isImmersiveActive = activeCard.layout === "immersive";

  return (
    <section id="timeline" className="snap-section relative flex flex-col overflow-hidden">

      {/* ── Immersive section background — lives on the section, not the card ── */}
      {cards.map((c, i) =>
        c.layout === "immersive" && c.image ? (
          <div
            key={`bg-${c.year}`}
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
            style={{ opacity: active === i ? 1 : 0 }}
            aria-hidden
          >
            <img src={c.image} alt="" className="h-full w-full object-cover" draggable={false} />
            <div
              className="absolute inset-0"
              style={{
                background: c.overlayColor
                  ? `linear-gradient(to right, rgba(${c.overlayColor}, 0.95) 0%, rgba(${c.overlayColor}, 0.80) 30%, rgba(${c.overlayColor}, 0.55) 50%, rgba(${c.overlayColor}, 0.30) 65%, rgba(${c.overlayColor}, 0.12) 78%, rgba(${c.overlayColor}, 0.03) 91%, transparent 100%)`
                  : "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 70%)",
              }}
            />
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
          style={{
            transform: `translateX(${translate}vw)`,
            gap: `${gap}vw`,
          }}
        >
          {cards.map((c, i) => {
            const isActive = i === active;
            return (
              <article
                key={c.year}
                aria-hidden={!isActive}
                aria-label={`${c.date} — ${c.title}`}
                className={`relative flex flex-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  c.layout === "immersive" ? "overflow-visible" : "overflow-hidden rounded-sm"
                } ${isActive ? "scale-100 opacity-100" : "scale-[0.88] opacity-30"}`}
                style={{ width: `${cardW}vw`, height: "60vh" }}
              >
                {c.layout === "immersive" ? (
                  /* ── IMMERSIVE: text only — image/overlay lives on the section ── */
                  <div className="flex h-full flex-col justify-center px-10 sm:px-14 md:w-[52%]">
                    <div className="flex flex-col gap-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                        {c.date}
                      </div>
                      <h3 className="font-serif text-[clamp(36px,4.5vw,72px)] font-700 leading-[1.02] tracking-[-0.03em] text-white">
                        {c.title}
                      </h3>
                      <p className="font-serif text-[clamp(18px,1.6vw,26px)] leading-[1.6] text-white/75">
                        {c.summary}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ── SPLIT: text left, image right ── */
                  <>
                    <div className="flex w-full flex-col justify-center py-2 pr-10 sm:pr-14 md:w-[48%]">
                      <div className="flex flex-col gap-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                          {c.date}
                        </div>
                        <h3 className="font-serif text-[clamp(36px,4.5vw,72px)] font-700 leading-[1.02] tracking-[-0.03em] text-ink">
                          {c.title}
                        </h3>
                        <p className="font-serif text-[clamp(19px,1.7vw,26px)] leading-[1.6] text-ink-soft">
                          {c.summary}
                        </p>
                      </div>
                    </div>
                    <div className="relative hidden w-[52%] overflow-hidden rounded-sm bg-black md:block">
                      {c.image && (
                        <img
                          src={c.image}
                          alt={c.visualLabel}
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
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
        <button
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${
            isImmersiveActive
              ? "border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 disabled:hover:border-white/30 disabled:hover:bg-white/10"
              : "border-rule bg-paper text-ink hover:border-ink hover:bg-secondary disabled:hover:border-rule disabled:hover:bg-paper"
          }`}
        >
          ←
        </button>
        <button
          onClick={() => go(active + 1)}
          disabled={active === cards.length - 1}
          aria-label="Next"
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${
            isImmersiveActive
              ? "border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 disabled:hover:border-white/30 disabled:hover:bg-white/10"
              : "border-rule bg-paper text-ink hover:border-ink hover:bg-secondary disabled:hover:border-rule disabled:hover:bg-paper"
          }`}
        >
          →
        </button>
        <div className="ml-3 flex items-center gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to card ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active
                  ? `w-8 ${isImmersiveActive ? "bg-white" : "bg-accent"}`
                  : `w-1.5 ${isImmersiveActive ? "bg-white/30 hover:bg-white/60" : "bg-rule hover:bg-ink/40"}`
              }`}
            />
          ))}
        </div>
        <span className={`ml-auto text-[11px] uppercase tracking-[0.22em] ${isImmersiveActive ? "text-white/90" : "text-ink-soft"}`}>
          {String(active + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
          <span className={`mx-3 ${isImmersiveActive ? "text-white/50" : "text-rule"}`}>·</span>
          <span className="hidden sm:inline">{cards[active].era}</span>
        </span>
      </div>
    </section>
  );
};

export default Timeline;
