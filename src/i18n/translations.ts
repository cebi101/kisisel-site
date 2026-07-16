// ============================================
// ÇEVİRİLER — TR (varsayılan) · EN · DE
// Not: bazı değerler HTML içerir, set:html ile basılır
// ============================================

export type Dict = typeof tr;

export const tr = {
  lang: "tr",
  path: "/",
  title: "Şeyma Nur Çebi — Yazılım Mühendisliği Öğrencisi",
  description:
    "Yapay zekâ, prompt engineering ve dil ajanları meraklısı Yazılım Mühendisliği öğrencisi. TEKNOFEST takım kaptanı, T3 Vakfı eğitmeni ve bursiyeri.",

  files: {
    giris: "giris.tsx",
    hakkimda: "hakkimda.md",
    yolculuk: "yolculuk.log",
    uzmanlik: "uzmanlik.json",
    projeler: "projeler.ts",
    iletisim: "iletisim.sh",
  },

  code: {
    rol: "Yazılım Müh. Öğrencisi",
    odak: ["yapay zekâ", "dil ajanları"],
    suAn: "Microsoft & T3 stajyeri",
  },

  nav: {
    giris: "Giriş",
    hakkimda: "Hakkımda",
    yolculuk: "Yolculuk",
    uzmanlik: "Uzmanlık",
    projeler: "Projeler",
    iletisim: "İletişim",
  },

  hero: {
    eyebrow: "Şeyma Nur Çebi — Yazılım Mühendisliği Öğrencisi",
    h1: `Fikirleri, yapay zekâ ile<br /><span class="accent">çalışan ürünlere</span> dönüştürüyorum.`,
    lead: "Yapay zekâ, prompt engineering ve dil ajanlarına tutku duyan bir Yazılım Mühendisliği öğrencisiyim. Sağlık teknolojisi ve açıklanabilir yapay zekâ üzerine projeler geliştiriyor; ulusal yarışmalarda takım kaptanlığı yapıyorum.",
    btnProjects: "Projelerimi İncele",
    btnContact: "İletişime Geç",
    meta: [
      { k: "konum", v: "İstanbul, Türkiye" },
      { k: "egitim", v: "Arel Ünv. — Yazılım Müh." },
      { k: "su_an", v: "Microsoft & T3 — Stajyer" },
    ],
    captionL: "fig. 01 — Şeyma Nur Çebi",
    captionR: "İstanbul, 2026",
    photoAlt: "Şeyma Nur Çebi'nin portre fotoğrafı",
  },

  strip: ["yapay zekâ", "dil ajanları", "prompt engineering", "takım kaptanı", "T3 eğitmeni & bursiyeri", "drone pilotu"],

  about: {
    eyebrow: "Hakkımda",
    title: "Kısaca ben",
    p1: `<strong>İstanbul Arel Üniversitesi'nde tam burslu Yazılım Mühendisliği öğrencisiyim — bölüme birincilikle girdim.</strong> Yapay zekâ, prompt engineering ve dil ajanlarına tutkuyla bağlıyım; sağlık teknolojisi ve açıklanabilir yapay zekâ (XAI) üzerine projeler geliştiriyorum.`,
    p2: `T3 Vakfı'nda hem eğitmen hem bursiyerim; bu yaz eş zamanlı olarak <em>Microsoft Gönüllü Staj Programı'nda ve T3 bünyesinde stajyerim</em>. İki ayrı TEKNOFEST projesinde takım kaptanıyım; BTK ve TÜSEB ulusal yarışmalarında da projeler yürütüyorum. Öğrendiğimi paylaşmak, öğrenmenin en kalıcı hali bence.`,
    stats: [
      { num: "1.", cap: "Bölüme giriş derecesi" },
      { num: "%100", count: "100", prefix: "%", cap: "Burs oranı" },
      { num: "93/100", count: "93", suffix: "/100", cap: "TEKNOFEST ÖDR puanı" },
    ],
  },

  certs: {
    eyebrow: "Sertifikalar & Lisanslar",
    title: "Belgeli meraklar",
    items: [
      {
        org: "SHGM — Sivil Havacılık Genel Müdürlüğü",
        name: "IHA-1 Sportif / Amatör Pilot Lisansı",
        desc: "İnsansız hava aracı (drone) pilotaj yetkisi — süresiz lisans.",
      },
      {
        org: "SSB — Savunma Sanayii Başkanlığı",
        name: "Milli Yetkinlik Hamlesi",
        desc: "Savunma sanayii kariyer ve yetkinlik programı katılım belgesi.",
      },
    ],
  },

  journey: {
    eyebrow: "Yolculuk",
    title: "Bugüne gelen adımlar",
    desc: "Eğitim, gönüllülük ve yarışmalar — kronolojik bir özet.",
    items: [
      {
        when: "2024 — Üniversite",
        title: "Arel Üniversitesi — Yazılım Mühendisliği",
        desc: "Bölüme birincilikle, tam burslu olarak girdim (2024–2028). Bu derece bir sonuç değil; sorumluluğunu taşıdığım bir başlangıç.",
      },
      {
        when: "2024 — T3 Vakfı",
        title: "T3 Vakfı — Eğitmen & Bursiyer",
        desc: "Deneyap Teknoloji Atölyeleri'nde eğitmenim ve T3 bursiyeriyim; öğrencilere robotik kodlama ve algoritmik düşünme eğitimleri veriyorum.",
      },
      {
        when: "2024 → Devam",
        title: "TEKNOFEST — İki projede takım kaptanı",
        desc: "VARIANT-GNN (sağlıkta yapay zekâ, ÖDR: 93/100) ve Yapay Zekâ Dil Ajanları projelerinde takım kaptanıyım; iki koldan TEKNOFEST 2026 yolundayız.",
      },
      {
        when: "2026 — Yarışmalar",
        title: "BTK & TÜSEB",
        desc: "BTK ulusal teknoloji yarışmasında sunum aşamasına gelen bir yazılım projesi; TÜSEB'de sağlık teknolojisi kategorisinde biyobelirteç analizi çalışması yürütüyorum.",
      },
      {
        when: "Yaz 2026 — Şu An",
        title: "Microsoft & T3 — Eş Zamanlı Staj",
        desc: "Microsoft Gönüllü Staj Programı'nda ve T3 Vakfı bünyesinde eş zamanlı stajyerim; yazılım geliştirme süreçlerini ve kurumsal teknoloji ekosistemini sahada deneyimliyorum.",
      },
    ],
  },

  skills: {
    eyebrow: "Uzmanlık",
    title: "Neler yapıyorum",
    desc: "Dört ana alanda üretiyorum; hepsinin kesişiminde tek bir şey var: problem çözmek.",
    items: [
      {
        no: "01",
        title: "Yapay Zekâ & Makine Öğrenmesi",
        desc: `Graf sinir ağları ve açıklanabilir yapay zekâ ile sağlık alanında modeller geliştiriyorum. <code>GNN</code> <code>PyTorch</code> <code>XAI</code> <code>Scikit-learn</code> <code>XGBoost</code>`,
      },
      {
        no: "02",
        title: "Prompt Engineering & LLM",
        desc: `Büyük dil modelleriyle üretken sistemler kuruyorum. <code>Few-shot</code> <code>CoT</code> <code>OpenAI API</code> <code>Anthropic API</code>`,
      },
      {
        no: "03",
        title: "Yapay Zekâ Ajanları",
        desc: `Büyük dil modelleriyle görev odaklı, araç kullanan otonom ajanlar tasarlıyorum — TEKNOFEST Yapay Zekâ Dil Ajanları projemizi bu alanda yürütüyorum. <code>LLM Ajanları</code> <code>Tool Use</code> <code>RAG</code>`,
      },
      {
        no: "04",
        title: "Yazılım Geliştirme",
        desc: `Fikirden çalışan ürüne giden her aşamada kod yazıyorum. <code>Python</code> <code>Java</code> <code>JavaScript</code> <code>C</code> <code>C++</code> <code>Docker</code> <code>Linux</code>`,
      },
    ],
  },

  stack: {
    eyebrow: "Stack",
    title: "Araç çantam",
    desc: "Derslerde, yarışmalarda ve kendi projelerimde kullandığım, her dönem genişleyen teknoloji seti.",
    terminalTitle: "seymanur@arel — zsh",
    lines: [
      { cmd: "whoami", out: `Yapay zekâ & dil ajanları meraklısı — <span class="hl-rose">tam burslu</span>, <span class="hl-sky">bölüm birincisi</span>` },
      { cmd: "ls yarismalar/", out: "variant-gnn&nbsp;&nbsp;dil-ajanlari&nbsp;&nbsp;btk&nbsp;&nbsp;tuseb" },
      { cmd: "ps -e | grep staj", out: `microsoft-staj <span class="hl-rose">▸ çalışıyor</span>&nbsp;&nbsp;&nbsp;t3-staj <span class="hl-rose">▸ çalışıyor</span> <span class="cursor"></span>` },
    ],
    chips: ["Python", "Java", "JavaScript", "C", "C++", "PyTorch", "Scikit-learn", "XGBoost", "Git & GitHub", "Docker", "Linux", "OpenAI API", "Anthropic API"],
  },

  learning: {
    eyebrow: "Güncel Odak",
    title: "Şu an masamda olanlar",
    desc: "Aktif olarak yürüttüğüm çalışmalar ve geliştirdiğim yetkinlikler.",
    items: [
      { title: "Yapay Zekâ Dil Ajanları", note: "TEKNOFEST 2026 · takım kaptanı" },
      { title: "BTK Yarışma Projesi", note: "sunum aşamasında" },
      { title: "TÜSEB Biyobelirteç Analizi", note: "sağlık teknolojisi kategorisi" },
      { title: "İngilizce", note: "B1 → hedef B2+" },
    ],
  },

  projects: {
    eyebrow: "Seçilmiş İşler",
    title: "Projeler & Yarışmalar",
    desc: "Ulusal yarışmalarda yürüttüğüm, sağlık ve teknoloji kesişimindeki çalışmalar.",
    linkLabels: { github: "GitHub", view: "İncele" },
    items: [
      {
        dir: "variant-gnn/",
        tag: "TEKNOFEST 2026 · Takım Kaptanı",
        title: "VARIANT-GNN",
        desc: "Genetik varyantları GNN + Ensemble mimarisiyle sınıflandıran, kararlarını XAI (LIME) ile şeffaflaştıran sağlıkta yapay zekâ modeli. ÖDR: 93/100.",
        link: "github",
      },
      {
        dir: "dil-ajanlari/",
        tag: "TEKNOFEST 2026 · Takım Kaptanı",
        title: "Yapay Zekâ Dil Ajanları",
        desc: "TEKNOFEST Yapay Zekâ Dil Ajanları kategorisine başvurduğumuz LLM tabanlı ajan projesi — geliştirme sürecinde.",
        link: "view",
      },
      {
        dir: "btk-proje/",
        tag: "BTK · 2026",
        title: "BTK Yarışma Projesi",
        desc: "Bilgi Teknolojileri ve İletişim Kurumu ulusal yarışması için geliştirdiğimiz yazılım projesi — sunum aşamasında.",
        link: "view",
      },
      {
        dir: "biyobelirtec/",
        tag: "TÜSEB · 2026",
        title: "Biyobelirteç Analizi",
        desc: "Türkiye Sağlık Enstitüleri proje yarışması, sağlık teknolojisi kategorisinde biyobelirteç analizi çalışması.",
        link: "view",
      },
    ],
  },

  contact: {
    eyebrow: "İletişim",
    title: `Birlikte <em>üretelim</em>`,
    desc: "Bir proje fikriniz mi var, staj ya da iş birliği fırsatı mı, yoksa yalnızca tanışmak mı istiyorsunuz? En hızlı e-posta ile dönüş yapıyorum.",
    btn: "E-posta Gönder",
  },

  footer: {
    copyright: "© 2026 Şeyma Nur Çebi — hazır şablon değil, satır satır kodlandı.",
    city: "İstanbul",
  },
};

