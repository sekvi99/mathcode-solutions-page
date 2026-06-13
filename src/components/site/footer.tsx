import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Code2, Github, Linkedin, Mail, Moon, Sun, Globe } from "lucide-react";
import { useApp } from "@/lib/app-context";

export function Footer() {
  const { theme, toggleTheme, lang, setLang, t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-border">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.65 0.2 255 / 0.7), transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Link to="/" className="flex items-center gap-2">
              <span className="grid place-items-center h-10 w-10 rounded-xl gradient-primary shadow-glow">
                <Code2 className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display font-bold text-lg">
                MathCode<span className="text-primary">.</span>Solutions
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t("footer.tagline")}</p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "/contact", label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid place-items-center h-10 w-10 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:shadow-soft transition-all"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{t("nav.home")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { to: "/", k: "nav.home" },
                { to: "/about", k: "nav.about" },
                { to: "/services", k: "nav.services" },
                { to: "/faq", k: "nav.faq" },
                { to: "/contact", k: "nav.contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-foreground transition-colors">
                    {t(l.k)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Preferences</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setLang(lang === "en" ? "pl" : "en")}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm hover:border-primary/40 transition-colors w-fit"
              >
                <Globe className="h-4 w-4" /> {lang === "en" ? "English 🇬🇧" : "Polski 🇵🇱"}
              </button>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm hover:border-primary/40 transition-colors w-fit"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {year} MathCode Solutions. {t("footer.rights")}
          </p>
          <p className="font-mono">crafted with care · v1.0</p>
        </div>
      </div>
    </footer>
  );
}