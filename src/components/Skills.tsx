import { motion } from "framer-motion";
import { Braces, Code2, Cpu, Database, Globe, Smartphone, Wrench } from "lucide-react";
import SectionHeader from "./SectionHeader";

const groups = [
  { title: "Programming", Icon: Code2, items: ["C", "C++", "Java", "Python", "SQL"] },
  { title: "Web", Icon: Globe, items: ["HTML", "CSS"] },
  { title: "Core", Icon: Braces, items: ["DSA", "OOP", "DBMS"] },
  { title: "Android / AI", Icon: Smartphone, items: ["Kotlin", "Jetpack Compose", "Android Studio", "Gemini API", "Google ML Kit"] },
  { title: "Data", Icon: Database, items: ["SQLite", "Room Database"] },
  { title: "Hardware", Icon: Cpu, items: ["Arduino", "ESP32-CAM"] },
  { title: "Tools", Icon: Wrench, items: ["GitHub", "VS Code", "HackerRank"] },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          index="02"
          eyebrow="Skills"
          title="Compact toolset across software, mobile, data and hardware."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g, i) => (
            <SkillGroup key={g.title} idx={i} {...g} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillGroup({
  title,
  Icon,
  items,
  idx,
}: {
  title: string;
  Icon: React.ElementType;
  items: string[];
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: idx * 0.04 }}
      className="group relative panel rounded-xl p-5 hover:border-[#22d3ee]/40 transition"
      onMouseMove={(e) => {
        const t = e.currentTarget;
        const r = t.getBoundingClientRect();
        t.style.setProperty("--mx", `${e.clientX - r.left}px`);
        t.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {/* soft cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition"
        style={{
          background:
            "radial-gradient(180px 180px at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.09), transparent 60%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md grid place-items-center bg-[#22d3ee]/10 border border-[#22d3ee]/25 text-[#22d3ee]">
            <Icon size={15} />
          </div>
          <div>
            <div className="font-mono text-[10px] text-[#55657a] tracking-[0.22em]">GROUP / {String(idx + 1).padStart(2, "0")}</div>
            <div className="font-display text-[15px] text-[#e6edf5] tracking-tight">{title}</div>
          </div>
        </div>
        <div className="font-mono text-[10px] text-[#55657a]">{items.length} · items</div>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {items.map((it) => (
          <span
            key={it}
            className="px-2.5 py-1 rounded-md border border-[#1a2431] bg-[#0b1119]/70 font-mono text-[11px] text-[#e6edf5] hover:border-[#22d3ee]/50 hover:text-[#22d3ee] transition"
          >
            {it}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
