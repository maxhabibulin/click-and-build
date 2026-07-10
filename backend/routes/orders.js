import express from "express";
import db from "../db.js";

const router = express.Router();

// POST /api/order
// Receives a checkout order from the frontend as JSON,
// validates pricing server-side against the database,
// stores the order, and returns a transaction confirmation response. i
router.post("/", (req, res) => {
  const { cart, firstName, lastName, email, address } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Empty cart" });
  }

  const productIds = cart.map((item) => item.id);
  const placeholders = productIds.map(() => "?").join(", ");

  db.all(
    `SELECT id, product_price FROM products WHERE id IN (${placeholders})`,
    productIds,
    (err, dbProducts) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      let total = 0;

      for (const item of cart) {
        const dbProduct = dbProducts.find((p) => p.id === item.id);

        if (!dbProduct) {
          return res
            .status(400)
            .json({ error: `Product with ID ${item.id} not found.` });
        }

        total += dbProduct.product_price * item.quantity;
      }

      db.run(
        `
    INSERT INTO orders (order_total_price, customer_first_name, 
    customer_last_name, customer_email, customer_address) 
    VALUES (?, ?, ?, ?, ?)
    `,
        [total, firstName, lastName, email, address],
        function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          const orderID = this.lastID;
          const stmt = db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
        VALUES (?, ?, ?, ?)
        `);

          cart.forEach((item) => {
            const dbProduct = dbProducts.find((p) => p.id === item.id);
            stmt.run(orderID, item.id, item.quantity, dbProduct.product_price);
          });

          stmt.finalize();

          res.json({
            message: "Thank you for your purchase!",
            orderInfo: {
              id: orderID,
              totalPrice: total,
              customer: {
                firstName,
                lastName,
                email,
                address,
              },
              date: new Date().toLocaleString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
            },
          });
        },
      );
    },
  );
});

export default router;
