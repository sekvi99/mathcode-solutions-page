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

    "hero.tag": "Senior Full-Stack Engineering",
    "hero.title": "Scalable Software Solutions Built for Modern Businesses",
    "hero.subtitle":
      "I design and ship resilient enterprise applications with .NET, Angular, and cloud-native architecture — from first commit to production.",
    "hero.cta1": "Start a project",
    "hero.cta2": "Explore services",

    "stack.title": "Tools of the trade",
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

    "about.tag": "About me",
    "about.title": "Engineer. Architect. Problem solver.",
    "about.lead":
      "I'm a senior full-stack engineer specialising in enterprise .NET systems, Angular front-ends, and cloud-native deployments on Azure and Kubernetes.",
    "about.p1":
      "For nearly a decade I've helped teams ship products that need to be fast, observable, and dependable — from greenfield SaaS platforms to large-scale modernisation programmes.",
    "about.p2":
      "I care about clean architecture, pragmatic DevOps, and writing software that other engineers enjoy maintaining.",
    "about.specializations": "Specialisations",
    "about.experience": "Experience",
    "about.timeline.1.t": "Senior Full-Stack Engineer",
    "about.timeline.1.d": "Architecting distributed .NET platforms with Angular front-ends.",
    "about.timeline.2.t": "Cloud & DevOps Lead",
    "about.timeline.2.d": "Kubernetes, Azure, GitOps pipelines and observability at scale.",
    "about.timeline.3.t": "Backend Engineer",
    "about.timeline.3.d": "Designing APIs, event-driven systems, and SQL data layers.",
    "about.education": "Education",
    "about.edu.1.t": "M.Sc. Computer Science",
    "about.edu.1.d": "Distributed systems and software architecture — graduated with honours.",
    "about.edu.2.t": "B.Sc. Computer Science",
    "about.edu.2.d": "Algorithms, data structures, and software engineering fundamentals.",
    "about.edu.3.t": "Technical High School",
    "about.edu.3.d": "IT specialisation — first encounter with programming and Linux.",

    "services.tag": "Services",
    "services.title": "What I build",
    "services.subtitle": "End-to-end engineering, from first idea to running in production.",

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

    "footer.tagline": "Engineering software that lasts.",
    "footer.rights": "All rights reserved.",
  },
  pl: {
    "nav.home": "Strona główna",
    "nav.about": "O mnie",
    "nav.services": "Oferta",
    "nav.faq": "FAQ",
    "nav.contact": "Kontakt",
    "nav.cta": "Rozpocznij projekt",

    "hero.tag": "Senior Full-Stack Engineering",
    "hero.title": "Skalowalne oprogramowanie dla nowoczesnego biznesu",
    "hero.subtitle":
      "Projektuję i wdrażam niezawodne aplikacje enterprise w .NET, Angularze i architekturze cloud-native — od pierwszego commita do produkcji.",
    "hero.cta1": "Rozpocznij projekt",
    "hero.cta2": "Zobacz ofertę",

    "stack.title": "Stack technologiczny",
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

    "about.tag": "O mnie",
    "about.title": "Inżynier. Architekt. Rozwiązuję problemy.",
    "about.lead":
      "Jestem senior full-stack engineerem specjalizującym się w systemach .NET, frontendach w Angularze oraz wdrożeniach cloud-native na Azure i Kubernetes.",
    "about.p1":
      "Od niemal dekady pomagam zespołom dostarczać produkty, które muszą być szybkie, obserwowalne i niezawodne — od greenfield SaaS po duże modernizacje.",
    "about.p2":
      "Stawiam na czystą architekturę, pragmatyczny DevOps i kod, który inni programiści lubią rozwijać.",
    "about.specializations": "Specjalizacje",
    "about.experience": "Doświadczenie",
    "about.timeline.1.t": "Senior Full-Stack Engineer",
    "about.timeline.1.d": "Architektura rozproszonych platform .NET z frontendami w Angularze.",
    "about.timeline.2.t": "Cloud & DevOps Lead",
    "about.timeline.2.d": "Kubernetes, Azure, pipeline'y GitOps i obserwowalność na dużą skalę.",
    "about.timeline.3.t": "Backend Engineer",
    "about.timeline.3.d": "Projektowanie API, systemów zdarzeniowych i warstw SQL.",
    "about.education": "Edukacja",
    "about.edu.1.t": "Mgr inż. Informatyki",
    "about.edu.1.d": "Systemy rozproszone i architektura oprogramowania — ukończone z wyróżnieniem.",
    "about.edu.2.t": "Inż. Informatyki",
    "about.edu.2.d": "Algorytmy, struktury danych i podstawy inżynierii oprogramowania.",
    "about.edu.3.t": "Technikum",
    "about.edu.3.d": "Profil informatyczny — pierwsze spotkanie z programowaniem i Linuksem.",

    "services.tag": "Oferta",
    "services.title": "Co buduję",
    "services.subtitle": "Pełen cykl inżynierski — od pomysłu do produkcji.",

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

    "footer.tagline": "Tworzę oprogramowanie, które trwa.",
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
