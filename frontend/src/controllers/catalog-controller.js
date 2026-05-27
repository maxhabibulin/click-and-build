import { ui } from "../ui.js";
import { renderProductCard } from "../views/product-card.js";
import {
  FEATURED_IDS,
  renderFeaturedProducts,
} from "./featured-products-controller.js";

let searchReq = "";
let originalProducts = [];

const emptyMessage = (searchQuery) => {
  const grid = ui.grids.catalog;

  const div = document.createElement("div");
  div.classList.add("catalog__empty");

  const title = document.createElement("h3");
  title.classList.add("catalog__empty-title", "heading-tertiary");
  title.textContent = "No computers found for your request";

  const text = document.createElement("p");
  text.classList.add("catalog__empty-text");
  text.innerHTML = `We couldn't find anything matching <strong>"${searchQuery}"</strong>. Try checking for typos or use different keywords.`;

  div.append(title, text);
  grid.appendChild(div);
};

const renderCatalog = (productList) => {
  const catalogGrid = ui.grids.catalog;

  if (!catalogGrid) {
    console.error("Catalog grid element not found");
    return;
  }

  catalogGrid.innerHTML = "";

  if (!productList || productList.length === 0) {
    emptyMessage(searchReq);
    return;
  }

  productList.forEach((pc) => {
    const cardElement = renderProductCard(pc);
    catalogGrid.appendChild(cardElement);
  });
};

const updateCatalogView = () => {
  const sortType = ui.catalogControls?.sortSelect.value ?? "default";
  const cleanQuery = searchReq.toLowerCase().trim();

  let processedProducts = originalProducts.filter((pc) => {
    const searchTarget = `
       ${pc.product_name || ""} 
       ${pc.product_price || ""} 
       ${pc.product_cpu || ""} 
       ${pc.product_gpu || ""} 
       ${pc.product_ram || ""} 
       ${pc.product_ssd || ""} 
       ${pc.product_os || ""}
       `
      .toLowerCase()
      .trim();

    return searchTarget.includes(cleanQuery);
  });

  if (sortType === "default") {
    processedProducts = getSortedDefaultProducts(processedProducts);
  } else if (sortType === "price-asc") {
    processedProducts.sort((a, b) => a.product_price - b.product_price);
  } else if (sortType === "price-desc") {
    processedProducts.sort((a, b) => b.product_price - a.product_price);
  }

  renderCatalog(processedProducts);
};

const getSortedDefaultProducts = (products) => {
  const featured = products.filter((p) => FEATURED_IDS.includes(p.id));
  const regular = products.filter((p) => !FEATURED_IDS.includes(p.id));
  return [...featured, ...regular];
};

export const initCatalog = (products) => {
  originalProducts = [...products];
  renderFeaturedProducts(originalProducts);
  updateCatalogView();
};

export const handleSortChange = () => {
  updateCatalogView();
};

export const handleSearch = (query) => {
  searchReq = query;
  updateCatalogView();
};
