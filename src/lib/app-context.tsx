import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type Lang = "en" | "pl";

interface AppCtx {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<AppCtx | null>(null);

const dict: Record<Lang, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.cta": "Start a project",

    "hero.tag": "Full-Stack Engineering",
    "hero.title": "Scalable Software Solutions Built for Modern Businesses",
    "hero.subtitle":
      "I design and ship resilient enterprise applications with .NET, Angular, and cloud-native architecture — from first commit to production.",
    "hero.cta1": "Start a project",
    "hero.cta2": "Explore services",

    "stack.title": "Tools of the trade",
    "stack.heading": "A modern, battle-tested stack",
    "stack.subtitle": "A modern, production-tested stack for serious software.",

    "stats.projects": "Projects delivered",
    "stats.years": "Years of experience",
    "stats.clients": "Happy clients",
    "stats.uptime": "Production uptime",

    "why.title": "Why work with me",
    "why.subtitle": "Engineering judgment, not just code.",
    "why.1.t": "Architecture-first",
    "why.1.d": "Systems designed to scale before the first line of code ships.",
    "why.2.t": "Cloud-native by default",
    "why.2.d": "Containerized, observable workloads built for Azure and Kubernetes.",
    "why.3.t": "Senior delivery",
    "why.3.d": "Direct collaboration with a single point of accountability.",
    "why.4.t": "Long-term thinking",
    "why.4.d": "Clean code, tests, and documentation your future team will thank you for.",

    "home.cta.title": "Have a project in mind?",
    "home.cta.subtitle": "From greenfield builds to enterprise modernisation — let's talk about what you need.",

    "about.tag": "About me",
    "about.title": "Engineer. Architect. Problem solver.",
    "about.lead":
      "I'm a senior full-stack engineer specialising in .NET systems, Angular frontends, and cloud-native deployments on Azure and Kubernetes. For several years, I've helped teams deliver products that are fast and reliable — from greenfield SaaS projects to large-scale modernisations of existing systems. I focus on clean architecture, pragmatic DevOps, and code that other developers enjoy working with.",
    "about.p1":
      "I deliver high-performance systems using C#, .NET Core, ASP.NET, Ocelot, Angular, React, and TypeScript across distributed architecture.",
    "about.p2":
      "I design and optimise resilient applications with MongoDB, Redis, SQL Server, Elasticsearch, Docker, Kafka, and Azure.",
    "about.specializations": "Specialisations",
    "about.specs.heading": "Specialisations",
    "about.spec.1.t": ".NET / C#",
    "about.spec.1.d": "High-performance backend services with .NET Core, ASP.NET and Ocelot.",
    "about.spec.2.t": "Angular / React",
    "about.spec.2.d": "Modern web apps with TypeScript, Angular and React.",
    "about.spec.3.t": "Microservices",
    "about.spec.3.d": "Distributed architecture, Kafka integration and service orchestration.",
    "about.spec.4.t": "Azure / Docker",
    "about.spec.4.d": "Cloud-native deployments, containerization and Linux production workflows.",
    "about.spec.5.t": "Data & Search",
    "about.spec.5.d": "MongoDB, Redis, SQL Server and Elasticsearch for analytics and caching.",
    "about.spec.6.t": "Architecture",
    "about.spec.6.d": "Microservices, event-driven design and scalable enterprise systems.",
    "about.experience": "Experience",
    "about.experience.heading": "Career timeline",
    "about.timeline.1.t": "C# Server Developer @ SuperPlay",
    "about.timeline.1.d": "Building high-performance backend systems, Redis caching and distributed services on Linux with Docker.",
    "about.timeline.2.t": "Software Engineer @ GlobalLogic",
    "about.timeline.2.d": "Developing enterprise software with OPC integration, microservices, MongoDB, Redis, Elasticsearch and Azure.",
    "about.timeline.3.t": "Software Developer @ Smart EPC",
    "about.timeline.3.d": "Built IoT data management and visualization solutions using Angular, C#, .NET and Docker.",
    "about.timeline.4.t": "Junior Software Developer @ Smart EPC",
    "about.timeline.4.d": "Automated workflows and data extraction tools with Python, Django and SQL Server.",
    "about.education": "Education",
    "about.education.heading": "Education timeline",
    "about.edu.1.t": "M.Sc. Computer Science",
    "about.edu.1.d": "Distributed systems and software architecture — graduated with honours.",
    "about.edu.2.t": "B.Sc. Computer Science",
    "about.edu.2.d": "Algorithms, data structures, and software engineering fundamentals.",
    "about.edu.3.t": "Technical High School",
    "about.edu.3.d": "IT specialisation — first encounter with programming and Linux.",

