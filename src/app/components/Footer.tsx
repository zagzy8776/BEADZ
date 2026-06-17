import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" style={{ background: "#050505", borderTop: "1px solid rgba(201,168,76,0.06)" }}>
      {/* Thin gold rule */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, #C9A84C 40%, #C9A84C 60%, transparent 100%)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px clamp(24px, 6vw, 96px) 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "clamp(32px, 5vw, 80px)", marginBottom: 64 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <img
                src="/evangel.jpeg"
                alt="Evangel Collectibles Logo"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid rgba(201,168,76,0.3)",
                }}
              />
              <p style={{ fontFamily: "'Cormorant', serif", fontWeight: 300, fontSize: "1.4rem", letterSpacing: "0.08em", color: "#f0ede8", textTransform: "uppercase", lineHeight: 1 }}>Evangel</p>
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.5rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase", marginBottom: 24 }}>Collectibles · Owerri · Est. 1994</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.8rem", lineHeight: 1.9, color: "rgba(240,237,232,0.3)", maxWidth: 320 }}>
              Authentic Igbo coral beadwork, ceremonial regalia, traditional costumes, catering and decoration services — celebrating culture with pride and elegance.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.5rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: 24 }}>Explore</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {["Bridal Sets", "Chieftaincy", "Rentals", "Catering", "Decoration"].map((l) => (
                <a key={l} href="#collection" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "rgba(240,237,232,0.3)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
                  className="hover:text-white">{l}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.5rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: 24 }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <MapPin size={13} color="rgba(201,168,76,0.5)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "rgba(240,237,232,0.3)", lineHeight: 1.7 }}>14 Wetheral Road<br />Owerri, Imo State</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Phone size={13} color="rgba(201,168,76,0.5)" strokeWidth={1.5} />
                <a href="tel:+2348012345678" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "rgba(240,237,232,0.3)", textDecoration: "none" }}>+234 801 234 5678</a>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Mail size={13} color="rgba(201,168,76,0.5)" strokeWidth={1.5} />
                <a href="mailto:info@evangelcollectibles.com" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "rgba(240,237,232,0.3)", textDecoration: "none" }}>info@evangelcollectibles.com</a>
              </div>
            </div>
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                marginTop: 24,
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: "0.58rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#fff",
                background: "#25D366",
                padding: "10px 20px",
                textDecoration: "none",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 32, borderTop: "1px solid rgba(201,168,76,0.06)" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.58rem", letterSpacing: "0.15em", color: "rgba(240,237,232,0.15)" }}>
            © 2026 Evangel Collectibles Beads and Costumes
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.1)" }}>
            Authentic Igbo Heritage · Owerri
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}