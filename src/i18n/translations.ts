// ============================================
// ÇEVİRİLER — TR · EN · DE · RU · AR (RTL)
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
        when: "2026",
        title: "TÜSEB — Biyobelirteç Analizi",
        desc: "Sağlık teknolojisi kategorisinde biyobelirteç analizi çalışması yürütüyorum.",
      },
    ],
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
        when: "2026",
        title: "TÜSEB — Biomarker Analysis",
        desc: "A biomarker analysis study in the health technology category.",
      },
    ],
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

export const de: Dict = {
  lang: "de",
  dir: "ltr",
  path: "/de/",
  title: "Şeyma Nur Çebi — Software-Engineering-Studentin",
  description:
    "Software-Engineering-Studentin mit Leidenschaft für KI, Prompt Engineering und Sprachagenten. TEKNOFEST-Teamkapitänin, Ausbilderin und Stipendiatin der T3-Stiftung.",

  name: "ŞEYMA NUR ÇEBİ",
  role: "Software-Eng.",
  emailLabel: "E-Mail",
  skipLink: "Zum Inhalt springen",
  location: "Istanbul, Türkei",
  availability: "Offen für Zusammenarbeit",
  cvLabel: "Lebenslauf",
  cvPath: "/de/cv",
  cvProfile: "Profil",
  cvBack: "← Zur Website",
  cvSave: "Als PDF speichern",

  nav: { home: "Start", about: "Über mich", projects: "Projekte", contact: "Kontakt" },

  now: {
    label: "JETZT",
    items: [
      { k: "lerne", v: "KI & LLMs" },
      { k: "baue", v: "VARIANT-GNN & KI-Sprachagenten" },
    ],
  },

  themeLabel: "ANSICHT",
  modeLight: "Tag",
  modeDark: "Nacht",
  langLabel: "SPRACHE",

  hero: {
    hello: "// hallo, ich bin",
    h1a: "Şeyma Nur",
    h1b: "Çebi.",
    tagline:
      "Ich studiere Software Engineering im 3. Jahr an der Istanbul Arel Universität — aufgenommen als Jahrgangsbeste, mit Vollstipendium. Ich verwandle Ideen in funktionierende Produkte: KI, Sprachagenten und Web.",
    cta: "Meine Projekte",
    photoAlt: "Porträtfoto von Şeyma Nur Çebi",
  },

  about: {
    no: "01",
    title: "Über mich",
    year: "3. Jahr",
    p1: "Ich studiere Software Engineering mit Vollstipendium an der Istanbul Arel Universität — aufgenommen als Jahrgangsbeste. Meine Leidenschaft: KI, Prompt Engineering und Sprachagenten.",
    p2: "Bei der T3-Stiftung bin ich Ausbilderin und Stipendiatin; diesen Sommer absolviere ich parallel Praktika bei Microsoft und T3. Mein Ziel: sauberer, nützlicher Code, der etwas bewirkt.",
    skillsLabel: "FÄHIGKEITEN",
    skillGroups: { langs: "Programmiersprachen", ai: "KI-Werkzeuge", tools: "Entwicklungswerkzeuge" },
    eduLabel: "AUSBILDUNG",
    edu: [
      {
        when: "2024 – 2028",
        title: "Istanbul Arel Universität — Software Engineering",
        desc: "Aufnahme als Jahrgangsbeste mit Vollstipendium. Dieser Rang ist kein Ergebnis, sondern ein Anfang mit Verantwortung.",
        badge: "Notenschnitt 3,62 / 4,00",
      },
    ],
    expLabel: "ERFAHRUNG",
    exp: [
      {
        when: "Sommer 2026 – laufend",
        title: "Microsoft & T3 — Parallele Praktika",
        desc: "Parallele Praktika im Microsoft Volunteer Internship Program und bei der T3-Stiftung.",
      },
      {
        when: "2024 – laufend",
        title: "T3-Stiftung — Ausbilderin & Stipendiatin",
        desc: "In den Deneyap-Werkstätten unterrichte ich Robotik-Programmierung und algorithmisches Denken.",
      },
    ],
    compLabel: "WETTBEWERBE",
    comp: [
      {
        when: "2024 – laufend",
        title: "TEKNOFEST — Kapitänin zweier Teams",
        desc: "Teamkapitänin von VARIANT-GNN (KI im Gesundheitswesen, 93/100) und dem Projekt KI-Sprachagenten.",
      },
      {
        when: "2026",
        title: "TÜSEB — Biomarker-Analyse",
        desc: "Eine Biomarker-Analyse in der Kategorie Gesundheitstechnologie.",
      },
    ],
    certsLabel: "ZERTIFIKATE",
    certs: [
      {
        org: "SHGM",
        name: "IHA-1-Drohnen-Pilotenlizenz",
        desc: "Pilotenberechtigung für unbemannte Luftfahrzeuge — unbefristet.",
      },
      {
        org: "SSB",
        name: "Nationale Kompetenzinitiative",
        desc: "Zertifikat des Karriereprogramms der Verteidigungsindustrie.",
      },
      {
        org: "T3-Stiftung",
        name: "KI-basierte Technologieausbildung",
        desc: "Teilnahmebescheinigung als Ausbilderin — Elektronik, Programmierung, 3D-Design.",
      },
    ],
  },

  projects: {
    no: "02",
    title: "Projekte",
    items: [
      {
        title: "VARIANT-GNN",
        desc: "KI-Modell für das Gesundheitswesen, das genetische Varianten mit GNN + Ensemble klassifiziert — transparent dank XAI (LIME). Bewertung: 93/100.",
        tags: "PyTorch · GNN · XAI · TEKNOFEST 2026",
      },
      {
        title: "KI-Sprachagenten",
        desc: "LLM-basiertes Agentenprojekt für die TEKNOFEST-Kategorie Sprachagenten — ich bin Teamkapitänin.",
        tags: "LLM · Agenten · TEKNOFEST 2026",
      },
      {
        title: "Biomarker-Analyse",
        desc: "Biomarker-Analyse in der TÜSEB-Kategorie Gesundheitstechnologie.",
        tags: "Gesundheitstechnologie · TÜSEB 2026",
      },
      {
        title: "YemekStes",
        desc: "Java-Konsolenanwendung aus einem Kursprojekt im 1. Studienjahr: objektorientiertes Essensbestellsystem — Vererbung, Abstraktion, Polymorphie; JUnit-5-Tests und CSV-Speicherung.",
        tags: "Java · OOP · JUnit 5 · Maven",
      },
    ],
  },

  contact: {
    no: "03",
    title: "Kontakt",
    sub: "Eine Idee, Zusammenarbeit oder Frage? Schreiben Sie mir.",
    fName: "Ihr Name",
    fEmail: "Ihre E-Mail",
    fMsg: "Ihre Nachricht",
    fSend: "Senden",
    fHint: "„Senden“ öffnet Ihre E-Mail-App.",
    fSubject: "Website-Kontakt",
    social: "SOZIALE MEDIEN",
  },

  footer: "ANDERS DENKEN — ANDERS CODEN",
};

