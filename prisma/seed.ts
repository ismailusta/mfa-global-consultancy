import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@mfaglobalconsultancy.com" },
    update: { passwordHash, name: "Site Admin" },
    create: {
      email: "admin@mfaglobalconsultancy.com",
      passwordHash,
      name: "Site Admin",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {
      siteUrl: "https://mfaglobalconsultancy.com",
      seoTitle: "MFA Global Consultancy LLC | Visa, Documents & E-Commerce",
      seoDescription:
        "MFA Global Consultancy LLC provides administrative support for electronic applications, document preparation, and online commerce services worldwide.",
      seoKeywords:
        "MFA Global Consultancy, visa application assistance, document preparation, e-commerce, Wyoming LLC, dropshipping",
      defaultLocale: "en",
      enableTr: true,
    },
    create: {
      id: "main",
      companyName: "MFA GLOBAL CONSULTANCY LLC",
      companyShortName: "MFA",
      tagline: "Documentation & Commerce Services",
      showTopBar: true,
      showStats: true,
      topBarLeft: "Registered in the State of Wyoming, United States",
      topBarRight: "info@mfaglobalconsultancy.com",
      email: "info@mfaglobalconsultancy.com",
      phone: "[+1 phone number]",
      registeredAddress: "[Registered agent address], Sheridan, WY 82801",
      businessAddress: "[Trading / operating address]",
      jurisdiction: "State of Wyoming, United States",
      entityType: "Limited Liability Company",
      legalName: "MFA GLOBAL CONSULTANCY LLC",
      ein: "[EIN number]",
      businessHours: "Monday – Friday, 09:00 – 18:00 (UTC+3)",
      footerNote: "Wyoming, United States\n[Registered agent address]\nSheridan, WY 82801\ninfo@mfaglobalconsultancy.com",
      copyrightText: "© 2026 MFA Global Consultancy LLC. All rights reserved.",
      disclaimerLine: "A private company. Not a government body or agency.",
      heroEyebrow: "Wyoming, United States",
      heroTitle: "Application support, documentation and online commerce services",
      heroText:
        "MFA Global Consultancy LLC assists individuals and businesses with the preparation and submission of electronic applications, and operates online retail and digital commercial services for customers worldwide.",
      heroCtaPrimary: "Our services",
      heroCtaSecondary: "Contact us",
      heroImageLabel: "[ image: office / team photograph ]",
      homeServicesEyebrow: "What we do",
      homeServicesTitle: "Five defined lines of business",
      homeServicesIntro:
        "Our activities fall into two related groups: administrative support for electronic applications and document preparation, and online commerce through our own retail channels. Both are conducted remotely for customers in multiple countries.",
      howWeWorkTitle: "How we work",
      howWeWorkP1:
        "Every engagement begins with a written scope and a fixed service fee. We confirm the requirements of the relevant application or order, collect the necessary information from the client, prepare and review the file, and submit or fulfil it through the appropriate channel.",
      howWeWorkP2:
        "Clients receive a confirmation and reference for every submission or shipment, and are notified of the outcome as soon as it is available to us.",
      ctaTitle: "Discuss your requirement with us",
      ctaText: "Written enquiries are answered within two business days.",
      ctaButton: "Contact",
      aboutEyebrow: "About us",
      aboutTitle: "A United States limited liability company serving international clients",
      aboutParagraphs: JSON.stringify([
        "MFA Global Consultancy LLC is a limited liability company registered in the State of Wyoming, United States. The company provides administrative support services for electronic applications and document preparation, and operates online retail and digital commercial services.",
        "We work remotely with individual and business clients in Europe, the Middle East and North America. Our role is administrative: we prepare, organise and submit information on behalf of our clients, and we sell goods and services through our own online channels. We are not a law firm, an immigration adviser, a government body or an agency of any government.",
        "All fees are charged for our own preparation and handling work. Official government fees, where applicable, are separate and are payable to the relevant authority.",
      ]),
      aboutAsideNote:
        "The registered address above is the company's address of record with the State of Wyoming. Day-to-day operations are carried out from the principal place of business.",
      aboutImageLabel: "[ image: workplace photograph ]",
      servicesEyebrow: "Services",
      servicesTitle: "Our lines of business",
      servicesIntro:
        "The company carries out the following activities. Each is delivered remotely, under a written scope and an agreed service fee.",
      commerceEyebrow: "E-Commerce",
      commerceTitle: "Online retail and dropshipping",
      commerceIntro:
        "We sell consumer goods and digital products online through our own storefronts and third-party marketplaces, and we operate a supplier-fulfilled retail model.",
      commerceCategories: JSON.stringify([
        "Home and lifestyle goods",
        "Personal accessories and small consumer electronics accessories",
        "Stationery and office supplies",
        "Digital products and downloadable templates",
      ]),
      commerceChannels: JSON.stringify([
        "Company-operated online store",
        "Third-party marketplaces and platforms",
        "Direct business-to-business orders",
      ]),
      commerceProcessTitle: "Order and fulfilment process",
      commerceProcessBody:
        "Orders are placed and paid for online. Under the dropshipping model, goods are shipped directly from the supplier to the customer; tracking information is sent to the customer once the order leaves the supplier.\n\nTypical handling time is 1–3 business days, with delivery times depending on destination and carrier. Digital products are delivered by email or download link immediately after payment is confirmed.",
      commercePaymentsTitle: "Payments and currencies",
      commercePaymentsBody:
        "Payments are accepted by card and bank transfer in USD, EUR and GBP through regulated payment providers. Invoices are issued in the name of MFA Global Consultancy LLC.\n\nReturns, cancellations and refunds are handled in accordance with our Refund Policy.",
      visaEyebrow: "Visa & Document Services",
      visaTitle: "Application assistance and document preparation",
      visaIntro:
        "We assist applicants with the preparation and submission of electronic applications. Our service is administrative support only.",
      visaNotice:
        "MFA Global Consultancy LLC is a private company. It is not a government body, embassy, consulate or agency of any government, and is not affiliated with any of them. We do not decide applications and we cannot guarantee that a visa or permit will be granted. Our fees are charged for our own preparation and handling work and are separate from any official government fee.",
      visaAssistTitle: "Visa application assistance",
      visaAssistPoints: JSON.stringify([
        "Review of the applicant's situation against the published requirements of the relevant electronic application system",
        "Preparation and completion of application forms with information supplied by the applicant",
        "Collection, organisation and completeness check of supporting documents",
        "Submission of the application to the relevant official system on the applicant's behalf",
        "Communication of the outcome and delivery of the issued document to the applicant",
      ]),
      visaDocTitle: "Document preparation services",
      visaDocPoints: JSON.stringify([
        "Preparation of forms and application files for online procedures",
        "Formatting, checking and compilation of supporting documentation",
        "Preparation of standard business correspondence and application letters",
        "Coordination of translation and certification through third-party providers",
        "Record-keeping and reference tracking for submitted files",
      ]),
      contactEyebrow: "Contact",
      contactTitle: "Get in touch",
      contactFormNote:
        "Enquiries are answered within two business days. Please do not send passport scans or other identity documents until a service agreement is in place.",
      legalUpdatedAt: "1 August 2026",
      siteUrl: "https://mfaglobalconsultancy.com",
      seoTitle: "MFA Global Consultancy LLC | Visa, Documents & E-Commerce",
      seoDescription:
        "MFA Global Consultancy LLC provides administrative support for electronic applications, document preparation, and online commerce services worldwide.",
      seoKeywords:
        "MFA Global Consultancy, visa application assistance, document preparation, e-commerce, Wyoming LLC, dropshipping",
      ogImageUrl: "",
      twitterHandle: "",
      googleVerification: "",
      bingVerification: "",
      defaultLocale: "en",
      enableTr: true,
    },
  });

  await prisma.navItem.deleteMany();
  const navItems = [
    { label: "Home", href: "/", sortOrder: 1, tr: "Ana Sayfa" },
    { label: "About Us", href: "/about", sortOrder: 2, tr: "Hakkımızda" },
    { label: "Services", href: "/services", sortOrder: 3, tr: "Hizmetler" },
    { label: "E-Commerce", href: "/commerce", sortOrder: 4, tr: "E-Ticaret" },
    { label: "Visa & Document Services", href: "/visa", sortOrder: 5, tr: "Vize ve Belge Hizmetleri" },
    { label: "Contact", href: "/contact", sortOrder: 6, tr: "İletişim" },
  ];
  for (const item of navItems) {
    const created = await prisma.navItem.create({
      data: { label: item.label, href: item.href, sortOrder: item.sortOrder },
    });
    await prisma.translation.upsert({
      where: { locale_key: { locale: "tr", key: `nav.${created.id}.label` } },
      update: { value: item.tr },
      create: { locale: "tr", key: `nav.${created.id}.label`, value: item.tr },
    });
  }

  const trSettings: Record<string, string> = {
    "settings.tagline": "Belge ve Ticaret Hizmetleri",
    "settings.topBarLeft": "Wyoming, Amerika Birleşik Devletleri'nde tescilli",
    "settings.heroEyebrow": "Wyoming, Amerika Birleşik Devletleri",
    "settings.heroTitle": "Başvuru desteği, dokümantasyon ve online ticaret hizmetleri",
    "settings.heroText":
      "MFA Global Consultancy LLC, bireyler ve işletmeler için elektronik başvuru hazırlığı ve gönderiminde yardımcı olur; dünya genelinde online perakende ve dijital ticari hizmetler sunar.",
    "settings.heroCtaPrimary": "Hizmetlerimiz",
    "settings.heroCtaSecondary": "İletişim",
    "settings.homeServicesEyebrow": "Ne yapıyoruz",
    "settings.homeServicesTitle": "Beş tanımlı iş kolu",
    "settings.homeServicesIntro":
      "Faaliyetlerimiz iki grupta toplanır: elektronik başvurular ve belge hazırlığı için idari destek ile kendi perakende kanallarımız üzerinden online ticaret. Her ikisi de birden fazla ülkede müşterilere uzaktan sunulur.",
    "settings.howWeWorkTitle": "Nasıl çalışıyoruz",
    "settings.ctaTitle": "İhtiyacınızı bizimle görüşün",
    "settings.ctaText": "Yazılı talepler iki iş günü içinde yanıtlanır.",
    "settings.ctaButton": "İletişim",
    "settings.aboutEyebrow": "Hakkımızda",
    "settings.aboutTitle": "Uluslararası müşterilere hizmet veren ABD limited şirket",
    "settings.servicesEyebrow": "Hizmetler",
    "settings.servicesTitle": "İş kollarımız",
    "settings.commerceEyebrow": "E-Ticaret",
    "settings.commerceTitle": "Online perakende ve dropshipping",
    "settings.visaEyebrow": "Vize ve Belge Hizmetleri",
    "settings.visaTitle": "Başvuru desteği ve belge hazırlama",
    "settings.contactEyebrow": "İletişim",
    "settings.contactTitle": "Bize ulaşın",
    "settings.seoTitle": "MFA Global Consultancy LLC | Vize, Belge ve E-Ticaret",
    "settings.seoDescription":
      "MFA Global Consultancy LLC; elektronik başvurular, belge hazırlama ve online ticaret hizmetlerinde idari destek sağlar.",
  };
  for (const [key, value] of Object.entries(trSettings)) {
    await prisma.translation.upsert({
      where: { locale_key: { locale: "tr", key } },
      update: { value },
      create: { locale: "tr", key, value },
    });
  }

  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: [
      { value: "2024", label: "Year established", sortOrder: 1 },
      { value: "5", label: "Service lines", sortOrder: 2 },
      { value: "Remote", label: "Operating model", sortOrder: 3 },
      { value: "EN / TR", label: "Support languages", sortOrder: 4 },
    ],
  });

  await prisma.processStep.deleteMany();
  await prisma.processStep.createMany({
    data: [
      {
        section: "home",
        code: "01 — SCOPE",
        text: "Requirements confirmed in writing, service fee agreed before any work starts.",
        sortOrder: 1,
      },
      {
        section: "home",
        code: "02 — PREPARATION",
        text: "Information and documents collected, organised and checked for completeness.",
        sortOrder: 2,
      },
      {
        section: "home",
        code: "03 — SUBMISSION & FOLLOW-UP",
        text: "Application filed or order fulfilled; client informed of status and outcome.",
        sortOrder: 3,
      },
      {
        section: "visa",
        code: "01",
        text: "Enquiry and eligibility check against published requirements.",
        sortOrder: 1,
      },
      {
        section: "visa",
        code: "02",
        text: "Written quotation and service agreement; service fee paid.",
        sortOrder: 2,
      },
      {
        section: "visa",
        code: "03",
        text: "Information and documents collected, prepared and checked.",
        sortOrder: 3,
      },
      {
        section: "visa",
        code: "04",
        text: "Application submitted; outcome reported to the applicant.",
        sortOrder: 4,
      },
    ],
  });

  await prisma.service.deleteMany();
  const services = [
    {
      number: "01",
      title: "Visa Application Assistance",
      summary:
        "Preparation of electronic visa applications, organisation of required information and documents, and submission to the relevant official system.",
      body: "We assist applicants with the preparation and submission of electronic visa applications. The service covers form completion, document organisation and filing through the relevant official system. Visa approval is never guaranteed; the decision rests entirely with the competent authority. The Company is not a government body and is not affiliated with any embassy or consulate.",
      points: [
        "Eligibility review against published official requirements",
        "Completion of application forms from client-supplied information",
        "Document checklist, collection and completeness review",
        "Submission to the relevant official electronic system",
        "Outcome notification and delivery of the issued document",
      ],
      sortOrder: 1,
    },
    {
      number: "02",
      title: "Document Preparation Services",
      summary:
        "Preparation, review and compilation of documents for a range of online applications and business procedures.",
      body: "We prepare and check documentation for clients making a range of online applications, from business registrations to platform and account applications.",
      points: [
        "Form and application file preparation",
        "Formatting, proofreading and compilation of supporting documents",
        "Standard business correspondence and cover letters",
        "Coordination of third-party translation and certification",
        "File archiving and reference tracking",
      ],
      sortOrder: 2,
    },
    {
      number: "03",
      title: "E-Commerce",
      summary:
        "Sale of consumer goods and digital products over the internet through our own storefront and third-party marketplaces.",
      body: "The Company sells goods and digital products over the internet to consumers and businesses, through its own online store and through third-party marketplaces.",
      points: [
        "Home, lifestyle and accessory product ranges",
        "Digital products and downloadable templates",
        "Card and bank transfer payments in USD, EUR and GBP",
        "Invoicing issued in the name of the Company",
      ],
      sortOrder: 3,
    },
    {
      number: "04",
      title: "Dropshipping & Online Retail",
      summary:
        "An online sales model in which goods are shipped directly from the supplier to the end customer.",
      body: "Under our dropshipping model, goods ordered by the customer are shipped directly by the supplier to the customer's address. The Company handles listing, pricing, order management, customer service and after-sales support.",
      points: [
        "Supplier selection and product listing management",
        "Order routing and fulfilment coordination",
        "Tracking information and delivery follow-up",
        "Returns and refunds handled under our Refund Policy",
      ],
      sortOrder: 4,
    },
    {
      number: "05",
      title: "Digital & Commercial Services",
      summary:
        "Administrative and commercial support services delivered remotely to business clients.",
      body: "A range of commercial and administrative support services delivered remotely to business clients.",
      points: [
        "Back-office and administrative support",
        "Supplier and customer correspondence handling",
        "Order and record management",
        "Market and product research reporting",
      ],
      sortOrder: 5,
    },
  ];

  for (const s of services) {
    await prisma.service.create({
      data: { ...s, points: JSON.stringify(s.points) },
    });
  }

  const legal = [
    {
      slug: "terms",
      title: "Terms of Service",
      content: [
        {
          h: "1. About these terms",
          p: [
            'These Terms of Service govern the use of the website and the services provided by MFA Global Consultancy LLC, a limited liability company registered in the State of Wyoming, United States ("the Company", "we", "us"). By requesting a service or placing an order, the client accepts these terms.',
          ],
        },
        {
          h: "2. Nature of our services",
          p: [
            "The Company provides administrative support services, including the preparation and submission of electronic applications, document preparation, and the sale of goods and services online.",
            "The Company is not a law firm, immigration adviser, embassy, consulate, government body or agency of any government, and is not affiliated with any of them. We do not provide legal advice and we do not decide applications.",
          ],
        },
        {
          h: "3. No guarantee of outcome",
          p: [
            "Decisions on visa, permit or similar applications are made solely by the competent authority. The Company cannot influence or guarantee any outcome, nor the processing time of any authority.",
          ],
        },
        {
          h: "4. Fees",
          p: [
            "Service fees are quoted in writing before work begins and cover the Company's own preparation, handling and submission work. Official government fees and third-party charges are separate and are payable in addition.",
            "Payment is due before work commences unless otherwise agreed in writing.",
          ],
        },
        {
          h: "5. Client obligations",
          p: [
            "The client is responsible for the accuracy, completeness and legality of all information and documents supplied. The Company is not liable for consequences arising from incorrect, incomplete, misleading or fraudulent information provided by the client.",
          ],
        },
        {
          h: "6. Limitation of liability",
          p: [
            "To the fullest extent permitted by law, the Company's total liability in relation to any service is limited to the service fee paid for that service. The Company is not liable for indirect or consequential loss, including travel costs, lost earnings or missed appointments.",
          ],
        },
        {
          h: "7. Governing law",
          p: [
            "These terms are governed by the laws of the State of Wyoming, United States. Disputes shall be subject to the exclusive jurisdiction of the courts of that state.",
          ],
        },
        {
          h: "8. Contact",
          p: ["Questions about these terms may be sent to info@mfaglobalconsultancy.com."],
        },
      ],
    },
    {
      slug: "privacy",
      title: "Privacy Policy",
      content: [
        {
          h: "1. Data controller",
          p: [
            "MFA Global Consultancy LLC, Wyoming, United States, is responsible for the personal data processed through this website and in the course of providing its services. Contact: info@mfaglobalconsultancy.com.",
          ],
        },
        {
          h: "2. Data we collect",
          p: [
            "We collect identification and contact details (name, date of birth, nationality, passport details, address, email, telephone), application-related documents supplied by the client, order and delivery details, and payment confirmation data received from our payment providers.",
            "We do not store full card numbers. Card payments are processed by regulated third-party payment providers.",
          ],
        },
        {
          h: "3. Purpose and legal basis",
          p: [
            "Personal data is processed to perform the contract with the client, to prepare and submit applications, to fulfil orders, to meet legal and accounting obligations, and to respond to enquiries.",
          ],
        },
        {
          h: "4. Sharing",
          p: [
            "Data is shared only where necessary: with the relevant official application system or authority, with suppliers and carriers for order fulfilment, with payment providers, and with professional advisers or authorities where required by law. We do not sell personal data.",
          ],
        },
        {
          h: "5. Retention",
          p: [
            "Application and transaction records are retained for as long as required by applicable law and accounting rules, and are then deleted or anonymised.",
          ],
        },
        {
          h: "6. Your rights",
          p: [
            "Clients may request access to, correction of, or deletion of their personal data, and may object to certain processing, by writing to info@mfaglobalconsultancy.com. We respond to such requests within thirty days.",
          ],
        },
        {
          h: "7. Security",
          p: [
            "We apply appropriate technical and organisational measures to protect personal data, including encrypted transmission and restricted access to client files.",
          ],
        },
        {
          h: "8. Cookies",
          p: [
            "The website uses only essential cookies required for its operation and, where enabled, anonymous analytics. No advertising cookies are used.",
          ],
        },
      ],
    },
    {
      slug: "refund",
      title: "Refund Policy",
      content: [
        {
          h: "1. Scope",
          p: [
            "This policy applies to service fees charged by MFA Global Consultancy LLC and to goods and digital products sold through its online channels.",
          ],
        },
        {
          h: "2. Service fees",
          p: [
            "A full refund of the service fee is available if the client cancels before preparation work has started.",
            "Once preparation or submission work has begun, the service fee is non-refundable, as it covers work already performed. Official government fees paid to an authority cannot be refunded by the Company under any circumstances.",
          ],
        },
        {
          h: "3. Rejected applications",
          p: [
            "A rejected application does not entitle the client to a refund of the service fee, as the fee covers preparation and submission, not the outcome. Where a rejection is caused by a demonstrable error on our part, the application will be re-prepared and re-submitted at no additional service fee.",
          ],
        },
        {
          h: "4. Physical goods",
          p: [
            "Unused goods in their original condition may be returned within 14 days of delivery. Return shipping is paid by the customer unless the item was faulty or incorrect. Refunds are issued to the original payment method within 10 business days of the returned item being received and inspected.",
          ],
        },
        {
          h: "5. Digital products",
          p: [
            "Digital products are non-refundable once the download link has been accessed, except where the product is faulty or materially different from its description.",
          ],
        },
        {
          h: "6. Cancelled orders",
          p: [
            "Orders may be cancelled free of charge before dispatch. Once an order has been dispatched by the supplier, the return procedure in section 4 applies.",
          ],
        },
        {
          h: "7. How to request a refund",
          p: [
            "Refund requests should be sent to info@mfaglobalconsultancy.com with the order or file reference. We confirm receipt within two business days.",
          ],
        },
      ],
    },
  ];

  for (const page of legal) {
    await prisma.legalPage.upsert({
      where: { slug: page.slug },
      update: { title: page.title, content: JSON.stringify(page.content) },
      create: {
        slug: page.slug,
        title: page.title,
        content: JSON.stringify(page.content),
      },
    });
  }

  const media = [
    { key: "hero", label: "[ image: office / team photograph ]" },
    { key: "about", label: "[ image: workplace photograph ]" },
    { key: "product1", label: "[ product shot 1 ]" },
    { key: "product2", label: "[ product shot 2 ]" },
    { key: "product3", label: "[ product shot 3 ]" },
  ];
  for (const m of media) {
    await prisma.mediaAsset.upsert({
      where: { key: m.key },
      update: { label: m.label },
      create: { key: m.key, label: m.label, url: "" },
    });
  }

  console.log("Seed complete.");
  console.log("Admin: admin@mfaglobalconsultancy.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
