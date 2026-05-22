import { ui } from "./ui.js";
import { renderProductCard } from "./product-card.js";

const FEATURED_IDS = [1, 5, 7];

export const renderFeaturedProducts = (allProducts) => {
  const container = ui.grids.featured;

  if (!container) return;

  container.innerHTML = "";

  const featuredProducts = allProducts.filter((pc) =>
    FEATURED_IDS.includes(pc.id),
  );

  featuredProducts.forEach((pc) => {
    const cardElement = renderProductCard(pc);
    container.appendChild(cardElement);
  });
};
