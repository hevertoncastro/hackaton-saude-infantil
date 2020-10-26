import Cookies from "js-cookie";

export function getCurrentUser (state) {
  const userInCookie = Cookies.get("incaCurrentUserData")
    ? JSON.parse(Cookies.get("incaCurrentUserData"))
    : null;

  return state.currentUser || userInCookie;
};
