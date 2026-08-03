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
  cvPath: "/cv",
  cvProfile: "Profil",
  cvBack: "← Siteye dön",
  cvSave: "PDF olarak kaydet",

  nav: { home: "Ana Sayfa", about: "Hakkımda", projects: "Projeler", contact: "İletişim" },

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
    cv: "/cv",
  },

  now: {
    label: "ŞU AN",
    items: [
      { k: "öğreniyorum", v: "Yapay zekâ & LLM" },
      { k: "geliştiriyorum", v: "VARIANT-GNN & Yapay Zekâ Dil Ajanları" },
    ],
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
    year: "3'ncü Sınıf",
    p1: "İstanbul Arel Üniversitesi'nde tam burslu Yazılım Mühendisliği öğrencisiyim — bölüme birincilikle girdim. Yapay zekâ, prompt engineering ve dil ajanlarına tutkuyla bağlıyım.",
    p2: "T3 Vakfı'nda hem eğitmen hem bursiyerim; bu yaz Microsoft ve T3'te eş zamanlı stajyerim. Hedefim: fark yaratan, temiz ve işe yarar yazılımlar.",
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
        desc: "Microsoft Gönüllü Staj Programı'nda ve T3 Vakfı bünyesinde eş zamanlı stajyerim.",
      },
      {
        when: "2024 — Devam",
        title: "T3 Vakfı — Eğitmen & Bursiyer",
        desc: "Deneyap Teknoloji Atölyeleri'nde eğitmenim ve T3 bursiyeriyim; robotik kodlama ve algoritmik düşünme eğitimleri veriyorum.",
      },
    ],
    compLabel: "YARIŞMALAR",
    comp: [
      {
        when: "2024 — Devam",
        title: "TEKNOFEST — İki projede takım kaptanı",
        desc: "VARIANT-GNN (sağlıkta yapay zekâ, ÖDR: 93/100) ve Yapay Zekâ Dil Ajanları projelerinde takım kaptanıyım.",
      },
      {
        when: "2026 — Devam",
        title: "Dijital Kâşifler — Takım Danışmanı",
        desc: "T3 Vakfı bünyesinde bir ilkokul takımına danışmanlık yapıyorum. Takım ilk aşamayı başarıyla geçti; şu an ikinci aşamada çalışıyoruz.",
      },
      {
        when: "2026",
        title: "TÜSEB — Biyobelirteç Analizi",
        desc: "Sağlık teknolojisi kategorisinde biyobelirteç analizi çalışması yürütüyorum.",
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
  cvPath: "/en/cv",
  cvProfile: "Profile",
  cvBack: "← Back to site",
  cvSave: "Save as PDF",

  nav: { home: "Home", about: "About", projects: "Projects", contact: "Contact" },

  highlight: {
    label: "TEKNOFEST 2026 · AI IN HEALTHCARE",
    title: "VARIANT-GNN",
    desc: "A model classifying genetic variants with a GNN + Ensemble architecture, made transparent with XAI (LIME). I'm the team captain.",
    score: "93/100",
    scoreLabel: "PER SCORE",
  },
  routes: {
    home: "/en/",
    about: "/en/about",
    projects: "/en/projects",
    contact: "/en/contact",
    cv: "/en/cv",
  },

  now: {
    label: "NOW",
    items: [
      { k: "learning", v: "AI & LLMs" },
      { k: "building", v: "VARIANT-GNN & AI Language Agents" },
    ],
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
    p1: "I'm a full-scholarship Software Engineering student at Istanbul Arel University — I entered the program ranked first. I'm passionate about AI, prompt engineering and language agents.",
    p2: "At the T3 Foundation I'm both an instructor and a scholar; this summer I'm interning at Microsoft and T3 simultaneously. My goal: clean, useful software that makes a difference.",
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
        desc: "Interning simultaneously at the Microsoft Volunteer Internship Program and the T3 Foundation.",
      },
      {
        when: "2024 — Present",
        title: "T3 Foundation — Instructor & Scholar",
        desc: "I teach robotics coding and algorithmic thinking at the Deneyap Technology Workshops, and I'm a T3 scholar.",
      },
    ],
    compLabel: "COMPETITIONS",
    comp: [
      {
        when: "2024 — Present",
        title: "TEKNOFEST — Captain of Two Teams",
        desc: "Team captain of VARIANT-GNN (AI in healthcare, PER: 93/100) and the AI Language Agents project.",
      },
      {
        when: "2026 — Present",
        title: "Dijital Kâşifler — Team Mentor",
        desc: "I mentor a primary-school team at the T3 Foundation. The team cleared the first stage; we're now working through the second.",
      },
      {
        when: "2026",
        title: "TÜSEB — Biomarker Analysis",
        desc: "A biomarker analysis study in the health technology category.",
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
