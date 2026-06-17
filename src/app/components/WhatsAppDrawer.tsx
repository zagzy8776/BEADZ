import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
}

interface WhatsAppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  customSummary?: string;
  customTotal?: number;
}

const WA = "2348012345678";

export function WhatsAppDrawer({ isOpen, onClose, cartItems, customSummary, customTotal }: WhatsAppDrawerProps) {
  const cartTotal = cartItems.reduce((s, i) => s + i.price, 0);
  const total = customTotal ?? cartTotal;
  const isCustom = !!customSummary;

  const send = () => {
    let msg = "";
    if (isCustom && customSummary) {
      msg = `Hello, I'd like to place a custom order:\n\n${customSummary}`;
    } else {
      const lines = cartItems.map((i) => `• ${i.name} — ₦${i.price.toLocaleString()}`).join("\n");
      msg = `Hello, I'd like to order:\n\n${lines}\n\nTotal: ₦${total.toLocaleString()}\n\nPlease confirm availability.`;
    }
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
          />
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            style={{
              position: "fixed", right: 0, top: 0, bottom: 0, zIndex: 70,
              width: "min(440px, 100vw)",
              background: "#080808",
              borderLeft: "1px solid rgba(201,168,76,0.1)",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "32px 32px 24px", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 10 }}>
                  {isCustom ? "Bespoke Order" : "Your Selection"}
                </p>
                <h3 style={{ fontFamily: "'Cormorant', serif", fontWeight: 300, fontSize: "1.8rem", color: "#f0ede8", letterSpacing: "-0.01em", lineHeight: 1 }}>
                  Order Summary
                </h3>
              </div>
              <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, marginTop: 4 }}>
                <X size={16} color="rgba(240,237,232,0.4)" strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
              {isCustom && customSummary ? (
                <pre style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "rgba(240,237,232,0.6)", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                  {customSummary}
                </pre>
              ) : cartItems.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
                  <p style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", color: "rgba(240,237,232,0.25)", fontSize: "1.2rem" }}>Your bag is empty</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(240,237,232,0.2)", textAlign: "center" }}>
                    Add pieces from the collection to begin your order.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid rgba(201,168,76,0.06)" }}>
                      <div style={{ width: 56, height: 56, background: "#111", flexShrink: 0, overflow: "hidden" }}>
                        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, fontSize: "0.95rem", color: "#f0ede8", marginBottom: 2 }}>{item.name}</p>
                        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,237,232,0.3)" }}>{item.subtitle}</p>
                      </div>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300, fontSize: "0.72rem", color: "rgba(240,237,232,0.5)", flexShrink: 0 }}>₦{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: "24px 32px 32px", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.3)" }}>
                  Total
                </span>
                <span style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, fontSize: "2rem", color: "#f0ede8", letterSpacing: "-0.01em" }}>
                  ₦{total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={send}
                disabled={!isCustom && cartItems.length === 0}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "#25D366",
                  border: "none",
                  padding: "18px",
                  cursor: "pointer",
                  opacity: !isCustom && cartItems.length === 0 ? 0.3 : 1,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Complete Order via WhatsApp
              </button>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(240,237,232,0.2)", textAlign: "center", marginTop: 16, lineHeight: 1.8 }}>
                You'll be connected directly to confirm availability,<br />payment, and delivery.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
