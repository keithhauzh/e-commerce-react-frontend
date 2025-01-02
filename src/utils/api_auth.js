// sonner imports
import { toast } from "sonner";

// constant API_URL import
import { API_URL } from "../constants";

import axios from "axios";

export const doLogin = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const doSignup = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

// function to check if cookies is empty
export const getCurrentUser = (cookie) => {
  return cookie.currentUser ? cookie.currentUser : null;
};

export const isUserLoggedin = (cookie) => {
  return getCurrentUser(cookie) ? true : false;
};

export const isAdmin = (cookie) => {
  const currentUser = getCurrentUser(cookie);
  return currentUser && currentUser.role === "admin" ? true : false;
};
