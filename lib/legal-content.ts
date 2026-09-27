import type { Locale } from "@/lib/i18n";

export type LegalKind = "privacy" | "terms";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets: string[];
};

export type LegalDoc = {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  pageTitle: string;
};

const privacyEn: LegalDoc = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: 01/05/2025",
  intro: ["Welcome to Propics, the real estate sales management system. We respect your privacy and are committed to protecting your personal data in accordance with the highest standards of security and transparency."],
  sections: [
    {
      heading: "1. Who Are We?",
      paragraphs: ["Smart App for Information Technology (Propics) ('Propics', 'we', 'our', 'the Company').", "Company address: Jeddah - Al Rawdah District - Prince Sultan Street.", "Propics provides a real estate sales platform that enables digital sales management of real estate projects, including unit showcasing, quotation issuing, booking management, and payment processing."],
      bullets: [],
    },
    {
      heading: "2. What Does This Policy Cover?",
      paragraphs: ["This Privacy Policy explains how we collect, use, store, share, and protect your personal data, as well as your rights in relation to this data."],
      bullets: [],
    },
    {
      heading: "3. What Data Do We Collect?",
      paragraphs: ["When you use Propics services, we may collect the following types of personal data:"],
      bullets: ["Registration Data: Full name, email address, phone number, company or project name.", "Project Data: Real estate project and unit details (areas, prices, locations).", "Payment Data: Transfer details or transaction data via SADAD.", "Usage Data: Login records, activity logs, system reports.", "Technical Information: IP address, device type, operating system, browser data."],
    },
    {
      heading: "4. How We Collect Data",
      paragraphs: ["We collect data through the following methods:"],
      bullets: ["Directly from you when you create an account or input data into the system.", "Automatically from your device through cookies during your interaction with the platform.", "Automatically from your device through cookies during your interaction with the platform."],
    },
    {
      heading: "5. How and Why We Use Your Data",
      paragraphs: ["We use your data for the following purposes:"],
      bullets: ["To create and manage your account.", "To deliver our services and ensure system functionality.", "To send quotations, booking details, and invoices.", "To enhance and improve our services based on usage analysis.", "To contact you regarding updates, offers, or technical support.", "To protect the system and detect fraud or violations."],
    },
    {
      heading: "6. Sharing Your Data with Third Parties",
      paragraphs: ["We may share your personal data only with trusted parties when necessary, such as:"],
      bullets: ["Payment service providers (e.g., SADAD) to process financial transactions.", "Technology providers (e.g., hosting, security, email infrastructure).", "Governmental or legal authorities when required by applicable laws.", "We do not sell your personal data to any third party."],
    },
    {
      heading: "7. Data Protection Measures",
      paragraphs: ["We implement strict technical and administrative security measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, due to the nature of the internet, we cannot guarantee absolute protection."],
      bullets: [],
    },
    {
      heading: "8. Your Rights",
      paragraphs: ["Subject to applicable regulations, you have the following rights:"],
      bullets: ["The right to know what data we hold about you.", "The right to correct or update your data.", "The right to request deletion of your data if it is no longer required.", "The right to object to certain types of processing.", "The right to withdraw your consent at any time.", "You can exercise your rights by contacting us via the methods listed below."],
    },
    {
      heading: "9. Cookies",
      paragraphs: ["We use cookies to enhance your experience on the platform, such as remembering your preferences and enabling faster navigation. You can control cookie settings via your browser."],
      bullets: [],
    },
    {
      heading: "10. Data Storage and Transfers",
      paragraphs: ["Your data is stored on secure servers that comply with internationally recognized standards for data protection, including encryption protocols and advanced security technologies. In cases where data is transferred or processed by trusted third parties for operational or technical purposes, this is done under strict procedures to ensure confidentiality and integrity in accordance with global best practices."],
      bullets: [],
    },
    {
      heading: "11. Changes to This Privacy Policy",
      paragraphs: ["Propics reserves the right to update or amend this Privacy Policy at any time. You will be notified of any significant changes via email or system notification."],
      bullets: [],
    },
    {
      heading: "12. How to Contact Us",
      paragraphs: ["If you have any questions or wish to exercise your rights regarding your personal data, please contact us at:"],
      bullets: ["Email: privacy@propics.sa", "Mailing Address: Jeddah - Al Rawdah District - Prince Sultan Street - Saudi Arabia", "By using Propics, you acknowledge that you have read, understood, and agreed to this Privacy Policy."],
    },
  ],
  pageTitle: "Privacy Policy - Propics",
};

