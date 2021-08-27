const BASE_URL = "https://api.movies-star.nikolaym.nomoredomains.club";

const headers = {
  "Content-Type": "application/json",
};

const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Произошла ошибка при запросе к API. ${res.status} ${res.statusText}`);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    return checkStatus(res);
  });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return checkStatus(res);
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkStatus(res);
  });
};

export const editProfile = (name, email, jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name, email }),
  }).then((res) => {
    return checkStatus(res);
  });
};
