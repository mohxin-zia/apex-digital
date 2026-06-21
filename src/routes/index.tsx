import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Clock,
  Zap,
  BarChart3,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { services, specialties, stats } from "@/data/site";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { HeroContactForm } from "@/components/site/HeroContactForm";
import { FaqSection } from "@/components/site/FaqSection";
import whyUsImg from "@/assets/why-us.jpg";
import doctorImg from "@/assets/doctor-portrait.jpg";
import WhoWeAreSection from "@/components/site/WhoWeAre";
import EHR from "@/components/site/EHR";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APEX Medical Billing Services, Maximize Your Revenue" },
      {
        name: "description",
        content:
          "Reduce denials, accelerate collections and stay compliant with APEX's end-to-end medical billing & RCM services.",
      },
      { property: "og:title", content: "APEX Medical Billing Services" },
      {
        property: "og:description",
        content:
          "End-to-end medical billing & revenue cycle management for modern practices.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-hero relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-brand/20 blur-2xl animate-blob" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-2xl animate-blob" style={{ animationDelay: "4s" }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Sparkles className="h-3.5 w-3.5" /> Trusted by 500+ providers
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Get paid faster.{" "}
              <span className="text-brand">Stress less.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              APEX Medical Billing Services delivers end to end revenue cycle management, from credentialing
              and coding to denial recovery, so your practice can focus on patient care.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="glow" size="xl">
                <Link to="/contact">
                  Get a Free Audit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outlineBrand" size="xl">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["HIPAA compliant", "AAPC certified coders", "Transparent reporting"].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand" /> {i}
                  </li>
              ))}
            </ul>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card/60 p-3 backdrop-blur">
                  <div className="text-xl font-bold text-foreground sm:text-2xl">{s.value}</div>
                  <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <HeroContactForm />
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              What we do
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Full-stack billing & RCM services
            </h2>
            <p className="mt-4 text-gray-500">
              Every part of your revenue cycle, owned by one accountable team.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-brand/50 hover:shadow-glow"
                >
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-brand-foreground group-hover:shadow-glow">
                    <s.icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                    {s.short}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Link to="/services">View all services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────── */}
      <section className="bg-[#111118]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">

          {/* Left */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Why APEX
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              The billing partner your practice deserves
            </h2>
            <p className="mt-4 text-white/50">
              We combine seasoned billers, certified coders and modern automation to
              consistently deliver measurable improvements to your bottom line.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: TrendingUp,
                  title: "Higher collections",
                  desc: "Average 30% revenue lift in the first 90 days.",
                  color: "text-brand",
                  bg: "bg-brand/10",
                },
                {
                  icon: ShieldCheck,
                  title: "HIPAA compliant",
                  desc: "Enterprise-grade security and full audit trails.",
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
                {
                  icon: Clock,
                  title: "Faster turnaround",
                  desc: "24-hour claim submission, 25-day AR average.",
                  color: "text-brand",
                  bg: "bg-brand/10",
                },
                {
                  icon: BarChart3,
                  title: "Live reporting",
                  desc: "Real-time dashboards with the metrics that matter.",
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/8 bg-white/5 p-5 transition-colors hover:border-brand/30"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${f.bg} ${f.color}`}
                  >
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm text-white/45">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand/20 to-primary/20 blur-3xl" />
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-glow">
              <img
                src={doctorImg}
                alt="Healthcare professional"
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-md sm:left-auto sm:right-6 sm:max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">+30%</div>
                  <div className="text-xs text-white/50">Avg. revenue lift in 90 days</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <WhoWeAreSection />

      {/* ── SPECIALTIES ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Specialties
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Expertise across 30+ specialties
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-brand hover:bg-brand/10 hover:text-brand"
          >
            <Link to="/specialties">
              See all specialties <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {specialties.slice(0, 12).map((sp, i) => (
            <motion.div
              key={sp.name}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-soft transition-all hover:-translate-y-1 hover:border-brand/40 hover:bg-brand/5 hover:shadow-glow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <sp.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-brand">
                {sp.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EHR logos */}
      <EHR />

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Orange → Blue gradient background */}
        <div className="absolute inset-0  bg-[oklch(0.16_0.04_250)]" />
              <div className="bg-dots pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Testimonials
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Loved by providers nationwide
            </h2>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#111118] p-10 sm:p-16">
          {/* Background image overlay */}
          <img
            src={whyUsImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-screen"
          />

          {/* Blobs */}
          <div className="pointer-events-none absolute -right-12 top-0 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-12 bottom-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                <Zap className="h-3 w-3" /> Free audit — no commitment
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to recover lost revenue?
              </h2>
              <p className="mt-4 max-w-xl text-white/55">
                Book a free 30-minute audit. We'll review your last 90 days of claims
                and show you exactly where the money is hiding. No commitment required.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Button
                asChild
                size="xl"
                className="bg-brand text-brand-foreground hover:bg-brand/90 border-0 shadow-lg shadow-brand/30"
              >
                <Link to="/contact">
                  Get my free audit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                className="border border-white/20 bg-white/8 text-white hover:bg-white/14 backdrop-blur-sm"
                variant="ghost"
              >
                <Link to="/services">View services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}