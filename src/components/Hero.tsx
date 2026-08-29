import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, MapPin, Sparkles } from "lucide-react";
import { LINKS } from "../lib/data";

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-8 md:mb-10"
        >
          <span className="chip"><span className="dot" /> AVAILABLE FOR OPPORTUNITIES</span>
          <span className="font-mono text-[11px] text-[#8a97a8] tracking-[0.14em] uppercase inline-flex items-center gap-1.5">
            <MapPin size={12} /> Coimbatore, IN
          </span>
          <span className="font-mono text-[11px] text-[#55657a] tracking-[0.14em] uppercase">
            / B.E. CSE · 2024–2028
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left — headline */}
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="font-mono text-[13px] text-[#22d3ee] tracking-[0.2em] mb-4"
            >
              HI, I&apos;M SABAPATHY S S.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-display text-[44px] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[92px] text-[#e6edf5]"
            >
              Aspiring
              <br />
              <span className="relative inline-block">
                <span className="text-[#e6edf5]">Full Stack </span>
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #22d3ee, #38bdf8 60%, #e6edf5)" }}>
                  Developer
                </span>
                <span className="absolute -right-4 top-2 h-6 w-1.5 bg-[#22d3ee] blink hidden sm:block" />
              </span>
              <span className="text-[#8a97a8]">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] tracking-[0.18em] uppercase text-[#8a97a8]"
            >
              <span className="text-[#e6edf5]">Software</span>
              <span className="text-[#22d3ee]">×</span>
              <span className="text-[#e6edf5]">AI</span>
              <span className="text-[#22d3ee]">×</span>
              <span className="text-[#e6edf5]">Hardware</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 max-w-xl text-[#8a97a8] leading-relaxed text-[15px]"
            >
              <span className="text-[#e6edf5]">“Building Software. Connecting Systems. Exploring Hardware.”</span>
              <br />
              Computer Science student building software applications and integrated systems across web, mobile, AI, databases and robotics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center gap-2 h-11 px-5 rounded-md bg-[#22d3ee] text-[#05070a] font-mono text-[12px] tracking-[0.16em] uppercase font-semibold hover:bg-[#38bdf8] transition"
              >
                View Projects
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition" />
              </button>
              <a
                href={LINKS.resume}
                download
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md border border-[#22d3ee]/40 text-[#e6edf5] font-mono text-[12px] tracking-[0.16em] uppercase hover:border-[#22d3ee] hover:text-[#22d3ee] transition"
              >
                <Download size={14} /> Download Resume
              </a>
              <div className="h-6 w-px bg-[#1a2431] mx-1 hidden sm:block" />
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-11 px-4 rounded-md border border-[#1a2431] text-[#8a97a8] hover:text-[#e6edf5] hover:border-[#23303f] transition font-mono text-[11px] tracking-[0.18em] uppercase"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-11 px-4 rounded-md border border-[#1a2431] text-[#8a97a8] hover:text-[#e6edf5] hover:border-[#23303f] transition font-mono text-[11px] tracking-[0.18em] uppercase"
              >
                <Github size={14} /> GitHub
              </a>
            </motion.div>
          </div>

          {/* Right — architecture card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4"
          >
            <HeroSystemCard />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 flex items-center justify-between border-t border-[#1a2431] pt-5"
        >
          <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] uppercase flex items-center gap-2">
            <Sparkles size={12} className="text-[#22d3ee]" /> Scroll to explore
          </div>
          <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] uppercase">
            SEC · 00 / HOME
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroSystemCard() {
  return (
    <div className="panel rounded-xl p-5 relative overflow-hidden">
      {/* corner brackets */}
      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#22d3ee]/70" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#22d3ee]/70" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#22d3ee]/70" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#22d3ee]/70" />

      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] uppercase">SYSTEM / STACK</div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#22d3ee]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] pulse-node" /> ONLINE
        </div>
      </div>

      <svg viewBox="0 0 320 260" className="w-full mt-3">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Layers */}
        {[
          { y: 20, label: "WEB / MOBILE", sub: "React · Jetpack Compose" },
          { y: 90, label: "AI + LOGIC", sub: "Python · Gemini API" },
          { y: 160, label: "DATA", sub: "SQLite · Room" },
          { y: 220, label: "HARDWARE", sub: "Arduino · ESP32-CAM" },
        ].map((l, i) => (
          <g key={i}>
            <rect x="20" y={l.y} width="280" height="38" rx="6" fill="#0b1119" stroke="#23303f" />
            <circle cx="36" cy={l.y + 19} r="3" fill="url(#g1)" />
            <text x="52" y={l.y + 16} fill="#e6edf5" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="1.5">
              {l.label}
            </text>
            <text x="52" y={l.y + 30} fill="#8a97a8" fontFamily="JetBrains Mono, monospace" fontSize="9">
              {l.sub}
            </text>
            <text x="288" y={l.y + 24} fill="#55657a" fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="end">
              0{i + 1}
            </text>
          </g>
        ))}

        {/* connectors */}
        <g stroke="#22d3ee" strokeOpacity="0.6" strokeDasharray="4 4" className="dash-move">
          <line x1="160" y1="58" x2="160" y2="90" />
          <line x1="160" y1="128" x2="160" y2="160" />
          <line x1="160" y1="198" x2="160" y2="220" />
        </g>
      </svg>
    </div>
  );
}
