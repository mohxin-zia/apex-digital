import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { specialties } from "@/data/site";
import { FaqSection } from "@/components/site/FaqSection";

export const Route = createFileRoute("/specialties")({
  head: () => ({
    meta: [
      { title: "Specialties, APEX Medical Billing Services" },
      { name: "description", content: "APEX provides specialty-specific medical billing across cardiology, orthopedics, pediatrics, behavioral health and 30+ more specialties." },
      { property: "og:title", content: "Specialties We Serve, APEX" },
      { property: "og:description", content: "Specialty-specific billing for 30+ practice types." },
    ],
  }),
  component: SpecialtiesPage,
});

function SpecialtiesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Specialties"
        title="Specialty-specific expertise"
        subtitle="Our coders and billers train on your specialty's payer rules, modifiers and edge cases, so we hit the ground running."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {specialties.map((sp, i) => (
            <motion.div
              key={sp.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-soft transition-all hover:border-brand/40"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary transition-all group-hover:bg-brand-gradient group-hover:text-brand-foreground group-hover:shadow-glow">
                <sp.icon className="h-8 w-8" />
              </div>
              <span className="text-base font-semibold text-foreground">{sp.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-soft sm:p-16 text-center"
        >
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Our Commitment</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
            At APEX Medical Billing Services, we don’t just handle billing—we transform it. Our commitment is to help your practice thrive financially, so you can focus entirely on delivering exceptional patient care.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
            Contact us today to discover how we can optimize your revenue cycle, reduce administrative burdens, and strengthen your practice’s financial health.
          </p>
        </motion.div>

        <div className="mt-10 rounded-3xl bg-deep-gradient p-10 text-center text-primary-foreground shadow-glow sm:p-14">
          <h2 className="text-3xl font-bold">Don't see your specialty?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            We support 30+ specialties and onboard new ones every month. Reach out and we'll show you exactly how we'd serve your practice.
          </p>
          <Button asChild variant="brand" size="xl" className="mt-8">
            <Link to="/contact">Talk to us <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <FaqSection />
    </SiteLayout>
  );
}
