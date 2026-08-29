import { useEffect, useRef } from "react";

// Lightweight canvas: subtle circuit node grid + soft particles that respond to mouse.
export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    type Node = { x: number; y: number; r: number; twinkle: number };
    let nodes: Node[] = [];
    const spacing = 110; // node spacing on the grid

    const buildNodes = () => {
      nodes = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // jitter each node a bit
          const jx = ((i * 928.3) % 33) - 16;
          const jy = ((j * 517.1) % 33) - 16;
          nodes.push({
            x: i * spacing + jx,
            y: j * spacing + jy,
            r: Math.random() > 0.86 ? 1.6 : 0.8,
            twinkle: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    // "Data packets" traveling on random lines occasionally
    type Packet = { from: Node; to: Node; t: number; speed: number };
    let packets: Packet[] = [];
    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const from = nodes[(Math.random() * nodes.length) | 0];
      // pick a neighbor within ~1.6 spacing
      const candidates = nodes.filter(
        (n) => n !== from && Math.abs(n.x - from.x) < spacing * 1.6 && Math.abs(n.y - from.y) < spacing * 1.6
      );
      if (!candidates.length) return;
      const to = candidates[(Math.random() * candidates.length) | 0];
      packets.push({ from, to, t: 0, speed: 0.006 + Math.random() * 0.008 });
    };

    let t = 0;
    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // faint vignette layer already handled by CSS body; draw grid lines subtly
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(35,48,63,0.22)";
      ctx.beginPath();
      for (let x = 0; x < w; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // mouse influence
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const influenceR = 220;

      // draw nodes
      for (const n of nodes) {
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.hypot(dx, dy);
        const near = dist < influenceR;
        const push = near ? (1 - dist / influenceR) * 8 : 0;
        const px = n.x + (dx / (dist || 1)) * push;
        const py = n.y + (dy / (dist || 1)) * push;

        // twinkle for a subset
        n.twinkle += 0.02;
        const alpha = near ? 0.85 : 0.28 + Math.sin(n.twinkle) * 0.08;

        ctx.beginPath();
        ctx.fillStyle = near
          ? `rgba(34,211,238,${alpha.toFixed(3)})`
          : `rgba(120,150,180,${alpha.toFixed(3)})`;
        ctx.arc(px, py, n.r + (near ? 0.6 : 0), 0, Math.PI * 2);
        ctx.fill();

        // connect near-mouse nodes to neighbors
        if (near) {
          for (const m of nodes) {
            if (m === n) continue;
            const dxn = m.x - n.x;
            const dyn = m.y - n.y;
            if (Math.abs(dxn) > spacing * 1.3 || Math.abs(dyn) > spacing * 1.3) continue;
            const d2 = Math.hypot(dxn, dyn);
            if (d2 > spacing * 1.35) continue;
            const a = (1 - dist / influenceR) * (1 - d2 / (spacing * 1.35)) * 0.5;
            if (a < 0.02) continue;
            ctx.strokeStyle = `rgba(34,211,238,${a.toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      // packets
      packets = packets.filter((p) => p.t < 1);
      for (const p of packets) {
        p.t += p.speed;
        const x = p.from.x + (p.to.x - p.from.x) * p.t;
        const y = p.from.y + (p.to.y - p.from.y) * p.t;
        // trail line
        ctx.strokeStyle = "rgba(56,189,248,0.18)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p.from.x, p.from.y);
        ctx.lineTo(p.to.x, p.to.y);
        ctx.stroke();
        // moving dot
        ctx.fillStyle = "rgba(56,189,248,0.95)";
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      t++;
      if (!reduced && t % 40 === 0 && packets.length < 14) spawnPacket();

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      mouseRef.current.x = e.touches[0].clientX;
      mouseRef.current.y = e.touches[0].clientY;
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
      {/* soft cyan glow blobs */}
      <div className="absolute -top-32 -left-24 h-[36rem] w-[36rem] rounded-full blur-3xl"
           style={{ background: "radial-gradient(circle at center, rgba(34,211,238,0.10), transparent 60%)" }} />
      <div className="absolute top-1/3 right-0 h-[30rem] w-[30rem] rounded-full blur-3xl"
           style={{ background: "radial-gradient(circle at center, rgba(56,189,248,0.07), transparent 60%)" }} />
    </div>
  );
}
