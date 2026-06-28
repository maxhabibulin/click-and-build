import express from "express";
import db from "../db.js";

const router = express.Router();

// GET /api/testimonials
// Returns all testimonials from the SQLite database as JSON for the frontend carousel.
router.get("/", (req, res) => {
  db.all("SELECT * FROM testimonials", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

export default router;
