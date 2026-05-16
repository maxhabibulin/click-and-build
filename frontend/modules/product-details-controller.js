"use strict";

import { ui } from "./ui.js";

const fillModalData = (pc) => {
  const modal = ui.productModal;

  modal.title.textContent = pc.product_name;
  modal.description.textContent = pc.product_description;
  modal.price.textContent = `${pc.product_price}$`;
  modal.img.src = pc.product_img;
  modal.img.alt = `${pc.product_name} gaming PC`;

  const tableItems = [modal.cpu, modal.gpu, modal.ram, modal.ssd, modal.os];

  tableItems.forEach((item) => {
    item.textContent = `pc.product_${item}`;
  });
};

export const openProductModal = (pc) => {
  fillModalData(pc);
  ui.productModal.modal.classList.remove("product-modal--hidden");
  document.body.style.overflow = "hidden";
};

export const closeProductModal = () => {
  ui.productModal.modal.classList.add("product-modal--hidden");
  document.body.style.overflow = "";
};
