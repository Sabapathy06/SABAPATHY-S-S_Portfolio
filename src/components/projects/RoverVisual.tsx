import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Camera, Cpu, Gauge, Radio, Waves } from "lucide-react";

// Interactive 6-wheel Search and Detect Rover schematic
export default function RoverVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-100px", once: false });
  const [hover, setHover] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 800);
    return () => window.clearInterval(id);
  }, [inView]);

  const activeSensor = tick % 3; // 0 left, 1 front, 2 right

  return (
    <div ref={wrapRef} className="panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#22d3ee]/70" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#22d3ee]/70" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#22d3ee]/70" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#22d3ee]/70" />

      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em]">TELEMETRY / LIVE</div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#22d3ee]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] pulse-node" /> LINK OK
        </div>
      </div>

      {/* Rover schematic */}
      <svg viewBox="0 0 460 240" className="w-full mt-3">
        <defs>
          <linearGradient id="body" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#0f1721" />
            <stop offset="1" stopColor="#0b1119" />
          </linearGradient>
          <radialGradient id="cone" cx="0.5" cy="0" r="1">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Terrain baseline */}
        <line x1="20" y1="200" x2="440" y2="200" stroke="#1a2431" strokeDasharray="3 6" />

        {/* Ultrasonic cones (from front) */}
        <g transform="translate(230 90)">
          {/* Left */}
          <g opacity={activeSensor === 0 ? 1 : 0.3}
             onMouseEnter={() => setHover("ultra")}
             onMouseLeave={() => setHover(null)}>
            <path d="M -60 0 L -160 -70 L -160 -30 Z" fill="url(#cone)" transform="rotate(-25 -60 0)" />
          </g>
          {/* Front */}
          <g opacity={activeSensor === 1 ? 1 : 0.3}
             onMouseEnter={() => setHover("ultra")}
             onMouseLeave={() => setHover(null)}>
            <path d="M 0 -20 L -75 -110 L 75 -110 Z" fill="url(#cone)" />
          </g>
          {/* Right */}
          <g opacity={activeSensor === 2 ? 1 : 0.3}
             onMouseEnter={() => setHover("ultra")}
             onMouseLeave={() => setHover(null)}>
            <path d="M 60 0 L 160 -70 L 160 -30 Z" fill="url(#cone)" transform="rotate(25 60 0)" />
          </g>
        </g>

        {/* Chassis */}
        <g
          onMouseEnter={() => setHover("chassis")}
          onMouseLeave={() => setHover(null)}
        >
          <rect x="110" y="110" width="240" height="70" rx="10" fill="url(#body)" stroke={hover === "chassis" ? "#22d3ee" : "#23303f"} />
          {/* Solar / plate details */}
          <g stroke="#1a2431">
            <line x1="130" y1="130" x2="330" y2="130" />
            <line x1="130" y1="160" x2="330" y2="160" />
          </g>
          <text x="230" y="152" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#8a97a8" letterSpacing="2">
            S · D · ROVER
          </text>
        </g>

        {/* Camera turret */}
        <g onMouseEnter={() => setHover("cam")} onMouseLeave={() => setHover(null)}>
          <rect x="210" y="84" width="40" height="26" rx="4" fill="#0b1119" stroke={hover === "cam" ? "#22d3ee" : "#23303f"} />
          <circle cx="230" cy="97" r="6" fill="#050a10" stroke="#22d3ee" />
          <circle cx="230" cy="97" r="2" fill="#22d3ee" />
        </g>

        {/* Antenna */}
        <g>
          <line x1="330" y1="110" x2="330" y2="70" stroke="#23303f" />
          <circle cx="330" cy="66" r="3" fill="#22d3ee" className={inView ? "pulse-node" : ""} />
        </g>

        {/* Six wheels */}
        {[135, 195, 255, 315].map((cx, i) => {
          // 6 wheels split 3 per side (front, mid, rear)
          const positions = [130, 195, 260, 325];
          const x = positions[i];
          return (
            <g key={i} onMouseEnter={() => setHover("wheel")} onMouseLeave={() => setHover(null)}>
              <circle cx={x} cy={185} r={16} fill="#050a10" stroke={hover === "wheel" ? "#22d3ee" : "#23303f"} strokeWidth={2} />
              <circle cx={x} cy={185} r={6} fill="#0b1119" stroke="#23303f" />
              <line x1={x - 12} y1={185} x2={x + 12} y2={185} stroke="#1a2431" />
              <line x1={x} y1={173} x2={x} y2={197} stroke="#1a2431" />
            </g>
          );
        })}
        {/* two extras to make 6 (offset second row) */}
        <g>
          <circle cx={100} cy={185} r={14} fill="#050a10" stroke="#23303f" strokeWidth={2} />
          <circle cx={360} cy={185} r={14} fill="#050a10" stroke="#23303f" strokeWidth={2} />
        </g>

        {/* Data lines to sensors labels */}
        <g stroke="#22d3ee" strokeOpacity="0.6" strokeDasharray="3 5" className="dash-move" fill="none">
          <path d="M 90 100 L 60 60 L 20 60" />
          <path d="M 370 100 L 400 60 L 440 60" />
          <path d="M 250 90 L 300 40 L 400 40" />
        </g>
        <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#8a97a8">
          <text x="20" y="55">ULTRASONIC L</text>
          <text x="440" y="55" textAnchor="end">ULTRASONIC R</text>
          <text x="400" y="35">ESP32-CAM</text>
          <text x="330" y="58">TX/RX</text>
        </g>

        {/* Distance readout */}
        <g>
          <rect x="20" y="210" width="420" height="18" fill="#0b1119" stroke="#1a2431" rx="4" />
          <text x="28" y="223" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#55657a">DIST</text>
          <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#e6edf5">
            <text x="60" y="223">L {String((28 + ((tick * 3) % 40))).padStart(2, "0")} cm</text>
            <text x="170" y="223">F {String((14 + ((tick * 5) % 60))).padStart(2, "0")} cm</text>
            <text x="280" y="223">R {String((32 + ((tick * 4) % 50))).padStart(2, "0")} cm</text>
          </g>
          <text x="432" y="223" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#22d3ee">OK</text>
        </g>
      </svg>

      {/* legend row */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Meta Icon={Waves} label="Ultrasonic" active={hover === "ultra"} />
        <Meta Icon={Camera} label="ESP32-CAM" active={hover === "cam"} />
        <Meta Icon={Cpu} label="Arduino" active={hover === "chassis"} />
        <Meta Icon={Gauge} label="6-Wheel Drive" active={hover === "wheel"} />
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#55657a] tracking-[0.14em]">
        <span className="inline-flex items-center gap-1.5"><Radio size={11} className="text-[#22d3ee]" /> WEB ↔ PY ↔ ROVER</span>
        <span>SCAN {String((tick * 7) % 360).padStart(3, "0")}°</span>
      </div>
    </div>
  );
}

function Meta({ Icon, label, active }: { Icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <div
      className={`px-2.5 py-2 rounded-md border font-mono text-[10px] tracking-[0.14em] uppercase flex items-center gap-2 transition ${
        active ? "border-[#22d3ee]/60 text-[#22d3ee] bg-[#22d3ee]/5" : "border-[#1a2431] text-[#8a97a8]"
      }`}
    >
      <Icon size={12} /> {label}
    </div>
  );
}
