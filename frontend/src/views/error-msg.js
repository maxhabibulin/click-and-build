import generateSvg from "../utils/svg-ns.js";

const renderError = (message, uniqueClass) => {
  let toastContainer = document.querySelector(".toast-notification-zone");

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.classList.add("toast-notification-zone");
    document.body.appendChild(toastContainer);
  }

  let errorBlock = toastContainer.querySelector(`.${uniqueClass}`);

  if (!errorBlock) {
    errorBlock = document.createElement("div");
    errorBlock.classList.add(uniqueClass, "error-msg-container");

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
};

export const renderFormErrorMsg = (formElement) => {
  renderError(
    "Please fill out all the fields in the shipping form.",
    "shipping-form__error",
  );
};

export const renderCheckoutSummaryErrorMsg = (checkoutSummaryElement) => {
  renderError("Oops! Your cart is currently empty.", "checkout__summary-error");
};
