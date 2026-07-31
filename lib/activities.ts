export type ActivityKey =
  | "building"
  | "researching"
  | "reviewing"
  | "deploying"
  | "idle"
  | "chatting";

export type StationKey = "desk" | "bookshelf" | "table" | "server" | "couch";

export interface ActivityConfig {
  key: ActivityKey;
  station: StationKey;
  /** default label shown when no live label is provided */
  defaultLabel: string;
  /** 0-100 focus/energy meter fill */
  mood: number;
  meterName: string;
  bubbleIcon: string;
  accent: string;
}

export const ACTIVITIES: Record<ActivityKey, ActivityConfig> = {
  building: {
    key: "building",
    station: "desk",
    defaultLabel: "Building a dashboard...",
    mood: 82,
    meterName: "Focus",
    bubbleIcon: "</>",
    accent: "#5b8cff",
  },
  researching: {
    key: "researching",
    station: "bookshelf",
    defaultLabel: "Reading up on something new...",
    mood: 64,
    meterName: "Focus",
    bubbleIcon: "?",
    accent: "#8a63e8",
  },
  reviewing: {
    key: "reviewing",
    station: "table",
    defaultLabel: "Reviewing code...",
    mood: 70,
    meterName: "Focus",
    bubbleIcon: "✓",
    accent: "#2fb676",
  },
  deploying: {
    key: "deploying",
    station: "server",
    defaultLabel: "Shipping to production...",
    mood: 90,
    meterName: "Energy",
    bubbleIcon: "↑",
    accent: "#ff9f43",
  },
  chatting: {
    key: "chatting",
    station: "table",
    defaultLabel: "Chatting with the team...",
    mood: 55,
    meterName: "Mood",
    bubbleIcon: "...",
    accent: "#ff6fa5",
  },
  idle: {
    key: "idle",
    station: "couch",
    defaultLabel: "Idle, watching for the next task",
    mood: 30,
    meterName: "Energy",
    bubbleIcon: "z",
    accent: "#7c8797",
  },
};

export const ACTIVITY_ORDER: ActivityKey[] = [
  "building",
  "researching",
  "reviewing",
  "deploying",
  "chatting",
  "idle",
];

export interface StationLayout {
  key: StationKey;
  label: string;
  gx: number;
  gy: number;
  /** where the character stands, in grid units */
  standGx: number;
  standGy: number;
  /** facing direction while working at this station, in degrees (0 = south) */
  workFacing: number;
}

export const STATIONS: Record<StationKey, StationLayout> = {
  desk: {
    key: "desk",
    label: "Build Desk",
    gx: 0.9,
    gy: 0.9,
    standGx: 0.9,
    standGy: 1.75,
    workFacing: 0,
  },
  bookshelf: {
    key: "bookshelf",
    label: "Research Shelf",
    gx: 4.6,
    gy: 0.75,
    standGx: 4.05,
    standGy: 1.6,
    workFacing: 45,
  },
  table: {
    key: "table",
    label: "Review Table",
    gx: 2.75,
    gy: 2.55,
    standGx: 2.75,
    standGy: 3.35,
    workFacing: 0,
  },
  server: {
    key: "server",
    label: "Server Rack",
    gx: 4.65,
    gy: 4.3,
    standGx: 3.95,
    standGy: 4.3,
    workFacing: 90,
  },
  couch: {
    key: "couch",
    label: "Idle Couch",
    gx: 0.75,
    gy: 4.35,
    standGx: 1.55,
    standGy: 4.0,
    workFacing: -45,
  },
};

export const GRID_COLS = 6;
export const GRID_ROWS = 6;
