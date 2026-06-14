import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Cloud, Code, Database, Server, Terminal } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/section";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MathCode Solutions" },
      {
        name: "description",
        content:
          "Senior full-stack engineer specialising in .NET, Angular, Docker, Kubernetes and Azure cloud architectures.",
      },
      { property: "og:title", content: "About — MathCode Solutions" },
      {
        property: "og:description",
        content: "Engineer. Architect. Problem solver.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const specs = [
  { i: Code, t: ".NET / C#", d: "High-performance backend services with .NET Core, ASP.NET and Ocelot." },
  { i: Terminal, t: "Angular / React", d: "Modern web apps with TypeScript, Angular and React." },
  { i: Server, t: "Microservices", d: "Distributed architecture, Kafka integration and service orchestration." },
  { i: Cloud, t: "Azure / Docker", d: "Cloud-native deployments, containerization and Linux production workflows." },
  { i: Database, t: "Data & Search", d: "MongoDB, Redis, SQL Server and Elasticsearch for analytics and caching." },
  { i: Briefcase, t: "Architecture", d: "Microservices, event-driven design and scalable enterprise systems." },
];

function AboutPage() {
  const { t } = useApp();
  return (
    <>
      <Section className="!pt-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
              {t("about.tag")}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="gradient-text">{t("about.title")}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">{t("about.lead")}</p>
            <p className="mt-4 text-base text-muted-foreground">{t("about.p1")}</p>
            <p className="mt-4 text-base text-muted-foreground">{t("about.p2")}</p>
            <div className="mt-8 flex gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-soft hover:shadow-glow transition-shadow"
              >
                {t("nav.cta")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-5 py-2.5 rounded-xl glass text-sm font-semibold hover:shadow-soft transition-all"
              >
                {t("nav.services")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative justify-self-center lg:justify-self-end"
          >
            <div className="absolute -inset-4 rounded-3xl gradient-primary opacity-30 blur-2xl" />
            <div className="relative h-64 w-64 sm:h-72 sm:w-72 rounded-3xl shadow-elegant overflow-hidden">
              <img
                src="/avatar.jpg"
                alt="Filip Koźlik"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      <Section>
        <SectionHeader tag={t("about.specializations")} title="Specialisations" align="left" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group p-5 rounded-2xl border border-border hover:border-primary/40 hover:shadow-soft transition-all"
            >
              <div className="grid place-items-center h-10 w-10 rounded-lg gradient-primary mb-4">
                <s.i className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold">{s.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader tag={t("about.experience")} title="Career timeline" align="left" />
        <Timeline
          items={[
            { y: "2026 — Present", t: t("about.timeline.1.t"), d: t("about.timeline.1.d") },
            { y: "2024 — 2026", t: t("about.timeline.2.t"), d: t("about.timeline.2.d") },
            { y: "2023 — 2024", t: t("about.timeline.3.t"), d: t("about.timeline.3.d") },
            { y: "2022 — 2023", t: t("about.timeline.4.t"), d: t("about.timeline.4.d") },
          ]}
        />
      </Section>

      <Section>
        <SectionHeader tag={t("about.education")} title="Education timeline" align="left" />
        <Timeline
          items={[
            { y: "2014 — 2016", t: t("about.edu.1.t"), d: t("about.edu.1.d") },
            { y: "2011 — 2014", t: t("about.edu.2.t"), d: t("about.edu.2.d") },
            { y: "2007 — 2011", t: t("about.edu.3.t"), d: t("about.edu.3.d") },
          ]}
        />
      </Section>
    </>
  );
}

function Timeline({ items }: { items: { y: string; t: string; d: string }[] }) {
  return (
    <div className="mt-12 relative">
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border" />
      {items.map((e, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`relative grid sm:grid-cols-2 gap-4 mb-10 pl-12 sm:pl-0 ${
            i % 2 === 0 ? "" : "sm:[&>:first-child]:order-2"
          }`}
        >
          <span className="absolute left-2 sm:left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full gradient-primary ring-4 ring-background" />
          <div className={`${i % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:pl-12"}`}>
            <div className="text-xs font-mono uppercase tracking-wider text-primary">{e.y}</div>
            <h3 className="mt-1 text-lg font-semibold">{e.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{e.d}</p>
          </div>
          <div />
        </motion.div>
      ))}
    </div>
  );
}
