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

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "evangel2026";
const BANK_NAME = process.env.BANK_NAME || "Access Bank";
const ACCOUNT_NUMBER = process.env.ACCOUNT_NUMBER || "1234567890";
const ACCOUNT_NAME = "Evangel Collectibles";

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

// Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
  },
});
const upload = multer({
  storage, limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error("Only images allowed"));
  },
});

// Admin auth middleware
function adminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token === ADMIN_PASSWORD) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

// ============== PUBLIC API ==============

app.get("/api/health", (_req, res) => res.json({ status: "ok", database: "connected" }));

// Bank details (for transfer checkout)
app.get("/api/bank-details", (_req, res) => {
  res.json({ bank: BANK_NAME, accountNumber: ACCOUNT_NUMBER, accountName: ACCOUNT_NAME });
});

// Categories
app.get("/api/categories", async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  res.json(categories);
});

// Products with variants
app.get("/api/products", async (req, res) => {
  const where = req.query.category && req.query.category !== "all"
    ? { category: { slug: req.query.category as string } }
    : {};
  const products = await prisma.product.findMany({
    where, include: { category: true, variants: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    include: { category: true, variants: { orderBy: { sortOrder: "asc" } } },
  });
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

// Cart
app.get("/api/cart/:sessionId", async (req, res) => {
  const items = await prisma.cartItem.findMany({
    where: { sessionId: req.params.sessionId },
    include: { product: { include: { variants: true } } },
  });
  res.json(items);
});

app.post("/api/cart", async (req, res) => {
  const { sessionId, productId, variantId, quantity } = req.body;
  const item = await prisma.cartItem.upsert({
    where: { sessionId_productId_variantId: { sessionId, productId, variantId: variantId || "" } },
    update: { quantity: { increment: quantity || 1 } },
    create: { sessionId, productId, variantId: variantId || null, quantity: quantity || 1 },
  });
  res.json(item);
});

app.put("/api/cart/:id", async (req, res) => {
  const { quantity } = req.body;
  const item = await prisma.cartItem.update({ where: { id: req.params.id }, data: { quantity } });
  res.json(item);
});

app.delete("/api/cart/:id", async (req, res) => {
  await prisma.cartItem.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

app.delete("/api/cart/clear/:sessionId", async (req, res) => {
  await prisma.cartItem.deleteMany({ where: { sessionId: req.params.sessionId } });
  res.json({ success: true });
});

// Validate coupon
app.post("/api/validate-coupon", async (req, res) => {
  const { code, total } = req.body;
  const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
  if (!coupon || !coupon.active) return res.json({ valid: false, error: "Invalid coupon" });
  if (coupon.expiresAt && coupon.expiresAt < new Date()) return res.json({ valid: false, error: "Coupon expired" });
  if (coupon.usedCount >= coupon.maxUses) return res.json({ valid: false, error: "Coupon fully used" });
  if (total < coupon.minAmount) return res.json({ valid: false, error: `Minimum order: ₦${coupon.minAmount.toLocaleString()}` });
  const discount = coupon.type === "percentage" ? (total * coupon.discount) / 100 : coupon.discount;
  res.json({ valid: true, discount, couponCode: coupon.code });
});

// Create order (transfer checkout)
app.post("/api/orders", async (req, res) => {
  const { sessionId, items, total, customerName, phone, email, address, couponCode, discount } = req.body;
  const order = await prisma.order.create({
    data: {
      items, total, type: "transfer", customerName, phone, email, address,
      status: "pending", couponCode, discount: discount || 0,
    },
  });

  // Create order items
  for (const item of items) {
    await prisma.orderItem.create({
      data: {
        orderId: order.id, productId: item.productId,
        variantId: item.variantId || null, quantity: item.quantity, price: item.price,
      },
    });
    // Decrement stock
    await prisma.product.update({ where: { id: item.productId }, data: { stockCount: { decrement: item.quantity } } });
  }

  // Track/update customer
  if (phone) {
    const existing = await prisma.customer.findUnique({ where: { phone } });
    if (existing) {
      await prisma.customer.update({ where: { phone }, data: { totalSpent: { increment: total }, orderCount: { increment: 1 }, lastOrderAt: new Date(), name: customerName || existing.name } });
    } else {
      await prisma.customer.create({ data: { phone, name: customerName, email, address, totalSpent: total, orderCount: 1, lastOrderAt: new Date() } });
    }
  }

  // Increment coupon usage
  if (couponCode) {
    await prisma.coupon.update({ where: { code: couponCode }, data: { usedCount: { increment: 1 } } });
  }

  // Clear cart
  if (sessionId) await prisma.cartItem.deleteMany({ where: { sessionId } });

  res.json(order);
});

// Get order by ID (for receipt)
app.get("/api/orders/:id", async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { orderItems: { include: { product: true } } },
  });
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
});

// Testimonials
app.get("/api/testimonials", async (_req, res) => {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  res.json(testimonials);
});

// Gallery
app.get("/api/gallery", async (req, res) => {
  const section = req.query.section as string || "lookbook";
  const images = await prisma.galleryImage.findMany({ where: { section }, orderBy: { sortOrder: "asc" } });
  res.json(images);
});

// ============== ADMIN API ==============

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) return res.json({ token: ADMIN_PASSWORD, success: true });
  return res.status(401).json({ error: "Invalid password" });
});

