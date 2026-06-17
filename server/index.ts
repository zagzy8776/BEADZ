import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = process.env.PORT || 3001;

const prisma = new PrismaClient();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Get all categories
app.get("/api/categories", async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  res.json(categories);
});

// Get all products (optional ?category=slug filter)
app.get("/api/products", async (req, res) => {
  const where = req.query.category && req.query.category !== "all"
    ? { category: { slug: req.query.category as string } }
    : {};
  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(products);
});

// Get single product by ID
app.get("/api/products/:id", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    include: { category: true },
  });
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// Create order from cart
app.post("/api/orders", async (req, res) => {
  const { items, total, summary, type, phone } = req.body;
  const order = await prisma.order.create({
    data: { items, total, summary, type: type || "cart", phone, status: "pending" },
  });
  res.json(order);
});

// Create custom build from Bespoke Atelier
app.post("/api/custom-builds", async (req, res) => {
  const { baseId, baseName, basePrice, extras, neckSize, wristSize, total, summary } = req.body;
  const build = await prisma.customBuild.create({
    data: { baseId, baseName, basePrice, extras: extras || [], neckSize, wristSize, total, summary, status: "pending" },
  });
  res.json(build);
});

// Wishlist - add
app.post("/api/wishlist", async (req, res) => {
  const { sessionId, productId } = req.body;
  const item = await prisma.wishlist.upsert({
    where: { sessionId_productId: { sessionId, productId } },
    update: {},
    create: { sessionId, productId },
  });
  res.json(item);
});

// Wishlist - remove
app.delete("/api/wishlist/:sessionId/:productId", async (req, res) => {
  await prisma.wishlist.delete({
    where: { sessionId_productId: { sessionId: req.params.sessionId, productId: req.params.productId } },
  });
  res.json({ success: true });
});

// Wishlist - get by session
app.get("/api/wishlist/:sessionId", async (req, res) => {
  const items = await prisma.wishlist.findMany({
    where: { sessionId: req.params.sessionId },
    include: { product: true },
  });
  res.json(items.map((w) => w.productId));
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", database: "connected" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});