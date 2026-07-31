"use client";

import { ACTIVITIES } from "@/lib/activities";
import { ActivityHistoryEntry } from "@/lib/useAtlasStatus";
import { useNow } from "@/lib/useNow";

export interface ActivityStripProps {
  history: ActivityHistoryEntry[];
}

function formatAgo(at: number, now: number): string {
  const seconds = Math.max(0, Math.round((now - at) / 1000));
  if (seconds < 10) return "now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return `${hours}h ago`;
}

export function ActivityStrip({ history }: ActivityStripProps) {
  const now = useNow(5000);

  if (history.length === 0 || now === 0) return null;

  const recent = [...history].reverse();

  return (
    <div className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full bg-white/80 px-3 py-1.5 text-[11px] text-slate-500 shadow-md ring-1 ring-black/5 backdrop-blur">
      <span className="shrink-0 font-semibold uppercase tracking-wide text-slate-400">
        Recently
      </span>
      {recent.map((entry, i) => {
        const config = ACTIVITIES[entry.activity];
        return (
          <span key={entry.at} className="flex shrink-0 items-center gap-1.5">
            {i > 0 && <span className="text-slate-300">·</span>}
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: config.accent }}
            />
            <span className="whitespace-nowrap">{entry.activity}</span>
            <span className="text-slate-400">{formatAgo(entry.at, now)}</span>
          </span>
        );
      })}
    </div>
  );
}
