class Api {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }
  
    _checkStatus(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  
    getMovieCards() {
      return fetch(`${this._baseUrl}`, {
        headers: {
          "Content-Type": "application/json"
        },
      }).then((res) => {
        return this._checkStatus(res);
      });
    }
    

  }
  
  export const api = new Api({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  });
  
  