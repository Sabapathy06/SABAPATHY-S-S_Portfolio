import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, Database, ScanLine, Sparkles } from "lucide-react";

// MedCare stylized medical-tech UI mockup with in-view activation
export default function MedCareVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px", once: false });
  const [scan, setScan] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setScan((s) => (s + 1) % 100), 40);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="relative panel rounded-2xl p-4 sm:p-5 overflow-hidden">
      {/* bracket corners */}
      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#22d3ee]/70" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#22d3ee]/70" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#22d3ee]/70" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#22d3ee]/70" />

      {/* Phone frame */}
      <div className="mx-auto max-w-[320px]">
        <div className="rounded-[32px] border border-[#23303f] bg-[#080b11] p-3 shadow-2xl shadow-[#22d3ee]/5">
          <div className="rounded-[24px] bg-gradient-to-b from-[#0b1119] to-[#05070a] p-3 border border-[#1a2431]">
            {/* Status bar */}
            <div className="flex items-center justify-between font-mono text-[9px] text-[#55657a]">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]" /> MEDCARE
              </div>
              <span>100%</span>
            </div>

            {/* Scan area */}
            <div className="mt-3 relative rounded-xl border border-[#22d3ee]/30 bg-[#050a10] h-56 overflow-hidden">
              {/* grid */}
              <div className="absolute inset-0 grid-bg opacity-40" />
              {/* Pill package silhouette */}
              <svg viewBox="0 0 240 200" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="pill" x1="0" x2="1">
                    <stop offset="0" stopColor="#0f1721" />
                    <stop offset="1" stopColor="#141d2a" />
                  </linearGradient>
                </defs>
                <g transform="translate(52 44)">
                  <rect width="136" height="112" rx="10" fill="url(#pill)" stroke="#23303f" />
                  <text x="12" y="22" fill="#e6edf5" fontFamily="JetBrains Mono, monospace" fontSize="9">MED‑X 200mg</text>
                  <text x="12" y="38" fill="#8a97a8" fontFamily="JetBrains Mono, monospace" fontSize="7">Tablet · 30 pcs</text>
                  <rect x="12" y="48" width="112" height="1" fill="#23303f" />
                  <g fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#55657a">
                    <text x="12" y="62">EXP 07 / 2027</text>
                    <text x="12" y="74">BATCH #A1284</text>
                    <text x="12" y="86">1 TAB · TWICE DAILY</text>
                    <text x="12" y="98">AFTER MEAL</text>
                  </g>
                  {/* barcode */}
                  <g transform="translate(78 62)" fill="#e6edf5">
                    {Array.from({ length: 22 }).map((_, i) => (
                      <rect key={i} x={i * 2} y={0} width={i % 3 === 0 ? 1.6 : 0.8} height={26} />
                    ))}
                  </g>
                </g>
              </svg>

              {/* Scan line */}
              <div
                className="absolute left-0 right-0 h-[2px] bg-[#22d3ee] shadow-[0_0_18px_#22d3ee]"
                style={{ top: `${scan}%`, opacity: 0.9 }}
              />
              {/* Reticle corners */}
              {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((cls, i) => (
                <span key={i} className={`absolute w-4 h-4 border-[#22d3ee] ${cls}`} />
              ))}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 font-mono text-[9px] text-[#22d3ee] tracking-[0.24em]">
                <ScanLine size={11} /> SCANNING
              </div>
            </div>

            {/* Detected pill */}
            <motion.div
              key={inView ? "a" : "b"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-3 rounded-lg border border-[#1a2431] bg-[#0b1119] p-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[9px] text-[#55657a] tracking-[0.2em]">DETECTED</div>
                  <div className="text-[#e6edf5] font-display text-[14px]">MED‑X 200mg</div>
                </div>
                <span className="chip !py-0.5 !text-[9px]"><span className="dot" /> OCR</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[9px]">
                <div className="rounded border border-[#1a2431] p-1.5">
                  <div className="text-[#55657a]">DOSE</div>
                  <div className="text-[#e6edf5]">1 tab</div>
                </div>
                <div className="rounded border border-[#1a2431] p-1.5">
                  <div className="text-[#55657a]">FREQ</div>
                  <div className="text-[#e6edf5]">2× day</div>
                </div>
                <div className="rounded border border-[#1a2431] p-1.5">
                  <div className="text-[#55657a]">EXP</div>
                  <div className="text-[#e6edf5]">07/27</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* legend chips */}
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          <Legend Icon={Camera} label="Package Scan" />
          <Legend Icon={Sparkles} label="Gemini + ML Kit" />
          <Legend Icon={Database} label="Room DB" />
        </div>
      </div>
    </div>
  );
}

function Legend({ Icon, label }: { Icon: React.ElementType; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-[#1a2431] bg-[#0b1119]/60 font-mono text-[10px] tracking-[0.14em] uppercase text-[#8a97a8]">
      <Icon size={11} className="text-[#22d3ee]" /> {label}
    </div>
  );
}
