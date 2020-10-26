import Cookies from "js-cookie";

export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!Cookies.get("incaMembersAccessToken") || !Cookies.get("incaCurrentUserData")) {
    store.commit("authentication/REMOVE_CURRENT_USER");
    store.commit("authentication/REMOVE_TOKEN");

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("recoverpassword")) {
      return redirect("/finder");
    }

    if (urlParams.has("redirect")) {
      const redirectUrl = urlParams.get("redirect");

      window.location.href = `${process.env.BASE_URL}?login?redirect=${redirectUrl}`;
    } else {
      return redirect("/login");
    }
  }
}
