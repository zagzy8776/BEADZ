import { useState, useEffect } from "react";
import { Image, LogOut, MessageSquareQuote, Package, Plus, ShoppingBag, Trash2, UploadCloud, X } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

type Tab = "products" | "orders" | "testimonials" | "gallery";
const tabMeta: Record<Tab, { label: string; icon: React.ReactNode }> = {
  products: { label: "Products", icon: <Package size={16} /> },
  orders: { label: "Orders", icon: <ShoppingBag size={16} /> },
  testimonials: { label: "Testimonials", icon: <MessageSquareQuote size={16} /> },
  gallery: { label: "Gallery", icon: <Image size={16} /> },
};

interface Props {
  token: string;
  onLogout: () => void;
}

export function AdminDashboard({ token, onLogout }: Props) {
  const [tab, setTab] = useState<Tab>("products");
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  return (
    <div style={{ minHeight: "100vh", background: "#f7efe4", color: "#241209" }}>
      {/* Top Bar */}
      <div style={{
        background: "#1C120C",
        color: "white",
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 10px 30px rgba(28, 18, 12, 0.18)",
      }}>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: "0.68rem", color: "#FFB24A", fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase" }}>Evangel Collectibles</p>
          <h1 style={{ fontFamily: "serif", fontSize: "1.55rem", margin: 0, lineHeight: 1 }}>Admin Dashboard</h1>
        </div>
        <button onClick={onLogout} style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "white",
          padding: "10px 16px",
          borderRadius: "999px",
          cursor: "pointer",
          fontSize: "0.85rem",
          fontWeight: 800,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}><LogOut size={16} /> Logout</button>
      </div>

      {/* Tab Navigation */}
      <div style={{ borderBottom: "1px solid #e0d5c8", background: "rgba(255,255,255,0.82)", backdropFilter: "blur(14px)" }}>
        <div style={{ display: "flex", gap: 8, padding: "12px 24px", overflowX: "auto", maxWidth: "1200px", margin: "0 auto" }}>
        {(["products", "orders", "testimonials", "gallery"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "11px 16px",
            background: tab === t ? "#1C120C" : "transparent",
            border: tab === t ? "1px solid #1C120C" : "1px solid #e0d5c8",
            borderRadius: "999px",
            color: tab === t ? "white" : "#76675b",
            fontWeight: 800,
            cursor: "pointer",
            fontSize: "0.9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
          }}>
            {tabMeta[t].icon} {tabMeta[t].label}
          </button>
        ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        {tab === "products" && <ProductsPanel token={token} headers={headers} />}
        {tab === "orders" && <OrdersPanel token={token} headers={headers} />}
        {tab === "testimonials" && <TestimonialsPanel token={token} headers={headers} />}
        {tab === "gallery" && <GalleryPanel token={token} headers={headers} />}
      </div>
    </div>
  );
}

