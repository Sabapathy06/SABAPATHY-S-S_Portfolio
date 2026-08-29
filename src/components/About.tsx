import { motion } from "framer-motion";
import { BrainCircuit, Code2, Cpu, Database, Layers, Smartphone, Wrench } from "lucide-react";
import SectionHeader from "./SectionHeader";

const focus = [
  { icon: Layers, label: "Full Stack Development" },
  { icon: Code2, label: "Software Engineering" },
  { icon: BrainCircuit, label: "AI Applications" },
  { icon: Smartphone, label: "Android Development" },
  { icon: Database, label: "Databases" },
  { icon: Wrench, label: "Robotics" },
  { icon: Cpu, label: "Embedded Systems" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader index="01" eyebrow="About" title="Pre-final-year CSE student building across the full stack — from UI to hardware." />

        <div className="grid lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="panel rounded-xl p-6">
              <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] mb-3">// PROFILE.md</div>
              <p className="text-[#e6edf5] leading-relaxed">
                I&apos;m a pre-final-year <span className="text-[#22d3ee]">B.E. Computer Science</span> student
                who enjoys shipping practical software and connecting it to real hardware.
              </p>
              <p className="mt-3 text-[#8a97a8] leading-relaxed">
                My work spans Android apps with AI, web interfaces backed by Python and SQLite, and embedded platforms built on Arduino and ESP32-CAM.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {focus.map((f, i) => (
                <FocusCard key={f.label} label={f.label} Icon={f.icon} idx={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FocusCard({ label, Icon, idx }: { label: string; Icon: React.ElementType; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: idx * 0.04 }}
      className="group relative panel rounded-lg p-4 hover:border-[#22d3ee]/40 transition"
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-md grid place-items-center bg-[#22d3ee]/10 border border-[#22d3ee]/25 text-[#22d3ee] group-hover:bg-[#22d3ee]/15 transition">
          <Icon size={16} />
        </div>
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#e6edf5]">{label}</div>
      </div>
      <div className="absolute top-2 right-2 font-mono text-[9px] text-[#55657a]">{String(idx + 1).padStart(2, "0")}</div>
    </motion.div>
  );
}
