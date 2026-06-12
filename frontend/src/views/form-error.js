export const renderFormErrorMsg = (formElement) => {
  if (!formElement) return;

  let errorContainer = formElement.querySelector(".shipping-form__error");

  if (!errorContainer) {
    const newErrorEl = document.createElement("p");
    newErrorEl.classList.add("shipping-form__error");

    formElement.appendChild(newErrorEl);

    errorContainer = newErrorEl;
  }
  errorContainer.textContent =
    "Please fill out all the fields in the shipping form.";
};

export default renderFormErrorMsg;
