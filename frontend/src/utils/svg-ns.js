const generateSvg = (className, iconName) => {
  console.log(className, iconName);
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("class", `${className}`);
  svg.setAttribute("aria-hidden", "true");

  const use = document.createElementNS(svgNs, "use");
  use.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "href",
    `img/svg/icons.svg#${iconName}`,
  );

  svg.appendChild(use);
  return svg;
};

export default generateSvg;
