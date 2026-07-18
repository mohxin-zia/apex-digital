import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { FloatingField } from "@/components/forms/FloatingField";
import { submitToWeb3Forms } from "@/lib/web3forms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us, APEX Medical Billing Services" },
      { name: "description", content: "Get in touch with APEX Medical Billing Services for a free practice audit and consultation." },
      { property: "og:title", content: "Contact APEX Medical Billing" },
      { property: "og:description", content: "Reach out for a free practice audit." },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(30),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(10, "Please add a bit more detail").max(1000),
  smsConsent: z.boolean().refine((val) => val === true, "You must agree to receive SMS communications"),
});

type FormData = z.infer<typeof contactSchema>;
type Errors = Partial<Record<keyof FormData, string>>;

function ContactPage() {
  const [data, setData] = useState<FormData>({ name: "", email: "", phone: "", service: "", message: "", smsConsent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormData;
        errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    const res = await submitToWeb3Forms(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        sms_consent: data.smsConsent ? "Yes" : "No",
      },
      { subject: "New contact enquiry — APEX Medical Billing", from_name: data.name },
    );
    setSubmitting(false);

    if (res.success) {
      setSent(true);
    } else {
      setSubmitError(res.message);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your practice"
        subtitle="Tell us a bit about your practice and we'll reach out within one business day with a tailored plan."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground">Get in touch</h2>
            <p className="mt-3 text-muted-foreground">We'd love to hear from you. Choose whichever channel works best.</p>
            <ul className="mt-8 space-y-5">
              <ContactItem icon={Phone} label="Phone" value="(360) 471-0628" href="tel:+18005550199" />
              <ContactItem icon={Mail} label="Email" value="contact@apexmbilling.com" href="mailto:contact@apexmbilling.com" />
              <ContactItem icon={MapPin} label="Office" value={"163 Wapiti Rd\nWhitehall MT 59759"} />
            </ul>

            <div className="mt-10 overflow-hidden rounded-2xl border border-border">
              <div className="relative flex h-64 items-center justify-center bg-secondary">
                <MapPin className="h-12 w-12 text-brand/60" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,color-mix(in_oklab,var(--brand)_8%,transparent)_70%)]" />
                <div className="absolute bottom-4 left-4 rounded-lg bg-card px-3 py-2 text-sm font-medium shadow-soft">Los Angeles, CA</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-foreground">Thanks, we got your message!</h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">A member of our team will reach out within one business day.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5" noValidate>
                  <FloatingField
                    id="name"
                    label="Full name"
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FloatingField
                      id="email"
                      label="Email address"
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      error={errors.email}
                      autoComplete="email"
                    />
                    <FloatingField
                      id="phone"
                      label="Phone number"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      error={errors.phone}
                      autoComplete="tel"
                    />
                  </div>
                  <FloatingField
                    as="select"
                    id="service"
                    label="Select Service"
                    value={data.service}
                    onChange={(e) => update("service", e.target.value)}
                    error={errors.service}
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="medical_billing">Medical Billing</option>
                    <option value="revenue_cycle">Revenue Cycle Management</option>
                    <option value="credentialing">Credentialing</option>
                    <option value="denial_management">Denial Management</option>
                    <option value="other">Other</option>
                  </FloatingField>
                  <FloatingField
                    as="textarea"
                    id="message"
                    label="How can we help?"
                    value={data.message}
                    onChange={(e) => update("message", e.target.value)}
                    error={errors.message}
                    rows={5}
                  />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="smsConsent"
                        checked={data.smsConsent}
                        onChange={(e) => update("smsConsent", e.target.checked)}
                        className="mt-1 h-4 w-4 shrink-0 rounded border-border text-brand focus:ring-brand"
                      />
                      <label htmlFor="smsConsent" className="text-sm text-muted-foreground leading-snug">
                        I agree to receive SMS communications from APEX Medical Billing services.
                      </label>
                    </div>
                    {errors.smsConsent && <p className="text-xs font-medium text-destructive">{errors.smsConsent}</p>}
                  </div>
                  {submitError && (
                    <p className="text-sm font-medium text-destructive">{submitError}</p>
                  )}
                  <Button type="submit" variant="glow" size="xl" className="w-full" disabled={submitting}>
                    {submitting ? "Sending…" : (<>Send message <Send className="h-4 w-4" /></>)}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactItem({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 whitespace-pre-line text-foreground">{value}</div>
      </div>
    </div>
  );
  return <li>{href ? <a href={href} className="block transition-opacity hover:opacity-80">{inner}</a> : inner}</li>;
}


