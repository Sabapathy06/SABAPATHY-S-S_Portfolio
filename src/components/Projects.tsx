import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Layers } from "lucide-react";
import SectionHeader from "./SectionHeader";
import MedCareVisual from "./projects/MedCareVisual";
import RoverVisual from "./projects/RoverVisual";

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          index="03"
          eyebrow="Projects"
          title="Two systems. Software meets hardware."
          description="Selected work that reflects how I build — an AI-driven Android app and a full-stack robotics platform."
        />

        <div className="space-y-16 md:space-y-24">
          <MedCareCard />
          <RoverCard />
        </div>
      </div>
    </section>
  );
}

function MedCareCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start"
    >
      <div className="lg:col-span-7 order-2 lg:order-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="chip"><span className="dot" /> PROJECT 01</span>
          <span className="chip"><Layers size={11} className="text-[#22d3ee]" /> ANDROID · AI</span>
        </div>
        <h3 className="h-display text-4xl md:text-6xl mt-4 text-[#e6edf5]">MEDCARE</h3>
        <p className="mt-2 font-mono text-[12px] text-[#22d3ee] tracking-[0.16em] uppercase">
          AI-Powered Medication Management App
        </p>
        <p className="mt-5 text-[#8a97a8] leading-relaxed max-w-xl">
          AI-powered Android application for medication management with OCR, API integration and local data persistence.
        </p>

        {/* Problem / Solution */}
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <MiniPanel title="Problem">
            Users struggle to track prescriptions and read medicine packaging reliably.
          </MiniPanel>
          <MiniPanel title="Solution">
            Scan medicine packages, extract details on device and organize them locally.
          </MiniPanel>
        </div>

        {/* Key Features */}
        <div className="mt-6">
          <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] mb-3">KEY FEATURES</div>
          <ul className="grid sm:grid-cols-2 gap-2">
            {[
              "Medicine-package scanning",
              "Prescription assistance",
              "Local data persistence",
              "Reliability & performance improvements",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] text-[#e6edf5]">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_8px_#22d3ee]" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech */}
        <div className="mt-6">
          <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] mb-2">TECHNOLOGY</div>
          <div className="flex flex-wrap gap-1.5">
            {["Kotlin", "Jetpack Compose", "Gemini API", "Google ML Kit", "Room Database"].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-md border border-[#1a2431] bg-[#0b1119]/70 font-mono text-[11px] text-[#e6edf5]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture strip */}
        <div className="mt-6">
          <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] mb-2">ARCHITECTURE</div>
          <ArchStrip steps={["UI (Compose)", "ML Kit OCR", "Gemini API", "Room DB"]} />
        </div>
      </div>

      <div className="lg:col-span-5 order-1 lg:order-2">
        <MedCareVisual />
      </div>
    </motion.article>
  );
}

function RoverCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start"
    >
      <div className="lg:col-span-7">
        <RoverVisual />

        {/* Full architecture pipeline */}
        <div className="mt-4 panel rounded-xl p-4">
          <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] mb-3">SYSTEM ARCHITECTURE</div>
          <div className="grid grid-cols-5 gap-2">
            {["WEB", "PYTHON", "COMMS", "ROVER", "SENSORS"].map((s, i) => (
              <div key={s} className="relative">
                <div className="rounded-md border border-[#1a2431] bg-[#0b1119] py-2 text-center font-mono text-[10px] tracking-[0.16em] text-[#e6edf5]">
                  {s}
                </div>
                {i < 4 && (
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 text-[#22d3ee] hidden sm:block">
                    <ArrowUpRight size={12} className="rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 font-mono text-[10px] text-[#55657a]">SENSORS: ULTRASONIC · ESP32-CAM · MOTORS</div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="chip"><span className="dot" /> PROJECT 02</span>
          <span className="chip"><Cpu size={11} className="text-[#22d3ee]" /> FULL-STACK · ROBOTICS</span>
        </div>
        <h3 className="h-display text-3xl md:text-5xl mt-4 text-[#e6edf5]">Autonomous Search &amp; Detect Rover</h3>
        <p className="mt-2 font-mono text-[12px] text-[#22d3ee] tracking-[0.16em] uppercase">
          Full-Stack Search &amp; Detection System
        </p>
        <p className="mt-5 text-[#8a97a8] leading-relaxed">
          Six-wheel search and detection rover combining a web application, Python backend, database and embedded hardware to support rescue operations.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <MiniPanel title="Problem">
            Rescue operations need fast, remote awareness of terrain and obstacles.
          </MiniPanel>
          <MiniPanel title="Solution">
            A rover with a web dashboard, Python coordination and onboard sensing.
          </MiniPanel>
        </div>

        <div className="mt-6">
          <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] mb-3">KEY FEATURES</div>
          <ul className="grid gap-2">
            {[
              "Web interface for control and monitoring",
              "Six-wheel drive for varied terrain",
              "Ultrasonic distance sensing (L / F / R)",
              "ESP32-CAM live view over comms link",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] text-[#e6edf5]">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_8px_#22d3ee]" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <div>
            <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] mb-2">SOFTWARE</div>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "HTML", "CSS", "SQLite", "Web Interface"].map((t) => (
                <span key={t} className="px-2 py-1 rounded-md border border-[#1a2431] bg-[#0b1119]/70 font-mono text-[10px] text-[#e6edf5]">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] mb-2">HARDWARE</div>
            <div className="flex flex-wrap gap-1.5">
              {["Arduino", "ESP32-CAM", "Ultrasonic", "Six-Wheel", "Motor Control"].map((t) => (
                <span key={t} className="px-2 py-1 rounded-md border border-[#1a2431] bg-[#0b1119]/70 font-mono text-[10px] text-[#e6edf5]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MiniPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="panel rounded-lg p-4">
      <div className="font-mono text-[10px] text-[#22d3ee] tracking-[0.24em] mb-1.5">{title.toUpperCase()}</div>
      <p className="text-[13px] text-[#e6edf5] leading-relaxed">{children}</p>
    </div>
  );
}

function ArchStrip({ steps }: { steps: string[] }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {steps.map((s, i) => (
        <div key={s} className="relative">
          <div className="rounded-md border border-[#1a2431] bg-[#0b1119] py-2 text-center font-mono text-[10px] tracking-[0.16em] text-[#e6edf5]">
            {s}
          </div>
          {i < steps.length - 1 && (
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 text-[#22d3ee] hidden sm:block">
              <span className="font-mono text-[10px]">→</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
