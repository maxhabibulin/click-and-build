import { ui } from "../ui.js";
import removeElement from "../utils/remove-element.js";
import {
  renderMainEmptyCart,
  renderMainFilledCart,
} from "../views/main-cart.js";
import {
  renderMiniEmptyCart,
  renderMiniFilledCart,
} from "../views/mini-cart.js";
import { getCart, getCartCount } from "../services/cart-service.js";

export const renderMainCartPage = () => {
  const cartGrid = ui.grids.cart;
  const cartTableHeaderBlock = ui.mainCart.cartHeader;
  const cartListBlock = ui.mainCart.cartList;
  const cartSummaryBlock = ui.mainCart.cartSummary;

  if (!cartGrid) return;

  const cartItems = getCart();

  if (!cartItems || cartItems.length === 0) {
    if (cartSummaryBlock) cartSummaryBlock.classList.add("hidden");
    if (cartTableHeaderBlock) cartTableHeaderBlock.classList.add("hidden");

    renderMainEmptyCart(cartListBlock);
    return;
  }

  if (cartTableHeaderBlock) cartTableHeaderBlock.classList.remove("hidden");
  if (cartSummaryBlock) cartSummaryBlock.classList.remove("hidden");

  renderMainFilledCart(cartListBlock, cartItems);
};

export const updateMiniCart = () => {
  const cartMenu = ui.menus.cart;
  const badge = ui.menus.cartBadge;
  const cartItems = getCart();

  if (cartMenu && (!cartItems || cartItems.length === 0)) {
    renderMiniEmptyCart(cartMenu);

    if (badge) {
      badge.textContent = "0";
      badge.classList.add("hidden");
    }
    return;
  }

  renderMiniFilledCart(cartMenu, cartItems);

  if (badge) {
    const cartCount = getCartCount();

    if (cartCount > 99) {
      badge.textContent = "99+";
      badge.style.width = "3.2rem";
      badge.style.transform = "translateX(56%)";
    } else {
      badge.textContent = cartCount;
      badge.style.width = "";
      badge.style.transform = "";
    }

    badge.classList.remove("hidden");
  }
};

export const renderCheckoutPage = () => {
  const container = ui.checkout.summaryList;
  if (!container) return;

  const cartItems = getCart();

  if (cartItems && cartItems.length > 0) {
    renderMiniFilledCart(container, cartItems);

    const footerToRemove = container.querySelector(".cart-dropdown__footer");
    removeElement(footerToRemove);
  }
};
