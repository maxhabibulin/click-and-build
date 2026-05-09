"use strict";

import CurrentYear from "./modules/current-year.js";
import Testimonial from "./modules/testimonial.js";
import FetchWrapper from "./modules/fetch-wrapper.js";
import { renderProductCard } from "./modules/product-card.js";
import { initEventListeners } from "./modules/events.js";
import { allViews, ui } from "./modules/ui.js";
import { navigateTo } from "./modules/navigation.js";

const testimonial = new Testimonial();
const currentYear = new CurrentYear();

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

const langSwitcherBtnEl = document.querySelector("#js-lang-btn");
const langMenuEl = document.querySelector("#js-lang-menu");
const themeSwitcherBtnEl = document.querySelector("#js-theme-btn");
const showCurrentYearEl = document.querySelector("#js-current-year");
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

showCurrentYearEl.textContent = currentYear.getCurrentYear();

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

const bodyEl = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  bodyEl.classList.add("dark-mode");
}

themeSwitcherBtnEl.addEventListener("click", () => {
  bodyEl.classList.toggle("dark-mode");

  const isDark = bodyEl.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

document.addEventListener("click", (e) => {
  const isButtonClick = langSwitcherBtnEl.contains(e.target);

  if (isButtonClick) {
    langMenuEl.classList.toggle("active");
  } else {
    langMenuEl.classList.remove("active");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    langMenuEl.classList.remove("active");
  }
});

const API = new FetchWrapper("http://localhost:3000");

const loadAndRenderCatalog = async () => {
  try {
    const products = await API.get("/api/products");
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
