export const navigateTo = (viewToShow, allViews) => {
  allViews.forEach((view) => {
    if (view) view?.classList.add("hidden");
  });
  if (viewToShow) viewToShow?.classList.remove("hidden");
};
