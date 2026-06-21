import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu, X, ChevronDown, Phone, Mail, MapPin,
  Users2, Award, BookOpen, ShieldCheck, FileText,
} from "lucide-react";
import logo from "@/assets/apex-logo.jpeg";
import { services } from "@/data/site";
import { Button } from "@/components/ui/button";

// Navbar: Services + Company use mega-dropdowns; Specialties + Contact are simple links.

const companyLinks = [
  { to: "/about", label: "About Us", desc: "Our story, mission and team", icon: Users2 },
  { to: "/privacy", label: "Privacy Policy", desc: "How we protect your data", icon: ShieldCheck },
  { to: "/terms", label: "Terms & Conditions", desc: "Service terms", icon: FileText },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass border-b border-border/60 shadow-soft" : "bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo} alt="APEX Medical Billing Services" className="h-14 w-auto sm:h-20" loading="eager" decoding="async" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          <NavLink to="/">Home</NavLink>

          <MegaDropdown
            label="Services"
            items={services.map((s) => ({
              to: `/services/${s.slug}`,
              label: s.title,
              desc: s.short,
              icon: s.icon,
            }))}
            footer={{ to: "/services", label: "View all services" }}
            columns={2}
          />

          <NavLink to="/specialties">Specialties</NavLink>

          <MegaDropdown
            label="Company"
            items={companyLinks.map((c) => ({ to: c.to, label: c.label, desc: c.desc, icon: c.icon }))}
            columns={1}
          />

          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href="tel:+18005550199"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-brand"
          >
            <Phone className="h-4 w-4" /> (360) 471-0628
          </a>
          <Button asChild variant="glow" size="lg">
            <Link to="/contact">Get a Free Audit</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card xl:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 top-20 z-40 transform overflow-y-auto bg-background transition-transform duration-300 xl:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex min-h-full flex-col gap-1 px-5 pb-10 pt-6">
          <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>

          <MobileGroup label="Services">
            {services.map((s) => (
              <MobileItem
                key={s.slug}
                to={`/services/${s.slug}`}
                icon={s.icon}
                title={s.title}
                desc={s.short}
                onClick={() => setOpen(false)}
              />
            ))}
            <MobileLink to="/services" onClick={() => setOpen(false)} indent>
              View all services
            </MobileLink>
          </MobileGroup>

          <MobileLink to="/specialties" onClick={() => setOpen(false)}>Specialties</MobileLink>

          <MobileGroup label="Company">
            {companyLinks.map((c) => (
              <MobileItem
                key={c.label}
                to={c.to}
                icon={c.icon}
                title={c.label}
                desc={c.desc}
                onClick={() => setOpen(false)}
              />
            ))}
          </MobileGroup>

          <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileLink>

          <div className="mt-6 space-y-3 rounded-2xl border border-border bg-card p-5">
            <a href="tel:+18005550199" className="flex items-center gap-3 text-sm font-medium text-foreground">
              <Phone className="h-4 w-4 text-brand" /> (360) 471-0628
            </a>
            <a href="mailto:contact@apexmbilling.com" className="flex items-center gap-3 text-sm text-foreground/80">
              <Mail className="h-4 w-4 text-brand" /> contact@apexmbilling.com
            </a>
            <div className="flex items-start gap-3 text-sm text-foreground/70">
              <MapPin className="mt-0.5 h-4 w-4 text-brand" /> Los Angeles, CA
            </div>
          </div>

          <Button asChild variant="glow" size="lg" className="mt-4">
            <Link to="/contact" onClick={() => setOpen(false)}>Get a Free Audit</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
      activeProps={{ className: "text-brand" }}
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}

type MegaItem = {
  to: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
};

function MegaDropdown({
  label,
  items,
  footer,
  columns = 1,
}: {
  label: string;
  items: MegaItem[];
  footer?: { to: string; label: string };
  columns?: 1 | 2;
}) {
  return (
    <div className="group relative">
      <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground">
        {label}
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>
      <div
        className={`invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
          columns === 2 ? "w-[640px]" : "w-80"
        }`}
      >
        <div className="rounded-2xl border border-border bg-popover p-3 shadow-glow">
          <div className={`grid gap-1 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {items.map((i) => (
              <Link
                key={`${i.label}-${i.to}`}
                to={i.to}
                className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover/item:bg-brand-gradient group-hover/item:text-brand-foreground">
                  <i.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{i.label}</div>
                  <div className="line-clamp-1 text-xs text-muted-foreground">{i.desc}</div>
                </div>
              </Link>
            ))}
          </div>
          {footer && (
            <Link
              to={footer.to}
              className="mt-2 flex items-center justify-center rounded-xl bg-secondary px-3 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              {footer.label} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileLink({
  to, children, onClick, indent,
}: { to: string; children: React.ReactNode; onClick: () => void; indent?: boolean }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-secondary ${indent ? "ml-3 text-sm text-foreground/80" : ""}`}
    >
      {children}
    </Link>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-1">
      <div className="px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function MobileItem({
  to, icon: Icon, title, desc, onClick,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="ml-2 flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="line-clamp-1 text-xs text-muted-foreground">{desc}</div>
      </div>
    </Link>
  );
}
