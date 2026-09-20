export type Locale = "en" | "ar";

export type Dictionary = {
  meta: { title: string; description: string };
  brand: { name: string; nameAr: string; tagline: string };
  nav: {
    home: string;
    features: string;
    about: string;
    blog: string;
    contact: string;
    bookDemo: string;
    langSwitch: string;
    langSwitchAria: string;
    mainNav: string;
    toggleMenu: string;
  };
  common: {
    bookDemo: string;
    bookTrialDemo: string;
    startTrial: string;
    chatWhatsapp: string;
    exploreFeatures: string;
    privacy: string;
    terms: string;
    allRights: string;
  };
  footer: {
    platform: string;
    solutions: string;
    contact: string;
    col1: string[];
    col2: string[];
    col3: string[];
    col4: string[];
    email: string;
    phone: string;
    country: string;
  };
  home: {
    eyebrow: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroLead: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryCtaHref: "start-trial" | "whatsapp";
    painTitle: string;
    painTitleHighlight: string;
    painLead: string;
    painPoints: string[];
    standardTitle: string;
    standardTitleHighlight: string;
    standardLead: string;
    axisSpecialized: string;
    axisGeneric: string;
    axisHard: string;
    axisEasy: string;
    quadrantGenericCrm: string;
    quadrantErp: string;
    quadrantExcel: string;
    standardNote: string;
    solutionsTitleWhite: string;
    solutionsTitleRest: string;
    solutionsLead: string;
    solutions: string[];
    solutionsNote: string;
    journeyTitle: string;
    journeyTitleHighlight: string;
    journeySteps: { title: string; desc: string }[];
    impactTitle: string;
    impactTitleHighlight: string;
    impactLead: string;
    stats: { value: string; label: string }[];
    impactNote: string;
    trustedTitle: string;
    trustedTitleHighlight: string;
    testimonial: string;
    testimonialName: string;
    testimonialRole: string;
    trustedNote: string;
    ctaTitle: string;
    ctaTitleHighlight: string;
    ctaLead: string;
  };
  about: {
    eyebrow: string;
    heroTitle: string;
    heroLead: string;
    teamsTitle: string;
    teamsTitleHighlight: string;
    teamsLead: string;
    teams: string[];
    problemTitle: string;
    problemTitleHighlight: string;
    problems: string[];
    propicsCard: string;
    propicsCardSmall: string;
    aboutNote: string;
    purposeTitle: string;
    purposeTitleRest: string;
    purposeLead: string;
    purposeItems: string[];
    missionTitle: string;
    missionBody: string;
    visionTitle: string;
    visionBody: string;
    whyTitle: string;
    whyTitleHighlight: string;
    whyItems: string[];
    ctaTitle: string;
    ctaTitleHighlight: string;
    ctaLead: string;
  };
  features: {
    eyebrow: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroLead: string;
    items: {
      title: string;
      titleHighlight: string;
      desc: string;
      image: string;
      points: string[];
    }[];
    ctaTitle: string;
    ctaTitleHighlight: string;
    ctaLead: string;
  };
  bookDemo: {
    eyebrow: string;
    heroTitle: string;
    heroTitleHighlight: string;
    benefitsTitle: string;
    benefits: string[];
    selectDate: string;
    availableSlots: string;
    name: string;
    namePh: string;
    company: string;
    companyPh: string;
    phone: string;
    phonePh: string;
    email: string;
    emailPh: string;
    confirm: string;
    booking: string;
    success: string;
    error: string;
    connectionFailed: string;
    weekdays: string[];
    months: string[];
    slots: string[];
  };
  blog: { title: string; body: string };
  trial: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    lead: string;
    infoTitle: string;
    infoItems: string[];
  };
};

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\//, "");
  if (locale === "ar") return clean ? `/ar/${clean}` : "/ar";
  return clean ? `/${clean}` : "/";
}

/** Given current locale + pathname, return the path in the other locale. */
export function switchLocalePath(currentLocale: Locale, pathname: string): string {
  const withoutAr = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  if (currentLocale === "en") {
    return withoutAr === "/" ? "/ar" : `/ar${withoutAr}`;
  }
  return withoutAr === "" ? "/" : withoutAr;
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}
