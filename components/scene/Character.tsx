import { ActivityKey } from "@/lib/activities";

export interface CharacterProps {
  activity: ActivityKey;
  isMoving: boolean;
  facingLeft: boolean;
}

const ACCENT: Record<ActivityKey, string> = {
  building: "#5b8cff",
  researching: "#8a63e8",
  reviewing: "#2fb676",
  deploying: "#ff9f43",
  chatting: "#ff6fa5",
  idle: "#7c8797",
};

/**
 * Atlas — an original chibi-robot mascot (rounded body, single visor eye,
 * antenna beacon). Not a likeness of any third-party character.
 */
export function Character({ activity, isMoving, facingLeft }: CharacterProps) {
  const accent = ACCENT[activity];
  const raiseArm = activity === "deploying";
  const sleepy = activity === "idle";

  return (
    <div
      className={`atlas-character ${isMoving ? "atlas-walking" : "atlas-idle"} atlas-${activity}`}
      style={{ transform: facingLeft ? "scaleX(-1)" : "scaleX(1)" }}
    >
      <svg
        width="88"
        height="104"
        viewBox="0 0 120 140"
        className="atlas-body-bob"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <ellipse cx="60" cy="128" rx="26" ry="7" fill="#000" opacity="0.16" />

        <line
          x1="60"
          y1="18"
          x2="60"
          y2="2"
          stroke="#3a4150"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="60" cy="2" r="6" fill={accent} className="atlas-antenna-glow" />

        <g className="atlas-arm-left">
          <rect x="20" y="66" width="14" height="34" rx="7" fill="#3a4150" />
        </g>
        <g className={raiseArm ? "atlas-arm-raised" : "atlas-arm-right"}>
          <rect x="86" y="66" width="14" height="34" rx="7" fill="#3a4150" />
        </g>

        <rect x="24" y="14" width="72" height="88" rx="30" fill={accent} />
        <rect
          x="24"
          y="14"
          width="72"
          height="88"
          rx="30"
          fill="url(#atlas-sheen)"
          opacity="0.35"
        />

        <rect
          x="34"
          y="42"
          width="52"
          height="26"
          rx="13"
          fill="#101319"
          className="atlas-visor"
        />
        <ellipse
          cx={sleepy ? 60 : 60}
          cy={sleepy ? 55 : 55}
          rx={sleepy ? 12 : 9}
          ry={sleepy ? 2.4 : 9}
          fill="#bfe4ff"
          className="atlas-eye"
        />

        <g className="atlas-foot-left">
          <ellipse cx="42" cy="118" rx="13" ry="9" fill="#2a2f3a" />
        </g>
        <g className="atlas-foot-right">
          <ellipse cx="78" cy="118" rx="13" ry="9" fill="#2a2f3a" />
        </g>

        <defs>
          <linearGradient id="atlas-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
