import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FloatingField } from "@/components/forms/FloatingField";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  practice: z.string().trim().min(2, "Practice name required").max(120),
  smsConsent: z.boolean().refine((val) => val === true, "Required"),
});

type Data = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Data, string>>;

export function HeroContactForm() {
  const [data, setData] = useState<Data>({ name: "", email: "", phone: "", practice: "", smsConsent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = <K extends keyof Data>(k: K, v: Data[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errors = {};
      for (const i of r.error.issues) errs[i.path[0] as keyof Data] = i.message;
      setErrors(errs);
      return;
    }
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="relative"
    >
      <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-brand/20 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full bg-primary/20 blur-2xl" />

      <div className="rounded-3xl bg-deep-gradient p-1 shadow-glow">
        <div className="rounded-[calc(1.5rem-4px)] bg-card p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                Get a Free Practice Audit
              </h3>
            </div>

          </div>

          {sent ? (
            <div className="mt-4 flex flex-col items-center justify-center rounded-2xl bg-secondary/50 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h4 className="mt-4 text-lg font-bold text-foreground">You're all set!</h4>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                A revenue specialist will reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              <p className="text-[10px] leading-relaxed text-muted-foreground bg-muted/20 p-3 rounded-xl border border-border/50">
                By providing a phone number and submitting this form, you are consenting to be contacted by SMS text message from Apex Medical Billing Services. Message & data rates may apply. Message frequency may vary. You can reply STOP to opt-out of further messaging and HELP for more information. View our Privacy Policy here:{" "}
                <Link to="/privacy" className="text-brand font-medium hover:underline">
                  Privacy Policy
                </Link>
              </p>
              <FloatingField
                id="hero-name"
                label="Full name"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                error={errors.name}
                autoComplete="name"
              />
              <FloatingField
                id="hero-email"
                label="Work email"
                type="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                error={errors.email}
                autoComplete="email"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <FloatingField
                  id="hero-phone"
                  label="Phone"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  error={errors.phone}
                  autoComplete="tel"
                />
                <FloatingField
                  id="hero-practice"
                  label="Practice name"
                  value={data.practice}
                  onChange={(e) => update("practice", e.target.value)}
                  error={errors.practice}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="hero-smsConsent"
                    checked={data.smsConsent}
                    onChange={(e) => update("smsConsent", e.target.checked)}
                    className="mt-1 h-3.5 w-3.5 shrink-0 rounded border-border text-brand focus:ring-brand"
                  />
                  <label htmlFor="hero-smsConsent" className="text-[11px] text-muted-foreground leading-tight">
                    I agree to receive SMS communications from Apex Medical Billing Services.
                  </label>
                </div>
                {errors.smsConsent && <p className="text-[10px] font-medium text-destructive pl-5">{errors.smsConsent}</p>}
              </div>
              <Button type="submit" variant="glow" size="lg" className="w-full">
                Request Free Audit <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                HIPAA compliant. Your data stays private.
              </p>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}