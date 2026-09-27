import type { Locale } from "@/lib/i18n";

export type WhyCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  bookDemo: string;
  exploreFeatures: string;
  chatWhatsapp: string;
  flowTitle: string;
  flowLead: string;
  flowNote: string;
  flowSteps: { title: string; body: string }[];
  projectsTitle: string;
  projectsTitleHighlight: string;
  projectsLead: string;
  projects: string[];
  projectsNote: string;
  stakeholdersTitle: string;
  stakeholdersTitleHighlight: string;
  stakeholdersLead: string;
  stakeholders: { title: string; body: string }[];
  stakeholdersNote: string;
  automateTitle: string;
  automateLead: string;
  automateItems: { title: string; body: string }[];
  automateNote: string;
  journeyTitle: string;
  journeyTitleHighlight: string;
  journeyLead: string;
  journeyNote: string;
  journeySteps: { title: string; body: string }[];
  easyTitle: string;
  easyLead: string;
  easyChecks: string[];
  easyNote: string;
  enterpriseTitle: string;
  enterpriseTitleHighlight: string;
  enterpriseLead: string;
  enterpriseItems: string[];
  enterpriseNote: string;
  whyTitle: string;
  whyTitleHighlight: string;
  whyLead: string;
  whyItems: string[];
  ctaTitle: string;
  ctaLead: string;
};

const en: WhyCopy = {
  heroEyebrow: "What is Propics?",
  heroTitle: "Real Estate Sales Management System Built Specifically for Saudi Arabia",
  heroLead:
    "Propics helps developers manage leads, units, reservations, payments, and sales operations through one unified platform.",
  bookDemo: "Book Demo",
  exploreFeatures: "Explore Features",
  chatWhatsapp: "Chat on WhatsApp",
  flowTitle: "One Platform. One Workflow.",
  flowLead:
    "Propics connects every step of your real estate sales journey in one unified platform.",
  flowNote: "Propics combines real estate specialization with operational simplicity",
  flowSteps: [
    { title: "Lead", body: "Capture leads from multiple channels" },
    { title: "Customer", body: "Convert leads into customers" },
    { title: "Request", body: "Manage requests and unit interest" },
    { title: "Reservation", body: "Reserve units with real-time availability" },
    { title: "Payment", body: "Process payments securely" },
    { title: "Closing", body: "Close deals and complete handover" },
  ],
  projectsTitle: "Built for Every Project Type",
  projectsTitleHighlight: "Designed for Real Estate",
  projectsLead:
    "Whether you manage residential communities, land developments, commercial properties, or mixed-use projects, Propics adapts to the way your business operates.",
  projects: ["Land Projects", "Villas", "Apartments", "Offices"],
  projectsNote: "Manage every project type from one platform.",
  stakeholdersTitle: "One Platform Everyone Connected",
  stakeholdersTitleHighlight: "Connect Everyone Involved",
  stakeholdersLead:
    "Propics brings all key stakeholders together in one unified platform to streamline communication, collaboration, and sales operations.",
  stakeholders: [
    {
      title: "Sales Teams",
      body: "Manage leads, follow-ups, and deals efficiently.",
    },
    {
      title: "Brokers",
      body: "Collaborate, share inventory, and manage bookings.",
    },
    {
      title: "Banks",
      body: "Evaluate requests, verify documents, and approve financing.",
    },
    {
      title: "Clients",
      body: "Self-service portal for offers, requests, and updates.",
    },
    {
      title: "Marketing Teams",
      body: "Run campaigns, generate leads, and track performance.",
    },
  ],
  stakeholdersNote: "One connected ecosystem for real estate sales.",
  automateTitle: "Automate Repetitive Sales Tasks",
  automateLead:
    "Propics automates everyday sales operations so your team can focus on what matters most — building relationships and closing more deals.",
  automateItems: [
    {
      title: "Automated Price Offers",
      body: "Generate accurate offers instantly based on pricing rules and customer criteria.",
    },
    {
      title: "Real-Time Unit Availability",
      body: "Keep unit availability up to date across all channels in real time.",
    },
    {
      title: "Customer Follow-Ups",
      body: "Automate reminders and follow-ups to stay connected with your leads.",
    },
    {
      title: "Reservation Management",
      body: "Manage reservations seamlessly and reduce manual errors.",
    },
    {
      title: "Request Processing",
      body: "Streamline request submission, review, and approval workflows.",
    },
  ],
  automateNote: "Spend less time managing operations and more time closing deals.",
  journeyTitle: "Self Service Customer Journey",
  journeyTitleHighlight: "Designed for Real Estate",
  journeyLead:
    "Empower your customers to explore, request, and purchase with confidence — anytime, anywhere.",
  journeyNote: "Manage every project type from one platform.",
  journeySteps: [
    { title: "Search Unit", body: "Browse available units and find the perfect fit." },
    {
      title: "Request Offer",
      body: "Request a personalized offer in just a few clicks.",
    },
    {
      title: "Submit Documents",
      body: "Upload required documents securely and easily.",
    },
    {
      title: "Complete Purchase Steps",
      body: "Follow guided steps to complete your purchase with confidence.",
    },
  ],
  easyTitle: "Easy From Day One",
  easyLead:
    "Propics is built for real estate teams. Get up and running quickly — no complexity, no delays.",
  easyChecks: [
    "No Technical Knowledge Required",
    "Intuitive Interface",
    "Fast Team Adoption",
    "Minimal Training",
  ],
  easyNote: "Designed for real people. Built for real results.",
  enterpriseTitle: "Enterprise-Grade Foundation",
  enterpriseTitleHighlight: "Cloud-Based & Secure",
  enterpriseLead:
    "Built on modern cloud infrastructure with reliability, continuous updates, and scalable performance for growing real estate operations.",
  enterpriseItems: [
    "Cloud Infrastructure",
    "Data Protection",
    "Continuous Updates",
    "Reliable Security",
  ],
  enterpriseNote:
    "Built to support growing real estate operations. Scale your projects, teams, and customer relationships with confidence.",
  whyTitle: "Why Choose Propics",
  whyTitleHighlight: "The Smarter Way to Manage Real Estate",
  whyLead:
    "Propics is purpose-built for the Saudi real estate market helping developers, brokers, and sales teams sell more, operate efficiently, and grow with confidence.",
  whyItems: [
    "Built specifically for real estate",
    "Connected Ecosystem",
    "Faster Sales Operations",
    "Automation & Efficiency",
    "Real-time Visibility",
    "Secure & Cloud-based",
  ],
  ctaTitle: "Your Trusted Partner For Digital Transformation",
  ctaLead:
    "See how Propics helps real estate teams simplify operations and close deals faster.",
};

