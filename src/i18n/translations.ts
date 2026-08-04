// ============================================
// ÇEVİRİLER — TR · EN
// Tasarım: Portfolyo.dc arayüzü — nokta desenli zemin
// ============================================

export type Dict = typeof tr;

export const tr = {
  lang: "tr",
  dir: "ltr",
  path: "/",
  title: "Şeyma Nur Çebi — Yazılım Mühendisliği Öğrencisi",
  description:
    "Yapay zekâ, prompt engineering ve dil ajanları meraklısı Yazılım Mühendisliği öğrencisi. TEKNOFEST takım kaptanı, T3 Vakfı eğitmeni ve bursiyeri.",

  name: "ŞEYMA NUR ÇEBİ",
  role: "Yazılım Müh.",
  emailLabel: "E-posta",
  skipLink: "İçeriğe atla",
  location: "İstanbul, Türkiye",
  availability: "İş birliğine açık",
  cvLabel: "CV indir",
  cvProfile: "Profil",
  cvBack: "← Siteye dön",
  cvSave: "PDF olarak kaydet",

  navLabel: "Site gezintisi",
  displayName: "Şeyma Nur Çebi",
  cvTitle: "Özgeçmiş",
  nav: { home: "Ana Sayfa", about: "Hakkımda", projects: "Projeler", contact: "İletişim", guestbook: "Defter" },
  pageDesc: {
    about: "Eğitim, deneyim, yarışmalar ve sertifikalar — İstanbul Arel Üniversitesi Yazılım Mühendisliği öğrencisi Şeyma Nur Çebi.",
    projects: "VARIANT-GNN, yapay zekâ dil ajanları, biyobelirteç analizi ve YemekStes — Şeyma Nur Çebi'nin projeleri.",
    contact: "Şeyma Nur Çebi ile iletişime geçin — e-posta, GitHub ve LinkedIn.",
  },

  // Ana sayfa yarışma vitrini — mevcut gerçek verilerden
  highlight: {
    label: "TEKNOFEST 2026 · SAĞLIKTA YAPAY ZEKÂ",
    title: "VARIANT-GNN",
    desc: "Genetik varyantları GNN + Ensemble mimarisiyle sınıflandıran, kararlarını XAI (LIME) ile şeffaflaştıran model. Takım kaptanıyım.",
    score: "93/100",
    scoreLabel: "ÖDR PUANI",
  },
  routes: {
    home: "/",
    about: "/hakkimda",
    projects: "/projeler",
    contact: "/iletisim",
    guestbook: "/defter",
    cv: "/cv",
  },

  now: {
    label: "ŞU AN",
    items: [
      { k: "geliştiriyorum", v: "VARIANT-GNN & Dil Ajanları" },
      { k: "danışmanlık", v: "Dijital Kâşifler — 2. aşama" },
      { k: "stajyerim", v: "Microsoft & T3 Vakfı" },
      { k: "başvurdum", v: "SSB Kuantum Algoritma" },
    ],
    updated: "Son güncelleme · 4 Ağustos 2026",
    note: "Bu kart gerçekten güncel tutuluyor.",
  },

  themeLabel: "GÖRÜNÜM",
  modeLight: "Gündüz",
  modeDark: "Gece",
  langLabel: "DİL",

  hero: {
    hello: "// merhaba, ben",
    h1a: "Şeyma Nur",
    h1b: "Çebi.",
    tagline:
      "İstanbul Arel Üniversitesi Yazılım Mühendisliği'nde 3. sınıf öğrencisiyim — bölüme birincilikle ve tam bursla girdim. Yapay zekâ, dil ajanları ve web projeleriyle fikirleri çalışan ürünlere dönüştürüyorum.",
    cta: "Projelerim",
    photoAlt: "Şeyma Nur Çebi'nin portre fotoğrafı",
  },

  about: {
    no: "01",
    title: "Hakkımda",
    year: "3. Sınıf",
    p1: "İstanbul Arel Üniversitesi Yazılım Mühendisliği'nde tam burslu, bölüme birincilikle girmiş bir 3. sınıf öğrencisiyim; genel ortalamam 3,62. İlgimi çeken şey yapay zekânın teoride kaldığı yer değil, bir işe yaradığı yer: graf sinir ağlarıyla sağlık verisini modellemek, LLM tabanlı ajanlara gerçek bir görev yaptırmak, bir modelin neden o kararı verdiğini açıklayabilmek.",
    p2: "TEKNOFEST'te iki projede takım kaptanıyım. VARIANT-GNN'de genetik varyantları GNN + Ensemble mimarisiyle sınıflandırıyor, kararları XAI (LIME) ile şeffaflaştırıyoruz — ön değerlendirme raporumuz 93/100 aldı. Dil Ajanları projesinde ise LLM tabanlı bir ajan sistemi geliştiriyoruz. Bunların yanında TÜSEB'de biyobelirteç analizi çalışıyor, SSB'nin kuantum algoritma yarışmasına başvurmuş bulunuyorum.",
    p3: "Öğrendiğimi öğretmeyi seviyorum: T3 Vakfı'nda eğitmenim — Deneyap atölyelerinde robotik kodlama ve algoritmik düşünme anlatıyor, yapay zekâ temelli teknoloji eğitiminde elektronik, programlama ve 3D tasarım derslerinde görev alıyorum. Ayrıca ilkokul öğrencilerinden oluşan Dijital Kâşifler takımının danışmanıyım; ilk aşamayı geçtik, şimdi ikincisindeyiz. Bu yaz Microsoft Gönüllü Staj Programı ile T3 Vakfı'nda eş zamanlı stajyerim.",
    skillsLabel: "YETENEKLER",
    skillGroups: { langs: "Diller", ai: "Yapay Zekâ Araçları", tools: "Geliştirme Araçları" },
    eduLabel: "EĞİTİM",
    edu: [
      {
        when: "2024 — 2028",
        title: "İstanbul Arel Üniversitesi — Yazılım Mühendisliği",
        desc: "Bölüme birincilikle, tam burslu girdim. Bu derece bir sonuç değil; sorumluluğunu taşıdığım bir başlangıç.",
        badge: "GNO 3,62 / 4,00",
      },
    ],
    expLabel: "DENEYİM",
    exp: [
      {
        when: "Yaz 2026 — Devam",
        title: "Microsoft & T3 — Eş Zamanlı Staj",
        desc: "İki kurumda aynı anda stajyerim: Microsoft Gönüllü Staj Programı ve T3 Vakfı. Yapay zekâ araçlarını günlük geliştirme akışının içinde kullanmayı, ekip içinde iş çıkarmayı öğreniyorum.",
      },
      {
        when: "2024 — Devam",
        title: "T3 Vakfı — Eğitmen & Bursiyer",
        desc: "Deneyap Teknoloji Atölyeleri'nde robotik kodlama ve algoritmik düşünme eğitimleri veriyorum; aynı zamanda T3 bursiyeriyim. Yapay zekâ temelli teknoloji eğitiminde elektronik, programlama ve 3D tasarımı yapay zekâ desteğiyle anlattım; öğrencilere Antigravity gibi ajanlarla hızlı proje geliştirmede ve 3D tasarımdan robot kola uzanan üretim süreçlerinde rehberlik ettim.",
      },
    ],
    compLabel: "YARIŞMALAR",
    comp: [
      {
        when: "2024 — Devam",
        title: "TEKNOFEST — İki projede takım kaptanı",
        desc: "VARIANT-GNN'de genetik varyant sınıflandırması yapan GNN + Ensemble modelini ve XAI (LIME) açıklanabilirlik katmanını geliştiriyoruz; ön değerlendirme raporu 93/100. Dil Ajanları'nda LLM tabanlı ajan sistemi üzerinde çalışıyoruz. Her iki takımda da kaptanlık, teknik yön ve rapor sorumluluğu bende.",
      },
      {
        when: "2026 — Devam",
        title: "Dijital Kâşifler — Takım Danışmanı",
        desc: "T3 Vakfı bünyesindeki ilkokul takımı Dijital Kâşifler'in danışmanıyım. Çocuklara fikirlerini projeye dönüştürmede rehberlik ediyorum; takım ilk aşamayı başarıyla geçti ve şu an ikinci aşamada çalışıyoruz.",
      },
      {
        when: "2026",
        title: "TÜSEB — Biyobelirteç Analizi",
        desc: "Sağlık teknolojisi kategorisinde biyobelirteç analizi üzerine çalışıyorum; hedef, biyolojik göstergelerden anlamlı ve doğrulanabilir sinyaller çıkarmak.",
      },
      {
        when: "2026",
        title: "SSB — Kuantum Algoritma Yarışması",
        desc: "Savunma Sanayii Başkanlığı'nın kuantum algoritma yarışmasına başvurduk; çalışmalar başlıyor.",
      },
    ],
    academic: {
      label: "AKADEMİK GELİŞİM",
      terms: ["2024–2025 Güz", "2024–2025 Bahar", "2025–2026 Güz", "2025–2026 Bahar"],
      termsShort: ["24/25 Güz", "24/25 Bahar", "25/26 Güz", "25/26 Bahar"],
      gpaLabel: "GENEL ORTALAMA",
      ectsLabel: "TAMAMLANAN AKTS",
      courseLabel: "TAMAMLANAN DERS",
      chartTitle: "Dönem ortalamaları",
      chartDesc:
        "Dönem ortalamaları sırasıyla 3,60 · 3,60 · 3,40 · 3,65; genel ortalama 3,62 / 4,00.",
      scaleNote: "Ölçek 3,00 – 4,00",
      thTerm: "Dönem",
      thCourses: "Ders",
      thCredits: "Kredi",
      thEcts: "AKTS",
      thGpa: "Dönem GNO",
      thCum: "Genel GNO",
    },
    certsLabel: "SERTİFİKALAR",
    certs: [
      {
        org: "SHGM",
        name: "İHA-1 Drone Pilot Lisansı",
        desc: "İnsansız hava aracı pilotaj yetkisi — süresiz.",
      },
      {
        org: "SSB",
        name: "Milli Yetkinlik Hamlesi",
        desc: "Savunma sanayii kariyer programı katılım belgesi.",
      },
      {
        org: "T3 Vakfı",
        name: "Yapay Zekâ Temelli Teknoloji Eğitimi",
        desc: "Eğitmen katılım belgesi — elektronik, programlama ve 3D tasarım eğitimleri.",
      },
    ],
  },

  projects: {
    no: "02",
    title: "Projeler",
    items: [
      {
        title: "VARIANT-GNN",
        desc: "Genetik varyantları GNN + Ensemble mimarisiyle sınıflandıran, kararlarını XAI (LIME) ile şeffaflaştıran sağlıkta yapay zekâ modeli. ÖDR: 93/100.",
        tags: "PyTorch · GNN · XAI · TEKNOFEST 2026",
      },
      {
        title: "Yapay Zekâ Dil Ajanları",
        desc: "TEKNOFEST Dil Ajanları kategorisine başvurduğumuz LLM tabanlı ajan projesi — takım kaptanıyım.",
        tags: "LLM · Ajanlar · TEKNOFEST 2026",
      },
      {
        title: "Yerel RAG Asistanı — Microsoft Foundry Local",
        desc: "Belgelerden kaynak göstererek cevap üreten, tamamen çevrimdışı çalışan soru-cevap asistanı. Türkçe morfolojiye duyarlı arama (noktalı/noktasız I, kesme işaretli ekler, ünlü uyumlu ek ayıklama), anlamsal + kelime tabanlı hibrit retrieval, SQLite'ta vektör depolama. Cevabı belgede yoksa uydurmuyor; ürettiği cevabı denetleyip dayanaksız cümleleri işaretliyor. Yanında 4–6 haftalık yaz okulu müfredatı.",
        tags: "Python · RAG · Foundry Local · SQLite · Çevrimdışı YZ",
      },
      {
        title: "Biyobelirteç Analizi",
        desc: "TÜSEB sağlık teknolojisi kategorisinde biyobelirteç analizi çalışması.",
        tags: "Sağlık Teknolojisi · TÜSEB 2026",
      },
      {
        title: "YemekStes",
        desc: "1. sınıfta ders projesi olarak geliştirdiğim Java konsol uygulaması: nesne yönelimli yemek sipariş sistemi — kalıtım, soyutlama, polimorfizm; JUnit 5 testleri ve CSV kayıt.",
        tags: "Java · OOP · JUnit 5 · Maven",
      },
    ],
  },

  guestbook: {
    no: "04",
    title: "Ziyaretçi Defteri",
    sub: "Uğradığını buraya yazabilirsin — notlar ben onayladıktan sonra yayımlanır.",
    fName: "Adın",
    fMsg: "Notun",
    fSend: "Bırak",
    pending: "Teşekkürler! Notun onaya düştü, kısa sürede yayımlanacak.",
    errorShort: "Adın en az 2, notun en az 3 karakter olmalı.",
    errorRate: "Bugünlük bu kadar yeter :) Biraz sonra tekrar dene.",
    errorGeneric: "Not kaydedilemedi. Biraz sonra tekrar dener misin?",
    empty: "Henüz not yok — ilk yazan sen ol.",
    loading: "Notlar yükleniyor…",
    privacy: "Yalnızca yazdığın ad ve not saklanır. Spam önlemek için IP adresinin gizli bir anahtarla tuzlanmış özeti en fazla 1 saat tutulur, sonra silinir; ham IP hiç kaydedilmez.",
    viewsLabel: "ziyaret",
  },

  contact: {
    no: "03",
    title: "İletişim",
    sub: "Bir fikrin, iş birliği ya da soru mu var? Yaz, konuşalım.",
    fName: "Adınız",
    fEmail: "E-posta adresiniz",
    fMsg: "Mesajınız",
    fSend: "Gönder",
    fHint: "Gönder'e basınca e-posta uygulaman açılır.",
    fSubject: "Web sitesi — iletişim",
    social: "SOSYAL MEDYA",
  },

  footer: "FARKLI DÜŞÜN — FARKLI KODLA",
};