    "services.tag": "Services",
    "services.title": "What I build",
    "services.subtitle": "End-to-end engineering, from first idea to running in production.",
    "services.1.t": "Full-stack web applications",
    "services.1.d": "Production-ready web products built with .NET and Angular, end-to-end.",
    "services.2.t": "Enterprise software",
    "services.2.d": "Large-scale internal systems with audit, security and compliance in mind.",
    "services.3.t": "Backend architecture",
    "services.3.d": "Modular monoliths, microservices, event-driven systems, DDD and CQRS.",
    "services.4.t": "Cloud-native solutions",
    "services.4.d": "Azure-first designs with autoscaling, observability and cost control.",
    "services.5.t": "API development & integrations",
    "services.5.d": "REST, gRPC, GraphQL and third-party platform integrations built to last.",
    "services.6.t": "Docker & Kubernetes",
    "services.6.d": "Containerised workloads on AKS with GitOps, Helm and zero-downtime rollouts.",
    "services.7.t": "Application modernisation",
    "services.7.d": "Migrating legacy systems to modern .NET, cloud and CI/CD pipelines.",
    "services.8.t": "Performance optimisation",
    "services.8.d": "Profiling, caching, query tuning and front-end performance work.",
    "services.9.t": "Consulting & architecture",
    "services.9.d": "Senior technical advisory, audits, and architecture design reviews.",
    "services.help.title": "Not sure which service fits?",
    "services.help.subtitle": "Send me a short description of your project — I'll suggest the right approach.",

    "faq.tag": "FAQ",
    "faq.title": "Frequently asked questions",
    "faq.subtitle": "Short, honest answers to the questions I hear the most.",

    "contact.tag": "Contact",
    "contact.title": "Let's build something great",
    "contact.subtitle":
      "Tell me about your project — I usually reply within one business day.",
    "contact.name": "Your name",
    "contact.email": "Email address",
    "contact.subject": "Subject",
    "contact.message": "Tell me about your project",
    "contact.send": "Send message",
    "contact.success": "Thanks — your message is on its way.",

