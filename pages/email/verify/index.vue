<template>
  <main class="c-container">
    <div class="l-login__loading">
      <Feedback />
      <img class="l-login__loader" src="~/assets/images/loader.svg">
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    urlParams () {
      const params = {};

      window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        params[key] = value;
      });

      return params;
    }
  },
  mounted () {
    this.verifyEmail();
  },
  methods: {
    async verifyEmail () {
      const params = this.urlParams;
      const data = {};

      if (params.id) {
        data.id = decodeURIComponent(params.id);
      }

      if (params.hash) {
        data.hash = decodeURIComponent(params.hash);
      }

      try {
        await this.$store.dispatch("profile/VERIFY_EMAIL", {
          id: data.id,
          hash: data.hash
        });

        this.$bus.$emit("showFeedback", {
          message: "E-mail verificado com sucesso."
        });

        setTimeout(() => {
          this.$router.push("/profile");
        }, 500);
      } catch (error) {
        this.$bus.$emit("showFeedback", {
          message: error.message,
          category: "danger"
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 500);
      }
    }
  }
};
</script>
