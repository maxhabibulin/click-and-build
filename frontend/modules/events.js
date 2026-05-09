import { ui, allViews } from "./ui.js";
import { navigateTo } from "./navigation.js";

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
};
