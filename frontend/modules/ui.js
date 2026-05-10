"use strict";

export const ui = {
  views: {
    home: document.querySelector("#js-home-view"),
    catalog: document.querySelector("#js-catalog-view"),
  },
  grids: {
    catalog: document.querySelector("#js-catalog-grid"),
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
  },
  menus: {
    lang: document.querySelector("#js-lang-menu"),
  },
};

export const allViews = Object.values(ui.views);
