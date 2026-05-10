import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
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
                id INTEGER PRIMARY KEY,
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
                id INTEGER PRIMARY KEY,
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

  //   db.get("SELECT COUNT(*) as count FROM testimonials", (err, row) => {
  //     if (row.count === 0) {
  //       const stmt = db.prepare(
  //         "INSERT INTO testimonials (testimonial_heading, testimonial_quote, testimonial_name, testimonial_tag, testimonial_img) VALUES (?, ?, ?, ?, ?)",
  //       );

  //       stmt.run(
  //         '"I will always go back to prebuilt PCs now!"',
  //         "Every component is carefully selected, and the performance is unbeatable. The build quality is top-notch, and the attention to detail makes all the difference!",
  //         "Evan Mask",
  //         "@DriftTech",
  //         "img/testimonial/customer-1.avif",
  //       );

  //       stmt.run(
  //         '"Custom builds changed how I game forever!"',
  //         "The speed and power of this machine blew me away. Every premium part was chosen with precision, and the result is a flawless experience — smooth, fast, and reliable!",
  //         "Kris Jackson",
  //         "@KrisJackson",
  //         "img/testimonial/customer-2.avif",
  //       );

  //       stmt.run(
  //         `"The best PC I've ever owned — hands down!"`,
  //         "Everything runs buttery smooth, even the most demanding games. The attention to detail in the build is incredible, and I love knowing each part was chosen just for me.",
  //         "Jordan Wang",
  //         "@Asmonplay",
  //         "img/testimonial/customer-3.avif",
  //       );

  //       stmt.run(
  //         `"From order to action — a seamless experience!"`,
  //         "Setting it up was a breeze, and I was gaming at ultra settings within minutes. The performance is unmatched and the design is sleek, quiet, and powerful.",
  //         "Riley Jonson",
  //         "@RileyJ47",
  //         "img/testimonial/customer-4.avif",
  //       );

  //       stmt.finalize();
  //     }
  //   });
});

export default db;
