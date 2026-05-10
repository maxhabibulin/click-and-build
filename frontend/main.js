"use strict";

import CurrentYear from "./modules/current-year.js";
import Testimonial from "./modules/testimonial.js";
import FetchWrapper from "./modules/fetch-wrapper.js";
import { renderProductCard } from "./modules/product-card.js";
import { initEventListeners } from "./modules/events.js";
import { allViews, ui } from "./modules/ui.js";
import { navigateTo } from "./modules/navigation.js";
import { applySavedTheme } from "./modules/theme.js";

const testimonial = new Testimonial();

const testimonialElements = {
  heading: document.querySelector("#js-testimonial-heading"),
  quote: document.querySelector("#js-testimonial-quote"),
  name: document.querySelector("#js-testimonial-author"),
  tag: document.querySelector("#js-testimonial-tag"),
  image: document.querySelector("#js-testimonial-img"),
  btnPrev: document.querySelector("#js-testimonial-prev"),
  btnNext: document.querySelector("#js-testimonial-next"),
  getCurrentDotEl: function (counter) {
    return document.querySelector(`[data-index="${counter}"]`);
  },
};

const dotsEl = document.querySelectorAll("[data-js='dot']");

let previousCounter = 0;

const render = () => {
  const { heading, quote, name, tag, image } = testimonial
    .getTestimonials()
    .at(testimonial.counter);
  testimonialElements.heading.textContent = heading;
  testimonialElements.quote.textContent = quote;
  testimonialElements.name.textContent = name;
  testimonialElements.tag.textContent = tag;
  testimonialElements.image.src = image;

  const previousDotEl = testimonialElements.getCurrentDotEl(previousCounter);
  const currentDotEl = testimonialElements.getCurrentDotEl(testimonial.counter);
  previousDotEl.className = "pagination__dot";
  currentDotEl.className = "pagination__dot pagination__dot--active";
  previousCounter = testimonial.counter;
};

function goForward() {
  testimonial.moveForward();
  render();
}

function goBackward() {
  testimonial.moveBackward();
  render();
}

testimonialElements.btnNext.addEventListener("click", goForward);
testimonialElements.btnPrev.addEventListener("click", goBackward);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goForward();
  if (e.key === "ArrowLeft") goBackward();
});

dotsEl.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const clickedIndex = Number(e.target.dataset.index);
    testimonial.counter = clickedIndex;
    render();
  });
});

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
    const products = await API.get("/api/products");
    ui.grids.catalog.innerHTML = "";
    products.forEach((pc) => {
      ui.grids.catalog.appendChild(renderProductCard(pc));
    });
  } catch (err) {
    console.error("Failed to load catalog", err);
  }
};

const savedView = localStorage.getItem("currentView");

if (savedView === "catalog") {
  navigateTo(ui.views.catalog, allViews, "catalog");
  loadAndRenderCatalog();
} else {
  navigateTo(ui.views.home, allViews, "home");
}

initEventListeners(loadAndRenderCatalog);
