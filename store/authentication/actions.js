import api from "~/server";

export const GET_TOKEN = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .post("/sessions", params)
      .then((response) => {
        const token = response.data?.token;
        commit("UPDATE_TOKEN", token);
        resolve(token);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const GET_USER = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get("/sessions")
      .then((response) => {
        const user = response.data;
        commit("SET_CURRENT_USER", user);
        resolve(user);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const UPDATE_PASSWORD = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .put(`/users/${state?.currentUser?.id}/password`, params)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const FORGOT_PASSWORD = (_, params) => {
  return new Promise((resolve, reject) => {
    api
      .post("/users/forgotPassword", params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const CREATE_NEW_PASSWORD = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .put("users/resetPassword", params)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