export const ru: Dict = {
  lang: "ru",
  dir: "ltr",
  path: "/ru/",
  title: "Шейма Нур Чеби — студентка программной инженерии",
  description:
    "Студентка программной инженерии, увлечённая ИИ, промпт-инжинирингом и языковыми агентами. Капитан команд TEKNOFEST, преподавательница и стипендиатка фонда T3.",

  name: "ŞEYMA NUR ÇEBİ",
  role: "Программная инженерия",
  emailLabel: "Почта",
  skipLink: "Перейти к содержимому",
  location: "Стамбул, Турция",
  availability: "Открыта к сотрудничеству",
  cvLabel: "Скачать CV",
  cvPath: "/ru/cv",
  cvProfile: "Профиль",
  cvBack: "← На сайт",
  cvSave: "Сохранить в PDF",

  nav: { home: "Главная", about: "Обо мне", projects: "Проекты", contact: "Контакты" },

  now: {
    label: "СЕЙЧАС",
    items: [
      { k: "изучаю", v: "ИИ и LLM" },
      { k: "разрабатываю", v: "VARIANT-GNN и языковые агенты ИИ" },
    ],
  },

  themeLabel: "ВИД",
  modeLight: "День",
  modeDark: "Ночь",
  langLabel: "ЯЗЫК",

  hero: {
    hello: "// привет, я",
    h1a: "Шейма Нур",
    h1b: "Чеби.",
    tagline:
      "Я студентка 3-го курса программной инженерии Стамбульского университета Арел — поступила на направление первой, с полной стипендией. Превращаю идеи в работающие продукты: ИИ, языковые агенты и веб.",
    cta: "Мои проекты",
    photoAlt: "Портрет Шеймы Нур Чеби",
  },

  about: {
    no: "01",
    title: "Обо мне",
    year: "3-й курс",
    p1: "Я учусь на программной инженерии в Стамбульском университете Арел с полной стипендией — поступила на направление первой. Увлечена ИИ, промпт-инжинирингом и языковыми агентами.",
    p2: "В фонде T3 я преподавательница и стипендиатка; этим летом прохожу параллельные стажировки в Microsoft и T3. Моя цель — чистый и полезный софт, который меняет что-то к лучшему.",
    skillsLabel: "НАВЫКИ",
    skillGroups: { langs: "Языки", ai: "ИИ-инструменты", tools: "Инструменты разработки" },
    eduLabel: "ОБРАЗОВАНИЕ",
    edu: [
      {
        when: "2024 — 2028",
        title: "Университет Арел — программная инженерия",
        desc: "Поступила первой, с полной стипендией. Для меня это не итог, а точка старта и ответственность.",
        badge: "Средний балл 3,62 / 4,00",
      },
    ],
    expLabel: "ОПЫТ",
    exp: [
      {
        when: "Лето 2026 — сейчас",
        title: "Microsoft и T3 — параллельные стажировки",
        desc: "Одновременно стажируюсь в волонтёрской программе Microsoft и в фонде T3.",
      },
      {
        when: "2024 — сейчас",
        title: "Фонд T3 — преподавательница и стипендиатка",
        desc: "Веду занятия по робототехнике и алгоритмическому мышлению в мастерских Deneyap.",
      },
    ],
    compLabel: "КОНКУРСЫ",
    comp: [
      {
        when: "2024 — сейчас",
        title: "TEKNOFEST — капитан двух команд",
        desc: "Капитан проектов VARIANT-GNN (ИИ в медицине, оценка 93/100) и «Языковые агенты ИИ».",
      },
      {
        when: "2026",
        title: "TÜSEB — анализ биомаркеров",
        desc: "Исследование биомаркеров в категории медицинских технологий.",
      },
    ],
    certsLabel: "СЕРТИФИКАТЫ",
    certs: [
      {
        org: "SHGM",
        name: "Лицензия пилота дронов IHA-1",
        desc: "Право пилотирования беспилотников — бессрочно.",
      },
      {
        org: "SSB",
        name: "Национальная инициатива компетенций",
        desc: "Сертификат карьерной программы оборонной промышленности.",
      },
      {
        org: "Фонд T3",
        name: "Технологическое обучение на базе ИИ",
        desc: "Сертификат об участии в качестве преподавательницы — электроника, программирование, 3D-дизайн.",
      },
    ],
  },

  projects: {
    no: "02",
    title: "Проекты",
    items: [
      {
        title: "VARIANT-GNN",
        desc: "Модель ИИ для медицины: классифицирует генетические варианты (GNN + Ensemble), решения прозрачны благодаря XAI (LIME). Оценка: 93/100.",
        tags: "PyTorch · GNN · XAI · TEKNOFEST 2026",
      },
      {
        title: "Языковые агенты ИИ",
        desc: "Проект агентов на основе LLM для категории TEKNOFEST «Языковые агенты» — я капитан команды.",
        tags: "LLM · Агенты · TEKNOFEST 2026",
      },
      {
        title: "Анализ биомаркеров",
        desc: "Исследование биомаркеров в категории медицинских технологий TÜSEB.",
        tags: "Медтех · TÜSEB 2026",
      },
      {
        title: "YemekStes",
        desc: "Консольное Java-приложение — учебный проект 1-го курса: объектно-ориентированная система заказа еды — наследование, абстракция, полиморфизм; тесты JUnit 5 и сохранение в CSV.",
        tags: "Java · OOP · JUnit 5 · Maven",
      },
    ],
  },

  contact: {
    no: "03",
    title: "Контакты",
    sub: "Есть идея, сотрудничество или вопрос? Напишите мне.",
    fName: "Ваше имя",
    fEmail: "Ваш e-mail",
    fMsg: "Ваше сообщение",
    fSend: "Отправить",
    fHint: "«Отправить» откроет вашу почтовую программу.",
    fSubject: "Сообщение с сайта",
    social: "СОЦСЕТИ",
  },

  footer: "ДУМАЙ ИНАЧЕ — КОДИ ИНАЧЕ",
};

