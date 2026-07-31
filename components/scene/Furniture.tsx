import { IsoBox } from "./IsoBox";
import { ROTATE_X, ROTATE_Z, TILE } from "@/lib/iso";
import { STATIONS } from "@/lib/activities";

function StationGlow({
  gx,
  gy,
  w,
  d,
  active,
  color,
}: {
  gx: number;
  gy: number;
  w: number;
  d: number;
  active: boolean;
  color: string;
}) {
  const cx = (gx + w / 2) * TILE;
  const cy = (gy + d / 2) * TILE;
  return (
    <div
      className={`absolute rounded-full transition-opacity duration-700 ease-out ${
        active ? "atlas-station-pulse" : ""
      }`}
      style={{
        width: (w + 1.6) * TILE,
        height: (d + 1.6) * TILE,
        left: cx - ((w + 1.6) * TILE) / 2,
        top: cy - ((d + 1.6) * TILE) / 2,
        background: `radial-gradient(closest-side, ${color}4d, transparent 72%)`,
        opacity: active ? 1 : 0,
        transform: "translateZ(0.5px)",
      }}
    />
  );
}

function FloorShadow({ gx, gy, w, d }: { gx: number; gy: number; w: number; d: number }) {
  const cx = (gx + w / 2) * TILE;
  const cy = (gy + d / 2) * TILE;
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: w * TILE * 1.05,
        height: d * TILE * 0.85,
        left: cx - (w * TILE * 1.05) / 2,
        top: cy - (d * TILE * 0.85) / 2,
        background: "radial-gradient(closest-side, rgba(0,0,0,0.18), transparent 75%)",
        transform: "translateZ(0.2px)",
      }}
    />
  );
}

