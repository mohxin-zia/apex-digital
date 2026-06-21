import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/apex-logo.jpeg";
import { services } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[oklch(0.16_0.04_250)] text-white">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex items-center justify-center rounded-2xl bg-white p-2 shadow-soft">
              <img src={logo} alt="APEX Medical Billing Services" className="h-12 w-auto" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              End-to-end medical billing and revenue cycle management built for modern healthcare practices.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-brand-foreground"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Services">
            {services.slice(0, 6).map((s) => (
              <FooterLink key={s.slug} to={`/services/${s.slug}`}>{s.title}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/specialties">Specialties</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms & Conditions</FooterLink>
          </FooterCol>

          <FooterCol title="Get in touch">
            <li className="flex items-start gap-3 text-sm text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 text-brand" />
              <span>163 Wapiti Rd<br />Whitehall MT 59759</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-white/70">
              <Phone className="h-4 w-4 text-brand" />
              <a href="tel:+18005550199" className="hover:text-white">(360) 471-0628</a>
            </li>
            <li className="flex items-center gap-3 text-sm text-white/70">
              <Mail className="h-4 w-4 text-brand" />
              <a href="mailto:contact@apexmbilling.com" className="hover:text-white">contact@apexmbilling.com</a>
            </li>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} APEX Medical Billing Services. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{title}</h4>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-sm text-white/70 transition-colors hover:text-brand">
        {children}
      </Link>
    </li>
  );
}
