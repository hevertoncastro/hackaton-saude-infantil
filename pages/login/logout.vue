<template>
  <main class="c-container">
    <div class="l-login">
      <Feedback />
      <h1 class="l-login__title o-title large">
        Área restrita
      </h1>
      <!-- @todo: estilizar página com loader ao redirecionar -->
      <div class="l-login__box c-form__box">
        <!-- <h2 class="o-title center mb-20">
          Acesse sua conta
        </h2> -->
        <h2 class="o-title center mb-20">
          Redirecionando...
        </h2>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    };
  },
  created () {
    this.logout();
  },
  methods: {
    async logout () {
      await this.$store.commit("authentication/REMOVE_TOKEN");
      await this.$store.commit("authentication/REMOVE_CURRENT_USER");
      window.location.href = process.env.SITE_SSO_URL;
    }
  }
};
</script>