export const en: Dict = {
  lang: "en",
  path: "/en/",
  title: "Şeyma Nur Çebi — Software Engineering Student",
  description:
    "Software Engineering student passionate about AI, prompt engineering and language agents. TEKNOFEST team captain, T3 Foundation instructor and scholar.",

  files: {
    giris: "home.tsx",
    hakkimda: "about.md",
    yolculuk: "journey.log",
    uzmanlik: "expertise.json",
    projeler: "projects.ts",
    iletisim: "contact.sh",
  },

  code: {
    rol: "Software Eng. Student",
    odak: ["AI", "language agents"],
    suAn: "Microsoft & T3 intern",
  },

  nav: {
    giris: "Home",
    hakkimda: "About",
    yolculuk: "Journey",
    uzmanlik: "Expertise",
    projeler: "Projects",
    iletisim: "Contact",
  },

  hero: {
    eyebrow: "Şeyma Nur Çebi — Software Engineering Student",
    h1: `I turn ideas into<br /><span class="accent">working products</span> with AI.`,
    lead: "I'm a Software Engineering student passionate about AI, prompt engineering and language agents. I build projects in health technology and explainable AI, and lead teams in national competitions.",
    btnProjects: "View My Projects",
    btnContact: "Get In Touch",
    meta: [
      { k: "location", v: "Istanbul, Türkiye" },
      { k: "education", v: "Arel Univ. — Software Eng." },
      { k: "currently", v: "Microsoft & T3 — Intern" },
    ],
    captionL: "fig. 01 — Şeyma Nur Çebi",
    captionR: "Istanbul, 2026",
    photoAlt: "Portrait photo of Şeyma Nur Çebi",
  },

  strip: ["artificial intelligence", "language agents", "prompt engineering", "team captain", "T3 instructor & scholar", "drone pilot"],

  about: {
    eyebrow: "About",
    title: "Who I am",
    p1: `<strong>I'm a full-scholarship Software Engineering student at Istanbul Arel University — I entered the program ranked first.</strong> I'm passionate about AI, prompt engineering and language agents, building projects in health technology and explainable AI (XAI).`,
    p2: `At the T3 Foundation I'm both an instructor and a scholar; this summer I'm interning <em>simultaneously at the Microsoft Volunteer Internship Program and at T3</em>. I'm team captain of two separate TEKNOFEST projects and also run projects in the BTK and TÜSEB national competitions. Sharing what I learn is, to me, the most lasting way of learning.`,
    stats: [
      { num: "1st", cap: "Program entrance rank" },
      { num: "100%", count: "100", suffix: "%", cap: "Scholarship" },
      { num: "93/100", count: "93", suffix: "/100", cap: "TEKNOFEST PER score" },
    ],
  },

  certs: {
    eyebrow: "Certificates & Licenses",
    title: "Certified curiosities",
    items: [
      {
        org: "DGCA — Directorate General of Civil Aviation",
        name: "UAV-1 Sport / Amateur Pilot License",
        desc: "Unmanned aerial vehicle (drone) pilot authorization — permanent license.",
      },
      {
        org: "SSB — Presidency of Defence Industries",
        name: "National Competence Initiative",
        desc: "Defence industry career and competence program certificate.",
      },
    ],
  },

  journey: {
    eyebrow: "Journey",
    title: "The steps that led here",
    desc: "Education, volunteering and competitions — a chronological summary.",
    items: [
      {
        when: "2024 — University",
        title: "Arel University — Software Engineering",
        desc: "I entered the program ranked first, on a full scholarship (2024–2028). That rank isn't a result to me; it's a starting point I carry responsibility for.",
      },
      {
        when: "2024 — T3 Foundation",
        title: "T3 Foundation — Instructor & Scholar",
        desc: "I teach robotics coding and algorithmic thinking at the Deneyap Technology Workshops, and I'm a T3 scholar.",
      },
      {
        when: "2024 → Ongoing",
        title: "TEKNOFEST — Captain of two teams",
        desc: "I'm team captain of VARIANT-GNN (AI in healthcare, PER: 93/100) and the AI Language Agents project; we're heading to TEKNOFEST 2026 on two fronts.",
      },
      {
        when: "2026 — Competitions",
        title: "BTK & TÜSEB",
        desc: "A software project that reached the presentation stage in the BTK national technology competition; a biomarker analysis study in the health technology category at TÜSEB.",
      },
      {
        when: "Summer 2026 — Now",
        title: "Microsoft & T3 — Concurrent Internships",
        desc: "I'm interning simultaneously at the Microsoft Volunteer Internship Program and the T3 Foundation, experiencing software development processes and the corporate tech ecosystem first-hand.",
      },
    ],
  },

  skills: {
    eyebrow: "Expertise",
    title: "What I do",
    desc: "I work across four main areas; at the intersection of all of them is one thing: solving problems.",
    items: [
      {
        no: "01",
        title: "AI & Machine Learning",
        desc: `I build healthcare models with graph neural networks and explainable AI. <code>GNN</code> <code>PyTorch</code> <code>XAI</code> <code>Scikit-learn</code> <code>XGBoost</code>`,
      },
      {
        no: "02",
        title: "Prompt Engineering & LLMs",
        desc: `I build generative systems with large language models. <code>Few-shot</code> <code>CoT</code> <code>OpenAI API</code> <code>Anthropic API</code>`,
      },
      {
        no: "03",
        title: "AI Agents",
        desc: `I design task-oriented, tool-using autonomous agents with LLMs — our TEKNOFEST AI Language Agents project lives in this space. <code>LLM Agents</code> <code>Tool Use</code> <code>RAG</code>`,
      },
      {
        no: "04",
        title: "Software Development",
        desc: `I write code at every stage from idea to working product. <code>Python</code> <code>Java</code> <code>JavaScript</code> <code>C</code> <code>C++</code> <code>Docker</code> <code>Linux</code>`,
      },
    ],
  },

  stack: {
    eyebrow: "Stack",
    title: "My toolbox",
    desc: "The ever-growing set of technologies I use in courses, competitions and personal projects.",
    terminalTitle: "seymanur@arel — zsh",
    lines: [
      { cmd: "whoami", out: `AI & language-agent enthusiast — <span class="hl-rose">full scholarship</span>, <span class="hl-sky">top of the program</span>` },
      { cmd: "ls competitions/", out: "variant-gnn&nbsp;&nbsp;language-agents&nbsp;&nbsp;btk&nbsp;&nbsp;tuseb" },
      { cmd: "ps -e | grep intern", out: `microsoft-intern <span class="hl-rose">▸ running</span>&nbsp;&nbsp;&nbsp;t3-intern <span class="hl-rose">▸ running</span> <span class="cursor"></span>` },
    ],
    chips: ["Python", "Java", "JavaScript", "C", "C++", "PyTorch", "Scikit-learn", "XGBoost", "Git & GitHub", "Docker", "Linux", "OpenAI API", "Anthropic API"],
  },

  learning: {
    eyebrow: "Current Focus",
    title: "What's on my desk right now",
    desc: "The work I'm actively driving and the skills I'm building.",
    items: [
      { title: "AI Language Agents", note: "TEKNOFEST 2026 · team captain" },
      { title: "BTK Competition Project", note: "at presentation stage" },
      { title: "TÜSEB Biomarker Analysis", note: "health technology category" },
      { title: "English", note: "B1 → aiming for B2+" },
    ],
  },

  projects: {
    eyebrow: "Selected Work",
    title: "Projects & Competitions",
    desc: "Work at the intersection of health and technology, carried out in national competitions.",
    linkLabels: { github: "GitHub", view: "View" },
    items: [
      {
        dir: "variant-gnn/",
        tag: "TEKNOFEST 2026 · Team Captain",
        title: "VARIANT-GNN",
        desc: "A healthcare AI model that classifies genetic variants with a GNN + Ensemble architecture and makes its decisions transparent with XAI (LIME). PER: 93/100.",
        link: "github",
      },
      {
        dir: "language-agents/",
        tag: "TEKNOFEST 2026 · Team Captain",
        title: "AI Language Agents",
        desc: "Our LLM-based agent project submitted to the TEKNOFEST AI Language Agents category — currently in development.",
        link: "view",
      },
      {
        dir: "btk-project/",
        tag: "BTK · 2026",
        title: "BTK Competition Project",
        desc: "The software project we're building for the national competition of the Information and Communication Technologies Authority — at presentation stage.",
        link: "view",
      },
      {
        dir: "biomarker/",
        tag: "TÜSEB · 2026",
        title: "Biomarker Analysis",
        desc: "A biomarker analysis study in the health technology category of the Turkish Health Institutes project competition.",
        link: "view",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: `Let's <em>build together</em>`,
    desc: "Got a project idea, an internship or collaboration opportunity, or just want to say hi? Email is the fastest way to reach me.",
    btn: "Send an Email",
  },

  footer: {
    copyright: "© 2026 Şeyma Nur Çebi — no template, hand-coded line by line.",
    city: "Istanbul",
  },
};

export const de: Dict = {
  lang: "de",
  path: "/de/",
  title: "Şeyma Nur Çebi — Software-Engineering-Studentin",
  description:
    "Software-Engineering-Studentin mit Leidenschaft für KI, Prompt Engineering und Sprachagenten. TEKNOFEST-Teamkapitänin, Ausbilderin und Stipendiatin der T3-Stiftung.",

  files: {
    giris: "start.tsx",
    hakkimda: "ueber-mich.md",
    yolculuk: "werdegang.log",
    uzmanlik: "expertise.json",
    projeler: "projekte.ts",
    iletisim: "kontakt.sh",
  },

  code: {
    rol: "Software-Eng.-Studentin",
    odak: ["KI", "Sprachagenten"],
    suAn: "Microsoft-&-T3-Praktikantin",
  },

  nav: {
    giris: "Start",
    hakkimda: "Über mich",
    yolculuk: "Werdegang",
    uzmanlik: "Expertise",
    projeler: "Projekte",
    iletisim: "Kontakt",
  },

  hero: {
    eyebrow: "Şeyma Nur Çebi — Software-Engineering-Studentin",
    h1: `Ich verwandle Ideen mit KI in<br /><span class="accent">funktionierende Produkte</span>.`,
    lead: "Ich bin Software-Engineering-Studentin mit Leidenschaft für KI, Prompt Engineering und Sprachagenten. Ich entwickle Projekte in Gesundheitstechnologie und erklärbarer KI und leite Teams in nationalen Wettbewerben.",
    btnProjects: "Meine Projekte",
    btnContact: "Kontakt aufnehmen",
    meta: [
      { k: "standort", v: "Istanbul, Türkei" },
      { k: "studium", v: "Arel Univ. — Software Eng." },
      { k: "aktuell", v: "Microsoft & T3 — Praktikantin" },
    ],
    captionL: "Abb. 01 — Şeyma Nur Çebi",
    captionR: "Istanbul, 2026",
    photoAlt: "Porträtfoto von Şeyma Nur Çebi",
  },

  strip: ["künstliche intelligenz", "sprachagenten", "prompt engineering", "teamkapitänin", "T3-ausbilderin & stipendiatin", "drohnenpilotin"],

  about: {
    eyebrow: "Über mich",
    title: "Kurz zu mir",
    p1: `<strong>Ich studiere Software Engineering mit Vollstipendium an der Istanbul Arel Universität — ich wurde als Jahrgangsbeste aufgenommen.</strong> Meine Leidenschaft gilt KI, Prompt Engineering und Sprachagenten; ich entwickle Projekte in Gesundheitstechnologie und erklärbarer KI (XAI).`,
    p2: `Bei der T3-Stiftung bin ich Ausbilderin und Stipendiatin zugleich; diesen Sommer absolviere ich <em>parallel Praktika im Microsoft Volunteer Internship Program und bei T3</em>. Ich bin Teamkapitänin zweier TEKNOFEST-Projekte und führe außerdem Projekte in den nationalen Wettbewerben BTK und TÜSEB. Wissen zu teilen ist für mich die nachhaltigste Form des Lernens.`,
    stats: [
      { num: "1.", cap: "Aufnahmerang" },
      { num: "100%", count: "100", suffix: "%", cap: "Stipendium" },
      { num: "93/100", count: "93", suffix: "/100", cap: "TEKNOFEST-Bewertung" },
    ],
  },

  certs: {
    eyebrow: "Zertifikate & Lizenzen",
    title: "Belegte Neugier",
    items: [
      {
        org: "SHGM — Generaldirektion für Zivilluftfahrt",
        name: "UAV-1 Sport-/Amateur-Pilotenlizenz",
        desc: "Pilotenberechtigung für unbemannte Luftfahrzeuge (Drohnen) — unbefristet.",
      },
      {
        org: "SSB — Präsidium der Verteidigungsindustrie",
        name: "Nationale Kompetenzinitiative",
        desc: "Teilnahmezertifikat des Karriere- und Kompetenzprogramms der Verteidigungsindustrie.",
      },
    ],
  },

  journey: {
    eyebrow: "Werdegang",
    title: "Die Schritte bis heute",
    desc: "Studium, Engagement und Wettbewerbe — eine chronologische Übersicht.",
    items: [
      {
        when: "2024 — Universität",
        title: "Arel Universität — Software Engineering",
        desc: "Aufnahme als Jahrgangsbeste mit Vollstipendium (2024–2028). Dieser Rang ist für mich kein Ergebnis, sondern ein Anfang, für den ich Verantwortung trage.",
      },
      {
        when: "2024 — T3-Stiftung",
        title: "T3-Stiftung — Ausbilderin & Stipendiatin",
        desc: "In den Deneyap-Technologiewerkstätten unterrichte ich Robotik-Programmierung und algorithmisches Denken; zugleich bin ich T3-Stipendiatin.",
      },
      {
        when: "2024 → Laufend",
        title: "TEKNOFEST — Kapitänin zweier Teams",
        desc: "Ich bin Teamkapitänin von VARIANT-GNN (KI im Gesundheitswesen, Bewertung: 93/100) und des Projekts KI-Sprachagenten; wir steuern auf zwei Wegen auf TEKNOFEST 2026 zu.",
      },
      {
        when: "2026 — Wettbewerbe",
        title: "BTK & TÜSEB",
        desc: "Ein Softwareprojekt im nationalen BTK-Technologiewettbewerb, das die Präsentationsphase erreicht hat; bei TÜSEB eine Biomarker-Analyse in der Kategorie Gesundheitstechnologie.",
      },
      {
        when: "Sommer 2026 — Jetzt",
        title: "Microsoft & T3 — Parallele Praktika",
        desc: "Ich absolviere parallel Praktika im Microsoft Volunteer Internship Program und bei der T3-Stiftung und erlebe Softwareentwicklung und Unternehmens-Ökosysteme aus erster Hand.",
      },
    ],
  },

  skills: {
    eyebrow: "Expertise",
    title: "Was ich mache",
    desc: "Ich arbeite in vier Kernbereichen; an ihrer Schnittstelle steht eines: Probleme lösen.",
    items: [
      {
        no: "01",
        title: "KI & Maschinelles Lernen",
        desc: `Ich entwickle Modelle für das Gesundheitswesen mit Graph Neural Networks und erklärbarer KI. <code>GNN</code> <code>PyTorch</code> <code>XAI</code> <code>Scikit-learn</code> <code>XGBoost</code>`,
      },
      {
        no: "02",
        title: "Prompt Engineering & LLMs",
        desc: `Ich baue generative Systeme mit großen Sprachmodellen. <code>Few-shot</code> <code>CoT</code> <code>OpenAI API</code> <code>Anthropic API</code>`,
      },
      {
        no: "03",
        title: "KI-Agenten",
        desc: `Ich entwerfe aufgabenorientierte, werkzeugnutzende autonome Agenten mit LLMs — unser TEKNOFEST-Projekt KI-Sprachagenten entsteht in diesem Feld. <code>LLM-Agenten</code> <code>Tool Use</code> <code>RAG</code>`,
      },
      {
        no: "04",
        title: "Softwareentwicklung",
        desc: `Ich schreibe Code in jeder Phase — von der Idee bis zum funktionierenden Produkt. <code>Python</code> <code>Java</code> <code>JavaScript</code> <code>C</code> <code>C++</code> <code>Docker</code> <code>Linux</code>`,
      },
    ],
  },

  stack: {
    eyebrow: "Stack",
    title: "Mein Werkzeugkasten",
    desc: "Das stetig wachsende Technologie-Set, das ich in Kursen, Wettbewerben und eigenen Projekten einsetze.",
    terminalTitle: "seymanur@arel — zsh",
    lines: [
      { cmd: "whoami", out: `Begeistert von KI & Sprachagenten — <span class="hl-rose">Vollstipendium</span>, <span class="hl-sky">Jahrgangsbeste</span>` },
      { cmd: "ls wettbewerbe/", out: "variant-gnn&nbsp;&nbsp;sprachagenten&nbsp;&nbsp;btk&nbsp;&nbsp;tuseb" },
      { cmd: "ps -e | grep praktikum", out: `microsoft <span class="hl-rose">▸ läuft</span>&nbsp;&nbsp;&nbsp;t3 <span class="hl-rose">▸ läuft</span> <span class="cursor"></span>` },
    ],
    chips: ["Python", "Java", "JavaScript", "C", "C++", "PyTorch", "Scikit-learn", "XGBoost", "Git & GitHub", "Docker", "Linux", "OpenAI API", "Anthropic API"],
  },

  learning: {
    eyebrow: "Aktueller Fokus",
    title: "Was gerade auf meinem Tisch liegt",
    desc: "Arbeiten, die ich aktiv vorantreibe, und Fähigkeiten, die ich ausbaue.",
    items: [
      { title: "KI-Sprachagenten", note: "TEKNOFEST 2026 · Teamkapitänin" },
      { title: "BTK-Wettbewerbsprojekt", note: "in der Präsentationsphase" },
      { title: "TÜSEB Biomarker-Analyse", note: "Kategorie Gesundheitstechnologie" },
      { title: "Englisch", note: "B1 → Ziel B2+" },
    ],
  },

  projects: {
    eyebrow: "Ausgewählte Arbeiten",
    title: "Projekte & Wettbewerbe",
    desc: "Arbeiten an der Schnittstelle von Gesundheit und Technologie, entstanden in nationalen Wettbewerben.",
    linkLabels: { github: "GitHub", view: "Ansehen" },
    items: [
      {
        dir: "variant-gnn/",
        tag: "TEKNOFEST 2026 · Teamkapitänin",
        title: "VARIANT-GNN",
        desc: "Ein KI-Modell für das Gesundheitswesen, das genetische Varianten mit einer GNN-+-Ensemble-Architektur klassifiziert und seine Entscheidungen mit XAI (LIME) transparent macht. Bewertung: 93/100.",
        link: "github",
      },
      {
        dir: "sprachagenten/",
        tag: "TEKNOFEST 2026 · Teamkapitänin",
        title: "KI-Sprachagenten",
        desc: "Unser LLM-basiertes Agentenprojekt für die TEKNOFEST-Kategorie KI-Sprachagenten — derzeit in Entwicklung.",
        link: "view",
      },
      {
        dir: "btk-projekt/",
        tag: "BTK · 2026",
        title: "BTK-Wettbewerbsprojekt",
        desc: "Unser Softwareprojekt für den nationalen Wettbewerb der Behörde für Informations- und Kommunikationstechnologien — in der Präsentationsphase.",
        link: "view",
      },
      {
        dir: "biomarker/",
        tag: "TÜSEB · 2026",
        title: "Biomarker-Analyse",
        desc: "Eine Biomarker-Analyse in der Kategorie Gesundheitstechnologie des Projektwettbewerbs der Türkischen Gesundheitsinstitute.",
        link: "view",
      },
    ],
  },

  contact: {
    eyebrow: "Kontakt",
    title: `Lass uns <em>gemeinsam bauen</em>`,
    desc: "Eine Projektidee, ein Praktikums- oder Kooperationsangebot — oder einfach nur Hallo sagen? Per E-Mail erreichen Sie mich am schnellsten.",
    btn: "E-Mail senden",
  },

  footer: {
    copyright: "© 2026 Şeyma Nur Çebi — keine Vorlage, Zeile für Zeile selbst geschrieben.",
    city: "Istanbul",
  },
};

export const locales = { tr, en, de };
