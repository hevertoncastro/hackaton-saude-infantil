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
          Buscar um paciente
        </h2>

        <FullSearch />
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "~/components/sidebar/sidebar";
import CustomHeader from "~/components/custom-header";
import FullSearch from "~/components/full-search";
import checkMenu from "~/mixins/check-menu";

export default {
  middleware: [
    "authenticated",
    "isAdmin"
  ],
  components: {
    Sidebar,
    CustomHeader,
    FullSearch
  },
  mixins: [checkMenu],
  computed: {
    ...mapGetters("system", [
      "getOpenedMenu"
    ]),
    ...mapGetters("authentication", [
      "getCurrentUser"
    ])
  }
};
</script>
