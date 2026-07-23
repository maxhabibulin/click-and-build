export const toggleMobileMenu = (menuEl) => {
  menuEl?.classList.toggle("active");
};

export const closeMobileMenu = (menuEl) => {
  menuEl?.classList.remove("active");
};
