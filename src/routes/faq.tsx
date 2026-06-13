import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Section, SectionHeader } from "@/components/site/section";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — MathCode Solutions" },
      {
        name: "description",
        content: "Answers to common questions about timelines, tech stack, modernisation and support.",
      },
      { property: "og:title", content: "FAQ — MathCode Solutions" },
      { property: "og:description", content: "Frequently asked questions." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

const faqsEn = [
  {
    q: "How long does a typical project take?",
    a: "Small features ship in a few weeks. A focused MVP usually takes 6–12 weeks. Larger enterprise builds or modernisations are planned in milestones over 3–9 months.",
  },
  {
    q: "What technologies do you specialise in?",
    a: ".NET / C# on the back-end, Angular and TypeScript on the front-end, Docker and Kubernetes for delivery, and Azure for cloud. I also work with SQL Server, PostgreSQL and Redis.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — I work remotely with teams across Europe and North America. Communication is in English or Polish.",
  },
  {
    q: "Can you modernise existing systems?",
    a: "Absolutely. Modernisation is a core focus — from migrating legacy .NET Framework apps to .NET 8 to containerising monoliths and moving them to Azure / Kubernetes.",
  },
  {
    q: "Do you offer maintenance and support?",
    a: "Yes. After delivery I offer monthly support contracts covering bug fixes, dependency updates, monitoring, performance tuning and small feature work.",
  },
  {
    q: "How do you handle confidentiality?",
    a: "Every engagement starts with an NDA. Code, credentials and data are handled inside your infrastructure whenever possible.",
  },
];

const faqsPl = [
  {
    q: "Ile trwa typowy projekt?",
    a: "Małe funkcje wdrażam w ciągu kilku tygodni. Skupione MVP zajmuje zwykle 6–12 tygodni. Większe wdrożenia enterprise lub modernizacje planuję w kamieniach milowych przez 3–9 miesięcy.",
  },
  {
    q: "W jakich technologiach się specjalizujesz?",
    a: ".NET / C# na backendzie, Angular i TypeScript na frontendzie, Docker i Kubernetes do dostarczania oraz Azure w chmurze. Pracuję też z SQL Server, PostgreSQL i Redis.",
  },
  {
    q: "Czy pracujesz z klientami zagranicznymi?",
    a: "Tak — pracuję zdalnie z zespołami z Europy i Ameryki Północnej. Komunikacja po polsku lub angielsku.",
  },
  {
    q: "Czy modernizujesz istniejące systemy?",
    a: "Tak. Modernizacja to jedna z głównych specjalizacji — od migracji legacy .NET Framework do .NET 8 po konteneryzację monolitów i przeniesienie ich na Azure / Kubernetes.",
  },
  {
    q: "Czy oferujesz wsparcie i utrzymanie?",
    a: "Tak. Po wdrożeniu oferuję miesięczne umowy wsparcia obejmujące poprawki, aktualizacje zależności, monitoring, optymalizację oraz drobne nowe funkcje.",
  },
  {
    q: "Jak dbasz o poufność?",
    a: "Każda współpraca zaczyna się od NDA. Kod, dane i poświadczenia obsługiwane są w Twojej infrastrukturze, jeśli to możliwe.",
  },
];

function FaqPage() {
  const { t, lang } = useApp();
  const [open, setOpen] = useState<number | null>(0);
  const faqs = lang === "pl" ? faqsPl : faqsEn;

  return (
    <Section className="!pt-12">
      <SectionHeader tag={t("faq.tag")} title={t("faq.title")} subtitle={t("faq.subtitle")} />
      <div className="mt-14 max-w-3xl mx-auto space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-2xl border transition-colors overflow-hidden ${
                isOpen ? "border-primary/40 glass shadow-soft" : "border-border"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between text-left px-6 py-5 gap-4"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm sm:text-base">{f.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`grid place-items-center h-8 w-8 shrink-0 rounded-lg ${
                    isOpen ? "gradient-primary text-white" : "bg-accent text-foreground"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}