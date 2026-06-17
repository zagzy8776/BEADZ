import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

const bases = [
  { id: "s1", name: "Single Strand", sub: "Classic · 18-inch", price: 38500, img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=300&h=300&fit=crop&auto=format" },
  { id: "s3", name: "Three Strand", sub: "Layered · Royal Grade", price: 95000, img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=300&h=300&fit=crop&auto=format" },
  { id: "s5", name: "Five Strand", sub: "Bridal · Premium", price: 185000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&auto=format" },
];

const extras = [
  { id: "crown", name: "Coral Crown", sub: "Royal tiara", price: 145000 },
  { id: "waist", name: "Waist Beads", sub: "3-strand traditional", price: 28000 },
  { id: "wrist", name: "Wrist Beads", sub: "Matching set", price: 22000 },
  { id: "nza", name: "Nza Staff", sub: "Ceremonial", price: 195000 },
  { id: "ankle", name: "Ankle Beads", sub: "Coral pair", price: 18500 },
  { id: "ears", name: "Coral Earrings", sub: "Drop · Handcrafted", price: 32000 },
];

interface BeadBuilderProps {
  onOrder: (summary: string, total: number) => void;
}

export function BeadBuilder({ onOrder }: BeadBuilderProps) {
  const [base, setBase] = useState("s3");
  const [selected, setSelected] = useState<string[]>([]);
  const [neck, setNeck] = useState("");
  const [wrist, setWrist] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const baseItem = bases.find((b) => b.id === base)!;
  const addons = extras.filter((e) => selected.includes(e.id));
  const total = baseItem.price + addons.reduce((s, a) => s + a.price, 0);

  const toggle = (id: string) =>
    setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const handleOrder = () => {
    const lines = [
      `Base: ${baseItem.name} — ₦${baseItem.price.toLocaleString()}`,
      ...addons.map((a) => `${a.name} — ₦${a.price.toLocaleString()}`),
      neck && `Neck: ${neck}cm`,
      wrist && `Wrist: ${wrist}cm`,
      `\nTotal: ₦${total.toLocaleString()}`,
    ].filter(Boolean).join("\n");
    onOrder(lines, total);
  };

  const stepLabel = ["Base Piece", "Accessories", "Measurements"];

  return (
    <section id="atelier" style={{ background: "#0a0a0a", padding: "120px clamp(24px, 6vw, 96px)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Responsive step labels */}
        <style>{`@media (max-width: 480px) { .step-label { display: none !important; } }`}</style>

        {/* Heading */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ width: 1, height: 56, background: "linear-gradient(to bottom, transparent, #C9A84C)", margin: "0 auto 32px" }} />
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.55rem", letterSpacing: "0.55em", textTransform: "uppercase", color: "#C9A84C", textAlign: "center", marginBottom: 20 }}>
            Bespoke Atelier
          </p>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#f0ede8", textAlign: "center", lineHeight: 1, letterSpacing: "-0.01em" }}>
            Compose Your <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Set</em>
          </h2>
        </div>

        {/* Step pills */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0, marginBottom: 64 }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => setStep(s as 1 | 2 | 3)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "transparent", border: "none", cursor: "pointer", padding: "0 4px",
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: step >= s ? "#C9A84C" : "transparent",
                  border: step >= s ? "none" : "1px solid rgba(201,168,76,0.3)",
                  transition: "all 0.4s",
                }}>
                  {step > s
                    ? <Check size={12} color="#080808" />
                    : <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: step === s ? "#080808" : "rgba(201,168,76,0.5)" }}>{s}</span>
                  }
                </div>
                <span className="step-label" style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.55rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: step >= s ? "#C9A84C" : "rgba(201,168,76,0.3)",
                  transition: "color 0.4s",
                }}>
                  {stepLabel[i]}
                </span>
              </button>
              {i < 2 && (
                <div style={{ width: 40, height: 1, background: step > s ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.12)", margin: "0 8px", transition: "background 0.4s" }} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* Step 1 */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2, marginBottom: 40 }}>
                {bases.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBase(b.id)}
                    style={{
                      background: "transparent",
                      border: base === b.id ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.1)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "border-color 0.3s",
                      position: "relative",
                    }}
                  >
                    <div style={{ aspectRatio: "4/3", background: "#111", overflow: "hidden" }}>
                      <img src={b.img} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)", transition: "filter 0.4s" }} />
                    </div>
                    <div style={{ padding: "16px 18px" }}>
                      <p style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, fontSize: "1rem", color: "#f0ede8", marginBottom: 4 }}>{b.name}</p>
                      <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(240,237,232,0.3)", textTransform: "uppercase", marginBottom: 10 }}>{b.sub}</p>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300, fontSize: "0.72rem", color: "#C9A84C" }}>₦{b.price.toLocaleString()}</p>
                    </div>
                    {base === b.id && (
                      <div style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, background: "#C9A84C", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={10} color="#080808" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setStep(2)} style={ctaStyle}>Next — Accessories</button>
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 2, marginBottom: 32 }}>
                {extras.map((e) => {
                  const on = selected.includes(e.id);
                  return (
                    <button
                      key={e.id}
                      onClick={() => toggle(e.id)}
                      style={{
                        background: on ? "rgba(201,168,76,0.06)" : "transparent",
                        border: on ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.1)",
                        cursor: "pointer",
                        padding: "20px",
                        textAlign: "left",
                        transition: "all 0.25s",
                        position: "relative",
                      }}
                    >
                      <p style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, fontSize: "1rem", color: "#f0ede8", marginBottom: 4 }}>{e.name}</p>
                      <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,237,232,0.3)", textTransform: "uppercase", marginBottom: 10 }}>{e.sub}</p>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300, fontSize: "0.7rem", color: "#C9A84C" }}>+ ₦{e.price.toLocaleString()}</p>
                      {on && (
                        <div style={{ position: "absolute", top: 10, right: 10, width: 18, height: 18, background: "#C9A84C", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Check size={9} color="#080808" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Running total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)", marginBottom: 32 }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.3)" }}>Running Total</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 400, fontSize: "1rem", color: "#C9A84C" }}>₦{total.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => setStep(1)} style={backStyle}>Back</button>
                <button onClick={() => setStep(3)} style={ctaStyle}>Next — Measurements</button>
              </div>
            </motion.div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <div style={{ maxWidth: 480, margin: "0 auto" }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.3)", textAlign: "center", marginBottom: 40 }}>
                  Optional · Provide in centimetres for a perfect fit
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 40 }}>
                  {[{ label: "Neck Size", val: neck, set: setNeck, ph: "e.g. 36" }, { label: "Wrist Size", val: wrist, set: setWrist, ph: "e.g. 16" }].map((f) => (
                    <div key={f.label}>
                      <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(240,237,232,0.3)", marginBottom: 10 }}>{f.label}</p>
                      <input
                        type="number"
                        placeholder={f.ph}
                        value={f.val}
                        onChange={(e) => f.set(e.target.value)}
                        style={{
                          width: "100%", padding: "12px 16px",
                          background: "#111",
                          border: "1px solid rgba(201,168,76,0.15)",
                          color: "#f0ede8",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.9rem",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div style={{ padding: "24px", border: "1px solid rgba(201,168,76,0.12)", marginBottom: 32, background: "rgba(201,168,76,0.02)" }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 20 }}>Order Summary</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Cormorant', serif", fontSize: "0.95rem", color: "rgba(240,237,232,0.6)" }}>{baseItem.name}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "rgba(240,237,232,0.5)" }}>₦{baseItem.price.toLocaleString()}</span>
                    </div>
                    {addons.map((a) => (
                      <div key={a.id} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'Cormorant', serif", fontSize: "0.95rem", color: "rgba(240,237,232,0.6)" }}>{a.name}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "rgba(240,237,232,0.5)" }}>₦{a.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, marginTop: 16, borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f0ede8" }}>Total</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 400, fontSize: "1.1rem", color: "#C9A84C" }}>₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 2 }}>
                  <button onClick={() => setStep(2)} style={{ ...backStyle, flexShrink: 0 }}>Back</button>
                  <button
                    onClick={handleOrder}
                    style={{
                      flex: 1,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 400,
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#fff",
                      background: "#25D366",
                      border: "none",
                      padding: "16px 24px",
                      cursor: "pointer",
                    }}
                  >
                    <WhatsAppIcon />
                    Complete via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

const ctaStyle: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontWeight: 400,
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "#080808",
  background: "#C9A84C",
  border: "none",
  padding: "13px 32px",
  cursor: "pointer",
};

const backStyle: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontWeight: 300,
  fontSize: "0.6rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "rgba(240,237,232,0.4)",
  background: "transparent",
  border: "1px solid rgba(240,237,232,0.1)",
  padding: "13px 24px",
  cursor: "pointer",
};

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
