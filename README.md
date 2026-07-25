# 🖥️ Click & Build (Full-Stack Demo)

This is an **educational full-stack web project** created to practice frontend design, object-oriented programming (OOP), DOM manipulation, and backend API development.
It demonstrates a **single-page application** for a fictional custom PC building service - _Click & Build_ - where a modular frontend and a Node.js/Express API are built using ES modules and supported by SQLite.

---

## 💡 Features

- **Full-stack architecture** with separate frontend and backend layers
- **RESTful API** for products, orders, and testimonials
- **Database-driven content** using SQLite
- **Object-Oriented JavaScript** with ES6 modules
- **Responsive grid layout** using CSS Grid and Flexbox
- **Media queries** optimization for various screen resolutions and devices
- **Modern CSS design system** with custom properties
- **Dynamic content rendering** and DOM manipulation
- **Accessible UI components** with ARIA labels
- **Interactive testimonial carousel** with keyboard navigation
- **Product details modal** for exploring individual PC builds
- **Shopping cart experience** with quantity controls, item removal, and cart summary updates
- **Mini cart preview** and cart badge indicator showing the current item count
- **Checkout form validation** with toast-style error feedback
- **Theme toggle** supporting light and dark modes
- **Total price calculation** logic handled on server-side

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
│       │   ├── mobile-menu.js
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

The frontend uses asynchronous JavaScript and JSON to communicate with the backend without reloading the page. The app uses modern Fetch API requests, which are the current form of AJAX-style communication.

- The main frontend entry point in [frontend/main.js](frontend/main.js) loads product and testimonial data from the backend using the fetch-based wrapper in [frontend/src/utils/fetch-wrapper.js](frontend/src/utils/fetch-wrapper.js).
- The backend server in [backend/server.js](backend/server.js) exposes three API routes:
  - GET /api/products: returns the product catalog as JSON
  - GET /api/testimonials: returns testimonials as JSON
- This separates the UI from the data layer and exchanges JSON between the client and server.

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

- Practice **modular JavaScript architecture** across frontend and backend layers
- Build **interactive UI components** such as product modals, cart interactions, and testimonial navigation
- Master **CSS layout techniques** using Grid and Flexbox
- Apply **accessibility best practices** in UI interactions and semantic structure
- Use **ES6+ features** such as modules, classes, and arrow functions
- Optimize **responsive design** for mobile and other screen sizes
- Improve **image assets** for remaining catalog items
- Explore **Vite** as a future build tool and development workflow improvement

---

## 🗒️ Notes

- This is a **learning project** — not intended for production use.
- All images are placeholder assets for demonstration.

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
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Status](https://img.shields.io/badge/status-demo%20project-green.svg) ![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)
