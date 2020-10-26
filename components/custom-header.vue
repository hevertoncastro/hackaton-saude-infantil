<template>
  <header v-pin-on-scroll="{ container: '[data-page-content]' }" class="c-header">
    <button :class="{ 'is-active': getOpenedMenu }" @click="toggleMenu" class="o-hamburger hamburger hamburger--arrow" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner" />
      </span>
    </button>
    <Logo small />
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "@/components/logo";
import pinOnScroll from "~/plugins/v-pin-on-scroll";

export default {
  components: {
    Logo
  },
  directives: {
    pinOnScroll
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    loading: false,
    isOpenedMenu: false
  }),
  computed: {
    ...mapGetters("system", [
      "getOpenedMenu"
    ])
  },
  methods: {
    start () {
      this.loading = true;
    },
    finish () {
      this.loading = false;
    },
    toggleMenu () {
      if (this.getOpenedMenu) {
        this.$store.commit("system/CLOSE_MENU");
        return true;
      }
      this.$store.commit("system/OPEN_MENU");
    }
  }
};
</script>
