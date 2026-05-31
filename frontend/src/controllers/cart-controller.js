import { ui } from "../ui.js";
import { getCartCount } from "../services/cart-service.js";

export const updateCartBadge = () => {
  const badge = ui.menus.cartBadge;

  if (badge) {
    const count = getCartCount();

    if (count <= 0) {
      badge.textContent = "0";
      badge.classList.add("hidden");
      return;
    }

    if (count > 99) {
      badge.textContent = "99+";
      badge.style.width = "3.2rem";
      badge.style.transform = "translateX(56%)";
    } else {
      badge.textContent = count;
    }

    badge.classList.remove("hidden");
  }
};
