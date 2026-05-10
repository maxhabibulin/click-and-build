"use strict";

import { ui, allViews } from "./ui.js";
import { navigateTo } from "./navigation.js";
import { toggleTheme } from "./theme.js";
import { toggleLanguageMenu, closeLanguageMenu } from "./language.js";

export const initEventListeners = (onCatalogOpen) => {
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

  ui.buttons.langSwitcher?.addEventListener("click", () => {
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
};
