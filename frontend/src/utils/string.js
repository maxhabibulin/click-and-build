export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getYearFromDateString = (string, startIndex, endIndex) => {
  if (!string) return "";
  return string.slice(startIndex, endIndex);
};
