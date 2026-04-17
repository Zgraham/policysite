import { useEffect, useRef, useState } from "react";

const stats = [
  { countTo: 90, suffix: "+", prefix: "",  lbl: "Years of federal social policy shaping American life" },
  { countTo: 65, suffix: "M", prefix: "",  lbl: "Placeholder — Americans currently enrolled or protected" },
  { countTo: null,             prefix: "$", suffix: "X.XT", lbl: "Placeholder — Annual federal spending on social programs" },
];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const DURATION = 1800;

function useCountUp(target: number | null, triggered: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!triggered || target === null) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setValue(Math.round(easeOut(p) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [triggered, target]);
  return value;
}

const StatItem = ({ stat, triggered, index }: {
  stat: typeof stats[0];
  triggered: boolean;
  index: number;
}) => {
  const count = useCountUp(stat.countTo, triggered);
  const display = stat.countTo !== null
    ? `${stat.prefix}${count}${stat.suffix}`
    : `${stat.prefix}${stat.suffix}`;

  return (
    <div
      className={`flex flex-col gap-3 px-10 py-12 ${
        index > 0 ? "border-t border-rule sm:border-l sm:border-t-0" : ""
      }`}
    >
      <span className="font-serif text-[clamp(44px,5vw,68px)] font-800 leading-none tracking-[-0.045em] text-accent">
        {display}
      </span>
      <span className="text-[14px] leading-[1.55] text-ink-soft">{stat.lbl}</span>
    </div>
  );
};

const Summary = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const scroller = el.closest(".snap-scroller");
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); io.disconnect(); } },
      { root: scroller, threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="summary" className="snap-section relative flex flex-col justify-center bg-background px-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">
          The Big Picture
        </p>
        <h2 className="mt-4 font-serif text-[clamp(34px,5.5vw,64px)] font-700 leading-[1.05] tracking-[-0.025em] text-balance text-ink">
          What it all <em className="font-medium italic">means.</em>
        </h2>

        <div className="mt-8 h-px w-12 bg-ink/40" aria-hidden />

        <p className="mt-8 max-w-xl text-pretty font-serif text-[19px] leading-[1.8] text-ink-soft">
          Placeholder — Write 2–3 sentences summarizing the policy's arc and
          its lasting significance. What has changed over these decades? What
          remains contested? What should a reader take away from this history?
        </p>
      </div>

      <div ref={statsRef} className="mx-auto mt-20 w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {stats.map((s, i) => (
            <StatItem key={s.lbl} stat={s} triggered={triggered} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Summary;
