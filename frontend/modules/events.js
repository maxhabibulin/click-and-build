"use strict";

import { ui, allViews } from "./ui.js";
import { navigateTo } from "./navigation.js";
import { toggleTheme } from "./theme.js";
import { toggleLanguageMenu, closeLanguageMenu } from "./language.js";
import { nextSlide, prevSlide, goToSlide } from "./testimonials-controller.js";

export const initEventListeners = (onCatalogOpen) => {
  ui.testimonials.btnNext?.addEventListener("click", nextSlide);
  ui.testimonials.btnPrev?.addEventListener("click", prevSlide);

  ui.testimonials.dots?.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const index = Number(e.target.dataset.index);
      goToSlide(index);
    });
  });

  document.addEventListener("keydown", (e) => {
    const isHomeVisible = !ui.views.home.classList.contains("hidden");

    if (isHomeVisible) {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }
  });

  ui.buttons.toHome.forEach((btn) => {
    btn?.addEventListener("click", () => {
      navigateTo(ui.views.home, allViews, "home");
    });
  });

  ui.buttons.toCatalog.forEach((btn) => {
    btn?.addEventListener("click", () => {
      navigateTo(ui.views.catalog, allViews, "catalog");
      onCatalogOpen();
    });
  });

  ui.buttons.themeSwitcher?.addEventListener("click", () => {
    toggleTheme();
  });

  ui.buttons.langSwitcher?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLanguageMenu(ui.menus.lang);
  });

  document.addEventListener("click", (e) => {
    if (!ui.buttons.langSwitcher?.contains(e.target)) {
      closeLanguageMenu(ui.menus.lang);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLanguageMenu(ui.menus.lang);
  });

  ui.buttons.closeProdMod.addEventListener("click", (e) => {
    e.stopPropagation();
    ui.productDetails.modal.classList.toggle("product-modal--hidden");
  });
};
