import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Bridal", slug: "bridal", sortOrder: 1 },
  { name: "Chieftaincy", slug: "chieftaincy", sortOrder: 2 },
  { name: "Coral", slug: "coral", sortOrder: 3 },
  { name: "Accessories", slug: "accessories", sortOrder: 4 },
  { name: "Bespoke", slug: "custom", sortOrder: 5 },
];

const products = [
  { name: "Royal Coral Necklace", subtitle: "Five-Strand Bridal · Authentic Coral", price: 185000, categorySlug: "bridal", badge: "Bestseller", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=750&fit=crop&auto=format", inStock: true },
  { name: "Ozo Title Regalia", subtitle: "Chieftaincy Complete Set", price: 420000, categorySlug: "chieftaincy", badge: "Exclusive", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=750&fit=crop&auto=format", inStock: true },
  { name: "Igbo Bridal Ensemble", subtitle: "Seven-Piece Wedding Collection", price: 650000, categorySlug: "bridal", badge: "New", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=750&fit=crop&auto=format", inStock: true },
  { name: "Coral Crown", subtitle: "Royal Handwoven Tiara", price: 280000, categorySlug: "chieftaincy", badge: null, image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=750&fit=crop&auto=format", inStock: true },
  { name: "Wrist & Ankle Set", subtitle: "Authentic Coral Pair", price: 48000, categorySlug: "accessories", badge: null, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=750&fit=crop&auto=format", inStock: true },
  { name: "Nza Chieftaincy Staff", subtitle: "Ceremonial · Carved & Beaded", price: 195000, categorySlug: "chieftaincy", badge: "Rare", image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=600&h=750&fit=crop&auto=format", inStock: false },
  { name: "Classic Single Strand", subtitle: "Everyday Luxury · Genuine Coral", price: 38500, categorySlug: "coral", badge: null, image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&h=750&fit=crop&auto=format", inStock: true },
  { name: "Bespoke Commission", subtitle: "Custom · 6–8 Weeks", price: 0, categorySlug: "custom", badge: "Custom", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=750&fit=crop&auto=format", inStock: true },
];

async function main() {
  console.log("Seeding database...");

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`✓ ${categories.length} categories created`);

  for (const product of products) {
    const category = await prisma.category.findUnique({ where: { slug: product.categorySlug } });
    if (!category) throw new Error(`Category ${product.categorySlug} not found`);
    
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        id: product.name.toLowerCase().replace(/\s+/g, "-"),
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        categoryId: category.id,
        badge: product.badge,
        image: product.image,
        inStock: product.inStock,
      },
    });
  }
  console.log(`✓ ${products.length} products created`);
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });