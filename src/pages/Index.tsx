import { useEffect, useRef, useState } from "react";
import SiteNav from "@/components/policy/SiteNav";
import Hero from "@/components/policy/Hero";
import Timeline from "@/components/policy/Timeline";
import Summary from "@/components/policy/Summary";
import SiteFooter from "@/components/policy/SiteFooter";

const sectionTitles: Record<string, string> = {
  hero: "Elder care policy in America",
  timeline: "How it has evolved over time",
  summary: "Summary",
};

const Index = () => {
  const scrollerRef = useRef<HTMLElement>(null);
  const [navTitle, setNavTitle] = useState("Policy.America");

  // Trigger the .snap-reveal entrance whenever a section enters the scroller's
  // viewport. Works for snap scrolling and resize.
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>("section[id]"));
    const sectionIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio > 0.5) {
            const id = (e.target as HTMLElement).id;
            setNavTitle(sectionTitles[id] ?? "Policy.America");
          }
        });
      },
      { root, threshold: [0.5] }
    );
    sections.forEach((s) => sectionIo.observe(s));

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(".snap-reveal")
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.revealed = "true";
          } else {
            // Re-arm so it animates again next time the section is scrolled to.
            (e.target as HTMLElement).dataset.revealed = "false";
          }
        });
      },
      { root, threshold: 0.35 }
    );

    targets.forEach((t) => io.observe(t));

    // Parallax resist on summary — slides up at 65% speed so it feels
    // like it's being revealed from behind the timeline, not just scrolling in.
    const summaryEl = root.querySelector<HTMLElement>("#summary");
    const onScroll = () => {
      if (!summaryEl) return;
      const vh = root.clientHeight;
      const scrolled = root.scrollTop;
      const summaryStart = vh * 2; // summary sits at 2×vh in the document
      const progress = Math.max(0, Math.min((scrolled - vh) / vh, 1)); // 0→1 as scrollTop goes from vh to 2vh
      // Push summary down slightly during approach, creating a "reveal from behind" feel
      const resist = (1 - progress) * vh * 0.18;
      summaryEl.style.transform = `translateY(${resist}px)`;
    };
    root.addEventListener("scroll", onScroll, { passive: true });

    return () => { io.disconnect(); sectionIo.disconnect(); root.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <SiteNav title={navTitle} />
      <main ref={scrollerRef} className="snap-scroller">
        <Hero />
        <Timeline />
        <Summary />
      </main>
    </div>
  );
};

export default Index;
