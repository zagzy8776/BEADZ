import { useState, useEffect } from "react";
import {
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBag,
  Sparkles,
  Map as MapIcon,
} from "lucide-react";
import {
  fetchProducts,
  fetchCategories,
  type Product,
  type Category,
  productWhatsApp,
  SOCIAL,
  GOOGLE_MAPS_DIR,
} from "./api.ts";

function wa(message: string) {
  return `https://wa.me/${SOCIAL.whatsapp}?text=${encodeURIComponent(message)}`;
}

const heroWhatsApp = wa("Hello Evangel Collectibles, I would like to shop, rent, or request event catering.");
const PRODUCTS_PER_PAGE = 9;

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#2d180d]/10 bg-[#FFFDF9]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-[#231209] no-underline">
          <span className="h-12 w-12 overflow-hidden rounded-full border border-[#c78331]/25 bg-[#f3eadb] shadow-sm">
            <img src="/evangel.jpeg" alt="Evangel Collectibles logo" className="h-full w-full scale-110 object-cover" />
          </span>
          <span className="leading-none">
            <span className="block font-serif text-[1.55rem] font-black tracking-[-0.04em]">Evangel</span>
            <span className="mt-1 block font-sans text-[0.56rem] font-bold uppercase tracking-[0.38em] text-[#9b5a12]">Collectibles</span>
          </span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href={`tel:${SOCIAL.phone}`} aria-label="Call" className="luxury-icon"><Phone size={18} /></a>
          <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="luxury-icon"><Instagram size={18} /></a>
          <a href="#catalogue" aria-label="Shop" className="luxury-icon"><ShoppingBag size={18} /></a>
          <a href="#catalogue" aria-label="Menu" className="luxury-icon"><Menu size={19} /></a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#1C120C] px-4 pt-[98px] text-white sm:px-6 lg:px-8">
      <img src="/evangel.jpeg" alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-md" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,149,0,0.30),transparent_24%),radial-gradient(circle_at_50%_48%,rgba(50,26,14,0.76),#1C120C_72%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-98px)] max-w-7xl items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10 max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#f0c16e]/35 bg-white/10 px-4 py-2 backdrop-blur-xl">
            <Sparkles size={14} className="text-[#FF9500]" />
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#f8ddb0]">Evangel Collectibles</span>
          </div>
          <h1 className="font-serif text-[3.2rem] font-black leading-[0.9] tracking-[-0.065em] sm:text-[5rem] lg:text-[6.45rem]">Connect with your roots and experience luxury that honors tradition.</h1>
          <p className="mt-7 max-w-2xl text-[1rem] leading-8 text-white/76 sm:text-[1.08rem]">Evangel Collectibles offers bespoke Igbo coral beadwork, authentic traditional regalia, custom bridal accessories, premium cultural costume rentals for adults and kids, and elite outdoor event catering services curated for your celebrations.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#catalogue" className="rounded-full bg-[#FF9500] px-7 py-4 text-sm font-black text-white no-underline shadow-2xl shadow-[#ff9500]/25 transition-all duration-300 hover:scale-105 hover:bg-[#E68500]">Shop & Rent now →</a>
            <a href={heroWhatsApp} target="_blank" rel="noreferrer" className="rounded-full border border-white/55 px-7 py-4 text-sm font-black text-white no-underline transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#321A0E]">WhatsApp us</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-xs font-bold text-white no-underline transition-all hover:scale-105">
              <Instagram size={16} /> Follow on Instagram
            </a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold text-white no-underline transition-all hover:scale-105">
              <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.27 0 .53.03.77.1V8.61a6.25 6.25 0 0 0-.77-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.88a8.25 8.25 0 0 0 4.42 1.44V6.69a4.8 4.8 0 0 1-.77 0z"/></svg>
              TikTok
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[510px]">
          <div className="absolute -inset-8 rounded-full bg-[#FF9500]/20 blur-3xl" />
          <div className="relative rotate-1 overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/40 backdrop-blur-md transition-all duration-500 hover:rotate-0">
            <img src="/evangel.jpeg" alt="Evangel Collectibles cultural luxury" className="h-[470px] w-full rounded-[1.7rem] object-cover blur-[0.45px]" />
            <div className="absolute bottom-7 left-7 right-7 rounded-3xl border border-white/15 bg-[#1c120c]/75 p-5 backdrop-blur-xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-[#FF9500]">Luxury heritage studio</p>
              <p className="mt-2 font-serif text-3xl font-black leading-none">Beads · Attire · Rentals · Catering</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Catalogue() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([p, c]) => { setProducts(p); setCategories(c); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "all"
    ? products
    : products.filter(p => p.category.slug === activeCategory);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const pageProducts = filtered.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  return (
    <section id="catalogue" className="bg-[#FFFDF9] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Premium catalogue"
          title="Browse our collection of cultural luxury."
          copy="Click any item to inquire via WhatsApp. New products added regularly."
        />

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: "none",
              background: activeCategory === "all" ? "#FF9500" : "#f0e8de",
              color: activeCategory === "all" ? "white" : "#321A0E",
              fontWeight: "bold",
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >All</button>
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                border: "none",
                background: activeCategory === cat.slug ? "#FF9500" : "#f0e8de",
                color: activeCategory === cat.slug ? "white" : "#321A0E",
                fontWeight: "bold",
                fontSize: "0.8rem",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.2s",
              }}
            >{cat.name}</button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-[#76675b] py-12">Loading products...</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
            {pageProducts.map((product) => (
              <article key={product.id} className="group overflow-hidden rounded-xl border border-[#321A0E]/10 bg-white shadow-[0_12px_36px_rgba(50,26,14,0.07)] transition-all duration-300 hover:-translate-y-1 sm:rounded-2xl">
                <div className="relative aspect-square overflow-hidden bg-[#eadbc7] sm:aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/evangel.jpeg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {product.badge && (
                    <span className="absolute left-2 top-2 rounded-full border border-white/30 bg-white/15 px-2 py-1 text-[0.5rem] font-black uppercase tracking-[0.12em] text-white backdrop-blur-md sm:left-3 sm:top-3 sm:text-[0.56rem]">
                      {product.badge}
                    </span>
                  )}
                  <p className="absolute bottom-2 left-2 rounded-full bg-[#FF9500] px-2 py-1 text-[0.52rem] font-black uppercase tracking-[0.08em] text-white sm:bottom-3 sm:left-3 sm:text-[0.58rem]">
                    ₦{product.price.toLocaleString()}
                  </p>
                  {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="rounded-full bg-white px-2 py-1 text-[0.6rem] font-bold text-black sm:px-4 sm:py-2 sm:text-sm">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-2 sm:p-4 lg:p-5">
                  <p className="truncate text-[0.5rem] font-bold uppercase tracking-[0.12em] text-[#E68500] sm:text-[0.58rem] sm:tracking-[0.2em]">{product.category.name}</p>
                  <h3 className="mt-1 line-clamp-2 font-serif text-sm font-black leading-tight text-[#241209] sm:text-xl lg:text-2xl">{product.name}</h3>
                  <p className="mt-1 line-clamp-2 text-[0.68rem] leading-4 text-[#76675b] sm:mt-2 sm:text-sm sm:leading-6">{product.subtitle}</p>
                  <p className="mt-2 text-sm font-black text-[#FF9500] sm:text-lg">₦{product.price.toLocaleString()}</p>
                  <a
                    href={productWhatsApp(SOCIAL.whatsapp, product)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#25D366] px-2 py-2 text-[0.62rem] font-black text-white no-underline transition-all duration-300 hover:scale-105 hover:bg-[#1da851] sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <MessageCircle size={14} /> Ask
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filtered.length > PRODUCTS_PER_PAGE && (
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#321A0E]/10 pt-6 sm:flex-row">
            <p className="text-sm font-bold text-[#76675b]">
              Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, filtered.length)} of {filtered.length} products
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-[#321A0E]/15 px-4 py-2 text-sm font-black text-[#321A0E] transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-full text-sm font-black transition ${
                    page === currentPage
                      ? "bg-[#FF9500] text-white"
                      : "border border-[#321A0E]/15 text-[#321A0E] hover:border-[#FF9500]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full border border-[#321A0E]/15 px-4 py-2 text-sm font-black text-[#321A0E] transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-[#76675b] py-12">No products in this category yet.</p>
        )}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <p className="text-[0.72rem] font-black uppercase tracking-[0.34em] text-[#E68500]">{eyebrow}</p>
        <h2 className="mt-3 max-w-3xl font-serif text-4xl font-black leading-none tracking-[-0.055em] text-[#241209] sm:text-5xl">{title}</h2>
      </div>
      <p className="max-w-md text-sm leading-7 text-[#76675b]">{copy}</p>
    </div>
  );
}

