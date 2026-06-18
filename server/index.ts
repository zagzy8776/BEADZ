import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Simple admin password (option 1 you chose)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "evangel2026";

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error("Only image files (jpg, png, gif, webp, svg) are allowed"));
  },
});

// ============== ADMIN AUTH MIDDLEWARE ==============
function adminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token === ADMIN_PASSWORD) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

// ============== PUBLIC API ==============

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", database: "connected" });
});

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

// Get all testimonials (public)
app.get("/api/testimonials", async (_req, res) => {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });
  res.json(testimonials);
});

// Get gallery images (public)
app.get("/api/gallery", async (req, res) => {
  const section = req.query.section as string || "lookbook";
  const images = await prisma.galleryImage.findMany({
    where: { section },
    orderBy: { sortOrder: "asc" },
  });
  res.json(images);
});

// Create order from cart
app.post("/api/orders", async (req, res) => {
  const { items, total, summary, type, phone, customerName, customerEmail } = req.body;
  const order = await prisma.order.create({
    data: {
      items,
      total,
      summary,
      type: type || "cart",
      phone,
      status: "pending",
    },
  });
  res.json(order);
});

// WhatsApp inquiry tracking
app.post("/api/inquiry", async (req, res) => {
  const { productId, productName, customerName, phone } = req.body;
  // Log inquiry (could store in DB later if needed)
  console.log(`📩 Inquiry: ${customerName} (${phone}) asked about ${productName} (${productId})`);
  res.json({ success: true });
});

// ============== ADMIN API ==============

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_PASSWORD, success: true });
  }
  return res.status(401).json({ error: "Invalid password" });
});

// Upload image
app.post("/api/admin/upload", adminAuth, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const url = `/uploads/${req.file.filename}`;
  const fullUrl = `${req.protocol}://${req.get("host")}${url}`;
  res.json({ url, fullUrl, filename: req.file.filename });
});

// Upload multiple images
app.post("/api/admin/upload-multiple", adminAuth, upload.array("images", 20), (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) return res.status(400).json({ error: "No files uploaded" });
  const urls = files.map((f) => ({
    url: `/uploads/${f.filename}`,
    fullUrl: `${req.protocol}://${req.get("host")}/uploads/${f.filename}`,
    filename: f.filename,
  }));
  res.json({ images: urls });
});

// Products CRUD
app.get("/api/admin/products", adminAuth, async (_req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(products);
});

app.post("/api/admin/products", adminAuth, async (req, res) => {
  const { name, subtitle, price, categoryId, badge, image, inStock, description } = req.body;
  const product = await prisma.product.create({
    data: {
      id: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      name,
      subtitle,
      price: parseFloat(price),
      categoryId,
      badge,
      image,
      inStock: inStock !== false,
      description,
    },
    include: { category: true },
  });
  res.json(product);
});

app.put("/api/admin/products/:id", adminAuth, async (req, res) => {
  const { name, subtitle, price, categoryId, badge, image, inStock, description } = req.body;
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: {
      name,
      subtitle,
      price: parseFloat(price),
      categoryId,
      badge,
      image,
      inStock: inStock !== false,
      description,
    },
    include: { category: true },
  });
  res.json(product);
});

app.delete("/api/admin/products/:id", adminAuth, async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Categories CRUD
app.get("/api/admin/categories", adminAuth, async (_req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
  res.json(categories);
});

app.post("/api/admin/categories", adminAuth, async (req, res) => {
  const { name, slug, sortOrder } = req.body;
  const category = await prisma.category.create({
    data: { name, slug, sortOrder: sortOrder || 0 },
  });
  res.json(category);
});

app.put("/api/admin/categories/:id", adminAuth, async (req, res) => {
  const { name, slug, sortOrder } = req.body;
  const category = await prisma.category.update({
    where: { id: req.params.id },
    data: { name, slug, sortOrder },
  });
  res.json(category);
});

app.delete("/api/admin/categories/:id", adminAuth, async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Orders CRUD
app.get("/api/admin/orders", adminAuth, async (_req, res) => {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  res.json(orders);
});

app.put("/api/admin/orders/:id", adminAuth, async (req, res) => {
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json(order);
});

app.delete("/api/admin/orders/:id", adminAuth, async (req, res) => {
  await prisma.order.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Testimonials CRUD
app.get("/api/admin/testimonials", adminAuth, async (_req, res) => {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  res.json(testimonials);
});

app.post("/api/admin/testimonials", adminAuth, async (req, res) => {
  const { name, role, quote, image, rating, sortOrder } = req.body;
  const testimonial = await prisma.testimonial.create({
    data: { name, role, quote, image, rating: rating || 5, sortOrder: sortOrder || 0 },
  });
  res.json(testimonial);
});

app.put("/api/admin/testimonials/:id", adminAuth, async (req, res) => {
  const { name, role, quote, image, rating, sortOrder } = req.body;
  const testimonial = await prisma.testimonial.update({
    where: { id: req.params.id },
    data: { name, role, quote, image, rating, sortOrder },
  });
  res.json(testimonial);
});

app.delete("/api/admin/testimonials/:id", adminAuth, async (req, res) => {
  await prisma.testimonial.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Gallery CRUD
app.get("/api/admin/gallery", adminAuth, async (_req, res) => {
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
  res.json(images);
});

app.post("/api/admin/gallery", adminAuth, async (req, res) => {
  const { url, caption, section, sortOrder } = req.body;
  const image = await prisma.galleryImage.create({
    data: { url, caption, section: section || "lookbook", sortOrder: sortOrder || 0 },
  });
  res.json(image);
});

app.delete("/api/admin/gallery/:id", adminAuth, async (req, res) => {
  await prisma.galleryImage.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// ============== START SERVER ==============
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});