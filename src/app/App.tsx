import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import type { ReactNode } from "react";

const phoneDisplay = "+234 803 879 7915";
const phoneLink = "+2348038797915";
const email = "Evangelcollectibles@gmail.com";
const address = "Orji flyover opposite Ebere Links fuel station";

function wa(message: string) {
  return `https://wa.me/2348038797915?text=${encodeURIComponent(message)}`;
}

const heroWhatsApp = wa("Hello Evangel Collectibles, I would like to shop, rent, or request event catering.");

const catalogue = [
  ["Bridal Coral Sets", "Layered red/white coral beads, earrings, wrist stacks and royal bridal accents.", "Custom order", "Bridal"],
  ["Chieftaincy Regalia", "Caps, walking sticks, hand fans and premium title-taking finishing pieces.", "Quote", "Royal"],
  ["Kids Cultural Day", "Complete school cultural-day costume rentals for boys and girls.", "Rental", "Kids"],
  ["Adult Traditional Wear", "Isiagu, wrappers, accessories and statement looks for ceremonies.", "Rental", "Adult"],
  ["Ceremonial Accessories", "Beaded crowns, coral wristwear, fans, staffs and finishing details.", "Available", "Accessories"],
  ["Outdoor Catering", "Traditional food presentation, buffet setup and event service support.", "Event quote", "Catering"],
];

const services = [
  ["Bespoke Coral & Regalia Sales", "Signature atelier", "Luxury coral beadwork, bridal sets, chieftaincy caps, walking sticks and ceremonial accessories crafted with heritage detail."],
  ["Event & Costume Rentals", "Adults & kids", "Traditional attire rentals for cultural days, weddings, title-taking, birthdays, photoshoots and premium public appearances."],
  ["Outdoor Catering Services", "Celebration desk", "Outdoor traditional catering, buffet presentation, event service coordination and premium quote planning."],
];

