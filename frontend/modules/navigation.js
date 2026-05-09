export const navigateTo = (viewToShow, allViews, viewName) => {
  allViews.forEach((view) => view?.classList.add("hidden"));
  viewToShow?.classList.remove("hidden");

  if (viewName) {
    localStorage.setItem("currentView", viewName);
  }
};
