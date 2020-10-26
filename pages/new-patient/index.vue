<template>
  <main
    :class="{
      'c-container--is-covered': isSideFormVisible,
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
          Selecione a instituição do cadastro
        </h2>

        <SearchPlace />
      </div>

      <div
        :class="{
          'c-form__container--is-active': isSideFormVisible,
          'opened-menu': getOpenedMenu
        }"
        class="c-form__container"
      >
        <add-patient
          v-show="currentFormOpened === 'patient'"
          @close="closeSideForm"
          @feedback="showFeedback"
        />
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import AddPatient from "@/components/patient/add-patient";
import Sidebar from "~/components/sidebar/sidebar";
import CustomHeader from "~/components/custom-header";
import SearchPlace from "~/components/search-places";
import checkMenu from "~/mixins/check-menu";

export default {
  middleware: [
    "authenticated",
    "isAdmin"
  ],
  components: {
    AddPatient,
    Sidebar,
    CustomHeader,
    SearchPlace
  },
  mixins: [checkMenu],
  data () {
    return {
      isSideFormVisible: false,
      currentFormOpened: null
    };
  },
  computed: {
    ...mapGetters("system", [
      "getOpenedMenu"
    ]),
    ...mapGetters("authentication", [
      "getCurrentUser"
    ]),
    ...mapGetters("members", [
      "getSelectedPlace"
    ])
  },
  watch: {
    getSelectedPlace (value) {
      if (value) {
        this.openSideForm("patient");
      }
    }
  },
  methods: {
    openSideForm (category) {
      this.currentFormOpened = category;
      this.isSideFormVisible = !this.isSideFormVisible;
    },
    closeSideForm () {
      this.isSideFormVisible = false;
      this.currentFormOpened = "";
    },
    openAddPatientForm (data) {
      this.openSideForm("patient");
    },
    abortAddPatient () {
      this.$modal.hide("patient-form");
    },
    showFeedback (message, category) {
      this.$bus.$emit("showFeedback", {
        message,
        category
      });
    }
  }
};
</script>