function ContactFooter() {
  return (
    <footer className="bg-[#1C120C] px-4 pb-24 pt-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-[0.7rem] font-black uppercase tracking-[0.34em] text-[#FF9500]">Visit the store</p>
          <h2 className="mt-3 font-serif text-4xl font-black tracking-[-0.04em]">Evangel Collectibles, Owerri</h2>
          <div className="mt-6 space-y-3 text-white/75">
            <p className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-[#FF9500]" size={18} /> {SOCIAL.address}
            </p>
            <p className="flex gap-3">
              <Phone className="mt-1 shrink-0 text-[#FF9500]" size={18} />
              <a className="text-white/80" href={`tel:${SOCIAL.phone}`}>{SOCIAL.phoneDisplay}</a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-1 shrink-0 text-[#FF9500]" size={18} />
              <a className="text-white/80" href={`mailto:${SOCIAL.email}`}>{SOCIAL.email}</a>
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex gap-4">
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all hover:scale-110">
              <Instagram size={18} />
            </a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all hover:scale-110">
              <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.27 0 .53.03.77.1V8.61a6.25 6.25 0 0 0-.77-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.88a8.25 8.25 0 0 0 4.42 1.44V6.69a4.8 4.8 0 0 1-.77 0z"/>
              </svg>
            </a>
            <a href={`https://wa.me/${SOCIAL.whatsapp}`} target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-all hover:scale-110">
              <MessageCircle size={18} />
            </a>
            <a href={GOOGLE_MAPS_DIR} target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#321A0E] transition-all hover:scale-110">
              <MapIcon size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom section */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-8 text-center text-sm text-white/40">
        <p>© {new Date().getFullYear()} Evangel Collectibles. All rights reserved.</p>
        <p className="mt-1">
          <a href="/admin" className="text-white/30 hover:text-white/60 no-underline text-xs">Admin</a>
        </p>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <>
      <a href={heroWhatsApp} target="_blank" rel="noreferrer" aria-label="WhatsApp Evangel Collectibles"
        className="fixed bottom-20 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 sm:bottom-7">
        <MessageCircle size={27} />
      </a>
      <div className="fixed inset-x-3 bottom-3 z-[59] grid grid-cols-2 gap-2 rounded-full border border-white/20 bg-[#1C120C]/90 p-2 text-white shadow-2xl backdrop-blur-xl sm:hidden">
        <a href={`tel:${SOCIAL.phone}`} className="rounded-full bg-white/10 py-3 text-center text-sm font-black text-white no-underline">Call</a>
        <a href={heroWhatsApp} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] py-3 text-center text-sm font-black text-white no-underline">WhatsApp</a>
      </div>
    </>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] font-sans text-[#241209] antialiased">
      <style>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0;background:#FFFDF9}
        .luxury-icon{display:grid;height:40px;width:40px;place-items:center;border-radius:999px;border:1px solid rgba(50,26,14,.15);background:rgba(255,255,255,.45);color:#321A0E;transition:all .3s;text-decoration:none}
        .luxury-icon:hover{transform:translateY(-2px);border-color:#FF9500;color:#E68500}
        ::selection{background:rgba(255,149,0,.25);color:#321A0E}
      `}</style>
      <Header />
      <Hero />
      <Catalogue />
      <ContactFooter />
      <FloatingActions />
    </main>
  );
}
