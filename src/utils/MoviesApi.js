import { API } from "./constants";
import { API_ERRORS } from "./errorMessages";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `${API_ERRORS.general} ${res.status} ${res.statusText}`
    );
  }

  getMovieCards() {
    return fetch(`${this._baseUrl}`, {
      headers: API.headers,
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
}

export const api = new Api({
  baseUrl: API.moviesURL,
});
