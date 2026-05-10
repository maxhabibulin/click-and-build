"use strict";

import CurrentYear from "./modules/current-year.js";
import FetchWrapper from "./modules/fetch-wrapper.js";
import { renderProductCard } from "./modules/product-card.js";
import { initEventListeners } from "./modules/events.js";
import { allViews, ui } from "./modules/ui.js";
import { navigateTo } from "./modules/navigation.js";
import { applySavedTheme } from "./modules/theme.js";
import { initTestimonials } from "./modules/testimonials-controller.js";

const initApp = () => {
  const yearProvider = new CurrentYear();
  if (ui.footer.yearSpan) {
    ui.footer.yearSpan.textContent = yearProvider.getCurrentYear();
  }
};

initApp();

applySavedTheme();

const API = new FetchWrapper("http://localhost:3000");

const loadAndRenderCatalog = async () => {
  try {
    const data = await API.get("/api/products");
    ui.grids.catalog.innerHTML = "";
    data.forEach((pc) => {
      ui.grids.catalog.appendChild(renderProductCard(pc));
    });
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

const savedView = localStorage.getItem("currentView");

if (savedView === "catalog") {
  navigateTo(ui.views.catalog, allViews, "catalog");
  loadAndRenderCatalog();
} else {
  navigateTo(ui.views.home, allViews, "home");
}

loadTestimonials();
initEventListeners(loadAndRenderCatalog);
