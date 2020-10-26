import Vue from "vue";
import Feedback from "../components/feedback.vue";

const components = { Feedback };

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});
