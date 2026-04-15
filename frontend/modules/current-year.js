"strict";

class CurrentYear {
  #currentYear;

  constructor() {
    this.#currentYear = new Date().getFullYear();
  }

  getCurrentYear() {
    return this.#currentYear;
  }
}

export default CurrentYear;
