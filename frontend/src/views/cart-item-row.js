import { ui } from "../ui.js";
import generateSvg from "../utils/svg-ns.js";
import { getCartTotal } from "../services/cart-service.js";

export const renderMainEmptyCart = (container) => {
  if (!container) return;

  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("cart-main__empty");

  const svgWrapper = document.createElement("div");
  svgWrapper.classList.add("cart-main__empty-icon");

  const svg = generateSvg("cart-main__empty-icon-cart", "icon-cart");

  svgWrapper.appendChild(svg);

  const title = document.createElement("h3");
  title.classList.add("cart-main__empty-title", "heading-tertiary");
  title.textContent = "Your shopping cart is empty";

  const text = document.createElement("p");
  text.classList.add("cart-main__empty-text");
  text.textContent =
    "When you add products to your cart, they will appear here.";

  wrapper.append(svgWrapper, title, text);
  container.appendChild(wrapper);
};

export const renderMainFilledCart = (container, cartItems) => {
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
