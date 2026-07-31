"use client";

import { useEffect, useState } from "react";
import { ACTIVITY_ORDER, ActivityKey } from "./activities";

const STATUS_URL =
  "https://raw.githubusercontent.com/thomasmmmccleary-ui/atlas-sim-dashboard/main/public/status.json";

const POLL_MS = 10_000;
const DEMO_STEP_MS = 20_000;
const STALE_MS = 15 * 60 * 1000;

export interface AtlasStatus {
  activity: ActivityKey;
  label: string;
  updatedAt: string | null;
  source: "live" | "demo";
}

function isActivityKey(v: unknown): v is ActivityKey {
  return typeof v === "string" && (ACTIVITY_ORDER as string[]).includes(v);
}

interface LiveStatus {
  activity: ActivityKey;
  label: string;
  updatedAt: string;
}

/**
 * Polls the public status.json from GitHub raw content. Falls back to a
 * self-cycling demo loop whenever the feed is missing, malformed, stale
 * (>15min old), or unreachable — the dashboard never looks "broken".
 */
export function useAtlasStatus(): AtlasStatus {
  const [live, setLive] = useState<LiveStatus | null>(null);
  const [demoIndex, setDemoIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch(`${STATUS_URL}?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`status fetch failed: ${res.status}`);
        const data = await res.json();
        if (
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

  if (live) {
    return {
      activity: live.activity,
      label: live.label,
      updatedAt: live.updatedAt,
      source: "live",
    };
  }

  return {
    activity: ACTIVITY_ORDER[demoIndex],
    label: "",
    updatedAt: null,
    source: "demo",
  };
}
