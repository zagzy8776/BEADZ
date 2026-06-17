# Royal Beads Luxury - Traditional Nigerian Beads E-commerce

A luxury e-commerce platform for traditional Nigerian beads, bridal sets, and chieftaincy regalia, built with Next.js 16, TypeScript, and Tailwind CSS.

## 🌟 Features

### Phase 1: Project Initialization & Seed Data
- ✅ Next.js 16 with App Router and TypeScript
- ✅ Tailwind CSS v4 with custom luxury theme
- ✅ Elegant typography (Playfair Display + Inter)
- ✅ Structured product database with 16 traditional bead products
- ✅ Categories: Bridal, Chieftaincy, Accessories

### Phase 2: Core State & WhatsApp Checkout
- ✅ React Context for cart management
- ✅ Custom measurements tracking (Neck Size, Wrist Size, Head Circumference)
- ✅ WhatsApp Business API integration for checkout
- ✅ Professional order message formatting
- ✅ Real-time cart drawer with quantity controls

### Phase 3: Interactive Bead Set Builder
- ✅ Custom bridal set builder component
- ✅ Live price calculation
- ✅ Component selection (Necklace, Crown, Wrist Cuffs, Horsewhip, Staff)
- ✅ Measurement input form
- ✅ Add custom bundle to cart

### Phase 4: Localized SEO & Metadata
- ✅ Optimized metadata for Owerri, Imo State
- ✅ JSON-LD schema for local JewelryStore
- ✅ Local business information (address, coordinates, opening hours)
- ✅ Open Graph and Twitter Card support
- ✅ Local keywords targeting Nigerian market

### Phase 5: Complete Page Assembly
- ✅ Luxury landing page with hero section
- ✅ Featured products grid
- ✅ Custom builder section
- ✅ Store highlight section
- ✅ Product catalog with client-side filtering
- ✅ Category-based filtering (Bridal, Chieftaincy, Accessories)
- ✅ Sorting options (Price, Name)
- ✅ Next.js Image optimization throughout

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2.9 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Fonts:** Playfair Display (serif), Inter (sans-serif)
- **State Management:** React Context API
- **Images:** Next.js Image component with optimization

## 📁 Project Structure

```
my-next-app/
├── src/
│   ├── app/
│   │   ├── catalog/
│   │   │   └── page.tsx          # Product catalog with filters
│   │   ├── globals.css            # Global styles & luxury theme
│   │   ├── layout.tsx             # Root layout with SEO & JSON-LD
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── CartDrawer.tsx         # Cart sidebar with WhatsApp checkout
│   │   ├── CustomBuilder.tsx      # Interactive bridal set builder
│   │   ├── Footer.tsx             # Site footer
│   │   ├── Header.tsx             # Navigation header
│   │   ├── Hero.tsx               # Hero section
│   │   └── ProductCard.tsx        # Product card component
│   ├── context/
│   │   └── CartContext.tsx        # Cart state management
│   ├── data/
│   │   └── products.ts            # Product database & types
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   └── lib/
│       └── utils.ts               # Utility functions
├── public/
│   └── images/
│       └── placeholder.svg        # Placeholder image
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd my-next-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design System

### Colors
- **Gold:** #c9a962 (Primary accent)
- **Gold Dark:** #a68b4b
- **Gold Light:** #e8d5a3
- **Coral:** #8b2942 (Secondary accent)
- **Cream:** #faf8f5 (Background)
- **Rich Brown:** #3d2b1f

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### Components
- `.btn-luxury` - Primary gold gradient button
- `.btn-luxury-outline` - Outlined gold button
- `.product-card` - Product card with hover effects
- `.shimmer-text` - Animated gold text effect

## 📦 Product Data

The application includes 16 pre-loaded products across 3 categories:

### Bridal Collection (5 products)
- Royal Bridal Coral Necklace Set - ₦250,000
- Complete Igbo Bridal Bead Set - ₦450,000
- Coral Beaded Bridal Crown - ₦120,000
- Beaded Wrist Cuffs (Pair) - ₦65,000
- Bridal Coral Earrings - ₦45,000

### Chieftaincy Collection (5 products)
- Chieftaincy Royal Coral Necklace - ₦500,000
- Royal Beaded Crown of Office - ₦350,000
- Beaded Staff of Office (Nza) - ₦280,000
- Beaded Horsewhip (Nza) - ₦150,000
- Chieftaincy Beaded Anklets - ₦85,000

### Accessories (6 products)
- Coral Beaded Clutch Purse - ₦75,000
- Traditional Beaded Belt - ₦55,000
- Coral Beaded Hair Vine - ₦40,000
- Beaded Brooch Pin - ₦35,000
- Coral Beaded Choker - ₦95,000
- Beaded Headband - ₦30,000

## 🛒 Cart & Checkout Flow

1. User adds products to cart
2. For customizable items, user provides measurements (cm)
3. Cart drawer shows items with quantity controls
4. "Order via WhatsApp" button compiles order details
5. User is redirected to WhatsApp with pre-filled message

### WhatsApp Message Format
```
🏰 ROYAL BEADS LUXURY - ORDER REQUEST

