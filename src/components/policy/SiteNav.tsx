import { useEffect, useState } from "react";

const SiteNav = ({ title }: { title: string }) => {
  const [displayed, setDisplayed] = useState(title);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (title === displayed) return;
    setFading(true);
    const t = setTimeout(() => {
      setDisplayed(title);
      setFading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [title]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-14 border-b border-rule bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <span
          className="font-serif text-base italic text-ink transition-opacity duration-200"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {displayed}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
          Vol. I · 2026
        </span>
      </div>
    </nav>
  );
};

export default SiteNav;
