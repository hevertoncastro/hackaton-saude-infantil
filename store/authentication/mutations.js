import Cookies from "js-cookie";

export const SET_CURRENT_USER = (state, data) => {
  Cookies.set("incaCurrentUserData", data);
  state.currentUser = data;
};

export const REMOVE_CURRENT_USER = (state) => {
  Cookies.remove("incaCurrentUserData");
  state.currentUser = null;
};

export const UPDATE_TOKEN = (state, data) => {
  Cookies.set("incaMembersAccessToken", data);
  state.incaMembersAccessToken = data;
};

export const REMOVE_TOKEN = (state) => {
  Cookies.remove("incaMembersAccessToken");
  state.incaMembersAccessToken = null;
};
