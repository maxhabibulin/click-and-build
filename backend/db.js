import sqlite3 from "sqlite3";
import testimonialsMock from "./data/testimonials-mock.js";
import productsCatalogMock from "./data/products-mock.js";

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_name TEXT,
                product_price REAL,
                product_cpu TEXT,
                product_gpu TEXT,
                product_ram TEXT,
                product_ssd TEXT,
                product_os TEXT,
                product_description TEXT,
                product_img TEXT
            )
        `);

  db.run(`
        CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_total_price REAL,
                customer_first_name TEXT,
                customer_last_name TEXT,
                customer_email TEXT,
                customer_address TEXT,
                order_created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

  db.run(`
        CREATE TABLE IF NOT EXISTS order_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER,
                product_id INTEGER,
                quantity INTEGER,
                unit_price REAL
            )
        `);

  db.run(`
        CREATE TABLE IF NOT EXISTS testimonials (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                testimonial_heading TEXT,
                testimonial_quote TEXT,
                testimonial_name TEXT,
                testimonial_tag TEXT,
                testimonial_img TEXT
            )
        `);

  db.get("SELECT COUNT(*) as count FROM testimonials", (err, row) => {
    if (err) {
      console.error("Error validating table (testimonials): ", err.message);
      return;
    }

    if (row.count === 0) {
      const stmt = db.prepare(
        "INSERT INTO testimonials (testimonial_heading, testimonial_quote, testimonial_name, testimonial_tag, testimonial_img) VALUES (?, ?, ?, ?, ?)",
      );

      testimonialsMock.forEach((t) => {
        stmt.run(
          t.testimonial_heading,
          t.testimonial_quote,
          t.testimonial_name,
          t.testimonial_tag,
          t.testimonial_img,
        );
      });

      stmt.finalize((finalizeErr) => {
        if (finalizeErr) {
          console.error("Error finalizing request: ", finalizeErr.message);
        } else {
          console.log(
            `Database successfully imported testimonials from file: ${testimonialsMock.length}`,
          );
        }
      });
    }
  });

  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (err) {
      console.error("Error validating table (products): ", err.message);
      return;
    }

    if (row.count === 0) {
      const stmt = db.prepare(
        "INSERT INTO products (product_name, product_price, product_cpu, product_gpu, product_ram, product_ssd, product_os, product_description, product_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      );

      productsCatalogMock.forEach((pc) => {
        stmt.run(
          pc.product_name,
          pc.product_price,
          pc.product_cpu,
          pc.product_gpu,
          pc.product_ram,
          pc.product_ssd,
          pc.product_os,
          pc.product_description,
          pc.product_img,
        );
      });

      stmt.finalize((finalizeErr) => {
        if (finalizeErr) {
          console.error("Error finalizing request: ", finalizeErr.message);
        } else {
          console.log(
            `Database successfully imported products from file: ${productsCatalogMock.length}`,
          );
        }
      });
    }
  });
});

export default db;
