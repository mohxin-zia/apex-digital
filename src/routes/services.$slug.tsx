import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { services, type ServiceSlug } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === (params.slug as ServiceSlug));
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title}, APEX Medical Billing Services` },
          { name: "description", content: loaderData.service.short },
          { property: "og:title", content: `${loaderData.service.title}, APEX` },
          { property: "og:description", content: loaderData.service.short },
        ]
      : [],
  }),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <Button onClick={reset} variant="brand" className="mt-6">Retry</Button>
      </div>
    </SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <h1 className="text-4xl font-bold">Service not found</h1>
        <p className="mt-3 text-muted-foreground">The service you're looking for doesn't exist.</p>
        <Button asChild variant="brand" className="mt-6">
          <Link to="/services">Browse all services</Link>
        </Button>
      </div>
    </SiteLayout>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-brand-foreground shadow-glow">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{service.title}</h1>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{service.short}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-foreground">What's included</h2>
          <p className="mt-4 text-muted-foreground">{service.description}</p>
          <ul className="mt-8 space-y-3">
            {service.bullets.map((b: string) => (
              <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span className="text-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-28 rounded-2xl bg-deep-gradient p-8 text-primary-foreground shadow-glow">
            <h3 className="text-xl font-bold">Talk to an expert</h3>
            <p className="mt-2 text-sm text-primary-foreground/80">Get a free assessment for your practice.</p>
            <Button asChild variant="brand" size="lg" className="mt-6 w-full">
              <Link to="/contact">Schedule a call <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </aside>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">Related services</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
