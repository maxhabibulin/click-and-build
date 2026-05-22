import { ui, allViews } from "./ui.js";
import { toggleTheme } from "./utils/theme.js";
import { navigateTo } from "./utils/navigation.js";
import { toggleLanguageMenu, closeLanguageMenu } from "./utils/language.js";
import {
  nextSlide,
  prevSlide,
  goToSlide,
} from "./controllers/testimonials-controller.js";
import {
  openProductModal,
  closeProductModal,
} from "./controllers/product-details-controller.js";

export const initEventListeners = (onCatalogOpen, getProductsFn) => {
  const handleAddCartBtnClick = (e) => {
    const cartBtn = e.target.closest(".js-add-to-cart");

    if (cartBtn) {
      e.stopPropagation();
      const productId = Number(cartBtn.dataset.id);
      console.log(`Add to cart btn clicked [ID: ${productId}]`);
      closeProductModal();
    }
  };

  const handleGridClick = (e) => {
    const cartBtn = e.target.closest(".js-add-to-cart");
    const card = e.target.closest(".js-product-card");

    if (cartBtn) {
      handleAddCartBtnClick(e);
      return;
    }

    if (card) {
      const productId = Number(card.dataset.id);
      const currentProducts = getProductsFn();
      const selectedProduct = currentProducts.find((p) => p.id === productId);

      if (selectedProduct) {
        console.log(`Opening modal for [ID: ${selectedProduct.id}]`);
        openProductModal(selectedProduct);
      } else {
        console.warn(
          `Product with [ID: ${productId}] not found in global list`,
        );
      }
    }
  };

  ui.productModal.modal?.addEventListener("click", handleAddCartBtnClick);

  ui.grids.catalog?.addEventListener("click", handleGridClick);
  ui.grids.featured?.addEventListener("click", handleGridClick);

  ui.testimonials.btnNext?.addEventListener("click", nextSlide);
  ui.testimonials.btnPrev?.addEventListener("click", prevSlide);

  ui.testimonials.dots?.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const index = Number(e.target.dataset.index);
      goToSlide(index);
    });
  });

  ui.buttons.toHome?.forEach((btn) => {
    btn?.addEventListener("click", () => {
      navigateTo(ui.views.home, allViews, "home");
    });
  });

  ui.buttons.toCatalog?.forEach((btn) => {
    btn?.addEventListener("click", () => {
      navigateTo(ui.views.catalog, allViews, "catalog");
      onCatalogOpen();
    });
  });

  ui.buttons.themeSwitcher?.addEventListener("click", () => toggleTheme());

  ui.buttons.langSwitcher?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLanguageMenu(ui.menus.lang);
  });

  ui.buttons.closeBtn?.addEventListener("click", closeProductModal);

  ui.productModal.overlay?.addEventListener("click", (e) => {
    if (e.target === ui.productModal.overlay) {
      closeProductModal();
    }
  });

  document.addEventListener("click", (e) => {
    if (!ui.buttons.langSwitcher?.contains(e.target)) {
      closeLanguageMenu(ui.menus.lang);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLanguageMenu(ui.menus.lang);
      closeProductModal();
    }

    const isHomeVisible = !ui.views.home.classList.contains("hidden");
    if (isHomeVisible) {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }
  });
};
