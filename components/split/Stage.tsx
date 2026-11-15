"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Image } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import { seam } from "./seam";

export type StageCard = { src: string; tint?: string };

type Side = "tech" | "edit";

// Depth-ordered slots, back to front. x/y fan the stack out, z gives the parallax.
const SLOTS: Record<Side, [number, number, number][]> = {
  tech: [
    [0.95, 1.15, -2.4],
    [0.3, 0.3, -1.0],
    [-0.45, -0.65, 0.4],
  ],
  edit: [
    [1.3, 0.5, -2.4],
    [0.2, 0.15, -1.0],
    [-0.95, -0.25, 0.4],
  ],
};

const SIZE: Record<Side, [number, number]> = {
  tech: [3.7, 1.96], // site screenshots, ~1.89:1
  edit: [1.5, 2.67], // 9:16 reels
};

// One window-level pointer for both canvases (they sit under the text, pointer-events: none).
const pointer = { x: 0, y: 0 };

function usePointer(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);
}

function Card({
  card,
  side,
  slot,
  index,
  still,
}: {
  card: StageCard;
  side: Side;
  slot: [number, number, number];
  index: number;
  still: boolean;
}) {
  const ref = useRef<Group>(null);
  const [w, h] = SIZE[side];
  const born = useRef<number | null>(null);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    if (still) {
      g.position.set(...slot);
      return;
    }
    // Entrance: each card arrives from below and behind, back card first.
    born.current ??= state.clock.elapsedTime;
    const ready = state.clock.elapsedTime - born.current > 0.15 + index * 0.12;
    const [x, y, z] = slot;
    g.position.x = MathUtils.damp(g.position.x, x, 5, delta);
    g.position.y = MathUtils.damp(g.position.y, ready ? y : y - 2.2, 5, delta);
    g.position.z = MathUtils.damp(g.position.z, ready ? z : z - 5, 5, delta);
  });

  return (
    <group ref={ref} position={[slot[0], slot[1] - 2.2, slot[2] - 5]}>
      <Float
        speed={still ? 0 : 1.4}
        rotationIntensity={0.12}
        floatIntensity={0.35}
        floatingRange={[-0.06, 0.06]}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text -- drei Image is a WebGL mesh, not an <img> */}
        <Image url={card.src} scale={[w, h]} radius={0.07} color={card.tint ?? "#ffffff"} toneMapped={false} />
      </Float>
    </group>
  );
}

function Stack({ side, cards, still }: { side: Side; cards: StageCard[]; still: boolean }) {
  const ref = useRef<Group>(null);
  const width = useThree((s) => s.size.width);
  const compact = width < 560;

  // Each canvas is anchored to the seam; nudge the stack away from it so the name plate stays clear.
  const dir = side === "tech" ? 1 : -1;
  const baseX = dir * (compact ? 0.3 : -0.25);
  const baseRotY = -dir * 0.55;

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const share = side === "tech" ? seam.p : 1 - seam.p;
    const scale = (compact ? 0.74 : 0.82) + share * 0.36; // the side you open up comes forward
    const tx = still ? 0 : pointer.x * 0.14;
    const ty = still ? 0 : pointer.y * 0.08;
    g.rotation.y = MathUtils.damp(g.rotation.y, baseRotY + tx, 4, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, 0.1 + ty, 4, delta);
    g.scale.setScalar(MathUtils.damp(g.scale.x, scale, 6, delta));
  });

  return (
    <group ref={ref} position={[baseX, -0.2, 0]} rotation={[0.1, baseRotY, 0]}>
      {cards.map((card, i) => (
        <Card key={card.src} card={card} side={side} slot={SLOTS[side][i]} index={i} still={still} />
      ))}
    </group>
  );
}

export default function Stage({ side, cards }: { side: Side; cards: StageCard[] }) {
  const still = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  usePointer(!still);

  return (
    <Canvas
      camera={{ fov: 34, position: [0, 0, 9] }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <Stack side={side} cards={cards.slice(0, 3)} still={still} />
      </Suspense>
    </Canvas>
  );
}