export const en: Dict = {
  lang: "en",
  dir: "ltr",
  path: "/en/",
  title: "Şeyma Nur Çebi — Software Engineering Student",
  description:
    "Software Engineering student passionate about AI, prompt engineering and language agents. TEKNOFEST team captain, T3 Foundation instructor and scholar.",

  name: "ŞEYMA NUR ÇEBİ",
  role: "Software Eng.",
  emailLabel: "Email",
  skipLink: "Skip to content",
  location: "Istanbul, Türkiye",
  availability: "Open to collaboration",
  cvLabel: "Download CV",
  cvProfile: "Profile",
  cvBack: "← Back to site",
  cvSave: "Save as PDF",

  navLabel: "Site navigation",
  displayName: "Şeyma Nur Çebi",
  cvTitle: "Résumé",
  nav: { home: "Home", about: "About", projects: "Projects", contact: "Contact", guestbook: "Guestbook" },
  pageDesc: {
    about: "Education, experience, competitions and certificates — Şeyma Nur Çebi, software engineering student at Istanbul Arel University.",
    projects: "VARIANT-GNN, AI language agents, biomarker analysis and YemekStes — projects by Şeyma Nur Çebi.",
    contact: "Get in touch with Şeyma Nur Çebi — email, GitHub and LinkedIn.",
  },

  highlight: {
    label: "TEKNOFEST 2026 · AI IN HEALTHCARE",
    title: "VARIANT-GNN",
    desc: "A model classifying genetic variants with a GNN + Ensemble architecture, made transparent with XAI (LIME). I'm the team captain.",
    score: "93/100",
    scoreLabel: "PRELIMINARY REPORT SCORE",
  },
  routes: {
    home: "/en/",
    about: "/en/about",
    projects: "/en/projects",
    contact: "/en/contact",
    guestbook: "/en/guestbook",
    cv: "/en/cv",
  },

  now: {
    label: "NOW",
    items: [
      { k: "building", v: "VARIANT-GNN & Language Agents" },
      { k: "mentoring", v: "Dijital Kâşifler — stage 2" },
      { k: "interning", v: "Microsoft & T3 Foundation" },
      { k: "applied", v: "SSB Quantum Algorithm" },
    ],
    updated: "Updated · 4 August 2026",
    note: "This card is kept genuinely up to date.",
  },

  themeLabel: "APPEARANCE",
  modeLight: "Day",
  modeDark: "Night",
  langLabel: "LANG",

  hero: {
    hello: "// hi, i am",
    h1a: "Şeyma Nur",
    h1b: "Çebi.",
    tagline:
      "I'm a third-year software engineering student at Istanbul Arel University — I entered the program ranked first, on a full scholarship. I turn ideas into working products through AI, language agents and web projects.",
    cta: "My Projects",
    photoAlt: "Portrait photo of Şeyma Nur Çebi",
  },

  about: {
    no: "01",
    title: "About Me",
    year: "3rd Year",
    p1: "I'm a third-year Software Engineering student at Istanbul Arel University on a full scholarship, admitted ranked first, with a 3.62 GPA. What draws me isn't AI in theory but AI where it does something: modelling health data with graph neural networks, giving LLM-based agents a real job to do, and being able to explain why a model decided what it decided.",
    p2: "I'm the team captain of two TEKNOFEST projects. In VARIANT-GNN we classify genetic variants with a GNN + Ensemble architecture and make the decisions transparent with XAI (LIME) — our preliminary evaluation report scored 93/100. In the Language Agents project we're building an LLM-based agent system. Alongside these I work on biomarker analysis at TÜSEB and have applied to the Presidency of Defence Industries' quantum algorithm competition.",
    p3: "I like teaching what I learn: I'm an instructor at the T3 Foundation — teaching robotics coding and algorithmic thinking at Deneyap workshops, and covering electronics, programming and 3D design in the AI-based technology education program. I also mentor Dijital Kâşifler, a primary-school team; we cleared the first stage and are now in the second. This summer I'm interning at the Microsoft Volunteer Internship Program and the T3 Foundation simultaneously.",
    skillsLabel: "SKILLS",
    skillGroups: { langs: "Languages", ai: "AI Tools", tools: "Dev Tools" },
    eduLabel: "EDUCATION",
    edu: [
      {
        when: "2024 — 2028",
        title: "Istanbul Arel University — Software Engineering",
        desc: "Entered ranked first, on a full scholarship. That rank isn't a result; it's a starting point I carry responsibility for.",
        badge: "GPA 3.62 / 4.00",
      },
    ],
    expLabel: "EXPERIENCE",
    exp: [
      {
        when: "Summer 2026 — Present",
        title: "Microsoft & T3 — Concurrent Internships",
        desc: "Interning at two places at once: the Microsoft Volunteer Internship Program and the T3 Foundation — learning to use AI tools inside a real development workflow and to ship work as part of a team.",
      },
      {
        when: "2024 — Present",
        title: "T3 Foundation — Instructor & Scholar",
        desc: "I teach robotics coding and algorithmic thinking at the Deneyap Technology Workshops and hold a T3 scholarship. In the AI-based technology education program I taught electronics, programming and 3D design with AI support, guiding students through rapid prototyping with agents like Antigravity and through builds ranging from 3D design to a robotic arm.",
      },
    ],
    compLabel: "COMPETITIONS",
    comp: [
      {
        when: "2024 — Present",
        title: "TEKNOFEST — Captain of Two Teams",
        desc: "In VARIANT-GNN we build the GNN + Ensemble model that classifies genetic variants plus an XAI (LIME) explainability layer; the preliminary evaluation report scored 93/100. In Language Agents we work on an LLM-based agent system. I captain both teams, owning technical direction and reporting.",
      },
      {
        when: "2026 — Present",
        title: "Dijital Kâşifler — Team Mentor",
        desc: "I mentor Dijital Kâşifler, a primary-school team at the T3 Foundation, helping the kids turn their ideas into a working project. The team cleared the first stage and we're now working through the second.",
      },
      {
        when: "2026",
        title: "TÜSEB — Biomarker Analysis",
        desc: "A biomarker analysis study in the health technology category — the goal is extracting meaningful, verifiable signals from biological markers.",
      },
      {
        when: "2026",
        title: "SSB — Quantum Algorithm Competition",
        desc: "We applied to the Presidency of Defence Industries' quantum algorithm competition; work is starting.",
      },
    ],
    academic: {
      label: "ACADEMIC PROGRESS",
      terms: ["2024–2025 Fall", "2024–2025 Spring", "2025–2026 Fall", "2025–2026 Spring"],
      termsShort: ["24/25 Fall", "24/25 Spr", "25/26 Fall", "25/26 Spr"],
      gpaLabel: "CUMULATIVE GPA",
      ectsLabel: "ECTS COMPLETED",
      courseLabel: "COURSES COMPLETED",
      chartTitle: "GPA by semester",
      chartDesc:
        "Semester GPAs are 3.60 · 3.60 · 3.40 · 3.65; cumulative GPA 3.62 / 4.00.",
      scaleNote: "Scale 3.00 – 4.00",
      thTerm: "Semester",
      thCourses: "Courses",
      thCredits: "Credits",
      thEcts: "ECTS",
      thGpa: "Term GPA",
      thCum: "Cumulative",
    },
    certsLabel: "CERTIFICATES",
    certs: [
      {
        org: "SHGM",
        name: "IHA-1 Drone Pilot License",
        desc: "Unmanned aerial vehicle pilot authorization — permanent.",
      },
      {
        org: "SSB",
        name: "National Competence Initiative",
        desc: "Defence industry career program certificate.",
      },
      {
        org: "T3 Foundation",
        name: "AI-Based Technology Education",
        desc: "Instructor certificate — electronics, programming and 3D design classes.",
      },
    ],
  },

  projects: {
    no: "02",
    title: "Projects",
    items: [
      {
        title: "VARIANT-GNN",
        desc: "Healthcare AI model classifying genetic variants with a GNN + Ensemble architecture, made transparent with XAI (LIME). PER: 93/100.",
        tags: "PyTorch · GNN · XAI · TEKNOFEST 2026",
      },
      {
        title: "AI Language Agents",
        desc: "LLM-based agent project submitted to the TEKNOFEST Language Agents category — I'm the team captain.",
        tags: "LLM · Agents · TEKNOFEST 2026",
      },
      {
        title: "Local RAG Assistant — Microsoft Foundry Local",
        desc: "A fully offline question-answering assistant that answers from your own documents with citations. Turkish morphology-aware search (dotted/dotless I, apostrophe suffixes, vowel-harmony stemming), hybrid semantic + keyword retrieval, vector storage in SQLite. It refuses to invent answers that aren't in the documents and audits its own output, flagging unsupported sentences. Ships with a 4–6 week summer-school curriculum.",
        tags: "Python · RAG · Foundry Local · SQLite · Offline AI",
      },
      {
        title: "Biomarker Analysis",
        desc: "Biomarker analysis study in the TÜSEB health technology category.",
        tags: "Health Tech · TÜSEB 2026",
      },
      {
        title: "YemekStes",
        desc: "Java console app I built as a first-year course project: an object-oriented food-ordering system — inheritance, abstraction, polymorphism; JUnit 5 tests and CSV persistence.",
        tags: "Java · OOP · JUnit 5 · Maven",
      },
    ],
  },

  guestbook: {
    no: "04",
    title: "Guestbook",
    sub: "Leave a note to say you stopped by — notes appear after I approve them.",
    fName: "Your name",
    fMsg: "Your note",
    fSend: "Leave note",
    pending: "Thank you! Your note is awaiting approval and will appear shortly.",
    errorShort: "Name needs 2+ characters, note needs 3+.",
    errorRate: "That's enough for now :) Please try again a bit later.",
    errorGeneric: "Could not save the note. Please try again shortly.",
    empty: "No notes yet — be the first.",
    loading: "Loading notes…",
    privacy: "Only the name and note you type are stored. To prevent spam a salted hash of your IP is kept for at most 1 hour, then deleted; the raw IP is never saved.",
    viewsLabel: "visits",
  },

  contact: {
    no: "03",
    title: "Contact",
    sub: "Got an idea, a collaboration or a question? Write me, let's talk.",
    fName: "Your name",
    fEmail: "Your email",
    fMsg: "Your message",
    fSend: "Send",
    fHint: "Pressing Send opens your email app.",
    fSubject: "Website contact",
    social: "SOCIAL MEDIA",
  },

  footer: "THINK DIFFERENT — CODE DIFFERENT",
};

// Ortak: dilden bağımsız yetenek çipleri — etiketleri her dilin
// about.skillGroups sözlüğünden gelir
export const SKILL_GROUPS = [
  { key: "langs", items: ["Python", "Java", "JavaScript", "C", "C++"] },
  { key: "ai", items: ["Claude Code", "Antigravity", "Prompt Engineering"] },
  { key: "tools", items: ["Git", "VS Code", "Cursor"] },
] as const;

export const locales = { tr, en };
