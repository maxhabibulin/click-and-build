import { ui } from "../ui.js";
import generateSvg from "../utils/svg-ns.js";

export const renderSuccessScreen = (res) => {
  // const grid = ui.grids.success;
  // if (!grid) return;

  // const wrapper = document.createElement("div");
  // successWrapper.classList.add("success__wrapper");

  console.log(res.message);
  console.log(res.orderInfo);
};

export default renderSuccessScreen;

// {
//         message: "Thank you for your purchase!",
//         orderInfo: {
//           id: orderID,
//           totalPrice: total,
//           customer: {
//             firstName,
//             lastName,
//             email,
//             address,
//           },
//           date: new Date().toLocaleString(),
//         },
//       }
