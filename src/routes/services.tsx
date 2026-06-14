import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  Workflow,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/site/section";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — MathCode Solutions" },
      {
        name: "description",
        content:
          "Full-stack web apps, enterprise systems, backend architecture, cloud-native solutions, Kubernetes deployments and consulting.",
      },
      { property: "og:title", content: "Services — MathCode Solutions" },
      { property: "og:description", content: "End-to-end engineering services." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    i: Globe,
    t: "Full-stack web applications",
    d: "Production-ready web products built with .NET and Angular, end-to-end.",
  },
  {
    i: Boxes,
    t: "Enterprise software",
    d: "Large-scale internal systems with audit, security and compliance in mind.",
  },
  {
    i: Layers,
    t: "Backend architecture",
    d: "Modular monoliths, microservices, event-driven systems, DDD and CQRS.",
  },
  {
    i: Cloud,
    t: "Cloud-native solutions",
    d: "Azure-first designs with autoscaling, observability and cost control.",
  },
  {
    i: Code2,
    t: "API development & integrations",
    d: "REST, gRPC, GraphQL and third-party platform integrations built to last.",
  },
  {
    i: Cpu,
    t: "Docker & Kubernetes",
    d: "Containerised workloads on AKS with GitOps, Helm and zero-downtime rollouts.",
  },
  {
    i: GitBranch,
    t: "Application modernisation",
    d: "Migrating legacy systems to modern .NET, cloud and CI/CD pipelines.",
  },
  {
    i: Gauge,
    t: "Performance optimisation",
    d: "Profiling, caching, query tuning and front-end performance work.",
  },
  {
    i: Workflow,
    t: "Consulting & architecture",
    d: "Senior technical advisory, audits, and architecture design reviews.",
  },
];

function ServicesPage() {
  const { t } = useApp();
  return (
    <>
      <Section className="!pt-12">
        <SectionHeader
          tag={t("services.tag")}
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative p-6 rounded-2xl glass hover:-translate-y-1 hover:shadow-elegant transition-all overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="grid place-items-center h-12 w-12 rounded-xl gradient-primary shadow-glow mb-5">
                  <s.i className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center shadow-elegant">
          <div className="absolute inset-0 gradient-primary" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Not sure which service fits?
            </h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Send me a short description of your project — I'll suggest the right approach.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary text-sm font-semibold hover:shadow-glow transition-shadow"
            >
              {t("nav.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}