const ar: WhyCopy = {
  heroEyebrow: "ماهو بروبيكس؟",
  heroTitle: "نظام إدارة مبيعات عقارية مصمم خصيصاً للمملكة العربية السعودية",
  heroLead:
    "بروبيكس يساعد المطورين في إدارة العملاء المحتملين، والوحدات، والحجوزات، والمدفوعات، وعمليات المبيعات من خلال منصة موحدة واحدة.",
  bookDemo: "احجز عرضاً",
  exploreFeatures: "استكشف الميزات",
  chatWhatsapp: "الدردشة عبر واتساب",
  flowTitle: "منصة واحدة. سير عمل واحد.",
  flowLead:
    "يربط بروبيكس كل خطوة في رحلة مبيعات العقارات الخاصة بك في منصة موحدة واحدة.",
  flowNote: "يجمع بروبيكس بين تخصص العقارات وبساطة التشغيل.",
  flowSteps: [
    { title: "محتمل", body: "التقاط العملاء المحتملين من قنوات متعددة" },
    { title: "عميل", body: "تحويل العملاء المحتملين إلى عملاء" },
    { title: "طلب", body: "إدارة الطلبات واهتمام الوحدات" },
    { title: "حجز", body: "حجز الوحدات مع التوفر في الوقت الفعلي" },
    { title: "دفع", body: "معالجة المدفوعات بشكل آمن" },
    { title: "إغلاق", body: "إغلاق الصفقات وإكمال التسليم" },
  ],
  projectsTitle: "مصمم لكل نوع من المشاريع",
  projectsTitleHighlight: "مصمم للعقارات",
  projectsLead:
    "سواء كنت تدير مجتمعات سكنية، أو تطوير أراضي، أو عقارات تجارية، أو مشاريع متعددة الاستخدامات، يتكيف بروبيكس مع طريقة عمل عملك.",
  projects: ["مشاريع الأراضي", "Villas", "Apartments", "مكاتب"],
  projectsNote: "إدارة كل نوع من المشاريع من منصة واحدة.",
  stakeholdersTitle: "منصة واحدة للجميع",
  stakeholdersTitleHighlight: "اتصل بجميع المعنيين",
  stakeholdersLead:
    "تجمع بروبيكس جميع أصحاب المصلحة الرئيسيين في منصة موحدة لتبسيط التواصل والتعاون وعمليات المبيعات.",
  stakeholders: [
    {
      title: "فرق المبيعات",
      body: "إدارة العملاء المحتملين والمتابعات والصفقات بكفاءة.",
    },
    {
      title: "الوسطاء",
      body: "التعاون ومشاركة المخزون وإدارة الحجوزات.",
    },
    {
      title: "البنوك",
      body: "تقييم الطلبات والتحقق من الوثائق والموافقة على التمويل.",
    },
    {
      title: "العملاء",
      body: "بوابة الخدمة الذاتية للعروض والطلبات والتحديثات.",
    },
    {
      title: "فرق التسويق",
      body: "تشغيل الحملات وتوليد العملاء المحتملين وتتبع الأداء.",
    },
  ],
  stakeholdersNote: "نظام بيئي متصل لمبيعات العقارات.",
  automateTitle: "أتمتة المهام البيعية المتكررة",
  automateLead:
    "تقوم بروبيكس بأتمتة عمليات المبيعات اليومية حتى يتمكن فريقك من التركيز على ما هو أهم - بناء العلاقات وإغلاق المزيد من الصفقات.",
  automateItems: [
    {
      title: "عروض الأسعار الآلية",
      body: "توليد عروض دقيقة فورياً بناء على قواعد التسعير ومعايير العملاء.",
    },
    {
      title: "توفر الوحدات في الوقت الحقيقي",
      body: "أبقِ توفر الوحدات محدثاً عبر جميع القنوات في الوقت الحقيقي.",
    },
    {
      title: "متابعات العملاء",
      body: "أتمتة التذكيرات والمتابعات للبقاء على اتصال مع عملائك المحتملين.",
    },
    {
      title: "إدارة الحجوزات",
      body: "إدارة الحجوزات بسلاسة وتقليل الأخطاء اليدوية.",
    },
    {
      title: "معالجة الطلبات",
      body: "تبسيط تقديم الطلبات ومراجعتها وموافقاتها.",
    },
  ],
  automateNote: "اقضِ وقتاً أقل في إدارة العمليات ووقتاً أكثر في إغلاق الصفقات.",
  journeyTitle: "رحلة العميل ذات الخدمة الذاتية",
  journeyTitleHighlight: "مصممة للعقارات",
  journeyLead:
    "مكّن عملاءك من الاستكشاف، الطلب، والشراء بثقة — في أي وقت، وفي أي مكان.",
  journeyNote: "إدارة كل نوع من المشاريع من منصة واحدة.",
  journeySteps: [
    { title: "وحدة البحث", body: "تصفح الوحدات المتاحة وابحث عن الخيار المثالي." },
    { title: "طلب عرض", body: "اطلب عرضاً مخصصاً في بضع نقرات." },
    {
      title: "تقديم المستندات",
      body: "ارفع المستندات المطلوبة بسهولة وأمان.",
    },
    {
      title: "إكمال خطوات الشراء",
      body: "اتبع خطوات إرشادية لإكمال الشراء بثقة.",
    },
  ],
  easyTitle: "سهل من اليوم الأول",
  easyLead: "تم تصميم Propics لفرق العقارات. ابدأ بسرعة دون تعقيد، دون تأخير.",
  easyChecks: [
    "لا حاجة لمعرفة تقنية",
    "واجهة بديهية",
    "اعتماد سريع للفريق",
    "تدريب minimal",
  ],
  easyNote: "مصمم لأشخاص حقيقيين، مبني لتحقيق نتائج حقيقية.",
  enterpriseTitle: "أساس بمستوى المؤسسات",
  enterpriseTitleHighlight: "سحابي وآمن",
  enterpriseLead:
    "مبني على بنية تحتية سحابية حديثة مع أمان موثوق، تحديثات مستمرة، وأداء قابل للتوسع لعمليات العقارات المتنامية.",
  enterpriseItems: [
    "البنية التحتية السحابية",
    "حماية البيانات",
    "تحديثات مستمرة",
    "أمان موثوق",
  ],
  enterpriseNote:
    "مبني لدعم عمليات العقارات المتنامية. قم بتوسيع مشاريعك، وفرقك، وعلاقاتك مع العملاء بثقة.",
  whyTitle: "لماذا تختار Propics",
  whyTitleHighlight: "الطريقة الأذكى لإدارة العقارات",
  whyLead:
    "تم تصميم Propics خصيصاً لسوق العقارات السعودي لمساعدة المطورين، والوسطاء، وفرق المبيعات على البيع أكثر والعمل بكفاءة، والنمو بثقة.",
  whyItems: [
    "مبني خصيصاً للعقارات",
    "نظام بيئي متصل",
    "عمليات مبيعات أسرع",
    "الأتمتة والكفاءة",
    "رؤية في الوقت الحقيقي",
    "آمن وسحابي",
  ],
  ctaTitle: "شريكك الموثوق في التحول الرقمي",
  ctaLead:
    "اكتشف كيف يساعد Propics فرق العقارات في تبسيط العمليات وإغلاق الصفقات بشكل أسرع.",
};

const copy: Record<Locale, WhyCopy> = { en, ar };

export function getWhyCopy(locale: Locale): WhyCopy {
  return copy[locale];
}
