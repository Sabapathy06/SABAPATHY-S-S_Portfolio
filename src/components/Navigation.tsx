import { useEffect, useState } from "react";
import { Download, Github, Linkedin, Menu, X } from "lucide-react";
import { LINKS, NAV } from "../lib/data";
import { downloadResume } from "../lib/resume";

export default function Navigation() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-[#05070a]/70 border-b border-[#1a2431]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-md border border-[#22d3ee]/40 grid place-items-center relative overflow-hidden">
            <span className="font-mono text-[#22d3ee] text-sm font-bold">S</span>
            <span className="absolute inset-0 pointer-events-none opacity-60"
                  style={{ background: "radial-gradient(circle at 30% 20%, rgba(34,211,238,0.35), transparent 60%)" }} />
          </div>
          <div className="leading-none">
            <div className="font-mono text-[11px] text-[#8a97a8] tracking-[0.14em]">SABAPATHY</div>
            <div className="font-mono text-[9px] text-[#55657a] tracking-[0.24em]">S / S</div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`relative px-3 py-2 font-mono text-[12px] tracking-[0.14em] uppercase transition-colors ${
                active === n.id ? "text-[#e6edf5]" : "text-[#8a97a8] hover:text-[#e6edf5]"
              }`}
            >
              <span className={`mr-1 ${active === n.id ? "text-[#22d3ee]" : "text-[#55657a]"}`}>
                {String(NAV.indexOf(n) + 1).padStart(2, "0")}
              </span>
              {n.label}
              {active === n.id && (
                <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-[#22d3ee]" />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="h-9 w-9 grid place-items-center rounded-md border border-[#1a2431] text-[#8a97a8] hover:text-[#22d3ee] hover:border-[#22d3ee]/50 transition"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="h-9 w-9 grid place-items-center rounded-md border border-[#1a2431] text-[#8a97a8] hover:text-[#22d3ee] hover:border-[#22d3ee]/50 transition"
          >
            <Github size={16} />
          </a>
          <button
            onClick={downloadResume}
            className="h-9 pl-3 pr-3.5 flex items-center gap-2 rounded-md bg-[#22d3ee] text-[#05070a] font-mono text-[11px] tracking-[0.14em] uppercase font-semibold hover:bg-[#38bdf8] transition"
          >
            <Download size={14} /> Resume
          </button>
        </div>

        <button
          className="lg:hidden h-9 w-9 grid place-items-center rounded-md border border-[#1a2431] text-[#e6edf5]"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#1a2431] bg-[#05070a]/95 backdrop-blur">
          <nav className="px-5 py-4 grid grid-cols-2 gap-2">
            {NAV.map((n, i) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`text-left px-3 py-2 rounded-md border font-mono text-[12px] tracking-[0.14em] uppercase ${
                  active === n.id
                    ? "border-[#22d3ee]/50 text-[#22d3ee] bg-[#22d3ee]/5"
                    : "border-[#1a2431] text-[#8a97a8]"
                }`}
              >
                <span className="text-[#55657a] mr-1">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </button>
            ))}
          </nav>
          <div className="px-5 pb-4 flex items-center gap-2">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="flex-1 h-10 grid place-items-center rounded-md border border-[#1a2431] text-[#8a97a8]"><Linkedin size={14} /></a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="flex-1 h-10 grid place-items-center rounded-md border border-[#1a2431] text-[#8a97a8]"><Github size={14} /></a>
            <button onClick={() => { setOpen(false); downloadResume(); }} className="flex-[2] h-10 grid place-items-center rounded-md bg-[#22d3ee] text-[#05070a] font-mono text-[11px] font-semibold"><Download size={14} className="inline mr-2" />Resume</button>
          </div>
        </div>
      )}
    </header>
  );
}
