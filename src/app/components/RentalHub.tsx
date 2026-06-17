import { motion } from "motion/react";
import { Check, Calendar, Users, Shirt } from "lucide-react";

export function RentalHub({ onBrowse }: { onBrowse: () => void }) {
  return (
    <section id="rentals" style={{ background: "#1A1A1A", padding: "120px clamp(24px, 6vw, 96px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <div style={{ width: 1, height: 56, background: "linear-gradient(to bottom, transparent, #C9A84C)", margin: "0 auto 32px" }} />
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: "0.55rem",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: 20,
          }}>
            Rental Services
          </p>
          <h2 style={{
            fontFamily: "'Cormorant', serif",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            color: "#f0ede8",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: 24,
          }}>
            Dress to <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Inspire</em>
          </h2>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: "0.9rem",
            lineHeight: 1.9,
            color: "rgba(240,237,232,0.5)",
            maxWidth: 600,
            margin: "0 auto 48px",
          }}>
            Make an impression without the full commitment of buying. We provide perfectly sized, authentic traditional attire and career costumes for both adults and children.
          </p>
          <button
            onClick={onBrowse}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#080808",
              background: "#C9A84C",
              border: "none",
              padding: "14px 40px",
              cursor: "pointer",
              transition: "opacity 0.3s",
            }}
            className="hover:opacity-80"
          >
            Browse Rental Catalog
          </button>
        </motion.div>

        {/* Features Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 2,
          marginBottom: 80,
        }}>
          {/* School Cultural Days */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: "#121212",
              padding: "48px 36px",
              border: "1px solid rgba(201,168,76,0.08)",
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <Users size={20} color="#C9A84C" strokeWidth={1.5} />
            </div>
            <h3 style={{
              fontFamily: "'Cormorant', serif",
              fontWeight: 400,
              fontSize: "1.5rem",
              color: "#f0ede8",
              marginBottom: 16,
              lineHeight: 1.2,
            }}>
              School Cultural Days
            </h3>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "0.82rem",
              lineHeight: 1.8,
              color: "rgba(240,237,232,0.45)",
              marginBottom: 24,
            }}>
              Complete, stress-free traditional packages for kids. From pre-school to secondary school cultural events.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Age-appropriate traditional attire",
                "Complete accessories included",
                "Hassle-free returns",
              ].map((item) => (
                <li key={item} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 12,
                }}>
                  <Check size={14} color="#C9A84C" strokeWidth={2} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.78rem",
                    color: "rgba(240,237,232,0.4)",
                    lineHeight: 1.5,
                  }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Adult Career & Media Events */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: "#121212",
              padding: "48px 36px",
              border: "1px solid rgba(201,168,76,0.08)",
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <Shirt size={20} color="#C9A84C" strokeWidth={1.5} />
            </div>
            <h3 style={{
              fontFamily: "'Cormorant', serif",
              fontWeight: 400,
              fontSize: "1.5rem",
              color: "#f0ede8",
              marginBottom: 16,
              lineHeight: 1.2,
            }}>
              Career & Media Events
            </h3>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "0.82rem",
              lineHeight: 1.8,
              color: "rgba(240,237,232,0.45)",
              marginBottom: 24,
            }}>
              Stand out in premium, high-quality historical or cultural wear for presentations, media appearances, and corporate events.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Premium quality traditional wear",
                "Professional styling consultation",
                "Perfect fit guaranteed",
              ].map((item) => (
                <li key={item} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 12,
                }}>
                  <Check size={14} color="#C9A84C" strokeWidth={2} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.78rem",
                    color: "rgba(240,237,232,0.4)",
                    lineHeight: 1.5,
                  }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Flexible Booking */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: "#121212",
              padding: "48px 36px",
              border: "1px solid rgba(201,168,76,0.08)",
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <Calendar size={20} color="#C9A84C" strokeWidth={1.5} />
            </div>
            <h3 style={{
              fontFamily: "'Cormorant', serif",
              fontWeight: 400,
              fontSize: "1.5rem",
              color: "#f0ede8",
              marginBottom: 16,
              lineHeight: 1.2,
            }}>
              Flexible Booking
            </h3>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "0.82rem",
              lineHeight: 1.8,
              color: "rgba(240,237,232,0.45)",
              marginBottom: 24,
            }}>
              Cleaned, pressed, and ready to wear with hassle-free returns. Book in advance for peak seasons.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Professional dry cleaning included",
                "Flexible pickup and return",
                "Extension options available",
              ].map((item) => (
                <li key={item} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 12,
                }}>
                  <Check size={14} color="#C9A84C" strokeWidth={2} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.78rem",
                    color: "rgba(240,237,232,0.4)",
                    lineHeight: 1.5,
                  }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Rental Process */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: "rgba(201,168,76,0.03)",
            border: "1px solid rgba(201,168,76,0.08)",
            padding: "48px clamp(24px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: "0.55rem",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: 24,
          }}>
            How It Works
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 32,
            maxWidth: 900,
            margin: "0 auto",
          }}>
            {[
              { step: "01", title: "Browse", desc: "Explore our rental catalog" },
              { step: "02", title: "Reserve", desc: "Book your preferred items" },
              { step: "03", title: "Fit", desc: "Get measured for perfect fit" },
              { step: "04", title: "Wear", desc: "Pick up and enjoy your event" },
            ].map((item) => (
              <div key={item.step}>
                <p style={{
                  fontFamily: "'Cormorant', serif",
                  fontWeight: 400,
                  fontSize: "2.5rem",
                  color: "rgba(201,168,76,0.3)",
                  lineHeight: 1,
                  marginBottom: 12,
                }}>{item.step}</p>
                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  color: "#f0ede8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}>{item.title}</p>
                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  color: "rgba(240,237,232,0.4)",
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}