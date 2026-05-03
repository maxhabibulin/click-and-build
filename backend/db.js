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
});

export default db;
