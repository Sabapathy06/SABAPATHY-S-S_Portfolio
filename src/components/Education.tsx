import { motion } from "framer-motion";
import { GraduationCap, School } from "lucide-react";
import SectionHeader from "./SectionHeader";

const edu = [
  {
    icon: GraduationCap,
    title: "B.E. Computer Science & Engineering",
    school: "Sri Ramakrishna Institute of Technology",
    period: "2024 — 2028",
    result: "CGPA 7.52",
    tag: "UNDERGRAD",
  },
  {
    icon: School,
    title: "Higher Secondary (HSC)",
    school: "Sri Saraswathi Ramachandran Vidyalaya Hr. Sec. School",
    period: "2023 — 2024",
    result: "75.5%",
    tag: "HSC",
  },
  {
    icon: School,
    title: "Secondary (SSLC)",
    school: "Gurukulam High School",
    period: "2021 — 2022",
    result: "78.8%",
    tag: "SSLC",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader index="06" eyebrow="Education" title="Academic timeline." />

        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[#22d3ee]/40 via-[#1a2431] to-transparent hidden md:block" />
          <div className="space-y-4">
            {edu.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative md:pl-10"
              >
                <span className="hidden md:block absolute left-[7px] top-6 h-2.5 w-2.5 rounded-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" />
                <div className="panel rounded-xl p-5 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-md grid place-items-center bg-[#22d3ee]/10 border border-[#22d3ee]/25 text-[#22d3ee] shrink-0">
                    <e.icon size={17} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-[#22d3ee] tracking-[0.24em]">{e.tag}</span>
                      <span className="font-mono text-[10px] text-[#55657a] tracking-[0.24em]">· {e.period}</span>
                    </div>
                    <div className="h-display text-lg md:text-xl text-[#e6edf5] mt-1">{e.title}</div>
                    <div className="text-[13px] text-[#8a97a8] mt-0.5">{e.school}</div>
                  </div>
                  <div className="font-mono text-[12px] text-[#e6edf5] px-3 py-1.5 rounded-md border border-[#22d3ee]/30 bg-[#22d3ee]/5 shrink-0">
                    {e.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
