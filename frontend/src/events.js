import { ui, allViews } from "./ui.js";
import { toggleTheme } from "./utils/theme.js";
import { navigateTo } from "./utils/navigation.js";
import { addToCart } from "./services/cart-service.js";
import {
  nextSlide,
  prevSlide,
  goToSlide,
} from "./controllers/testimonials-controller.js";
import {
  openProductModal,
  closeProductModal,
} from "./controllers/product-details-controller.js";
import {
  handleSearch,
  handleSortChange,
} from "./controllers/catalog-controller.js";
import { toggleLanguageMenu, closeLanguageMenu } from "./utils/language.js";

export const initEventListeners = (onCatalogOpen, getGlobalProducts) => {
  const handleAddToCartAction = (productId) => {
    if (!productId) return;

    const products = getGlobalProducts();
    const targetProduct = products.find((p) => Number(p.id) === productId);

    if (targetProduct) {
      addToCart(targetProduct);
      console.log(
        `Product with ID: ${targetProduct.id} "${targetProduct.product_name}" successfully added to cart!`,
        closeProductModal(),
      );
    } else {
      console.warn(`Product with ID: ${productId} is not found in global list`);
    }
  };

  const handleGridClick = (e) => {
    const cartBtn = e.target.closest(".js-add-to-cart");
    const card = e.target.closest(".js-product-card");

    if (cartBtn) {
      e.stopPropagation();
      const productId = Number(cartBtn.dataset.id);
      handleAddToCartAction(productId);
      return;
    }

    if (card) {
      const productId = Number(card.dataset.id);
      const currentProducts = getGlobalProducts();
      const selectedProduct = currentProducts.find((p) => p.id === productId);

      if (selectedProduct) {
        console.log(`Opening modal for ID: ${selectedProduct.id}`);
        openProductModal(selectedProduct);
      }
    }
  };

  ui.grids.catalog?.addEventListener("click", handleGridClick);
  ui.grids.featured?.addEventListener("click", handleGridClick);

  ui.productModal.modal?.addEventListener("click", (e) => {
    const cartBtn = e.target.closest(".js-add-to-cart");

    if (cartBtn) {
      const productId = Number(cartBtn.dataset.id);
      handleAddToCartAction(productId);
    }
  });

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
    const key = e.key;

    if (key === "Escape") {
      closeLanguageMenu(ui.menus.lang);
      closeProductModal();
    }

    const isHomeVisible = !ui.views.home.classList.contains("hidden");
    if (isHomeVisible) {
      if (key === "ArrowRight") nextSlide();
      if (key === "ArrowLeft") prevSlide();
    }
  });

  ui.catalogControls.sortSelect?.addEventListener("change", (e) => {
    handleSortChange(e.target.value);
  });

  ui.catalogControls.search?.addEventListener("input", (e) => {
    const query = e.target.value;
    handleSearch(query);
  });
};
