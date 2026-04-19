type Reference = {
  id: number;
  citation: string;
  url?: string;
};

const policySources: Reference[] = [
  {
    id: 1,
    citation:
      'Social Security Administration. "Social Security Act of 1935." U.S. Social Security Administration.',
    url: "https://www.ssa.gov/history/35act.html",
  },
  {
    id: 2,
    citation:
      'Kaiser Family Foundation. "Long-Term Care in the United States: A Timeline." KFF.',
    url: "https://www.kff.org/tag/long-term-care/",
  },
  {
    id: 3,
    citation:
      'Centers for Medicare & Medicaid Services. "CMS History." U.S. Department of Health & Human Services.',
    url: "https://www.cms.gov/about-cms/who-we-are/history",
  },
  {
    id: 4,
    citation:
      'National Council on Aging. "Older Americans Act." NCOA.',
    url: "https://www.ncoa.org/advocates/public-policy/issues/aging-services/older-americans-act/",
  },
  {
    id: 5,
    citation:
      'Gostin, Lawrence O. "Physician-Assisted Suicide: A Legitimate Medical Practice?" AMA Journal of Ethics, vol. 5, no. 1, 2003.',
    url: "https://journalofethics.ama-assn.org/article/physician-assisted-suicide-law-and-professional-ethics/2003-01",
  },
  {
    id: 6,
    citation:
      'UC Davis Health. "End of Life Option Act." UC Davis Medical Center.',
    url: "https://health.ucdavis.edu/end-of-life-option-act/",
  },
  {
    id: 7,
    citation:
      'Stanford Health Care. "End of Life Option Act at Stanford Health Care." Stanford Medicine.',
    url: "https://stanfordhealthcare.org/medical-treatments/e/end-of-life-care/end-of-life-option-act-shc.html",
  },
];

const imageCredits: Reference[] = [
  {
    id: 8,
    citation:
      'Museum of the City of New York. "Elderly women\'s beds, Kings County Almshouse," c. 1900.',
  },
  {
    id: 9,
    citation:
      'Wikimedia Commons. "Signing of the Social Security Act," August 14, 1935.',
    url: "https://commons.wikimedia.org/wiki/File:Signing_Of_The_Social_Security_Act.jpg",
  },
  {
    id: 10,
    citation:
      'The New York Times. Nursing home staffing photograph, 2024.',
    url: "https://www.nytimes.com/2024/02/29/health/nursing-home-staffing-shortages-pandemic.html",
  },
  {
    id: 11,
    citation:
      'Michigan House Democrats. Medicare & Medicaid 60th anniversary photograph, 2025.',
    url: "https://housedems.com/as-medicaid-turns-60-michigan-democratic-lawmakers-warn-of-devastating-federal-cuts-to-the-lifesaving-program/",
  },
  {
    id: 12,
    citation:
      'Health Foundation for Western & Central New York. Ethel Percy Andrus and President Johnson at the signing of the Older Americans Act, 1965.',
    url: "https://hfwcny.org/wp-content/uploads/1140-ethel-lbj.jpg",
  },
  {
    id: 13,
    citation:
      'The New York Times. Nursing home residents during the COVID-19 pandemic, 2021.',
    url: "https://www.nytimes.com/2021/05/06/health/covid-nursing-homes.html",
  },
  {
    id: 14,
    citation:
      'PBS NewsHour. Federal nursing home staffing standards photograph.',
    url: "https://www.pbs.org/newshour/nation/what-republicans-possible-medicaid-cuts-could-mean-for-nursing-homes",
  },
  {
    id: 15,
    citation:
      'DocsTeach, National Archives. President Carter signing ceremony photograph, 1978.',
    url: "https://docsteach.org/document/carter-signing-era/",
  },
  {
    id: 16,
    citation:
      'Carelink. Home and community-based care photograph.',
    url: "https://www.carelink.org",
  },
  {
    id: 17,
    citation:
      'Jensen Injury Lawyers. Nursing home care photograph.',
    url: "https://jenseninjurylawyers.com/wp-content/uploads/2025/03/protections-against-nursing-home-neglect-scaled.jpg",
  },
  {
    id: 18,
    citation:
      'Eastside Online. Death with Dignity Act rally photograph.',
    url: "https://eastside-online.org/opinions/the-death-with-dignity-act-should-be-passed-in-all-50-states/",
  },
  {
    id: 19,
    citation:
      'KPBS / Getty Images. California End of Life Option Act photograph.',
    url: "https://www.kpbs.org",
  },
];

const Summary = () => {
  return (
    <section id="summary" className="snap-section relative flex flex-col bg-background">
      {/* Reference list */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-24 sm:px-14">
        <div className="mx-auto max-w-5xl space-y-12">

          {/* Policy Sources */}
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/35">
              Policy Sources
            </p>
            <ol className="space-y-5">
              {policySources.map((ref) => (
                <li key={ref.id} className="rule-bottom pb-5">
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

          {/* Image Credits */}
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/35">
              Image Credits
            </p>
            <ol className="space-y-5">
              {imageCredits.map((ref) => (
                <li key={ref.id} className="rule-bottom pb-5">
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

        </div>
      </div>
    </section>
  );
};

export default Summary;
