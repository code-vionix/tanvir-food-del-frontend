import API from "./api";

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.get("/auth/logout");
  localStorage.removeItem("token");
  return res.data;
};

export const checkLogin = async () => {
  const res = await API.get("/auth/check");
  return res.data;
};
