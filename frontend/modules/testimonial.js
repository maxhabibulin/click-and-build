"strict";

import TESTIMONIALS from "./testimonial-data.js";

class Testimonial {
  #counter;
  #testimonials;

  constructor() {
    this.#counter = 0;
    this.#testimonials = TESTIMONIALS;
  }

  get counter() {
    return this.#counter;
  }

  set counter(value) {
    this.#counter = value;
  }

  getTestimonials() {
    return this.#testimonials;
  }

  moveForward() {
    if (this.#counter > 2) {
      this.#counter = -1;
    }
    this.#counter++;
  }

  moveBackward() {
    if (this.#counter < 1) {
      this.#counter = 4;
    }
    this.#counter--;
  }
}

export default Testimonial;
