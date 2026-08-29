import { motion } from "framer-motion";
import { Building2, MapPin, Radio } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          index="04"
          eyebrow="Experience"
          title="Hands-on exposure to railway signalling and telecommunication."
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="grid lg:grid-cols-12 gap-6"
        >
          <div className="lg:col-span-4 panel rounded-xl p-5">
            <div className="font-mono text-[10px] text-[#22d3ee] tracking-[0.24em]">01 / ROLE</div>
            <h3 className="h-display text-2xl md:text-3xl mt-2 text-[#e6edf5]">Technical Intern</h3>
            <div className="mt-4 space-y-2 text-[13px] text-[#8a97a8]">
              <div className="flex items-center gap-2"><Building2 size={13} className="text-[#22d3ee]" /> Signals &amp; Telecommunication Workshop</div>
              <div className="flex items-center gap-2"><MapPin size={13} className="text-[#22d3ee]" /> Podanur, Coimbatore</div>
              <div className="flex items-center gap-2"><Radio size={13} className="text-[#22d3ee]" /> Indian Railways context</div>
            </div>
          </div>

          <div className="lg:col-span-8 panel rounded-xl p-5">
            <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] mb-3">// SCOPE</div>
            <ul className="grid sm:grid-cols-2 gap-3 text-[13px]">
              {[
                "Built a web-based material & requirements collection system",
                "Organized requirements into a structured format",
                "Delivered a centralized interface for tracking",
                "Gained exposure to railway signalling workflows",
                "Gained exposure to telecommunication systems",
              ].map((s) => (
                <li key={s} className="panel rounded-lg p-3 flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                  <span className="text-[#e6edf5]">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
