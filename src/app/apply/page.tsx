"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileUp, ShieldCheck, Sparkles } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

const TRACK_OPTIONS = [
  "Freelancing",
  "E-commerce",
  "Digital Marketing",
  "Social Media Handling",
  "Graphic Designing",
  "AI Automation",
  "Applied AI Across Industries",
  "Project Management",
  "Web Development Awareness",
  "Business Development",
];

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    university: "",
    education: "",
    graduationYear: "",
    linkedinUrl: "",
    skills: "",
    motivation: "",
    portfolioUrl: "",
    agreed: false,
  });

  const fieldClass = "mt-2 h-12 w-full rounded-xl border border-input bg-white px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10";
  const textareaClass = "mt-2 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10";

  const toggleTrack = (track: string) => setSelectedTracks((prev) => prev.includes(track) ? prev.filter((t) => t !== track) : [...prev, track]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) setResumeName(e.target.files[0].name); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTracks.length) { alert("Please select at least one area of interest."); return; }
    if (!formData.agreed) { alert("Please confirm the information provided is accurate."); return; }
    setSubmitting(true);
    try {
      const existing = JSON.parse(localStorage.getItem("youthaura_applications") || "[]");
      const newApp = { id: `app_${Date.now()}`, ...formData, tracks: selectedTracks, resumeName: resumeName || "None attached", submittedAt: new Date().toISOString(), status: "Pending" };
      localStorage.setItem("youthaura_applications", JSON.stringify([newApp, ...existing]));
    } catch {}
    setTimeout(() => { setSubmitting(false); setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }, 650);
  };

  return <div>
    <PageHero eyebrow="Applications" title="Tell us where you are." accent="Show us where you want to go." description="The application is designed to understand your background, interests and motivation. Clear, honest answers matter more than polished language." />

    <section className="site-shell py-16 md:py-20">
      {submitted ? (
        <div className="mx-auto max-w-3xl rounded-[34px] border border-black/[.07] bg-white p-8 text-center shadow-[0_20px_70px_rgba(8,20,47,.08)] md:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 className="size-8" /></span>
          <p className="eyebrow mt-7 justify-center">Application received</p>
          <h1 className="mt-4 text-4xl font-bold text-ink">You’re in the review queue.</h1>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-500">Your application has been saved for review. You can now return to the site or join the community while you wait for the next update.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href="https://chat.whatsapp.com/REPLACE-WITH-YOUR-INVITE-CODE" className="btn-primary">Join WhatsApp community</a><Link href="/" className="btn-outline">Back to home</Link></div>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">Before you start</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-ink">Five minutes. Honest answers. No perfect profile required.</h2>
            <div className="mt-7 space-y-3">{[[Sparkles,"Choose the tracks that genuinely interest you."],[ShieldCheck,"Your information is used for cohort review in this demo flow."],[CheckCircle2,"A laptop and stable internet are recommended for practical sessions."]].map(([Icon,text])=>{const I=Icon as typeof Sparkles; return <div key={String(text)} className="flex gap-3 rounded-2xl bg-white p-4"><I className="mt-0.5 size-5 shrink-0 text-primary"/><p className="text-sm leading-6 text-slate-600">{String(text)}</p></div>})}</div>
            <p className="mt-6 text-xs leading-6 text-slate-400">Note: this project currently stores applications in browser local storage for the demo admin dashboard. Connect a real backend/database before production launch.</p>
          </aside>

          <form onSubmit={handleSubmit} className="space-y-8 rounded-[34px] border border-black/[.07] bg-white p-6 shadow-[0_18px_60px_rgba(8,20,47,.06)] md:p-9">
            <FormSection index="01" title="About you">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name *"><input required maxLength={120} value={formData.fullName} onChange={(e)=>setFormData({...formData,fullName:e.target.value})} placeholder="e.g. Ali Ahmed" className={fieldClass}/></Field>
                <Field label="Email address *"><input required type="email" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} placeholder="you@example.com" className={fieldClass}/></Field>
                <Field label="Phone number *"><input required type="tel" value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} placeholder="+92 300 1234567" className={fieldClass}/></Field>
                <Field label="City *"><input required value={formData.city} onChange={(e)=>setFormData({...formData,city:e.target.value})} placeholder="Lahore" className={fieldClass}/></Field>
                <Field label="Age *"><input required type="number" min={14} max={80} value={formData.age} onChange={(e)=>setFormData({...formData,age:e.target.value})} placeholder="21" className={fieldClass}/></Field>
              </div>
            </FormSection>

            <FormSection index="02" title="Education">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="University / institute *"><input required value={formData.university} onChange={(e)=>setFormData({...formData,university:e.target.value})} placeholder="Your university" className={fieldClass}/></Field>
                <Field label="Current education *"><input required value={formData.education} onChange={(e)=>setFormData({...formData,education:e.target.value})} placeholder="BS Computer Science, 6th semester" className={fieldClass}/></Field>
                <Field label="Graduation year *"><input required value={formData.graduationYear} onChange={(e)=>setFormData({...formData,graduationYear:e.target.value})} placeholder="2027" className={fieldClass}/></Field>
                <Field label="LinkedIn profile"><input type="url" value={formData.linkedinUrl} onChange={(e)=>setFormData({...formData,linkedinUrl:e.target.value})} placeholder="https://linkedin.com/in/..." className={fieldClass}/></Field>
              </div>
            </FormSection>

            <FormSection index="03" title="Your direction">
              <Field label="Skills *"><textarea required rows={4} value={formData.skills} onChange={(e)=>setFormData({...formData,skills:e.target.value})} placeholder="Tools, software, subjects or skills you can already use." className={textareaClass}/></Field>
              <div className="mt-5"><p className="text-sm font-bold text-ink">Areas of interest *</p><p className="mt-1 text-xs text-slate-400">Choose one or more tracks.</p><div className="mt-3 flex flex-wrap gap-2">{TRACK_OPTIONS.map((track)=>{const selected=selectedTracks.includes(track);return <button key={track} type="button" onClick={()=>toggleTrack(track)} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${selected?"border-primary bg-primary text-white":"border-black/10 bg-[#fbfaf7] text-ink/65 hover:border-primary/40"}`}>{track}</button>})}</div></div>
              <div className="mt-5"><Field label="Why do you want to join? *"><textarea required rows={5} value={formData.motivation} onChange={(e)=>setFormData({...formData,motivation:e.target.value})} placeholder="Tell us what you want to change or build during the 12-week experience." className={textareaClass}/></Field></div>
            </FormSection>

            <FormSection index="04" title="Proof & links">
              <label className="block text-sm font-bold text-ink">Resume upload</label>
              <label htmlFor="resume" className="mt-2 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 border-dashed border-black/10 bg-[#fbfaf7] px-5 py-6 transition hover:border-primary/40"><span className="flex items-center gap-3 text-sm text-slate-500"><FileUp className="size-5 text-primary"/>{resumeName || "Choose PDF, DOC or DOCX"}</span>{resumeName && <span className="text-xs font-bold text-primary">Attached</span>}</label>
              <input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="sr-only" />
              <div className="mt-5"><Field label="Portfolio link"><input type="url" value={formData.portfolioUrl} onChange={(e)=>setFormData({...formData,portfolioUrl:e.target.value})} placeholder="https://yourportfolio.com" className={fieldClass}/></Field></div>
            </FormSection>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-secondary p-4"><input type="checkbox" required checked={formData.agreed} onChange={(e)=>setFormData({...formData,agreed:e.target.checked})} className="mt-1 size-4 accent-[#ff5a12]"/><span className="text-sm leading-6 text-slate-600">I confirm the information above is accurate and I agree to the attendance expectations and community conduct rules.</span></label>

            <button type="submit" disabled={submitting} className="btn-primary w-full !min-h-14 disabled:opacity-50">{submitting?"Submitting application...":"Submit application"}</button>
          </form>
        </div>
      )}
    </section>
  </div>;
}

function FormSection({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return <fieldset><legend className="flex w-full items-center gap-3 border-b border-black/[.07] pb-4"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">{index}</span><span className="font-display text-xl font-bold text-ink">{title}</span></legend><div className="mt-5">{children}</div></fieldset>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="text-sm font-bold text-ink">{label}</span>{children}</label>; }
