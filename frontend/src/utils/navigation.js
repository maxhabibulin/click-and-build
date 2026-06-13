import { clearErrorMsg } from "../views/error-msg.js";

export const navigateTo = (viewToShow, allViews, viewName) => {
  allViews.forEach((view) => view?.classList.add("hidden"));
  viewToShow?.classList.remove("hidden");
  clearErrorMsg();

  if (viewName) {
    localStorage.setItem("currentView", viewName);
  }
};
