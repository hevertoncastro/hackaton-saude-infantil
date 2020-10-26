<template>
  <survey :survey="survey" />
</template>

<script>
import { mapGetters } from "vuex";
import * as SurveyVue from "survey-vue";
import checkMenu from "~/mixins/check-menu";

const Survey = SurveyVue.Survey;

export default {
  name: "App",
  components: {
    Survey
  },
  mixins: [checkMenu],
  props: {
    surveyData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    const model = new SurveyVue.Model(this.surveyData);

    return {
      survey: model
    };
  },
  computed: {
    ...mapGetters("system", [
      "getOpenedMenu"
    ])
  },
  head () {
    return {
      script: [
        {
          src: "https://surveyjs.azureedge.net/1.8.10/survey.vue.min.js"
        }
      ],
      link: [
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://surveyjs.azureedge.net/1.8.10/survey.css"
        }
      ]
    };
  }
};
</script>
