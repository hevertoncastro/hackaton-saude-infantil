import Vue from "vue";

// DayJS
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

// Vue The Mask
import masker from "vue-the-mask/src/masker.js";
import tokens from "vue-the-mask/src/tokens";

// DayJS
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

// Dates
Vue.filter("ShortDate", (dateString) => {
  const separated = dateString.split("T");
  const parts = separated[0].split("-");
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
});

Vue.filter("SystemDate", (dateString) => {
  const parts = dateString.split("/");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
});

Vue.filter("YearsSince", (dateString) => {
  const now = dayjs();
  return now.from(dateString, true);
});

// Money
Vue.filter("BrazilianCurrency", (number) => {
  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL"
  });
});

// Masks
Vue.filter("mask", (value, mask) => masker(value, mask, true, tokens));

// Data
Vue.filter("CleanCPF", (string) => {
  return string.replace(/\D/g, "");
});
