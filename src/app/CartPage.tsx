import { useState, useEffect } from "react";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";
import { getSessionId, fetchCart, updateCartItem, removeCartItem, clearCart, type CartItem, SOCIAL } from "./api.ts";

interface Props {
  onCheckout?: () => void;
  onClose: () => void;
}

export function CartPage({ onCheckout, onClose }: Props) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const sessionId = getSessionId();

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchCart(sessionId);
      setItems(data);
    } catch {}
    setLoading(false);
  }

  async function handleUpdate(id: string, qty: number) {
    if (qty < 1) return;
    await updateCartItem(id, qty);
    load();
  }

  async function handleRemove(id: string) {
    await removeCartItem(id);
    load();
  }

  async function handleClear() {
    if (!confirm("Clear cart?")) return;
    await clearCart(sessionId);
    load();
  }

  const subtotal = items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0);

  function handleCheckout() {
    if (onCheckout) {
      onCheckout();
      return;
    }

    const lines = items.map((item) => {
      const name = item.product?.name || "Product";
      const price = item.product?.price || 0;
      return `- ${name} x${item.quantity} = ₦${(price * item.quantity).toLocaleString()}`;
    });
    const message = [
      "Hello Evangel Collectibles, I want to order these items:",
      ...lines,
      `Total: ₦${subtotal.toLocaleString()}`,
      "Please confirm availability and payment details.",
    ].join("\n");

    window.open(`https://wa.me/${SOCIAL.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
    }}>
      <div style={{
        background: "#FFFDF9", width: "100%", maxWidth: "420px", height: "100%",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e0d5c8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontFamily: "serif", fontSize: "1.3rem" }}>Cart ({items.length})</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#76675b" }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
          {loading ? <p>Loading...</p> : items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 60, color: "#76675b" }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 12, padding: "12px", background: "white", borderRadius: 12, border: "1px solid #e0d5c8" }}>
                  <img src={item.product?.image || "/evangel.jpeg"} alt={item.product?.name || ""}
                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, background: "#eadbc7" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = "/evangel.jpeg"; }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: "bold", fontSize: "0.9rem" }}>{item.product?.name}</p>
                    <p style={{ margin: "2px 0", fontSize: "0.8rem", color: "#FF9500", fontWeight: "bold" }}>₦{(item.product?.price || 0).toLocaleString()}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <button onClick={() => handleUpdate(item.id, item.quantity - 1)} style={qtyBtnStyle}><Minus size={14} /></button>
                      <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{item.quantity}</span>
                      <button onClick={() => handleUpdate(item.id, item.quantity + 1)} style={qtyBtnStyle}><Plus size={14} /></button>
                      <button onClick={() => handleRemove(item.id)} style={{ ...qtyBtnStyle, marginLeft: "auto", color: "#dc2626", borderColor: "#dc2626" }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid #e0d5c8", background: "white" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: "#76675b" }}>Subtotal</span>
              <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>₦{subtotal.toLocaleString()}</span>
            </div>
            <button onClick={handleCheckout} style={{
              width: "100%", padding: "14px", background: "#FF9500", color: "white",
              border: "none", borderRadius: 12, fontWeight: "bold", fontSize: "1rem",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              Send Order on WhatsApp <MessageCircle size={18} /><ArrowRight size={18} />
            </button>
            <button onClick={handleClear} style={{ width: "100%", padding: "8px", background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "0.8rem", marginTop: 8 }}>
              Clear cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: 32, height: 32, borderRadius: 8, border: "1px solid #e0d5c8",
  background: "white", cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center",
};