const privacyAr: LegalDoc = {
  title: "سياسة الخصوصية",
  lastUpdated: "تاريخ آخر تحديث: 2025/05/01",
  intro: ["مرحبًا بك في نظام بروبكس لإدارة المبيعات العقارية. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية وفقًا لأعلى معايير الأمان والشفافية."],
  sections: [
    {
      heading: "1. من نحن؟",
      paragraphs: ["شركة تطبيق الذكي لتقنية المعلومات (بروبكس) ('بروبكس'، 'نحن'، 'الشركة')،", "عنوان الشركة: جدة - حي الروضة - شارع الأمير سلطان.", "نقدم نظام بروبكس العقاري، وهو منصة لإدارة عمليات البيع العقاري الإلكترونية، بما يشمل إدارة المشاريع العقارية، عرض الوحدات، إرسال العروض، إدارة الحجوزات والمدفوعات."],
      bullets: [],
    },
    {
      heading: "2. ماذا تغطي هذه السياسة؟",
      paragraphs: ["توضح سياسة الخصوصية هذه كيف نجمع بياناتك الشخصية، وكيف نستخدمها، ونخزنها، ونشاركها، ونحميها، وما هي حقوقك فيما يتعلق بهذه البيانات."],
      bullets: [],
    },
    {
      heading: "3. البيانات التي نجمعها",
      paragraphs: ["عند استخدامك لخدمات بروبكس، قد نقوم بجمع الأنواع التالية من البيانات:"],
      bullets: ["بيانات التسجيل: الاسم الكامل، البريد الإلكتروني، رقم الهاتف، اسم الشركة أو المشروع العقاري.", "بيانات المشاريع: معلومات المشاريع والوحدات العقارية (مساحات، أسعار، مواقع).", "بيانات الدفع: تفاصيل الحوالات أو بيانات العمليات عبر خدمة سداد.", "بيانات التفاعل والاستخدام: سجلات الدخول، النشاطات داخل النظام، التقارير", "معلومات تقنية: عنوان IP، نوع الجهاز، نظام التشغيل، بيانات المتصفح."],
    },
    {
      heading: "4. كيفية جمع البيانات",
      paragraphs: ["نجمع البيانات عبر الطرق التالية:"],
      bullets: ["مباشرةً منك عند تسجيل حساب أو إدخال بيانات داخل النظام.", "من جهازك عبر ملفات تعريف الارتباط (Cookies) أثناء تصفحك لمنصتنا.", "من تعاملاتك عند استخدامك خدمات الدفع أو إنجاز الحجوزات عبر النظام."],
    },
    {
      heading: "5. كيف ولماذا نستخدم بياناتك؟",
      paragraphs: ["نستخدم بياناتك للأغراض التالية:"],
      bullets: ["إنشاء وإدارة حسابك على النظام.", "تزويدك بخدماتنا وتشغيل وظائف النظام بسلاسة.", "إرسال العروض والحجوزات والفواتير.", "إرسال العروض والحجوزات والفواتير.", "التواصل معك بشأن التحديثات أو العروض أو الدعم الفني", "حماية النظام والكشف عن محاولات الغش أو الانتهاكات."],
    },
    {
      heading: "6. مشاركة البيانات مع أطراف ثالثة",
      paragraphs: ["قد نشارك بياناتك مع أطراف موثوقة فقط عند الحاجة، مثل:"],
      bullets: ["مزودي خدمات الدفع (مثل سداد) لتنفيذ المعاملات المالية.", "مزودي خدمات تقنية (استضافة، أمن المعلومات، البريد الإلكتروني).", "السلطات الحكومية أو القانونية إذا تطلب الأمر وفقًا للأنظمة.", "نحن لا نبيع البيانات الشخصية لأي طرف ثالث."],
    },
    {
      heading: "7. حماية بياناتك",
      paragraphs: ["نطبق إجراءات أمان تقنية وإدارية صارمة لحماية بياناتك من الوصول غير المصرح به أو التغيير أو الكشف أو الإتلاف. رغم ذلك، لا يمكننا ضمان حماية مطلقة بسبب طبيعة الإنترنت."],
      bullets: [],
    },
    {
      heading: "8. حقوقك",
      paragraphs: ["بموجب الأنظمة المعمول بها، لك الحقوق التالية:"],
      bullets: ["الحق في معرفة البيانات التي نحتفظ بها عنك.", "الحق في تصحيح أو تحديث بياناتك.", "الحق في طلب حذف بياناتك إذا لم يعد هناك داعٍ لمعالجتها.", "الحق في الاعتراض على بعض أنماط المعالجة.", "الحق في سحب موافقتك متى شئت.", "يمكنك ممارسة حقوقك بالتواصل معنا عبر وسائل الاتصال الموضحة أدناه."],
    },
    {
      heading: "9. ملفات تعريف الارتباط (Cookies)",
      paragraphs: ["نستخدم ملفات تعريف الارتباط لتحسين تجربة استخدامك للنظام، مثل تذكر تفضيلاتك وتسريع التنقل بين الصفحات.يمكنك التحكم في إعدادات ملفات الارتباط عبر متصفحك."],
      bullets: [],
    },
    {
      heading: "10. تخزين ونقل البيانات",
      paragraphs: ["يتم تخزين بياناتك على خوادم مؤمنة تتوافق مع أعلى المعايير الدولية المعتمدة في حماية البيانات، بما في ذلك بروتوكولات الأمان والتشفير وتقنيات الحماية المتقدمة. وفي حال تم نقل البيانات أو معالجتها عبر أطراف موثوقة لأغراض فنية أو تشغيلية، فإن ذلك يتم وفق إجراءات صارمة تضمن الحفاظ على سرية البيانات وسلامتها، وبما يتماشى مع أفضل الممارسات العالمية لحماية المعلومات."],
      bullets: [],
    },
    {
      heading: "11. التغييرات على سياسة الخصوصية",
      paragraphs: ["تحتفظ بروبكس بالحق في تعديل أو تحديث سياسة الخصوصية هذه من وقت لآخر. سيتم إشعارك بأي تغييرات مهمة عبر البريد الإلكتروني أو إشعار داخل النظام."],
      bullets: [],
    },
    {
      heading: "12. كيف تتواصل معنا؟",
      paragraphs: ["إذا كان لديك أي أسئلة أو ترغب في ممارسة حقوقك بشأن بياناتك الشخصية، يمكنك التواصل معنا عبر:"],
      bullets: ["البريد الإلكتروني: privacy@propics.sa", "العنوان البريدي: جدة - حي الروضة - شارع الأمير سلطان - المملكة العربية السعودية", "باستخدامك نظام بروبكس، فإنك تقر بأنك قرأت وفهمت هذه السياسة وتوافق على جميع بنودها."],
    },
  ],
  pageTitle: "سياسة الخصوصية - بروبكس",
};

