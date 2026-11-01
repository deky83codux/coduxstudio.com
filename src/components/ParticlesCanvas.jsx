"use client";
import { useEffect, useRef } from "react";
import { ParticleEngine } from "./ParticleEngine";

export function ParticlesCanvas({ style = {} }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new ParticleEngine(canvas);
    const ro = new ResizeObserver(() => {
      engine.resize();
      if (engine.particles.length === 0 && engine.w > 0)
        engine._initParticles();
    });
    ro.observe(canvas.parentElement);
    setTimeout(() => engine.start(), 50);
    return () => {
      ro.disconnect();
      engine.destroy();
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
