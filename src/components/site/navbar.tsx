import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Code2, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/lib/app-context";

const navKeys = [
  { to: "/", k: "nav.home" },
  { to: "/about", k: "nav.about" },
  { to: "/services", k: "nav.services" },
  { to: "/faq", k: "nav.faq" },
  { to: "/contact", k: "nav.contact" },
] as const;

export function Navbar() {
  const { theme, toggleTheme, lang, setLang, t } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 ${
            scrolled ? "glass shadow-soft" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid place-items-center h-9 w-9 rounded-xl gradient-primary shadow-glow">
              <Code2 className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="font-display font-bold tracking-tight text-base sm:text-lg">
              MathCode<span className="text-primary">.</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navKeys.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {({ isActive }) => (
                    <>
                      <span>{t(n.k)}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full gradient-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "pl" : "en")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{lang}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="grid place-items-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg gradient-primary text-white shadow-soft hover:shadow-glow transition-shadow"
            >
              {t("nav.cta")}
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden grid place-items-center h-9 w-9 rounded-lg text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 bg-background border border-border rounded-2xl p-4 shadow-elegant"
            >
              <ul className="flex flex-col gap-1">
                {navKeys.map((n) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                      activeProps={{ className: "bg-accent text-foreground" }}
                      activeOptions={{ exact: n.to === "/" }}
                    >
                      {t(n.k)}
                    </Link>
                  </li>
                ))}
                <li className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setLang(lang === "en" ? "pl" : "en")}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-accent"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="uppercase">{lang === "en" ? "PL" : "EN"}</span>
                  </button>
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg gradient-primary text-white"
                  >
                    {t("nav.cta")}
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
