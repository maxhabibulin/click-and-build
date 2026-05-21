"use strict";

export const ui = {
  views: {
    home: document.querySelector("#js-home-view"),
    catalog: document.querySelector("#js-catalog-view"),
  },
  grids: {
    catalog: document.querySelector("#js-catalog-grid"),
    featured: document.querySelector("#js-featured-grid"),
  },
  buttons: {
    toCatalog: [
      document.querySelector("#js-nav-catalog"),
      document.querySelector("#js-hero-btn"),
    ],
    toHome: [
      document.querySelector("#js-nav-logo"),
      document.querySelector("#js-nav-home"),
      document.querySelector("#js-nav-features"),
      document.querySelector("#js-nav-reviews"),
      document.querySelector("#js-nav-builds"),
    ],
    themeSwitcher: document.querySelector("#js-theme-btn"),
    langSwitcher: document.querySelector("#js-lang-btn"),
    closeBtn: document.querySelector("#js-close-btn"),
  },
  menus: {
    lang: document.querySelector("#js-lang-menu"),
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
};

export const allViews = Object.values(ui.views);