/** A small counter-rotated overlay so flat text/icons read upright despite the room's isometric tilt. */
function Billboard2D({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute"
      style={{
        transform: `rotateZ(${-ROTATE_Z}deg) rotateX(${-ROTATE_X}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Desk({ active }: { active: boolean }) {
  const s = STATIONS.desk;
  return (
    <>
      <StationGlow gx={s.gx - 0.55} gy={s.gy - 0.55} w={1.7} d={1.2} active={active} color="#5b8cff" />
      <FloorShadow gx={s.gx - 0.55} gy={s.gy - 0.5} w={1.7} d={0.95} />
      <IsoBox gx={s.gx - 0.55} gy={s.gy - 0.5} w={1.7} d={0.95} h={38} topColor="#c8925c" eastColor="#8f6238" southColor="#a97a49" />
      <IsoBox
        gx={s.gx - 0.1}
        gy={s.gy - 0.3}
        w={0.62}
        d={0.06}
        h={36}
        z={38}
        topColor="#20232b"
        eastColor="#14161c"
        southColor="#181b22"
        southImage={
          active
            ? "linear-gradient(135deg,#5b8cff,#8a63e8)"
            : "linear-gradient(135deg,#262b36,#1a1e26)"
        }
        southClassName={active ? "atlas-desk-blink" : undefined}
        glow={active}
        glowColor="#5b8cffaa"
        radius={2}
      />
      <IsoBox gx={s.gx - 0.28} gy={s.gy - 0.15} w={0.55} d={0.22} h={4} z={38} topColor="#e8ecf3" eastColor="#c7cddb" southColor="#d3d8e4" radius={2} />
      <IsoBox gx={s.gx + 0.42} gy={s.gy - 0.42} w={0.12} d={0.12} h={30} z={38} topColor="#ffd66b" eastColor="#e0ac2e" southColor="#f0c04a" radius={8} />
    </>
  );
}

export function Bookshelf({ active }: { active: boolean }) {
  const s = STATIONS.bookshelf;
  const stripes =
    "repeating-linear-gradient(90deg, #e35d5d 0 10px, #ffb648 10px 20px, #5bd68a 20px 30px, #5b8cff 30px 40px, #c86ee0 40px 50px, #ffd66b 50px 60px)";
  return (
    <>
      <StationGlow gx={s.gx - 0.6} gy={s.gy - 0.5} w={1.5} d={1.2} active={active} color="#8a63e8" />
      <FloorShadow gx={s.gx - 0.55} gy={s.gy - 0.35} w={1.5} d={0.42} />
      <IsoBox gx={s.gx - 0.55} gy={s.gy - 0.35} w={1.5} d={0.42} h={132} topColor="#8a5a3a" eastColor="#5f3c24" southColor="#734a2d" />
      <IsoBox gx={s.gx - 0.48} gy={s.gy - 0.28} w={1.36} d={0.06} h={30} z={16} topColor="#5f3c24" eastColor="#4a2f1c" southColor={stripes} southClassName={active ? "atlas-shelf-glow atlas-shelf-glow-1" : undefined} />
      <IsoBox gx={s.gx - 0.48} gy={s.gy - 0.28} w={1.36} d={0.06} h={30} z={58} topColor="#5f3c24" eastColor="#4a2f1c" southColor={stripes} southClassName={active ? "atlas-shelf-glow atlas-shelf-glow-2" : undefined} />
      <IsoBox gx={s.gx - 0.48} gy={s.gy - 0.28} w={1.36} d={0.06} h={30} z={100} topColor="#5f3c24" eastColor="#4a2f1c" southColor={stripes} southClassName={active ? "atlas-shelf-glow atlas-shelf-glow-3" : undefined} />
    </>
  );
}

export function ReviewTable({ active }: { active: boolean }) {
  const s = STATIONS.table;
  return (
    <>
      <StationGlow gx={s.gx - 0.75} gy={s.gy - 0.75} w={1.9} d={1.9} active={active} color="#2fb676" />
      <FloorShadow gx={s.gx - 0.7} gy={s.gy - 0.7} w={1.85} d={1.85} />
      <IsoBox gx={s.gx - 0.7} gy={s.gy - 0.7} w={1.85} d={1.85} h={34} topColor="#e7dcc8" eastColor="#a8926e" southColor="#bda57c" radius={8} />
      <IsoBox gx={s.gx - 0.32} gy={s.gy - 0.05} w={0.34} d={0.24} h={3} z={34} topColor="#ffffff" eastColor="#d8d8d8" southColor="#e6e6e6" radius={1} />
      <IsoBox gx={s.gx + 0.05} gy={s.gy - 0.28} w={0.14} d={0.14} h={12} z={34} topColor="#fefefe" eastColor="#d9c9a3" southColor="#efe0ba" radius={7} />
    </>
  );
}

export function ServerRack({ active }: { active: boolean }) {
  const s = STATIONS.server;
  return (
    <>
      <StationGlow gx={s.gx - 0.4} gy={s.gy - 0.4} w={0.9} d={0.9} active={active} color="#ff9f43" />
      <FloorShadow gx={s.gx - 0.35} gy={s.gy - 0.35} w={0.85} d={0.7} />
      <IsoBox gx={s.gx - 0.35} gy={s.gy - 0.35} w={0.85} d={0.7} h={148} topColor="#3a4150" eastColor="#20242c" southColor="#2b303a" />
      {[0, 1, 2, 3].map((row) => {
        const on = row % 2 === 0;
        const color = on ? "#5bd68a" : "#ffd66b";
        return (
          <IsoBox
            key={row}
            gx={s.gx - 0.28}
            gy={s.gy - 0.35}
            w={0.7}
            d={0.02}
            h={5}
            z={26 + row * 30}
            topColor="#232833"
            eastColor="#1a1e26"
            southColor={active ? color : "#3d4452"}
            southClassName={active ? `atlas-led-blink atlas-led-blink-${row}` : undefined}
            glow={active}
            glowColor={active ? `${color}aa` : undefined}
            radius={1}
          />
        );
      })}
    </>
  );
}

export function Couch({ active }: { active: boolean }) {
  const s = STATIONS.couch;
  return (
    <>
      <StationGlow gx={s.gx - 0.6} gy={s.gy - 0.5} w={1.7} d={1.3} active={active} color="#7c8797" />
      <FloorShadow gx={s.gx - 0.55} gy={s.gy - 0.42} w={1.55} d={1.05} />
      <IsoBox gx={s.gx - 0.55} gy={s.gy - 0.42} w={1.55} d={1.05} h={26} topColor="#7a95c4" eastColor="#4f668f" southColor="#5f7aa8" radius={10} />
      <IsoBox
        gx={s.gx - 0.55}
        gy={s.gy - 0.42}
        w={0.18}
        d={1.05}
        h={54}
        topColor="#6c85b3"
        eastColor="#3f5480"
        southColor="#516b98"
        radius={10}
        topChildren={
          active ? (
            <Billboard2D style={{ left: "50%", top: "-10px" }}>
              <div className="atlas-zzz" aria-hidden="true">
                <span>z</span>
                <span>z</span>
              </div>
            </Billboard2D>
          ) : undefined
        }
      />
      <IsoBox gx={s.gx - 0.55} gy={s.gy - 0.42} w={1.55} d={0.18} h={44} topColor="#6c85b3" eastColor="#3f5480" southColor="#4b6494" radius={10} />
    </>
  );
}
