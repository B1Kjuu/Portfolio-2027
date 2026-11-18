"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Image, RoundedBox } from "@react-three/drei";
import { MathUtils, type Group, type Mesh, type MeshBasicMaterial, type MeshStandardMaterial } from "three";

// The Build hero's counterpart to the phone on the Cut page: the three kinds of work in one
// object. A dev board (ESP32 shield, LoRa module, pin headers, an antenna sending signal rings)
// sits in front of a browser window showing a live product. Built from primitives: no model files.

const LIME = "#c6f24e";
const GOLD = "#c9a24a";

const pointer = { x: 0, y: 0 };

function Pins({ z }: { z: number }) {
  const xs = useMemo(() => Array.from({ length: 15 }, (_, i) => -1.05 + i * 0.15), []);
  return (
    <group position={[0, 0.09, z]}>
      {xs.map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.055, 0.14, 0.055]} />
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.28} />
        </mesh>
      ))}
      {/* the black plastic strip the pins sit in */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[2.22, 0.07, 0.11]} />
        <meshStandardMaterial color="#0b0d10" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Copper traces between the parts, lit faintly in the accent colour.
const TRACES: [number, number, number, number][] = [
  // x, z, length, rotation (around y)
  [-0.02, -0.12, 0.42, 0],
  [-0.02, 0.1, 0.42, 0],
  [0.62, -0.33, 0.5, Math.PI / 2],
  [-0.95, 0.18, 0.36, Math.PI / 2],
  [-0.35, 0.36, 0.7, 0],
  [0.2, -0.36, 0.5, 0],
];

function Board({ still }: { still: boolean }) {
  const led = useRef<MeshStandardMaterial>(null);
  const rings = useRef<(Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // status LED: a short double blink every two seconds
    if (led.current) {
      const phase = t % 2;
      const on = still || phase < 0.08 || (phase > 0.2 && phase < 0.28);
      led.current.emissiveIntensity = on ? 3 : 0.25;
    }
    // LoRa signal: three rings leave the antenna tip in turn, growing and fading
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const p = still ? 0.25 + i * 0.25 : ((t * 0.45 + i / 3) % 1);
      ring.scale.setScalar(0.25 + p * 0.95);
      (ring.material as MeshBasicMaterial).opacity = (1 - p) * 0.55;
    });
  });

  return (
    <group>
      {/* PCB */}
      <RoundedBox args={[2.5, 0.07, 1.2]} radius={0.03} smoothness={3}>
        <meshStandardMaterial color="#222930" roughness={0.5} metalness={0.2} />
      </RoundedBox>
      {/* mounting holes */}
      {[[-1.14, -0.5], [1.14, -0.5], [-1.14, 0.5], [1.14, 0.5]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.037, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.03, 0.055, 24]} />
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      {TRACES.map(([x, z, len, ry], i) => (
        <mesh key={i} position={[x, 0.037, z]} rotation={[-Math.PI / 2, 0, ry]}>
          <planeGeometry args={[len, 0.018]} />
          <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.55} />
        </mesh>
      ))}

      {/* ESP32 module: metal RF shield on its own little board */}
      <group position={[-0.5, 0.035, 0]}>
        <RoundedBox args={[0.82, 0.04, 0.62]} radius={0.01} smoothness={2} position={[0, 0.02, 0]}>
          <meshStandardMaterial color="#1d2a24" roughness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.6, 0.08, 0.5]} radius={0.015} smoothness={2} position={[0.07, 0.08, 0]}>
          <meshStandardMaterial color="#c5cad0" metalness={1} roughness={0.22} />
        </RoundedBox>
      </group>

      {/* LoRa radio module */}
      <RoundedBox args={[0.52, 0.06, 0.52]} radius={0.012} smoothness={2} position={[0.42, 0.07, 0.02]}>
        <meshStandardMaterial color="#1a2a3a" roughness={0.45} metalness={0.3} />
      </RoundedBox>
      <mesh position={[0.42, 0.105, 0.02]}>
        <boxGeometry args={[0.3, 0.012, 0.3]} />
        <meshStandardMaterial color="#0d1218" roughness={0.4} />
      </mesh>

      {/* USB port at the edge */}
      <RoundedBox args={[0.24, 0.1, 0.2]} radius={0.02} smoothness={2} position={[1.2, 0.09, 0]}>
        <meshStandardMaterial color="#b9bec4" metalness={1} roughness={0.25} />
      </RoundedBox>

      {/* status LED */}
      <mesh position={[-1.0, 0.06, -0.3]}>
        <boxGeometry args={[0.07, 0.04, 0.05]} />
        <meshStandardMaterial ref={led} color={LIME} emissive={LIME} emissiveIntensity={3} toneMapped={false} />
      </mesh>

      <Pins z={-0.52} />
      <Pins z={0.52} />

      {/* stubby LoRa antenna on the front corner: its signal stays below the window, clear of the headline */}
      <group position={[0.92, 0.035, 0.3]}>
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.14, 20]} />
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.034, 0.045, 0.46, 20]} />
          <meshStandardMaterial color="#0b0d10" roughness={0.5} />
        </mesh>
        <group position={[0, 0.62, 0]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} ref={(m) => { rings.current[i] = m; }} rotation={[-Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.32, 0.008, 8, 64]} />
              <meshBasicMaterial color={LIME} transparent opacity={0.5} toneMapped={false} depthWrite={false} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

