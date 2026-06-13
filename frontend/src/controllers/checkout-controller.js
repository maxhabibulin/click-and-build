import { ui } from "../ui.js";
import removeElement from "../utils/remove-element.js";
import FetchWrapper from "../utils/fetch-wrapper.js";
import renderSuccessScreen from "../views/success-card.js";
import {
  renderFormErrorMsg,
  renderCheckoutSummaryErrorMsg,
} from "../views/error-msg.js";

export const initCheckout = async (cartItems) => {
  const form = ui.checkout.form;

  if (!form) return false;

  if (!cartItems || cartItems.length === 0) {
    renderCheckoutSummaryErrorMsg();
    removeElement(document.querySelector(".shipping-form__error"));
    return false;
  }

  removeElement(document.querySelector(".checkout__summary-error"));

  const formData = new FormData(form);

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const address = formData.get("address");

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !address?.trim()
  ) {
    renderFormErrorMsg();
    return false;
  }

  removeElement(document.querySelector(".shipping-form__error"));

  const orderData = {
    cart: cartItems,
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
  };

  let submitBtn = null;
  const API = new FetchWrapper("http://localhost:3000");

  try {
    submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const res = await API.post("/api/order", orderData);
    console.log("Order confirmed:", res);

    if (res) {
      localStorage.removeItem("shopping_cart");
      form.reset();
    }

    window.dispatchEvent(new Event("cartUpdated"));
    renderSuccessScreen(res);

    return true;
  } catch (error) {
    console.error("Checkout submission failed", error);
    alert(`Error: ${error.message}`);

    if (submitBtn) submitBtn.disabled = false;
    return false;
  }
};
