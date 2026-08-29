import { jsPDF } from "jspdf";

/**
 * Generates and downloads a well-formatted resume PDF for Sabapathy S S.
 * All content is drawn directly with jsPDF — no external assets required.
 */
export function downloadResume() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const PAGE_W = doc.internal.pageSize.getWidth();
  const PAGE_H = doc.internal.pageSize.getHeight();
  const MARGIN = 48;
  const CONTENT_W = PAGE_W - MARGIN * 2;

  // Palette (subtle print-friendly, not the neon web palette)
  const INK = [17, 24, 33] as const;
  const DIM = [90, 100, 115] as const;
  const MUTE = [140, 148, 160] as const;
  const ACCENT = [8, 130, 155] as const;
  const RULE = [220, 226, 232] as const;

  let y = MARGIN;

  const setColor = (c: readonly [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
  const setDraw = (c: readonly [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const drawRule = () => {
    setDraw(RULE);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  };

  const sectionTitle = (label: string) => {
    ensureSpace(38);
    y += 14;
    setColor(ACCENT);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(label.toUpperCase(), MARGIN, y);
    y += 6;
    drawRule();
    y += 14;
  };

  const paragraph = (text: string, size = 10, color: readonly [number, number, number] = INK) => {
    setColor(color);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, CONTENT_W);
    ensureSpace(lines.length * (size + 3));
    doc.text(lines, MARGIN, y);
    y += lines.length * (size + 3);
  };

  const bullet = (text: string) => {
    setColor(INK);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, CONTENT_W - 16);
    ensureSpace(lines.length * 13 + 2);
    // dot
    setDraw(ACCENT);
    doc.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]);
    doc.circle(MARGIN + 4, y - 3, 1.6, "F");
    doc.text(lines, MARGIN + 14, y);
    y += lines.length * 13 + 2;
  };

  const kvRow = (label: string, value: string) => {
    ensureSpace(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    setColor(DIM);
    doc.text(label.toUpperCase(), MARGIN, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setColor(INK);
    doc.text(value, MARGIN + 96, y);
    y += 14;
  };

  // ---------- HEADER ----------
  setColor(INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("SABAPATHY S S", MARGIN, y + 6);

  setColor(ACCENT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("ASPIRING FULL STACK DEVELOPER", MARGIN, y + 26);

  setColor(DIM);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text(
    "Building Software. Connecting Systems. Exploring Hardware.",
    MARGIN,
    y + 42
  );

  // Contact block on right
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  setColor(INK);
  const contactLines = [
    "sabapathysiva2006@gmail.com",
    "+91 7010083407",
    "Coimbatore, Tamil Nadu, India",
    "linkedin.com/in/sabapathy-s-s-130516315",
  ];
  contactLines.forEach((line, i) => {
    doc.text(line, PAGE_W - MARGIN, y + 4 + i * 12, { align: "right" });
  });

  y += 60;
  drawRule();
  y += 4;

  // ---------- SUMMARY ----------
  sectionTitle("Summary");
  paragraph(
    "Pre-final-year B.E. Computer Science student building software applications and integrated systems across web, mobile, AI, databases and robotics. Comfortable working across the full stack — from user interfaces to embedded hardware."
  );

  // ---------- SKILLS ----------
  sectionTitle("Skills");
  const skills: Array<[string, string]> = [
    ["Programming", "C, C++, Java, Python, SQL"],
    ["Web", "HTML, CSS"],
    ["Core", "DSA, OOP, DBMS"],
    ["Android / AI", "Kotlin, Jetpack Compose, Android Studio, Gemini API, Google ML Kit"],
    ["Data", "SQLite, Room Database"],
    ["Hardware", "Arduino, ESP32-CAM"],
    ["Tools", "GitHub, VS Code, HackerRank"],
  ];
  skills.forEach(([k, v]) => kvRow(k, v));

  // ---------- PROJECTS ----------
  sectionTitle("Projects");

  // Project 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  setColor(INK);
  ensureSpace(18);
  doc.text("MedCare — AI-Powered Medication Management App", MARGIN, y);
  y += 14;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9.5);
  setColor(MUTE);
  doc.text("Kotlin · Jetpack Compose · Gemini API · Google ML Kit · Room Database", MARGIN, y);
  y += 12;
  paragraph(
    "AI-powered Android application for medication management with OCR, API integration and local data persistence."
  );
  bullet("Medicine-package scanning with on-device OCR.");
  bullet("Prescription assistance powered by Gemini API.");
  bullet("Local data persistence with Room Database.");
  bullet("Reliability and performance improvements across the app.");

  y += 6;

  // Project 2
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  setColor(INK);
  ensureSpace(18);
  doc.text("Autonomous Search and Detect Rover", MARGIN, y);
  y += 14;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9.5);
  setColor(MUTE);
  doc.text(
    "Python · HTML · CSS · SQLite · Arduino · ESP32-CAM · Ultrasonic Sensors",
    MARGIN,
    y
  );
  y += 12;
  paragraph(
    "Six-wheel search and detection rover combining a web application, Python backend, database and embedded hardware to support rescue operations."
  );
  bullet("Web interface for control and monitoring.");
  bullet("Python backend coordinating communication with the rover.");
  bullet("Six-wheel drive platform for varied terrain.");
  bullet("Ultrasonic distance sensing with ESP32-CAM live view.");

  // ---------- EXPERIENCE ----------
  sectionTitle("Experience");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  setColor(INK);
  ensureSpace(16);
  doc.text("Technical Intern", MARGIN, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setColor(DIM);
  doc.text("Signals and Telecommunication Workshop — Podanur, Coimbatore", PAGE_W - MARGIN, y, {
    align: "right",
  });
  y += 14;
  bullet("Built a web-based material and requirements collection system.");
  bullet("Organized requirements into a structured, centralized interface.");
  bullet("Gained exposure to railway signalling workflows.");
  bullet("Gained exposure to telecommunication systems.");

  // ---------- ACHIEVEMENTS ----------
  sectionTitle("Achievements");
  bullet("National-Level Biothon 2026 — Team Finalist (Search and Detect Rover).");
  bullet("Smart India Hackathon 2025 — Selected (Hardware Category).");

  // ---------- CERTIFICATIONS ----------
  sectionTitle("Certifications");
  bullet("Data Structures in C (Hands-On) — SkillRack, September 2025.");
  bullet("BEC Exam Certification — B1 Grade.");
  bullet("MATLAB Certification.");

  // ---------- EDUCATION ----------
  sectionTitle("Education");

  const eduRow = (title: string, school: string, period: string, result: string) => {
    ensureSpace(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(INK);
    doc.text(title, MARGIN, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setColor(DIM);
    doc.text(period, PAGE_W - MARGIN, y, { align: "right" });
    y += 13;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setColor(INK);
    doc.text(school, MARGIN, y);
    setColor(ACCENT);
    doc.setFont("helvetica", "bold");
    doc.text(result, PAGE_W - MARGIN, y, { align: "right" });
    y += 16;
  };

  eduRow(
    "B.E. Computer Science & Engineering",
    "Sri Ramakrishna Institute of Technology",
    "2024 — 2028",
    "CGPA 7.52"
  );
  eduRow(
    "Higher Secondary (HSC)",
    "Sri Saraswathi Ramachandran Vidyalaya Hr. Sec. School",
    "2023 — 2024",
    "75.5%"
  );
  eduRow(
    "Secondary (SSLC)",
    "Gurukulam High School",
    "2021 — 2022",
    "78.8%"
  );

  // ---------- FOOTER ----------
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    setColor(MUTE);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      `Sabapathy S S · Resume · Page ${i} of ${pageCount}`,
      PAGE_W / 2,
      PAGE_H - 20,
      { align: "center" }
    );
  }

  doc.save("Sabapathy-S-S-Resume.pdf");
}