// Upload
app.post("/api/admin/upload", adminAuth, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: `/uploads/${req.file.filename}`, fullUrl, filename: req.file.filename });
});

app.post("/api/admin/upload-multiple", adminAuth, upload.array("images", 20), (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files?.length) return res.status(400).json({ error: "No files" });
  const images = files.map((f) => ({ url: `/uploads/${f.filename}`, fullUrl: `${req.protocol}://${req.get("host")}/uploads/${f.filename}`, filename: f.filename }));
  res.json({ images });
});

// Products
app.get("/api/admin/products", adminAuth, async (_req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true, variants: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(products);
});

app.post("/api/admin/products", adminAuth, async (req, res) => {
  const { name, subtitle, price, categoryId, badge, image, inStock, stockCount, description, variants } = req.body;
  const product = await prisma.product.create({
    data: {
      id: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      name, subtitle, price: parseFloat(price), categoryId, badge, image,
      inStock: inStock !== false, stockCount: stockCount || 0, description,
    },
    include: { category: true },
  });
  // Create variants
  if (variants?.length) {
    for (const v of variants) {
      await prisma.productVariant.create({ data: { productId: product.id, ...v, price: parseFloat(v.price) } });
    }
  }
  const full = await prisma.product.findUnique({ where: { id: product.id }, include: { category: true, variants: true } });
  res.json(full);
});

app.put("/api/admin/products/:id", adminAuth, async (req, res) => {
  const { name, subtitle, price, categoryId, badge, image, inStock, stockCount, description, variants } = req.body;
  await prisma.product.update({
    where: { id: req.params.id },
    data: { name, subtitle, price: parseFloat(price), categoryId, badge, image, inStock: inStock !== false, stockCount: stockCount || 0, description },
  });
  // Replace variants
  await prisma.productVariant.deleteMany({ where: { productId: req.params.id } });
  if (variants?.length) {
    for (const v of variants) {
      await prisma.productVariant.create({ data: { productId: req.params.id, name: v.name, price: parseFloat(v.price), inStock: v.inStock !== false, sortOrder: v.sortOrder || 0 } });
    }
  }
  const full = await prisma.product.findUnique({ where: { id: req.params.id }, include: { category: true, variants: true } });
  res.json(full);
});