1. Product Name
   💰 Price: ₦XXX,XXX
   📦 Quantity: X
   📏 Measurements:
     • Neck Size: 40cm

💎 GRAND TOTAL: ₦XXX,XXX

📍 Pickup Location: Near Wetheral Road / Douglas Road, Owerri
📞 Contact: +234 XXX XXX XXXX
🕒 Opening Hours: Mon - Sat: 9:00 AM - 6:00 PM
```

## 🎯 Custom Bridal Set Builder

Users can build a custom bridal set by selecting components:

- **Base Coral Necklace** - ₦150,000 (always included)
- **Royal Beaded Crown** - +₦80,000
- **Beaded Wrist Cuffs** - +₦45,000
- **Beaded Horsewhip** - +₦65,000
- **Beaded Staff** - +₦120,000

**Example Total:** Full set = ₦460,000

## 📍 Local SEO (Owerri, Imo State)

The application is optimized for local search with:

- **Business Name:** Royal Beads Luxury
- **Location:** Near Wetheral Road / Douglas Road, Owerri
- **Coordinates:** 5.4840°N, 7.0353°E
- **Phone:** +234 801 234 5678
- **Hours:** Monday - Saturday, 9:00 AM - 6:00 PM
- **Price Range:** ₦₦₦ (High-end)

### Target Keywords
- traditional beads Owerri
- coral beads Nigeria
- bridal sets Imo State
- chieftaincy beads
- royal jewelry Owerri
- Igbo traditional beads

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
WHATSAPP_PHONE=2348012345678
STORE_ADDRESS="Near Wetheral Road / Douglas Road, Owerri"
STORE_PHONE="+234 801 234 5678"
```

### Tailwind Configuration
The project uses Tailwind CSS v4 with custom theme in `globals.css`:

```css
:root {
  --color-gold: #c9a962;
  --color-gold-dark: #a68b4b;
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Inter', sans-serif;
}
```

## 📱 Responsive Design

The application is fully responsive:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons and interactions
- Optimized images for mobile data

## 🚧 Future Enhancements

- [ ] Product detail pages
- [ ] Image gallery with zoom
- [ ] Customer reviews section
- [ ] Related products recommendations
- [ ] Order tracking system
- [ ] Multiple language support (Igbo, English)
- [ ] Payment gateway integration (Paystack, Flutterwave)
- [ ] Admin dashboard for inventory management

## 📄 License

This project is proprietary and confidential.

## 👨‍💻 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🤝 Contributing

This is a private project. For inquiries, contact the development team.

---

**Built with ❤️ for Royal Beads Luxury, Owerri**