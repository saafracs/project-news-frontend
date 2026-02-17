export const BASE_URL = "http://localhost:3000";

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  }).then(_checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
};

export const validate = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
};
