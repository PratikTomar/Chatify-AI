import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("user/signin", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }

  const data = await res.data;
  return data;
};

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const logOutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout user");
  }
  const data = await res.data;
  return data;
};

export const checkAuth = async () => {
  const res = await axios.get("user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }

  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chats/new", { message });

  if (res.status !== 200) {
    throw new Error("Unable to send chat to the server");
  }

  const data = await res.data;

  return data;
};

export const getAllChatsRequest = async () => {
  const res = await axios.get("/chats/all-chats");

  if (res.status !== 200) {
    throw new Error("Unable to get chats from the server");
  }

  const data = await res.data;

  return data;
};

export const deleteAllChatsRequest = async () => {
  const res = await axios.delete("/chats/delete");

  if (res.status !== 200) {
    throw new Error("Unable to delete chats from the server");
  }

  const data = await res.data;

  return data;
};
