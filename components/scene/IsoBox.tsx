import { TILE } from "@/lib/iso";

export interface IsoBoxProps {
  gx: number;
  gy: number;
  w: number; // grid units, x extent (width)
  d: number; // grid units, y extent (depth)
  h: number; // px, height
  z?: number; // px, base elevation
  topColor: string;
  eastColor: string;
  southColor: string;
  eastImage?: string;
  southImage?: string;
  radius?: number;
  topChildren?: React.ReactNode;
  glow?: boolean;
  glowColor?: string;
}

/**
 * A single extruded box in the isometric world, built from three flat
 * faces (top / east / south) positioned with real CSS 3D transforms so
 * it reads correctly from the room's fixed camera angle.
 */
export function IsoBox({
  gx,
  gy,
  w,
  d,
  h,
  z = 0,
  topColor,
  eastColor,
  southColor,
  eastImage,
  southImage,
  radius = 3,
  topChildren,
  glow = false,
  glowColor = "#ffffff",
}: IsoBoxProps) {
  const W = w * TILE;
  const D = d * TILE;
  const cx = (gx + w / 2) * TILE;
  const cy = (gy + d / 2) * TILE;

  return (
    <div
      className="absolute left-0 top-0"
      style={{
        transform: `translate3d(${cx}px, ${cy}px, ${z}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute"
        style={{
          width: W,
          height: D,
          left: -W / 2,
          top: -D / 2,
          background: topColor,
          borderRadius: radius,
          transform: `translateZ(${h}px)`,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
        }}
      >
        {topChildren}
      </div>
      <div
        className="absolute"
        style={{
          width: h,
          height: D,
          left: -h / 2,
          top: -D / 2,
          background: eastImage ?? eastColor,
          transform: `rotateY(90deg) translateZ(${W / 2}px)`,
        }}
      />
      <div
        className="absolute"
        style={{
          width: W,
          height: h,
          left: -W / 2,
          top: -h / 2,
          background: southImage ?? southColor,
          boxShadow: glow ? `0 0 16px 3px ${glowColor}` : undefined,
          transform: `rotateX(-90deg) translateZ(${D / 2}px)`,
        }}
      />
    </div>
  );
}
