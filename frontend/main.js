import { allViews, ui } from "./src/ui.js";
import CurrentYear from "./src/utils/date.js";
import { initEventListeners } from "./src/events.js";
import { navigateTo } from "./src/utils/navigation.js";
import FetchWrapper from "./src/utils/fetch-wrapper.js";
import { renderProductCard } from "./src/views/product-card.js";
import { initCatalog } from "./src/controllers/catalog-controller.js";
import { applySavedTheme } from "./src/controllers/theme-controller.js";
import { initTestimonials } from "./src/controllers/testimonials-controller.js";
import {
  updateMiniCart,
  renderMainCartPage,
  renderCheckoutPage,
} from "./src/controllers/cart-controller.js";

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

let globalProducts = [];
const API = new FetchWrapper("http://localhost:3000");

const loadAndRenderCatalog = async () => {
  try {
    const data = await API.get("/api/products");
    console.table("Server data: ", data);

    globalProducts = data;
    initCatalog(data);
  } catch (err) {
    console.error("Failed to load catalog", err);
  }
};

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

const handleCartViewOpen = () => {
  console.log("Main cart is opened...");
};

const loadInitialData = async () => {
  await Promise.all([loadAndRenderCatalog(), loadTestimonials()]);
  initEventListeners(handleCatalogViewOpen, () => globalProducts);

  const savedView = localStorage.getItem("currentView") ?? "home";

  if (savedView === "catalog") {
    navigateTo(ui.views.catalog, allViews, "catalog");
    handleCatalogViewOpen();
  } else if (savedView === "cart") {
    navigateTo(ui.views.cart, allViews, "cart");
  } else if (savedView === "checkout") {
    navigateTo(ui.views.checkout, allViews, "checkout");
    renderCheckoutPage();
  } else if (savedView === "success") {
    navigateTo(ui.views.success, allViews, "success");
  } else {
    navigateTo(ui.views.home, allViews, "home");
  }
};

loadInitialData();
