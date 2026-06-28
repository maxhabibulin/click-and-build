// Wrapper around the browser's native Fetch API to streamline asynchronous HTTP communication.
// Centralizes request configurations, applies headers, and automatically parses JSON data transfers.
class FetchWrapper {
  #baseURL;

  constructor(baseURL) {
    this.#baseURL = baseURL;
  }

  // Sends an asynchronous GET request to retrieve data from the backend database.
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

  // Finalizes order creation via dynamic POST requests.
  async post(endpoint, body) {
    return this.#send("post", endpoint, body);
  }

  async delete(endpoint, body) {
    return this.#send("delete", endpoint, body);
  }

  // Private helper method to handle configurations for PUT, POST, and DELETE requests.
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
