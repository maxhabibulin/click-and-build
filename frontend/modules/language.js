"use strict";

export const toggleLanguageMenu = (menuEl) => {
  menuEl?.classList.toggle("active");
};

export const closeLanguageMenu = (menuEl) => {
  menuEl?.classList.remove("active");
};
