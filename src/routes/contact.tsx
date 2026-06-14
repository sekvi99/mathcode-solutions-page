import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/section";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MathCode Solutions" },
      {
        name: "description",
        content: "Get in touch about your project — usually a reply within one business day.",
      },
      { property: "og:title", content: "Contact — MathCode Solutions" },
      { property: "og:description", content: "Let's build something great." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useApp();

  return (
    <>
      <Section className="!pt-12 !pb-10">
        <SectionHeader
          tag={t("contact.tag")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />
      </Section>

      <Section className="!pt-0">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {[
              { i: Mail, t: "Email", d: "filmatkozlik@gmail.com", href: "mailto:filmatkozlik@gmail.com" },
              { i: Linkedin, t: "LinkedIn", d: "/in/filip-kozlik", href: "https://www.linkedin.com/in/filip-ko%C5%BAlik-666625289/" },
              { i: Github, t: "GitHub", d: "https://github.com/sekvi99", href: "https://github.com/sekvi99" },
              { i: MapPin, t: "Based in", d: "Katowice, Poland — working remotely", href: "#" },
            ].map((c) => (
              <motion.a
                key={c.t}
                href={c.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border hover:border-primary/40 hover:shadow-soft transition-all group"
              >
                <div className="grid place-items-center h-11 w-11 rounded-xl gradient-primary shadow-glow shrink-0">
                  <c.i className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {c.t}
                  </div>
                  <div className="mt-0.5 font-medium truncate group-hover:text-primary transition-colors">
                    {c.d}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}