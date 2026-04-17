import { useEffect, useRef } from "react";
import ggNuclearWar from "@/assets/gg-nuclear-war.jpg";

type Tile = {
  style: React.CSSProperties;
  fanX: number;
  fanY: number;
  rot: number;
  gradient: string;
  image?: string;
  alt?: string;
};

const tiles: Tile[] = [
  // LEFT — 3 tiles, anchored to the page edge
  // Left top — landscape
  {
    style: { left: "-4%", top: "10%", width: "298px", height: "220px" },
    fanX: -560, fanY: -80, rot: -8,
    gradient: "bg-gradient-archive",
  },
  // Left middle — portrait, anchor
  {
    style: { left: "-8%", top: "42%", width: "254px", height: "340px" },
    fanX: -680, fanY: 60, rot: -5,
    gradient: "bg-gradient-civil",
  },
  // Left bottom — landscape, tucked to corner
  {
    style: { left: "3%", top: "76%", width: "226px", height: "168px" },
    fanX: -380, fanY: 160, rot: -14,
    gradient: "bg-gradient-modern",
  },

  // RIGHT — 3 tiles
  // Right top — landscape
  {
    style: { right: "-4%", top: "8%", width: "330px", height: "240px" },
    fanX: 600, fanY: -60, rot: 7,
    gradient: "bg-gradient-society",
    image: ggNuclearWar,
    alt: "Vintage sitcom still — 'I'm concerned about nuclear war.'",
  },
  // Right middle — landscape
  {
    style: { right: "-8%", top: "44%", width: "278px", height: "212px" },
    fanX: 700, fanY: 80, rot: 4,
    gradient: "bg-gradient-reform",
  },
  // Right bottom — landscape, near corner
  {
    style: { right: "3%", top: "76%", width: "254px", height: "188px" },
    fanX: 420, fanY: 130, rot: 11,
    gradient: "bg-gradient-archive",
  },
];

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Find the actual scroll container (the .snap-scroller <main>, falling
    // back to window when this hero is mounted at document level).
    const scroller =
      (hero.closest(".snap-scroller") as HTMLElement | null) ?? null;

    let raf = 0;
    const update = () => {
      raf = 0;
      const heroH = hero.offsetHeight || 1;
      const scrolled = scroller ? scroller.scrollTop : window.scrollY;
      const raw = Math.min(Math.max(scrolled / heroH, 0), 1);
      const p = smoothstep(raw);

      tileRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = tiles[i];
        const tx = t.fanX * p;
        const ty = t.fanY * p;
        const r = t.rot + t.rot * 0.35 * p;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${r}deg)`;
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    const target: EventTarget = scroller ?? window;
    target.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener("resize", onScroll);
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="snap-section relative flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Collage layer */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden>
        {tiles.map((t, i) => (
          <div
            key={i}
            ref={(el) => (tileRefs.current[i] = el)}
            className="collage-tile absolute overflow-hidden"
            style={{
              ...t.style,
              transition: "transform 120ms linear",
              willChange: "transform",
              boxShadow:
                "0 2px 8px hsl(30 10% 10% / 0.10), 0 12px 40px hsl(30 10% 10% / 0.14), 0 32px 80px hsl(30 10% 10% / 0.10)",
            }}
          >
            <div className="relative h-full w-full bg-black">
              {t.image && (
                <img
                  src={t.image}
                  alt={t.alt ?? ""}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div className="snap-reveal relative z-10 flex max-w-5xl flex-col items-center">

        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">
          A Living History
        </p>

        <h1 className="font-serif text-[clamp(48px,9vw,120px)] font-700 leading-[0.95] tracking-[-0.02em] text-balance text-ink">
          Shaping the
          <br />
          <em className="font-medium italic">Social Contract</em>
        </h1>

        <div className="mt-10 h-px w-16 bg-ink/40" aria-hidden />

        <p className="mt-10 max-w-xl text-pretty font-serif text-[19px] leading-[1.7] text-ink-soft sm:text-[21px]">
          An exploration of the landmark policies that defined how America
          supports its citizens — from the New Deal to the present day.
        </p>

        <a
          href="#timeline"
          className="group mt-12 flex flex-col items-center gap-3 text-ink-soft transition-colors hover:text-accent"
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.28em]">
            Explore the timeline
          </span>
          <svg
            width="18"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
            aria-hidden
            className="animate-scroll-bounce"
          >
            <path
              d="M9 2v17M2 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
