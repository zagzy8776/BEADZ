// API base URL - change to your Render URL in production
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  products?: Product[];
  _count?: { products: number };
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  categoryId: string;
  category: Category;
  badge: string | null;
  image: string;
  inStock: boolean;
  description: string | null;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  image: string | null;
  rating: number;
  sortOrder: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  section: string;
  sortOrder: number;
}

export interface Order {
  id: string;
  items: any;
  total: number;
  summary: string | null;
  type: string;
  phone: string | null;
  status: string;
  createdAt: string;
}

// Public API
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category && category !== "all"
    ? `${API_BASE}/api/products?category=${category}`
    : `${API_BASE}/api/products`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_BASE}/api/testimonials`);
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
}

export async function fetchGallery(section?: string): Promise<GalleryImage[]> {
  const url = section ? `${API_BASE}/api/gallery?section=${section}` : `${API_BASE}/api/gallery`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch gallery");
  return res.json();
}

// WhatsApp helper
export function phoneLink(phone: string) {
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;
}

export function waMessage(phone: string, message: string) {
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}

export function productWhatsApp(phone: string, product: Product) {
  const msg = `Hello Evangel Collectibles, I'm interested in *${product.name}* (₦${product.price.toLocaleString()}). Please tell me more about it.`;
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;
}

// Social media links
export const SOCIAL = {
  instagram: "https://www.instagram.com/evangelcollectibles",
  tiktok: "https://www.tiktok.com/@evangel.costumes",
  whatsapp: "2348038797915",
  phone: "+2348038797915",
  phoneDisplay: "+234 803 879 7915",
  email: "Evangelcollectibles@gmail.com",
  address: "Orji flyover opposite Ebere Links fuel station",
};

// Google Maps embed URL
export const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=Orji+flyover+opposite+Ebere+Links+fuel+station&output=embed`;
export const GOOGLE_MAPS_DIR = `https://www.google.com/maps/dir/?api=1&destination=Orji+flyover+opposite+Ebere+Links+fuel+station`;