"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const G = 9.8; // m/s²
const SCALE = 8; // px per metre
const FPS = 60;

interface SimState {
  running: boolean;
  t: number;
  x: number;
  y: number;
  trail: { x: number; y: number }[];
  landed: boolean;
  landX: number;
}

export function ProjectileSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<SimState>({
    running: false,
    t: 0,
    x: 0,
    y: 0,
    trail: [],
    landed: false,
    landX: 0,
  });

  const [speed, setSpeed] = useState(20); // m/s
  const [angleDeg, setAngleDeg] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [prediction, setPrediction] = useState("");
  const [predictionLocked, setPredictionLocked] = useState(false);
  const [landResult, setLandResult] = useState<number | null>(null);

  const W = 600;
  const H = 400;
  const ORIGIN_X = 60;
  const ORIGIN_Y = H - 60;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, ORIGIN_Y);
    sky.addColorStop(0, "#87CEEB");
    sky.addColorStop(1, "#E0F4FF");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, ORIGIN_Y);

    // Ground
    ctx.fillStyle = "#5D8A3C";
    ctx.fillRect(0, ORIGIN_Y, W, H - ORIGIN_Y);
    ctx.fillStyle = "#4A7030";
    ctx.fillRect(0, ORIGIN_Y, W, 4);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    for (let x = ORIGIN_X; x < W; x += SCALE * 10) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ORIGIN_Y); ctx.stroke();
    }
    for (let y = ORIGIN_Y; y > 0; y -= SCALE * 10) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ORIGIN_X, 10); ctx.lineTo(ORIGIN_X, ORIGIN_Y); ctx.lineTo(W - 10, ORIGIN_Y);
    ctx.stroke();

    // Axis labels (distance marks)
    ctx.fillStyle = "#333";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "center";
    for (let m = 0; m <= 60; m += 10) {
      const px = ORIGIN_X + m * SCALE;
      if (px > W - 10) break;
      ctx.fillText(`${m}m`, px, ORIGIN_Y + 18);
    }
    ctx.textAlign = "right";
    for (let m = 0; m <= 40; m += 10) {
      const py = ORIGIN_Y - m * SCALE;
      if (py < 10) break;
      ctx.fillText(`${m}m`, ORIGIN_X - 4, py + 4);
    }

    const s = stateRef.current;

    // Trail
    if (s.trail.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(251,146,60,0.7)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(s.trail[0]!.x, s.trail[0]!.y);
      for (const pt of s.trail.slice(1)) ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Landing marker
    if (s.landed) {
      const lx = ORIGIN_X + s.landX * SCALE;
      ctx.strokeStyle = "#EF4444";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lx - 8, ORIGIN_Y);
      ctx.lineTo(lx + 8, ORIGIN_Y);
      ctx.stroke();
      ctx.fillStyle = "#EF4444";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${s.landX.toFixed(1)} m`, lx, ORIGIN_Y - 10);
    }

    // Launch arrow (when not running)
    if (!s.running && !s.landed) {
      const angle = (angleDeg * Math.PI) / 180;
      const arrowLen = 40;
      const ax = ORIGIN_X + Math.cos(angle) * arrowLen;
      const ay = ORIGIN_Y - Math.sin(angle) * arrowLen;
      ctx.strokeStyle = "#F59E0B";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(ORIGIN_X, ORIGIN_Y);
      ctx.lineTo(ax, ay);
      ctx.stroke();
      // Arrowhead
      ctx.save();
      ctx.translate(ax, ay);
      ctx.rotate(-angle);
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(-10, 4); ctx.lineTo(-10, -4); ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Projectile ball
    if (s.running || s.landed) {
      const bx = ORIGIN_X + s.x * SCALE;
      const by = ORIGIN_Y - s.y * SCALE;
      ctx.beginPath();
      ctx.arc(bx, by, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#F97316";
      ctx.fill();
      ctx.strokeStyle = "#7C2D12";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      // Cannon at origin
      const angle = (angleDeg * Math.PI) / 180;
      ctx.save();
      ctx.translate(ORIGIN_X, ORIGIN_Y);
      ctx.rotate(-angle);
      ctx.fillStyle = "#374151";
      ctx.beginPath();
      ctx.roundRect(0, -8, 36, 16, 4);
      ctx.fill();
      ctx.restore();
    }
  }, [angleDeg, W, H, ORIGIN_X, ORIGIN_Y]);

  function launch() {
    const s = stateRef.current;
    s.running = true;
    s.t = 0;
    s.x = 0;
    s.y = 0;
    s.trail = [];
    s.landed = false;
    s.landX = 0;

    const vRad = (angleDeg * Math.PI) / 180;
    const vx = speed * Math.cos(vRad);
    const vy = speed * Math.sin(vRad);
    const g = gravity;
    const dt = 1 / FPS;

    setLandResult(null);

    function tick() {
      s.t += dt;
      s.x = vx * s.t;
      s.y = vy * s.t - 0.5 * g * s.t * s.t;

      if (s.y <= 0 && s.t > 0.05) {
        // Landed
        s.y = 0;
        s.landed = true;
        s.running = false;
        s.landX = s.x;
        setLandResult(Math.round(s.x * 10) / 10);
        draw();
        return;
      }

      const bx = ORIGIN_X + s.x * SCALE;
      const by = ORIGIN_Y - s.y * SCALE;
      s.trail.push({ x: bx, y: by });
      draw();
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  function reset() {
    cancelAnimationFrame(rafRef.current);
    stateRef.current = { running: false, t: 0, x: 0, y: 0, trail: [], landed: false, landX: 0 };
    setLandResult(null);
    setPrediction("");
    setPredictionLocked(false);
    draw();
  }

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const theoreticalRange = (speed * speed * Math.sin(2 * (angleDeg * Math.PI) / 180)) / gravity;

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-blue-100 shadow-md bg-white">
      <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border-b border-blue-100">
        <span className="text-xl">🚀</span>
        <span className="font-bold text-blue-900 text-sm">Projectile Motion Simulator</span>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ width: "100%", height: "auto" }}
        aria-label="Projectile motion simulation"
        role="img"
      />

      {/* Controls */}
      <div className="px-4 py-4 bg-gray-50 border-t border-gray-100 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-600">
              Speed: <strong>{speed} m/s</strong>
            </span>
            <input type="range" min={5} max={40} value={speed} onChange={(e) => { reset(); setSpeed(+e.target.value); }}
              className="w-full accent-blue-600" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-600">
              Angle: <strong>{angleDeg}°</strong>
            </span>
            <input type="range" min={5} max={85} value={angleDeg} onChange={(e) => { reset(); setAngleDeg(+e.target.value); }}
              className="w-full accent-orange-500" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-600">
              Gravity: <strong>{gravity} m/s²</strong>
            </span>
            <input type="range" min={1} max={25} step={0.5} value={gravity} onChange={(e) => { reset(); setGravity(+e.target.value); }}
              className="w-full accent-purple-500" />
          </label>
        </div>

        {/* Predict */}
        {!predictionLocked && (
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Predict landing distance (m)…"
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              className="flex-1 border border-amber-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50"
              aria-label="Prediction"
            />
            <button
              onClick={() => { if (prediction) setPredictionLocked(true); }}
              disabled={!prediction}
              className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-xl text-sm hover:bg-amber-600 disabled:opacity-40"
            >
              Lock 🔮
            </button>
          </div>
        )}
        {predictionLocked && (
          <p className="text-sm text-amber-700">
            🔮 Your prediction: <strong>{prediction} m</strong>
          </p>
        )}

        <div className="flex gap-2">
          <button
            onClick={launch}
            disabled={stateRef.current.running}
            className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors"
          >
            🚀 Launch!
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 text-sm"
          >
            Reset
          </button>
        </div>

        {landResult !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm space-y-1"
          >
            <p className="font-bold text-green-800">🎯 Landed at <strong>{landResult} m</strong></p>
            {predictionLocked && (
              <p className="text-green-700">
                Your prediction was {prediction} m — off by {Math.abs(landResult - +prediction).toFixed(1)} m.
                {" "}
                {Math.abs(landResult - +prediction) < 2 ? "🎉 Great intuition!" : "Close! Try adjusting the angle."}
              </p>
            )}
            <p className="text-gray-500 text-xs">
              Theory: x = v²·sin(2θ)/g = {theoreticalRange.toFixed(1)} m
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
