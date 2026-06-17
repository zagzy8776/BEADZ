import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  onBeadBuilder: () => void;
}

export function Navbar({ cartCount, onCartOpen, onBeadBuilder }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled ? "rgba(8,8,8,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.08)" : "none",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between" style={{ height: 72 }}>
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/evangel.jpeg"
                alt="Evangel Collectibles Logo"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid rgba(201,168,76,0.3)",
                }}
              />
              <div className="flex flex-col">
                <span
                  style={{
                    fontFamily: "'Cormorant', serif",
                    fontWeight: 300,
                    fontSize: "1.2rem",
                    letterSpacing: "0.12em",
                    color: "#f0ede8",
                    lineHeight: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Evangel
                </span>
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 200,
                    fontSize: "0.5rem",
                    letterSpacing: "0.4em",
                    color: "#C9A84C",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  Collectibles · Owerri
                </span>
              </div>
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-10">
              {["Collection", "Rentals", "Services", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    color: "rgba(240,237,232,0.55)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "color 0.3s",
                  }}
                  className="hover:text-white"
                >
                  {label}
                </a>
              ))}
              <button
                onClick={onBeadBuilder}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  color: "#C9A84C",
                  background: "transparent",
                  border: "1px solid rgba(201,168,76,0.4)",
                  padding: "8px 20px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                className="hover:border-[#C9A84C] hover:bg-[rgba(201,168,76,0.06)]"
              >
                Bespoke
              </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <button
                onClick={onCartOpen}
                style={{ background: "transparent", border: "none", cursor: "pointer", position: "relative", padding: 8 }}
              >
                <ShoppingBag size={18} color="#f0ede8" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      width: 14,
                      height: 14,
                      background: "#C9A84C",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 8,
                      fontWeight: 400,
                      color: "#080808",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "block", padding: 8 }}
                className="md:hidden"
              >
                {mobileOpen
                  ? <X size={18} color="#f0ede8" strokeWidth={1.5} />
                  : <Menu size={18} color="#f0ede8" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "#080808",
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", gap: 40,
            }}
          >
            {["Collection", "Rentals", "Services", "Contact"].map((label, i) => (
              <motion.a
                key={label}
                href={`#${label.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "'Cormorant', serif",
                  fontWeight: 300,
                  fontSize: "2.5rem",
                  letterSpacing: "0.1em",
                  color: "#f0ede8",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              onClick={() => { onBeadBuilder(); setMobileOpen(false); }}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "#C9A84C",
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.4)",
                padding: "12px 32px",
                textTransform: "uppercase",
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Bespoke Atelier
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}