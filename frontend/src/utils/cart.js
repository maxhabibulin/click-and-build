import { ui } from "../ui.js";

export const toggleCartMenu = (menuEl) => {
  menuEl?.classList.toggle("active");
};

export const closeCartMenu = (menuEl) => {
  menuEl?.classList.remove("active");
};
