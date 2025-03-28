import { request } from "./api";
import { baseUrl } from "./constants";

//const baseUrl = "http://localhost:3001";

export const signUp = ({ email, password, username }) => {
  return request(`${baseUrl}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });
};

export const signIn = ({ email, password }) => {
  return request(`${baseUrl}/api/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = (token) => {
  return request(`${baseUrl}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
