export interface SpeechBubbleProps {
  label: string;
  icon: string;
  accent: string;
}

export function SpeechBubble({ label, icon, accent }: SpeechBubbleProps) {
  return (
    <div className="atlas-bubble" key={label}>
      <div className="flex items-center gap-1.5 rounded-2xl bg-white/95 px-3 py-1.5 text-[11px] sm:text-xs font-medium text-slate-700 shadow-lg ring-1 ring-black/5 whitespace-nowrap">
        <span
          className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
          style={{ background: accent }}
        >
          {icon}
        </span>
        {label}
      </div>
      <div className="atlas-bubble-tail" />
    </div>
  );
}
