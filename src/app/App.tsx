import { useState, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { CategoryNav } from "./components/CategoryNav";
import { ProductGrid } from "./components/ProductGrid";
import { BeadBuilder } from "./components/BeadBuilder";
import { WhatsAppDrawer } from "./components/WhatsAppDrawer";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { RentalHub } from "./components/RentalHub";
import { CateringServices } from "./components/CateringServices";
import { motion } from "motion/react";

interface CartItem {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customSummary, setCustomSummary] = useState<string | undefined>();
  const [customTotal, setCustomTotal] = useState<number | undefined>();

  const builderRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const rentalRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const addToCart = (p: CartItem) => {
    setCart((prev) => prev.find((i) => i.id === p.id) ? prev : [...prev, p]);
  };

  const openCart = () => {
    setCustomSummary(undefined);
    setCustomTotal(undefined);
    setDrawerOpen(true);
  };

  const quickView = (p: CartItem) => {
    addToCart(p);
    openCart();
  };

  const handleOrder = (summary: string, total: number) => {
    setCustomSummary(summary);
    setCustomTotal(total);
    setDrawerOpen(true);
  };

  return (
    <div style={{ background: "#080808", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
        ::selection { background: rgba(201,168,76,0.25); color: #f0ede8; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <Navbar cartCount={cart.length} onCartOpen={openCart} onBeadBuilder={() => builderRef.current?.scrollIntoView({ behavior: "smooth" })} />

      <HeroSection
        onShop={() => collectionRef.current?.scrollIntoView({ behavior: "smooth" })}
        onBuild={() => rentalRef.current?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* Marquee divider */}
      <div style={{ background: "#C9A84C", overflow: "hidden", padding: "12px 0" }}>
        <div style={{ display: "flex", gap: 0, width: "max-content", animation: "marquee 25s linear infinite" }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#080808", padding: "0 32px", whiteSpace: "nowrap" }}>
              GENUINE CORAL &nbsp;·&nbsp; IGBO ROYAL HERITAGE &nbsp;·&nbsp; OWERRI CRAFTSMANSHIP &nbsp;·&nbsp; BESPOKE BRIDAL &nbsp;·&nbsp; EST. 1994
            </span>
          ))}
        </div>
      </div>

      {/* Collection */}
      <div ref={collectionRef}>
        <CategoryNav active={activeCategory} onChange={setActiveCategory} />
        <ProductGrid activeCategory={activeCategory} onAddToCart={addToCart} onQuickView={quickView} />
      </div>

      {/* Rental Hub */}
      <div ref={rentalRef}>
        <RentalHub onBrowse={() => {
          setActiveCategory("rental");
          collectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }} />
      </div>

      {/* Catering & Decoration Services */}
      <div ref={servicesRef}>
        <CateringServices onContact={() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }} />
      </div>

      {/* Editorial strip */}
      <div style={{ background: "#f0ede8", padding: "80px clamp(24px, 6vw, 96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {[
            {
              quote: "Every bead was placed with intention. My coral set was the most commented-on piece at my traditional wedding.",
              name: "Chidinma Okonkwo",
              role: "Owerri bride, 2025",
              img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&auto=format",
            },
            {
              quote: "The rental service saved us for our son's cultural day. Perfect fit, beautiful attire, zero stress.",
              name: "Ngozi Eze",
              role: "Mother of two, Enugu",
              img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&auto=format",
            },
            {
              quote: "The Ozo regalia arrived exactly to specification. Surpassed every expectation.",
              name: "Chief Emeka Nwosu",
              role: "Oguta, 2025",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format",
            },
          ].map((t) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ background: "#fff", padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div style={{ width: 24, height: 1, background: "#C9A84C", marginBottom: 24 }} />
              <p style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontWeight: 300, fontSize: "1.05rem", color: "#1a1208", lineHeight: 1.75, marginBottom: 32, flex: 1 }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "#e0ddd8", flexShrink: 0 }}>
                  <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.3)" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: "0.72rem", color: "#080808", letterSpacing: "0.08em" }}>{t.name}</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "rgba(8,8,8,0.4)", letterSpacing: "0.08em" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <style>{`@media(max-width:768px){ .testimonials-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      {/* Bead Builder */}
      <div ref={builderRef}>
        <BeadBuilder onOrder={handleOrder} />
      </div>

      <About />
      <Footer />

      <WhatsAppDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cartItems={cart}
        customSummary={customSummary}
        customTotal={customTotal}
      />
    </div>
  );
}