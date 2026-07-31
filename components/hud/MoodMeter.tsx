export interface MoodMeterProps {
  name: string;
  value: number;
  accent: string;
}

export function MoodMeter({ name, value, accent }: MoodMeterProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-md ring-1 ring-black/5 backdrop-blur">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        {name}
      </span>
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.max(4, Math.min(100, value))}%`,
            backgroundColor: accent,
            transition: "width 700ms ease-out, background-color 700ms ease-out",
          }}
        />
      </div>
    </div>
  );
}
