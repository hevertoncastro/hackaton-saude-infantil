<template>
  <main
    :class="{
      'opened-menu': getOpenedMenu,
    }"
    class="c-container"
  >
    <sidebar />
    <section class="s-content" data-page-content>
      <custom-header title="Área restrita" />
      <Feedback />

      <div class="s-content__holder">
        <h2 class="o-title large mt-40 mb-30 center">
          Exames
        </h2>

        <Survey :survey-data="customData" />

        <div class="o-button__holder">
          <button @click.prevent="closeForm" :disabled="isLoading" class="o-button muted mr-10">
            <span>Cancelar</span>
          </button>
          <button @click.prevent="saveAndRedirect" :class="{ 'loading': isLoading }" class="o-button main">
            <span>Salvar</span>
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { exams } from "~/config/questions";
import Survey from "~/components/survey";
import Sidebar from "~/components/sidebar/sidebar";
import CustomHeader from "~/components/custom-header";
import checkMenu from "~/mixins/check-menu";

export default {
  name: "Exams",
  components: {
    Sidebar,
    CustomHeader,
    Survey
  },
  mixins: [checkMenu],
  data () {
    return {
      customData: exams,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters("system", [
      "getOpenedMenu"
    ])
  },
  methods: {
    saveAndRedirect () {
      this.isLoading = true;
      this.$store.commit("members/INCREASE_PROFILE_COMPLETE");
      this.$store.commit("members/SET_EXAMS_FILLED");
      this.$router.back();
    }
  }
};
</script>
