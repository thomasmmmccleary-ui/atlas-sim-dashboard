"use client";

import { useNow } from "@/lib/useNow";

export interface TopBarProps {
  source: "live" | "demo";
  updatedAt: string | null;
}

function formatRelative(ms: number): string {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return `${hours}h ago`;
}

const FRESH_MS = 90 * 1000;

export function TopBar({ source, updatedAt }: TopBarProps) {
  const now = useNow(5000);

  const ageMs = updatedAt && now ? now - new Date(updatedAt).getTime() : null;
  const isLive = source === "live" && ageMs !== null;
  const isFresh = isLive && ageMs! < FRESH_MS;

  const dotClass = isFresh ? "bg-emerald-500" : "bg-amber-400";
  const relative = ageMs !== null ? formatRelative(ageMs) : "";

  return (
    <header className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#5b8cff] to-[#8a63e8] text-sm font-bold text-white shadow-md">
          A
        </div>
        <div className="leading-tight">
          <h1 className="text-sm font-semibold text-slate-800 sm:text-base">
            Atlas Sim Dashboard
          </h1>
          <p className="text-[11px] text-slate-500">watching Atlas at work</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium text-slate-600 shadow-md ring-1 ring-black/5 backdrop-blur">
        <span className={`inline-block h-2 w-2 rounded-full ${dotClass} atlas-pulse-dot`} />
        {isLive ? (
          <span>
            {isFresh ? "Live" : "Live (slow)"}
            <span className="text-slate-400"> · updated {relative}</span>
          </span>
        ) : (
          <span>Demo / simulated activity</span>
        )}
      </div>
    </header>
  );
}
