import { ui } from "../ui.js";
import generateSvg from "../utils/svg-ns.js";
import {
  getCart,
  getCartCount,
  getCartTotal,
} from "../services/cart-service.js";

const renderEmptyCart = (container) => {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("cart-dropdown__empty");

  const svg = generateSvg("cart-dropdown__empty-icon", "icon-cart");

  const title = document.createElement("p");
  title.classList.add("cart-dropdown__empty-title");
  title.textContent = "Your cart is empty";

  const text = document.createElement("p");
  text.classList.add("cart-dropdown__empty-text");
  text.textContent = "Keep shopping";

  wrapper.append(svg, title, text);
  container.appendChild(wrapper);
};

const renderFilledCart = (container, cartItems) => {
  container.innerHTML = "";
  console.log("Cart items: ", { cartItems });

  const wrapper = document.createElement("div");
  wrapper.classList.add("cart-dropdown__filled");

  const ul = document.createElement("ul");
  ul.classList.add("cart-dropdown__list");

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("cart-dropdown__item");

    const imgBox = document.createElement("div");
    imgBox.classList.add("cart-dropdown__img-box");

    const img = document.createElement("img");
    img.classList.add("cart-dropdown__img");
    img.src = item.product_img;
    img.alt = item.product_name;

    imgBox.appendChild(img);

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("cart-dropdown__item-info");

    const quantity = document.createElement("strong");
    quantity.classList.add("cart-dropdown__item-quantity");
    quantity.textContent = `x${item.quantity}`;

    const title = document.createElement("h4");
    title.classList.add("cart-dropdown__item-title", "heading-quaternary");
    title.textContent = item.product_name;

    title.append(quantity);

    const price = document.createElement("span");
    price.classList.add("cart-dropdown__item-price");
    price.textContent = `${item.product_price}$`;

    itemInfo.append(title, price);
    li.append(imgBox, itemInfo);
    ul.appendChild(li);
  });

  const footer = document.createElement("div");
  footer.classList.add("cart-dropdown__footer");

  const totalBlock = document.createElement("div");
  totalBlock.classList.add("cart-dropdown__total");

  const totalLabel = document.createElement("span");
  totalLabel.classList.add("cart-dropdown__total-label");
  totalLabel.textContent = "Total:";

  const totalPrice = document.createElement("span");
  totalPrice.classList.add("cart-dropdown__total-price");
  totalPrice.id = "js-cart-dropdown-total";
  totalPrice.textContent = `${getCartTotal()}$`;

  totalBlock.append(totalLabel, totalPrice);

  const mainCartBtn = document.createElement("a");
  mainCartBtn.classList.add("cart-dropdown__cart-btn", "btn", "btn--small");
  mainCartBtn.id = "js-main-cart-btn";
  mainCartBtn.href = "#cart";
  mainCartBtn.textContent = "Go to cart";

  footer.append(totalBlock, mainCartBtn);

  wrapper.append(ul, footer);
  container.appendChild(wrapper);
};

export const updateCartBadge = () => {
  const cartMenu = ui.menus.cart;
  const badge = ui.menus.cartBadge;
  const cartItems = getCart();

  if (cartMenu && (!cartItems || cartItems.length === 0)) {
    renderEmptyCart(cartMenu);
  } else {
    renderFilledCart(cartMenu, cartItems);
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
