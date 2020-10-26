import Cookies from "js-cookie";

export const CLOSE_MENU = (state, data) => {
  Cookies.remove("openedMenu");
  state.openedMenu = false;
};

export const OPEN_MENU = (state, data) => {
  Cookies.set("openedMenu", "true");
  state.openedMenu = true;
};
