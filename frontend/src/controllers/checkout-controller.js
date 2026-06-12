import { ui } from "../ui.js";
import FetchWrapper from "../utils/fetch-wrapper.js";
import renderFormErrorMsg from "../views/form-error.js";
import renderSuccessScreen from "../views/success-card.js";

export const initCheckout = async (cartItems) => {
  const form = ui.checkout.form;
  if (!form) return false;

  if (!cartItems || cartItems.length === 0) {
    alert("Oops! Your cart is currently empty.");
    return false;
  }

  const formData = new FormData(form);

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const address = formData.get("address");

  let formErr = form.querySelector(".shipping-form__error");

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !address?.trim()
  ) {
    renderFormErrorMsg(form);
    return false;
  }

  if (formErr) {
    formErr.remove();
  }

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
