import api from "~/server";

export const FETCH_SEARCHABLE_MEMBERS = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    api
      .get("/members/search")
      .then((response) => {
        commit("SET_SEARCHABLE_MEMBERS", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const FETCH_SEARCHABLE_PLACES = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    const data = [
      {
        id: 1,
        label: "Hospital Padre Albino",
        name: "hospital padre albino"
      },
      {
        id: 2,
        label: "UBS Vertoni",
        name: "ubs vertoni"
      }
    ];
    commit("SET_SEARCHABLE_PLACES", data);
    resolve(data);
  });
};

export const GET_MEMBER = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/members/${params.memberId}`)
      .then((response) => {
        commit("SET_MEMBER", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const GET_MEMBERS = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get("/members")
      .then((response) => {
        commit("SET_MEMBERS", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const CREATE_MEMBER = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .post("/members", params.data)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const UPDATE_MEMBER = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .put(`/members/${params.id}`, params)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const GET_MEMBER_PHONE = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/members/${params.memberId}/phones/${params.id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const CREATE_MEMBER_PHONE = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/members/${params.member_id}/phones/new`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const UPDATE_MEMBER_PHONE = ({ commit, state }, params) => {
  api.put(`/members/${params.member_id}/phones/${params.id}`, params);
};

export const DELETE_MEMBER_PHONE = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .delete(`/members/${params.member_id}/phones/${params.id}`)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const SET_MAIN_PHONE = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .put(`/members/${params.member_id}/phones/${params.id}/main`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const GET_MEMBER_ADDRESS = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/members/${params.memberId}/addresses/${params.id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const CREATE_MEMBER_ADDRESS = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/members/${params.member_id}/addresses/new`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const UPDATE_MEMBER_ADDRESS = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .put(`/members/${params.member_id}/addresses/${params.id}`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const DELETE_MEMBER_ADDRESS = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .delete(`/members/${params.member_id}/addresses/${params.id}`)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const SET_MAIN_ADDRESS = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .put(`/members/${params.member_id}/addresses/${params.id}/main`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const GET_MEMBER_ANNUITIES = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get("/annuities")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const GET_MEMBER_PAYMENT = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/members/${params.memberId}/payments/${params.id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const CREATE_MEMBER_PAYMENT = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/members/${params.member_id}/payments/new`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const UPDATE_MEMBER_PAYMENT = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .put(`/members/${params.member_id}/payments/${params.id}`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const DELETE_MEMBER_PAYMENT = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .delete(`/members/${params.member_id}/payments/${params.id}`)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const FETCH_ZIPCODE = async ({ commit, state }, data) => {
  const zipCode = data.replace(/\D/g, "");
  const zipCodeValidation = /^[0-9]{8}$/;

  if (zipCodeValidation.test(zipCode)) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json`, {
        method: "GET"
      });

      return response.json();
    } catch {
      throw new Error("CEP não encontrado.");
    }
  } else {
    throw new Error("CEP Inválido");
  }
};

export const GET_MEMBER_CATEGORIES = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get("/categories")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const GET_MEMBER_INTERESTS = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get("/interests")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const GET_MEMBER_AREAS = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get("/areas")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const GET_MEMBER_REGIONALS = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    api
      .get("/regionals")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
