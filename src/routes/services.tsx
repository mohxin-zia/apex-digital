import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { services } from "@/data/site";
import { FaqSection } from "@/components/site/FaqSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services, APEX Medical Billing Services" },
      { name: "description", content: "Explore APEX's full suite of medical billing and revenue cycle management services, from credentialing to denial management." },
      { property: "og:title", content: "Medical Billing Services, APEX" },
      { property: "og:description", content: "Full suite of RCM services for modern healthcare practices." },
    ],
  }),
  component: ServicesLayout,
});

function ServicesLayout() {
  const matchRoute = useMatchRoute();
  const isIndex = matchRoute({ to: "/services" });
  if (!isIndex) return <Outlet />;
  return <ServicesIndex />;
}

function ServicesIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Everything your revenue cycle needs"
        subtitle="From the first eligibility check to the last patient payment, we handle it all, end-to-end."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-2 hover:border-brand/50 hover:shadow-glow"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-gradient group-hover:text-brand-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <FaqSection />
    </SiteLayout>
  );
}
