export const ui = {
  views: {
    home: document.querySelector("#js-home-view"),
    catalog: document.querySelector("#js-catalog-view"),
    cart: document.querySelector("#js-cart-view"),
    checkout: document.querySelector("#js-checkout-view"),
  },
  grids: {
    catalog: document.querySelector("#js-catalog-grid"),
    featured: document.querySelector("#js-featured-grid"),
    cart: document.querySelector("#js-cart-grid"),
    checkout: document.querySelector("#js-checkout-grid"),
  },
  buttons: {
    toHome: [
      document.querySelector("#js-nav-logo"),
      document.querySelector("#js-nav-home"),
      document.querySelector("#js-nav-features"),
      document.querySelector("#js-nav-reviews"),
      document.querySelector("#js-nav-builds"),
    ],
    toCatalog: [
      document.querySelector("#js-nav-catalog"),
      document.querySelector("#js-hero-btn"),
    ],
    navigation: {
      cartSwitcher: document.querySelector("#js-cart-btn"),
      themeSwitcher: document.querySelector("#js-theme-btn"),
      langSwitcher: document.querySelector("#js-lang-btn"),
    },
    cartBtn: document.querySelector(".js-add-to-cart"),
    closeBtn: document.querySelector("#js-close-btn"),
  },
  menus: {
    cart: document.querySelector("#js-cart-menu"),
    lang: document.querySelector("#js-lang-menu"),
    cartBadge: document.querySelector("#js-cart-badge"),
  },
  footer: {
    yearSpan: document.querySelector("#js-current-year"),
  },
  testimonials: {
    heading: document.querySelector("#js-testimonial-heading"),
    quote: document.querySelector("#js-testimonial-quote"),
    author: document.querySelector("#js-testimonial-author"),
    tag: document.querySelector("#js-testimonial-tag"),
    img: document.querySelector("#js-testimonial-img"),
    btnNext: document.querySelector("#js-testimonial-next"),
    btnPrev: document.querySelector("#js-testimonial-prev"),
    dots: document.querySelectorAll("[data-js='dot']"),
  },
  productModal: {
    modal: document.querySelector("#js-product-modal"),
    overlay: document.querySelector("#js-product-overlay"),
    name: document.querySelector("#js-details-title"),
    price: document.querySelector("#js-details-price"),
    cpu: document.querySelector("#js-details-cpu"),
    gpu: document.querySelector("#js-details-gpu"),
    ram: document.querySelector("#js-details-ram"),
    ssd: document.querySelector("#js-details-ssd"),
    os: document.querySelector("#js-details-os"),
    description: document.querySelector("#js-details-description"),
    img: document.querySelector("#js-details-img"),
  },
  catalogControls: {
    search: document.querySelector("#js-catalog-search"),
    sortSelect: document.querySelector("#js-catalog-sort"),
  },
  mainCart: {
    cartHeader: document.querySelector("#js-cart-table-header"),
    cartList: document.querySelector(".js-cart-list"),
    cartSummary: document.querySelector("#js-cart-summary"),
    subtotalPrice: document.querySelector("#js-subtotal__price"),
  },
  checkout: {
    form: document.querySelector("#js-checkout-form"),
    summaryList: document.querySelector("#js-checkout-summary-list"),
  },
};

export const allViews = Object.values(ui.views);
