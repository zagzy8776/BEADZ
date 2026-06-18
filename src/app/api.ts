const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface Category {
  id: string; name: string; slug: string; sortOrder: number;
  _count?: { products: number };
}

export interface ProductVariant {
  id: string; productId: string; name: string; price: number; inStock: boolean; sortOrder: number;
}

export interface Product {
  id: string; name: string; subtitle: string; price: number;
  categoryId: string; category: Category; badge: string | null;
  image: string; inStock: boolean; stockCount: number;
  description: string | null; variants: ProductVariant[];
  createdAt: string;
}

export interface CartItem {
  id: string; sessionId: string; productId: string; variantId: string | null;
  quantity: number; product: Product;
}

export interface Order {
  id: string; items: any; total: number; type: string;
  customerName: string | null; phone: string | null; email: string | null;
  address: string | null; status: string; discount: number;
  couponCode: string | null; orderItems: any[];
  createdAt: string;
}

export interface Testimonial { id: string; name: string; role: string | null; quote: string; image: string | null; rating: number; sortOrder: number; }
export interface GalleryImage { id: string; url: string; caption: string | null; section: string; sortOrder: number; }
export interface Coupon { id: string; code: string; discount: number; type: string; minAmount: number; maxUses: number; usedCount: number; expiresAt: string | null; active: boolean; }
export interface Customer { id: string; name: string | null; phone: string; email: string | null; address: string | null; totalSpent: number; orderCount: number; lastOrderAt: string | null; createdAt: string; }
export interface DashboardStats { totalOrders: number; totalRevenue: number; totalCustomers: number; totalProducts: number; dailyRevenue: Record<string, number>; topSellers: any[]; lowStock: any[]; pendingOrders: number; completedOrders: number; }

export async function fetchCategories(): Promise<Category[]> {
  const r = await fetch(`${API_BASE}/api/categories`); return r.json();
}
export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category && category !== "all" ? `${API_BASE}/api/products?category=${category}` : `${API_BASE}/api/products`;
  const r = await fetch(url); return r.json();
}
export async function fetchTestimonials(): Promise<Testimonial[]> {
  const r = await fetch(`${API_BASE}/api/testimonials`); return r.json();
}
export async function fetchGallery(section?: string): Promise<GalleryImage[]> {
  const url = section ? `${API_BASE}/api/gallery?section=${section}` : `${API_BASE}/api/gallery`;
  const r = await fetch(url); return r.json();
}
export async function fetchCart(sessionId: string): Promise<CartItem[]> {
  const r = await fetch(`${API_BASE}/api/cart/${sessionId}`); return r.json();
}
export async function addToCart(sessionId: string, productId: string, variantId?: string, quantity?: number) {
  const r = await fetch(`${API_BASE}/api/cart`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId, productId, variantId, quantity }) });
  return r.json();
}
export async function updateCartItem(id: string, quantity: number) {
  const r = await fetch(`${API_BASE}/api/cart/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quantity }) });
  return r.json();
}
export async function removeCartItem(id: string) {
  await fetch(`${API_BASE}/api/cart/${id}`, { method: "DELETE" });
}
export async function clearCart(sessionId: string) {
  await fetch(`${API_BASE}/api/cart/clear/${sessionId}`, { method: "DELETE" });
}
export async function validateCoupon(code: string, total: number) {
  const r = await fetch(`${API_BASE}/api/validate-coupon`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code, total }) });
  return r.json();
}
export async function createOrder(data: any): Promise<Order> {
  const r = await fetch(`${API_BASE}/api/orders`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  return r.json();
}
export async function fetchOrder(id: string): Promise<Order> {
  const r = await fetch(`${API_BASE}/api/orders/${id}`); return r.json();
}
export async function fetchBankDetails() {
  const r = await fetch(`${API_BASE}/api/bank-details`); return r.json();
}
export async function fetchAdminStats(token: string): Promise<DashboardStats> {
  const r = await fetch(`${API_BASE}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }); return r.json();
}
export async function fetchAdminProducts(token: string): Promise<Product[]> {
  const r = await fetch(`${API_BASE}/api/admin/products`, { headers: { Authorization: `Bearer ${token}` } }); return r.json();
}
export async function fetchAdminOrders(token: string): Promise<Order[]> {
  const r = await fetch(`${API_BASE}/api/admin/orders`, { headers: { Authorization: `Bearer ${token}` } }); return r.json();
}
export async function fetchAdminCustomers(token: string): Promise<Customer[]> {
  const r = await fetch(`${API_BASE}/api/admin/customers`, { headers: { Authorization: `Bearer ${token}` } }); return r.json();
}
export async function fetchAdminCoupons(token: string): Promise<Coupon[]> {
  const r = await fetch(`${API_BASE}/api/admin/coupons`, { headers: { Authorization: `Bearer ${token}` } }); return r.json();
}

// Generate session ID
export function getSessionId(): string {
  let id = sessionStorage.getItem("evangel_session");
  if (!id) { id = "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9); sessionStorage.setItem("evangel_session", id); }
  return id;
}

// WhatsApp
export const SOCIAL = {
  instagram: "https://www.instagram.com/evangelcollectibles",
  tiktok: "https://www.tiktok.com/@evangel.costumes",
  whatsapp: "2348038797915",
  phone: "+2348038797915",
  phoneDisplay: "+234 803 879 7915",
  email: "Evangelcollectibles@gmail.com",
  address: "Orji flyover opposite Ebere Links fuel station",
};

export function productWhatsApp(phone: string, product: Product, variant?: ProductVariant) {
  const price = variant ? variant.price : product.price;
  const name = variant ? `${product.name} (${variant.name})` : product.name;
  const msg = `Hello Evangel Collectibles, I'm interested in *${name}* (₦${price.toLocaleString()}). Please tell me more.`;
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;
}

export function shareWhatsApp(product: Product) {
  const msg = `Check out *${product.name}* at Evangel Collectibles! ₦${product.price.toLocaleString()}`;
  const url = `${window.location.origin}?product=${product.id}`;
  return `https://wa.me/?text=${encodeURIComponent(msg + " - " + url)}`;
}

export const GOOGLE_MAPS_DIR = `https://www.google.com/maps/dir/?api=1&destination=Orji+flyover+opposite+Ebere+Links+fuel+station`;