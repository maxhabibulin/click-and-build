import { ui } from "../ui.js";

export const renderSuccessScreen = (res) => {
  const successGrid = ui.grids.success;

  if (!successGrid) return;

  console.log(res.message);
  console.log(res.orderInfo);
};

export default renderSuccessScreen;
