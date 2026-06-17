EliteMotors: 3D-Powered Dealership Platform & Lead Generation Engine

This document outlines the complete architectural, design, and data-flow specifications for a high-end, responsive car sales platform tailored to the Nigerian luxury automotive market.

1. System Topology & Data Flow

                                [ THE INTERNET ]
                                        │
           ┌────────────────────────────┴────────────────────────────┐
           ▼                                                         ▼
  [ CONSUMER STOREFRONT ]                                   [ DEALER ADMIN PANEL ]
  • Hero: Interactive 3D Model                              • Live Inventory Management
    (Lexus IS-F / Toyota Sienna)                            • Scraping Configuration
  • Real-Time Color Customizer                              • "Active Buyer" Feed
  • Scroll-Down: Catalog Grid                               • Captured Hot Leads Table
  • "Inquire" Lead Capture Form                                      ▲
           │                                                         │
           ▼                                                         │
  [ WHATSAPP ROUTING HOOK ] ─────────────────► [DATABASE/API] ───────┘
  • Logs lead to backend                      • Supabase / Node.js
  • Deep-links customer directly               • Scraper dumps active
    to dealer's phone                           leads here


2. Core Functional Specifications

Pillar A: The High-End 3D Storefront (The "Wow" Factor)

The Hero Area: A deep-charcoal screen where a beautifully illuminated 3D car spins slowly. On mobile, users can pinch-to-zoom or swipe to rotate.

The AR Trigger: A floating button "View on your Lot". If clicked on a mobile phone, it launches Augmented Reality, allowing the buyer to project the 2025 Toyota Sienna directly onto their driveway or office floor.

The Interactive Paint Selector: Circle swatches (Obsidian Black, Liquid Silver, Desert Gold, Royal Burgundy) placed right under the 3D model. Tapping a swatch triggers the <model-viewer> Materials API to instantly repaint the car's body panels in real-time.

The Catalog Grid (Below the Fold): A smooth scroll transition down into a premium grid layout featuring the dealer’s active inventory. Each card displays high-quality images, key specifications (Engine, Transmission, Mileage, Import status), and an "Inquire Now" button.

Pillar B: The WhatsApp Lead Capture & Routing

When a user clicks "Inquire Now" on any listing, a modal slides up asking for their Name and WhatsApp Phone Number.

Upon clicking "Connect to Dealer":

The system makes an asynchronous call to the backend to permanently log the lead.

The frontend instantly generates a deep-link: https://wa.me/[DealerNumber]?text=[CustomMessage].

The message is dynamically formatted with Nigerian local context:

"Good day, Elite Motors. I saw your 3D listing for the [Car Name] ([Price]) and I would like to schedule an inspection. My name is [Customer Name], my phone is [Customer Phone]."

The system redirects the user straight to WhatsApp to close the deal.

Pillar C: The Automated "Active Buyer" Lead Scraper (The Hook)

This is what makes the dealer say "Yes" immediately. While they are waiting for buyers to visit their website, your backend is actively hunting for customers for them.

The Scraper Mechanism: A lightweight Node.js or Python cron-job that scrapes public listings, forums, and classified boards (like Jiji, Facebook Marketplace, or local Twitter hashtags like #CarInPH or #LagosCars) for posts containing buy-intent keywords (e.g., "looking for tokunbo Camry", "who has clean Sienna 2015 for sale", "budget 15m").

The Admin Feed: These scraped leads are automatically cleaned, parsed, and pushed into the dealer's private Admin Panel under a tab called "Live Market Demand".

The Value: The moment you launch the website for the dealer, you open the admin panel and show them: "Look, here are 12 people in Port Harcourt/Lagos who posted on the internet in the last 24 hours looking to buy the exact cars sitting on your lot right now. Here are their contact links."

3. Step-by-Step Implementation Guide

Step 1: Frontend & Typography Setup

Create a single-page layout utilizing Tailwind CSS with a dark luxury editorial theme:

Background: Deep warm charcoal/black (#09090b or #121214).

Accents: Warm champagne-gold (#d4af37 or #c5a880) for buttons, hover states, and key prices.

Headings: Playfair Display (Imported from Google Fonts) for headings and vehicle titles to give an upscale magazine feel.

Body Text: DM Sans or Inter for highly readable specifications and forms.

Step 2: Integrate the 3D Element & Script Loader

Implement a robust React component or plain HTML utility that dynamically injects Google’s <model-viewer> CDN script into the head element.

Implement a loading progress bar to prevent layout shifts while the large .glb asset loads.

Create a graceful static image fallback (using a sleek wireframe or high-end render) to display if the user has a poor internet connection, with a note: "Loading interactive 3D model..."

Step 3: Map the Color Swatch Material API

Add code to loop through the 3D model’s nodes on load. To handle unoptimized free models:

const bodyPaintMaterial = model.materials.find(material => 
  material.name.toLowerCase().includes('paint') || 
  material.name.toLowerCase().includes('body') ||
  material.name.toLowerCase().includes('exterior')
);


Bind your color buttons to update this specific material's baseColorFactor so only the metal panels change color while leaving the glass, tires, and headlights untouched.

Step 4: Secure database and hosting on 100% Free Tiers

Database: Use Supabase (free tier). Create two tables: inventory (to store car prices, specs, and image paths) and captured_leads (to store names, phone numbers, and timestamps of buyers).

Hosting: Deploy the frontend to Vercel or Netlify (completely free, lightning-fast globally, and automatically handles HTTPS).

4. The "No-Fail" Pitch Script (How to present it)

When you return to the lot to show the finished product, do not open up code. Show it to them on your mobile phone:

The Hook: "Good afternoon, Chief. I didn't just build you a website; I built you a lead-generation system. Open your phone and look at this."

The Interactive Proof: Show them the 3D Lexus. Change the color to Red. Tap "View on your space" and point the phone at their office floor. "When a buyer is at home, they can physically place your car in their compound using their phone camera."

The Immediate Value (The Scraped Leads): Open the Admin panel. "I set up a digital scout that monitors online marketplaces in Nigeria. Look here—these are 5 people who posted today looking for a Sienna or a Lexus in our area. You can call or message them right now from this dashboard."

The Close: "Let's put your phone number on this button today. The first week is completely free. Once you close your first sale from my leads, we'll talk about a small monthly subscription to keep the engine running."