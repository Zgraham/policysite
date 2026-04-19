import { useEffect, useRef, useState } from "react";
import poorhouseImg from "@/assets/poorhouse.jpg";
import lbjMedicareImg from "@/assets/Hero4.jpeg";
import ssaActImg from "@/assets/Timeline_02_SSA-act.jpg";

type PolicyCard = {
  year: string;
  date: string;
  era: string;
  title: string;
  summary: string;
  source?: string;
  gradient: string;
  visualKind: "image" | "chart" | "document";
  visualLabel: string;
  image?: string;
  layout?: "split" | "immersive";
  overlayColor?: string;
};

const cards: PolicyCard[] = [
  {
    year: "1760s",
    date: "c. 1760s",
    era: "Colonial Era",
    title: "Almshouses & Poorhouses",
    summary:
      "Long before the government stepped in, the only option for poor older adults with no family to lean on was the almshouse or poorhouse. These were county-run institutions that housed everyone together: the elderly, the sick, the disabled, and orphaned children. The conditions were bad enough that by the late 1800s, the poorhouse had become something people feared more than almost anything else. Dying there was seen as a failure, both for the individual and for the community.",
    gradient: "bg-gradient-archive",
    visualKind: "image",
    visualLabel: "County poorhouse ward, c. 1890s",
    image: poorhouseImg,
    layout: "immersive",
    overlayColor: "18, 18, 20",
  },
  {
    year: "1935",
    date: "August 14, 1935",
    era: "New Deal",
    title: "Social Security Act",
    summary:
      "Through the Old Age Assistance program, the SSA made federal funding available to states so they could provide direct financial support to low-income seniors. One of the most significant parts of the law was that it prohibited payments to anyone living in a public institution — at the time, that meant the poorhouses. That restriction effectively created the private nursing home industry. Families started moving their elderly parents and grandparents into private facilities so they could still qualify for benefits.",
    source: "Social Security Administration",
    gradient: "bg-gradient-archive",
    visualKind: "document",
    visualLabel: "Public Law 74-271",
    image: ssaActImg,
    layout: "immersive",
    overlayColor: "18, 18, 20",
  },
  {
    year: "1950",
    date: "August 28, 1950",
    era: "Postwar Era",
    title: "Direct Payments to Nursing Homes",
    summary:
      "An amendment to the Social Security Act changed how medical care payments were handled, requiring that money go directly to nursing homes rather than to the individuals receiving care. It also made state licensing of nursing homes a condition for participating in the Old Age Assistance program. This pushed the US further toward institutional elder care, essentially making the nursing home the default long-term care setting years before Medicare even existed.",
    source: "KFF Long-Term Care Timeline",
    gradient: "bg-gradient-reform",
    visualKind: "chart",
    visualLabel: "Nursing home growth, 1940 – 1965",
    layout: "immersive",
    overlayColor: "30, 16, 10",
  },
  {
    year: "1965",
    date: "July 30, 1965",
    era: "Great Society",
    title: "Medicare & Medicaid",
    summary:
      "Medicare covered hospital and medical insurance for adults over 65, and Medicaid extended coverage to people with low incomes. This was the first time that getting older or being poor was no longer a barrier to healthcare. At the time, Medicare was meant for acute care and did not cover long-term care needs. Medicaid required coverage of institutional LTC, which unintentionally reinforced the nursing home as the dominant option for aging adults who needed ongoing support.",
    source: "CMS History; KFF Long-Term Care Timeline",
    gradient: "bg-gradient-society",
    visualKind: "image",
    visualLabel: "President Johnson signing Medicare, 1965",
    image: lbjMedicareImg,
    layout: "immersive",
    overlayColor: "18, 26, 22",
  },
  {
    year: "1965",
    date: "July 14, 1965",
    era: "Great Society",
    title: "Older Americans Act",
    summary:
      "The OAA set up the Administration on Aging and created a national framework for funding services that help older adults stay healthy and live independently — including meals, transportation, senior centers, benefits enrollment, caregiver support, job training, and health promotion.",
    source: "NCOA",
    gradient: "bg-gradient-civil",
    visualKind: "document",
    visualLabel: "Public Law 89-73",
    layout: "immersive",
    overlayColor: "14, 20, 36",
  },
  {
    year: "1967",
    date: "1967",
    era: "Reform Era",
    title: "Nursing Home Licensing",
    summary:
      "By 1967, there was enough public anger about fraud and abuse inside nursing homes that Congress responded with amendments to the Social Security Act requiring states to license nursing home administrators. It was a significant step toward holding an unregulated industry accountable for how it was treating the people in its care.",
    source: "KFF Long-Term Care Timeline",
    gradient: "bg-gradient-reform",
    visualKind: "document",
    visualLabel: "Social Security Amendments of 1967",
    layout: "immersive",
    overlayColor: "30, 16, 10",
  },
  {
    year: "1974",
    date: "1974",
    era: "Reform Era",
    title: "Federal Standards for Nursing Facilities",
    summary:
      "Federal regulations for skilled nursing facilities went into effect, setting standards around staffing levels, staff qualifications, fire safety, and delivery of services. Any facility that wanted to participate in Medicare and Medicaid now had to meet these requirements. It was the first time there was a national baseline for what a nursing home was actually supposed to provide.",
    source: "KFF Long-Term Care Timeline",
    gradient: "bg-gradient-archive",
    visualKind: "document",
    visualLabel: "Federal Register, 1974",
    layout: "immersive",
    overlayColor: "22, 18, 14",
  },
  {
    year: "1978",
    date: "1978",
    era: "Reform Era",
    title: "OAA Amendments",
    summary:
      "The 1978 Comprehensive OAA amendments required every state to establish a nursing home ombudsman program, creating advocacy for residents who could not speak up for themselves. States were also required to start prioritizing community-based alternatives to nursing home placement.",
    source: "KFF Long-Term Care Timeline",
    gradient: "bg-gradient-civil",
    visualKind: "document",
    visualLabel: "Comprehensive Older Americans Act Amendments of 1978",
    layout: "immersive",
    overlayColor: "14, 20, 36",
  },
  {
    year: "1981",
    date: "1981",
    era: "Reform Era",
    title: "HCBS Waiver Program",
    summary:
      "Section 1915(c) of the Social Security Act created the HCBS Waiver Program, which gave states the flexibility to use Medicaid funding for home and community-based services like personal care, respite care, adult day programs, and home modification. People with long-term care needs no longer had to be placed in a nursing home to get help.",
    source: "KFF Long-Term Care Timeline; CMS History",
    gradient: "bg-gradient-modern",
    visualKind: "chart",
    visualLabel: "HCBS participation, 1982 – 2000",
    layout: "immersive",
    overlayColor: "14, 20, 28",
  },
  {
    year: "1987",
    date: "1987",
    era: "Reform Era",
    title: "OBRA-87: Nursing Home Reform Act",
    summary:
      "OBRA-87 was a direct response to the ongoing problems with abuse, neglect, and poor quality of care in nursing homes. It put quality standards in place for all Medicare and Medicaid-certified facilities. That same year, the reauthorization of the OAA added six new funding areas, including in-home services for frail seniors, long-term care ombudsman programs, and a federal focus on preventing elder abuse, neglect, and exploitation.",
    source: "KFF Long-Term Care Timeline",
    gradient: "bg-gradient-reform",
    visualKind: "document",
    visualLabel: "Omnibus Budget Reconciliation Act of 1987",
    layout: "immersive",
    overlayColor: "30, 16, 10",
  },
  {
    year: "1997",
    date: "1994 / 1997",
    era: "End of Life",
    title: "Oregon Death with Dignity Act",
    summary:
      "Oregon was the first state in the US to legalize physician-assisted dying. That same year, the U.S. Supreme Court decided Washington v. Glucksberg, confirming that while there was no constitutional right to assisted dying, legalizing it was not unconstitutional either. Oregon's law became the template for every Death with Dignity law that followed. To qualify, a person needs a terminal diagnosis with a prognosis of six months or less, must make two separate oral requests, submit a written request, and have two physicians confirm their eligibility.",
    source: "AMA Journal of Ethics (2003)",
    gradient: "bg-gradient-modern",
    visualKind: "document",
    visualLabel: "Oregon Revised Statutes 127.800",
    layout: "immersive",
    overlayColor: "14, 20, 28",
  },
  {
    year: "2015",
    date: "October 5, 2015",
    era: "End of Life",
    title: "California End of Life Option Act",
    summary:
      "California passed the End of Life Option Act to regulate Medical Aid in Dying (MAID). Under this law, a terminally ill California resident who meets all legal requirements can request medication that will end their life. The law first took effect June 9, 2016, and an updated version went into effect January 1, 2022. To be eligible, a person must be at least 18, a California resident, have a terminal illness with a prognosis of six months or less, be capable of making their own medical decisions, and be able to self-administer the medication.",
    source: "UC Davis Health; Stanford Health Care",
    gradient: "bg-gradient-society",
    visualKind: "document",
    visualLabel: "California Health & Safety Code § 443",
    layout: "immersive",
    overlayColor: "14, 26, 18",
  },
];

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
