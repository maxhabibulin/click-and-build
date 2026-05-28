export const renderProductCard = (pc) => {
  const figure = document.createElement("figure");
  figure.classList.add("product-card", "js-product-card");
  figure.dataset.id = pc.id;
  figure.style.cursor = "pointer";

  const img = document.createElement("img");
  img.classList.add("product-card__img");
  img.src = pc.product_img;
  img.alt = `${pc.product_name} gaming PC`;

  const content = document.createElement("div");
  content.classList.add("product-card__content");

  const title = document.createElement("h3");
  title.classList.add("product-card__title", "heading-tertiary");
  title.textContent = pc.product_name;

  const list = document.createElement("ul");
  list.classList.add("product-card__list");

  const specs = [
    {
      icon: "icon-details-1",
      text: pc.product_cpu,
    },
    {
      icon: "icon-details-2",
      text: pc.product_gpu,
    },
    {
      icon: "icon-details-3",
      text: pc.product_ram,
    },
    {
      icon: "icon-details-4",
      text: pc.product_ssd,
    },
    {
      icon: "icon-details-5",
      text: pc.product_os,
    },
  ];

  specs.forEach((spec) => {
    const listItem = document.createElement("li");
    listItem.classList.add("product-card__item");
    listItem.innerHTML = `<svg class="product-card__icon" aria-hidden="true"><use href="img/svg/icons.svg#${spec.icon}"></use></svg>`;

    const span = document.createElement("span");
    span.classList.add("product-card__spec-text");
    span.textContent = spec.text;
    listItem.appendChild(span);
    list.appendChild(listItem);
  });

  const footer = document.createElement("div");
  footer.classList.add("product-card__footer");

  const price = document.createElement("strong");
  price.classList.add("product-card__price");
  price.textContent = `${pc.product_price}$`;

  const btn = document.createElement("button");
  btn.classList.add("btn", "btn--small", "js-add-to-cart");
  btn.setAttribute("aria-label", "Add to cart button");
  btn.dataset.id = pc.id;
  btn.textContent = "Add to cart";

  footer.append(price, btn);
  content.append(title, list, footer);
  figure.append(img, content);

  return figure;
};
