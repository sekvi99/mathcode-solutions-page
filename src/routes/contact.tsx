import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
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

function FloatingField({
  id,
  label,
  type = "text",
  textarea,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const base =
    "peer w-full bg-transparent border border-border rounded-xl px-4 pt-6 pb-2 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder-transparent";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          required={required}
          rows={5}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base + " resize-none"}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-sans peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary"
      >
        {label}
      </label>
    </div>
  );
}

function ContactPage() {
  const { t } = useApp();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

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
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 sm:p-8 shadow-soft space-y-4 relative overflow-hidden"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <FloatingField
                id="name"
                label={t("contact.name")}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <FloatingField
                id="email"
                label={t("contact.email")}
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
              />
            </div>
            <FloatingField
              id="subject"
              label={t("contact.subject")}
              value={form.subject}
              onChange={(v) => setForm({ ...form, subject: v })}
            />
            <FloatingField
              id="message"
              label={t("contact.message")}
              textarea
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              required
            />
            <button
              type="submit"
              disabled={status !== "idle"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white text-sm font-semibold shadow-soft hover:shadow-glow transition-shadow disabled:opacity-70"
            >
              {status === "loading" ? (
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : status === "success" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {status === "success" ? t("contact.success") : t("contact.send")}
            </button>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-0 bottom-0 p-3 text-center text-xs font-medium text-primary"
                >
                  {t("contact.success")}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { i: Mail, t: "Email", d: "hello@mathcode.solutions", href: "mailto:hello@mathcode.solutions" },
              { i: Linkedin, t: "LinkedIn", d: "/in/mathcode-solutions", href: "#" },
              { i: Github, t: "GitHub", d: "github.com/mathcode-solutions", href: "#" },
              { i: MapPin, t: "Based in", d: "Warsaw, Poland — working remotely", href: "#" },
            ].map((c) => (
              <a
                key={c.t}
                href={c.href}
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
              </a>
            ))}

          </motion.aside>
        </div>
      </Section>
    </>
  );
}