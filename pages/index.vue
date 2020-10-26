<template>
  <main
    :class="{
      'opened-menu': getOpenedMenu,
    }"
    class="c-container"
  >
    <sidebar />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "~/components/sidebar/sidebar";
import checkMenu from "~/mixins/check-menu";

export default {
  middleware: "authenticated",
  components: {
    Sidebar
  },
  mixins: [checkMenu],
  computed: {
    ...mapGetters("system", [
      "getOpenedMenu"
    ])
  },
  created () {
    this.$router.push("/new-patient");
  }
};
</script>
