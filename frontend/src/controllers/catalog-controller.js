import { ui } from "../ui.js";
import { renderProductCard } from "../views/product-card.js";
import {
  FEATURED_IDS,
  renderFeaturedProducts,
} from "./featured-products-controller.js";

let originalProducts = [];

const renderCatalog = (productList) => {
  const catalogGrid = ui.grids.catalog;

  if (!catalogGrid) {
    console.error("Catalog grid element not found");
    return;
  }

  catalogGrid.innerHTML = "";

  if (!productList || productList.length === 0) {
    console.warn("Products not found");
    return;
  }

  productList.forEach((pc) => {
    const cardElement = renderProductCard(pc);
    catalogGrid.appendChild(cardElement);
  });
};

const getSortedDefaultProducts = (products) => {
  const featured = products.filter((p) => FEATURED_IDS.includes(p.id));
  const regular = products.filter((p) => !FEATURED_IDS.includes(p.id));

  return [...featured, ...regular];
};

export const initCatalog = (products) => {
  originalProducts = [...products];

  renderFeaturedProducts(originalProducts);

  const defaultSorted = getSortedDefaultProducts(originalProducts);
  renderCatalog(defaultSorted);
};

export const handleSortChange = (sortType) => {
  let sortedProducts = [...originalProducts];

  if (sortType === "default") {
    sortedProducts = getSortedDefaultProducts(sortedProducts);
  } else if (sortType === "price-asc") {
    sortedProducts.sort((a, b) => a.product_price - b.product_price);
  } else if (sortType === "price-desc") {
    sortedProducts.sort((a, b) => b.product_price - a.product_price);
  }

  renderCatalog(sortedProducts);
};

export const handleSearch = (query) => {
  const cleanQuery = query.toLowerCase().trim();

  const filteredProducts = originalProducts.filter((pc) => {
    const searchTarget = `
        ${pc.product_name || ""} 
        ${pc.product_price || ""}
        ${pc.product_cpu || ""}
        ${pc.product_gpu || ""}
        ${pc.product_ram || ""}
        ${pc.product_ssd || ""}
        ${pc.product_os || ""}
    `
      .toLocaleLowerCase()
      .trim();

    return searchTarget.includes(cleanQuery);
  });

  renderCatalog(filteredProducts);
};
