import { ui } from "../ui.js";
import renderSuccessScreen from "../views/success-card.js";
import FetchWrapper from "../utils/fetch-wrapper.js";

export const initCheckout = async (cartItems) => {
  const form = ui.checkout.form;

  if (!form) return false;

  if (!cartItems || cartItems.length === 0) {
    alert("Oops! Your cart is currently empty.");
    return false;
  }

  let submitBtn = null;
  const formData = new FormData(form);
  const API = new FetchWrapper("http://localhost:3000");

  const orderData = {
    cart: cartItems,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    address: formData.get("address"),
  };

  try {
    submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const res = await API.post("/api/order", orderData);
    console.log("Order confirmed:", res);

    if (res) {
      localStorage.removeItem("shopping_cart");
    }

    window.dispatchEvent(new Event("cartUpdated"));
    renderSuccessScreen(res);

    return true;
  } catch (error) {
    console.error("Checkout submission failed", error);
    alert(`Error: ${error.message}`);

    submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = false;

    return false;
  }
};
