import { ui, allViews } from "./ui.js";
import { navigateTo } from "./utils/navigation.js";
import { toggleTheme } from "./controllers/theme-controller.js";
import { toggleCartMenu, closeCartMenu } from "./ui/cart-menu.js";
import { getCart, addToCart, updateQuantity } from "./services/cart-service.js";
import { toggleLanguageMenu, closeLanguageMenu } from "./ui/language-menu.js";
import {
  updateMiniCart,
  renderMainCartPage,
  renderCheckoutPage,
} from "./controllers/cart-controller.js";
import {
  handleSearch,
  handleSortChange,
} from "./controllers/catalog-controller.js";
import {
  nextSlide,
  prevSlide,
  goToSlide,
} from "./controllers/testimonials-controller.js";
import {
  openProductModal,
  closeProductModal,
} from "./controllers/product-details-controller.js";
import { initCheckout } from "./controllers/checkout-controller.js";

export const initEventListeners = (onCatalogOpen, getGlobalProducts) => {
  const handleAddToCartAction = (productId, quantity = 1) => {
    if (!productId) return;

    const products = getGlobalProducts();
    const targetProduct = products.find((p) => Number(p.id) === productId);

    if (targetProduct) {
      const productToAdd = { ...targetProduct, quantity: quantity };
      addToCart(productToAdd);
      console.log(
        `Product with ID: ${targetProduct.id} "${targetProduct.product_name}" successfully added to cart!`,
      );
      closeProductModal();
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
      handleAddToCartAction(productId, 1);
      return;
    }

    if (card) {
      const productId = Number(card.dataset.id);
      const currentProducts = getGlobalProducts();
      const selectedProduct = currentProducts.find((p) => p.id === productId);

      if (selectedProduct) {
        console.log(`Opening modal for ID: ${selectedProduct.id}`);
        openProductModal(selectedProduct);

        const input = ui.productModal.modal?.querySelector(
          ".quantity-controls__input",
        );

        if (input) {
          input.value = 1;
        }
      }
    }
  };

  ui.grids.catalog?.addEventListener("click", handleGridClick);
  ui.grids.featured?.addEventListener("click", handleGridClick);

  ui.grids.cart?.addEventListener("click", (e) => {
    const minusBtn = e.target.closest(".js-cart-minus");
    const plusBtn = e.target.closest(".js-cart-plus");

    if (!minusBtn && !plusBtn) return;

    const itemRow = e.target.closest(".js-cart-item");

    if (!itemRow) return;

    const productId = Number(itemRow.dataset.id);

    if (minusBtn) {
      updateQuantity(productId, -1);
    } else if (plusBtn) {
      updateQuantity(productId, 1);
    }
  });

  ui.productModal.modal?.addEventListener("click", (e) => {
    const cartBtn = e.target.closest(".js-add-to-cart");
    const minusBtn = e.target.closest(".js-cart-minus");
    const plusBtn = e.target.closest(".js-cart-plus");
    const input = ui.productModal.modal.querySelector(
      ".quantity-controls__input",
    );

    if (cartBtn) {
      const productId = Number(cartBtn.dataset.id);
      const currentQuantity = input ? Number(input.value) : 1;
      handleAddToCartAction(productId, currentQuantity);
      return;
    }

    if (minusBtn || plusBtn) {
      if (!input) return;

      let currentValue = Number(input.value);

      if (plusBtn) {
        currentValue++;
      } else if (minusBtn && currentValue > 1) {
        currentValue--;
      }

      input.value = currentValue;
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

  ui.menus.cart?.addEventListener("click", (e) => {
    e.stopPropagation();
    const mainCartBtn = e.target.closest("#js-main-cart-btn");
    const cartView = ui.views.cart;
    const cartMenu = ui.menus.cart;

    if (mainCartBtn) {
      navigateTo(cartView, allViews, "cart");
      closeCartMenu(cartMenu);
      renderMainCartPage();
    }
  });

  ui.views.cart?.addEventListener("click", (e) => {
    e.stopPropagation();
    const checkoutBtn = e.target.closest("#js-checkout-btn");
    const checkoutView = ui.views.checkout;

    if (checkoutBtn) {
      navigateTo(checkoutView, allViews, "checkout");
      renderCheckoutPage();
    }
  });

  ui.checkout.form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cartItems = getCart();
    const isOrderSuccess = await initCheckout(cartItems);

    if (isOrderSuccess) {
      const successView = ui.views.success;

      if (successView) {
        navigateTo(successView, allViews, "success");
      }
    }
  });

  ui.buttons.navigation.cartSwitcher?.addEventListener("click", (e) => {
    e.stopPropagation();
    const cartMenu = ui.menus.cart;
    const langMenu = ui.menus.lang;
    toggleCartMenu(cartMenu);
    closeLanguageMenu(langMenu);
  });

  ui.buttons.navigation.langSwitcher?.addEventListener("click", (e) => {
    e.stopPropagation();
    const langMenu = ui.menus.lang;
    const cartMenu = ui.menus.cart;
    toggleLanguageMenu(langMenu);
    closeCartMenu(cartMenu);
  });

  ui.buttons.navigation.themeSwitcher?.addEventListener("click", () =>
    toggleTheme(),
  );

  ui.buttons.closeBtn?.addEventListener("click", closeProductModal);

  ui.productModal.overlay?.addEventListener("click", (e) => {
    if (e.target === ui.productModal.overlay) {
      closeProductModal();
    }
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    const cartMenu = ui.menus.cart;
    const langMenu = ui.menus.lang;
    const cartSwitcher = ui.buttons.navigation.cartSwitcher;
    const langSwitcher = ui.buttons.navigation.langSwitcher;

    if (!cartSwitcher?.contains(target) && !cartMenu?.contains(target)) {
      closeCartMenu(cartMenu);
    }

    if (!langSwitcher?.contains(target) && !langMenu?.contains(target)) {
      closeLanguageMenu(langMenu);
    }
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    const cartMenu = ui.menus.cart;
    const langMenu = ui.menus.lang;

    if (key === "Escape") {
      closeCartMenu(cartMenu);
      closeLanguageMenu(langMenu);
      closeProductModal();
    }

    const isHomeVisible = !ui.views.home.classList.contains("hidden");
    if (isHomeVisible) {
      if (key === "ArrowRight") nextSlide();
      if (key === "ArrowLeft") prevSlide();
    }
  });

  ui.catalogControls.sortSelect?.addEventListener("change", (e) => {
    const value = e.target.value;
    handleSortChange(value);
  });

  ui.catalogControls.search?.addEventListener("input", (e) => {
    const query = e.target.value;
    handleSearch(query);
  });

  window?.addEventListener("cartUpdated", () => {
    updateMiniCart();
    renderMainCartPage();
  });
};
