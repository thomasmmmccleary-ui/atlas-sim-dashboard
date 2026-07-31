"use client";

import { useEffect, useState } from "react";
import { ACTIVITY_ORDER, ActivityKey } from "./activities";

const STATUS_URL = "/api/status";

const POLL_MS = 12_000;
const DEMO_STEP_MS = 20_000;
const STALE_MS = 15 * 60 * 1000;

export interface ActivityHistoryEntry {
  activity: ActivityKey;
  label: string;
  at: number;
}

export interface AtlasStatus {
  activity: ActivityKey;
  label: string;
  updatedAt: string | null;
  source: "live" | "demo";
  history: ActivityHistoryEntry[];
}

const HISTORY_LIMIT = 5;

function isActivityKey(v: unknown): v is ActivityKey {
  return typeof v === "string" && (ACTIVITY_ORDER as string[]).includes(v);
}

interface LiveStatus {
  activity: ActivityKey;
  label: string;
  updatedAt: string;
}

/**
 * Polls the same-origin /api/status route (which proxies GitHub's Contents
 * API server-side). Falls back to a self-cycling demo loop whenever the feed
 * is missing, malformed, stale (>15min old), or unreachable — the dashboard
 * never looks "broken".
 */
export function useAtlasStatus(): AtlasStatus {
  const [live, setLive] = useState<LiveStatus | null>(null);
  const [demoIndex, setDemoIndex] = useState(0);
  const [history, setHistory] = useState<ActivityHistoryEntry[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch(STATUS_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`status fetch failed: ${res.status}`);
        const data = await res.json();
        if (
          !data.ok ||
          !isActivityKey(data.activity) ||
          typeof data.label !== "string" ||
          typeof data.updated_at !== "string"
        ) {
          throw new Error("malformed status payload");
        }
        const age = Date.now() - new Date(data.updated_at).getTime();
        if (Number.isNaN(age) || age > STALE_MS) {
          throw new Error("stale status payload");
        }
        if (!cancelled) {
          setLive({
            activity: data.activity,
            label: data.label,
            updatedAt: data.updated_at,
          });
        }
      } catch {
        if (!cancelled) setLive(null);
      }
    }

    poll();
    const id = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setDemoIndex((i) => (i + 1) % ACTIVITY_ORDER.length);
    }, DEMO_STEP_MS);
    return () => clearInterval(id);
  }, []);

  const resolved: AtlasStatus = live
    ? { activity: live.activity, label: live.label, updatedAt: live.updatedAt, source: "live", history }
    : { activity: ACTIVITY_ORDER[demoIndex], label: "", updatedAt: null, source: "demo", history };

  useEffect(() => {
    // Deferred so Date.now() and setHistory never run synchronously within
    // the effect body itself (only from this timer callback).
    const t = setTimeout(() => {
      setHistory((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.activity === resolved.activity) return prev;
        const entry: ActivityHistoryEntry = {
          activity: resolved.activity,
          label: resolved.label,
          at: Date.now(),
        };
        return [...prev, entry].slice(-HISTORY_LIMIT);
      });
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolved.activity]);

  return resolved;
}
