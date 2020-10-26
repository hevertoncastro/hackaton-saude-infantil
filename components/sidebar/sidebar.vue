<template>
  <nav class="c-sidebar">
    <sidemenu />
    <button @click="closeMenu" class="c-sidebar__close">
      Ocultar menu
    </button>
  </nav>
</template>

<script>
import Sidemenu from "./sidemenu";

export default {
  components: {
    Sidemenu
  },
  methods: {
    closeMenu () {
      this.$store.commit("system/CLOSE_MENU");
    }
  }
};
</script>
