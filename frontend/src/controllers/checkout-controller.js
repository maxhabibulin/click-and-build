import { ui } from "../ui.js";
import FetchWrapper from "../utils/fetch-wrapper.js";
import { capitalizeFirstLetter } from "../utils/string.js";
import renderSuccessScreen from "../views/success-card.js";
import { renderErrorMsg, clearErrorMsg } from "../views/error-msg.js";

export const initCheckout = async (cartItems) => {
  const form = ui.checkout.form;
  if (!form) return false;

  clearErrorMsg();

  if (!cartItems || cartItems.length === 0) {
    renderErrorMsg("Oops! Your cart is currently empty.");
    return false;
  }

  const formData = new FormData(form);
  const firstName = capitalizeFirstLetter(formData.get("firstName"));
  const lastName = capitalizeFirstLetter(formData.get("lastName"));
  const email = formData.get("email")?.toLowerCase() ?? "";
  const address = formData.get("address") ?? "";

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !address?.trim()
  ) {
    renderErrorMsg("Please fill out all the fields in the shipping form.");
    return false;
  }

  const orderData = {
    cart: cartItems,
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
  };

  let submitBtn = null;
  const isProduction =
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1";
  const BASE_URL = isProduction
    ? "https://click-and-build.onrender.com"
    : "http://localhost:3000";
  const API = new FetchWrapper(BASE_URL);

  try {
    submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const res = await API.post("/api/order", orderData);

    if (res) {
      localStorage.removeItem("shopping_cart");
      localStorage.setItem("latestOrder", JSON.stringify(res));
      form.reset();
    }

    window.dispatchEvent(new Event("cartUpdated"));
    renderSuccessScreen(res);

    return true;
  } catch (error) {
    console.error("Checkout submission failed", error);
    renderErrorMsg(`Oh no! ${error.message}.`);

    if (submitBtn) submitBtn.disabled = false;
    return false;
  }
};
