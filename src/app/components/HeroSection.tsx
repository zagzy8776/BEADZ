import { motion } from "motion/react";

export function HeroSection({ onShop, onBuild }: { onShop: () => void; onBuild: () => void }) {
  return (
    <section style={{ height: "100svh", background: "#080808", position: "relative", overflow: "hidden" }}>
      {/* Full-bleed split layout */}
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* Left: dark panel */}
        <div style={{ background: "#080808" }} />
        {/* Right: image */}
        <div style={{ position: "relative", background: "#0f0f0f" }}>
          <img
            src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=900&h=1200&fit=crop&auto=format&q=90"
            alt="Authentic Igbo cultural heritage"
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: "brightness(0.62) saturate(1.1) contrast(1.05)",
            }}
          />
          {/* Vertical gold line at seam */}
          <div style={{
            position: "absolute", left: 0, top: "10%", bottom: "10%",
            width: 1, background: "linear-gradient(to bottom, transparent, #C9A84C 30%, #C9A84C 70%, transparent)",
          }} />
        </div>
      </div>

      {/* Responsive: on mobile, show full image */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-image-panel { grid-column: 1 !important; }
          .hero-image-panel img { opacity: 0.38 !important; }
        }
      `}</style>

      {/* Content overlay */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "clamp(24px, 6vw, 96px)",
          paddingRight: "clamp(24px, 6vw, 96px)",
          maxWidth: 680,
        }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 1, width: 48,
            background: "#C9A84C",
            marginBottom: 32,
            transformOrigin: "left",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: "0.6rem",
            letterSpacing: "0.5em",
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Owerri · Imo State · Nigeria
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant', serif",
            fontWeight: 300,
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            lineHeight: 1.05,
            color: "#f0ede8",
            letterSpacing: "-0.01em",
            marginBottom: 16,
          }}
        >
          Heritage in Every<br />
          <em style={{ fontWeight: 400, fontStyle: "italic", color: "#C9A84C" }}>Thread</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: "0.82rem",
            lineHeight: 1.9,
            color: "rgba(240,237,232,0.45)",
            maxWidth: 400,
            marginBottom: 48,
            letterSpacing: "0.04em",
          }}
        >
          Premium sales and rentals of authentic cultural attire, bespoke coral beadwork, and ceremonial regalia for adults and kids. Catering and decoration services available.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <button
            onClick={onShop}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#080808",
              background: "#C9A84C",
              border: "none",
              padding: "14px 36px",
              cursor: "pointer",
              transition: "opacity 0.3s",
            }}
            className="hover:opacity-80"
          >
            Shop Collections
          </button>
          <button
            onClick={onBuild}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#f0ede8",
              background: "transparent",
              border: "1px solid rgba(240,237,232,0.2)",
              padding: "14px 36px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            className="hover:border-white"
          >
            Book a Rental
          </button>
        </motion.div>
      </div>

      {/* Bottom meta bar */}
      <div
        style={{
          position: "absolute", bottom: 32, left: 0, right: 0,
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          padding: "0 clamp(24px, 6vw, 96px)",
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 300,
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "rgba(240,237,232,0.2)",
            textTransform: "uppercase",
          }}
        >
          Est. 1994
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.4))" }} />
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: "0.5rem",
            letterSpacing: "0.4em",
            color: "rgba(201,168,76,0.4)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}>Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}