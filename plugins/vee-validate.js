import Vue from "vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import isURL from "validator/lib/isURL";
import { required, alpha, min, max, confirmed, email } from "vee-validate/dist/rules";
/* eslint-disable no-unused-vars */
import CPF, { validate } from "cpf-check";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

extend("shortDate", (value) => {
  const dateRegex = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)[0-9]{2})/;
  const isDateValid = dateRegex.test(value);

  if (isDateValid) {
    return true;
  }
  return "Informe uma data válida.";
});

extend("password", {
  params: ["target"],
  validate (value, { target }) {
    return value === target;
  },
  message: "As senhas não coincidem."
});

extend("url", (value) => {
  if (isURL(value, {
    protocols: ["http", "https"],
    require_protocol: true
  })) {
    return true;
  }
  return "Informe um link válido.";
});

extend("cpf", (value) => {
  if (CPF.validate(value)) {
    return true;
  }
  return "Informe um CPF válido.";
});

extend("email", {
  ...email,
  message: "Informe um e-mail válido."
});

extend("min", {
  ...min,
  message: (value, field) => `Este campo deve ter no mínimo ${field.length} caracteres.`
});

extend("max", {
  ...max,
  message: (value, field) => `Este campo deve ter no máximo ${field.length} caracteres.`
});

extend("confirmed", {
  ...confirmed,
  message: "Os valores dos campos não coincidem."
});

extend("required", {
  ...required,
  message: "Este campo é obrigatório."
});

extend("requiredOrFiles", {
  ...required,
  message: "Envie arquivos e (ou) digite uma mensagem."
});

extend("alpha", {
  ...alpha,
  message: "This field must only contain alphabetic characters."
});
