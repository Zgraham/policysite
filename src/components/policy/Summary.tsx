type Reference = {
  id: number;
  citation: string;
  url?: string;
};

const references: Reference[] = [
  { id: 1, citation: "Placeholder reference — add citations here." },
];

const Summary = () => {
  return (
    <section id="summary" className="snap-section relative flex flex-col bg-background">
      {/* Header */}
      <div className="rule-bottom px-6 py-10 sm:px-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">
            Sources
          </p>
          <h2 className="mt-3 font-serif text-[clamp(28px,4vw,52px)] font-700 leading-[1.05] tracking-[-0.025em] text-ink">
            References
          </h2>
        </div>
      </div>

      {/* Reference list */}
      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-14">
        <ol className="mx-auto max-w-5xl space-y-5">
          {references.map((ref) => (
            <li key={ref.id} className="flex gap-6 rule-bottom pb-5">
              <span className="w-6 flex-none font-sans text-[12px] font-semibold tabular-nums text-accent">
                {ref.id}
              </span>
              <span className="font-serif text-[16px] leading-[1.75] text-ink-soft">
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-rule underline-offset-3 hover:text-ink hover:decoration-ink transition-colors"
                  >
                    {ref.citation}
                  </a>
                ) : (
                  ref.citation
                )}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Summary;
