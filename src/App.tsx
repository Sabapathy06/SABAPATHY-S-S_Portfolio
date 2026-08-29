import InteractiveBackground from "./components/InteractiveBackground";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Education from "./components/Education";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen text-[#e6edf5]">
      <InteractiveBackground />

      {/* Top vignette + subtle grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]">
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Education />
          <Contact />
        </main>
      </div>
    </div>
  );
}
