import { useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

export const productList = [
  // Bespoke Coral Beads
  {
    id: 1,
    name: "Royal Coral Necklace",
    subtitle: "Five-Strand Bridal · Authentic Coral",
    price: 185000,
    category: "bridal",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=750&fit=crop&auto=format",
    inStock: true,
  },
  {
    id: 2,
    name: "Ozo Title Regalia",
    subtitle: "Chieftaincy Complete Set",
    price: 420000,
    category: "chieftaincy",
    badge: "Exclusive",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=750&fit=crop&auto=format",
    inStock: true,
  },
  {
    id: 3,
    name: "Igbo Bridal Ensemble",
    subtitle: "Seven-Piece Wedding Collection",
    price: 650000,
    category: "bridal",
    badge: "New",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=750&fit=crop&auto=format",
    inStock: true,
  },
  // Ceremonial Caps & Staffs
  {
    id: 4,
    name: "Okpu Agu Crown",
    subtitle: "Royal Handwoven Tiara",
    price: 280000,
    category: "chieftaincy",
    badge: "Rare",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=750&fit=crop&auto=format",
    inStock: true,
  },
  {
    id: 5,
    name: "Nza Chieftaincy Staff",
    subtitle: "Ceremonial · Carved & Beaded",
    price: 195000,
    category: "chieftaincy",
    badge: "Rare",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=600&h=750&fit=crop&auto=format",
    inStock: false,
  },
  // Cultural Hand Fans & Accents
  {
    id: 6,
    name: "Akupe Ceremonial Fan",
    subtitle: "Custom-Furred · Luxury Bridal",
    price: 48000,
    category: "accessories",
    badge: null,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=750&fit=crop&auto=format",
    inStock: true,
  },
  {
    id: 7,
    name: "Classic Single Strand",
    subtitle: "Everyday Luxury · Genuine Coral",
    price: 38500,
    category: "coral",
    badge: null,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&h=750&fit=crop&auto=format",
    inStock: true,
  },
  // Rentals
  {
    id: 8,
    name: "Cultural Day Package",
    subtitle: "Kids Complete Traditional Set · Rental",
    price: 25000,
    category: "rental",
    badge: "Rental",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=750&fit=crop&auto=format",
    inStock: true,
  },
  {
    id: 9,
    name: "Career Event Attire",
    subtitle: "Adult Premium Cultural Wear · Rental",
    price: 45000,
    category: "rental",
    badge: "Rental",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&h=750&fit=crop&auto=format",
    inStock: true,
  },
  {
    id: 10,
    name: "Media Event Regalia",
    subtitle: "High-Impact Traditional · Rental",
    price: 65000,
    category: "rental",
    badge: "Premium Rental",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&h=750&fit=crop&auto=format",
    inStock: true,
  },
];

function formatPrice(n: number) {
  if (n === 0) return "Price on Request";
  return "₦ " + n.toLocaleString("en-NG");
}

interface ProductGridProps {
  activeCategory: string;
  onAddToCart: (p: typeof productList[0]) => void;
  onQuickView: (p: typeof productList[0]) => void;
}

export function ProductGrid({ activeCategory, onAddToCart, onQuickView }: ProductGridProps) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? productList
    : productList.filter((p) => p.category === activeCategory);

  return (
    <section id="collection" style={{ background: "#080808", padding: "80px clamp(24px, 6vw, 96px)" }}>
      <div
        style={{
          maxWidth: 1280, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 2,
        }}
      >
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              background: "#0f0f0f",
              cursor: "pointer",
            }}
          >
            {/* Image */}
            <div
              style={{ aspectRatio: "4/5", overflow: "hidden", background: "#111", position: "relative" }}
              onClick={() => onQuickView(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.5s",
                  transform: hovered === product.id ? "scale(1.04)" : "scale(1)",
                  filter: !product.inStock ? "grayscale(0.5) brightness(0.5)" : hovered === product.id ? "brightness(0.7)" : "brightness(0.75)",
                }}
              />

              {/* Hover overlay with add button */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "flex-end",
                  padding: 20,
                  opacity: hovered === product.id ? 1 : 0,
                  transition: "opacity 0.4s",
                  background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)",
                }}
              >
                {product.inStock && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.58rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#080808",
                      background: "#C9A84C",
                      border: "none",
                      padding: "10px 20px",
                      cursor: "pointer",
                      width: "100%",
                      transition: "opacity 0.2s",
                    }}
                  >
                    Add to Bag
                  </button>
                )}
              </div>

              {/* Badge */}
              {product.badge && (
                <div
                  style={{
                    position: "absolute", top: 16, left: 16,
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.5rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: product.badge === "Exclusive" || product.badge === "Rare" ? "#C9A84C" : "rgba(240,237,232,0.6)",
                    border: `1px solid ${product.badge === "Exclusive" || product.badge === "Rare" ? "rgba(201,168,76,0.5)" : "rgba(240,237,232,0.15)"}`,
                    padding: "4px 10px",
                    background: "rgba(8,8,8,0.7)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {product.badge}
                </div>
              )}

              {/* Sold out */}
              {!product.inStock && (
                <div
                  style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.55rem",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "rgba(240,237,232,0.4)",
                    border: "1px solid rgba(240,237,232,0.12)",
                    padding: "6px 16px",
                  }}>
                    Sold Out
                  </span>
                </div>
              )}

              {/* Wishlist */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setWishlist((prev) => prev.includes(product.id) ? prev.filter(x => x !== product.id) : [...prev, product.id]);
                }}
                style={{
                  position: "absolute", top: 14, right: 14,
                  background: "rgba(8,8,8,0.5)",
                  border: "none",
                  width: 30, height: 30,
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  opacity: hovered === product.id || wishlist.includes(product.id) ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              >
                <Heart
                  size={12}
                  strokeWidth={1.5}
                  fill={wishlist.includes(product.id) ? "#C9A84C" : "none"}
                  color={wishlist.includes(product.id) ? "#C9A84C" : "#f0ede8"}
                />
              </button>
            </div>

            {/* Info */}
            <div style={{ padding: "16px 20px 20px" }}>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 200,
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(240,237,232,0.3)",
                marginBottom: 6,
              }}>
                {product.subtitle}
              </p>
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontWeight: 400,
                fontSize: "1.05rem",
                color: "#f0ede8",
                marginBottom: 12,
                letterSpacing: "0.02em",
                lineHeight: 1.3,
              }}>
                {product.name}
              </p>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 300,
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
                color: product.price === 0 ? "#C9A84C" : "rgba(240,237,232,0.55)",
              }}>
                {formatPrice(product.price)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}