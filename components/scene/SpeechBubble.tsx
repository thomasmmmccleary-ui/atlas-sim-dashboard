"use client";

import { useEffect, useRef, useState } from "react";

export interface SpeechBubbleProps {
  label: string;
  icon: string;
  accent: string;
}

interface Shown {
  label: string;
  icon: string;
  accent: string;
  key: number;
}

const LEAVE_MS = 150;

export function SpeechBubble({ label, icon, accent }: SpeechBubbleProps) {
  const keyRef = useRef(0);
  const [shown, setShown] = useState<Shown>({ label, icon, accent, key: 0 });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (label === shown.label && icon === shown.icon && accent === shown.accent) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      keyRef.current += 1;
      setShown({ label, icon, accent, key: keyRef.current });
      return;
    }

    setLeaving(true);
    const t = setTimeout(() => {
      keyRef.current += 1;
      setShown({ label, icon, accent, key: keyRef.current });
      setLeaving(false);
    }, LEAVE_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, icon, accent]);

  return (
    <div
      className={`atlas-bubble ${leaving ? "atlas-bubble-leaving" : ""}`}
      key={shown.key}
    >
      <div className="flex max-w-[150px] items-center gap-1.5 rounded-2xl bg-white/95 px-3 py-1.5 text-[11px] sm:text-xs font-medium text-slate-700 shadow-lg ring-1 ring-black/5">
        <span
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
          style={{ background: shown.accent }}
        >
          {shown.icon}
        </span>
        <span>{shown.label}</span>
      </div>
      <div className="atlas-bubble-tail" />
    </div>
  );
}
