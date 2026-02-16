import React, { useRef, useEffect, useState } from "react";

// =====================
// CONFIG
// =====================

const COLOR_SWATCHES = [
  "#ffffff",
  "#ff007f",
  "#00f0ff",
  "#ffef00",
  "#00ff7f",
  "#ff5500",
  "#7f00ff",
];

const METHODS = [
  { id: "pour", label: "Pour" },
  { id: "swipe", label: "Swipe" },
  { id: "pendulum", label: "Pendulum" },
];

const MAX_PARTICLES = 1500;
const FRICTION = 0.96;
const FADE_RATE = 0.3; // how fast "paint" fades
const BASE_RADIUS = 16;
const SWIPE_SPAWN_SPACING = 8; // px between swipe particles
const POUR_PARTICLE_COUNT = 120;

// =====================
// HELPERS
// =====================

function hexToRGB(hex) {
  if (!hex) return { r: 255, g: 255, b: 255 };
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  const r = parseInt(h.slice(0, 2), 16) || 0;
  const g = parseInt(h.slice(2, 4), 16) || 0;
  const b = parseInt(h.slice(4, 6), 16) || 0;
  return { r, g, b };
}

function spawnParticle(particles, x, y, color, radius, vx, vy) {
  if (particles.length >= MAX_PARTICLES) {
    // drop oldest to keep cap
    const removeCount = particles.length - MAX_PARTICLES + 1;
    particles.splice(0, removeCount);
  }

  particles.push({
    x,
    y,
    vx,
    vy,
    r: color.r,
    g: color.g,
    b: color.b,
    life: 1, // 1 = fully visible, then fades
    radius,
  });
}

function spawnPourBurst(particles, x, y, color) {
  for (let i = 0; i < POUR_PARTICLE_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 60 + Math.random() * 140;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const radius = BASE_RADIUS * (0.5 + Math.random());
    spawnParticle(particles, x, y, color, radius, vx, vy);
  }
}

function spawnSwipeAlongSegment(particles, x0, y0, x1, y1, color) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const steps = Math.max(1, Math.floor(dist / SWIPE_SPAWN_SPACING));
  const dirX = dx / dist;
  const dirY = dy / dist;
  const speed = 220;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + dx * t;
    const y = y0 + dy * t;
    const jitterX = (Math.random() - 0.5) * 6;
    const jitterY = (Math.random() - 0.5) * 6;
    const vx = dirX * speed + (Math.random() - 0.5) * 40;
    const vy = dirY * speed + (Math.random() - 0.5) * 40;
    const radius = BASE_RADIUS * (0.4 + Math.random() * 0.8);
    spawnParticle(particles, x + jitterX, y + jitterY, color, radius, vx, vy);
  }
}

function spawnPendulumParticles(particles, cx, cy, t, color) {
  const ampX = 180;
  const ampY = 60;

  const x = cx + Math.sin(t * 1.5) * ampX;
  const y = cy + Math.cos(t * 0.7) * ampY;

  const vx = (Math.random() - 0.5) * 40;
  const vy = (Math.random() - 0.5) * 40;
  const radius = BASE_RADIUS * (0.7 + Math.random() * 0.6);

  spawnParticle(particles, x, y, color, radius, vx, vy);
}

function updateParticles(particles, dt, width, height) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.x += p.vx * dt;
    p.y += p.vy * dt;

    p.vx *= FRICTION;
    p.vy *= FRICTION;

    p.life -= FADE_RATE * dt;

    // Kill if too old or far off-screen
    if (
      p.life <= 0 ||
      p.x < -100 ||
      p.x > width + 100 ||
      p.y < -100 ||
      p.y > height + 100
    ) {
      particles.splice(i, 1);
    }
  }
}

function renderParticles(ctx, particles, width, height) {
  // Background
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, width, height);

  // Additive blending so colors feel like light/paint mixing
  ctx.globalCompositeOperation = "lighter";

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const alpha = Math.max(0, Math.min(1, p.life));
    if (alpha <= 0) continue;

    ctx.beginPath();
    ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";
}

// =====================
// MAIN COMPONENT
// =====================