const termsEn: LegalDoc = {
  title: "Terms and Conditions",
  lastUpdated: "",
  intro: ["Welcome to the Propics Real Estate Sales System. By using this system, you agree to fully comply with all the terms and conditions set forth below. Please read these terms carefully before using the system."],
  sections: [
    {
      heading: "1. Definitions",
      paragraphs: [],
      bullets: ["'Company': Smart App for Information Technology (Propics)", "'System': Refers to the Propics platform for managing real estate sales operations, including all its services and tools", "'Client': Refers to the individual or entity that has subscribed to use the system to manage real estate sales for their projects", "'Services': Includes all functionalities provided through the system, such as project display, quotation generation, booking management, payment tracking, and sales reporting"],
    },
    {
      heading: "2. Legal Agreement",
      paragraphs: ["By using the system, the client explicitly acknowledges and agrees to be bound by the terms and conditions in this document. If the client does not agree with any part of these terms, they are not permitted to use the system or any of its services."],
      bullets: [],
    },
    {
      heading: "3. Account Registration",
      paragraphs: ["The client is required to provide accurate and complete information when creating an account on the system and must keep this information updated. The company reserves the right to suspend or terminate any account if false or misleading information is provided, or if the terms are violated."],
      bullets: [],
    },
    {
      heading: "4. Data Accuracy Responsibility",
      paragraphs: ["The client bears full responsibility for the accuracy and correctness of all data entered into the system, including property details, pricing, bank account information, and client records. While the company may assist with data entry upon request, the final review and approval of the information remain solely the responsibility of the client. The company assumes no legal responsibility for any outcomes resulting from incorrect or incomplete data."],
      bullets: [],
    },
    {
      heading: "5. Adding Real Estate Broker",
      paragraphs: ["The client must ensure all brokers are properly licensed and officially contracted, in full compliance with the applicable regulations in the Kingdom of Saudi Arabia, before adding them to their projects in the Propics system."],
      bullets: [],
    },
    {
      heading: "6. Account Security",
      paragraphs: ["The client is responsible for maintaining the confidentiality of their login credentials and for all activities conducted through their account. If any unauthorized use is suspected, the client must immediately notify the company."],
      bullets: [],
    },
    {
      heading: "7. System Usage",
      paragraphs: ["The client agrees to use the system only for lawful purposes related to real estate sales management and shall not use it for any unlawful or harmful activities that may negatively impact any party."],
      bullets: [],
    },
    {
      heading: "8. Intellectual Property",
      paragraphs: ["All intellectual property rights related to the system, including software, designs, texts, and other materials, are the exclusive property of the company. The client may not reproduce, distribute, or republish any part of the system without prior written permission from the company."],
      bullets: [],
    },
    {
      heading: "9. Modifications to Terms",
      paragraphs: ["The company reserves the right to update or modify these terms and conditions at any time. The client will be notified of significant changes via email or within the system. Continued use of the system after such updates constitutes acceptance of the revised terms."],
      bullets: [],
    },
    {
      heading: "10. Data Protection and Privacy",
      paragraphs: ["The company is committed to protecting client data in accordance with recognized security standards. However, the client acknowledges the inherent risks of internet usage and agrees that the company is not responsible for any data breaches resulting from the client's negligence."],
      bullets: [],
    },
    {
      heading: "11. Account Termination",
      paragraphs: ["The client may terminate their account at any time, provided there are no outstanding financial obligations. The company also reserves the right to terminate the account if the client violates any terms or fails to fulfill financial commitments. The company is not obligated to refund any payments made after the service has been activated."],
      bullets: [],
    },
    {
      heading: "12. Limitation of Liability",
      paragraphs: ["The company is not liable for any direct or indirect losses resulting from the use of the system or reliance on inaccurate data entered into the system. The company's responsibility is strictly limited to providing access to the system as agreed."],
      bullets: [],
    },
    {
      heading: "13. Free Trial",
      paragraphs: ["The company may offer a free trial of the system at its sole discretion. The company reserves the right to approve or reject any request for a free trial without obligation to provide justification. The free trial is conducted through a demo account provided by the company and does not include the client’s own project layout or data. The trial period and available features are determined solely by the company and may not reflect the full capabilities of the system offered under paid subscriptions."],
      bullets: [],
    },
    {
      heading: "14. Governing Law and Dispute Resolution",
      paragraphs: ["This agreement is governed by the laws and regulations of the Kingdom of Saudi Arabia."],
      bullets: [],
    },
  ],
  pageTitle: "Terms and Conditions - Propics",
};

