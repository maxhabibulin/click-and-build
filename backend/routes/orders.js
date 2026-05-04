import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { cart, firstName, lastName, email, address } = req.body;

  let total = 0;
  cart.forEach((item) => {
    total += item.product_price * item.quantity;
  });

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
        stmt.run(orderID, item.id, item.quantity, item.product_price);
      });

      stmt.finalize();

      res.json({
        message: "Order created successfully!",
        orderInfo: {
          id: orderID,
          totalPrice: total,
          customer: {
            firstName,
            lastName,
            email,
            address,
          },
          date: new Date().toLocaleString(),
        },
      });
    },
  );
});

export default router;