app.delete("/api/admin/products/:id", adminAuth, async (req, res) => {
  await prisma.productVariant.deleteMany({ where: { productId: req.params.id } });
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Categories
app.get("/api/admin/categories", adminAuth, async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" }, include: { _count: { select: { products: true } } } });
  res.json(categories);
});
app.post("/api/admin/categories", adminAuth, async (req, res) => {
  const { name, slug, sortOrder } = req.body;
  res.json(await prisma.category.create({ data: { name, slug, sortOrder: sortOrder || 0 } }));
});
app.put("/api/admin/categories/:id", adminAuth, async (req, res) => {
  const { name, slug, sortOrder } = req.body;
  res.json(await prisma.category.update({ where: { id: req.params.id }, data: { name, slug, sortOrder } }));
});
app.delete("/api/admin/categories/:id", adminAuth, async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Orders
app.get("/api/admin/orders", adminAuth, async (_req, res) => {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, include: { items: { include: { product: true } } } });
  res.json(orders);
});
app.put("/api/admin/orders/:id", adminAuth, async (req, res) => {
  const { status } = req.body;
  res.json(await prisma.order.update({ where: { id: req.params.id }, data: { status } }));
});
app.delete("/api/admin/orders/:id", adminAuth, async (req, res) => {
  await prisma.order.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Customers
app.get("/api/admin/customers", adminAuth, async (_req, res) => {
  const customers = await prisma.customer.findMany({ orderBy: { lastOrderAt: "desc" } });
  res.json(customers);
});

// Coupons
app.get("/api/admin/coupons", adminAuth, async (_req, res) => {
  res.json(await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } }));
});
app.post("/api/admin/coupons", adminAuth, async (req, res) => {
  const { code, discount, type, minAmount, maxUses, expiresAt } = req.body;
  res.json(await prisma.coupon.create({
    data: { code: code.toUpperCase(), discount: parseFloat(discount), type: type || "percentage", minAmount: parseFloat(minAmount || 0), maxUses: parseInt(maxUses || 100), expiresAt: expiresAt ? new Date(expiresAt) : null },
  }));
});
app.delete("/api/admin/coupons/:id", adminAuth, async (req, res) => {
  await prisma.coupon.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Dashboard stats
app.get("/api/admin/stats", adminAuth, async (_req, res) => {
  const totalOrders = await prisma.order.count();
  const totalRevenue = await prisma.order.aggregate({ _sum: { total: true } });
  const totalCustomers = await prisma.customer.count();
  const totalProducts = await prisma.product.count();
  
  // Revenue by day (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentOrders = await prisma.order.findMany({ where: { createdAt: { gte: sevenDaysAgo } }, select: { total: true, createdAt: true } });
  
  const dailyRevenue: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    dailyRevenue[d.toISOString().split("T")[0]] = 0;
  }
  for (const o of recentOrders) {
    const day = o.createdAt.toISOString().split("T")[0];
    if (dailyRevenue[day] !== undefined) dailyRevenue[day] += o.total;
  }

  // Top products
  const orderItems = await prisma.orderItem.groupBy({ by: ["productId"], _sum: { quantity: true }, orderBy: { _sum: { quantity: "desc" } }, take: 10 });
  const topProductIds = orderItems.map((i) => i.productId);
  const topProducts = await prisma.product.findMany({ where: { id: { in: topProductIds } }, select: { id: true, name: true, image: true, price: true } });
  const topSellers = orderItems.map((i) => ({ ...topProducts.find((p) => p.id === i.productId), sold: i._sum.quantity || 0 })).filter((i) => i.name);

  // Low stock
  const lowStock = await prisma.product.findMany({ where: { stockCount: { lte: 5 } }, select: { id: true, name: true, stockCount: true, image: true } });

  // Orders by status
  const pendingOrders = await prisma.order.count({ where: { status: "pending" } });
  const completedOrders = await prisma.order.count({ where: { status: "completed" } });

  res.json({
    totalOrders, totalRevenue: totalRevenue._sum.total || 0, totalCustomers, totalProducts,
    dailyRevenue, topSellers, lowStock, pendingOrders, completedOrders,
  });
});

// CSV Export
app.get("/api/admin/export-orders", adminAuth, async (_req, res) => {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, include: { items: { include: { product: true } } } });
  const { Parser } = require("json2csv");
  const rows = orders.flatMap((o) => (o.items as any[])?.map((i: any) => ({
    "Order ID": o.id, "Date": o.createdAt.toISOString().split("T")[0], "Customer": o.customerName || "", "Phone": o.phone || "",
    "Product": i.product?.name || "", "Qty": i.quantity, "Price": i.price, "Total": o.total,
    "Discount": o.discount || 0, "Coupon": o.couponCode || "", "Status": o.status,
  })) || []);
  const parser = new Parser();
  const csv = parser.parse(rows);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename=orders-${new Date().toISOString().split("T")[0]}.csv`);
  res.send(csv);
});

// WhatsApp notification (admin sends message to owner)
app.post("/api/admin/send-whatsapp", adminAuth, async (req, res) => {
  const { message } = req.body;
  // Log it - in production this would integrate with WhatsApp API
  console.log(`📲 WhatsApp Notification: ${message}`);
  res.json({ success: true, message: "Notification logged" });
});

// Testimonials
app.get("/api/admin/testimonials", adminAuth, async (_req, res) => {
  res.json(await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } }));
});
app.post("/api/admin/testimonials", adminAuth, async (req, res) => {
  const { name, role, quote, image, rating, sortOrder } = req.body;
  res.json(await prisma.testimonial.create({ data: { name, role, quote, image, rating: rating || 5, sortOrder: sortOrder || 0 } }));
});
app.put("/api/admin/testimonials/:id", adminAuth, async (req, res) => {
  const { name, role, quote, image, rating, sortOrder } = req.body;
  res.json(await prisma.testimonial.update({ where: { id: req.params.id }, data: { name, role, quote, image, rating, sortOrder } }));
});
app.delete("/api/admin/testimonials/:id", adminAuth, async (req, res) => {
  await prisma.testimonial.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Gallery
app.get("/api/admin/gallery", adminAuth, async (_req, res) => {
  res.json(await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } }));
});
app.post("/api/admin/gallery", adminAuth, async (req, res) => {
  const { url, caption, section, sortOrder } = req.body;
  res.json(await prisma.galleryImage.create({ data: { url, caption, section: section || "lookbook", sortOrder: sortOrder || 0 } }));
});
app.delete("/api/admin/gallery/:id", adminAuth, async (req, res) => {
  await prisma.galleryImage.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// ============== START ==============
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));