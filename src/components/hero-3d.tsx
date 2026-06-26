import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Subtle "constellation" network for the hero — drifting nodes connected by thin
 * lines when they get close. Reads as data / systems / integrations, which fits a
 * back-end + automation profile. Lazy-loaded, desktop-only.
 *
 * Theme-aware: on dark the nodes glow via additive blending; on light (white
 * background) additive blending would wash out to invisible, so we switch to
 * normal blending with the opaque brand violet so it stays visible.
 */

/** Tracks the `dark` class on <html> (the shared source of truth the header sets). */
function useIsDark() {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return isDark;
}

function Network({ count = 80, isDark }: { count?: number; isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const group = useRef<THREE.Group>(null);

  const data = useMemo(() => {
    const bounds = new THREE.Vector3(3.2, 2.2, 1.8);
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * bounds.x;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * bounds.y;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * bounds.z;
      velocities[i * 3] = (Math.random() * 2 - 1) * 0.06;
      velocities[i * 3 + 1] = (Math.random() * 2 - 1) * 0.06;
      velocities[i * 3 + 2] = (Math.random() * 2 - 1) * 0.06;
    }
    const maxSegments = count * 6;
    const linePositions = new Float32Array(maxSegments * 2 * 3);
    return { bounds, positions, velocities, linePositions, maxSegments };
  }, [count]);

  useFrame((_, delta) => {
    const { bounds, positions, velocities, linePositions, maxSegments } = data;
    const step = Math.min(delta, 0.05) * 6;

    // Drift nodes and bounce off the bounding box
    for (let i = 0; i < count; i++) {
      for (let a = 0; a < 3; a++) {
        const idx = i * 3 + a;
        positions[idx] += velocities[idx] * step;
        const limit = a === 0 ? bounds.x : a === 1 ? bounds.y : bounds.z;
        if (positions[idx] > limit || positions[idx] < -limit) {
          velocities[idx] *= -1;
          positions[idx] = Math.max(-limit, Math.min(limit, positions[idx]));
        }
      }
    }

    // Rebuild connections between nearby nodes
    const threshold2 = 1.25 * 1.25;
    let seg = 0;
    for (let i = 0; i < count && seg < maxSegments; i++) {
      for (let j = i + 1; j < count && seg < maxSegments; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < threshold2) {
          const o = seg * 6;
          linePositions[o] = positions[i * 3];
          linePositions[o + 1] = positions[i * 3 + 1];
          linePositions[o + 2] = positions[i * 3 + 2];
          linePositions[o + 3] = positions[j * 3];
          linePositions[o + 4] = positions[j * 3 + 1];
          linePositions[o + 5] = positions[j * 3 + 2];
          seg++;
        }
      }
    }

    const pg = pointsRef.current?.geometry;
    if (pg) (pg.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    const lg = linesRef.current?.geometry;
    if (lg) {
      (lg.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      lg.setDrawRange(0, seg * 2);
    }
    if (group.current) group.current.rotation.y += delta * 0.025;
  });

  // Dark: glow (additive). Light: solid violet on white (normal blending).
  const blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
  const pointColor = isDark ? "#a78bfa" : "#7c3aed";
  const lineColor = isDark ? "#38bdf8" : "#6d28d9";
  const pointOpacity = isDark ? 0.9 : 0.85;
  const lineOpacity = isDark ? 0.17 : 0.3;

  return (
    <group ref={group}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isDark ? 0.05 : 0.055}
          color={pointColor}
          sizeAttenuation
          transparent
          opacity={pointOpacity}
          depthWrite={false}
          blending={blending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={lineOpacity}
          depthWrite={false}
          blending={blending}
        />
      </lineSegments>
    </group>
  );
}

export default function Hero3D() {
  const isDark = useIsDark();
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <Network isDark={isDark} />
      </Canvas>
    </div>
  );
}
