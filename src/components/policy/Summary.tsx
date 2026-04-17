const stats = [
  { num: "90+", lbl: "Years of federal social policy shaping American life" },
  { num: "65M", lbl: "Placeholder — Americans currently enrolled or protected" },
  { num: "$X.XT", lbl: "Placeholder — Annual federal spending on social programs" },
];

const Summary = () => {
  return (
    <section id="summary" className="snap-section flex flex-col justify-center bg-background px-6">
      <div className="snap-reveal mx-auto flex max-w-3xl flex-col items-center text-center">
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

      <div className="mx-auto mt-20 w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.lbl}
              className={`flex flex-col gap-3 px-10 py-12 ${
                i > 0 ? "border-t border-rule sm:border-l sm:border-t-0" : ""
              }`}
            >
              <span className="font-serif text-[clamp(44px,5vw,68px)] font-800 leading-none tracking-[-0.045em] text-accent">
                {s.num}
              </span>
              <span className="text-[14px] leading-[1.55] text-ink-soft">{s.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Summary;
