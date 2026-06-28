import express from "express";
import db from "../db.js";

const router = express.Router();

// GET /api/products
// Returns all products from the SQLite database as JSON for the frontend catalog.
router.get("/", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

export default router;
