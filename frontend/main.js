import { allViews, ui } from "./src/ui.js";
import CurrentYear from "./src/utils/date.js";
import { initEventListeners } from "./src/events.js";
import { navigateTo } from "./src/utils/navigation.js";
import FetchWrapper from "./src/utils/fetch-wrapper.js";
import renderSuccessScreen from "./src/views/success-card.js";
import { renderProductCard } from "./src/views/product-card.js";
import { initCatalog } from "./src/controllers/catalog-controller.js";
import { applySavedTheme } from "./src/controllers/theme-controller.js";
import { initTestimonials } from "./src/controllers/testimonials-controller.js";
import {
  updateMiniCart,
  renderMainCartPage,
  renderCheckoutPage,
} from "./src/controllers/cart-controller.js";

// Application startup: initialize the footer date, cart preview, and saved theme.
const initApp = () => {
  const yearProvider = new CurrentYear();
  if (ui.footer.yearSpan) {
    ui.footer.yearSpan.textContent = yearProvider.getCurrentYear();
  }
  updateMiniCart();
  renderMainCartPage();
};

initApp();
applySavedTheme();

// Global runtime cache variable for holding products to minimize redundant API calls.
let globalProducts = [];

// The app uses modern Fetch API requests, which are the current form of AJAX-style communication.
// Frontend API client for making asynchronous requests to the Express backend via Fetch API.
const isProduction =
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1";
const BASE_URL = isProduction
  ? "https://click-and-build.onrender.com"
  : "http://localhost:3000";
const API = new FetchWrapper(BASE_URL);

// Load the product catalog from the backend via Fetch API and render it into the UI.
const loadAndRenderCatalog = async () => {
  try {
    const data = await API.get("/api/products");

    globalProducts = data;
    initCatalog(data);
  } catch (err) {
    console.error("Failed to load catalog", err);
  }
};

// Load testimonials from the backend as JSON and pass them into the testimonial controller.
const loadTestimonials = async () => {
  try {
    const data = await API.get("/api/testimonials");
    initTestimonials(data);
  } catch (err) {
    console.error("Failed to load testimonials", err);
  }
};

const handleCatalogViewOpen = () => {
  if (globalProducts.length === 0) {
    loadAndRenderCatalog();
  } else {
    initCatalog(globalProducts);
  }
};

// Initialize all initial data and restore the last saved page view after the app loads.
const loadInitialData = async () => {
  await Promise.all([loadAndRenderCatalog(), loadTestimonials()]);
  initEventListeners(handleCatalogViewOpen, () => globalProducts);

  const savedView = localStorage.getItem("currentView") ?? "home";

  // Evaluates last current state to route the client back to their active workflow.
  if (savedView === "catalog") {
    navigateTo(ui.views.catalog, allViews, "catalog");
    handleCatalogViewOpen();
  } else if (savedView === "cart") {
    navigateTo(ui.views.cart, allViews, "cart");
  } else if (savedView === "checkout") {
    navigateTo(ui.views.checkout, allViews, "checkout");
    renderCheckoutPage();
  } else if (savedView === "success") {
    const savedOrder = localStorage.getItem("latestOrder");

    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      navigateTo(ui.views.success, allViews, "success");
      renderSuccessScreen(parsedOrder);
      return;
    }
    localStorage.setItem("currentView", "home");
    navigateTo(ui.views.home, allViews, "home");
  } else {
    navigateTo(ui.views.home, allViews, "home");
  }
};

loadInitialData();