export const ar: Dict = {
  lang: "ar",
  dir: "rtl",
  path: "/ar/",
  title: "شيماء نور تشبي — طالبة هندسة البرمجيات",
  description:
    "طالبة هندسة برمجيات شغوفة بالذكاء الاصطناعي وهندسة الأوامر ووكلاء اللغة. قائدة فرق تكنوفيست، مدرّبة وحاصلة على منحة من مؤسسة T3.",

  name: "ŞEYMA NUR ÇEBİ",
  role: "هندسة البرمجيات",
  emailLabel: "البريد",
  skipLink: "تخطي إلى المحتوى",
  location: "إسطنبول، تركيا",
  availability: "منفتحة على التعاون",
  cvLabel: "تحميل السيرة",
  cvPath: "/ar/cv",
  cvProfile: "نبذة",
  cvBack: "← العودة إلى الموقع",
  cvSave: "حفظ بصيغة PDF",

  nav: { home: "الرئيسية", about: "عنّي", projects: "المشاريع", contact: "تواصل" },

  now: {
    label: "الآن",
    items: [
      { k: "أتعلّم", v: "الذكاء الاصطناعي وLLM" },
      { k: "أطوّر", v: "VARIANT-GNN ووكلاء اللغة بالذكاء الاصطناعي" },
    ],
  },

  themeLabel: "المظهر",
  modeLight: "نهار",
  modeDark: "ليل",
  langLabel: "اللغة",

  hero: {
    hello: "// مرحباً، أنا",
    h1a: "شيماء نور",
    h1b: "تشبي.",
    tagline:
      "أدرس هندسة البرمجيات في السنة الثالثة بجامعة أريل بإسطنبول — التحقت بالقسم بالمرتبة الأولى وبمنحة كاملة. أحوّل الأفكار إلى منتجات تعمل عبر الذكاء الاصطناعي ووكلاء اللغة ومشاريع الويب.",
    cta: "مشاريعي",
    photoAlt: "صورة شخصية لشيماء نور تشبي",
  },

  about: {
    no: "01",
    title: "عنّي",
    year: "السنة الثالثة",
    p1: "أدرس هندسة البرمجيات بمنحة كاملة في جامعة أريل بإسطنبول — التحقت بالقسم بالمرتبة الأولى. شغوفة بالذكاء الاصطناعي وهندسة الأوامر ووكلاء اللغة.",
    p2: "في مؤسسة T3 أنا مدرّبة وحاصلة على منحة؛ وهذا الصيف أتدرّب بالتوازي في مايكروسوفت وT3. هدفي: برمجيات نظيفة ومفيدة تُحدث فرقاً.",
    skillsLabel: "المهارات",
    skillGroups: { langs: "اللغات", ai: "أدوات الذكاء الاصطناعي", tools: "أدوات التطوير" },
    eduLabel: "التعليم",
    edu: [
      {
        when: "2024 — 2028",
        title: "جامعة أريل بإسطنبول — هندسة البرمجيات",
        desc: "التحقت بالقسم بالمرتبة الأولى وبمنحة كاملة. هذا الترتيب ليس نتيجة؛ بل بداية أحمل مسؤوليتها.",
        badge: "المعدل التراكمي 3.62/4.00",
      },
    ],
    expLabel: "الخبرة",
    exp: [
      {
        when: "صيف 2026 — مستمر",
        title: "مايكروسوفت وT3 — تدريبان متزامنان",
        desc: "أتدرّب بالتوازي في برنامج مايكروسوفت التطوعي وفي مؤسسة T3.",
      },
      {
        when: "2024 — مستمر",
        title: "مؤسسة T3 — مدرّبة وحاصلة على منحة",
        desc: "أدرّس برمجة الروبوتات والتفكير الخوارزمي في ورش دنياب التقنية.",
      },
    ],
    compLabel: "المسابقات",
    comp: [
      {
        when: "2024 — مستمر",
        title: "تكنوفيست — قائدة فريقين",
        desc: "أقود فريقي VARIANT-GNN (ذكاء اصطناعي في الصحة، تقييم 93/100) ومشروع وكلاء اللغة.",
      },
      {
        when: "2026",
        title: "TÜSEB — تحليل المؤشرات الحيوية",
        desc: "دراسة تحليل المؤشرات الحيوية في فئة التقنيات الصحية.",
      },
    ],
    certsLabel: "الشهادات",
    certs: [
      {
        org: "SHGM",
        name: "رخصة IHA-1 لقيادة الطائرات المسيّرة",
        desc: "صلاحية قيادة الطائرات المسيّرة — دائمة.",
      },
      {
        org: "SSB",
        name: "مبادرة الكفاءة الوطنية",
        desc: "شهادة برنامج المسار المهني للصناعات الدفاعية.",
      },
      {
        org: "مؤسسة T3",
        name: "تعليم تقني قائم على الذكاء الاصطناعي",
        desc: "شهادة مشاركة بصفة مدرّبة — إلكترونيات وبرمجة وتصميم ثلاثي الأبعاد.",
      },
    ],
  },

  projects: {
    no: "02",
    title: "المشاريع",
    items: [
      {
        title: "VARIANT-GNN",
        desc: "نموذج ذكاء اصطناعي صحّي يصنّف المتغيرات الجينية بمعمارية GNN + Ensemble، بقرارات شفافة عبر XAI (LIME). التقييم: 93/100.",
        tags: "PyTorch · GNN · XAI · تكنوفيست 2026",
      },
      {
        title: "وكلاء اللغة بالذكاء الاصطناعي",
        desc: "مشروع وكلاء مبني على LLM لفئة وكلاء اللغة في تكنوفيست — أنا قائدة الفريق.",
        tags: "LLM · وكلاء · تكنوفيست 2026",
      },
      {
        title: "تحليل المؤشرات الحيوية",
        desc: "دراسة تحليل المؤشرات الحيوية في فئة التقنيات الصحية بمسابقة TÜSEB.",
        tags: "تقنية صحية · TÜSEB 2026",
      },
      {
        title: "YemekStes",
        desc: "تطبيق جافا بواجهة سطر الأوامر أنجزته كمشروع مقرر في السنة الأولى: نظام طلب طعام كائني التوجه — وراثة وتجريد وتعدد أشكال؛ مع اختبارات JUnit 5 وحفظ CSV.",
        tags: "Java · OOP · JUnit 5 · Maven",
      },
    ],
  },

  contact: {
    no: "03",
    title: "تواصل",
    sub: "لديك فكرة أو تعاون أو سؤال؟ اكتب لي ولنتحدث.",
    fName: "اسمك",
    fEmail: "بريدك الإلكتروني",
    fMsg: "رسالتك",
    fSend: "إرسال",
    fHint: "زر «إرسال» يفتح تطبيق البريد لديك.",
    fSubject: "رسالة من الموقع",
    social: "التواصل الاجتماعي",
  },

  footer: "فكّر مختلفاً — برمج مختلفاً",
};

// Ortak: dilden bağımsız yetenek çipleri — etiketleri her dilin
// about.skillGroups sözlüğünden gelir
export const SKILL_GROUPS = [
  { key: "langs", items: ["Python", "Java", "JavaScript", "C", "C++"] },
  { key: "ai", items: ["Claude Code", "Antigravity", "Prompt Engineering"] },
  { key: "tools", items: ["Git", "VS Code", "Cursor"] },
] as const;

export const locales = { tr, en, de, ru, ar };
