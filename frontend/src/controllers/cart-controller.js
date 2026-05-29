import { ui } from "../ui.js";
import { getCartCount } from "../services/cart-service.js";

export const updateCartBadge = () => {
  const badge = ui.menus.cartBadge;

  if (badge) {
    const count = getCartCount();

    badge.textContent = count;

    if (count === 0) {
      badge.classList.add("hidden");
    } else {
      badge.classList.remove("hidden");
    }
  }
};
