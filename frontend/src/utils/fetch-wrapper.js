class FetchWrapper {
  #baseURL;

  constructor(baseURL) {
    this.#baseURL = baseURL;
  }

  async get(endpoint) {
    const res = await fetch(this.#baseURL + endpoint);

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    return res.json();
  }

  async put(endpoint, body) {
    return this.#send("put", endpoint, body);
  }

  async post(endpoint, body) {
    return this.#send("post", endpoint, body);
  }

  async delete(endpoint, body) {
    return this.#send("delete", endpoint, body);
  }

  async #send(method, endpoint, body) {
    const res = await fetch(this.#baseURL + endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    return await res.json();
  }
}

export default FetchWrapper;
