import { API } from "./constants";
import { API_ERRORS } from "./errorMessages";

const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `${API_ERRORS.general} ${res.status} ${res.statusText}`
  );
};

export const register = (name, email, password) => {
  return fetch(`${API.savedMoviesURL}/signup`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    return checkStatus(res);
  });
};

export const login = (email, password) => {
  return fetch(`${API.savedMoviesURL}/signin`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return checkStatus(res);
  });
};

export const getCurrentUser = (token) => {
  return fetch(`${API.savedMoviesURL}/users/me`, {
    method: "GET",
    headers: { ...API.headers, Authorization: `Bearer ${token}` },
  }).then((res) => {
    return checkStatus(res);
  });
};

export const editProfile = (name, email, token) => {
  return fetch(`${API.savedMoviesURL}/users/me`, {
    method: "PATCH",
    headers: { ...API.headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, email }),
  }).then((res) => {
    return checkStatus(res);
  });
};

export const getSavedMoviesCards = (token) => {
  return fetch(`${API.savedMoviesURL}/movies`, {
    method: "GET",
    headers: { ...API.headers, Authorization: `Bearer ${token}` },
  }).then((res) => {
    return checkStatus(res);
  });
};

export const saveMovieCard = (token, card) => {
  return fetch(`${API.savedMoviesURL}/movies`, {
    method: "POST",
    headers: { ...API.headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(card),
  }).then((res) => {
    return checkStatus(res);
  });
};

export const deleteMovieCard = (token, cardId) => {
  return fetch(`${API.savedMoviesURL}/movies/${cardId}`, {
    method: "DELETE",
    headers: { ...API.headers, Authorization: `Bearer ${token}` },
  }).then((res) => {
    return checkStatus(res);
  });
};
