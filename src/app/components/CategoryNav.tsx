import { motion } from "motion/react";

const categories = [
  { id: "all", label: "All" },
  { id: "bridal", label: "Bridal" },
  { id: "chieftaincy", label: "Chieftaincy" },
  { id: "accessories", label: "Accessories" },
  { id: "rental", label: "Rentals" },
];

interface CategoryNavProps {
  active: string;
  onChange: (id: string) => void;
}

export function CategoryNav({ active, onChange }: CategoryNavProps) {
  return (
    <div style={{ background: "#080808", padding: "0 clamp(24px, 6vw, 96px) 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" as const }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: active === cat.id ? 400 : 300,
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: active === cat.id ? "#C9A84C" : "rgba(240,237,232,0.35)",
              background: "transparent",
              border: "none",
              padding: "10px 24px",
              cursor: "pointer",
              position: "relative",
              transition: "color 0.3s",
            }}
            className="hover:text-white"
          >
            {cat.label}
            {active === cat.id && (
              <motion.div
                layoutId="categoryUnderline"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: 1,
                  background: "#C9A84C",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}