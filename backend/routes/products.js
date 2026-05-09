import express from "express";
// import db from "../db.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   db.all("SELECT * FROM products", [], (err, rows) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(rows);
//   });
// });

router.get("/", (req, res) => {
  const mockProducts = [
    {
      id: 1,
      product_name: "Photon Blade",
      product_img: "img/product-card/pc-1.avif",
      product_cpu: "Core i7-14700KF",
      product_gpu: "RTX 5070",
      product_ram: "32GB DDR5",
      product_ssd: "NVMe SSD 1TB",
      product_os: "Windows 11",
      product_price: 1999,
      product_description:
        "A high-performance machine designed for competitive gaming and professional creative work. Features advanced liquid cooling and whisper-silent operation even under heavy load.",
    },
  ];
  res.json(mockProducts);
});

export default router;
