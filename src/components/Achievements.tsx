import { motion } from "framer-motion";
import { Award, BadgeCheck, Rocket, Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";

const achievements = [
  {
    icon: Trophy,
    tag: "NATIONAL",
    title: "Biothon 2026",
    sub: "Team Finalist · Search and Detect Rover",
  },
  {
    icon: Rocket,
    tag: "SIH 2025",
    title: "Smart India Hackathon",
    sub: "Selected · Hardware Category",
  },
];

const certs = [
  { title: "Data Structures in C (Hands-On)", org: "SkillRack — September 2025" },
  { title: "BEC Exam Certification", org: "B1 Grade" },
  { title: "MATLAB Certification", org: "MathWorks" },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          index="05"
          eyebrow="Achievements"
          title="Recognition and certifications."
        />

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="panel rounded-xl p-5 relative overflow-hidden group hover:border-[#22d3ee]/40 transition"
            >
              <span className="absolute -top-6 -right-6 h-24 w-24 rounded-full blur-2xl bg-[#22d3ee]/10 group-hover:bg-[#22d3ee]/20 transition" />
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-md grid place-items-center bg-[#22d3ee]/10 border border-[#22d3ee]/25 text-[#22d3ee]">
                  <a.icon size={18} />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[#22d3ee] tracking-[0.24em]">{a.tag}</div>
                  <div className="h-display text-xl md:text-2xl text-[#e6edf5] mt-1">{a.title}</div>
                  <div className="text-[13px] text-[#8a97a8] mt-1">{a.sub}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="panel rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BadgeCheck size={16} className="text-[#22d3ee]" />
            <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em]">CERTIFICATIONS</div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {certs.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-lg border border-[#1a2431] bg-[#0b1119]/60 p-4 hover:border-[#22d3ee]/40 transition"
              >
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-[#22d3ee]" />
                  <div className="font-display text-[15px] text-[#e6edf5]">{c.title}</div>
                </div>
                <div className="mt-1 font-mono text-[10px] text-[#8a97a8] tracking-[0.14em]">{c.org}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
