export default async function ({ store, redirect }) {
  const user = await store.dispatch("authentication/GET_USER");

  if (!user.admin) {
    return redirect("/profile");
  }
}
