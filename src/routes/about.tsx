import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Award } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { team, stats } from "@/data/site";
import teamImg from "@/assets/team-collaboration.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | APEX Medical Billing Services" },
      { name: "description", content: "Meet the team behind APEX Medical Billing Services. Passionate experts dedicated to maximizing your revenue and simplifying billing." },
      { property: "og:title", content: "About APEX Medical Billing Services" },
      { property: "og:description", content: "Meet the team and learn the story behind APEX." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About us"
        title="Billing partners. Practice champions."
        subtitle="APEX was founded by industry veterans who believed practices deserved a billing partner that is transparent, accountable, and genuinely invested in their success."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-gradient opacity-20 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-border shadow-glow">
              <img
                src={teamImg}
                alt="APEX healthcare team collaborating"
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">Our story</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A decade of practice champions
            </h2>
            <p className="mt-5 text-muted-foreground">
              Founded in 2014, APEX Medical Billing Services started with a simple promise: every claim, every
              denial and every patient balance handled with the same care a practice owner would give it themselves.
            </p>
            <p className="mt-4 text-muted-foreground">
              A decade later, that promise has scaled into a team of certified coders, billers, AR specialists and
              credentialing experts serving providers in 30+ specialties across the United States.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
                  <div className="text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Target, title: "Mission", desc: "Help every practice we serve get paid fully and on time, while freeing them to focus on patient care." },
            { icon: Eye, title: "Vision", desc: "Be the most trusted, transparent and effective revenue cycle partner in healthcare." },
            { icon: Heart, title: "Values", desc: "Integrity, accountability, expertise and a relentless commitment to our clients' growth." },
            { icon: Award, title: "Promise", desc: "Measurable results in 90 days, or we work for free until you see them." },
          ].map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">Leadership</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Meet the team</h2>
            <p className="mt-4 text-muted-foreground">Decades of combined experience in revenue cycle, coding and healthcare operations.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="group rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-glow">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-2xl font-bold text-brand-foreground shadow-soft">
                  {m.initials}
                </div>
                <h3 className="mt-5 font-semibold text-foreground">{m.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Let's grow your practice together</h2>
        <p className="mt-4 text-muted-foreground">See exactly what APEX can do for you in a free 30 minute consultation.</p>
        <div className="mt-8">
          <Button asChild variant="glow" size="xl">
            <Link to="/contact">Schedule a call</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
