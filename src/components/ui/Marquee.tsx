import { Flame } from "lucide-react";

const MARQUEE_ITEMS = [
  "Resume that survives ATS",
  "Interviews you don't fear",
  "LinkedIn that gets replies",
  "Freelance profile that converts",
  "AI workflows you can sell",
  "A portfolio, not a promise",
];

export default function Marquee() {
  return (
    <div className="gradient-flame overflow-hidden py-3.5 text-flame-foreground shadow-flame select-none">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {/* Render twice for seamless looping */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <span
            key={idx}
            className="flex items-center gap-10 text-xs sm:text-sm font-bold uppercase tracking-widest"
          >
            <span>{item}</span>
            <Flame className="size-4 opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
}
