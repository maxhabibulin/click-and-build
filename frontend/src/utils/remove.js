export const removeElement = (element) => {
  if (element) element.remove();
};

export const removeLatestOrder = () => {
  localStorage.removeItem("latestOrder");
};
