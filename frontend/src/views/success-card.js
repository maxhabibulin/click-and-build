import { ui } from "../ui.js";
import generateSvg from "../utils/svg-ns.js";
import {
  capitalizeFirstLetter,
  getYearFromDateString,
} from "../utils/string.js";

export const renderSuccessScreen = (res) => {
  const grid = ui.grids.success;
  if (!grid) return;

  grid.innerHTML = "";

  const { id, totalPrice, customer, date } = res?.orderInfo ?? {};
  const orderId = id ?? "N/A";
  const orderDate = date || "";
  const orderMessage = res?.message ?? "Thank you for your purchase!";
  const orderTotalPrice = totalPrice ? `${totalPrice}$` : "0$";

  const { firstName, lastName, email, address } = customer ?? {};
  const customerEmail = email ?? "";
  const customerAddress = address ?? "";
  const customerName =
    `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`.trim();

  const successScreen = document.createElement("div");
  successScreen.classList.add("success-screen");

  const wrapper = document.createElement("div");
  wrapper.classList.add("success__wrapper");

  successScreen.appendChild(wrapper);

  const mainSection = document.createElement("div");
  mainSection.classList.add("success__main");

  const iconBox = document.createElement("div");
  iconBox.classList.add("success__icon-box");

  const svg = generateSvg("success__icon", "icon-success");

  iconBox.appendChild(svg);

  const header = document.createElement("header");
  header.classList.add("success__content");

  const greeting = document.createElement("p");
  greeting.classList.add("success__greeting");
  greeting.textContent = `Hey ${customerName},`;

  const heading = document.createElement("h2");
  heading.classList.add("success__heading", "heading-secondary");
  heading.textContent = orderMessage;

  header.append(greeting, heading);

  const textBox = document.createElement("div");
  textBox.classList.add("success__text-box");

  const textMain = document.createElement("p");
  textMain.classList.add("success__text");
  textMain.textContent = "Your order ";

  const orderIdStrong = document.createElement("strong");
  orderIdStrong.classList.add("success__order-id");
  orderIdStrong.textContent = `#${orderId}`;

  textMain.append(
    orderIdStrong,
    document.createTextNode(" was placed successfully!"),
  );

  const textSub = document.createElement("p");
  textSub.classList.add("success__text", "success__text--sub");
  textSub.textContent = "We've sent a confirmation email to ";

  const emailStrong = document.createElement("strong");
  emailStrong.classList.add("success__order-email");
  emailStrong.textContent = customerEmail;

  textSub.append(emailStrong, document.createTextNode("."));
  textBox.append(textMain, textSub);

  const addressBlock = document.createElement("address");
  addressBlock.classList.add("success__delivery-details");

  const subheading = document.createElement("h3");
  subheading.classList.add("success__subheading", "heading-tertiary");
  subheading.textContent = "Shipping address";

  const deliveryText = document.createElement("p");
  deliveryText.classList.add("success__delivery-text");
  deliveryText.textContent = customerAddress;

  const deliveryTime = document.createElement("p");
  deliveryTime.classList.add("success__delivery-time");
  deliveryTime.textContent = "Estimated delivery in ";

  const timeStrong = document.createElement("strong");
  timeStrong.textContent = "5-7 business days";

  deliveryTime.append(timeStrong, document.createTextNode("."));
  addressBlock.append(subheading, deliveryText, deliveryTime);
  mainSection.append(iconBox, header, textBox, addressBlock);

  const aside = document.createElement("aside");
  aside.classList.add("success__aside");

  const receiptHeader = document.createElement("div");
  receiptHeader.classList.add("success__receipt-header");

  const receiptHeading = document.createElement("h3");
  receiptHeading.classList.add("success__receipt-heading", "heading-tertiary");
  receiptHeading.textContent = "Order receipt";

  const invoiceNum = document.createElement("span");
  invoiceNum.classList.add("success__invoice-num");
  invoiceNum.textContent = `Receipt #INV-${getYearFromDateString(orderDate, 6, 10)}-${orderId}`;

  receiptHeader.append(receiptHeading, invoiceNum);

  const receiptBody = document.createElement("div");
  receiptBody.classList.add("success__receipt-body");

  const productsList = document.createElement("ul");
  productsList.classList.add("success__products-list");
  productsList.id = "js-success-products-list";

  const productItem = document.createElement("li");
  productItem.classList.add("success__product-item");

  const productName = document.createElement("span");
  productName.classList.add("success__product-name");
  productName.textContent = "Order subtotal";

  const productPrice = document.createElement("span");
  productPrice.classList.add("success__product-price");
  productPrice.textContent = orderTotalPrice;

  productItem.append(productName, productPrice);
  productsList.appendChild(productItem);
  receiptBody.appendChild(productsList);

  const calcBox = document.createElement("div");
  calcBox.classList.add("success__calc-box");

  const shippingRow = document.createElement("div");
  shippingRow.classList.add("success__calc-row");

  const shippingLabel = document.createElement("span");
  shippingLabel.textContent = "Shipping & Handling";

  const shippingFree = document.createElement("span");
  shippingFree.classList.add("success__calc-free");
  shippingFree.textContent = "Free";

  shippingRow.append(shippingLabel, shippingFree);

  const taxRow = document.createElement("div");
  taxRow.classList.add("success__calc-row");

  const taxLabel = document.createElement("span");
  taxLabel.textContent = "Estimated Tax";

  const taxValue = document.createElement("span");
  taxValue.textContent = "0.00$";

  taxRow.append(taxLabel, taxValue);

  calcBox.append(shippingRow, taxRow);
  receiptBody.appendChild(calcBox);

  const receiptFooter = document.createElement("div");
  receiptFooter.classList.add("success__receipt-footer");

  const totalBox = document.createElement("div");
  totalBox.classList.add("success__total-box");

  const totalLabel = document.createElement("span");
  totalLabel.classList.add("success__total-label");
  totalLabel.textContent = "Total paid";

  const totalPriceSpan = document.createElement("span");
  totalPriceSpan.classList.add("success__total-price");
  totalPriceSpan.textContent = orderTotalPrice;

  totalBox.append(totalLabel, totalPriceSpan);

  const metaBox = document.createElement("div");
  metaBox.classList.add("success__meta-box");

  const metaLabel = document.createElement("span");
  metaLabel.classList.add("success__meta-label");
  metaLabel.textContent = "Ordered on";

  const dateParagraph = document.createElement("p");
  dateParagraph.classList.add("success__date");

  const timeElement = document.createElement("time");
  timeElement.textContent = orderDate;

  dateParagraph.appendChild(timeElement);
  metaBox.append(metaLabel, dateParagraph);
  receiptFooter.append(totalBox, metaBox);

  aside.append(receiptHeader, receiptBody, receiptFooter);
  wrapper.append(mainSection, aside);

  grid.appendChild(successScreen);
};

export default renderSuccessScreen;
