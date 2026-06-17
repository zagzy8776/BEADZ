import { motion } from "motion/react";
import { UtensilsCrossed, Sparkles, Heart, Phone } from "lucide-react";

export function CateringServices({ onContact }: { onContact: () => void }) {
  return (
    <section id="services" style={{ background: "#080808", padding: "120px clamp(24px, 6vw, 96px)" }}>
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
            Premium Services
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
            Catering & <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Decoration</em>
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
            Transform your special occasions with our exquisite catering and decoration services. From traditional weddings to corporate events, we bring elegance and flavor to every celebration.
          </p>
          <button
            onClick={onContact}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#f0ede8",
              background: "transparent",
              border: "1px solid rgba(201,168,76,0.4)",
              padding: "14px 40px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            className="hover:border-[#C9A84C] hover:bg-[rgba(201,168,76,0.06)]"
          >
            Book a Consultation
          </button>
        </motion.div>

        {/* Services Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 2,
          marginBottom: 80,
        }}>
          {/* Catering */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: "#0f0f0f",
              padding: "64px 48px",
              border: "1px solid rgba(201,168,76,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
              <UtensilsCrossed size={24} color="#C9A84C" strokeWidth={1.5} />
            </div>
            <h3 style={{
              fontFamily: "'Cormorant', serif",
              fontWeight: 400,
              fontSize: "1.8rem",
              color: "#f0ede8",
              marginBottom: 20,
              lineHeight: 1.2,
            }}>
              Exquisite Catering
            </h3>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "0.85rem",
              lineHeight: 1.9,
              color: "rgba(240,237,232,0.45)",
              marginBottom: 32,
            }}>
              From traditional Igbo delicacies to international cuisine, our expert chefs create memorable dining experiences. We source the finest ingredients and prepare each dish with passion and precision.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Traditional & contemporary menus",
                "Professional service staff",
                "Custom menu planning",
                "Dietary accommodations available",
              ].map((item) => (
                <li key={item} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 14,
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A84C", flexShrink: 0, marginTop: 6 }} />
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: "rgba(240,237,232,0.5)",
                    lineHeight: 1.5,
                  }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Decoration */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: "#0f0f0f",
              padding: "64px 48px",
              border: "1px solid rgba(201,168,76,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
              <Sparkles size={24} color="#C9A84C" strokeWidth={1.5} />
            </div>
            <h3 style={{
              fontFamily: "'Cormorant', serif",
              fontWeight: 400,
              fontSize: "1.8rem",
              color: "#f0ede8",
              marginBottom: 20,
              lineHeight: 1.2,
            }}>
              Luxury Decoration
            </h3>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "0.85rem",
              lineHeight: 1.9,
              color: "rgba(240,237,232,0.45)",
              marginBottom: 32,
            }}>
              Our creative team designs stunning, culturally-rich environments that reflect your vision. From intimate gatherings to grand celebrations, we transform spaces into unforgettable experiences.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Custom thematic designs",
                "Floral arrangements & centerpieces",
                "Lighting & ambiance creation",
                "Traditional & modern aesthetics",
              ].map((item) => (
                <li key={item} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 14,
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A84C", flexShrink: 0, marginTop: 6 }} />
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: "rgba(240,237,232,0.5)",
                    lineHeight: 1.5,
                  }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Events We Serve */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: "rgba(201,168,76,0.03)",
            border: "1px solid rgba(201,168,76,0.08)",
            padding: "64px clamp(24px, 5vw, 64px)",
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
            marginBottom: 32,
          }}>
            Perfect For Every Occasion
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 24,
            maxWidth: 900,
            margin: "0 auto",
          }}>
            {[
              { icon: Heart, label: "Traditional Weddings" },
              { icon: Sparkles, label: "Corporate Events" },
              { icon: UtensilsCrossed, label: "Birthday Celebrations" },
              { icon: Heart, label: "Anniversary Parties" },
            ].map((item, idx) => (
              <div key={idx} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(201,168,76,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <item.icon size={18} color="#C9A84C" strokeWidth={1.5} />
                </div>
                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(240,237,232,0.5)",
                }}>{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            marginTop: 80,
            padding: "48px 24px",
            border: "1px solid rgba(201,168,76,0.15)",
            background: "linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 100%)",
          }}
        >
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontWeight: 300,
            fontSize: "1.5rem",
            color: "#f0ede8",
            marginBottom: 16,
            lineHeight: 1.3,
          }}>
            Let us make your next event unforgettable
          </p>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: "0.8rem",
            color: "rgba(240,237,232,0.4)",
            marginBottom: 32,
          }}>
            Contact us today for a personalized consultation and quote
          </p>
          <button
            onClick={onContact}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
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
            <Phone size={14} strokeWidth={1.5} />
            Contact Us Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}