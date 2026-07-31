"use client";

import { useEffect, useRef, useState } from "react";

export function useStageScale(intrinsicWidth: number, minScale = 0.32) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!parent) return;

    const update = () => {
      const w = parent.clientWidth;
      setScale(Math.max(minScale, Math.min(1, w / intrinsicWidth)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [intrinsicWidth, minScale]);

  return { ref, scale };
}