export default function PourSimulator() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const isPlayingRef = useRef(true);
  const timeRef = useRef(0);

  const lastPointerRef = useRef(null);
  const isDraggingSwipeRef = useRef(false);

  const pendulumCenterRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[1]);
  const [selectedMethod, setSelectedMethod] = useState(METHODS[0].id);

  const selectedColorRef = useRef(hexToRGB(COLOR_SWATCHES[1]));
  const selectedMethodRef = useRef(METHODS[0].id);

  const handlePlay = () => {
    isPlayingRef.current = true;
    setIsPlaying(true);
  };

  const handleFreeze = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
  };

  const handleColorClick = (hex) => {
    setSelectedColor(hex);
    selectedColorRef.current = hexToRGB(hex);
  };

  const handleMethodClick = (id) => {
    setSelectedMethod(id);
    selectedMethodRef.current = id;
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  const handleCanvasMouseDown = (e) => {
    const pos = getCanvasCoords(e);
    if (!pos) return;
    const { x, y } = pos;
    const method = selectedMethodRef.current;
    const color = selectedColorRef.current;
    const particles = particlesRef.current;

    if (method === "swipe") {
      isDraggingSwipeRef.current = true;
      lastPointerRef.current = { x, y };
      spawnSwipeAlongSegment(particles, x, y, x, y, color);
    } else if (method === "pour") {
      spawnPourBurst(particles, x, y, color);
    } else if (method === "pendulum") {
      pendulumCenterRef.current = { x, y };
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDraggingSwipeRef.current) return;
    if (selectedMethodRef.current !== "swipe") return;

    const pos = getCanvasCoords(e);
    if (!pos) return;

    const { x, y } = pos;
    const last = lastPointerRef.current;
    if (!last) {
      lastPointerRef.current = { x, y };
      return;
    }

    const color = selectedColorRef.current;
    const particles = particlesRef.current;

    spawnSwipeAlongSegment(particles, last.x, last.y, x, y, color);
    lastPointerRef.current = { x, y };
  };

  const handleCanvasMouseUp = () => {
    isDraggingSwipeRef.current = false;
    lastPointerRef.current = null;
  };

  const handleUndo = () => {
    // Just drop the last "chunk" by slicing off some particles.
    // Rough but feels like "undo last action".
    const particles = particlesRef.current;
    if (particles.length === 0) return;
    const removeCount = Math.min(200, particles.length);
    particles.splice(particles.length - removeCount, removeCount);
  };

  const handleReset = () => {
    particlesRef.current = [];
  };

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = performance.now();
    let frameId;

    const loop = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const particles = particlesRef.current;

      if (isPlayingRef.current) {
        timeRef.current += dt;
        const t = timeRef.current;

        // Pendulum injection
        if (
          selectedMethodRef.current === "pendulum" &&
          pendulumCenterRef.current
        ) {
          const { x: cx, y: cy } = pendulumCenterRef.current;
          const color = selectedColorRef.current;
          // drip a couple of particles per frame
          spawnPendulumParticles(particles, cx, cy, t, color);
          spawnPendulumParticles(particles, cx, cy, t + 0.3, color);
        }

        updateParticles(particles, dt, width, height);
      }

      renderParticles(ctx, particles, width, height);

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div>
          <h1 className="text-lg font-semibold text-[#ee05fa]">
            Acrylic Pour Playground (Fluid Mode)
          </h1>
          <p className="text-xs text-white/70">
            Pour: click to drop paint. Swipe: click + drag to draw ribbons.
            Pendulum: select a color, choose Pendulum, click to set an anchor
            point, then press Play and let it swing.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePlay}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              isPlaying
                ? "bg-[#ee05fa] border-[#ee05fa]"
                : "border-white/30 hover:border-white"
            }`}
          >
            ▶ Play
          </button>
          <button
            onClick={handleFreeze}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              !isPlaying
                ? "bg-[#00f0ff] border-[#00f0ff] text-black"
                : "border-white/30 hover:border-white"
            }`}
          >
            ⏸ Freeze
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Controls */}
        <div className="w-full md:w-72 border-r border-white/10 p-4 space-y-4 bg-black">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-white/60 mb-1">
              1. Color
            </h2>
            <div className="flex flex-wrap gap-2">
              {COLOR_SWATCHES.map((c) => (
                <button
                  key={c}
                  onClick={() => handleColorClick(c)}
                  className={`w-7 h-7 rounded-full border-2 ${
                    selectedColor === c
                      ? "border-white"
                      : "border-white/20 hover:border-white/60"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-white/60 mb-1">
              2. Method
            </h2>
            <div className="flex flex-wrap gap-2">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleMethodClick(m.id)}
                  className={`px-3 py-1 rounded-full text-xs border ${
                    selectedMethod === m.id
                      ? "bg-white text-black border-white"
                      : "border-white/30 text-white/80 hover:border-white"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-white/60 mb-1">
              3. Actions
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleUndo}
                className="px-3 py-1 rounded-full text-xs border border-white/40 text-white/80 hover:border-white"
              >
                Undo (rough)
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1 rounded-full text-xs border border-red-500/60 text-red-300 hover:border-red-400"
              >
                Reset
              </button>
            </div>
            <p className="mt-2 text-[10px] text-white/50 leading-snug">
              Tip: Try a neon color on Pour, then Swipe a contrasting color
              through it, and finish with a Pendulum drip over the top.
            </p>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full block cursor-crosshair"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          />
        </div>
      </div>
    </div>
  );
}

