import { useEffect, useRef } from "react";
import ggNuclearWar from "@/assets/gg-nuclear-war.jpg";
import poorhouseImg from "@/assets/poorhouse.jpg";

type Tile = {
  style: React.CSSProperties;
  fanX: number;
  fanY: number;
  rot: number;
  depth: number; // parallax depth: higher = more movement
  gradient: string;
  image?: string;
  alt?: string;
};

const tiles: Tile[] = [
  {
    style: { left: "-4%", top: "10%", width: "max(220px, 21vw)", height: "max(158px, 15vw)" },
    fanX: 0, fanY: -180, rot: 0, depth: 0.6,
    gradient: "bg-gradient-archive",
    image: poorhouseImg,
    alt: "County poorhouse ward, c. 1890s",
  },
  {
    style: { left: "-8%", top: "42%", width: "max(195px, 18vw)", height: "max(255px, 24vw)" },
    fanX: 0, fanY: -240, rot: 0, depth: 0.3,
    gradient: "bg-gradient-civil",
  },
  {
    style: { left: "3%", top: "76%", width: "max(175px, 16vw)", height: "max(130px, 12vw)" },
    fanX: 0, fanY: 160, rot: 0, depth: 0.8,
    gradient: "bg-gradient-modern",
  },
  {
    style: { right: "-4%", top: "8%", width: "max(240px, 23vw)", height: "max(175px, 17vw)" },
    fanX: 0, fanY: -200, rot: 0, depth: 0.5,
    gradient: "bg-gradient-society",
    image: ggNuclearWar,
    alt: "Vintage sitcom still — 'I'm concerned about nuclear war.'",
  },
  {
    style: { right: "-8%", top: "44%", width: "max(200px, 19vw)", height: "max(158px, 15vw)" },
    fanX: 0, fanY: -140, rot: 0, depth: 0.9,
    gradient: "bg-gradient-reform",
  },
  {
    style: { right: "3%", top: "76%", width: "max(195px, 18vw)", height: "max(140px, 13vw)" },
    fanX: 0, fanY: 120, rot: 0, depth: 0.4,
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

    const scroller = (hero.closest(".snap-scroller") as HTMLElement | null) ?? null;

    // Mouse parallax state — lerped each frame
    const mouse = { tx: 0, ty: 0, cx: 0, cy: 0 };
    const LERP = 0.06;
    const MAX_X = 38;
    const MAX_Y = 24;

    // Scroll progress — lerped so tile exit trails the snap scroll
    const scroll = { target: 0, current: 0 };
    const SCROLL_LERP = 0.04;

    let raf = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);

      mouse.cx += (mouse.tx - mouse.cx) * LERP;
      mouse.cy += (mouse.ty - mouse.cy) * LERP;

      const heroH = hero.offsetHeight || 1;
      const scrolled = scroller ? scroller.scrollTop : window.scrollY;
      const raw = Math.min(Math.max(scrolled / heroH, 0), 1);
      scroll.target = smoothstep(raw);
      scroll.current += (scroll.target - scroll.current) * SCROLL_LERP;
      const p = scroll.current;

      tileRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = tiles[i];
        const tx = mouse.cx * t.depth * MAX_X;
        const ty = t.fanY * p + mouse.cy * t.depth * MAX_Y;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        el.style.opacity = String(1 - p * 1.4);
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
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