    "footer.tagline": "I build software that stands the test of time.",
    "footer.rights": "All rights reserved.",
  },
  pl: {
    "nav.home": "Strona główna",
    "nav.about": "O mnie",
    "nav.services": "Oferta",
    "nav.faq": "FAQ",
    "nav.contact": "Kontakt",
    "nav.cta": "Rozpocznij projekt",

    "hero.tag": "Full-Stack Engineering",
    "hero.title": "Skalowalne oprogramowanie dla nowoczesnego biznesu",
    "hero.subtitle":
      "Projektuję i wdrażam niezawodne aplikacje enterprise w .NET, Angularze i architekturze cloud-native — od pierwszego commita do produkcji.",
    "hero.cta1": "Rozpocznij projekt",
    "hero.cta2": "Zobacz ofertę",

    "stack.title": "Stack technologiczny",
    "stack.heading": "Nowoczesny, sprawdzony w produkcji stack",
    "stack.subtitle": "Nowoczesny, sprawdzony w produkcji stack dla poważnych projektów.",

    "stats.projects": "Wdrożonych projektów",
    "stats.years": "Lat doświadczenia",
    "stats.clients": "Zadowolonych klientów",
    "stats.uptime": "Dostępność produkcji",

    "why.title": "Dlaczego ja",
    "why.subtitle": "Doświadczenie inżynierskie, nie tylko kod.",
    "why.1.t": "Architektura na pierwszym miejscu",
    "why.1.d": "Systemy projektowane pod skalę zanim powstanie pierwsza linia kodu.",
    "why.2.t": "Cloud-native domyślnie",
    "why.2.d": "Konteneryzowane, obserwowalne aplikacje gotowe na Azure i Kubernetes.",
    "why.3.t": "Senior delivery",
    "why.3.d": "Bezpośrednia współpraca i jeden punkt odpowiedzialności.",
    "why.4.t": "Myślenie długoterminowe",
    "why.4.d": "Czysty kod, testy i dokumentacja, którą doceni Twój zespół.",

    "home.cta.title": "Masz projekt w głowie?",
    "home.cta.subtitle": "Od greenfield do modernizacji enterprise — porozmawiajmy o tym, czego potrzebujesz.",

    "about.tag": "O mnie",
    "about.title": "Inżynier. Architekt. Rozwiązuję problemy.",
    "about.lead":
      "Jestem senior full-stack engineerem specjalizującym się w systemach .NET, frontendach budowanych w Angularze oraz wdrożeniach cloud-native na Azure i w Kubernetesie. Od kilku lat pomagam zespołom dostarczać produkty, które są szybkie i niezawodne — od greenfieldowych projektów SaaS po duże modernizacje istniejących systemów. Stawiam na czystą architekturę, pragmatyczny DevOps oraz kod, który inni programiści chętnie rozwijają.",
    "about.p1":
      "Od niemal dekady pomagam zespołom dostarczać produkty, które muszą być szybkie, obserwowalne i niezawodne — od greenfield SaaS po duże modernizacje.",
    "about.p2":
      "Stawiam na czystą architekturę, pragmatyczny DevOps i kod, który inni programiści lubią rozwijać.",
    "about.specializations": "Specjalizacje",
    "about.specs.heading": "Specjalizacje",
    "about.spec.1.t": ".NET / C#",
    "about.spec.1.d": "Wydajne usługi backendowe z .NET Core, ASP.NET i Ocelot.",
    "about.spec.2.t": "Angular / React",
    "about.spec.2.d": "Nowoczesne aplikacje webowe w TypeScript, Angularze i React.",
    "about.spec.3.t": "Microservices",
    "about.spec.3.d": "Architektura rozproszona, integracja Kafka i orkiestracja usług.",
    "about.spec.4.t": "Azure / Docker",
    "about.spec.4.d": "Rozwiązania cloud-native, konteneryzacja i produkcyjne workflowy Linux.",
    "about.spec.5.t": "Data & Search",
    "about.spec.5.d": "MongoDB, Redis, SQL Server i Elasticsearch do analityki i cache'owania.",
    "about.spec.6.t": "Architecture",
    "about.spec.6.d": "Mikrousługi, projekt event-driven i skalowalne systemy enterprise.",
    "about.experience": "Doświadczenie",
    "about.experience.heading": "Ścieżka kariery",
    "about.timeline.1.t": "Senior Full-Stack Engineer",
    "about.timeline.1.d": "Architektura rozproszonych platform .NET z frontendami w Angularze.",
    "about.timeline.2.t": "Cloud & DevOps Lead",
    "about.timeline.2.d": "Kubernetes, Azure, pipeline'y GitOps i obserwowalność na dużą skalę.",
    "about.timeline.3.t": "Backend Engineer",
    "about.timeline.3.d": "Projektowanie API, systemów zdarzeniowych i warstw SQL.",
    "about.education": "Edukacja",
    "about.education.heading": "Historia edukacji",
    "about.edu.1.t": "Mgr inż. Informatyki",
    "about.edu.1.d": "Systemy rozproszone i architektura oprogramowania — ukończone z wyróżnieniem.",
    "about.edu.2.t": "Inż. Informatyki",
    "about.edu.2.d": "Algorytmy, struktury danych i podstawy inżynierii oprogramowania.",
    "about.edu.3.t": "Technikum",
    "about.edu.3.d": "Profil informatyczny — pierwsze spotkanie z programowaniem i Linuksem.",

    "services.tag": "Oferta",
    "services.title": "Co buduję",
    "services.subtitle": "Pełen cykl inżynierski — od pomysłu do produkcji.",
    "services.1.t": "Aplikacje webowe full-stack",
    "services.1.d": "Gotowe do produkcji produkty webowe budowane w .NET i Angularze, end-to-end.",
    "services.2.t": "Oprogramowanie klasy enterprise",
    "services.2.d": "Systemy korporacyjne na dużą skalę z audytem, bezpieczeństwem i zgodnością.",
    "services.3.t": "Architektura backendu",
    "services.3.d": "Modularne monolity, mikrousługi, systemy event-driven, DDD i CQRS.",
    "services.4.t": "Rozwiązania cloud-native",
    "services.4.d": "Projekty ukierunkowane na Azure z autoskalowalnością, obserwowalnością i kontrolą kosztów.",
    "services.5.t": "Tworzenie API i integracje",
    "services.5.d": "REST, gRPC, GraphQL i integracje platform trzecich zaprojektowane na lata.",
    "services.6.t": "Docker i Kubernetes",
    "services.6.d": "Skonteneryzowane obciążenia na AKS z GitOps, Helm i wdrożeniami bez downtime'u.",
    "services.7.t": "Modernizacja aplikacji",
    "services.7.d": "Migracja systemów legacy do nowoczesnego .NET, chmury i CI/CD.",
    "services.8.t": "Optymalizacja wydajności",
    "services.8.d": "Profilowanie, cache’owanie, strojenie zapytań i optymalizacja front-endu.",
    "services.9.t": "Konsulting i architektura",
    "services.9.d": "Senior doradztwo techniczne, audyty i przeglądy projektowe.",
    "services.help.title": "Nie wiesz, która usługa pasuje?",
    "services.help.subtitle": "Wyślij krótki opis projektu — zasugeruję najlepsze podejście.",

    "faq.tag": "FAQ",
    "faq.title": "Najczęściej zadawane pytania",
    "faq.subtitle": "Krótkie, szczere odpowiedzi na najczęstsze pytania.",

    "contact.tag": "Kontakt",
    "contact.title": "Zbudujmy coś wartościowego",
    "contact.subtitle": "Opowiedz mi o projekcie — zwykle odpowiadam w ciągu jednego dnia roboczego.",
    "contact.name": "Imię i nazwisko",
    "contact.email": "Adres e-mail",
    "contact.subject": "Temat",
    "contact.message": "Opisz swój projekt",
    "contact.send": "Wyślij wiadomość",
    "contact.success": "Dziękuję — wiadomość została wysłana.",

    "footer.tagline": "Tworzę oprogramowanie, które przetrwa próbę czasu.",
    "footer.rights": "Wszelkie prawa zastrzeżone.",
  },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    const savedLang = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved) setTheme(saved);
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  const value: AppCtx = {
    theme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    lang,
    setLang,
    t: (k) => dict[lang][k] ?? k,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