const testimonials = [
  ["My bridal coral set looked royal and complete. The beads carried the whole traditional wedding look.", "Chidinma", "Traditional bride"],
  ["They sorted my children's cultural day attire quickly. Beautiful pieces, clean fitting and stress-free pickup.", "Ngozi", "Parent in Owerri"],
  ["The regalia and staff had presence. Evangel Collectibles understands cultural elegance.", "Chief Emeka", "Title ceremony client"],
];

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
          <a href={`tel:${phoneLink}`} aria-label="Call" className="luxury-icon"><Phone size={18} /></a>
          <button aria-label="Favorites" className="luxury-icon"><Heart size={18} /></button>
          <button aria-label="Cart" className="luxury-icon relative"><ShoppingBag size={18} /><span className="absolute -right-1 -top-1 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#FF9500] text-[10px] font-black text-white">1</span></button>
          <a href="#sections" aria-label="Menu" className="luxury-icon"><Menu size={19} /></a>
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
          <div className="mt-10 grid max-w-xl grid-cols-3 overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">
            {[["Owerri", "Store base"], ["Custom", "Bridal orders"], ["Rental", "Adults & kids"]].map(([a, b]) => <div key={a} className="border-r border-white/10 p-4 last:border-r-0"><p className="font-serif text-2xl font-black">{a}</p><p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-white/55">{b}</p></div>)}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[510px]">
          <div className="absolute -inset-8 rounded-full bg-[#FF9500]/20 blur-3xl" />
          <div className="relative rotate-1 overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/40 backdrop-blur-md transition-all duration-500 hover:rotate-0">
            <img src="/evangel.jpeg" alt="Evangel Collectibles cultural luxury" className="h-[470px] w-full rounded-[1.7rem] object-cover blur-[0.45px]" />
            <div className="absolute bottom-7 left-7 right-7 rounded-3xl border border-white/15 bg-[#1c120c]/75 p-5 backdrop-blur-xl"><p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-[#FF9500]">Luxury heritage studio</p><p className="mt-2 font-serif text-3xl font-black leading-none">Beads · Attire · Rentals · Catering</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Catalogue() {
  return (
    <section id="catalogue" className="bg-[#FFFDF9] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Premium catalogue" title="Everything she sells, arranged like a high-end cultural store." copy="These cards use safe branded placeholders for now. When you send real shop photos, we will swap them in and the site will look even richer." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {catalogue.map(([title, text, price, tag]) => (
            <article key={title} className="group overflow-hidden rounded-[1.8rem] border border-[#321A0E]/10 bg-white shadow-[0_18px_60px_rgba(50,26,14,0.08)] transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eadbc7]"><img src="/evangel.jpeg" alt={title} className="h-full w-full object-cover blur-[0.55px] transition-all duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">{tag}</span><p className="absolute bottom-4 left-4 rounded-full bg-[#FF9500] px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.18em] text-white">{price}</p></div>
              <div className="p-6"><h3 className="font-serif text-3xl font-black leading-tight text-[#241209]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#76675b]">{text}</p><a href={wa(`Hello Evangel Collectibles, I am interested in ${title}.`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#321A0E]/15 px-5 py-3 text-sm font-black text-[#321A0E] no-underline transition-all duration-300 hover:bg-[#FF9500] hover:text-white">Inquire <ArrowRight size={15} /></a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-[0.72rem] font-black uppercase tracking-[0.34em] text-[#E68500]">{eyebrow}</p><h2 className="mt-3 max-w-3xl font-serif text-4xl font-black leading-none tracking-[-0.055em] text-[#241209] sm:text-5xl">{title}</h2></div><p className="max-w-md text-sm leading-7 text-[#76675b]">{copy}</p></div>;
}

function Services() {
  return <section id="sections" className="bg-[#f7efe4] px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Operations" title="Sales, rentals and events in one premium brand." copy="A clear service structure helps customers know exactly how to contact her for beads, attire or catering." /><div className="grid gap-5 md:grid-cols-3">{services.map(([title, tag, text]) => <article key={title} className="rounded-[2rem] border border-[#321A0E]/10 bg-[#FFFDF9] p-7 shadow-[0_18px_60px_rgba(50,26,14,0.07)]"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#321A0E] text-[#FF9500]"><Star size={18} fill="currentColor" /></div><p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-[#E68500]">{tag}</p><h3 className="mt-3 font-serif text-3xl font-black leading-none tracking-[-0.04em] text-[#241209]">{title}</h3><p className="mt-5 text-sm leading-7 text-[#76675b]">{text}</p></article>)}</div></div></section>;
}

function BookingForms() {
  const rentalMsg = wa("Hello Evangel Collectibles, I want to book a rental. Event type: __. Date: __. Adult/Kid: __. Size/Age: __. Pickup date: __. Return date: __.");
  const cateringMsg = wa("Hello Evangel Collectibles, I need an outdoor catering quote. Event date: __. Location: __. Guest count: __. Menu style: __. Budget range: __.");
  return <section className="bg-[#FFFDF9] px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Fast booking" title="Rental booking and catering quote flows." copy="Buttons open WhatsApp with prepared messages, so customers can send proper details without stress." /><div className="grid gap-5 lg:grid-cols-2"><QuoteCard icon={<CalendarDays />} title="Book cultural attire rental" points={["Event date and type", "Adult or child sizing", "Pickup and return date", "Photoshoot, wedding, cultural day or ceremony"]} href={rentalMsg} label="Send rental request" /><QuoteCard icon={<Sparkles />} title="Request catering quote" points={["Guest count and event location", "Traditional menu preference", "Outdoor buffet/service style", "Budget range and celebration date"]} href={cateringMsg} label="Send catering request" /></div></div></section>;
}

function QuoteCard({ icon, title, points, href, label }: { icon: ReactNode; title: string; points: string[]; href: string; label: string }) {
  return <article className="rounded-[2rem] border border-[#321A0E]/10 bg-[#1C120C] p-7 text-white shadow-2xl shadow-[#321A0E]/15"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF9500] text-white">{icon}</div><h3 className="font-serif text-4xl font-black tracking-[-0.04em]">{title}</h3><div className="mt-6 grid gap-3">{points.map((p) => <p key={p} className="flex items-center gap-3 text-sm text-white/75"><CheckCircle2 size={17} className="text-[#FF9500]" />{p}</p>)}</div><a href={href} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-black text-white no-underline transition-all duration-300 hover:scale-105">{label} <MessageCircle size={18} /></a></article>;
}

function LookbookTestimonials() {
  return <section className="bg-[#f7efe4] px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Lookbook & trust" title="Make the shop feel full, active and trusted." copy="This area is ready for real in-shop photos. For now, the logo image is used as a blurred branded placeholder." /><div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"><div className="grid grid-cols-2 gap-4">{["Bridal corner", "Attire rack", "Kids rentals", "Event setup"].map((x, i) => <div key={x} className={`relative overflow-hidden rounded-[1.5rem] bg-[#321A0E] ${i === 0 ? "row-span-2" : ""}`}><img src="/evangel.jpeg" alt={x} className="h-full min-h-[210px] w-full object-cover opacity-80 blur-[0.45px]" /><div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" /><p className="absolute bottom-4 left-4 font-serif text-2xl font-black text-white">{x}</p></div>)}</div><div className="grid gap-4">{testimonials.map(([quote, name, role]) => <article key={name} className="rounded-[1.5rem] border border-[#321A0E]/10 bg-[#FFFDF9] p-6"><p className="font-serif text-2xl font-black leading-tight text-[#241209]">“{quote}”</p><p className="mt-4 text-sm font-black text-[#E68500]">{name}</p><p className="text-xs uppercase tracking-[0.2em] text-[#76675b]">{role}</p></article>)}</div></div></div></section>;
}

function ContactFooter() {
  return <footer className="bg-[#1C120C] px-4 pb-24 pt-14 text-white sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.2fr] md:items-end"><div><p className="text-[0.7rem] font-black uppercase tracking-[0.34em] text-[#FF9500]">Visit the store</p><h2 className="mt-3 font-serif text-4xl font-black tracking-[-0.04em]">Evangel Collectibles, Owerri</h2><div className="mt-6 space-y-3 text-white/75"><p className="flex gap-3"><MapPin className="mt-1 shrink-0 text-[#FF9500]" size={18} /> {address}</p><p className="flex gap-3"><Phone className="mt-1 shrink-0 text-[#FF9500]" size={18} /> <a className="text-white/80" href={`tel:${phoneLink}`}>{phoneDisplay}</a></p><p className="flex gap-3"><Mail className="mt-1 shrink-0 text-[#FF9500]" size={18} /> <a className="text-white/80" href={`mailto:${email}`}>{email}</a></p></div></div><div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl"><p className="font-serif text-3xl font-black">Ready for bridal beads, cultural rentals or event catering?</p><a href={heroWhatsApp} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-black text-white no-underline transition-all duration-300 hover:scale-105">Chat on WhatsApp <MessageCircle size={18} /></a></div></div></footer>;
}

function FloatingActions() {
  return <><a href={heroWhatsApp} target="_blank" rel="noreferrer" aria-label="WhatsApp Evangel Collectibles" className="fixed bottom-20 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 sm:bottom-7"><MessageCircle size={27} /></a><div className="fixed inset-x-3 bottom-3 z-[59] grid grid-cols-2 gap-2 rounded-full border border-white/20 bg-[#1C120C]/90 p-2 text-white shadow-2xl backdrop-blur-xl sm:hidden"><a href={`tel:${phoneLink}`} className="rounded-full bg-white/10 py-3 text-center text-sm font-black text-white no-underline">Call</a><a href={heroWhatsApp} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] py-3 text-center text-sm font-black text-white no-underline">WhatsApp</a></div></>;
}

export default function App() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] font-sans text-[#241209] antialiased">
      <style>{`*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#FFFDF9}.luxury-icon{display:grid;height:40px;width:40px;place-items:center;border-radius:999px;border:1px solid rgba(50,26,14,.15);background:rgba(255,255,255,.45);color:#321A0E;transition:all .3s;text-decoration:none}.luxury-icon:hover{transform:translateY(-2px);border-color:#FF9500;color:#E68500}::selection{background:rgba(255,149,0,.25);color:#321A0E}`}</style>
      <Header />
      <Hero />
      <Catalogue />
      <Services />
      <BookingForms />
      <LookbookTestimonials />
      <ContactFooter />
      <FloatingActions />
    </main>
  );
}