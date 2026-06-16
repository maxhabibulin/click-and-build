# 🖥️ Click & Build (Demo)

This is an **educational HTML, CSS, and JavaScript project** created to practice frontend design, object-oriented programming (OOP), and DOM manipulation.
It demonstrates a **single page application** for a fictional custom PC building service - _Click & Build_

---

## 💡 Features

- **Interactive testimonial carousel** with keyboard navigation
- **Responsive grid layout** using CSS Grid and Flexbox
- **Modern CSS design system** with custom properties
- **Object-Oriented JavaScript** with ES6 modules
- **Dynamic content rendering** and DOM manipulation
- **Accessible UI components** with ARIA labels

---

## 🧱 Project Structure

```text
Click-and-Build/
├── backend/
│   ├── data/
│   │   ├── products-mock.js
│   │   └── testimonials-mock.js
│   ├── routes/
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── testimonials.js
│   ├── db.js
│   ├── database.db
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   ├── base/
│   │   │   ├── _general.css
│   │   │   ├── _queries.css
│   │   │   └── _variables.css
│   │   ├── components/
│   │   │   ├── _buttons.css
│   │   │   ├── _catalog-controls.css
│   │   │   ├── _error-msg.css
│   │   │   ├── _product-cards.css
│   │   │   ├── _product-details.css
│   │   │   └── _success-card.css
│   │   ├── layout/
│   │   │   ├── _cart.css
│   │   │   ├── _catalog.css
│   │   │   ├── _checkout.css
│   │   │   ├── _features.css
│   │   │   ├── _footer.css
│   │   │   ├── _hero.css
│   │   │   ├── _navigation.css
│   │   │   └── _testimonials.css
│   │   ├── utils/
│   │   │   └── _utility.css
│   │   └── main.css
│   ├── img/
│   │   ├── favicon/
│   │   ├── hero/
│   │   ├── logo/
│   │   ├── product-card/
│   │   ├── svg/
│   │   └── testimonial/
│   ├── index.html
│   ├── main.js
│   └── src/
│       ├── controllers/
│       │   ├── cart-controller.js
│       │   ├── catalog-controller.js
│       │   ├── checkout-controller.js
│       │   ├── featured-products-controller.js
│       │   ├── product-details-controller.js
│       │   ├── testimonials-controller.js
│       │   └── theme-controller.js
│       ├── models/
│       │   └── testimonial.js
│       ├── services/
│       │   └── cart-service.js
│       ├── ui/
│       │   ├── cart-menu.js
│       │   └── language-menu.js
│       ├── utils/
│       │   ├── date.js
│       │   ├── fetch-wrapper.js
│       │   ├── navigation.js
│       │   ├── remove.js
│       │   ├── string.js
│       │   └── svg-ns.js
│       ├── views/
│       │   ├── error-msg.js
│       │   ├── main-cart.js
│       │   ├── mini-cart.js
│       │   ├── product-card.js
│       │   └── success-card.js
│       ├── events.js
│       └── ui.js
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 How to Run

This project has a small backend API and a separate frontend UI, so both parts should be started for the app to work correctly.

### 1) Start the backend API

```bash
# From the project root
cd backend
npm install
npm run dev
```

The API will run at:

- `http://localhost:3000`

### 2) Start the frontend

Open a second terminal and run:

```bash
# From the project root
cd frontend
python -m http.server 5500
```

Then open:

- `http://localhost:5500`

You can also use VS Code Live Server or another static file server for the frontend.

### Optional alternative

If you prefer a different frontend server, you can run:

```bash
cd frontend
npx serve .
```

Then open the URL shown in the terminal output.

---

## 🛠️ Technologies Used

- **HTML5** - Markup for the app structure and content
- **CSS3** - Layout styling, responsive design, and reusable component styles
- **JavaScript (ES Modules)** - Frontend app logic, event handling, and DOM rendering
- **Express.js** - Backend API server for product, order, and testimonial endpoints
- **CORS** - Cross-origin requests between frontend and backend
- **SQLite** - Local database used by the backend
- **SVG assets** - Icon elements used throughout the UI

---

## 🎯 Learning Objectives

- Practice **modular JavaScript architecture**
- Implement **interactive UI components**
- Master **CSS layout techniques** (Grid & Flexbox)
- Apply **accessibility best practices**
- Use **ES6+ features** (Classes, Modules, Arrow functions)
- _Future: Implement responsive design_
- _Future: Migrate to Vite build system_

---

## 🗒️ Notes

- This is a **learning project** — not intended for production use.
- All images are placeholder assets for demonstration
- Designed to demonstrate **modular architecture, separation of concerns, OOP principles, and DOM manipulation**.
- Focus on **clean code structure** and **maintainable design patterns**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**Maksims Habibulins**

- 🐱 GitHub: [@maxhabibulin](https://github.com/maxhabibulin)
- 📧 Email: maxhabibulin@gmail.com

---

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-demo%20project-green.svg) ![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)
