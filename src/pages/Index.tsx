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

    // Nav title — update when a section is more than half in view
    const sectionIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio > 0.5) {
            setNavTitle(sectionTitles[(e.target as HTMLElement).id] ?? "Policy.America");
          }
        });
      },
      { root, threshold: [0.5] }
    );
    sections.forEach((s) => sectionIo.observe(s));

    // snap-reveal — lift + fade for content elements inside each section
    const targets = Array.from(root.querySelectorAll<HTMLElement>(".snap-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.revealed = "true";
          } else {
            (e.target as HTMLElement).dataset.revealed = "false";
          }
        });
      },
      { root, threshold: 0.35 }
    );
    targets.forEach((t) => io.observe(t));

    return () => { io.disconnect(); sectionIo.disconnect(); };
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
