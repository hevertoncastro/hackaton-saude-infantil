<template>
  <main class="c-container">
    <div class="l-login">
      <Feedback />

      <img class="l-login__logo" src="~/assets/images/patient.svg">

      <h1 class="l-login__title o-title large">
        Área restrita
      </h1>
      <div class="l-login__box c-form__box">
        <h2 class="o-title center mb-5">
          Criar senha de acesso
        </h2>
        <p class="o-text large gray center mb-20">
          Mínimo de 8 caracteres
        </p>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createPassword)" class="l-login__holder c-form">
            <div class="c-form__row">
              <div class="c-form__field">
                <ValidationProvider v-slot="{ errors }" :rules="{ required: true, min: 6 }" name="confirm">
                  <label class="c-form__label" for="password">Digite a nova senha</label>

                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="c-form__input orange"
                    placeholder="Senha"
                  >
                  <ul class="c-form__errors">
                    <li v-for="error in errors" :key="error" class="c-form__error">
                      {{ error }}
                    </li>
                  </ul>
                </ValidationProvider>
              </div>
            </div>
            <div class="c-form__row">
              <div class="c-form__field">
                <ValidationProvider :rules="{ required: true, min: 6, password: '@confirm' }" v-slot="{ errors }">
                  <label class="c-form__label" for="password">Repita a nova senha</label>

                  <input v-model="passwordConfirmation" type="password" class="c-form__input orange" placeholder="Repetir senha">
                  <ul class="c-form__errors">
                    <li v-for="error in errors" :key="error" class="c-form__error">
                      {{ error }}
                    </li>
                  </ul>
                </ValidationProvider>
              </div>
            </div>
            <div class="o-button__holder mb-10">
              <button :class="{ 'loading': isLoading }" class="o-button blue wide" type="submit">
                <span>Criar senha e entrar</span>
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      password: null,
      passwordConfirmation: null,
      token: null,
      email: null,
      isLoading: false
    };
  },
  mounted () {
    this.getUrlParams();
    if (!this.token || !this.email) {
      this.$router.push("/login");
    }
  },
  methods: {
    async createPassword () {
      this.isLoading = true;

      try {
        await this.$store.dispatch("authentication/CREATE_NEW_PASSWORD", {
          token: this.token,
          password: this.password
        });

        this.login();
      } catch (error) {
        this.$bus.$emit("showFeedback", {
          message: "Ocorreu um erro, entre em contato com contato@sisoncoinfanto.org.br",
          category: "danger",
          duration: 15000
        });

        this.isLoading = false;
      }
    },
    async login () {
      this.isLoading = true;

      try {
        await this.$store.dispatch("authentication/GET_TOKEN", {
          email: this.email,
          cpf: "",
          password: this.password
        });

        this.$router.push("/finder?recoverpassword=true");
      } catch (error) {
        this.$bus.$emit("showFeedback", {
          message: "Ocorreu um erro, entre em contato com contato@sisoncoinfanto.org.br",
          category: "danger",
          duration: 15000
        });

        this.isLoading = false;
      }
    },
    getUrlParams () {
      const urlParams = new URLSearchParams(window.location.search);
      this.token = urlParams.get("token") || null;
      this.email = urlParams.get("email") || null;
    }
  }
};
</script>
