"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  angle: number;
}

interface Magnet {
  x: number;
  y: number;
  polarity: 1 | -1; // 1 = north pole on right, -1 = south pole on right
}

function fieldAngle(px: number, py: number, magnets: Magnet[]): number {
  let fx = 0;
  let fy = 0;
  for (const m of magnets) {
    const dx = px - m.x;
    const dy = py - m.y;
    const r2 = dx * dx + dy * dy + 1;
    const strength = (m.polarity * 3000) / r2;
    fx += strength * dx;
    fy += strength * dy;
  }
  return Math.atan2(fy, fx);
}

function makeParticles(w: number, h: number, count: number): Particle[] {
  const particles: Particle[] = [];
  const cols = Math.ceil(Math.sqrt(count * (w / h)));
  const rows = Math.ceil(count / cols);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      particles.push({
        x: (c + 0.5) * (w / cols),
        y: (r + 0.5) * (h / rows),
        angle: 0,
      });
    }
  }
  return particles;
}

export function MagnetSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [magnets, setMagnets] = useState<Magnet[]>([
    { x: 200, y: 200, polarity: 1 },
    { x: 400, y: 200, polarity: -1 },
  ]);
  const [dragging, setDragging] = useState<number | null>(null);
  const [showField, setShowField] = useState(true);
  const [bothSame, setBothSame] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const particles = makeParticles(W, H, 120);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#F0F4FF";
      ctx.fillRect(0, 0, W, H);

      if (showField) {
        // Draw field lines
        for (const p of particles) {
          const angle = fieldAngle(p.x, p.y, magnets);
          const len = 12;
          const cx = p.x;
          const cy = p.y;
          const x2 = cx + Math.cos(angle) * len;
          const y2 = cy + Math.sin(angle) * len;

          ctx.strokeStyle = "rgba(99,102,241,0.35)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cx - Math.cos(angle) * 4, cy - Math.sin(angle) * 4);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          // Arrow head
          ctx.fillStyle = "rgba(99,102,241,0.5)";
          ctx.beginPath();
          ctx.save();
          ctx.translate(x2, y2);
          ctx.rotate(angle);
          ctx.moveTo(0, 0);
          ctx.lineTo(-6, 3);
          ctx.lineTo(-6, -3);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }

      // Draw magnets
      for (let i = 0; i < magnets.length; i++) {
        const m = magnets[i]!;
        const w = 80;
        const h = 36;
        const x = m.x - w / 2;
        const y = m.y - h / 2;

        // Body — split red/blue
        ctx.fillStyle = m.polarity === 1 ? "#EF4444" : "#3B82F6";
        ctx.beginPath();
        ctx.roundRect(x, y, w / 2, h, [8, 0, 0, 8]);
        ctx.fill();
        ctx.fillStyle = m.polarity === 1 ? "#3B82F6" : "#EF4444";
        ctx.beginPath();
        ctx.roundRect(x + w / 2, y, w / 2, h, [0, 8, 8, 0]);
        ctx.fill();

        // Labels
        ctx.fillStyle = "white";
        ctx.font = "bold 13px Nunito, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(m.polarity === 1 ? "N" : "S", x + w / 4, m.y);
        ctx.fillText(m.polarity === 1 ? "S" : "N", x + (3 * w) / 4, m.y);
      }
    }

    draw();
  }, [magnets, showField]);

  function getCanvasPos(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const pos = getCanvasPos(e);
    for (let i = 0; i < magnets.length; i++) {
      const m = magnets[i]!;
      if (Math.hypot(pos.x - m.x, pos.y - m.y) < 50) {
        setDragging(i);
        break;
      }
    }
  }

  function onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (dragging === null) return;
    const pos = getCanvasPos(e);
    setMagnets((prev) =>
      prev.map((m, i) => (i === dragging ? { ...m, x: pos.x, y: pos.y } : m))
    );
  }

  function onMouseUp() {
    setDragging(null);
  }

  function togglePolarities() {
    setBothSame((prev) => {
      const next = !prev;
      setMagnets([
        { x: 200, y: 200, polarity: 1 },
        { x: 400, y: 200, polarity: next ? 1 : -1 },
      ]);
      return next;
    });
  }

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-indigo-100 shadow-md bg-white">
      <div className="flex items-center justify-between px-4 py-3 bg-indigo-50 border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧲</span>
          <span className="font-bold text-indigo-900 text-sm">Magnetic Field Simulator</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-sm text-indigo-700 cursor-pointer">
            <input
              type="checkbox"
              checked={showField}
              onChange={(e) => setShowField(e.target.checked)}
              className="rounded"
            />
            Show field
          </label>
          <button
            onClick={togglePolarities}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            {bothSame ? "Make opposite" : "Make same"}
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: dragging !== null ? "grabbing" : "grab", width: "100%", height: "auto" }}
        aria-label="Magnetic field simulation — drag the magnets around"
        role="img"
      />

      <div className="px-4 py-3 bg-indigo-50 border-t border-indigo-100 text-xs text-indigo-700 flex flex-wrap gap-3">
        <span>🔴 Red = North pole</span>
        <span>🔵 Blue = South pole</span>
        <span>↗ Arrows show field direction</span>
        <span className="font-medium">Drag the magnets!</span>
      </div>
    </div>
  );
}
