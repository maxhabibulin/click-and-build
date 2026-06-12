export const renderFormErrorMsg = (formElement) => {
  if (!formElement) return;

  let errorContainer = formElement.querySelector(".shipping-form__error");

  if (!errorContainer) {
    const newErrorEl = document.createElement("p");
    newErrorEl.classList.add("shipping-form__error", "error-msg");

    formElement.appendChild(newErrorEl);

    errorContainer = newErrorEl;
  }
  errorContainer.textContent =
    "Please fill out all the fields in the shipping form.";
};

export const renderCheckoutSummaryErrorMsg = (checkoutSummaryElement) => {
  if (!checkoutSummaryElement) return;

  let errorContainer = checkoutSummaryElement.querySelector(
    ".checkout__summary-error",
  );

  if (!errorContainer) {
    const newErrorEl = document.createElement("p");
    newErrorEl.classList.add("checkout__summary-error", "error-msg");

    checkoutSummaryElement.appendChild(newErrorEl);

    errorContainer = newErrorEl;
  }
  errorContainer.textContent = "Oops! Your cart is currently empty.";
};
