"use client";

import { useEffect, useState } from "react";

/**
 * Returns the current time in ms, refreshed on an interval. Reads Date.now()
 * only from timer callbacks (never during render) to stay a pure component.
 */
export function useNow(intervalMs = 5000): number {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // Defer the first read to the next task so state is never set
    // synchronously within the effect body itself.
    const t0 = setTimeout(() => setNow(Date.now()), 0);
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => {
      clearTimeout(t0);
      clearInterval(id);
    };
  }, [intervalMs]);

  return now ?? 0;
}