// ============= PRODUCTS PANEL =============
function ProductsPanel({ token, headers }: { token: string; headers: Record<string, string> }) {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [p, c] = await Promise.all([
      fetch(`${API_BASE}/api/admin/products`, { headers }).then(r => r.json()),
      fetch(`${API_BASE}/api/admin/categories`, { headers }).then(r => r.json()),
    ]);
    setProducts(p);
    setCategories(c);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`${API_BASE}/api/admin/products/${id}`, { method: "DELETE", headers });
    load();
  }

  return (
    <div>
      <div style={sectionHeaderStyle}>
        <div>
          <p style={eyebrowStyle}>Catalogue manager</p>
          <h2 style={sectionTitleStyle}>Products ({products.length})</h2>
        </div>
        <button onClick={() => setEditing({})} style={{
          ...primaryButtonStyle,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}><Plus size={16} /> Add Product</button>
      </div>

      <div style={statsGridStyle}>
        <MetricCard label="Total products" value={products.length} />
        <MetricCard label="In stock" value={products.filter(p => p.inStock).length} />
        <MetricCard label="Out of stock" value={products.filter(p => !p.inStock).length} />
      </div>

      {/* Product Form */}
      {editing !== null && (
        <ProductForm
          product={editing}
          categories={categories}
          onSave={async (data) => {
            const isNew = !editing.id;
            const url = isNew
              ? `${API_BASE}/api/admin/products`
              : `${API_BASE}/api/admin/products/${editing.id}`;
            const method = isNew ? "POST" : "PUT";
            await fetch(url, { method, headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(data) });
            setEditing(null);
            load();
          }}
          onCancel={() => setEditing(null)}
          token={token}
        />
      )}

      {loading ? <p style={mutedStateStyle}>Loading products...</p> : products.length === 0 ? (
        <p style={emptyStateStyle}>No products yet. Add the first product to start selling.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {products.map((p: any) => (
            <div key={p.id} style={{
              ...rowCardStyle,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px",
            }}>
              <img src={p.image} alt={p.name} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: "12px", background: "#eadbc7" }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/evangel.jpeg"; }} />
              <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                <strong style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</strong>
                <p style={{ margin: "2px 0", color: "#76675b", fontSize: "0.85rem" }}>{p.subtitle}</p>
                <span style={{ color: "#FF9500", fontWeight: "bold" }}>₦{p.price.toLocaleString()}</span>
                <span style={{ marginLeft: 12, fontSize: "0.78rem", color: p.inStock ? "#15803d" : "#dc2626", fontWeight: 800 }}>
                  {p.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginLeft: "auto", flexWrap: "wrap" }}>
                <button onClick={() => setEditing(p)} style={secondaryButtonStyle}>Edit</button>
                <button onClick={() => deleteProduct(p.id)} style={dangerButtonStyle}><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductForm({ product, categories, onSave, onCancel, token }: {
  product: any;
  categories: any[];
  onSave: (data: any) => void;
  onCancel: () => void;
  token: string;
}) {
  const [form, setForm] = useState({
    name: product.name || "",
    subtitle: product.subtitle || "",
    price: product.price || "",
    categoryId: product.categoryId || categories[0]?.id || "",
    badge: product.badge || "",
    image: product.image || "",
    inStock: product.inStock !== false,
    description: product.description || "",
  });
  const [uploading, setUploading] = useState(false);
  const isEditing = Boolean(product.id);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`${API_BASE}/api/admin/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    setForm(f => ({ ...f, image: data.fullUrl }));
    setUploading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...form, price: parseFloat(form.price as string) || 0 });
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: "white",
      padding: 0,
      borderRadius: "20px",
      marginBottom: "22px",
      border: "1px solid rgba(255,149,0,0.55)",
      boxShadow: "0 24px 70px rgba(50, 26, 14, 0.12)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "18px 22px",
        borderBottom: "1px solid #eadbc7",
        background: "#FFF8ED",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
      }}>
        <div>
          <p style={eyebrowStyle}>{isEditing ? "Update catalogue item" : "Create catalogue item"}</p>
          <h3 style={{ margin: 0, fontFamily: "serif", fontSize: "1.65rem", lineHeight: 1 }}>
            {isEditing ? `Edit ${product.name || "Product"}` : "Add New Product"}
          </h3>
        </div>
        <button type="button" onClick={onCancel} aria-label="Close product editor" style={iconButtonStyle}>
          <X size={18} />
        </button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 0,
      }}>
        <div style={{
          padding: "22px",
          background: "#1C120C",
          color: "white",
        }}>
          <p style={{ margin: "0 0 10px", color: "#FFB24A", fontSize: "0.72rem", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Product photo
          </p>
          <label style={{
            display: "grid",
            placeItems: "center",
            minHeight: 310,
            borderRadius: 18,
            border: "1px dashed rgba(255,255,255,0.35)",
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
            cursor: "pointer",
            position: "relative",
          }}>
            {form.image ? (
              <img
                src={form.image}
                alt={form.name || "Product preview"}
                style={{ width: "100%", height: "100%", minHeight: 310, objectFit: "cover" }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/evangel.jpeg"; }}
              />
            ) : (
              <div style={{ textAlign: "center", padding: 24 }}>
                <UploadCloud size={38} style={{ color: "#FF9500", marginBottom: 12 }} />
                <p style={{ margin: "0 0 6px", fontWeight: 900 }}>Upload product photo</p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.62)", fontSize: "0.82rem", lineHeight: 1.6 }}>
                  Use a clear square or portrait image.
                </p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
          </label>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <label style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 999,
              background: "#FF9500",
              color: "white",
              padding: "10px 15px",
              fontSize: "0.82rem",
              fontWeight: 900,
              cursor: "pointer",
            }}>
              <UploadCloud size={16} /> {form.image ? "Change photo" : "Choose photo"}
              <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
            </label>
            {uploading && <span style={{ color: "#FFB24A", fontSize: "0.82rem", fontWeight: 800 }}>Uploading...</span>}
          </div>
        </div>

        <div style={{ padding: "22px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
            <Field label="Product name">
              <input placeholder="e.g. Writ and ankle set" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={inputStyle} required />
            </Field>
            <Field label="Price">
              <input placeholder="48000" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                style={inputStyle} required />
            </Field>
            <Field label="Short subtitle">
              <input placeholder="Brief customer-facing description" value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                style={inputStyle} required />
            </Field>
            <Field label="Category">
              <select value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))} style={inputStyle}>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Badge">
              <input placeholder="Bestseller, New, Limited" value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
                style={inputStyle} />
            </Field>
            <Field label="Availability">
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, ...inputStyle, cursor: "pointer" }}>
                <span style={{ fontWeight: 800, color: "#321A0E" }}>{form.inStock ? "In Stock" : "Out of Stock"}</span>
                <input type="checkbox" checked={form.inStock} onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))} />
              </label>
            </Field>
          </div>

          <Field label="Product details" style={{ marginTop: 14 }}>
            <textarea
              placeholder="Add sizing, materials, rental notes, or what comes with the product."
              value={form.description}
              rows={4}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
            />
          </Field>

          <div style={{
            marginTop: 18,
            paddingTop: 18,
            borderTop: "1px solid #eadbc7",
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            flexWrap: "wrap",
          }}>
            <button type="button" onClick={onCancel} style={secondaryButtonStyle}>Cancel</button>
            <button type="submit" style={primaryButtonStyle}>
              {isEditing ? "Save Changes" : "Publish Product"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

// ============= ORDERS PANEL =============
function OrdersPanel({ headers }: { token: string; headers: Record<string, string> }) {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_BASE}/api/admin/orders`, { headers }).then(r => r.json()).then(setOrders);
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`${API_BASE}/api/admin/orders/${id}`, {
      method: "PUT", headers, body: JSON.stringify({ status }),
    });
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  }

  return (
    <div>
      <div style={sectionHeaderStyle}>
        <div>
          <p style={eyebrowStyle}>Customer requests</p>
          <h2 style={sectionTitleStyle}>Orders ({orders.length})</h2>
        </div>
      </div>
      {orders.length === 0 ? <p style={emptyStateStyle}>No orders yet.</p> : (
        <div style={{ display: "grid", gap: "12px" }}>
          {orders.map((o: any) => (
            <div key={o.id} style={rowCardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>Order #{o.id.slice(0, 8)}</strong>
                  <span style={{ marginLeft: 12, fontSize: "0.85rem", color: "#76675b" }}>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}
                  style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #e0d5c8" }}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              {o.phone && <p style={{ margin: "8px 0 0", fontSize: "0.9rem" }}>Phone: {o.phone}</p>}
              <p style={{ margin: "4px 0 0", color: "#FF9500", fontWeight: "bold" }}>Total: ₦{o.total?.toLocaleString() || "0"}</p>
              {o.summary && <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#76675b" }}>{o.summary}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============= TESTIMONIALS PANEL =============
function TestimonialsPanel({ token, headers }: { token: string; headers: Record<string, string> }) {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  async function load() {
    const data = await fetch(`${API_BASE}/api/admin/testimonials`, { headers }).then(r => r.json());
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  async function deleteItem(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`${API_BASE}/api/admin/testimonials/${id}`, { method: "DELETE", headers });
    load();
  }

  async function save(data: any) {
    const isNew = !editing?.id;
    const url = isNew ? `${API_BASE}/api/admin/testimonials` : `${API_BASE}/api/admin/testimonials/${editing.id}`;
    const method = isNew ? "POST" : "PUT";
    await fetch(url, { method, headers, body: JSON.stringify(data) });
    setEditing(null);
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <p style={eyebrowStyle}>Social proof</p>
          <h2 style={sectionTitleStyle}>Testimonials ({items.length})</h2>
        </div>
        <button onClick={() => setEditing({})} style={primaryButtonStyle}>Add</button>
      </div>

      {editing !== null && (
        <div style={{ background: "white", padding: 24, borderRadius: 16, marginBottom: 20, border: "2px solid #FF9500" }}>
          <input placeholder="Name" value={editing.name || ""} onChange={e => setEditing({ ...editing, name: e.target.value })}
            style={{ ...inputStyle, marginBottom: 8 }} />
          <input placeholder="Role (e.g. Traditional bride)" value={editing.role || ""}
            onChange={e => setEditing({ ...editing, role: e.target.value })} style={{ ...inputStyle, marginBottom: 8 }} />
          <textarea placeholder="Quote" value={editing.quote || ""} rows={3}
            onChange={e => setEditing({ ...editing, quote: e.target.value })} style={{ ...inputStyle, marginBottom: 8 }} />
          <input placeholder="Rating (1-5)" type="number" min={1} max={5} value={editing.rating || 5}
            onChange={e => setEditing({ ...editing, rating: parseInt(e.target.value) || 5 })} style={{ ...inputStyle, marginBottom: 12, width: 100 }} />
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => save(editing)}
              style={{ background: "#FF9500", color: "white", border: "none", padding: "10px 24px", borderRadius: 10, fontWeight: "bold", cursor: "pointer" }}>
              {editing.id ? "Update" : "Add"} Testimonial
            </button>
            <button onClick={() => setEditing(null)}
              style={{ background: "white", color: "#666", border: "1px solid #e0d5c8", padding: "10px 24px", borderRadius: 10, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((t: any) => (
          <div key={t.id} style={rowCardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{t.name}</strong> {t.role && <span style={{ color: "#76675b", fontSize: "0.85rem" }}>- {t.role}</span>}
                <p style={{ margin: "4px 0 0", fontStyle: "italic" }}>"{t.quote}"</p>
                <p style={{ margin: "4px 0 0", color: "#FF9500" }}>{"★".repeat(t.rating)}</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEditing(t)} style={{ padding: "6px 16px", borderRadius: 8, border: "1px solid #e0d5c8", background: "white", cursor: "pointer" }}>Edit</button>
                <button onClick={() => deleteItem(t.id)} style={{ padding: "6px 16px", borderRadius: 8, border: "1px solid #dc2626", color: "#dc2626", background: "white", cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= GALLERY PANEL =============
function GalleryPanel({ token, headers }: { token: string; headers: Record<string, string> }) {
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  async function load() {
    const data = await fetch(`${API_BASE}/api/admin/gallery`, { headers }).then(r => r.json());
    setImages(data);
  }

  useEffect(() => { load(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) fd.append("images", files[i]);
    const res = await fetch(`${API_BASE}/api/admin/upload-multiple`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const { images: uploaded } = await res.json();
    // Save each uploaded image to gallery
    for (const img of uploaded) {
      await fetch(`${API_BASE}/api/admin/gallery`, {
        method: "POST",
        headers,
        body: JSON.stringify({ url: img.fullUrl, caption: "", section: "lookbook", sortOrder: 0 }),
      });
    }
    setUploading(false);
    load();
  }

  async function deleteImage(id: string) {
    if (!confirm("Delete this image?")) return;
    await fetch(`${API_BASE}/api/admin/gallery/${id}`, { method: "DELETE", headers });
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <p style={eyebrowStyle}>Lookbook media</p>
          <h2 style={sectionTitleStyle}>Gallery ({images.length})</h2>
        </div>
        <label style={{ ...primaryButtonStyle, display: "inline-block" }}>
          {uploading ? "Uploading..." : "Upload Images"}
          <input type="file" multiple accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {images.map((img: any) => (
          <div key={img.id} style={{ position: "relative", borderRadius: "12px", overflow: "hidden", background: "#eadbc7", aspectRatio: "4/3" }}>
            <img src={img.url} alt={img.caption || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { (e.target as HTMLImageElement).src = "/evangel.jpeg"; }} />
            <button onClick={() => deleteImage(img.id)} style={{
              position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", color: "white",
              border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: "1rem",
            }}>×</button>
            {img.caption && <p style={{
              position: "absolute", bottom: 0, left: 0, right: 0, margin: 0, padding: "8px",
              background: "rgba(0,0,0,0.5)", color: "white", fontSize: "0.8rem",
            }}>{img.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e0d5c8",
      borderRadius: 16,
      padding: "16px 18px",
      boxShadow: "0 14px 40px rgba(50, 26, 14, 0.06)",
    }}>
      <p style={{ margin: "0 0 8px", color: "#76675b", fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</p>
      <strong style={{ fontFamily: "serif", fontSize: "2rem", lineHeight: 1 }}>{value}</strong>
    </div>
  );
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <label style={{ display: "grid", gap: 7, ...style }}>
      <span style={{ color: "#76675b", fontSize: "0.74rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
      {children}
    </label>
  );
}

const sectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
  marginBottom: 20,
  flexWrap: "wrap",
};

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "serif",
  fontSize: "2rem",
  lineHeight: 1,
};

const eyebrowStyle: React.CSSProperties = {
  margin: "0 0 6px",
  color: "#E68500",
  fontSize: "0.68rem",
  fontWeight: 900,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

const statsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
  gap: 12,
  marginBottom: 20,
};

const rowCardStyle: React.CSSProperties = {
  background: "white",
  borderRadius: "16px",
  padding: "16px 20px",
  border: "1px solid #e0d5c8",
  boxShadow: "0 14px 40px rgba(50, 26, 14, 0.055)",
};

const primaryButtonStyle: React.CSSProperties = {
  background: "#FF9500",
  color: "white",
  border: "none",
  padding: "11px 22px",
  borderRadius: "999px",
  fontWeight: 900,
  cursor: "pointer",
  boxShadow: "0 12px 26px rgba(255, 149, 0, 0.24)",
};

const secondaryButtonStyle: React.CSSProperties = {
  padding: "8px 15px",
  borderRadius: "999px",
  border: "1px solid #e0d5c8",
  background: "white",
  color: "#321A0E",
  cursor: "pointer",
  fontWeight: 800,
};

const dangerButtonStyle: React.CSSProperties = {
  padding: "8px 15px",
  borderRadius: "999px",
  border: "1px solid #dc2626",
  color: "#dc2626",
  background: "white",
  cursor: "pointer",
  fontWeight: 800,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

const iconButtonStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "999px",
  border: "1px solid #e0d5c8",
  background: "white",
  color: "#321A0E",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
};

const mutedStateStyle: React.CSSProperties = {
  color: "#76675b",
  padding: "24px 0",
};

const emptyStateStyle: React.CSSProperties = {
  background: "white",
  border: "1px dashed #d3bfa8",
  borderRadius: 16,
  color: "#76675b",
  padding: "28px",
  textAlign: "center",
};

const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  border: "2px solid #e0d5c8",
  borderRadius: "10px",
  fontSize: "0.9rem",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};
