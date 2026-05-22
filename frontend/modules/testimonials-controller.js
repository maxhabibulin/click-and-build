import { ui } from "./ui.js";
import Testimonial from "./testimonial.js";

const model = new Testimonial();
let previousCounter = 0;

const render = () => {
  const current = model.data[model.counter];
  const tUI = ui.testimonials;

  if (!current || !tUI.heading) return;

  const mapping = {
    heading: "testimonial_heading",
    quote: "testimonial_quote",
    author: "testimonial_name",
    tag: "testimonial_tag",
    img: "testimonial_img",
  };

  Object.keys(mapping).forEach((key) => {
    const dataKey = mapping[key];
    const uiElement = tUI[key];

    if (!uiElement) return;

    if (key === "img") {
      uiElement.src = current[dataKey];
    } else {
      uiElement.textContent = current[dataKey];
    }
  });

  const prevDot = document.querySelector(`[data-index="${previousCounter}"]`);
  const currDot = document.querySelector(`[data-index="${model.counter}"]`);

  if (prevDot) prevDot.classList.remove("pagination__dot--active");
  if (currDot) currDot.classList.add("pagination__dot--active");

  previousCounter = model.counter;
};

export const nextSlide = () => {
  model.moveForward();
  render();
};

export const prevSlide = () => {
  model.moveBackward();
  render();
};

export const goToSlide = (index) => {
  model.counter = index;
  render();
};

export const initTestimonials = (data) => {
  model.data = data;
  render();
};
