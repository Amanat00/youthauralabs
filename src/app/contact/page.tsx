"use client";

import { useState } from "react";
import { CheckCircle2, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const fieldClass = "mt-2 h-12 w-full rounded-xl border border-input bg-white px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10";
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(()=>{setLoading(false);setSubmitted(true);setFormData({name:"",email:"",subject:"",message:""});},600); };

  return <div>
    <PageHero eyebrow="Contact" title="Questions, partnerships or ideas?" accent="Talk to the team." description="Use this page for cohort questions, university or employer partnerships, speaking requests and general enquiries." />
    <section className="section-space site-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
      <form onSubmit={handleSubmit} className="rounded-[34px] border border-black/[.07] bg-white p-6 shadow-[0_18px_60px_rgba(8,20,47,.06)] md:p-9">
        <span className="eyebrow">Send a message</span><h2 className="mt-4 text-3xl font-bold text-ink">Tell us what you need.</h2>
        {submitted && <div className="mt-6 flex gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800"><CheckCircle2 className="size-5 shrink-0"/><span>Thanks — your message has been received in this demo flow.</span></div>}
        <div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Name *"><input required value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} placeholder="Your full name" className={fieldClass}/></Field><Field label="Email *"><input required type="email" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} placeholder="you@example.com" className={fieldClass}/></Field></div>
        <div className="mt-5"><Field label="Subject"><input value={formData.subject} onChange={(e)=>setFormData({...formData,subject:e.target.value})} placeholder="How can we help?" className={fieldClass}/></Field></div>
        <div className="mt-5"><Field label="Message *"><textarea required rows={7} value={formData.message} onChange={(e)=>setFormData({...formData,message:e.target.value})} placeholder="Tell us about your question, partnership or request..." className="mt-2 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"/></Field></div>
        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full !min-h-14 disabled:opacity-50"><Send className="size-4"/>{loading?"Sending...":"Send message"}</button>
      </form>

      <div className="space-y-4"><div className="rounded-[34px] bg-ink p-8 text-white md:p-10"><span className="eyebrow !text-[#ff9b68]">Reach us directly</span><h2 className="mt-5 text-3xl font-bold">Choose the shortest path.</h2><div className="mt-8 space-y-4"><a
  href="mailto:youthauralabs@gmail.com"
  className="flex items-start gap-2 hover:text-white"
>
  <Mail className="mt-0.5 size-4 text-primary" />
  youthauralabs@gmail.com
</a><div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-5"><MapPin className="mt-0.5 size-5 text-primary"/><div><p className="font-bold">Location</p><p className="mt-1 text-sm leading-6 text-white/50">Okara, Pakistan · online cohorts available nationwide.</p></div></div><a href="https://chat.whatsapp.com/FYnPFPS9lYi9FDV7txhSnN" className="flex gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-5"><MessageCircle className="mt-0.5 size-5 text-primary"/><div><p className="font-bold">Community</p><p className="mt-1 text-sm text-white/50">Join the official YouthAura Labs WhatsApp community.</p></div></a></div></div>
        <div className="rounded-[28px] bg-[#fff0e7] p-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Partnerships</p><h3 className="mt-3 text-2xl font-bold text-ink">Universities, employers & mentors</h3><p className="mt-3 text-sm leading-7 text-slate-600">Use the contact form for workshops, mentor contributions, learner opportunities, hiring partnerships or collaboration ideas.</p></div></div>
    </section>
  </div>;
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <label className="block"><span className="text-sm font-bold text-ink">{label}</span>{children}</label>}
