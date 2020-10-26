import Cookies from "js-cookie";

export default function () {
  return {
    openedMenu: Cookies.get("openedMenu") ? Cookies.get("openedMenu") : false
  };
}
