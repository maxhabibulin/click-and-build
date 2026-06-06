import { ui } from "../ui.js";
import generateSvg from "../utils/svg-ns.js";
import {
  getCart,
  getCartCount,
  getCartTotal,
} from "../services/cart-service.js";

const renderMainEmptyCart = (container) => {
  if (!container) return;

  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("cart-main__empty");

  const title = document.createElement("h3");
  title.classList.add("cart-main__empty-title", "heading-tertiary");
  title.textContent = "Your shopping cart is empty";

  const text = document.createElement("p");
  text.classList.add("cart-main__empty-text");
  text.textContent =
    "When you add products to your cart, they will appear here.";

  wrapper.append(title, text);
  container.appendChild(wrapper);
};

const renderMainFilledCart = (container, cartItems) => {
  if (!container) return;

  const subtotalPriceElement = ui.mainCart.subtotalPrice;

  container.innerHTML = "";

  cartItems.forEach((item) => {
    const itemRow = document.createElement("div");
    itemRow.classList.add("cart-item", "js-cart-item");
    itemRow.dataset.id = item.id;

    const productBlock = document.createElement("div");
    productBlock.classList.add("cart-item__product");

    const imgBox = document.createElement("figure");
    imgBox.classList.add("cart-item__img-box");

    const img = document.createElement("img");
    img.classList.add("cart-item__img");
    img.src = item.product_img;
    img.alt = item.product_name;

    imgBox.appendChild(img);

    const name = document.createElement("h3");
    name.classList.add("cart-item__name");
    name.textContent = item.product_name;

    productBlock.append(imgBox, name);

    const detailsBlock = document.createElement("div");
    detailsBlock.classList.add("cart-item__details");

    const detailsList = document.createElement("ul");
    detailsList.classList.add("cart-item__details-list");

    const specs = [
      item.product_cpu,
      item.product_gpu,
      item.product_ram,
      item.product_ssd,
      item.product_os,
    ];

    specs.forEach((spec) => {
      if (spec) {
        const li = document.createElement("li");
        li.classList.add("cart-item__details-item");
        li.textContent = spec;
        detailsList.appendChild(li);
      }
    });

    detailsBlock.appendChild(detailsList);

    const quantityBlock = document.createElement("div");
    quantityBlock.classList.add("cart-item__quantity");

    const controls = document.createElement("div");
    controls.classList.add("quantity-controls");

    const btnMinus = document.createElement("button");
    btnMinus.classList.add("quantity-controls__btn", "js-cart-minus");
    btnMinus.setAttribute("aria-label", "Reduce item");

    const svgMinus = generateSvg("quantity-controls__icon", "icon-minus");

    btnMinus.appendChild(svgMinus);

    const input = document.createElement("input");
    input.classList.add("quantity-controls__input");
    input.setAttribute("aria-label", "Item counter");
    input.type = "number";
    input.value = item.quantity;
    input.readOnly = true;

    const btnPlus = document.createElement("button");
    btnPlus.classList.add("quantity-controls__btn", "js-cart-plus");
    btnPlus.setAttribute("aria-label", "Add item");

    const svgPlus = generateSvg("quantity-controls__icon", "icon-plus");

    btnPlus.appendChild(svgPlus);

    controls.append(btnMinus, input, btnPlus);
    quantityBlock.appendChild(controls);

    const unitPrice = document.createElement("span");
    unitPrice.classList.add("cart-item__unit-price");
    unitPrice.textContent = `${item.product_price}$`;

    const totalPrice = document.createElement("span");
    totalPrice.classList.add("cart-item__total-price");
    totalPrice.textContent = `${item.product_price * item.quantity}$`;

    itemRow.append(
      productBlock,
      detailsBlock,
      quantityBlock,
      unitPrice,
      totalPrice,
    );

    container.appendChild(itemRow);
  });

  if (subtotalPriceElement) {
    subtotalPriceElement.textContent = `${getCartTotal()}$`;
  }
};

const renderMiniEmptyCart = (container) => {
  if (!container) return;

  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("cart-dropdown__empty");

  const svg = generateSvg("cart-dropdown__empty-icon", "icon-cart");

  const title = document.createElement("p");
  title.classList.add("cart-dropdown__empty-title");
  title.textContent = "Your cart is empty";

  const text = document.createElement("p");
  text.classList.add("cart-dropdown__empty-text");
  text.textContent = "Keep shopping!";

  wrapper.append(svg, title, text);
  container.appendChild(wrapper);
};

const renderMiniFilledCart = (container, cartItems) => {
  if (!container) return;

  container.innerHTML = "";

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
