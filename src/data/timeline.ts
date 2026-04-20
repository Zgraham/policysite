// ─────────────────────────────────────────────────────────────
//  Timeline card content
//  Edit year, date, era, title, summary, and source freely.
//  Leave gradient, visualKind, visualLabel, image, layout,
//  and overlayColor alone — those are wired to assets/styles.
// ─────────────────────────────────────────────────────────────

export type PolicyCard = {
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

export const cards: Omit<PolicyCard, "image">[] = [
  // ── 1 ──────────────────────────────────────────────────────
  {
    year: "1760s",
    date: "c. 1760s",
    era: "Colonial Era",
    title: "Almshouses & Poorhouses",
    summary:
      "Before the government stepped in, the only option for poor older adults with no family to help them was the almshouse or poorhouse. These were county-run institutions that housed the elderly, sick, disabled, and orphaned children together. The conditions were so bad that by the late 1800s, the poorhouse had become something people feared more than almost anything else.",
    gradient: "bg-gradient-archive",
    visualKind: "image",
    visualLabel: "County poorhouse ward, c. 1890s",
    layout: "immersive",
    overlayColor: "18, 18, 20",
  },

  // ── 2 ──────────────────────────────────────────────────────
  {
    year: "1935",
    date: "August 14, 1935",
    era: "New Deal",
    title: "Social Security Act",
    summary:
      "Through the Old Age Assistance program, the SSA made federal funding available to states so they could provide direct financial support to low-income seniors. One of the most significant parts of the law was that it prohibited payments to anyone living in a public institution, which at the time meant the poorhouses. That stipulation led to the private nursing home industry. Families started moving their elderly parents and grandparents into private facilities so they could still qualify for benefits.",
    source: "Social Security Administration",
    gradient: "bg-gradient-archive",
    visualKind: "document",
    visualLabel: "Public Law 74-271",
    layout: "immersive",
    overlayColor: "18, 18, 20",
  },

  // ── 3 ──────────────────────────────────────────────────────
  {
    year: "1950",
    date: "August 28, 1950",
    era: "Postwar Era",
    title: "Direct Payments to Nursing Homes",
    summary:
      "An amendment to the Social Security Act changed how medical payments were handled, requiring that money go directly to nursing homes rather than to the individuals receiving care. It also made state licensing of nursing homes a requirement for participating in the Old Age Assistance program (OAA). This essentially made nursing homes the default long-term care setting years before Medicare even existed.",
    source: "KFF Long-Term Care Timeline",
    gradient: "bg-gradient-reform",
    visualKind: "chart",
    visualLabel: "Nursing home growth, 1940 – 1965",
    layout: "immersive",
    overlayColor: "42, 26, 16",
  },

  // ── 4 ──────────────────────────────────────────────────────
  {
    year: "1965",
    date: "July 30, 1965",
    era: "Great Society",
    title: "Medicare & Medicaid",
    summary:
      "Medicare covered hospital and medical insurance for adults over 65, and Medicaid extended coverage to people with low incomes. This was the first time that getting older or being poor was no longer a barrier to healthcare. At the time, Medicare was meant for acute care and did not cover long-term care needs. Medicaid required coverage of institutional lonh-term-care, which reinforced the nursing home as the primary option for aging adults who needed continuous support.",
    source: "CMS History; KFF Long-Term Care Timeline",
    gradient: "bg-gradient-society",
    visualKind: "image",
    visualLabel: "President Johnson signing Medicare, 1965",
    layout: "immersive",
    overlayColor: "20, 24, 18",
  },

  // ── 5 ──────────────────────────────────────────────────────
  {
    year: "1965",
    date: "July 14, 1965",
    era: "Great Society",
    title: "Older Americans Act",
    summary:
      "The OAA set up the Administration on Aging as part of what was called the Department of Health, Education and Welfare, and created a national framework for funding services that help older adults stay healthy and live independently. This included meals, transportation, senior centers, benefits enrollment, caregiver support, job training, and health promotion.",
    source: "NCOA",
    gradient: "bg-gradient-civil",
    visualKind: "document",
    visualLabel: "Public Law 89-73",
    layout: "immersive",
    overlayColor: "18, 18, 20",
  },

  // ── 6 ──────────────────────────────────────────────────────
  {
    year: "1967",
    date: "1967",
    era: "Reform Era",
    title: "Nursing Home Licensing",
    summary:
      "By 1967, there was enough public anger about fraud and abuse in nursing homes that Congress amended the Social Security Act, requiring states to license nursing home administrators. It was a big step toward holding an unregulated industry accountable for how it was treating people in its care.",
    source: "KFF Long-Term Care Timeline",
    gradient: "bg-gradient-reform",
    visualKind: "document",
    visualLabel: "Social Security Amendments of 1967",
    layout: "immersive",
    overlayColor: "38, 22, 12",
  },

  // ── 7 ──────────────────────────────────────────────────────
  {
    year: "1974",
    date: "1974",
    era: "Reform Era",
    title: "Federal Standards for Nursing Facilities",
    summary:
      "Federal regulations for skilled nursing facilities went into effect in 1974. The regulations set standards around staffing levels, staff qualifications, fire safety, and delivery of services. Any facility that wanted to participate in Medicare and Medicaid had to meet these requirements. It was the first time there was a national baseline for what a nursing home was  supposed to provide.",
    source: "KFF Long-Term Care Timeline",
    gradient: "bg-gradient-archive",
    visualKind: "document",
    visualLabel: "Federal Register, 1974",
    layout: "immersive",
    overlayColor: "26, 28, 30",
  },

  // ── 8 ──────────────────────────────────────────────────────
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
    overlayColor: "28, 18, 12",
  },

  // ── 9 ──────────────────────────────────────────────────────
  {
    year: "1981",
    date: "1981",
    era: "Reform Era",
    title: "HCBS Waiver Program",
    summary:
      "Section 1915(c) of the Social Security Act created the HCBS Waiver Program, which allowed states to use Medicaid funding for home and community-based services like personal care, respite care, adult day programs, and home modification. People with long-term care needs no longer had to be placed in a nursing home to get help.",
    source: "KFF Long-Term Care Timeline; CMS History",
    gradient: "bg-gradient-modern",
    visualKind: "chart",
    visualLabel: "HCBS participation, 1982 – 2000",
    layout: "immersive",
    overlayColor: "16, 20, 24",
  },

  // ── 10 ─────────────────────────────────────────────────────
  {
    year: "1987",
    date: "1987",
    era: "Reform Era",
    title: "OBRA-87: Nursing Home Reform Act",
    summary:
      "OBRA-87 was a response to ongoing problems with abuse, neglect, and poor quality of care in nursing homes. It put quality standards in place for all Medicare and Medicaid-certified facilities. That same year, the reauthorization of the OAA added six new funding areas, including in-home services for frail seniors, long-term care ombudsman programs, and a federal focus on preventing elder abuse, neglect, and exploitation.",
    source: "KFF Long-Term Care Timeline",
    gradient: "bg-gradient-reform",
    visualKind: "document",
    visualLabel: "Omnibus Budget Reconciliation Act of 1987",
    layout: "immersive",
    overlayColor: "14, 18, 26",
  },

  // ── 11 ─────────────────────────────────────────────────────
  {
    year: "1997",
    date: "1994 / 1997",
    era: "End of Life",
    title: "Oregon Death with Dignity Act",
    summary:
      "Oregon was the first state in the US to legalize physician-assisted dying. That same year, the U.S. Supreme Court decided Washington v. Glucksberg, which addressed whether state laws banning physician-assisted suicide were unconstitutional. The court said they were not, but also confirmed that legalizing it was not unconstitutional either. To qualify, a person needs a terminal diagnosis with a prognosis of six months or less, must make two separate oral requests with a waiting period in between, submit a written request, and have two physicians confirm their eligibility.",
    source: "AMA Journal of Ethics (2003)",
    gradient: "bg-gradient-modern",
    visualKind: "document",
    visualLabel: "Oregon Revised Statutes 127.800",
    layout: "immersive",
    overlayColor: "18, 18, 20",
  },

  // ── 12 ─────────────────────────────────────────────────────
  {
    year: "2015",
    date: "October 5, 2015",
    era: "End of Life",
    title: "California End of Life Option Act",
    summary:
      "California passed the End of Life Option Act to regulate Medical Aid in Dying, known as MAID. Under this law, a terminally ill California resident who meets all of the legal requirements can request medication that will end their life. The law first took effect on June 9, 2016, and an updated version went into effect January 1, 2022. To be eligible, a person must be at least 18 years old, a California resident, have a terminal illness with a prognosis of six months or less to live, be capable of making their own medical decisions, and be able to self-administer the medication. The process involves multiple steps including two oral requests, a written request, evaluations by both an attending and a consulting physician, and sometimes a mental health assessment.",
    source: "UC Davis Health; Stanford Health Care",
    gradient: "bg-gradient-society",
    visualKind: "document",
    visualLabel: "California Health & Safety Code § 443",
    layout: "immersive",
    overlayColor: "26, 14, 20",
  },
];
