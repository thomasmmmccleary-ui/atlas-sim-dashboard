"use client";

import { ACTIVITIES } from "@/lib/activities";
import { useAtlasStatus } from "@/lib/useAtlasStatus";
import { IsoRoom } from "./scene/IsoRoom";
import { MoodMeter } from "./hud/MoodMeter";
import { TopBar } from "./hud/TopBar";
import { ActivityStrip } from "./hud/ActivityStrip";

export function Dashboard() {
  const status = useAtlasStatus();
  const config = ACTIVITIES[status.activity];
  const label = status.label || config.defaultLabel;

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar source={status.source} updatedAt={status.updatedAt} />

      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-3 pb-6 sm:gap-6 sm:px-6">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white/40 shadow-xl ring-1 ring-black/5 backdrop-blur-sm">
          <IsoRoom activity={status.activity} label={label} />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <MoodMeter name={config.meterName} value={config.mood} accent={config.accent} />
          <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-md ring-1 ring-black/5 backdrop-blur">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: config.accent }}
            />
            {config.station === "desk" && "At the build desk"}
            {config.station === "bookshelf" && "At the research shelf"}
            {config.station === "table" && "At the review table"}
            {config.station === "server" && "At the server rack"}
            {config.station === "couch" && "On the idle couch"}
          </div>
        </div>

        <ActivityStrip history={status.history} />
      </main>

      <footer className="px-4 pb-4 text-center text-[11px] text-slate-400">
        An original, hand-built isometric scene — not affiliated with EA or Maxis.
      </footer>
    </div>
  );
}
