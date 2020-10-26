const isMobile = require("is-mobile");

const checkMenu = {
  created () {
    if (isMobile()) {
      this.closeMenu();
    }
  },
  methods: {
    closeMenu () {
      this.$store.commit("system/CLOSE_MENU");
    }
  }
};

export default checkMenu;