const termsAr: LegalDoc = {
  title: "الشروط والأحكام",
  lastUpdated: "",
  intro: ["مرحبًا بك في نظام بروبكس للمبيعات العقارية. بإستخدامك لهذا النظام، فإنك توافق على الالتزام الكامل بجميع الشروط والأحكام الواردة أدناه. يرجى قراءة هذه الشروط بعناية قبل استخدام النظام."],
  sections: [
    {
      heading: "1. التعريفات",
      paragraphs: [],
      bullets: ["'الشركة': شركة التطبيق الذكي لتقنية المعلومات (بروبكس)", "'النظام': يشير إلى منصة بروبكس لإدارة عمليات المبيعات العقارية بكافة خدماتها وأدواتها", "'العميل': يشير إلى الشخص أو الكيان الذي قام بالاشتراك في استخدام النظام لإدارة مبيعات مشاريعه العقارية.", "'الخدمات': تشمل جميع الوظائف المقدمة عبر النظام بما في ذلك عرض المشاريع العقارية، إصدار العروض، إدارة الحجوزات، متابعة المدفوعات، والتقارير البيعية."],
    },
    {
      heading: "2. الاتفاق القانوني",
      paragraphs: ["يعد استخدام العميل للنظام قبولاً صريحاً والتزاماً كاملاً بالشروط والأحكام المنصوص عليها في هذه الوثيقة. في حال عدم الموافقة على أي جزء من هذه الشروط، لا يجوز للعميل استخدام النظام أو أي من خدماته."],
      bullets: [],
    },
    {
      heading: "3. إنشاء الحساب",
      paragraphs: ["يلتزم العميل بتقديم معلومات دقيقة وكاملة عند إنشاء حسابه على النظام، ويتعهد بالحفاظ على تحديث هذه المعلومات بشكل مستمر. تحتفظ الشركة بالحق في تعليق أو إنهاء أي حساب بناءً على تقديم معلومات خاطئة أو مخالفة للشروط المعتمدة."],
      bullets: [],
    },
    {
      heading: "4. مسؤولية صحة البيانات",
      paragraphs: ["يتحمل العميل كامل المسؤولية عن دقة وصحة جميع البيانات والمعلومات المدخلة إلى النظام، بما في ذلك بيانات العقارات والأسعار والحسابات البنكية وبيانات العملاء. رغم أن الشركة قد تقدم خدمات إدخال بيانات بناءً على طلب العميل، إلا أن المراجعة النهائية واعتماد المعلومات تقع بالكامل على عاتق العميل دون أي التزام أو مسؤولية قانونية على الشركة تجاه النتائج الناجمة عن تلك البيانات."],
      bullets: [],
    },
    {
      heading: "5. إضافة مسوق عقاري",
      paragraphs: ["يلتزم العميل من التأكد من ترخيص المسوق العقاري، وإجراء التعاقدات الرسمية المعمول بها في المملكة العربية السعودية، قبل إضافته إلى مشروعه في نظام بروبكس."],
      bullets: [],
    },
    {
      heading: "6. حماية الحساب",
      paragraphs: ["يلتزم العميل بالحفاظ على سرية معلومات تسجيل الدخول الخاصة به، ويكون مسؤولاً مسؤولية كاملة عن جميع الأنشطة التي تتم عبر حسابه. في حال الاشتباه بأي استخدام غير مصرح به للحساب، يتوجب على العميل إشعار الشركة فورًا."],
      bullets: [],
    },
    {
      heading: "7. استخدام النظام",
      paragraphs: ["يقر العميل باستخدام النظام للأغراض المشروعة والمتعلقة بإدارة مبيعات العقارات، ويمنع استخدام النظام لأي غرض غير قانوني أو قد يسبب ضررًا لأي طرف آخر."],
      bullets: [],
    },
    {
      heading: "8. الملكية الفكرية",
      paragraphs: ["تعود كافة حقوق الملكية الفكرية المتعلقة بالنظام، بما في ذلك البرمجيات، التصاميم، النصوص، والمواد الأخرى، إلى الشركة. ولا يحق للعميل إعادة نشر أو نسخ أو توزيع أي جزء من النظام دون إذن كتابي مسبق من الشركة."],
      bullets: [],
    },
    {
      heading: "9. تحديث الشروط والأحكام",
      paragraphs: ["تحتفظ الشركة بحقها في تعديل أو تحديث الشروط والأحكام في أي وقت، ويتم إخطار العميل بالتحديثات عبر البريد الإلكتروني أو من خلال النظام. استمرار استخدام العميل للنظام بعد التحديثات يُعد موافقة صريحة عليها."],
      bullets: [],
    },
    {
      heading: "10. حماية البيانات والخصوصية",
      paragraphs: ["تلتزم الشركة بحماية بيانات العملاء وفق معايير الأمان المعتمدة، مع الإشارة إلى أن العميل يتحمل جزءاً من المخاطر المرتبطة باستخدام أنظمة الإنترنت، ولا تتحمل الشركة أي مسؤولية عن أي اختراق ناتج عن إهمال العميل."],
      bullets: [],
    },
    {
      heading: "11. إنهاء الحساب",
      paragraphs: ["يحق للعميل إنهاء حسابه في أي وقت بشرط عدم وجود التزامات مالية قائمة. كما تحتفظ الشركة بالحق في إنهاء الحساب في حال مخالفة الشروط أو عدم الالتزام بالتزامات مالية. ولا تلتزم الشركة بإعادة أي مبالغ مدفوعة بعد تفعيل الخدمة."],
      bullets: [],
    },
    {
      heading: "12. حدود المسؤولية",
      paragraphs: ["لا تتحمل الشركة أي مسؤولية عن أي خسائر مباشرة أو غير مباشرة قد تنجم عن استخدام النظام أو الاعتماد على بيانات غير دقيقة مدخلة في النظام. وتقتصر مسؤوليتها على توفير حق الوصول للنظام وفق ما هو متفق عليه."],
      bullets: [],
    },
    {
      heading: "13. التجربة المجانية",
      paragraphs: ["تيح الشركة إمكانية تجربة نظام بروبكس مجانًا وفقًا لسياسة االستخدام التجريبي، ويحق للشركة وحدها قبول أو رفض أي طلب للحصول على هذه التجربة دون إبداء األسباب. تتم التجربة عبر حساب تجريبي خاص بالشركة، وال تشمل تجربة النظام على المخطط العقاري الخاص بالعميل. كما تكون مدة التجربة ومميزاتها محدودة وفق ما تقرره الشركة، وقد ال تشمل جميع وظائف ومزايا النظام المتاحة في االشتراكات المدفوعة."],
      bullets: [],
    },
    {
      heading: "14. القانون الواجب التطبيق وتسوية النزاعات",
      paragraphs: ["تخضع هذه الاتفاقية لأنظمة وقوانين المملكة العربية السعودية."],
      bullets: [],
    },
  ],
  pageTitle: "الأحكام والشروط - بروبكس",
};

const docsByKind: Record<LegalKind, Record<Locale, LegalDoc>> = {
  privacy: { en: privacyEn, ar: privacyAr },
  terms: { en: termsEn, ar: termsAr },
};

export function getLegalDoc(kind: LegalKind, locale: Locale): LegalDoc {
  return docsByKind[kind][locale];
}
