import { ui } from "../ui.js";
import { getCart, getCartCount } from "../services/cart-service.js";

const renderEmptyCart = (container) => {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("cart-dropdown__empty");

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "cart-dropdown__empty-icon");
  svg.setAttribute("aria-hidden", "true");

  const use = document.createElementNS(svgNS, "use");
  use.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "href",
    "img/svg/icons.svg#icon-cart",
  );
  svg.appendChild(use);

  const title = document.createElement("p");
  title.classList.add("cart-dropdown__empty-title");
  title.textContent = "Your cart is empty";

  const text = document.createElement("p");
  text.classList.add("cart-dropdown__empty-text");
  text.textContent = "Keep shopping";

  wrapper.append(svg, title, text);
  container.appendChild(wrapper);
};

export const updateCartBadge = () => {
  const cartMenu = ui.menus.cart;
  const badge = ui.menus.cartBadge;
  const cartItems = getCart();

  if (cartMenu && (!cartItems || cartItems.length === 0)) {
    renderEmptyCart(cartMenu);
  }

  if (badge) {
    const cartCount = getCartCount();

    if (cartCount <= 0) {
      badge.textContent = "0";
      badge.classList.add("hidden");
      return;
    }

    if (cartCount > 99) {
      badge.textContent = "99+";
      badge.style.width = "3.2rem";
      badge.style.transform = "translateX(56%)";
    } else {
      badge.textContent = cartCount;
    }

    badge.classList.remove("hidden");
  }
};
