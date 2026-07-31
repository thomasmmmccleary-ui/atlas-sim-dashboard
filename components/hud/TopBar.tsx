"use client";

import { useEffect, useState } from "react";

export interface TopBarProps {
  source: "live" | "demo";
  updatedAt: string | null;
}

function formatRelative(iso: string): string {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return `${hours}h ago`;
}

function useRelativeTime(iso: string | null): string {
  const [text, setText] = useState("");

  useEffect(() => {
    const tick = () => setText(iso ? formatRelative(iso) : "");
    // Defer the first tick to the next task so state is never set
    // synchronously within the effect body itself.
    const t0 = setTimeout(tick, 0);
    const id = iso ? setInterval(tick, 5000) : undefined;
    return () => {
      clearTimeout(t0);
      if (id) clearInterval(id);
    };
  }, [iso]);

  return text;
}

export function TopBar({ source, updatedAt }: TopBarProps) {
  const relative = useRelativeTime(updatedAt);

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
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            source === "live" ? "bg-emerald-500" : "bg-amber-400"
          } atlas-pulse-dot`}
        />
        {source === "live" ? (
          <span>
            Live{updatedAt ? <span className="text-slate-400"> · {relative}</span> : null}
          </span>
        ) : (
          <span>Idle loop demo</span>
        )}
      </div>
    </header>
  );
}
