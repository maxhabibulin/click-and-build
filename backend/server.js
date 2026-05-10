import express from "express";
import cors from "cors";
import db from "./db.js";
import productRoutes from "./routes/products.js";
import ordersRoutes from "./routes/orders.js";
import testimonialsRoutes from "./routes/testimonials.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/order", ordersRoutes);
app.use("/api/testimonials", testimonialsRoutes);

app.listen(port, () => console.log(`Server started, port: ${port}`));
