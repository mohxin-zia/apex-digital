import {
  Stethoscope, FileCheck2, ShieldCheck, Activity, Receipt, Users, ClipboardList,
  HeartPulse, Brain, Bone, Baby, Eye, Microscope, Syringe, Pill,
} from "lucide-react";

export type ServiceSlug =
  | "medical-billing"
  | "revenue-cycle-management"
  | "credentialing"
  | "ar-recovery"
  | "denial-management"
  | "coding-audits"
  | "eligibility-verification"
  | "patient-billing";

export interface Service {
  slug: ServiceSlug;
  title: string;
  short: string;
  description: string;
  icon: typeof Stethoscope;
  bullets: string[];
}

export const services: Service[] = [
  {
    slug: "medical-billing",
    title: "Medical Billing",
    short: "Accurate claim creation and timely submission across all payers.",
    description:
      "End to end claim lifecycle management with rigorous QA at every step, from charge capture to payment posting, so your practice gets paid faster and more accurately.",
    icon: Receipt,
    bullets: ["Charge entry & scrubbing", "Electronic claim submission", "Payment posting & reconciliation", "Custom payer rules"],
  },
  {
    slug: "revenue-cycle-management",
    title: "Revenue Cycle Management",
    short: "Full-stack RCM that lifts collections and shrinks AR days.",
    description:
      "We own the entire revenue cycle across front, middle and back office, combining automation, analytics and seasoned billers to consistently move your KPIs in the right direction.",
    icon: Activity,
    bullets: ["Front-desk to final payment", "KPI dashboards", "Workflow automation", "Monthly performance reviews"],
  },
  {
    slug: "credentialing",
    title: "Provider Credentialing",
    short: "Get enrolled with payers quickly and stay credentialed.",
    description:
      "From CAQH setup to payer enrollment and re-credentialing, our team manages the paperwork, follow-ups and timelines so providers can start billing sooner.",
    icon: ShieldCheck,
    bullets: ["CAQH profile management", "Payer enrollment", "Re-credentialing", "Hospital privileging support"],
  },
  {
    slug: "ar-recovery",
    title: "AR Recovery",
    short: "Aggressive follow-up on aged accounts to recover lost revenue.",
    description:
      "Our AR specialists triage aging buckets, prioritize high-value claims and work each one until it's resolved, turning stuck money into deposits.",
    icon: ClipboardList,
    bullets: ["Aging analysis", "Insurance follow-up", "Appeals & resubmissions", "Old AR clean-up projects"],
  },
  {
    slug: "denial-management",
    title: "Denial Management",
    short: "Root-cause analysis that stops denials from happening again.",
    description:
      "We don't just rework denials. We trace them to their source, fix the underlying workflow, and report back so your clean claim rate keeps climbing.",
    icon: FileCheck2,
    bullets: ["Denial categorization", "Appeal letters", "Trend reporting", "Process correction"],
  },
  {
    slug: "coding-audits",
    title: "Medical Coding & Audits",
    short: "Certified coders ensuring accuracy and compliance.",
    description:
      "AAPC-certified coders apply the right ICD-10, CPT and HCPCS codes, with regular audits to keep you compliant and protect against takebacks.",
    icon: Microscope,
    bullets: ["ICD-10 / CPT / HCPCS", "Specialty-specific coding", "Compliance audits", "Provider education"],
  },
  {
    slug: "eligibility-verification",
    title: "Eligibility Verification",
    short: "Verify benefits before the visit to prevent denials.",
    description:
      "Real-time and batch eligibility checks confirm coverage, copays and authorizations so the front desk and providers always have the right information.",
    icon: Users,
    bullets: ["Real-time checks", "Benefits summary", "Prior auth tracking", "Patient responsibility estimates"],
  },
  {
    slug: "patient-billing",
    title: "Patient Billing & Support",
    short: "Friendly statements and a dedicated patient help desk.",
    description:
      "Clear statements, online payment options and a US based patient support team. A billing experience your patients will actually appreciate.",
    icon: Stethoscope,
    bullets: ["E-statements & paper", "Online payment portal", "Patient call center", "Payment plans"],
  },
];

export interface Specialty {
  name: string;
  icon: typeof HeartPulse;
}

export const specialties: Specialty[] = [
  { name: "Cardiology", icon: HeartPulse },
  { name: "Neurology", icon: Brain },
  { name: "Orthopedics", icon: Bone },
  { name: "Pediatrics", icon: Baby },
  { name: "Ophthalmology", icon: Eye },
  { name: "Internal Medicine", icon: Stethoscope },
  { name: "Pathology", icon: Microscope },
  { name: "Anesthesiology", icon: Syringe },
  { name: "Pharmacy", icon: Pill },
  { name: "Urgent Care", icon: Activity },
  { name: "Family Practice", icon: Users },
  { name: "Behavioral Health", icon: Brain },
];

export const stats = [
  { value: "98%", label: "Clean claim rate" },
  { value: "30%", label: "Avg. revenue lift" },
  { value: "<25", label: "Days in AR" },
  { value: "24/7", label: "Dedicated support" },
];

export const testimonials = [
  {
    quote: "APEX cleaned up two years of aged AR in four months. Our cash flow has never been healthier.",
    name: "Dr. Amanda Reyes",
    role: "Cardiology Group, TX",
  },
  {
    quote: "Their denial team is relentless. Our first-pass acceptance jumped from 87% to 98%.",
    name: "Mark Thompson",
    role: "Practice Manager, Orthopedic Clinic",
  },
  {
    quote: "Finally a billing partner that communicates like a real teammate. The reporting is fantastic.",
    name: "Dr. Priya Shah",
    role: "Internal Medicine, NJ",
  },
];

export const team = [
  { name: "Sarah Mitchell", role: "Chief Executive Officer", initials: "SM" },
  { name: "David Chen", role: "Director of Operations", initials: "DC" },
  { name: "Aisha Karim", role: "Head of Coding & Compliance", initials: "AK" },
  { name: "Jonathan Pierce", role: "Client Success Lead", initials: "JP" },
];

export const faqs = [
  {
    q: "How quickly can APEX onboard my practice?",
    a: "Most practices are fully onboarded in 7 to 14 days. We handle the EHR/PM integration, payer setup and team training so there is no disruption to your day to day operations.",
  },
  {
    q: "Do you work with my EHR or practice management system?",
    a: "Yes. We integrate with all major systems including Epic, Athenahealth, eClinicalWorks, Kareo, AdvancedMD, DrChrono and dozens more. If you use it, we can work with it.",
  },
  {
    q: "How do you charge for your services?",
    a: "We offer transparent percentage based pricing on collections, with no hidden fees or long term contracts. The exact rate depends on your specialty and volume, and we will quote you after a free practice audit.",
  },
  {
    q: "What happens to my existing AR?",
    a: "Our dedicated old AR team will work your aged claims alongside new submissions. Most clients see meaningful recovery within the first 60 to 90 days.",
  },
  {
    q: "Is my patient data secure?",
    a: "Absolutely. We are HIPAA compliant with SOC 2 Type II controls, encrypted data transfer, role based access and full audit logging on every action.",
  },
  {
    q: "What kind of reporting will I receive?",
    a: "You get a live dashboard with the KPIs that matter such as collections, AR aging, denials and clean claim rate, plus a detailed monthly performance review with your account manager.",
  },
];
