"use strict";

import { ui } from "./ui.js";

const fillModalData = (pc) => {
  const modal = ui.productModal;

  if (!modal) return;

  const mapping = {
    name: "product_name",
    price: "product_price",
    description: "product_description",
    cpu: "product_cpu",
    gpu: "product_gpu",
    ram: "product_ram",
    ssd: "product_ssd",
    os: "product_os",
    img: "product_img",
  };

  Object.keys(mapping).forEach((key) => {
    const dataKey = mapping[key];
    const uiElement = modal[key];

    if (!uiElement) return;

    if (key === "img") {
      uiElement.src = pc[dataKey];
      uiElement.alt = `${pc.product_name} gaming PC`;
    } else if (key === "price") {
      uiElement.textContent = `${pc[dataKey]}$`;
    } else {
      uiElement.textContent = pc[dataKey];
    }
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
