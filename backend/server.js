import express from "express";
import cors from "cors";
import db from "./db.js";
import productRoutes from "./routes/products.js";
import ordersRoutes from "./routes/orders.js";
import testimonialsRoutes from "./routes/testimonials.js";

const app = express();
const port = 3000;

// Enable Cross-Origin Resource Sharing to ensure that the frontend can call the backend locally.
app.use(cors());
// Parse incoming JSON bodies from frontend requests such as checkout submissions.
app.use(express.json());
// Mount the API endpoint routers for products, orders, and testimonials.
app.use("/api/products", productRoutes);
app.use("/api/order", ordersRoutes);
app.use("/api/testimonials", testimonialsRoutes);

app.listen(port, () => console.log(`Server started, port: ${port}`));