function Scene({ shot, still }: { shot: string; still: boolean }) {
  const rig = useRef<Group>(null);
  const board = useRef<Group>(null);
  const born = useRef<number | null>(null);
  // Composed for a canvas about 3.9 world units wide; narrower canvases shrink the whole scene.
  const fit = useThree((s) => Math.min(1, s.viewport.width / 3.9));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    born.current ??= t;
    const age = t - born.current;

    const g = rig.current;
    if (g) {
      const tx = still ? 0 : pointer.x * 0.22;
      const ty = still ? 0 : pointer.y * 0.12;
      g.rotation.y = MathUtils.damp(g.rotation.y, -0.42 + tx, 4, delta);
      g.rotation.x = MathUtils.damp(g.rotation.x, 0.08 + ty, 4, delta);
    }
    // entrance: the board rises into place just after the headline
    const b = board.current;
    if (b && !still) {
      b.position.y = MathUtils.damp(b.position.y, age > 0.35 ? -0.75 : -2.6, 5, delta);
    }
  });

  return (
    <group ref={rig} rotation={[0.08, -0.42, 0]} scale={fit}>
      {/* the browser window behind */}
      <Float speed={still ? 0 : 1.1} rotationIntensity={0.08} floatIntensity={0.25} floatingRange={[-0.05, 0.05]}>
        <group position={[0.55, 1.0, -2.2]}>
          <RoundedBox args={[3.62, 2.12, 0.04]} radius={0.06} smoothness={3} position={[0, -0.04, -0.03]}>
            <meshStandardMaterial color="#171b20" roughness={0.6} />
          </RoundedBox>
          {/* window controls */}
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[-1.68 + i * 0.1, 0.94, 0]}>
              <circleGeometry args={[0.028, 16]} />
              <meshBasicMaterial color="#333a43" />
            </mesh>
          ))}
          {/* eslint-disable-next-line jsx-a11y/alt-text -- drei Image is a WebGL mesh, not an <img> */}
          <Image url={shot} scale={[3.5, 1.853]} position={[0, -0.1, 0.001]} radius={0.04} toneMapped={false} />
        </group>
      </Float>

      {/* the board in front, leaning back so its top face reads */}
      <group ref={board} position={[-0.45, still ? -0.75 : -2.6, 0.6]}>
        <Float speed={still ? 0 : 1.6} rotationIntensity={0.15} floatIntensity={0.4} floatingRange={[-0.06, 0.06]}>
          <group rotation={[0.85, 0.3, -0.1]} scale={1.3}>
            <Board still={still} />
          </group>
        </Float>
      </group>
    </group>
  );
}

export default function BuildScene({ shot }: { shot: string }) {
  const still = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  // Only where the hero has room beside the headline; smaller screens never create the canvas.
  const roomy = useMemo(() => typeof window !== "undefined" && window.matchMedia("(min-width: 900px)").matches, []);

  useEffect(() => {
    if (still || !roomy) return;
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [still, roomy]);

  if (!roomy) return null;

  return (
    <Canvas
      camera={{ fov: 32, position: [0, 0.2, 8.4] }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop={still ? "demand" : "always"}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />
      <directionalLight position={[-4, 2, -2]} intensity={0.6} color={LIME} />
      <pointLight position={[0, -1, 3]} intensity={6} distance={8} color="#ffffff" />
      <Suspense fallback={null}>
        <Scene shot={shot} still={still} />
      </Suspense>
    </Canvas>
  );
}
