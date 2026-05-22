export const toggleTheme = () => {
  const bodyEl = document.body;
  bodyEl.classList.toggle("dark-mode");

  const isDark = bodyEl.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

export const applySavedTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
};
