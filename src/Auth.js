// src/Auth.js
// Simple localStorage-based auth helper

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
