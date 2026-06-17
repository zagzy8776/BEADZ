import { motion } from "motion/react";

export function About() {
  return (
    <section id="heritage" style={{ background: "#f0ede8", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "80vh" }}>
        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          style={{ position: "relative", background: "#1a1a1a" }}
        >
          <img
            src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=900&fit=crop&auto=format"
            alt="Evangel Collectibles cultural heritage"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.8) contrast(1.05)" }}
          />
          {/* Gold counter card */}
          <div
            style={{
              position: "absolute", bottom: 48, right: -24,
              background: "#080808",
              padding: "28px 32px",
              border: "1px solid rgba(201,168,76,0.15)",
              minWidth: 160,
            }}
          >
            <p style={{ fontFamily: "'Cormorant', serif", fontWeight: 300, fontSize: "3rem", color: "#C9A84C", lineHeight: 1, marginBottom: 6 }}>30</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(240,237,232,0.4)" }}>Years of Heritage</p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "80px clamp(32px, 5vw, 80px)",
            background: "#f0ede8",
          }}
        >
          <div style={{ width: 40, height: 1, background: "#C9A84C", marginBottom: 32 }} />
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.55rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 24 }}>
            Evangel Collectibles
          </p>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 300, fontSize: "clamp(2.2rem, 4vw, 3.8rem)", color: "#080808", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 32 }}>
            Where Culture<br>Becomes <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Experience</em>
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 2, color: "rgba(8,8,8,0.6)", marginBottom: 20, maxWidth: 420 }}>
            For over three decades, Evangel Collectibles has been Owerri's premier destination for authentic Igbo cultural heritage. We specialize in authentic coral beadwork, ceremonial regalia, traditional costumes, and now complete event solutions with catering and decoration services.
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 2, color: "rgba(8,8,8,0.6)", marginBottom: 48, maxWidth: 420 }}>
            From bespoke bridal sets to chieftaincy regalia, cultural day rentals to career event attire — every piece is crafted with reverence for tradition and an eye for modern elegance.
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, paddingTop: 40, borderTop: "1px solid rgba(8,8,8,0.1)" }}>
            {[["2,400+", "Pieces Sold"], ["100%", "Authentic"], ["Owerri", "Heritage"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, fontSize: "1.8rem", color: "#080808", lineHeight: 1, marginBottom: 6 }}>{val}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(8,8,8,0.4)" }}>{lbl}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #heritage > div { grid-template-columns: 1fr !important; }
          #heritage img { max-height: 50vh; }
        }
      `}</style>
    </section>
  );
}