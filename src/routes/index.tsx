import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Server,
  Cloud,
  Boxes,
  Database,
  Shield,
  Gauge,
  Layers,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/site/section";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MathCode Solutions — Scalable Software for Modern Businesses" },
      {
        name: "description",
        content:
          "Senior full-stack engineering: .NET, Angular, Docker, Kubernetes, Azure. Production-ready software, delivered.",
      },
      { property: "og:title", content: "MathCode Solutions" },
      {
        property: "og:description",
        content: "Scalable software solutions built for modern businesses.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const techStack = [
  { name: ".NET", color: "from-violet-500 to-purple-600" },
  { name: "C#", color: "from-indigo-500 to-violet-600" },
  { name: "Angular", color: "from-rose-500 to-red-600" },
  { name: "TypeScript", color: "from-blue-500 to-sky-600" },
  { name: "Docker", color: "from-sky-500 to-blue-600" },
  { name: "Kubernetes", color: "from-blue-600 to-indigo-700" },
  { name: "Azure", color: "from-cyan-500 to-blue-600" },
  { name: "SQL Server", color: "from-red-500 to-orange-600" },
  { name: "PostgreSQL", color: "from-sky-600 to-blue-700" },
  { name: "Redis", color: "from-red-500 to-rose-600" },
  { name: "RabbitMQ", color: "from-orange-500 to-amber-600" },
  { name: "GitHub Actions", color: "from-slate-600 to-slate-800" },
];

function HomePage() {
  const { t } = useApp();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
              <Sparkles className="h-3 w-3" /> {t("hero.tag")}
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="gradient-text">{t("hero.title")}</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white text-sm font-semibold shadow-elegant hover:shadow-glow transition-all"
              >
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass text-sm font-semibold hover:shadow-soft transition-all"
              >
                {t("hero.cta2")}
              </Link>
            </div>
          </motion.div>

          {/* Floating code card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <div className="glass rounded-2xl p-1 shadow-elegant animate-float">
              <div className="rounded-xl bg-background/40 p-5 font-mono text-xs sm:text-sm overflow-hidden">
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-muted-foreground text-[10px]">
                    mathcode/architecture.cs
                  </span>
                </div>
                <pre className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
{`  public class SolutionArchitect : ISeniorEngineer
  {
      public Task<Product> BuildAsync(Idea idea) =>
          idea
              .Design(scale: Infinite)
              .Containerize()
              .DeployToKubernetes()
              .Observe()
              .DeliverAsync();
  }`}
                </pre>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK */}
      <Section>
        <SectionHeader tag={t("stack.title")} title="A modern, battle-tested stack" subtitle={t("stack.subtitle")} />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="group relative glass rounded-xl p-4 hover:shadow-soft hover:-translate-y-1 transition-all overflow-hidden"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${tech.color} transition-opacity`}
              />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-sm font-medium">{tech.name}</span>
                <span className="h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* STATS */}
      <Section className="!py-12">
        <div className="glass rounded-3xl p-8 sm:p-12 shadow-soft">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { v: "10+", l: t("stats.projects") },
              { v: "5+", l: t("stats.years") },
              { v: "99.9%", l: t("stats.uptime") },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold gradient-text">{s.v}</div>
                <div className="mt-2 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-mono">
                  {s.l}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* WHY */}
      <Section>
        <SectionHeader tag={t("why.title")} title={t("why.title")} subtitle={t("why.subtitle")} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {[
            { i: Layers, t: t("why.1.t"), d: t("why.1.d") },
            { i: Cloud, t: t("why.2.t"), d: t("why.2.d") },
            { i: Shield, t: t("why.3.t"), d: t("why.3.d") },
            { i: Gauge, t: t("why.4.t"), d: t("why.4.d") },
          ].map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative p-6 rounded-2xl border border-border hover:border-primary/40 hover:shadow-soft transition-all"
            >
              <div className="grid place-items-center h-12 w-12 rounded-xl gradient-primary shadow-glow mb-4">
                <it.i className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center shadow-elegant">
          <div className="absolute inset-0 gradient-primary" />
          <div className="absolute inset-0 opacity-30 grid-bg" />
          <div className="relative">
            <Server className="h-10 w-10 text-white/90 mx-auto" />
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
              Have a project in mind?
            </h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              From greenfield builds to enterprise modernisation — let's talk about what you need.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary text-sm font-semibold hover:shadow-glow transition-shadow"
            >
              {t("nav.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

// keep imports referenced
void Boxes;
void Database;