"use strict";

class Testimonial {
  #counter;
  #testimonials;

  constructor() {
    this.#counter = 0;
    this.#testimonials = [];
  }

  get data() {
    return this.#testimonials;
  }

  get counter() {
    return this.#counter;
  }

  set data(value) {
    this.#testimonials = value;
  }

  set counter(value) {
    this.#counter = value;
  }

  moveForward() {
    this.#counter = (this.#counter + 1) % this.#testimonials.length;
  }

  moveBackward() {
    this.#counter =
      (this.#counter - 1 + this.#testimonials.length) %
      this.#testimonials.length;
  }
}

export default Testimonial;
