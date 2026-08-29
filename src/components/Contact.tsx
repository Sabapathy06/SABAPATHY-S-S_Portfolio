import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { LINKS } from "../lib/data";

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          index="07"
          eyebrow="Contact"
          title="Let’s build something meaningful."
          description="Open to internships and full-stack, AI or embedded-systems collaborations."
        />

        <div className="grid lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 panel rounded-2xl p-6 md:p-8 relative overflow-hidden"
          >
            <span className="absolute -top-20 -right-16 h-56 w-56 rounded-full blur-3xl bg-[#22d3ee]/15" />
            <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em] mb-4">// REACH_OUT</div>
            <div className="space-y-3">
              <ContactRow Icon={Mail} label="Email" value={LINKS.email} href={`mailto:${LINKS.email}`} />
              <ContactRow Icon={Phone} label="Phone" value={LINKS.phone} href={`tel:${LINKS.phone.replace(/\s/g, "")}`} />
              <ContactRow Icon={MapPin} label="Location" value="Coimbatore, Tamil Nadu, India" />
              <ContactRow Icon={Linkedin} label="LinkedIn" value="linkedin.com/in/sabapathy-s-s-130516315" href={LINKS.linkedin} external />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-5 grid grid-cols-2 gap-3"
          >
            <QuickAction Icon={Mail} label="Email" href={`mailto:${LINKS.email}`} />
            <QuickAction Icon={Linkedin} label="LinkedIn" href={LINKS.linkedin} external />
            <QuickAction Icon={Github} label="GitHub" href={LINKS.github} external />
            <QuickAction Icon={Download} label="Resume" href={LINKS.resume} download />
          </motion.div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#1a2431] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em]">
            © {new Date().getFullYear()} · SABAPATHY S S · BUILT WITH REACT + TAILWIND
          </div>
          <div className="font-mono text-[10px] text-[#22d3ee] tracking-[0.24em]">
            SOFTWARE × AI × HARDWARE
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
  external,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const Comp: React.ElementType = href ? "a" : "div";
  return (
    <Comp
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-lg border border-[#1a2431] bg-[#0b1119]/60 p-3.5 hover:border-[#22d3ee]/40 transition"
    >
      <div className="h-9 w-9 rounded-md grid place-items-center bg-[#22d3ee]/10 border border-[#22d3ee]/25 text-[#22d3ee] shrink-0">
        <Icon size={15} />
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[9px] text-[#55657a] tracking-[0.24em] uppercase">{label}</div>
        <div className="text-[14px] text-[#e6edf5] truncate">{value}</div>
      </div>
    </Comp>
  );
}

function QuickAction({
  Icon,
  label,
  href,
  external,
  download,
}: {
  Icon: React.ElementType;
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={download}
      className="group panel rounded-2xl p-5 aspect-square flex flex-col justify-between hover:border-[#22d3ee]/50 hover:bg-[#0b1119] transition"
    >
      <div className="h-10 w-10 rounded-md grid place-items-center bg-[#22d3ee]/10 border border-[#22d3ee]/25 text-[#22d3ee] group-hover:bg-[#22d3ee]/20 transition">
        <Icon size={17} />
      </div>
      <div>
        <div className="font-mono text-[10px] text-[#55657a] tracking-[0.24em]">CONNECT</div>
        <div className="font-display text-lg text-[#e6edf5]">{label}</div>
      </div>
    </a>
  );
}
