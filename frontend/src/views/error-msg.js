import { ui } from "../ui.js";
import generateSvg from "../utils/svg-ns.js";
import removeElement from "../utils/remove-element.js";

let errorTimeoutId = null;

export const renderErrorMsg = (message) => {
  let toastContainer = document.querySelector(".toast-notification-zone");

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.classList.add("toast-notification-zone");
    document.body.appendChild(toastContainer);
  }

  let errorBlock = toastContainer.querySelector(".error-msg-container");

  if (!errorBlock) {
    errorBlock = document.createElement("div");
    errorBlock.classList.add("error-msg-container");

    const wrapper = document.createElement("span");
    wrapper.classList.add("error__wrapper");

    const errorIcon = generateSvg("error__icon", "icon-exclamation");

    const errorText = document.createElement("p");
    errorText.classList.add("error__msg");

    wrapper.append(errorIcon, errorText);
    errorBlock.appendChild(wrapper);
    toastContainer.appendChild(errorBlock);
  }

  const textNode = errorBlock.querySelector(".error__msg");
  if (textNode) textNode.textContent = message;

  if (errorTimeoutId) clearTimeout(errorTimeoutId);

  errorTimeoutId = setTimeout(() => {
    clearErrorMsg();
  }, 10000);
};

export const clearErrorMsg = () => {
  const errorBlock = document.querySelector(".error-msg-container");
  removeElement(errorBlock);

  if (errorTimeoutId) {
    clearTimeout(errorTimeoutId);
    errorTimeoutId = null;
  }
};
