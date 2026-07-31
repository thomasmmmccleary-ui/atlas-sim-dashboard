"use client";

import { useEffect, useRef, useState } from "react";

export interface GridPoint {
  x: number;
  y: number;
}

export interface MotionState extends GridPoint {
  isMoving: boolean;
  facingLeft: boolean;
}

const SPEED = 2.1; // grid units per second

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function sameish(a: GridPoint, b: GridPoint): boolean {
  return Math.abs(a.x - b.x) < 0.01 && Math.abs(a.y - b.y) < 0.01;
}

/**
 * Tweens the character between grid positions along a two-leg,
 * grid-aligned path (x-then-y), eased in/out, at a constant walking
 * speed — the "physics" behind the walk cycle.
 */
export function useCharacterMotion(target: GridPoint, initial: GridPoint): MotionState {
  const [state, setState] = useState<MotionState>({
    ...initial,
    isMoving: false,
    facingLeft: false,
  });

  const posRef = useRef<GridPoint>(initial);
  const waypointsRef = useRef<GridPoint[]>([]);
  const legStartRef = useRef<GridPoint>(initial);
  const legProgressRef = useRef(0);
  const facingLeftRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    const current = posRef.current;
    if (sameish(current, target)) return;

    if (reducedMotionRef.current) {
      posRef.current = { ...target };
      setState((s) => ({ ...target, isMoving: false, facingLeft: s.facingLeft }));
      return;
    }

    const corner: GridPoint = { x: target.x, y: current.y };
    const legs = [corner, { ...target }].filter(
      (p, i, arr) => i === 0 || !sameish(p, arr[i - 1])
    );
    // Drop a leg that never moves (already aligned on that axis).
    waypointsRef.current = legs.filter((p) => !sameish(p, current) || legs.length === 1);
    if (waypointsRef.current.length === 0) waypointsRef.current = [{ ...target }];
    legStartRef.current = { ...current };
    legProgressRef.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.x, target.y]);

  useEffect(() => {
    let raf = 0;
    let last: number | null = null;

    function tick(now: number) {
      if (last === null) last = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (waypointsRef.current.length === 0) {
        setState((s) => (s.isMoving ? { ...s, isMoving: false } : s));
        raf = requestAnimationFrame(tick);
        return;
      }

      const legTarget = waypointsRef.current[0];
      const start = legStartRef.current;
      const dx = legTarget.x - start.x;
      const dy = legTarget.y - start.y;
      const legDist = Math.hypot(dx, dy);

      if (legDist < 0.001) {
        posRef.current = { ...legTarget };
        waypointsRef.current.shift();
        legStartRef.current = posRef.current;
        legProgressRef.current = 0;
        raf = requestAnimationFrame(tick);
        return;
      }

      if (Math.abs(dx) > 0.001) {
        facingLeftRef.current = dx < 0;
      } else if (Math.abs(dy) > 0.001) {
        facingLeftRef.current = dy > 0;
      }

      legProgressRef.current += (SPEED * dt) / legDist;
      const t = Math.min(1, legProgressRef.current);
      const eased = easeInOutQuad(t);
      const x = start.x + dx * eased;
      const y = start.y + dy * eased;
      posRef.current = { x, y };

      if (t >= 1) {
        waypointsRef.current.shift();
        legStartRef.current = posRef.current;
        legProgressRef.current = 0;
      }

      setState({
        x: posRef.current.x,
        y: posRef.current.y,
        isMoving: true,
        facingLeft: facingLeftRef.current,
      });
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return state;
}
